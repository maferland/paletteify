const API = process.env.NEXT_PUBLIC_API

module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/:slug*',
        destination: `${API}/:slug*`,
      },
    ]
  },
}
