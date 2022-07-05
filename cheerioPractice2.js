const request = require('request-promise')
const cheerio = require('cheerio')
const v = require('voca')
const html2canvas = require('html2canvas');
const jsPDF = require('jspdf');
const fs = require('fs');

request('http://ruliweb.com').then(async function (html) {

    // Cheerio 오브젝트 생성
    const $ = cheerio.load(html)
    console.log("🚀 ~ file: cheerioPractice2.js ~ line 9 ~ $", $)

    // 셀렉터 캐시로 Cheerio 오브젝트 생성
    const $articleList = $('#total_userinfo > div.widget_bottom.row')
    console.log($articleList.length)
    console.log($articleList.html())

    const $articleInfo = $articleList.children()
    console.log("🚀 ~ file: cheerioPractice2.js ~ line 16 ~ $articleInfo", $articleInfo)

    
    
    let title = $articleInfo.text()
    title = v.replaceAll(title, '\t', '')
    title = v.replaceAll(title, '\r\n', '')
    title = v.replaceAll(title, '\n', '')
    title = v.trim(title)
    
    console.log("🚀 ~ file: cheerioPractice2.js ~ line 19 ~ title", title)


    await fs.writeFile('ruliwebTitle.json', title, (err) => console.log(err))
    


})