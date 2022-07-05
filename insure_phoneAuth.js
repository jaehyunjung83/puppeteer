// const puppeteer = require("puppeteer");
const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const puppeteerExtraPluginUserAgentOverride = require("puppeteer-extra-plugin-stealth/evasions/user-agent-override");
const fs = require('fs');
const dayjs = require('dayjs');
require('dayjs/locale/ko');
const localizedFormat = require('dayjs/plugin/localizedFormat');
dayjs.extend(localizedFormat);
const download = require('image-downloader')

const stealthPlugin = StealthPlugin();
stealthPlugin.enabledEvasions.delete("user-agent-override");
puppeteer.use(stealthPlugin);
const pluginUserAgentOverride = puppeteerExtraPluginUserAgentOverride({
  userAgent:
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36",
  platform: "Win32",
});
puppeteer.use(pluginUserAgentOverride);

(async () => {
  
    const browser = await puppeteer.launch(
      { headless: false },
      { args: ["--window-size=1920,1080", "--disable-notifications"] },
      // { userDataDir: './user-data-dir' }
    );

    const page = await browser.newPage();

    await page.setRequestInterception(true);

        
    page.on("request", (req) => {
      switch (req.resourceType()) {
        // case "stylesheet":
        case "font":
        case "image":
          req.abort();
          console.log('css 없앤 중단점')
          break;
        default:
          req.continue();
          // console.log('일반 중단점')
          // break;
      }
    });

    page.setDefaultNavigationTimeout(0);

    console.log(
      "launch후 UserAgent",
      await page.evaluate("navigator.userAgent")
    );
    console.log(
      "launch후 UserAgent",
      await page.evaluate("navigator.platform")
    );

    const navigationPromise = page.waitForNavigation();

    await page.goto("https://cont.insure.or.kr/cont_web/intro.do", {
      waitUntil: 'networkidle0',
    });

    // await page.pdf({ path: `./TEMP_FOLDER/${dayjs(new Date).locale('ko').format('llll')}.pdf`, format: 'A4'});

    await page.setViewport({ width: 1080, height: 1080 });

    await page.waitForSelector("body > #wrapper > #main_contents > .link_view");

    await page.evaluate(() => {
      return document.querySelector(".link_view").click();
    });


    await page.waitForSelector("#applcntNm", { waitUntil: "load" });
    await page.click("#applcntNm");
    await page.type("#applcntNm", "정재현");

    await page.waitForSelector("#telno1");
    await page.click("#telno1");
    await page.type("#telno1", "010");

    await page.waitForSelector("#telno2");
    await page.click("#telno2");
    await page.type("#telno2", "8895");

    await page.waitForSelector("#telno3");
    await page.click("#telno3");
    await page.type("#telno3", "7500");

    await page.waitForSelector("#ssn1");
    await page.click("#ssn1");
    await page.type("#ssn1", "831206");

    await page.waitForSelector("#ssn2");
    await page.click("#ssn2");
    await page.type("#ssn2", "1001722");

    await page.waitForSelector("#email1");
    await page.click("#email1");
    await page.type("#email1", "");

    await page.waitForSelector("#email2");
    await page.click("#email2");
    await page.type("#email2", "");


    


    await page.screenshot({ path: 'htmlAtBeforePhoneAuth.png' })
    const htmlAtBeforePhoneAuth = await page.content()
    fs.writeFileSync('htmlAtBeforePhoneAuth.html', htmlAtBeforePhoneAuth)


    console.log("cert전 UserAgent", await page.evaluate("navigator.userAgent"));
    console.log("cert전 UserAgent", await page.evaluate("navigator.platform"));


    // 핸드폰 인증 선택
    await page.waitForSelector("#phone");
    await page.click("#phone")
      .then((res) =>
        console.log(
          "%c 휴대폰 인증 버튼 click Res",
          "background: blue; color: white",
          res
        )
      );


    console.log("pop열렸을 때 page", page);
    
    const newPagePromise = new Promise((x) =>
      browser.once("targetcreated", (target) => x(target.page()))
    );
    const popup = await newPagePromise;
    console.log("%c 🚀 ~ file: insure.js ~ line 93 ~ popup", "background: blue; color: white", popup);

    // popup창 alert창 뜨는 거 확인 버튼
    page.on("dialog", async (dialog) => {
      console.log("dialog");
      await dialog.accept();
    });


    await popup.waitForSelector("#ct > .ui_cover > .agency_select__items > .mobilecoItems > .ui_align_mid")
      .then((res) => console.log("통신사 선택", res));
    await popup.click("#ct > .ui_cover > .agency_select__items > .mobilecoItems > .ui_align_mid")
      .then((res) => console.log("통신사 click", res));


    await popup.click(".licensee-list > .first-item > .licensee_title > #LGU\\+ > .checked")
      .then((res) => console.log("LG U+ click", res));

    console.log('lguplus 선택완료 - 선택버튼 클릭 사이')
    
    const mvnoChoice = await popup.waitForSelector("#mvnoLayerCheck");
    console.log("🚀 ~ file: insure.js ~ line 181 ~ mvnoChoice", mvnoChoice)
    await mvnoChoice.click("#mvnoLayerCheck").then(()=>console.log('~통신사 선택완료~')).catch((e)=>console.log(e));


    console.log('통신사선택완료 - 전체동의 사이')
    await popup.evaluate(() => {
      const wholeAgree = document.querySelector("#agree_all");
      console.log("🚀 ~ file: insure.js ~ line 190 ~ awaitpopup.evaluate ~ wholeAgree", wholeAgree)
      wholeAgree.click();
      console.log('전체 동의 clicked')
    });


    await popup.waitForSelector("#btnSms").then((res) => console.log('문자(sms)로 인증하기버튼 element', res));
    await popup.click("#btnSms");

    await navigationPromise;

    await popup.waitForSelector("#username");
    await popup.click("#username");
    await popup.type("#username", "정재현");

    await popup.waitForSelector("#mynum1");
    await popup.click("#mynum1");
    await popup.type("#mynum1", "831206");

    await popup.waitForSelector("#mynum2");
    await popup.click("#mynum2");
    await popup.type("#mynum2", "1");

    await popup.waitForSelector("#mobileno");
    await popup.click("#mobileno");
    await popup.type("#mobileno", "01088957500");

  // captcha image down
    const captchaImg = await popup.$eval('#CAPTCHA_CaptchaImage', (el) => el.getAttribute('src'));
    const options = {
      url: 'https://nice.checkplus.co.kr' + captchaImg + '.png',
      dest: '/Users/hyun_M1/Documents/nodeJS/Puppeteer/puppeteer/captcha_img'
    };
    await download.image(options)
      .then(({ filename }) => {
          console.log('Saved to', filename)
      })
      .catch(err => console.error("ERR save!!! " + err))


    await popup.waitForSelector("#answer");
    await popup.click("#answer");
    await popup.type("#answer", "user한테 받을 captcha");  // user한테 핸드폰 인증번호 argu로 받아서 별도 async funtion으로 전달해야함

    await popup.waitForSelector("#btnSubmit");
    await popup.click("#btnSubmit");


    // user한테 sms 인증번호 전달 받아 입력하고 &
    // captcha answer 전송 버튼하고 sms인증 answer 전송 버튼 모두 btnSubmit이니 헷갈리지 말 것
    await popup.waitForSelector("#btnSubmit");
    await popup.click("#btnSubmit");

    await navigationPromise;

    const [, page2] = await browser.pages();
    console.log("🚀 ~ file: insure.js ~ line 206 ~ page2", page2.url);


    await page2.waitForSelector("#checkAgree1_Y");
    await page2.click("#checkAgree1_Y");

    await page2.waitForSelector("#checkAgree2_Y");
    await page2.click("#checkAgree2_Y");

    await page2.waitForSelector("#checkAgree3_Y");
    await page2.click("#checkAgree3_Y");

    await page2.waitForSelector("#checkAgree4_Y");
    await page2.click("#checkAgree4_Y");

    await page2.waitForSelector("#contents > #insuranceAgree > #agreeForm > .btn_area > .btn_next_go");
    await page2.click("#contents > #insuranceAgree > #agreeForm > .btn_area > .btn_next_go");

    await navigationPromise;

    const InsureResultDetail = await page2.$('#resultDetail')
    console.log("🚀 ~ file: insure.js ~ line 306 ~ InsureResultDetail", InsureResultDetail)

    const resultTable = await InsureResultDetail.evaluate(node => {return node});
    console.log("🚀 ~ file: insure.js ~ line 309 ~ resultTable", resultTable)
    
    // await page2.pdf({path: '정재현_보험_220628.pdf', format: 'A4'});

    await fs.writeFile('./정재현_보험_220628.json', JSON.stringify(resultTable), err => err ? console.log(err): null);


    const result1 = [];
    const query = await page2.evaluate(() => {
      return document.getElementById('table')
    })
    console.log("🚀 ~ file: insure.js ~ line 232 ~ query ~ query", query)

    for (let i = 0, length = query.snapshotLength; i < length; ++i) {
      result1.push(query.snapshotItem(i).innerHTML);
    }
    const result1Export = result1[0].innerHTML;
    console.log("🚀 ~ file: insure.js ~ line 325 ~ result1Export", result1Export)

    await fs.writeFile('./정재현_보험_220628.html', result1Export, err => err ? console.log(err): null);

    // await browser.close();
  
})();

// password 입력하는 거
// document.getElementById('hiddenPasswordInput').value = "wjdwogus1@"

// document.getElementById('applcntNm').value = '정재현',
// document.getElementById('telno1').value = '010',
// document.getElementById('telno2').value = '8895',
// document.getElementById('telno3').value = '7500',
// document.getElementById('ssn1').value = '831206',
// document.getElementById('ssn2').value = '1001722',
// document.getElementById('email1').value = 'jjjh1983',
// document.getElementById('email2').value = 'naver.com',
// document.getElementById('phone').click();

// // 새창!!! pass 알뜰폰 전체동의 -> 문자로 인증하기
// document.getElementById('agree_all').click(),
// document.getElementById('btnSms').click();

// // 새창!!! pass 문자로 인증하기 다시 input & botCaptcha
// document.getElementById('username').value = '정재현',
// document.getElementById('mynum1').value = '831206',
// document.getElementById('mynum2').value = '1',
// document.getElementById('mobileno').value = '01088957500';
// // 보안문자 answer
// document.getElementById('answer').value = '41153r'
