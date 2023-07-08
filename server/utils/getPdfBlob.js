import puppeteer from 'puppeteer'

export default async function getPdfBlob(htmlTemplate) {

  const browser = await puppeteer.launch({ headless: 'new' })
  const page = await browser.newPage()

  await page.setContent(htmlTemplate, { waitUntil: 'domcontentloaded', })
  await page.emulateMediaType('screen')

  const pdfBuffer = await page.pdf({
    printBackground: true,
    format: 'A4',
  })

  await browser.close()

  return pdfBuffer
}