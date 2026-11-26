const brandAssets = {
  clean: 'Design-Atlas-CLEAN-v2.svg',
  construction: 'Design-Atlas-CONSTRUCTION-v2.svg',
} as const

export function BrandImage({ variant }: { variant: keyof typeof brandAssets }) {
  return (
    <span className={`brand-image brand-image--${variant}`}>
      <img src={`${import.meta.env.BASE_URL}brand/${brandAssets[variant]}`} width="1672" height="941"
        alt="Design Atlas" lang="en" fetchPriority={variant === 'construction' ? 'high' : undefined} />
    </span>
  )
}
