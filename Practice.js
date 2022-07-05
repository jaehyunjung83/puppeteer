const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const puppeteerExtraPluginUserAgentOverride = require("puppeteer-extra-plugin-stealth/evasions/user-agent-override");
const fs = require("fs");
const dayjs = require("dayjs");
require("dayjs/locale/ko");
const localizedFormat = require("dayjs/plugin/localizedFormat");
dayjs.extend(localizedFormat);

const stealthPlugin = StealthPlugin();
stealthPlugin.enabledEvasions.delete("user-agent-override");
puppeteer.use(stealthPlugin);
const pluginUserAgentOverride = puppeteerExtraPluginUserAgentOverride({
  userAgent:
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36",
  platform: "Win32",
});
puppeteer.use(pluginUserAgentOverride);

const username = process.env.USERNAME || "gus83";
const searchable = process.argv.includes("--searchable");

(async () => {
  const browser = await puppeteer
    .launch
    // { headless: false },
    ();

  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 800, deviceScaleFactor: 2 });
  await page.goto(`https://twitter.com/${username}`);
  const screenshotInitial = await page.screenshot({ path: "tweetInitial.png" });
  const html = await page.content()
  console.log("🚀 ~ file: Practice.js ~ line 34 ~ html", html)
  fs.writeFileSync('twitter.html', html)

  // Can't use elementHandle.click() because it clicks the center of the element
  // with the mouse. On tweets like https://twitter.com/ebidel/status/915996563234631680
  // there is an embedded card link to another tweet that it clicks.

  // await page.$eval(`.tweet[data-screen-name="${username}"]`, tweet => tweet.click());
  // await page.waitForSelector('.tweet.permalink-tweet', {visible: true});

  // const overlay = await page.$('.tweet.permalink-tweet');
  // const screenshot = await overlay.screenshot({path: 'tweet.png'});

  // if (searchable) {
    await page.evaluate((tweet) => {
      console.log("🚀 ~ file: Practice.js ~ line 51 ~ tweet", tweet);
      const width = getComputedStyle(tweet).width;
      tweet = tweet.cloneNode(true);
      tweet.style.width = width;
      document.body.innerHTML = `
      <div style="display:flex;justify-content:center;align-items:center;height:100vh;">;
        ${tweet.outerHTML}
      </div>
    `;
    });
  // } else {
  //   await page.setContent(`
  //   <!DOCTYPE html>
  //   <html>
  //     <head>
  //       <style>
  //         html, body {
  //           height: 100vh;
  //           margin: 0;
  //           display: flex;
  //           justify-content: center;
  //           align-items: center;
  //           background: '#000';
  //         }
  //         img {
  //           max-width: 60%;
  //           box-shadow: 3px 3px 6px gray;
  //           border-radius: 6px;
  //         }
  //       </style>
  //     </head>
  //     <body>
  //     <a>직접 setContents</a>
  //       <img src="data:img/png;base64,${screenshotInitial.toString("base64")}">
  //     </body>
  //   </html>
  // `);
  // }

  await page.pdf({ path: "tweet.pdf" });

  console.log("done!");
  await browser.close();
})();
