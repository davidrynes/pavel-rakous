'use client'

import { useLanguage } from '@/lib/language-context'
import Image from 'next/image'
import Link from 'next/link'
import { urlForImage } from '@/sanity/image'
import { PortableText } from '@portabletext/react'

const portableTextComponents = {
  types: {
    image: ({ value }: any) => {
      return (
        <div className="my-8 relative h-96 rounded-lg overflow-hidden">
          <Image
            src={urlForImage(value).url()}
            alt={value.alt || ' '}
            fill
            className="object-cover"
          />
        </div>
      )
    },
  },
  block: {
    h2: ({ children }: any) => <h2>{children}</h2>,
    h3: ({ children }: any) => <h3>{children}</h3>,
    h4: ({ children }: any) => <h4>{children}</h4>,
    normal: ({ children }: any) => <p>{children}</p>,
    blockquote: ({ children }: any) => <blockquote>{children}</blockquote>,
  },
  marks: {
    strong: ({ children }: any) => <strong>{children}</strong>,
    em: ({ children }: any) => <em>{children}</em>,
    code: ({ children }: any) => <code>{children}</code>,
    link: ({ value, children }: any) => {
      const target = (value?.href || '').startsWith('http') ? '_blank' : undefined
      return (
        <a href={value?.href} target={target} rel={target === '_blank' ? 'noopener noreferrer' : undefined}>
          {children}
        </a>
      )
    },
  },
  list: {
    bullet: ({ children }: any) => <ul>{children}</ul>,
    number: ({ children }: any) => <ol>{children}</ol>,
  },
  listItem: {
    bullet: ({ children }: any) => <li>{children}</li>,
    number: ({ children }: any) => <li>{children}</li>,
  },
}

export default function BlogPost({ post }: any) {
  const { language, t } = useLanguage()

  const title = language === 'cs' ? post.titleCs : post.titleEn
  const body = language === 'cs' ? post.bodyCs : post.bodyEn
  const excerpt = language === 'cs' ? post.excerptCs : post.excerptEn

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <Link
        href="/blog"
        className="inline-flex items-center text-gray-600 hover:text-primary mb-8 transition-colors"
      >
        ← {t('Zpět na blog', 'Back to blog')}
      </Link>

      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          {title}
        </h1>

        <div className="flex items-center gap-4 text-gray-600">
          <time>
            {new Date(post.publishedAt).toLocaleDateString(
              language === 'cs' ? 'cs-CZ' : 'en-US',
              {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              }
            )}
          </time>
          {post.author && (
            <>
              <span>•</span>
              <div className="flex items-center gap-2">
                {post.author.image && (
                  <div className="relative w-8 h-8 rounded-full overflow-hidden">
                    <Image
                      src={urlForImage(post.author.image).url()}
                      alt={post.author.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <span>{post.author.name}</span>
              </div>
            </>
          )}
        </div>

        {post.categories && post.categories.length > 0 && (
          <div className="flex gap-2 mt-4">
            {post.categories.map((category: any) => (
              <span
                key={category.slug.current}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
              >
                {language === 'cs' ? category.titleCs : category.titleEn}
              </span>
            ))}
          </div>
        )}
      </header>

      {post.mainImage && (
        <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden mb-12">
          <Image
            src={urlForImage(post.mainImage).url()}
            alt={title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {excerpt && (
        <p className="text-xl text-gray-700 leading-relaxed mb-12 font-medium">
          {excerpt}
        </p>
      )}

      {body && (
        <div className="prose prose-lg max-w-none">
          <PortableText value={body} components={portableTextComponents} />
        </div>
      )}
    </article>
  )
}
