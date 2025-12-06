const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  page.on('console', (msg) => console.log('PAGE LOG:', msg.text()));
  await page.goto('http://127.0.0.1:4173/', { waitUntil: 'load' });
  await page.waitForSelector('#root');
  // find the View App link and print href
  const href = await page.$eval('a[href*="ai.studio"], a:has-text("View App")', (a) => a.getAttribute('href'));
  console.log('VIEW APP HREF:', href);
  await page.screenshot({ path: 'render-screenshot.png', fullPage: true });
  await browser.close();
})();
