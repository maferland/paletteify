import styled from '@emotion/styled'

const Container = styled.footer`
  text-align: center;
  color: white;
  font-family: monospace;
  font-size: 1rem;
  padding: 0.25em;

  a {
    text-decoration: underline;
    color: white;
  }
`

export default function Footer() {
  const year = new Date().getFullYear().toString()

  return (
    <Container>
      © Built with &lt;3 by <a href="https://maferland.com">maferland</a> -{' '}
      {year}
    </Container>
  )
}
