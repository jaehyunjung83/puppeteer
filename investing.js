
const puppeteer = require('puppeteer');

// 각 원자재 이름과 URL 정보가 있는 MAP을 생성
const urlMap = new Map([
  ['silver','https://kr.investing.com/commodities/silver'],
  ['wti','https://kr.investing.com/commodities/crude-oil'],
  ['gas','https://kr.investing.com/commodities/natural-gas']
]);

(async () => { 
  // puppeteer 실행 (puppeteer-core가 아닌 puppeteer를 설치하면 내장 크로미움으로 실행되므로 executablePath 설정 불필요)
  const browser = await puppeteer.launch({ 
    // executablePath: 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe' 
    headless : false
    });
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
    // req.continue();
  });

  // let urlKeys = urlMap.keys();
  // for(var v of urlKeys){

  
  //   var url = urlMap.get(v);
  //   await page.goto(url);

  
  //   await page.waitForSelector('div[data-test="instrument-header-details"]'); 
  //   let price = await page.$eval('div[data-test="instrument-header-details"] span[data-test="instrument-price-last"]', x=> x.innerHTML);
  
  //   console.log(v,":",price,"$");
  // }


  await page.goto('https://kr.investing.com/commodities/');
  
  // const category = await page.$$eval('td.noWrap bold left noWrap', (category) => { return category })
// *[@id="pair_8830"]/td[2]/a

const a = await page.$$eval('[id^="pair_"] > td.noWrap.bold.left.noWrap > a', 
(a) => a.map(attr => attr.href)
        .filter((href) => href.includes('/commodities/'))
);

const dupRemove = [...new Set(a)]
console.log("🚀 ~ file: investing.js ~ line 57 ~ dupRemove", dupRemove)


// const tdA = await page.$$eval('.noWrap.bold.left.noWrap > a', 
// (a) => a.map((attr) => attr.title)
// );
// console.log("🚀 ~ file: investing.js ~ line 60 ~ tdA", tdA)

// const href = tdA.filter((href) => href.includes('commodities'));
// console.log("🚀 ~ file: investing.js ~ line 61 ~ href", href)

// console.log("🚀 ~ file: investing.js ~ line 61 ~ tdA", tdA)

  // const classes = await page.$eval('#dailyTab', (ele) => ele.find('a[href^="/commodities/"]'));
  // console.log("🚀 ~ file: investing.js ~ line 56 ~ classes", classes)

  // const categoryFiltered = classes.find('a[href^="/commodities/"]')
  // console.log("🚀 ~ file: investing.js ~ line 54 ~ categoryFiltered", categoryFiltered)

  await page.waitForNavigation();

  await browser.close();

})();