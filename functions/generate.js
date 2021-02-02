const vibrant = require('node-vibrant')
const nodeHtmlToImage = require('node-html-to-image')
const fetch = require('node-fetch')

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST',
}

exports.handler = async (event, context) => {
  try {
    const {url} = JSON.parse(event.body)
    const html = await fetch(url).then((r) => r.text())

    await nodeHtmlToImage({
      output: './image.png',
      html,
    })

    const palette = await vibrant.from('./image.png').getPalette()

    return {statusCode: 200, headers, body: JSON.stringify({palette})}
  } catch (error) {
    console.error(error)
    return {statusCode: 500, body: JSON.stringify(error)}
  }
}
