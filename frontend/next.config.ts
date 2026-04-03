import path from 'path'
import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  turbopack: {
    root: path.join(__dirname, ''),
  },
  sassOptions: {
    implementation: 'sass-embedded',
    additionalData: `@use "${path.join(process.cwd(), 'src/styles/_mantine').replace(/\\/g, '/')}" as mantine;`,
  },
}

export default withNextIntl(nextConfig)
