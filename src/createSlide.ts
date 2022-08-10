// handles rendering the HTML templates
// https://github.com/puppeteer/puppeteer
import puppeteer from 'puppeteer'
import fs from 'fs'
import util from 'util'

const writeFile = util.promisify(fs.writeFile)

export const createPpt = async () => {
  const start = Date.now()
  for (let i = 0; i < 10; i++) {
    await drawSlide(`slide${i.toString()}`)
  }
  const stop = Date.now()
  console.log(`Time taken to execute = ${(stop - start) / 1000} seconds`)
}

const drawSlide = async (filename: string) => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.setViewport({
    height: 720,
    width: 1280,
  })

  // If your HTML is saved to a file, you load it like this:
  await page.goto(
    'file:///home/tfqsy/Projects/image-generation-poc/templates/slide.html'
  )

  const imageBuffer = await page.screenshot({})

  await browser.close()

  // write file to disk as buffer
  await writeFile(`${filename}.png`, imageBuffer)
}
