import nodeHtmlToImage from 'node-html-to-image'
import fs from 'fs'

const slideHtml = fs.readFileSync('templates/slide.html', 'utf8')

const image = fs.readFileSync('public/images/tfo-logo.png')
const base64Image = Buffer.from(image).toString('base64')
const dataUri = 'data:image/jpeg;base64,' + base64Image

nodeHtmlToImage({
  output: './image.png',
  html: slideHtml,
  content: {
    tfoLogoUri: dataUri,
    clientJoinDate: 'July 2005',
    accountId: '37007',
  },
}).then(() => console.log('The image was created successfully!'))

setInterval(() => {
  console.log('Tick...')
}, 10000)
