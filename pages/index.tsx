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
  padding-top: 32px;
  margin-bottom: -0.25em;
`

const Container = styled.div`
  max-width: 1200px;
  padding: 0 1em;
  margin: auto;
`

const Info = styled.div`
  font-size: 1rem;
  font-family: monospace;
  margin: 0 auto;
  color: #fff;
  text-align: center;
`

export type Color = {
  name: string
  code: string
}

const usePoller = (
  pollUrl: string,
  handlePollCompleted: () => unknown,
  handlePollError: (error: string) => unknown,
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
    const {state, reason} = await fetch(`${pollUrl}${jobId}`, {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
    }).then((r) => r.json())

    switch (state) {
      case 'completed':
        handlePollCompleted()
        break
      case 'failed':
        handlePollError(reason)
        break
      default:
        setTimeout(() => poll(), wait)
    }
  }
  return setJobId
}

const usePalette = (): [Color[], boolean, string, React.Dispatch<any>] => {
  const [url, setUrl] = React.useState<string>('')
  const [palette, setPalette] = React.useState<Color[]>([])
  const [loading, setLoading] = React.useState<boolean>(false)
  const [error, setError] = React.useState<string>('zzz')
  const setJobId = usePoller(
    'https://paletteify-server.herokuapp.com/poll/',
    fetchPalette,
    (error) => {
      setError(`Something is preventing ${url} from being captured 😢`)
      setLoading(false)
    },
  )

  function fetchPalette() {
    fetch('https://paletteify-server.herokuapp.com/generate', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        url: `https://${url}`,
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
    setError('')
    fetchPalette()
  }, [url])

  return [palette, loading, error, setUrl]
}

export default function Home() {
  const [palette, loading, error, setUrl] = usePalette()

  function generatePalette(url) {
    if (loading || !url) {
      return
    }

    setUrl(url.toLowerCase())
  }

  return (
    <Layout>
      <Container>
        <Title>Paletteify</Title>
        <UrlForm
          onSubmitUrl={generatePalette}
          loading={loading}
          error={error}
        />
        <Palette palette={palette} loading={loading} />
        <Info>
          <p>Generating a color palette can take a few seconds</p>
          <p>Bear with us 🧸</p>
        </Info>
      </Container>
    </Layout>
  )
}
