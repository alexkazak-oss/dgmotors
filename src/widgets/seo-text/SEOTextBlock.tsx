import { Container, Section } from '@/src/shared/ui'

interface SEOTextBlockProps {
  title?: string
  text: string
}

export function SEOTextBlock({ title, text }: SEOTextBlockProps) {
  return (
    <Section className="bg-neutral-950 py-12 md:py-16">
      <Container>
        <div className="max-w-3xl">
          {title && (
            <h2 className="mb-4 text-xl font-semibold text-white">{title}</h2>
          )}
          <div className="prose prose-sm prose-invert max-w-none text-neutral-400 leading-relaxed">
            {text.split('\n\n').map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  )
}
