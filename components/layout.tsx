import Footer from './footer'

type LayoutProps = {
  children: React.ReactElement
}

export default function Layout({children}: LayoutProps) {
  return (
    <div>
      <main>{children}</main>
      <Footer />
    </div>
  )
}
