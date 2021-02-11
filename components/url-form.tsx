import styled from '@emotion/styled'
import * as React from 'react'
import Button, {ButtonContainer} from './button'

const Input = styled.input`
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
  border: none;
  flex: 1;
  @media (max-width: 800px) {
    border-top-right-radius: 0.2em;
    border-bottom-right-radius: 0.2em;
  }
  @media (max-width: 580px) {
    border-radius: 0.2em;
  }
`
const Prefix = styled.div`
  display: flex;
  align-items: center;
  color: rgba(255, 255, 255, 0.8);

  border-top-left-radius: 0.2em;
  border-bottom-left-radius: 0.2em;
  border: 2px solid rgba(255, 255, 255, 0.2);

  @media (max-width: 580px) {
    display: none;
  }
`

const Form = styled.form`
  display: flex;
  flex-direction: row;
  overflow: hidden;

  border: 4px solid var(--mustard);
  border-radius: 0.5em;
  padding: 4em;

  background-color: rgba(0, 0, 0, 0.2);

  @media (max-width: 800px) {
    padding: 1em;
    flex-wrap: wrap;
    button {
      width: 100%;
    }
  }

  ${Prefix},
  ${Input},
  ${ButtonContainer} {
    color: white;
    font-size: 2em;
    padding: 0.5em;
    font-family: monospace;
  }
`

type UrlFormProps = {
  onSubmitUrl: (string) => unknown
  loading: boolean
}

const useInputChange = (setState) => {
  return (event) => {
    const {value} = event.target
    if (typeof value !== 'string') {
      return
    }
    setState(
      value
        .replace(/^(https?:\/\/)?/, '')
        .replace(/\/\/$/, '/')
        .toLowerCase(),
    )
  }
}
export default function UrlForm({onSubmitUrl, loading}: UrlFormProps) {
  const [url, setUrl] = React.useState<string>('')

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    onSubmitUrl(url.replace(/\/$/, ''))
  }

  const handleUrlChange = useInputChange(setUrl)

  return (
    <Form onSubmit={handleSubmit}>
      <Prefix>https://</Prefix>
      <Input
        name="URL"
        pattern="^[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$"
        aria-label="Type the website URL"
        value={url}
        onChange={handleUrlChange}
        placeholder="stripe.com"
        required
      ></Input>
      <Button loading={loading}>Generate</Button>
    </Form>
  )
}
