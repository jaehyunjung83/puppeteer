const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const fs = require('fs');

(async () => {
  /**
   * @description 기사의 메타 정보를 추출합니다.
   *
   * @summary 제목, 요약문, 썸네일 정보를 추출합니다.
   *
   * @params {string} html - 크롤링한 페이지 html
   *
   * @returns {object}
   */
  function extractNewsData(html) {
    const newsData = {
      title: null,
      description: null,
      image: null
    };

    // cheerio 라이브러리를 사용하여 html을 DOM 으로 파싱합니다.
    const $ = cheerio.load(html);
    console.log("🚀 ~ file: cheerioPractice.js ~ line 23 ~ extractNewsData ~ $", $)
    // meta 태그만 추출합니다
    const $metaList = $('meta');
    console.log("🚀 ~ file: cheerioPractice.js ~ line 26 ~ extractNewsData ~ $metaList", $metaList)

    for (let index = 0; index < $metaList.length; index += 1) {
      const element = cheerio($metaList[index]);
      console.log("🚀 ~ file: cheerioPractice.js ~ line 28 ~ extractNewsData ~ element", element)

      // meta 태그의 content 속성 값을 추출합니다.
      let content = element.attr('content');

      if (!content || !content.trim()) {
        continue;
      }
      content = content.trim();

      // meta 태그의  property 속성 값을 추출합니다.
      let propertyAttr = element.attr('property');
      if (propertyAttr) {
        propertyAttr = propertyAttr.toLocaleLowerCase();
      }

      // 추출할 property 에 따라 newsData 에 할당합니다.
      switch (propertyAttr) {
        case 'og:title':
          newsData.title = content;
          break;
        case 'og:description':
          newsData.description = content;
          break;
        case 'og:image':
          newsData.image = content;
          break;
        default:
          break;
      }

      // meta 태그의  name 속성 값을 추출합니다.
      let nameAttr = element.attr('name');
      if (nameAttr) {
        nameAttr = nameAttr.toLocaleLowerCase();
      }

      // 추출할 name 에 따라 newsData 에 할당합니다.
      switch (nameAttr) {
        case 'title':
        case 'twitter:title':
          newsData.title = content;
          break;
        case 'description':
        case 'twitter:description':
          newsData.description = content;
          break;
        case 'twitter:image':
          newsData.image = content;
          break;
        default:
          break;
      }
    } // end for

    return newsData;
  } // end extractNewsDate()

  // 브라우저 옵션 설정
  const browserOption = {
    slowMo: 500, // 디버깅용으로 퍼핏티어 작업을 지정된 시간(ms)만큼 늦춥니다.
    headless: false // 디버깅용으로 false 지정하면 브라우저가 자동으로 열린다.
  };

  // 1. 브라우저를 띄운다. => 브라우저 객체 생성
  const browser = await puppeteer.launch(browserOption);

  // 2. 페이지를 띄운다. => 페이지 객체 생성
  const page = await browser.newPage();

  let response;
  try {
    // 리다이렉트 되는 페이지의 주소를 사용.
    const url =
      'http://www.thebell.co.kr/front/free/contents/news/article_view.asp?key=201807250100046030002891';

    // 탭 옵션
    const pageOption = {
      // waitUntil: 적어도 500ms 동안 두 개 이상의 네트워크 연결이 없으면 탐색이 완료된 것으로 간주합니다.
      waitUntil: 'networkidle2',
      // timeout: 20초 안에 새 탭의 주소로 이동하지 않으면 에러 발생
      timeout: 20000
    };

    // 3. 새 탭에 뉴스 기사 주소를 입력해서 접속한다.
    response = await page.goto(url, pageOption);
  } catch (error) {
    await page.close();
    await browser.close();

    console.error(error);
    return;
  }

  let html;
  try {
    // 4. 웹페에지의 페이지 소스를 확인한다. => 페이지 소스 코드를 얻는다.
    html = await response.text();
    console.log("🚀 ~ file: cheerioPractice.js ~ line 125 ~ html", html)
  } catch (error) {
    console.error(error);
    return;
  } finally {
    // catch 구문에 return 이 존재해도 finally 구문은 실행 합니다.

    // 6. 페이지 닫기
    await page.close();
    // 7. 브라우저 닫기
    await browser.close();
  }

  // 5. 페이지 소스에서 아래 속성 값을 가진 `<meta>` 태그의 `content` 속성 값을 추출한다.
  const newsData = extractNewsData(html);

  // 크롤링 결과
  console.log('result newsData: ', newsData);
})();