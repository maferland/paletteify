import styled from '@emotion/styled'
import * as React from 'react'
import Layout from '../components/layout'
import Palette from '../components/palette'
import UrlForm from '../components/url-form'

const Title = styled.h1`
  color: #fff;
  font-size: 8rem;
  font-family: 'Grand Hotel', cursive;
  text-shadow: 5px 5px var(--dark-blue);
  letter-spacing: 1px;
  padding-top: 1em;
  margin-bottom: -0.25em;
`

const Container = styled.div`
  max-width: 1200px;
  padding: 0 1em;
  width: calc(100% - 2em);
  margin: auto;
`

export type Color = {
  name: string
  code: string
}

const usePoller = (
  pollUrl: string,
  handlePollCompleted: () => unknown,
  wait: number = 5000,
) => {
  const [jobId, setJobId] = React.useState<string | undefined>()
  const [unmounted, setUnmounted] = React.useState<boolean>(false)

  React.useEffect(() => {
    return () => setUnmounted(true)
  }, [])
  React.useEffect(() => {
    if (!jobId || unmounted) {
      return
    }
    poll()
  }, [jobId])

  async function poll() {
    if (unmounted) {
      return
    }
    const {state} = await fetch(`${pollUrl}${jobId}`, {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
    }).then((r) => r.json())

    switch (state) {
      case 'completed':
        handlePollCompleted()
        break
      case 'failed':
        break
      default:
        setTimeout(() => poll(), wait)
    }
  }
  return setJobId
}

const usePalette = (): [Color[], boolean, React.Dispatch<any>] => {
  const [url, setUrl] = React.useState<string>('')
  const [palette, setPalette] = React.useState<Color[]>([])
  const [loading, setLoading] = React.useState<boolean>(false)
  const setJobId = usePoller(
    'https://paletteify-server.herokuapp.com/poll/',
    fetchPalette,
  )

  function fetchPalette() {
    fetch('https://paletteify-server.herokuapp.com/generate', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        url,
      }),
    })
      .then((r) => r.json())
      .then(({id, palette}) => {
        if (id) {
          return setJobId(id)
        }
        setPalette(palette)
        setLoading(false)
      })
  }

  React.useEffect(() => {
    if (!url || loading) {
      return
    }
    setPalette([])
    setLoading(true)
    fetchPalette()
  }, [url])

  return [palette, loading, setUrl]
}

export default function Home() {
  const [palette, loading, setUrl] = usePalette()

  function generatePalette(url) {
    if (loading || !url) {
      return
    }

    setUrl(url)
  }

  return (
    <Layout>
      <Container>
        <Title>Paletteify</Title>
        <UrlForm onSubmitUrl={generatePalette} />
        <Palette palette={palette} />
      </Container>
    </Layout>
  )
}
