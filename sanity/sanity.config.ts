import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'

export default defineConfig({
  projectId: 'illlgd5e',
  dataset: 'production',
  organization: 'oiPTHJGQf',
  plugins: [
    structureTool({
      structure: (S) => S.list().title('Content').items([
        S.documentTypeListItem('project').title('Projects'),
      ]),
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
})