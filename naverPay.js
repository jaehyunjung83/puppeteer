import puppeteer from "puppeteer-extra";


(async() => {
const browser = await puppeteer.launch(
	{ headless: false, devtools: false ,
		args: [
		// '--start-fullscreen',
		// "--window-size=1920,1080", 
		// "--disable-notifications", 
		'--disable-web-security',
		// '--disable-features=IsolateOrigins',
		// '--disable-features=BlockInsecurePrivateNetworkRequests',
		// '--disable-site-isolation-trials'
	] }
	// { userDataDir: './user-data-dir' }
	);
const page = await browser.newPage()
const navigationPromise = page.waitForNavigation()


page.setDefaultNavigationTimeout(60000000);
3
await page.goto('https://www.naver.com/')

await page.setViewport({ width: 1313, height: 943 })

await page.waitForSelector('#NM_INT_RIGHT > .column_fix_wrap > #account > .link_login > .ico_naver')
await page.click('#NM_INT_RIGHT > .column_fix_wrap > #account > .link_login > .ico_naver')

await navigationPromise

await page.evaluate(() => document.querySelectorAll('input#id.input_text')[0].value = 'jjjh1983')
await page.evaluate(() => document.querySelectorAll('input#pw.input_text')[0].value = 'wjdwogus7*')


await page.waitForSelector('log.login')
await page.click('log.login')

await navigationPromise

await page.waitForSelector('#NM_FAVORITE > .group_nav > .type_fix > .nav_item:nth-child(7) > .nav')
await page.click('#NM_FAVORITE > .group_nav > .type_fix > .nav_item:nth-child(7) > .nav')

await navigationPromise

await page.waitForSelector('#_rangeFromDateSpan')
await page.click('#_rangeFromDateSpan')

await page.waitForSelector('td > #_rangeDateArea > #chku_calendar1 > .chku_mth > .calendar-btn-prev-mon')
await page.click('td > #_rangeDateArea > #chku_calendar1 > .chku_mth > .calendar-btn-prev-mon')

await page.waitForSelector('td > #_rangeDateArea > #chku_calendar1 > .chku_mth > .calendar-btn-next-mon')
await page.click('td > #_rangeDateArea > #chku_calendar1 > .chku_mth > .calendar-btn-next-mon')

await page.waitForSelector('td > #_rangeDateArea > #chku_calendar1 > .chku_mth > .calendar-btn-next-mon')
await page.click('td > #_rangeDateArea > #chku_calendar1 > .chku_mth > .calendar-btn-next-mon')

await page.waitForSelector('td > #_rangeDateArea > #chku_calendar1 > .chku_mth > .calendar-btn-next-mon')
await page.click('td > #_rangeDateArea > #chku_calendar1 > .chku_mth > .calendar-btn-next-mon')

await page.waitForSelector('td > #_rangeDateArea > #chku_calendar1 > .chku_mth > .calendar-btn-next-mon')
await page.click('td > #_rangeDateArea > #chku_calendar1 > .chku_mth > .calendar-btn-next-mon')

await page.waitForSelector('td > #_rangeDateArea > #chku_calendar1 > .chku_mth > .calendar-btn-next-mon')
await page.click('td > #_rangeDateArea > #chku_calendar1 > .chku_mth > .calendar-btn-next-mon')

await page.waitForSelector('td > #_rangeDateArea > #chku_calendar1 > .chku_mth > .calendar-btn-next-mon')
await page.click('td > #_rangeDateArea > #chku_calendar1 > .chku_mth > .calendar-btn-next-mon')

await page.waitForSelector('td > #_rangeDateArea > #chku_calendar1 > .chku_mth > .calendar-btn-next-mon')
await page.click('td > #_rangeDateArea > #chku_calendar1 > .chku_mth > .calendar-btn-next-mon')

await page.waitForSelector('td > #_rangeDateArea > #chku_calendar1 > .chku_mth > .calendar-btn-next-mon')
await page.click('td > #_rangeDateArea > #chku_calendar1 > .chku_mth > .calendar-btn-next-mon')

await page.waitForSelector('td > #_rangeDateArea > #chku_calendar1 > .chku_mth > .calendar-btn-next-mon')
await page.click('td > #_rangeDateArea > #chku_calendar1 > .chku_mth > .calendar-btn-next-mon')

await page.waitForSelector('td > #_rangeDateArea > #chku_calendar1 > .chku_mth > .calendar-btn-next-mon')
await page.click('td > #_rangeDateArea > #chku_calendar1 > .chku_mth > .calendar-btn-next-mon')

await page.waitForSelector('td > #_rangeDateArea > #chku_calendar1 > .chku_mth > .calendar-btn-next-mon')
await page.click('td > #_rangeDateArea > #chku_calendar1 > .chku_mth > .calendar-btn-next-mon')

await page.waitForSelector('td > #_rangeDateArea > #chku_calendar1 > .chku_mth > .calendar-btn-next-mon')
await page.click('td > #_rangeDateArea > #chku_calendar1 > .chku_mth > .calendar-btn-next-mon')

await page.waitForSelector('td > #_rangeDateArea > #chku_calendar1 > .chku_mth > .calendar-btn-next-mon')
await page.click('td > #_rangeDateArea > #chku_calendar1 > .chku_mth > .calendar-btn-next-mon')

await page.waitForSelector('td > #_rangeDateArea > #chku_calendar1 > .chku_mth > .calendar-btn-next-mon')
await page.click('td > #_rangeDateArea > #chku_calendar1 > .chku_mth > .calendar-btn-next-mon')

await page.waitForSelector('td > #_rangeDateArea > #chku_calendar1 > .chku_mth > .calendar-btn-next-mon')
await page.click('td > #_rangeDateArea > #chku_calendar1 > .chku_mth > .calendar-btn-next-mon')

await page.waitForSelector('td > #_rangeDateArea > #chku_calendar1 > .chku_mth > .calendar-btn-next-mon')
await page.click('td > #_rangeDateArea > #chku_calendar1 > .chku_mth > .calendar-btn-next-mon')

await page.waitForSelector('td > #_rangeDateArea > #chku_calendar1 > .chku_mth > .calendar-btn-next-mon')
await page.click('td > #_rangeDateArea > #chku_calendar1 > .chku_mth > .calendar-btn-next-mon')

await page.waitForSelector('td > #_rangeDateArea > #chku_calendar1 > .chku_mth > .calendar-btn-next-mon')
await page.click('td > #_rangeDateArea > #chku_calendar1 > .chku_mth > .calendar-btn-next-mon')

await page.waitForSelector('td > #_rangeDateArea > #chku_calendar1 > .chku_mth > .calendar-btn-next-mon')
await page.click('td > #_rangeDateArea > #chku_calendar1 > .chku_mth > .calendar-btn-next-mon')

await page.waitForSelector('td > #_rangeDateArea > #chku_calendar1 > .chku_mth > .calendar-btn-next-mon')
await page.click('td > #_rangeDateArea > #chku_calendar1 > .chku_mth > .calendar-btn-next-mon')

await page.waitForSelector('td > #_rangeDateArea > #chku_calendar1 > .chku_mth > .calendar-btn-next-mon')
await page.click('td > #_rangeDateArea > #chku_calendar1 > .chku_mth > .calendar-btn-next-mon')

await page.waitForSelector('td > #_rangeDateArea > #chku_calendar1 > .chku_mth > .calendar-btn-next-mon')
await page.click('td > #_rangeDateArea > #chku_calendar1 > .chku_mth > .calendar-btn-next-mon')

await page.waitForSelector('table > tbody > .calendar-week > .calendar-over > .calendar-date')
await page.click('table > tbody > .calendar-week > .calendar-over > .calendar-date')

await page.waitForSelector('tr > td > #_rangeDateArea > #_rangeToDateA > .ico')
await page.click('tr > td > #_rangeDateArea > #_rangeToDateA > .ico')

await page.waitForSelector('td > #_rangeDateArea > #chku_calendar1 > .chku_mth > .calendar-btn-prev-mon')
await page.click('td > #_rangeDateArea > #chku_calendar1 > .chku_mth > .calendar-btn-prev-mon')

await page.waitForSelector('table > tbody > .calendar-week > .calendar-over > .calendar-date')
await page.click('table > tbody > .calendar-week > .calendar-over > .calendar-date')

await page.waitForSelector('.terms > tbody > tr > .btn > .btn_srch')
await page.click('.terms > tbody > tr > .btn > .btn_srch')

await navigationPromise

await page.waitForSelector('#_rowLi20220929110922CHK2022092934089691 > .goods_item > .goods_info > .goods > .name')
await page.click('#_rowLi20220929110922CHK2022092934089691 > .goods_item > .goods_info > .goods > .name')

await navigationPromise

await page.waitForSelector('#content > .sub_sc2 > .bx > .btn_area > .receipt')
await page.click('#content > .sub_sc2 > .bx > .btn_area > .receipt')

await navigationPromise

await page.waitForSelector('.tb_list4 > tbody > .first > .price > .card')
await page.click('.tb_list4 > tbody > .first > .price > .card')

await navigationPromise

await page.waitForSelector('body > #pop_wrap > #pop_footer > .btn_print')
await page.click('body > #pop_wrap > #pop_footer > .btn_print')

await page.waitForSelector('body > #pop_wrap > #pop_footer > .btn_close')
await page.click('body > #pop_wrap > #pop_footer > .btn_close')

await navigationPromise

await page.waitForSelector('#_rowLi20220926105434CHK2022092696624281 > .goods_item > .goods_info > .goods > .name')
await page.click('#_rowLi20220926105434CHK2022092696624281 > .goods_item > .goods_info > .goods > .name')

await navigationPromise

await page.waitForSelector('#content > .sub_sc2 > .bx > .btn_area > .receipt')
await page.click('#content > .sub_sc2 > .bx > .btn_area > .receipt')

await navigationPromise

await page.waitForSelector('.tb_list4 > tbody > .first > .price > .card')
await page.click('.tb_list4 > tbody > .first > .price > .card')

await navigationPromise

await page.screenshot({ path: 'screenshot_1.png', fullPage: true })

await page.waitForSelector('body > #pop_wrap > #pop_footer > .btn_close')
await page.click('body > #pop_wrap > #pop_footer > .btn_close')

await page.waitForSelector('.tb_list4 > tbody > tr > .price > ._click\\(nmp\\.front\\.order\\.receipt\\.openC2CardReceiptPopup\\(2022092614521331\\,p\\,2022092696624211\\)\\)')
await page.click('.tb_list4 > tbody > tr > .price > ._click\\(nmp\\.front\\.order\\.receipt\\.openC2CardReceiptPopup\\(2022092614521331\\,p\\,2022092696624211\\)\\)')

await navigationPromise

await page.screenshot({ path: 'screenshot_2.png', fullPage: true })

await page.waitForSelector('body > #pop_wrap > #pop_footer > .btn_close')
await page.click('body > #pop_wrap > #pop_footer > .btn_close')

await page.waitForSelector('.tb_list4 > tbody > tr > .price > ._click\\(nmp\\.front\\.order\\.receipt\\.openC2CardReceiptPopup\\(2022092614521331\\,p\\,2022092696624221\\)\\)')
await page.click('.tb_list4 > tbody > tr > .price > ._click\\(nmp\\.front\\.order\\.receipt\\.openC2CardReceiptPopup\\(2022092614521331\\,p\\,2022092696624221\\)\\)')

await navigationPromise

await page.screenshot({ path: 'screenshot_3.png', fullPage: true })

await page.waitForSelector('body > #pop_wrap > #pop_footer > .btn_close')
await page.click('body > #pop_wrap > #pop_footer > .btn_close')

await navigationPromise

await page.waitForSelector('#_rowLi20220917121503CHK2022091773441211 > .goods_item > .goods_info > .goods > .name')
await page.click('#_rowLi20220917121503CHK2022091773441211 > .goods_item > .goods_info > .goods > .name')

await navigationPromise

await page.waitForSelector('#content > .sub_sc2 > .bx > .btn_area > .receipt')
await page.click('#content > .sub_sc2 > .bx > .btn_area > .receipt')

await navigationPromise

await page.waitForSelector('.tb_list4 > tbody > .first > .price > .card')
await page.click('.tb_list4 > tbody > .first > .price > .card')

await navigationPromise

await page.screenshot({ path: 'screenshot_4.png', fullPage: true })

await page.waitForSelector('body > #pop_wrap > #pop_footer > .btn_close')
await page.click('body > #pop_wrap > #pop_footer > .btn_close')

await navigationPromise

await browser.close()

})();