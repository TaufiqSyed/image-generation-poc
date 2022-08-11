import { Canvas, loadImage } from 'skia-canvas'

const createPpt = async () => {
  const start = Date.now()
  for (let i = 0; i < 10; i++) {
    await drawSlide(`slide${i.toString()}`)
  }
  const stop = Date.now()
  console.log(`Time taken to execute = ${(stop - start) / 1000} seconds`)
}

const drawSlide = async (filename: string) => {
  const canvas = new Canvas(1280, 720),
    ctx = canvas.getContext('2d')

  // const image = await loadImage('/assets/image/mojave_night.png')
  const image = await loadImage(
    '/home/tfqsy/Projects/image-generation-poc/assets/images/mojave_night.jpg'
  )
  ctx.drawImage(image, 0, 0, 1280, 720)
  canvas.saveAs('assets/images/slide.png', { density: 2 })
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
