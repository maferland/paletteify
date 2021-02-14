import Document, {Head, Html, Main, NextScript} from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return {...initialProps}
  }

  render() {
    return (
      <Html>
        <title>Paletteify</title>
        <meta property="og:title" content="Paletteify" />
        <meta
          property="og:description"
          content="Generate a color palette from most URL"
        />
        <meta
          property="og:image"
          content="https://paletteify.maferland.com/preview.jpg"
        />
        <meta property="og:url" content="http://paletteify.maferland.com" />
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Grand+Hotel&family=Roboto+Mono:wght@300&display=swap"
            rel="stylesheet"
          />
          <link rel="icon" href="/favicon.svg" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
