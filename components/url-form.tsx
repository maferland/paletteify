import * as React from 'react'

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
    <form onSubmit={handleSubmit}>
      <label>URL</label>
      <input value={url} onChange={handleUrlChange}></input>
      <button>Go</button>
    </form>
  )
}
