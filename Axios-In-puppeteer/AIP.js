const xlsx = require("xlsx");
const puppeteer = require("puppeteer");
const axios = require("axios");
const fs = require("fs");
const add_to_sheet = require("./add_to_sheet");

const workbook = xlsx.readFile("Axios-In-puppeteer/xlsx/data.xlsx");
const ws = workbook.Sheets.영화목록;
const records = xlsx.utils.sheet_to_json(ws);

fs.readdir('Axios-In-puppeteer/screenshot', (err) => {
  if(err){
    console.error("screenshot 폴더가 없어 screenshot 폴더를 생성합니다 ")
    fs.mkdirSync("Axios-In-puppeteer/screenshot");
  }
});


fs.readdir('Axios-In-puppeteer/poster', (err) => {
  if(err){
    console.error("poster 폴더가 없어 poster 폴더를 생성합니다 ")
    fs.mkdirSync("Axios-In-puppeteer/poster");
  }
});

const crawler = async () => {
  try {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    //본인이 브라우저를 하는것 처럼 진행
    //속이기
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36"
    );
    add_to_sheet(ws, 'C1', 's', '평점');
    for (const [i, r] of records.entries()) {
      console.log("🚀 ~ file: AIP.js ~ line 37 ~ crawler ~ r", r)
      console.log("🚀 ~ file: AIP.js ~ line 37 ~ crawler ~ i", i)
      await page.goto(r.링크);
      const result = await page.evaluate(() => {
        const scoreEl = document.querySelector('.score.score_left .star_score');
        let score = '';
        if(scoreEl){
          score = score.textContent;
        }
        const imgEl = document.querySelector(".poster img");
        let img = ''
        if(imgEl) {
          img = imgEl.src;
        }
        return {
          score,
          img
        }
      });

      if (result.score) {
        const newCell = 'C' + (i + 2);
        console.log(r.제목, '평점',result.score.trim());
        add_to_sheet(ws, newCell, 'n', parseFloat(result.score.trim()));
      }
      if(result.img){
        console.log("🚀 ~ file: AIP.js ~ line 63 ~ crawler ~ result.img", result.img)
        // buffer가 연속적으로 들어있는 자료구조 
        // 이미지 주소를 요청받아서 배열들을 받아온다.
        //  ?.+$ 에서 .은 모든 단어 +는 한개 이상 $는 끝을 의미합니다
        // ? 부터 끝부분까지 제거한다 (즉 ?이후 요청을 제거하는 방식);
        const imgResult = await axios.get(result.img.replace(/\?.*$/, ''), {
          responseType: 'arraybuffer'
        });
        fs.writeFileSync(`Axios-In-puppeteer/poster/${r.제목}.jpg`, imgResult.data);
      }
      
      await page.waitFor(1000);
    }
    await page.close();
    await browser.close();
    xlsx.writeFile(workbook, 'Axios-In-puppeteer/xlsx/result.xlsx');
  } catch (e) {
    console.error(e);
  }
};
crawler();