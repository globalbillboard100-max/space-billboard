const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
  await page.goto('http://localhost:3000');
  await page.waitForTimeout(2000);
  
  console.log("Typing Nexus");
  // click the input
  await page.click('input[type="text"]');
  // type 'Nexus'
  await page.keyboard.type('Nexus');
  await page.waitForTimeout(500);
  console.log("Pressing enter");
  // hit Enter
  await page.keyboard.press('Enter');
  
  await page.waitForTimeout(2000);
  await browser.close();
})();
