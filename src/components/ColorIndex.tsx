import { colorGroups, type ColorGroup } from '../studies/colorCatalog'
import { useLanguage } from '../language'

export function ColorIndex({ group, onSelect, total }: { group: ColorGroup | 'all'; onSelect: (group: ColorGroup | 'all') => void; total: number }) {
  const { language, t } = useLanguage()
  return (
    <header className="color-intro">
      <div className="color-intro-copy">
        <p className="eyebrow">{t('POINT')} / {t('Color')}</p>
        <h3>{t('Color')}</h3>
        <p className="eyebrow">{t('Color study total').replace('{count}', String(total))}</p>
        <p>{t('Color is structure, hierarchy, atmosphere, and meaning.')}</p>
      </div>
      <nav className="color-group-nav" aria-label={t('Color groups')}>
        <button aria-pressed={group === 'all'} onClick={() => onSelect('all')}><span>{t('All')}</span><small>{total}</small></button>
        {colorGroups.map((item) => (
          <button key={item.id} aria-pressed={group === item.id} onClick={() => onSelect(item.id)}>
            <span>{item.title[language]}</span><small>{item.count}</small>
          </button>
        ))}
      </nav>
    </header>
  )
}
