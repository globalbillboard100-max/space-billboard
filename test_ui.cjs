const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Set viewport for a nice screenshot
  await page.setViewport({ width: 1280, height: 720 });
  
  page.on('console', msg => console.log('BROWSER LOG:', msg.text()));
  page.on('pageerror', error => console.log('BROWSER ERROR:', error.message));
  
  console.log("Navigating to http://localhost:3000...");
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  
  // Wait a moment for 3D to initialize
  await new Promise(r => setTimeout(r, 3000));
  
  console.log("Typing 'Digital' in the search bar...");
  await page.click('input[type="text"]');
  await page.keyboard.type('Digital');
  await new Promise(r => setTimeout(r, 1000)); // Wait for filtered list to appear
  
  console.log("Pressing Enter to select 'Digital Lovers'...");
  await page.keyboard.press('Enter');
  
  // Wait for the camera fly-to animation (should take about 1-2 seconds)
  console.log("Waiting for camera fly-to animation...");
  await new Promise(r => setTimeout(r, 4000));
  
  // Take a screenshot of the result
  const screenshotPath = 'C:\\Users\\SAHIL SAHANI\\.gemini\\antigravity\\brain\\f705e3bf-a505-4bdd-b3c3-fd01c374bac2\\test_screenshot.png';
  await page.screenshot({ path: screenshotPath });
  console.log("Saved screenshot to:", screenshotPath);
  
  // Verify UI updated
  const targetLockedText = await page.evaluate(() => {
    return document.body.innerText.includes('Target Locked') || document.body.innerText.includes('TARGET LOCKED');
  });
  
  console.log("Target Locked UI visible:", targetLockedText);
  
  await browser.close();
})();
