import type { CSSProperties } from 'react'
import type { Example } from '../studies'
import { useLanguage } from '../language'

type ColorExample = Extract<Example, { kind: 'palette' }>

export function ColorUiSpecimen({ example }: { example: ColorExample }) {
  const { t } = useLanguage()
  const [surface, ink, accent] = example.colors
  const variant = example.uiVariant ?? ''
  const isContrast = variant.startsWith('accessibility-contrast')
  const isToken = variant.startsWith('color-tokens')
  const style = { '--sample-surface': surface, '--sample-ink': ink, '--sample-accent': accent } as CSSProperties

  return (
    <div className="specimen color-ui" data-variant={variant} style={style} aria-hidden="true">
      {isContrast ? (
        <div className="contrast-pairs">
          <span>{t('Example text')}</span><span>{t('Example text')}</span>
        </div>
      ) : (
        <div className="color-ui-panel">
          <i aria-hidden="true" />
          <span>{example.label}</span>
          {isToken && <small>{t('Continue')}</small>}
        </div>
      )}
    </div>
  )
}
