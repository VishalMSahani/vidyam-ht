import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { setTimeout as delay } from "node:timers/promises";

const origin = process.env.VIDYAM_ORIGIN || "http://localhost:3005";
const artifacts = path.resolve(".artifacts/browser-check");
await mkdir(artifacts, { recursive: true });
const browserPath = [
  process.env.CHROME_PATH,
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
].find((candidate) => candidate && existsSync(candidate));
assert(browserPath, "Chrome or Edge is required for browser checks");

const browser = spawn(browserPath, [
  "--headless=new",
  "--disable-gpu",
  "--no-first-run",
  "--remote-debugging-port=0",
  "--user-data-dir=" + path.join(artifacts, "profile-" + process.pid),
  "about:blank",
], { windowsHide: true, stdio: ["ignore", "ignore", "pipe"] });
let socket;
try {
  const wsUrl = await new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error("Browser startup timed out")), 20_000);
    browser.stderr.on("data", (chunk) => {
      const match = chunk.toString().match(/DevTools listening on (ws:\/\/[^\s]+)/);
      if (match) { clearTimeout(timer); resolve(match[1]); }
    });
    browser.once("exit", (code) => reject(new Error(`Browser exited: ${code}`)));
  });
  const debugOrigin = new URL(wsUrl);
  debugOrigin.protocol = "http:";
  const target = await (await fetch(debugOrigin.origin + "/json/new?about:blank", { method: "PUT" })).json();
  socket = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => {
    socket.addEventListener("open", resolve, { once: true });
    socket.addEventListener("error", reject, { once: true });
  });

  let id = 0;
  const pending = new Map();
  socket.addEventListener("message", (event) => {
    const packet = JSON.parse(event.data);
    const entry = pending.get(packet.id);
    if (!entry) return;
    clearTimeout(entry.timer);
    pending.delete(packet.id);
    packet.error ? entry.reject(new Error(packet.error.message)) : entry.resolve(packet.result);
  });
  function command(method, params = {}) {
    const requestId = ++id;
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => { pending.delete(requestId); reject(new Error(`Timed out: ${method}`)); }, 30_000);
      pending.set(requestId, { resolve, reject, timer });
      socket.send(JSON.stringify({ id: requestId, method, params }));
    });
  }
  async function evaluate(expression) {
    const result = await command("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true });
    if (result.exceptionDetails) throw new Error(result.exceptionDetails.text);
    return result.result.value;
  }
  async function check(page, width, height) {
    await command("Emulation.setDeviceMetricsOverride", { width, height, deviceScaleFactor: 1, mobile: width < 600 });
    await command("Page.navigate", { url: origin + page });
    for (let attempt = 0; attempt < 80; attempt++) {
      if (await evaluate("document.readyState === 'complete' && !!document.querySelector('h1')")) break;
      await delay(250);
    }
    await delay(500);
    const info = await evaluate(`(() => ({
      title: document.title,
      heading: document.querySelector('h1')?.textContent,
      overflow: document.documentElement.scrollWidth > innerWidth + 1,
      brokenImages: [...document.images].filter(image => image.complete && !image.naturalWidth).map(image => image.src),
      links: [...document.querySelectorAll('a[href^="/"]')].map(link => link.getAttribute('href')),
    }))()`);
    assert(info.heading, `Missing heading on ${page}`);
    assert(!info.overflow, `Horizontal overflow on ${page} at ${width}px`);
    assert.equal(info.brokenImages.length, 0, `Broken image on ${page}`);
    const shot = await command("Page.captureScreenshot", { format: "png", captureBeyondViewport: false });
    await writeFile(path.join(artifacts, `${page === "/" ? "home" : page.slice(1)}-${width}.png`), Buffer.from(shot.data, "base64"));
    if ((page === "/" && width === 1440) || (page === "/contact" && width === 393)) {
      await evaluate("window.scrollTo(0, document.documentElement.scrollHeight)");
      await delay(200);
      const lowerShot = await command("Page.captureScreenshot", { format: "png", captureBeyondViewport: false });
      await writeFile(path.join(artifacts, `${page === "/" ? "home" : page.slice(1)}-${width}-lower.png`), Buffer.from(lowerShot.data, "base64"));
    }
    return { page, width, ...info };
  }

  await command("Page.enable");
  await command("Runtime.enable");
  const results = [];
  for (const page of ["/", "/about", "/services", "/contact"]) {
    results.push(await check(page, 1440, 900));
    results.push(await check(page, 393, 852));
  }
  await command("Page.navigate", { url: origin + "/" });
  let menu;
  for (let attempt = 0; attempt < 20; attempt++) {
    menu = await evaluate(`(() => { const button=document.querySelector('[aria-controls="mobile-navigation"]'); return { expanded: button?.getAttribute('aria-expanded'), visible: !!document.querySelector('#mobile-navigation a[href^="/services"]') }; })()`);
    if (menu.expanded === "true" && menu.visible) break;
    if (menu.expanded === "false") await evaluate(`document.querySelector('[aria-controls="mobile-navigation"]')?.click()`);
    await delay(250);
  }
  assert(menu.expanded === "true" && menu.visible, "Mobile navigation did not open");
  console.log(JSON.stringify({ results: results.map(({ page, width, heading, overflow, brokenImages }) => ({ page, width, heading, overflow, brokenImages })), mobileMenu: menu, screenshots: artifacts }, null, 2));
} finally {
  socket?.close();
  browser.kill();
}
