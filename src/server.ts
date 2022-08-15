import { Canvas, loadImage } from 'skia-canvas'

const canvas = new Canvas(1920, 1080)
const ctx = canvas.getContext('2d')

console.log(canvas.gpu)

async function render() {
  const backgroundImage = await loadImage(
    'public/images/synthesia_background_image.png'
  )
  ctx.drawImage(backgroundImage, 0, 0, 1920, 1080)
  const logoImage = await loadImage('public/images/tfo_logo_white.png')
  ctx.drawImage(logoImage, 70, 50, 200, 98)
  await canvas.saveAs('generated/images/rainbox.png')
}
render()

// ...or save the file synchronously from the main thread
// canvas.saveAsSync("rainbox.pdf")
