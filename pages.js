import puppeteer from 'puppeteer'; 

function blockingWait(seconds) {
    //simple blocking technique (wait...)
    var waitTill = new Date(new Date().getTime() + seconds * 1000);
    while(waitTill > new Date()){}

}


(async() => {
    const browser = await puppeteer.launch( {
        headless: false
    }); 

    const page1 = await browser.newPage(); 
    await page1.goto('https://www.google.com');

    const page2 = await browser.newPage(); 
    await page2.goto('https://www.bing.com');

    const pageList = await browser.pages();    
    console.log("NUMBER TABS:", pageList);

    //switch tabs here
    await page1.bringToFront();
    blockingWait(0.1);
    await page2.bringToFront();
    blockingWait(0.1);
    await page1.bringToFront();
    blockingWait(0.1);
    await page2.bringToFront();
    blockingWait(0.1);
    await page1.bringToFront();
    blockingWait(0.1);
    await page2.bringToFront();
    blockingWait(0.1);
    await page1.bringToFront();
    blockingWait(0.1);
    await page2.bringToFront();
    blockingWait(0.1);
    await page1.bringToFront();
    blockingWait(4);

    await browser.close(); 
})(); 