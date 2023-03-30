/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['encrypted-tbn0.gstatic.com', 'openweathermap.org', 'i.ytimg.com']
  }
}
