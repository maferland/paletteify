const vibrant = require('node-vibrant')
const captureWebsite = require('capture-website')
const fs = require('fs')

// https://stackoverflow.com/questions/6122571/simple-non-secure-hash-function-for-javascript
String.prototype.hashCode = function () {
  var hash = 0
  if (this.length == 0) {
    return hash
  }
  for (var i = 0; i < this.length; i++) {
    var char = this.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash // Convert to 32bit integer
  }
  return Math.abs(hash)
}

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST',
}

exports.handler = async (event, context) => {
  try {
    const {url} = JSON.parse(event.body)

    const fileName = `./screenshots/${url.hashCode()}.png`

    if (!fs.existsSync(fileName)) {
      await captureWebsite.file(url, fileName, {
        fullPage: true,
      })
    }

    const palette = await vibrant.from(fileName).getPalette()

    return {statusCode: 200, headers, body: JSON.stringify({palette})}
  } catch (error) {
    console.error(error)
    return {statusCode: 500, body: JSON.stringify(error)}
  }
}
