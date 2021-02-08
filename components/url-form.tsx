import styled from '@emotion/styled'
import * as React from 'react'

const FormContainer = styled.div`
  border: 4px solid var(--mustard);
  border-radius: 0.5em;
  padding: 4em;
  background-color: rgba(0, 0, 0, 0.2);
`

type UrlFormProps = {
  onSubmitUrl: (string) => unknown
}

const useInputChange = (setState) => {
  return (event) => {
    const {value} = event.target
    setState(value.toLowerCase())
  }
}

export default function UrlForm({onSubmitUrl}: UrlFormProps) {
  const [url, setUrl] = React.useState<string>('https://www.capdesk.com')

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    onSubmitUrl(url)
  }

  const handleUrlChange = useInputChange(setUrl)

  return (
    <FormContainer>
      <form onSubmit={handleSubmit}>
        <label>URL</label>
        <input value={url} onChange={handleUrlChange}></input>
        <button>Go</button>
      </form>
    </FormContainer>
  )
}
