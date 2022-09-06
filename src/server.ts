import express from 'express'
const app = express()
import path from 'path'

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')
app.use(express.static(path.join(__dirname, 'public')))

import { Cluster } from 'puppeteer-cluster'
;(async () => {
  const cluster = await Cluster.launch({
    concurrency: Cluster.CONCURRENCY_CONTEXT,
    maxConcurrency: 2,
  })
  await cluster.task(async ({ page, data: url }) => {
    // make a screenshot
    await page.goto('http://' + url)
    const screen = await page.screenshot()
    return screen
  })

  // setup server
  app.get('/', async function (req, res) {
    if (!req.query.url) {
      return res.end('Please specify url like this: ?url=example.com')
    }
    try {
      const screen = await cluster.execute(req.query.url)

      // respond with image
      res.writeHead(200, {
        'Content-Type': 'image/jpg',
        'Content-Length': screen.length,
      })
      res.end(screen)
    } catch (err: any) {
      // catch error
      res.end('Error: ' + err.message)
    }
  })

  app.listen(3000, function () {
    console.log('Screenshot server listening on port 3000.')
  })
})()
