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
  await command("Emulation.setDeviceMetricsOverride", { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
  await command("Page.navigate", { url: origin + "/" });
  for (let attempt = 0; attempt < 20; attempt++) {
    if (await evaluate(`document.readyState === 'complete' && !!document.querySelector('article[data-review-card]')`)) break;
    await delay(250);
  }
  await evaluate(`window.scrollTo({ top: 0, behavior: 'instant' })`);
  await delay(500);
  const revealBefore = await evaluate(`getComputedStyle(document.querySelector('article')?.parentElement).opacity`);
  await evaluate(`document.querySelector('article')?.scrollIntoView({ block: 'center', behavior: 'instant' })`);
  let revealAfter;
  for (let attempt = 0; attempt < 16; attempt++) {
    await delay(150);
    revealAfter = await evaluate(`getComputedStyle(document.querySelector('article')?.parentElement).opacity`);
    if (Number(revealAfter) > 0.95) break;
  }
  assert(Number(revealBefore) < 0.1 && Number(revealAfter) > 0.95, `Scroll reveal did not animate into view; before ${revealBefore}, after ${revealAfter}`);
  const revealShot = await command("Page.captureScreenshot", { format: "png", captureBeyondViewport: false });
  await writeFile(path.join(artifacts, "home-benefits-1440.png"), Buffer.from(revealShot.data, "base64"));

  await evaluate(`document.querySelector('section[aria-label="Home tuition in Mumbai"]')?.scrollIntoView({ block: 'start', behavior: 'instant' })`);
  await delay(300);
  const expandBefore = await evaluate(`document.querySelector('section[aria-label="Home tuition in Mumbai"] [class*="clip-path"]')?.style.clipPath`);
  await evaluate(`window.scrollBy({ top: innerHeight * 0.43, behavior: 'instant' })`);
  await delay(600);
  const expandAfter = await evaluate(`document.querySelector('section[aria-label="Home tuition in Mumbai"] [class*="clip-path"]')?.style.clipPath`);
  assert(expandBefore !== expandAfter, "Scroll Expand frame did not respond to page scroll");
  const expandedShot = await command("Page.captureScreenshot", { format: "png", captureBeyondViewport: false });
  await writeFile(path.join(artifacts, "home-scroll-expand-1440.png"), Buffer.from(expandedShot.data, "base64"));

  await command("Emulation.setDeviceMetricsOverride", { width: 393, height: 852, deviceScaleFactor: 1, mobile: true });
  await command("Page.navigate", { url: origin + "/" });
  await delay(900);
  await evaluate(`document.querySelector('#reviews-title')?.scrollIntoView({ block: 'start', behavior: 'instant' })`);
  await delay(650);
  const reviewShot = await command("Page.captureScreenshot", { format: "png", captureBeyondViewport: false });
  await writeFile(path.join(artifacts, "home-reviews-393.png"), Buffer.from(reviewShot.data, "base64"));
  await evaluate(`document.querySelector('button[aria-label="Next reviews"]')?.click()`);
  await delay(650);
  const reviewScroll = await evaluate(`document.querySelector('[aria-label="Vidyam Google reviews"]')?.scrollLeft`);
  assert(Number(reviewScroll) > 10, "Review carousel did not move to the next card");

  await command("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-motion", value: "reduce" }] });
  await command("Page.navigate", { url: origin + "/" });
  let reducedMotionOpacity;
  let reducedExpand;
  for (let attempt = 0; attempt < 24; attempt++) {
    await delay(250);
    reducedMotionOpacity = await evaluate(`getComputedStyle(document.querySelector('h1')?.closest('[data-reveal]')).opacity`);
    reducedExpand = await evaluate(`document.querySelector('section[aria-label="Home tuition in Mumbai"] [class*="clip-path"]')?.style.clipPath`);
    if (Number(reducedMotionOpacity) > 0.95 && reducedExpand?.startsWith("inset(0% 0%")) break;
  }
  assert(Number(reducedMotionOpacity) > 0.95, `Reduced motion should show content immediately; got ${reducedMotionOpacity}`);
  assert(reducedExpand === "inset(0%)" || reducedExpand?.startsWith("inset(0% 0%"), `Reduced motion should show the expanded image immediately; got ${reducedExpand}`);
  console.log(JSON.stringify({ results: results.map(({ page, width, heading, overflow, brokenImages }) => ({ page, width, heading, overflow, brokenImages })), mobileMenu: menu, scrollReveal: { before: revealBefore, after: revealAfter, reducedMotionOpacity }, scrollExpand: { before: expandBefore, after: expandAfter, reducedMotion: reducedExpand }, reviewScroll, screenshots: artifacts }, null, 2));
} finally {
  socket?.close();
  browser.kill();
}
