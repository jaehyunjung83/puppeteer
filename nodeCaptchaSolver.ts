const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const puppeteerExtraPluginUserAgentOverride = require("puppeteer-extra-plugin-stealth/evasions/user-agent-override");
const fs = require("fs");
const RecaptchaPlugin = require("puppeteer-extra-plugin-recaptcha");
const Client = require("@infosimples/node_two_captcha");


function base64_encode(file) {
    // read binary data
    var img = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer(img).toString('base64');
}

(async () => {
    const captchaDecoderClient = new Client(process.env.captchaToken, {
        timeout: 60000,
        polling: 5000,
        throwErrors: false
    });

    const browser = await puppeteer.launch(
      { headless: false },
      { args: ["--window-size=1920,1080", "--disable-notifications"] }
      // { userDataDir: './user-data-dir' }
    );
  const url = "https://credit4u.or.kr:2443/memb/memberLoginView.do";
  const page = await browser.newPage();
  await page.goto(url);

//   const image = await page.screenshot({
//     // This should be the region where the simple captcha is located
//     clip: { x: 625, y: 400, width: 110, height: 35 },
//     // path: '/memb/captchaImage.do',
//     encoding: "base64",
//   });

  const captchaImg = await page.waitForSelector('#imgCaptcha');
  const img = await captchaImg.screenshot({ encoding: "base64"})

  console.log("base 64 captcha image", img);

  const decodedResponse = await captchaDecoderClient.decode({
    base64: img,
  });
  

  console.log("decodedResponse", decodedResponse._text);
  await page.type("#txtCaptcha", decodedResponse._text.toLocaleUpperCase());
  await page.click("#rbContains");
  await page.type("#txtBusinessName", "pizza");
  await page.click("#btnSearch");
  await page.waitForSelector("#tdBusinessSearch", { timeout: 10000 });

  const businessName = await page.$eval(
    "#tdBusinessSearch tbody tr:nth-of-type(1) td:nth-of-type(1)",
    (element) => element.textContent
  );
  console.log("businessName", businessName);

  await browser.close();
})();
