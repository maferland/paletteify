import Head from 'next/head'
import styled from '@emotion/styled'
import * as React from 'react'
import {SyntheticEvent} from 'react'

const Title = styled.h1`
  color: #220a0a;
`

export type Color = {
  name: string
  code: string
}

export default function Home() {
  const [url, setUrl] = React.useState<string>('https://www.capdesk.com')
  const [palette, setPalette] = React.useState<Color[]>([])
  const [loading, setLoading] = React.useState<boolean>(false)
  const year = new Date().getFullYear().toString()
  function generate(event: React.FormEvent) {
    event.preventDefault()
    if (loading) {
      return
    }
    setLoading(true)
    fetch('/.netlify/functions/generate', {
      method: 'POST',
      body: JSON.stringify({
        url,
      }),
    })
      .then((r) => r.json())
      .then(({palette}) => {
        setPalette(palette)
        setLoading(false)
      })
  }
  return (
    <div>
      <Head>
        <title>Themeify</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>

      <main>
        <Title>Themeify</Title>

        <form onSubmit={generate}>
          <label>URL</label>
          <input
            value={url}
            onChange={(event) => setUrl(event.target.value)}
          ></input>
          <button>Go</button>
        </form>

        {palette && <code>{JSON.stringify(palette)}</code>}
      </main>

      <footer>
        © Built with &lt;3 by <a href="https://maferland.com">maferland</a> -{' '}
        {year}
      </footer>
    </div>
  )
}
