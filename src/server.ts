import nodeHtmlToImage from 'node-html-to-image'
import fs from 'fs'
import util from 'util'

process.setMaxListeners(1000)

const readFile = util.promisify(fs.readFile)

const timer = () => {
  const start = Date.now()
  const getDelayInSeconds = () => {
    const stop = Date.now()
    return (stop - start) / 1000
  }
  return getDelayInSeconds
}

export const generateImages = async () => {
  const slideTimer = timer()
  const N = 1
  await Promise.all(
    new Array(N).fill(0).map((_, idx) => drawSlide(`slide${idx.toString()}`))
  )
  console.log(`Time taken to execute = ${slideTimer()} seconds`)
}

const imageTobase64 = (image: Buffer) => Buffer.from(image).toString('base64')
const base64ImageToDataUri = (base64Image: string) =>
  'data:image/jpeg;base64,' + base64Image

const drawSlide = async (filename: string) => {
  const slideHtml = await readFile('templates/slide.html', 'utf8')
  const backgroundImage: Buffer = await readFile(
    'public/images/synthesia_background_image.png'
  )
  const backgroundUri = base64ImageToDataUri(imageTobase64(backgroundImage))
  const tfoLogoImage: Buffer = await readFile(
    'public/images/tfo_logo_white.png'
  )
  const tfoLogoUri = base64ImageToDataUri(imageTobase64(tfoLogoImage))

  await nodeHtmlToImage({
    output: `./generated/images/${filename}.png`,
    html: slideHtml,
    content: {
      backgroundUri,
      tfoLogoUri,
      clientJoinDate: 'July 2005',
      accountId: '37007',
    },
  })
}

generateImages()

setInterval(() => {
  console.log('Tick...')
}, 1000)
