import Head from 'next/head'
import styled from '@emotion/styled'

const Title = styled.h1`
  color: #220a0a;
`

export default function Home() {
  const year = new Date().getFullYear().toString()
  return (
    <div>
      <Head>
        <title>Themeify</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>

      <main>
        <Title>Themeify</Title>
      </main>

      <footer>
        © Built with &lt;3 by <a href="https://maferland.com">maferland</a> -{' '}
        {year}
      </footer>
    </div>
  )
}
