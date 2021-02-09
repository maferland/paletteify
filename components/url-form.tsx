import styled from '@emotion/styled'
import * as React from 'react'

const FormContainer = styled.div`
  border: 4px solid var(--mustard);
  border-radius: 0.5em;
  padding: 4em;
  background-color: rgba(0, 0, 0, 0.2);
  color: white;
`
const Input = styled.input`
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
  border: none;
`
const Prefix = styled.div`
  display: flex;
  align-items: center;
  min-height: 100%;
  color: rgba(255, 255, 255, 0.8);

  border-top-left-radius: 0.2em;
  border-bottom-left-radius: 0.2em;
  border: 2px solid rgba(255, 255, 255, 0.2);
`
const Button = styled.button`
  border-top-right-radius: 0.2em;
  border-bottom-right-radius: 0.2em;
  outline: none;
  box-shadow: none;
  background: rgba(0, 0, 0, 0.9);
  border: 4px solid transparent;
  cursor: pointer;
  :hover {
    border: 4px solid #596b7f;
  }
`
const Form = styled.form`
  display: flex;
  flex-direction: row;
  * {
    color: white;
    font-size: 2em;
    padding: 0.5em;
    box-sizing: content-box;
    font-family: monospace;
  }
  ${Input} {
    width: 100%;
  }
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
  const [url, setUrl] = React.useState<string>('')

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    onSubmitUrl(url)
  }

  const handleUrlChange = useInputChange(setUrl)

  return (
    <FormContainer>
      <Form onSubmit={handleSubmit}>
        <Prefix>https://</Prefix>
        <Input
          name="URL"
          aria-label="Type the website URL"
          value={url}
          onChange={handleUrlChange}
          placeholder="stripe.com"
        ></Input>
        <Button>Generate</Button>
      </Form>
    </FormContainer>
  )
}
