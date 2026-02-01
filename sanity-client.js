import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: 'illlgd5e',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
})

export const getProjects = async () => {
  const query = `*[_type == "project"] | order(completedAt desc) {
    title,
    slug,
    description,
    technologies,
    liveUrl,
    githubUrl,
    imageUrl,
    featured,
    completedAt
  }`
  
  return await client.fetch(query)
}

export const getFeaturedProjects = async () => {
  const query = `*[_type == "project" && featured == true] | order(completedAt desc) {
    title,
    slug,
    description,
    technologies,
    liveUrl,
    githubUrl,
    imageUrl,
    featured,
    completedAt
  }[0...3]`
  
  return await client.fetch(query)
}