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
import {initializeApp} from 'firebase/app';
import {getDatabase, ref, child, get, onValue, set, update} from 'firebase/database';



const firebaseConfig = {
  apiKey: 'AIzaSyCTfD88e8xfwTzdzaiit4Ze01ntDLtSYho',
  authDomain: 'lunar-5abf5.firebaseapp.com',
  databaseURL: 'https://lunar-5abf5-payinfotest-d37a2.firebaseio.com/',
  projectId: 'lunar-5abf5',
  storageBucket: 'lunar-5abf5.appspot.com',
  messagingSenderId: '135894682543',
  appId: '1:135894682543:web:357b3079bfae5ef12a7d5a',
  measurementId: 'G-BCDMP8HXF6',
};
const app = initializeApp(firebaseConfig);

const database = getDatabase();
const startRef = ref(database, '/insure/cont/');

const stealthPlugin = StealthPlugin();
stealthPlugin.enabledEvasions.delete("user-agent-override");
puppeteer.use(stealthPlugin);
// const pluginUserAgentOverride = puppeteerExtraPluginUserAgentOverride({
//   userAgent:
//     "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36",
//   platform: "Win32",
// });
// puppeteer.use(pluginUserAgentOverride);

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
      // case "stylesheet":
      case "font":
      case "image":
        req.abort();
        // console.log("img 없앤 중단점", req);
        break;
      default:
        req.continue();
      // console.log('일반 중단점')
      // break;
    }
  });

  page.setDefaultNavigationTimeout(600000);
  
  const navigationPromise = page.waitForNavigation();

  await page.goto("https://cont.insure.or.kr", {
    waitUntil: "networkidle0",
  });

  page.on("dialog", async (dialog) => {
    console.log("dialog", dialog.message());
    await dialog.dismiss();
  });


  // await page.pdf({ path: `./TEMP_FOLDER/${dayjs(new Date).locale('ko').format('llll')}.pdf`, format: 'A4'});

  await page.setViewport({ width: 1800, height: 1080 });

  await page.waitForSelector("body > #wrapper > #main_contents > .link_view");

  await page.evaluate(() => {
    return document.querySelector(".link_view").click();
  });

  await page.waitForSelector("#applcntNm", { waitUntil: "load" });
  
  // 
  await page.reload({ waitUntil: ["networkidle0", "domcontentloaded"] });  

  // 개인정보입력 후 certificate.do 로 공동인증 POST

  
  await page.evaluate(() => {
    $form = $("#acptform");

    $form[0]['certType'].value = 'G';
    $form[0]['validateSsnNumber'].value = '9';
    $form[0]['checkSe'].value = '1';
    $form[0]['nm'].value = '정재현';
    $form[0]['ssn'].value = '8312061001722';
    $form[0]['telno'].value = '01088957500';
    $form[0]['birthDay'].value = '19831206';
    $form[0]['applcntNm'].value = '정재현';
    $form[0]['telno1'].value = '010';
    $form[0]['telno2'].value = '8895';
    $form[0]['telno3'].value = '7500';
    $form[0]['ssn1'].value = '831206';
    $form[0]['ssn2'].value = '1001722';

    var method = 'cert';
    methodUrl = "/cont_web/check/auth/certificate.jsp";
    $("#acptform #ssn").val($("#acptform #ssn1").val()+$("#acptform #ssn2").val());
    $("#ssnCheckForm #checkSsn").val($("#acptform #ssn1").val()+$("#acptform #ssn2").val());
    
    frm = document.getElementById("ssnCheckForm");
    frm.action = methodUrl;
    frm.submit();
    
  });

  // 공동인증
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

  popup.setDefaultNavigationTimeout(600000);

  popup.on("dialog", async (dialog) => {
    console.log("dialog", dialog.message());
    await dialog.dismiss();
  });



  // popup창 alert창 뜨는 거 확인 버튼


  await popup.waitForNavigation();

  // 공동인증서 창 뜸 -> iframe page전환------------------------------------------------------------------------------------------------
  await popup.evaluate(() => {
    $('#pubCertAgree')[0].click();
    // self.close();
    touchenexInfo.isInstalled = true;
    yettie.signFormNewUCPID($('#signMsg').val(), true, true, true, true, true, 'credit4u.or.kr', {
        encoding: 'hex'
    }, function resultCallback(result) {
        $("#signedMsg").val(result.signature);
        $("#storageType").val(result.storageType);
        console.log('success시: ', result.signature)

        if ($("#signedMsg").val() == null || $("#signedMsg").val() == "") {
            console.log("전자서명문 또는 식별번호 검증 메시지가 올바르지 않습니다.");
            return;
        }

        if (makeEncData(frm)) {
            document.frm.submit();
        }
    }, function errorCallback(error) {
        if (error.code == -9999) console.log('error시: ', error.code);  // 취소 버튼 이벤트 error.code: -9999
        else console.log(error.msg);
    });
  });
  console.log('%c popup에서 공동인증 가능처리', "background: red; color: black")

  const [, , yettie] = await popup.frames()
  console.log("🚀 ~ file: creditForYou.js:174 ~ yettie", yettie)

  await yettie.waitForNavigation();

  await yettie.waitForSelector("#certificate_file");

  await yettie.evaluate(() => $('#certificate_file a').click());
  await yettie.waitForFunction(() => {
    // 인증서찾기 버튼이 그려질때까지 wait
    return $("#fileInputHidden").width() > 0
  });
  

  // await popup.waitForNavigation();
  console.log('인증서 찾기 button click')

  const [fileChooser] = await Promise.all([
    popup.waitForFileChooser({ waitUntil: 'domcontentloaded' }),
    yettie.waitForSelector("#fileInputHidden"),
    yettie.evaluate(() => $("#fileInputHidden").click()),
  ]);
  await fileChooser.accept([
    "/Users/hyun_M1/Library/Preferences/NPKI/yessign/USER/cn=정재현()008804620180611188000055,ou=SHB,ou=personal4IB,o=yessign,c=kr/정재현()008804620180611188000055_2e51e7f8.pfx",
  ]);

  await yettie.waitForSelector("#hiddenPasswordInput");
  await yettie.type("#hiddenPasswordInput", "wjdwogus1@");
  await yettie.evaluate(() => $('#hiddenPasswordInput')[0].value = 'wjdwogus1@')
  await yettie.evaluate(() => $('#submit_btn').click());
  await yettie.evaluate(() => $('#submit_btn').click());


  await page.waitForNavigation();

  //공동인증서 제출 후 redirected Page------------------------------------------------------------------------------------------------



  // result 받아오는 데 시간이 좀 걸림
  await page.evaluate(() => {
    $form = $("#agreeForm");

    $form[0]['checkAgree1'].value = 'Y'
    $form[0]['checkAgree2'].value = 'Y'
    $form[0]['checkAgree3'].value = 'Y'
    $form[0]['checkAgree4'].value = 'Y'
    $form[0]['checkSe'].value = '1'
    $form[0]['resultView'].value = 'N'
    $form[0]['tCount'].value = '0'
    $form[0]['mCount'].value = '0'


    $.ajax({
      cache:false,
      type:"post",
      url:"/cont_web/insurance/insuranceResult.do",
      data:$form.serialize(),
      dataType:"html",
      beforeSend:function(){
        //$("#loading").show();
        $("body").scrollTop(0);
        $("#contents .step_text").removeClass("bg02").addClass("bg03");
        $("#contents .step_text li").removeClass("now");
        $("#contents .step_text li:eq(2)").addClass("now");
        $("#contents .sub_tit").text("결과확인");
        $("#contents .sub_location em").text("결과확인");
        $("head title").text("생명보험협회 내보험찾아줌 - 조회신청 > 결과확인");
        $(".sub_content").css("background","none");
        //$("#insuranceAgree").hide();
        $("#insuranceAgree").remove();
        $("#insuranceLoading").show();
      },
      complete:function(complete){
        console.log("🚀 ~ file: insure_certAuth.js:264 ~ awaitpage.evaluate ~ complete", complete)
        $("#insuranceLoading").hide();
      },
      success:function(result){
        console.log("🚀 ~ file: insure_certAuth.js:265 ~ awaitpage.evaluate ~ result", result)
        $("#insuranceResult").html(result);
        $("#insuranceResult").show();
        $("#insuranceResult").focus();
        $("body").scrollTop(0);
      },
      error:function(result,status,error){
        //에러화면
        console.log("약관 동의에 체크해주세요.");
        location.reload();
      }
    });

  });


  

  // 전체 RESULT 페이지

  await navigationPromise;
  await browser.pages().then((pages) => console.log("RESULT redirect page:", pages));

  
  page.setDefaultNavigationTimeout(60*1000);
  const waitForResponseTimeCheck = setInterval(() => console.log('result 기다리는 중'), 1000);
  // await page.waitForResponse((res) => { return res.url().includes('insuranceResult.do')}, { timeout: 60*1000});

  const [response] = await Promise.all(
    [page.waitForResponse(response => response.url().includes('insuranceResult.do'), { timeout: 60*1000})]);
  console.log("🚀 ~ file: insure_certAuth.js:288 ~ response", response)
  


  clearInterval(waitForResponseTimeCheck);
  console.log('Result.do res 왔음')

  // const [, page5] = await browser.pages();

  

  const resultDetail = await page.waitForSelector("#resultDetail");
  console.log("🚀 ~ file: insure_certAuth.js ~ line 228 ~ resultDetail", resultDetail)
  

  // const resultText = await page5.$eval("#resultDetail", (result) => {
  //   return result;
  // });
  // console.log("🚀 ~ file: insure_certAuth.js ~ line 233 ~ resultText ~ resultText", resultText)

  await page.waitForFunction(() => {
    return $("#resultDetail").width() > 0
  })

  const data = await page.evaluate(() => {

    // mobile view 제거. table 가져올 때 mobile table이 같이 들어와서 중복으로 들어옴
    $('.result_list.m_view').remove()


    const titles = Array.from(document.querySelectorAll('#resultDetail h4')); 

    const InsuaranceStatusTable = $('#resultDetail table')[0]; 
    console.log("🚀 ~ file: insure_certAuth.js ~ line 229 ~ data ~ InsuaranceStatusTable[0]", InsuaranceStatusTable)
    // 그냥 전체 Table에서 select하면 mobile view 포함해서 중복 조회되므로 pc view의 선택자만 골라서 담기

    const ISTheaders = [];
    const ISTcells = {};

    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < InsuaranceStatusTable.rows[i].cells.length; j++) {
          ISTheaders.push(InsuaranceStatusTable.rows[i].cells[j].textContent)
                      }
    }

    for (let i = 2; i < InsuaranceStatusTable.rows.length; i++) {
      const cellsrow = []
        for (let j = 0; j < InsuaranceStatusTable.rows[i].cells.length; j++) {
            cellsrow.push(InsuaranceStatusTable.rows[i].cells[j].textContent)
                        }
      ISTcells[i] = cellsrow
    }

    const UnclaimedInsuaranceTable = $('#resultDetail table')[1];
      const UITheaders = [];
      const UITcells = {};

      for (let i = 0; i < 1; i++) {
        for (let j = 0; j < UnclaimedInsuaranceTable.rows[i].cells.length; j++) {
          UITheaders.push(UnclaimedInsuaranceTable.rows[i].cells[j].textContent)
                        }
      }

      for (let i = 1; i < UnclaimedInsuaranceTable.rows.length; i++) {
        const cellsrow = []
          for (let j = 0; j < UnclaimedInsuaranceTable.rows[i].cells.length; j++) {
              cellsrow.push(UnclaimedInsuaranceTable.rows[i].cells[j].textContent)
                          }
          UITcells[i] = cellsrow
      };

    const DormantInsuaranceTable = $('#resultDetail table')[2];
    const DITheaders = [];
    const DITcells = {};

    for (let i = 0; i < 1; i++) {
      for (let j = 0; j < DormantInsuaranceTable.rows[i].cells.length; j++) {
        DITheaders.push(DormantInsuaranceTable.rows[i].cells[j].textContent)
                      }
    }

    for (let i = 1; i < DormantInsuaranceTable.rows.length; i++) {
      const cellsrow = []
        for (let j = 0; j < DormantInsuaranceTable.rows[i].cells.length; j++) {
            cellsrow.push(DormantInsuaranceTable.rows[i].cells[j].textContent)
                        }
        DITcells[i] = cellsrow
    };



    const UnRepliedInsuaranceTable = $('#resultDetail table')[3];
    const URITheaders = [];
    const URITcells = {};

    for (let i = 0; i < 1; i++) {
      for (let j = 0; j < UnRepliedInsuaranceTable.rows[i].cells.length; j++) {
        URITheaders.push(UnRepliedInsuaranceTable.rows[i].cells[j].textContent)
                      }
    }

    for (let i = 1; i < UnRepliedInsuaranceTable.rows.length; i++) {
      const cellsrow = []
        for (let j = 0; j < UnRepliedInsuaranceTable.rows[i].cells.length; j++) {
            cellsrow.push(UnRepliedInsuaranceTable.rows[i].cells[j].textContent)
                        }
        URITcells[i] = cellsrow
    };


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
      UnReplied_Insuarance: {
        title: titles[3].innerText,
        header: URITheaders,
        column: URITcells,
      },
    }
})
  console.log("🚀 ~ file: insure_certAuth.js ~ line 259 ~ data ~ data", data)


  const dayKO = dayjs().format("LL LTS")

  const insureToFB = {}
  insureToFB[dayKO] = data;
  update(startRef, insureToFB, {merge: true});



  await fs.writeFile("puppeteer/TEMP_FOLDER/resultDetail.json", JSON.stringify(data), (err) =>
    console.log(err)
  );


  // const resultAllHTML = await page.$eval("#resultDetail", (result) => {
  //   return result.innerHTML;
  // });

  // const resultPage = await browser.newPage();
  // await resultPage.setContent(resultAllHTML);
  // await resultPage.screenshot({
  //   path: `puppeteer/TEMP_FOLDER/${dayjs(new Date()).locale("ko").format("llll")}.png`,
  //   fullPage: true,
  // });
  // // await resultPage.pdf({ path: `./TEMP_FOLDER/${dayjs(new Date).locale('ko').format('llll')}.pdf` });

  // const resultHTML = `
  // <!doctype html>
  //   <html lang='ko'>
  //     <head>
  //       <meta charset="utf-8">
  //     </head>
  //     <body>
  //       ${resultAllHTML}
  //     </body>
  //   </html>
  // `;
  // fs.writeFileSync(
  //   `puppeteer/TEMP_FOLDER/${dayjs(new Date()).locale("ko").format("llll")}.html`,
  //   resultHTML,
  //   "utf8",
  //   (res) => console.log("파일저장결과:", res)
  // );


  
})();
