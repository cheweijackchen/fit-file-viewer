import path from 'path'
import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'
import { DEFAULT_LOCALE } from './src/i18n/routing'

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/fit-file-viewer',
        destination: `/${DEFAULT_LOCALE}/fit-file-viewer`,
        permanent: false
      },
      {
        source: '/peaks',
        destination: `/${DEFAULT_LOCALE}/peaks`,
        permanent: false 
      },
    ]
  },
  turbopack: {
    root: path.join(__dirname, ''),
  },
  sassOptions: {
    implementation: 'sass-embedded',
    additionalData: `@use "${path.join(process.cwd(), 'src/styles/_mantine').replace(/\\/g, '/')}" as mantine;`,
  },
}

export default withNextIntl(nextConfig)
