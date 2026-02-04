const path = require('path');
const fs = require('fs');
const puppeteer = require('puppeteer');

async function makePdf() {
  const htmlPath = path.join(__dirname, 'guideline.html');
  if (!fs.existsSync(htmlPath)) {
    console.error('teaching.html not found.');
    process.exit(1);
  }
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('file://' + htmlPath, { waitUntil: 'networkidle0' });
  const pdfPath = path.join(__dirname, 'Guideline-MySQL-NodeJS.pdf');
  await page.pdf({ path: pdfPath, format: 'A4', printBackground: true, margin: { top: '20mm', bottom: '20mm', left: '15mm', right: '15mm' } });
  await browser.close();
  console.log('PDF created at', pdfPath);
}

makePdf().catch(err => {
  console.error(err);
  process.exit(1);
});
