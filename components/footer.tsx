export default function Footer() {
  const year = new Date().getFullYear().toString()

  return (
    <footer>
      © Built with &lt;3 by <a href="https://maferland.com">maferland</a> -{' '}
      {year}
    </footer>
  )
}
