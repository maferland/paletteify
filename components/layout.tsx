import Footer from './footer'
import styled from '@emotion/styled'

type LayoutProps = {
  children: React.ReactElement
}

const Page = styled.div`
  background: var(--bg-color);
  color: var(--dark-blue);
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`

const Main = styled.main`
  flex: 1;
`

export default function Layout({children}: LayoutProps) {
  return (
    <Page>
      <Main>{children}</Main>
      <Footer />
    </Page>
  )
}
