import { createCanvas, loadImage } from 'canvas'
import fs from 'fs'
import util from 'util'

const writeFile = util.promisify(fs.writeFile)

const drawSlide = async () => {
  // Fetch data...
  const clientJoinDate: String = 'July 2005'
  const accountId: String = '37007'

  const width = 1200
  const height = 627

  const canvas = createCanvas(width, height)
  const context = canvas.getContext('2d')

  context.fillStyle = '#181818'
  context.fillRect(0, 0, width, height)

  context.font = "24pt 'PT Sans'"
  context.fillStyle = '#fff'
  context.fillText('Portfolio Summary', 300, 100)

  context.font = "14pt 'PT Sans'"
  context.fillStyle = '#fff'
  context.fillText(
    `Relationship since ${clientJoinDate} • Account #${accountId}`,
    700,
    100
  )

  const tfoLogoImage = await loadImage('public/images/tfo-logo.png')

  const imagePosition = {
    w: 175,
    h: 115,
    x: 25,
    y: 25,
  }
  const { w, h, x, y } = imagePosition
  context.drawImage(tfoLogoImage, x, y, w, h)

  const buffer = canvas.toBuffer('image/png')
  await writeFile('assets/images/myImage.png', buffer)
}

export default drawSlide
