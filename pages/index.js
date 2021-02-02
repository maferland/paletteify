import Head from 'next/head'

export default function Home() {
  const year = new Date().getFullYear().toString()
  return (
    <div>
      <Head>
        <title>Themeify</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>

      <main>
        <h1>Themeify</h1>
      </main>

      <footer>
        © Built with &lt;3 by <a href="https://maferland.com">maferland</a> -{' '}
        {year}
      </footer>
    </div>
  )
}
