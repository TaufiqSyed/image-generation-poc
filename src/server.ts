import { Canvas, loadImage } from 'skia-canvas'

const createPpt = async () => {
  const start = Date.now()
  const N = 100
  const arr = Array.from({ length: N }, (_, index) => index + 1)
  await Promise.all(arr.map((e) => drawSlide(`slide${e.toString()}`)))
  const stop = Date.now()
  console.log(`Time taken to execute = ${(stop - start) / 1000} seconds`)
}

const drawSlide = async (filename: string) => {
  const canvas = new Canvas(1280, 720)
  const ctx = canvas.getContext('2d')
  // console.log(canvas)
  // const image = await loadImage('/assets/image/mojave_night.png')
  const image = await loadImage('assets/images/mojave_night.jpg')
  ctx.drawImage(image, 0, 0, 1280, 720)
  await canvas.saveAs(`public/images/${filename}.png`)
}

createPpt()

// render to multiple destinations using a background thread
// async function render() {
//   // save a ‘retina’ image...
//   await canvas.saveAs('rainbox.png', { density: 2 })
//   // ...or use a shorthand for canvas.toBuffer("png")
//   let pngData = await canvas.png
//   // ...or embed it in a string
//   let pngEmbed = `<img src="${await canvas.toDataURL('png')}">`
// }
// render()

// ...or save the file synchronously from the main thread
// canvas.saveAsSync('rainbox.pdf')

// canvas.saveAsSync('rainbow.pdf')
