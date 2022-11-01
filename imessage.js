// const puppeteer = require("puppeteer");
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import puppeteerExtraPluginUserAgentOverride from 'puppeteer-extra-plugin-stealth/evasions/user-agent-override/index.js';
import {writeFileSync, appendFileSync} from 'fs';
import path from 'path';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat.js';
dayjs.extend(localizedFormat);
import download from 'image-downloader';
import {ImageAnnotatorClient} from '@google-cloud/vision';
import {Tabletojson as tabletojson} from 'tabletojson';
const SQLiteMessagesDB = `${process.env.HOME}/Library/Messages/chat.db`;
// const sqlite3 = require('sqlite3').verbose()
import verbose from 'sqlite3';
const sqlite3 = verbose;
import clipboard from 'clipboardy';

const stealthPlugin = StealthPlugin();
stealthPlugin.enabledEvasions.delete('user-agent-override');
puppeteer.use(stealthPlugin);
const pluginUserAgentOverride = puppeteerExtraPluginUserAgentOverride({
  userAgent:
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36',
  platform: 'Win32',
});
puppeteer.use(pluginUserAgentOverride);

(async () => {
  const browser = await puppeteer.launch(
    {
      headless: false,
      args: [
        // '--start-fullscreen',
        // "--window-size=1920,1080",
        // "--disable-notifications",
        '--disable-web-security',
        // '--disable-features=IsolateOrigins',
        // '--disable-features=BlockInsecurePrivateNetworkRequests',
        // '--disable-site-isolation-trials'
      ],
    },
    // { userDataDir: './user-data-dir' }
  );

  const page = await browser.newPage();

  await page.setCacheEnabled(false);

  await page.setRequestInterception(true);

  page.on('request', req => {
    switch (req.resourceType()) {
      case 'font':
        // case "image":
        req.abort();
        break;
      default:
        req.continue();
    }
    // req.continue();
  });

  page.setDefaultNavigationTimeout(60000000);

  const navigationPromise = page.waitForNavigation();

  page.on('dialog', async dialog => {
    console.log('dialog', dialog);
    await dialog.accept();
  });

  await page.goto('https://google.com', {
    waitUntil: 'networkidle0',
  });
  await page.evaluate(() => window.location.assign('imessage://"+82220338500"&body=123456'))
  
  await page.keyboard.press('Enter')
  await page.keyboard.press('Accept')

  


})();