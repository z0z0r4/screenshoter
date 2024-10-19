const debug = false
const { resolve } = require('path')
require('dotenv').config({ path: resolve(__dirname, '../.env') })
const puppeteer = require('puppeteer');
const url = process.env.URL;
const outputFileName = 'output.png';

async function screenshotPage(url, outputFileName) {
    const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        headless: !debug,
        executablePath: undefined });
    const page = await browser.newPage();

    try {
        await page.goto(url, { waitUntil: 'networkidle0' });

        await page.screenshot({ path: outputFileName, fullPage: true });

        console.log(`Screenshot saved: ${outputFileName}`);
    } catch (err) {
        console.error('Error taking screenshot:', err);
    } finally {
        await browser.close();
    }
}

screenshotPage(url, outputFileName);
