import { createCanvas, loadImage } from 'canvas'
import fs from 'fs'
import util from 'util'

const writeFile = util.promisify(fs.writeFile)

export const createPpt = async () => {
  const start = Date.now()
  for (let i = 0; i < 50; i++) {
    await drawSlide(`slide${i.toString()}`)
  }
  const stop = Date.now()
  console.log(`Time taken to execute = ${(stop - start) / 1000} seconds`)
}

export const drawSlide = async (filename: string) => {
  // Fetch data...
  const clientJoinDate: String = 'July 2005'
  const accountId: String = '37007'

  const width = 1280
  const height = 720

  const canvas = createCanvas(width, height)
  const context = canvas.getContext('2d')

  const backgroundImage = await loadImage('public/images/mojave_night.jpg')

  const imagePosition = {
    w: 1280,
    h: 720,
    x: 0,
    y: 0,
  }
  const { w, h, x, y } = imagePosition
  context.drawImage(backgroundImage, x, y, w, h)

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

  const buffer = canvas.toBuffer('image/png')
  await writeFile(`assets/images/${filename}.png`, buffer)
}
