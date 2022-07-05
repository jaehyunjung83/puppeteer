// const puppeteer = require("puppeteer");
const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const puppeteerExtraPluginUserAgentOverride = require("puppeteer-extra-plugin-stealth/evasions/user-agent-override");
const fs = require("fs");
const dayjs = require("dayjs");
require("dayjs/locale/ko");
const localizedFormat = require("dayjs/plugin/localizedFormat");
dayjs.extend(localizedFormat);
const download = require("image-downloader");
const cheerio = require('cheerio');

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
    { args: ["--window-size=1920,1080", "--disable-notifications"] }
    // { userDataDir: './user-data-dir' }
  );

  const page = await browser.newPage();

  await page.setRequestInterception(true);

  page.on("request", (req) => {
    switch (req.resourceType()) {
      case "font":
      case "image":
        req.abort();
        break;
      default:
        req.continue();
    }
  });

  page.setDefaultNavigationTimeout(0);

  const navigationPromise = page.waitForNavigation();

  await page.goto("https://payinfo.or.kr/payinfo.html", {
    waitUntil: "networkidle0",
  });


  await page.setViewport({ width: 1080, height: 1080 });
  console.log("🚀 ~ file: payinfo.js ~ line 60 ~ page", page.frames())

  const [ , , secondStartFrame,] = await page.frames();
  

  await secondStartFrame.waitForSelector('#gnb > li:nth-child(1) > a')
  await secondStartFrame.click('#gnb > li:nth-child(1) > a');

  page.on("dialog", async (dialog) => {
    console.log("dialog", dialog);
    dialog.dismiss();
  });
  // await page.waitForNavigation();

  
  await browser
  .pages()
  .then((pages) => console.log("내계좌한눈에 클릭 후 redirect page:", pages));
  
  // await secondStartFrame.waitForNavigation();
  
  console.log(page.frames())
  
  
  const [ , , , , , mainFrame] = page.frames();
  // await mainFrame.waitForNavigation();

  await mainFrame.waitForSelector('#r_chk_all', { waitUntil: 'load'})
  await mainFrame.click('#r_chk_all');

  await mainFrame.waitForSelector('#contents > div.btn_group2 > a')
  await mainFrame.click('#contents > div.btn_group2 > a');
  
  await mainFrame.waitForSelector('#rlnmNum1', { waitUntil: 'load'})
  await mainFrame.click('#rlnmNum1')
  await mainFrame.type('#rlnmNum1', '831206')

  // await mainFrame.click('#rlnmNum2')
  // await mainFrame.type('#rlnmNum2', '1001722')
  await mainFrame.$eval('#rlnmNum2', (eval) => eval.value = '1001722')

  await mainFrame.waitForSelector('#contents > div > div > div:nth-child(4) > div > a:nth-child(1)')
  await mainFrame.click('#contents > div > div > div:nth-child(4) > div > a:nth-child(1)')

  





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

  // 공동인증 선택
  await page.waitForSelector("#cert");
  await page.click("#cert");

  console.log("pop열렸을 때 page", page);

  // popup창으로 전환------------------------------------------------------------------------------------------------
  const newPagePromise = new Promise((x) =>
    browser.once("targetcreated", (target) => x(target.page()))
  );
  const popup = await newPagePromise;
  console.log(
    "%c 🚀 ~ file: insure.js ~ line 93 ~ popup",
    "background: blue; color: white",
    popup
  );

  popup.setDefaultNavigationTimeout(0);

  // popup창 alert창 뜨는 거 확인 버튼
  page.on("dialog", async (dialog) => {
    console.log("dialog", dialog);
    (await dialog) ?? dialog.accept();
  });

  await popup.waitForSelector(
    "form > .agreeWithPolicy > .agreeAll > .label > .checkboxWithTxt"
  );
  await popup
    .click("form > .agreeWithPolicy > .agreeAll > .label > .checkboxWithTxt")
    .then(() => console.log("공동인증서 전체 동의 체크 Click"));

  const confirmBotton = await popup.waitForSelector("#btnPubCert");
  await confirmBotton.click();

  // 공동인증서 창 뜸 -> iframe page전환------------------------------------------------------------------------------------------------
  await browser
    .pages()
    .then((pages) => console.log("인증서 popup창 떳을 때 pages:", pages));

  const [, , page3] = await browser.pages();

  page3.setDefaultNavigationTimeout(0);
  // const yettieFramePromise = new Promise((x) =>
  // console.log("🚀 ~ file: insure_certAuth.js ~ line 138 ~ x", x),
  //   page3.once("framenavigated", (target) => console.log(target))
  // );
  // await yettieFramePromise;

  // const frame3 = await waitForFrame(page3, 'yettie_iframe')
  
  
  await page3.waitForTimeout(3000);

  const [, , frame3] = await page3.frames();
  console.log("🚀 ~ file: insure_certAuth.js ~ line 139 ~ frame3", frame3);
  
  // await page3.evaluate(() => {
  //   const findCert = document.querySelector("#ico5");
  //   console.log("🚀 ~ file: insure.js ~ line 190 ~ awaitpopup.evaluate ~ findCert", findCert)
  //   findCert.click();
  //   console.log('인증서 hard에서 찾기 icon clicked')
  // });

  await page3.waitForTimeout(1000);
  const frameHandle = await page3.$("iframe[id='yettie_iframe']");
  const yettieiframetest = await frameHandle.contentFrame();
  

  await yettieiframetest.waitForSelector('[tabindex="6"]');
  await yettieiframetest.click('[tabindex="6"]');

  const [fileChooser] = await Promise.all([
    page3.waitForFileChooser(),
    yettieiframetest.waitForSelector("#fileInputHidden"),
    yettieiframetest.click("#fileInputHidden"),
  ]);
  await fileChooser.accept([
    "/Users/hyun_M1/Library/Preferences/NPKI/yessign/USER/cn=정재현()008804620180611188000055,ou=SHB,ou=personal4IB,o=yessign,c=kr/정재현()008804620180611188000055_2e51e7f8.pfx",
  ]);
  await yettieiframetest.waitForSelector("#hiddenPasswordInput");
  (await yettieiframetest.type("#hiddenPasswordInput", "wjdwogus1@")) /
    (await yettieiframetest.waitForSelector('[tabindex="9998"]'));
  await yettieiframetest.click('[tabindex="9998"]');
  await yettieiframetest
    .click('[tabindex="9998"]')
    .then((res) => console.log("최종 동의 화면이랑 약관 받아오는 res", res));

  //공동인증서 제출 후 redirected Page------------------------------------------------------------------------------------------------
  await browser
    .pages()
    .then((pages) => console.log("공동인증서 제출 후 redirect page:", pages));

  // page2에서 redirect 된 거 같음
  const [, page4] = await browser.pages();
  console.log("🚀 ~ file: insure_certAuth.js ~ line 178 ~ page4", page4);

  page4.setDefaultNavigationTimeout(0);
  
  await page4.waitForSelector("#checkAgree1_Y");
  await page4.click("#checkAgree1_Y");
  await page4.waitForSelector("#checkAgree2_Y");
  await page4.click("#checkAgree2_Y");
  await page4.waitForSelector("#checkAgree3_Y");
  await page4.click("#checkAgree3_Y");
  await page4.waitForSelector("#checkAgree4_Y");
  await page4.click("#checkAgree4_Y");
  await page4.waitForSelector(
    "#contents > #insuranceAgree > #agreeForm > .btn_area > .btn_next_go"
  );
  await page4.click(
    "#contents > #insuranceAgree > #agreeForm > .btn_area > .btn_next_go"
  );

  page4.on("dialog", async (dialog) => {
    console.log("dialog", dialog);
    (await dialog) ?? dialog.accept();
  });

  // 전체 RESULT 페이지

  await navigationPromise;
  await browser
    .pages()
    .then((pages) => console.log("RESULT redirect page:", pages));

  const [, page5] = await browser.pages();

  page5.setDefaultNavigationTimeout(0);

  await page5.waitForSelector("#resultDetail");
  

  const resultText = await page5.$eval("#resultDetail", (eval) => {
    return eval.innerText;
  });

  

  const data = await page5.evaluate(() => {
    const titles = Array.from(document.querySelectorAll('#popuForm > h4.sub_sstit_bul')); 
    const InsuaranceStatusTable = Array.from(document.querySelectorAll('#popuForm > table:nth-child(8)')); 
    console.log("🚀 ~ file: insure_certAuth.js ~ line 229 ~ data ~ InsuaranceStatusTable", InsuaranceStatusTable)
    // 그냥 전체 Table에서 select하면 mobile view 포함해서 중복 조회되므로 pc view의 선택자만 골라서 담기
   
    const ISTheaders = [];
    const ISTcells = {};

    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < InsuaranceStatusTable[0].rows[i].cells.length; j++) {
          ISTheaders.push(InsuaranceStatusTable[0].rows[i].cells[j].textContent)
                      }
    }

    for (let i = 2; i < InsuaranceStatusTable[0].rows.length; i++) {
      const cellsrow = []
        for (let j = 0; j < InsuaranceStatusTable[0].rows[i].cells.length; j++) {
            cellsrow.push(InsuaranceStatusTable[0].rows[i].cells[j].textContent)
                        }
      ISTcells[i] = cellsrow
    }

    const UnclaimedInsuaranceTable = Array.from(document.querySelectorAll('#unInsrcResultArea > table')); 
      const UITheaders = [];
      const UITcells = {};

      for (let i = 0; i < 1; i++) {
        for (let j = 0; j < UnclaimedInsuaranceTable[0].rows[i].cells.length; j++) {
          UITheaders.push(UnclaimedInsuaranceTable[0].rows[i].cells[j].textContent)
                        }
      }

      for (let i = 1; i < UnclaimedInsuaranceTable[0].rows.length; i++) {
        const cellsrow = []
          for (let j = 0; j < UnclaimedInsuaranceTable[0].rows[i].cells.length; j++) {
              cellsrow.push(UnclaimedInsuaranceTable[0].rows[i].cells[j].textContent)
                          }
          UITcells[i] = cellsrow
      }

    const DormantInsuaranceTable = Array.from(document.querySelectorAll('#popuForm > table:nth-child(14)')); 
      const DITheaders = [];
      const DITcells = {};

      for (let i = 0; i < 1; i++) {
        for (let j = 0; j < DormantInsuaranceTable[0].rows[i].cells.length; j++) {
          DITheaders.push(DormantInsuaranceTable[0].rows[i].cells[j].textContent)
                        }
      }

      for (let i = 1; i < DormantInsuaranceTable[0].rows.length; i++) {
        const cellsrow = []
          for (let j = 0; j < DormantInsuaranceTable[0].rows[i].cells.length; j++) {
              cellsrow.push(DormantInsuaranceTable[0].rows[i].cells[j].textContent)
                          }
          DITcells[i] = cellsrow
      }


    // return table.map(td => td.innerText);
    return {
      Insurance_Status: {
        title: titles[0].innerText,
        header: ISTheaders,
        column: ISTcells,
      },
      Unclaimed_Insuarance: {
        title: titles[1].innerText,
        header: UITheaders,
        column: UITcells,
      },
      Dormant_Insuarance: {
        title: titles[2].innerText,
        header: DITheaders,
        column: DITcells,
      },

    }
})
  console.log("🚀 ~ file: insure_certAuth.js ~ line 259 ~ data ~ data", data)

  await fs.writeFile("resultDetail.json", JSON.stringify(data), (err) =>
    console.log(err)
  );


  const resultAllHTML = await page5.$eval("#resultDetail", (eval) => {
    return eval.innerHTML;
  });

  const resultPage = await browser.newPage();
  await resultPage.setContent(resultAllHTML);
  await resultPage.screenshot({
    path: `./TEMP_FOLDER/${dayjs(new Date()).locale("ko").format("llll")}.png`,
    fullPage: true,
  });
  // await resultPage.pdf({ path: `./TEMP_FOLDER/${dayjs(new Date).locale('ko').format('llll')}.pdf` });

  const resultHTML = `
  <!doctype html>
    <html lang='ko'>
      <head>
        <meta charset="utf-8">
      </head>
      <body>
        ${resultAllHTML}
      </body>
    </html>
  `;
  fs.writeFileSync(
    `./TEMP_FOLDER/${dayjs(new Date()).locale("ko").format("llll")}.html`,
    resultHTML,
    "utf8",
    (res) => console.log("파일저장결과:", res)
  );


  // const table = await page5.$$eval("#popuForm > table:nth-child(8)", eval => { return eval });
  // console.log("🚀 ~ file: insure_certAuth.js ~ line 254 ~ table", table)
  // const resultTable = { header: "", rows: "" };

  // // // html table to json
  // table.find("tbody tr th").each(function () {
  //   resultTable.header.push($(this).html());
  // });
  
  // table.find("tbody tr").each(function () {
  //   var row = {};
    
  //   $(this)
  //   .find("td")
  //   .each(function (i) {
  //     var key = header[i],
  //     value = $(this).html();
      
  //     resultTable.row[key] = value;
  //   });
    
  //   resultTable.rows.push(row);
  // });
  
  // console.log("🚀 ~ file: insure_certAuth.js ~ line 256 ~ resultTable", resultTable)
  

  // await page4.waitForSelector('#AFTER_START > btn_area > button')

  // await browser.close();
})();