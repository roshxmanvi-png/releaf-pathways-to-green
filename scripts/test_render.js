const fs = require('fs');
const path = require('path');
(async () => {
  try {
    const { chromium } = require('playwright');
    const browser = await chromium.launch();
    const page = await browser.newPage();
    page.on('console', (msg) => console.log('PAGE LOG:', msg.text()));
    await page.goto('http://127.0.0.1:4173/');
    await page.waitForSelector('#root', { timeout: 5000 });
    await page.waitForTimeout(2000);
    const content = await page.content();
    console.log('PAGE LENGTH', content.length);
    await page.screenshot({ path: 'render-screenshot.png', fullPage: true });
    await browser.close();
  } catch (e) {
    console.error('error', e);
    process.exit(1);
  }
})();
