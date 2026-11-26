import { useLanguage } from '../language'

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()
  return (
    <div className="language-switcher" role="group" aria-label={language === 'ko' ? '언어 선택' : 'Language'} data-language={language}>
      <button type="button" lang="en" aria-label="Switch language to English" aria-pressed={language === 'en'} onClick={() => setLanguage('en')}>EN</button>
      <button type="button" lang="ko" aria-label="언어를 한국어로 변경" aria-pressed={language === 'ko'} onClick={() => setLanguage('ko')}>KO</button>
    </div>
  )
}
