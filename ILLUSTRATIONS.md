# Vidyam illustrations

The six final illustrations were generated with the built-in image tool as PNGs, then resized and exported as indexed PNGs without dithering. The available tool did not expose an Astra 6 High model selector. The rejected icon sample and earlier painted images are not used by the site.

| Site use | File | Size |
| --- | --- | ---: |
| Home hero | `public/images/hero-mumbai.png` | 643.4 KiB |
| Home benefit: at your place | `public/images/benefit-home.png` | 140.9 KiB |
| Home benefit: subject teacher | `public/images/benefit-subjects.png` | 148.4 KiB |
| Home benefit: room to learn | `public/images/benefit-questions.png` | 129.6 KiB |
| Home and Services | `public/images/service-mumbai.png` | 762.0 KiB |
| About | `public/images/about-mumbai.png` | 748.9 KiB |

## Final prompt set

All prompts requested contemporary editorial line illustration, realistic natural colours, believable Indian people and a Mumbai high-rise home setting. Orange and plum were limited to small incidental details. The images contain no text, logo or border.

- **Hero:** An Indian tutor and school student working through an open notebook at a dining table in a modern Mumbai apartment. Apartment towers and a few skyscrapers through the window. Natural wood, stone, muted greenery and blue-grey daylight. A balanced landscape scene with safe margins for responsive cropping.
- **Services:** An Indian male tutor pointing to a teenage student’s workbook while she writes at a wooden table in a high-rise Mumbai home. Natural daylight, apartment towers outside, clear teacher/student roles and natural hands.
- **About:** A parent, tutor and school-age student discussing an exercise book and learning plan together at a dining table. A lived-in Mumbai apartment and high-rise skyline provide context.
- **At your place:** A welcoming study corner with two chairs, an open notebook, books and a houseplant beside a window overlooking Mumbai apartment buildings.
- **A teacher for each subject:** A tutor and student working through geometry in a notebook, with a ruler, science book and laptop nearby. Natural colours and Mumbai buildings beyond the window.
- **Room to learn:** A school-age boy asks a question about an open notebook while a male tutor listens attentively in a Mumbai apartment.

The source images were generated at higher resolution. The site uses only the compressed PNGs listed above. `npm run build` checks the PNG signature and size limits: 500–800 KiB for large scenes and 100–150 KiB for smaller home illustrations.
