// const puppeteer = require("puppeteer");
import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import puppeteerExtraPluginUserAgentOverride from 'puppeteer-extra-plugin-stealth/evasions/user-agent-override/index.js';
import fs from 'fs';
import dayjs from 'dayjs';
import 'dayjs/locale/ko.js'
dayjs.locale('ko')
import localizedFormat from 'dayjs/plugin/localizedFormat.js';
dayjs.extend(localizedFormat);
import download from 'image-downloader';
const SQLiteMessagesDB = `${process.env.HOME}/Library/Messages/chat.db`;
// const sqlite3 = require('sqlite3').verbose()
import verbose from 'sqlite3';
const sqlite3 = verbose;




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
      "launch후 platform",
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
    await page.type("#email1", "jjjh1983");

    await page.waitForSelector("#email2");
    await page.click("#email2");
    await page.type("#email2", "naver.com");


    


    await page.screenshot({ path: 'htmlAtBeforePhoneAuth.png' })
    const htmlAtBeforePhoneAuth = await page.content()
    fs.writeFileSync('htmlAtBeforePhoneAuth.html', htmlAtBeforePhoneAuth)


    console.log("cert전 UserAgent", await page.evaluate("navigator.userAgent"));
    console.log("cert전 platform", await page.evaluate("navigator.platform"));


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
      console.log(dialog);
      await dialog.dismiss();
    });
    popup.on("dialog", async (dialog) => {
      console.log(dialog.message());
      await dialog.dismiss();
      await captchaByLens();
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
      $('#btnSms').click()
    });
    console.log('전체 동의 & 문자(SMS)로 인증하기 clicked')

    
    // popup안에서 url 바뀔 때
    await popup.waitForFunction(
      url => window.location.href === url,
      {},
      'https://nice.checkplus.co.kr/CheckPlusSafeModel/service.cb'
    );

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

  
  const xInjection = () => {
    window.$x = xPath =>
      document.evaluate(xPath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  };


  const blockingWait = seconds => {
    //simple blocking technique (wait...)
    var waitTill = new Date(new Date().getTime() + seconds * 1000);
    while (waitTill > new Date()) {}
  };

  // captcha image down
  const captchaByLens = async () => {
    popup.bringToFront();
    var captchaSolveText = '';
    console.log('--lens 캡챠solve시작--');

    const dayKO = dayjs().format("LL LTS")

    const captchaImg = await popup.waitForSelector('#CAPTCHA_CaptchaImage');
    console.log("🚀 ~ file: insure_phoneAuth.js ~ line 208 ~ captchaByLens ~ captchaImg", captchaImg)
    

    await popup.waitForFunction(() => {
      const img = $('#CAPTCHA_CaptchaImage')[0]
      return img.width > 0
    },{timeout:0})


    try {
      await captchaImg.screenshot({path: `./contInsure_${dayKO}.png`,});
    } catch (e) {
      console.log(e);
    }

    const fileName = `./contInsure_${dayKO}.png`;

    // Performs text detection by Lens

    const pages = await browser.pages();
    console.log("🚀 ~ file: insure_phoneAuth.js ~ line 247 ~ captchaByLens ~ pages", pages.length)
    console.log('page2: ', pages[pages.length - 1]);

    const page2 = pages.length > 3 ? pages[pages.length - 1] : await browser.newPage();

    pages.length > 3
      ? await page2.bringToFront()
      : await page2.goto('https://bit.ly/glensocr', {
          waitUntil: 'networkidle0',
        }) + await page2.bringToFront();
    // console.log('page2: ', pages[pages.length - 1]);
    

    blockingWait(0.3);

    await page2.evaluate(xInjection);

    // await page2.waitForNavigation({waitUntil: 'networkidle0'});

    console.log('before Find Upload')
    const nCexist = async () => {
      const upload = await page2.evaluate(() => $x('//span[contains(text(), "Upload")]'));
      upload
        ? await page2.evaluate(
            () =>
              ($x('//span[contains(text(), "Upload")]').length = 1
                ? $x('//span[contains(text(), "Upload")]').click()
                : $x('//span[contains(text(), "Upload")]')),
          )
        : await navigationPromise;
    };
    await nCexist();
    console.log('after Find Upload')
    // await page2.waitForNavigation();

    const computer = await page2.waitForXPath('//span[.="Computer"]');
    console.log('Computer', computer);
    await page2.waitForResponse(res => res);
    const [fileChooser] = await Promise.all([
      page2.waitForFileChooser(),
      page2.evaluate(() => $x('//span[.="Computer"]').click()),
    ]);
    await page2.waitForResponse(res => res);
    await fileChooser.accept([fileName]);
    console.log(`${fileName} Uploaded!`);
    // await navigationPromise;

    // await page2.waitForResponse(res => {return res.remoteAddress === '142.250.196.142:443'})
    await page2.waitForResponse(res => {
      return res.url().includes('play.google.com');
    });
    await page2.waitForXPath('//button[contains(@aria-label, "Switch to Text mode")]');
    // await page2.evaluate(() => $x('/html/body/div[3]/c-wiz/div/c-wiz/div/div[1]/div/div[3]/div/div/span[2]/span/button/span[1]').click());

    await page2.waitForNavigation({waitUntil: 'networkidle0'});

    await page2.evaluate(() => $x('//button[contains(@aria-label, "Switch to Text mode")]').click()),
      // blockingWait(1);

    console.log('Text Button Click()');

    

    await page2.waitForResponse(res => {
      return res.url().includes('batchexecute');
    });

    try {
    await page2.waitForXPath('//span[.="Select all text"]');
    } catch { return (popup.bringToFront() + await popup.click('#CAPTCHA_ReloadIcon')) + captchaByLens() + console.log('catch오류 재실행');}
    await page2.evaluate(() => $x('//span[.="Select all text"]').click());

    await page2.waitForFunction(() => {
      const textReadDiv = $x('//div[contains(@jsname, "r4nke")]').innerText
    return textReadDiv.length > 0
    },{timeout: 0},)
  

    console.log('Select all text Click()');


    const lensResultText = await page2.evaluate(() => {
      return $x('//div[starts-with(@jsaction, "contextmenu")]').innerText;
    });
    console.log('🚀 ~ file: payinfo.js ~ line 479 ~ lensResultText ~ lensResultText', lensResultText);



    await popup.bringToFront();
    blockingWait(3);


    await popup.waitForSelector('#answer', {waitUntil: 'load'});
    await popup.type('#answer', lensResultText);
    captchaSolveText = lensResultText;
    await popup.click('#btnSubmit');

    console.log('captcha frm send wait for sms div')

    await popup.waitForNavigation();
    
    const phoneAuthNumberDiv = await popup.$eval('#authnumber', el => (el ? true : false));
    console.log('🚀 ~ file: payinfo.js ~ line 377 ~ captchaByLens ~ phoneAuthNumberDiv', phoneAuthNumberDiv);

    phoneAuthNumberDiv
      ? await page2.close()
      : (await captchaByLens(captchaSolveText)) + console.log('Lens 인식오류로 재실행');
  };

  try {
    const solvedCaptcha = await captchaByLens();
    console.log('🚀 ~ file: payinfo.js ~ line 395 ~ solvedCaptcha', solvedCaptcha);
  } catch {
    (await popup.click('#CAPTCHA_ReloadIcon')) + captchaByLens() + console.log('catch오류 재실행');
  }



    // await popup.waitForSelector("#answer");
    // await popup.click("#answer");
    // await popup.type("#answer", "user한테 받을 captcha");  // user한테 핸드폰 인증번호 argu로 받아서 별도 async funtion으로 전달해야함

    // await popup.waitForSelector("#btnSubmit");
    // await popup.click("#btnSubmit");





    // user한테 sms 인증번호 전달 받아 입력하고 &


    var nowTime = new Date();
    nowTime.setHours(nowTime.getHours() + 9);
    const sentTimeISO = nowTime.toISOString().replace('T', ' ').substring(0, 19);

    const db = new sqlite3.Database(SQLiteMessagesDB);

    let sql = `
      SELECT
          datetime (message.date / 1000000000 + strftime ("%s", "2001-01-01"), "unixepoch", "localtime") AS message_date,
          message.text
      FROM
          chat
          JOIN chat_message_join ON chat. "ROWID" = chat_message_join.chat_id
          JOIN message ON chat_message_join.message_id = message. "ROWID"
      WHERE
          chat_identifier = '+8216001522'
          and
          datetime (message.date / 1000000000 + strftime ("%s", "2001-01-01"), "unixepoch", "localtime") > '${sentTimeISO}'
      ORDER BY message_date DESC
      `;

    let messageresult = {};
    const get = async () => {
      db.get(sql, [], (err, row) => {
        if (err) {
          throw err;
        }
        if (row) {
          return (messageresult = row), resultOut(messageresult);
        } else {
          return setTimeout(() => {
            get(), console.log('메시지 올때까지 1초마다 db read');
          }, 1000);
        }
      });
    };
    get();
    const resultOut = async resultOutReturn => {
      console.log('resultOutReturn: ', resultOutReturn),
        // 문자+숫자 => 숫자가 아닌 건 지워라
        await popup.type('#authnumber', resultOutReturn.text.replace(/[^0-9]/g, ''));
    };

    await popup.waitForFunction(() => {
        const smsConfirmNum = document.getElementById('authnumber').value;

        return smsConfirmNum.length == 6;
      },
      {timeout: 0},
    );


    // captcha answer 전송 버튼하고 sms인증 answer 전송 버튼 모두 btnSubmit이니 헷갈리지 말 것
    await popup.waitForSelector("#btnSubmit");
    await popup.click("#btnSubmit");

    await navigationPromise;

    const [, page3] = await browser.pages();
    console.log("🚀 ~ file: insure.js ~ line 206 ~ page3", page3.url());


    await page3.waitForSelector("#checkAgree1_Y");
    await page3.click("#checkAgree1_Y");

    await page3.waitForSelector("#checkAgree2_Y");
    await page3.click("#checkAgree2_Y");

    await page3.waitForSelector("#checkAgree3_Y");
    await page3.click("#checkAgree3_Y");

    await page3.waitForSelector("#checkAgree4_Y");
    await page3.click("#checkAgree4_Y");

    await page3.waitForSelector("#contents > #insuranceAgree > #agreeForm > .btn_area > .btn_next_go");
    await page3.click("#contents > #insuranceAgree > #agreeForm > .btn_area > .btn_next_go");

    await navigationPromise;

    const InsureResultDetail = await page3.$('#resultDetail')
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
