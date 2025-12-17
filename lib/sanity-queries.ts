import { client } from '@/sanity/client'

export async function getAuthor() {
  return client.fetch(
    `*[_type == "author"][0]{
      _id,
      name,
      slug,
      image,
      bioCs,
      bioEn,
      experience,
      email,
      phone,
      socialLinks
    }`
  )
}

export async function getLatestBlogPosts(limit: number = 3) {
  return client.fetch(
    `*[_type == "blogPost"] | order(publishedAt desc)[0...${limit}]{
      _id,
      titleCs,
      titleEn,
      slug,
      mainImage,
      excerptCs,
      excerptEn,
      publishedAt,
      author->{
        name,
        image
      },
      categories[]->{
        titleCs,
        titleEn,
        slug
      }
    }`
  )
}

export async function getAllBlogPosts() {
  return client.fetch(
    `*[_type == "blogPost"] | order(publishedAt desc){
      _id,
      titleCs,
      titleEn,
      slug,
      mainImage,
      excerptCs,
      excerptEn,
      publishedAt,
      author->{
        name,
        image
      },
      categories[]->{
        titleCs,
        titleEn,
        slug
      }
    }`
  )
}

export async function getBlogPostBySlug(slug: string) {
  return client.fetch(
    `*[_type == "blogPost" && slug.current == $slug][0]{
      _id,
      titleCs,
      titleEn,
      slug,
      mainImage,
      excerptCs,
      excerptEn,
      bodyCs,
      bodyEn,
      publishedAt,
      author->{
        name,
        image,
        bioCs,
        bioEn
      },
      categories[]->{
        titleCs,
        titleEn,
        slug
      }
    }`,
    { slug }
  )
}

export async function getAllPackages() {
  return client.fetch(
    `*[_type == "package"] | order(order asc){
      _id,
      titleCs,
      titleEn,
      slug,
      descriptionCs,
      descriptionEn,
      price,
      currency,
      featuresCs,
      featuresEn,
      featured,
      order
    }`
  )
}

export async function getPageBySlug(slug: string) {
  return client.fetch(
    `*[_type == "page" && slug.current == $slug][0]{
      _id,
      titleCs,
      titleEn,
      slug,
      contentCs,
      contentEn,
      seo
    }`,
    { slug }
  )
}

export async function getAllServices() {
  return client.fetch(
    `*[_type == "service"] | order(order asc){
      _id,
      titleCs,
      titleEn,
      descriptionCs,
      descriptionEn,
      icon,
      order
    }`
  )
}

export async function getSettings() {
  return client.fetch(
    `*[_type == "settings"][0]{
      _id,
      statistics,
      whyWorkWithMe,
      helpSection
    }`
  )
}

export async function getAllMedia() {
  return client.fetch(
    `*[_type == "media"] | order(publishedAt desc, order asc){
      _id,
      titleCs,
      titleEn,
      slug,
      type,
      descriptionCs,
      descriptionEn,
      thumbnailImage,
      videoUrl,
      podcastUrl,
      podcastEmbed,
      articleUrl,
      publisher,
      publishedAt,
      order
    }`
  )
}

export async function getMediaBySlug(slug: string) {
  return client.fetch(
    `*[_type == "media" && slug.current == $slug][0]{
      _id,
      titleCs,
      titleEn,
      slug,
      type,
      descriptionCs,
      descriptionEn,
      thumbnailImage,
      videoUrl,
      podcastUrl,
      podcastEmbed,
      articleUrl,
      publisher,
      publishedAt
    }`,
    { slug }
  )
}

export async function getAllTestimonials() {
  return client.fetch(
    `*[_type == "testimonial"] | order(order asc){
      _id,
      name,
      role,
      quoteCs,
      quoteEn,
      image
    }`
  )
}

export async function getAllSeminars() {
  return client.fetch(
    `*[_type == "seminar"] | order(date asc){
      _id,
      titleCs,
      titleEn,
      slug,
      date,
      location,
      price,
      descriptionCs,
      descriptionEn,
      registrationLink
    }`
  )
}
