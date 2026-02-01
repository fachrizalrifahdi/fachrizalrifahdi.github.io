import { defineConfig } from '@sanity/cli'

export default defineConfig({
  projectId: 'oiPTHJGQf',
  dataset: 'production',
  useCdn: true,
  api: {
    useCdn: true
  },
  basePath: '/studio',
  staticBaseUrl: '/studio/static',
  studio: {
    components: {
      logo: () => null,
      layout: () => null
    }
  }
})