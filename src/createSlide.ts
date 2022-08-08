// handles rendering the HTML templates
// https://github.com/puppeteer/puppeteer
import puppeteer from 'puppeteer'
import fs from 'fs'
import util from 'util'

const writeFile = util.promisify(fs.writeFile)

const createSlide = async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.setViewport({
    height: 1280,
    width: 720,
  })

  // If your HTML is saved to a file, you load it like this:
  await page.goto(
    'file:///home/tfqsy/Projects/image-generation-poc/templates/slide.html'
  )

  const imageBuffer = await page.screenshot({})

  await browser.close()

  // write file to disk as buffer
  await writeFile('image.png', imageBuffer)

  // convert to base64 string if you want to:
  console.log(imageBuffer.toString('base64'))
}

export default createSlide
