import type { ColorStudy } from './colorStudies'
import type { Example, Study } from '../studies'
import { colorStudies } from './colorStudies'

export const colorGroups = [
  { id: 'foundations', title: { en: 'Foundations', ko: '색의 기본' }, count: 5 },
  { id: 'tone', title: { en: 'Tone', ko: '톤' }, count: 10 },
  { id: 'harmony', title: { en: 'Color Harmony', ko: '배색' }, count: 10 },
  { id: 'practical', title: { en: 'Practical Color', ko: '실무 색채' }, count: 7 },
] as const

export type ColorGroup = typeof colorGroups[number]['id']

type ColorVisual = Extract<Example, { kind: 'palette' }>['presentation']
type VisualSet = readonly [string, string, string, string]

const palettes: Record<string, VisualSet> = {
  'hue': ["strip:c75951,e38871,f2b0a1","strip:d4a830,e7c55e,f2db94","strip:355a91,638cb7,a3bbd7","strip:32775f,57947d,93bd9c"],
  'value': ["strip:f9ede4,ecd7cc,e0bcb2","strip:c19082,a86e66,8a5a54","strip:68474d,50363c,392a32","strip:f7f6f2,c6c5c1,838383,4f5053,232426"],
  'saturation': ["chips:a19b9e,b4a9ae,c8bfc4","chips:a27e8b,b48b9a,cdacb7","chips:9d3764,b94978,d76c9a","chips:a81752,d91665,ed3981"],
  'tone': ["strip:e6c1cd,f1e1af,c9d8c5,bfd2e5,d9c8e6","strip:b68573,b0a180,929978,8296ac,a58a9f","strip:e65551,e8a129,159470,4663d9,894cc5","strip:67283e,713f2c,20483a,23375b,493052"],
  'temperature': ["fan:934f40,c87558,d99165,eac296","fan:354c77,5484a6,83b6c4,b0cdda","fan:b29983,c9b5a0,e3d0ba,f5e9dd","fan:7d858b,9da5ac,c0c8ce,dee3e5"],
  'vivid': ["band:dc5b51","band:e4a021","band:168667","band:4262d1"],
  'bright': ["band:48a3d7","band:f4d454","band:66b849","band:e9679a"],
  'light': ["band:a7cbe4","band:bacdb0","band:efbb9f","band:c5b9e2"],
  'pale': ["band:f0dce0","band:f6eac5","band:dfe9eb","band:ece4f2"],
  'soft': ["band:c88f9e","band:9aaa8d","band:8ea8c1","band:c3a06a"],
  'light-grayish': ["band:c2a8ad","band:b0bcb0","band:a9b7c6","band:b6b0c3"],
  'grayish': ["band:927987","band:727f8b","band:777e69","band:8e7d72"],
  'dull': ["band:a56751","band:807840","band:597687","band:9a554c"],
  'dark': ["band:2a3447","band:293d34","band:482e3d","band:49352e"],
  'deep': ["band:67283e","band:20483a","band:23375b","band:493052"],
  'tone-on-tone': ["fan:f4ecdb,e2d3b7,c8ae89,a17d56,483526","scale:e8eff4,c7d7e5,8ba5bb,526e89,293d54","chips:f2dbe1,ddaebe,bb7d94,8d4863,5d2b41","strip:f5f3ed,d9d7d2,a09f9c,535458,242426"],
  'tone-in-tone': ["strip:e6c1cd,f1e1af,c9d8c5,bfd2e5,d9c8e6","strip:b68573,b0a180,929978,8296ac,a58a9f","strip:e65551,e8a129,159470,4663d9,894cc5","strip:67283e,713f2c,20483a,23375b,493052"],
  'monochromatic': ["band:e8eff4","band:c7d7e5","band:526e89","band:293d54"],
  'analogous': ["fan:d9c561,aebc64,7da561","fan:529567,4c9b87,5ca7b1","fan:4c78ad,6569ac,8667a6","fan:b44958,c76651,d5874c"],
  'complementary': ["field:30447a,e99556","field:584478,d4db80","field:a74249,86d4d6","field:b6768d,b3dbc4"],
  'split-complementary': ["wheel:345594,e4ab55,d97967","wheel:407c58,c25460,805caa","wheel:d38750,52699b,635a9f","wheel:72518b,81a660,d1c35d"],
  'triadic': ["wheel:be5460,d5ab49,4676a1","wheel:e47764,89ac68,6578b5","wheel:ad838e,9ca07d,819ab0","wheel:6e3049,655525,254f65"],
  'tetradic': ["wheel:b25456,dca36a,619d96,655c92","wheel:6764a5,c285a3,a2aa62,4a8c85","wheel:b68d81,a3ad87,8496ac,ab8ca5","wheel:aa465e,e4ab4a,3e9079,535ba5"],
  'achromatic': ["band:fcfcfa","band:c5c5c3","band:4c4d50","band:18191a"],
  'warm-cool-harmony': ["ratio:c47759,ead3b6,416d88","ratio:376580,a0c2cd,d58d65","strip:b47052,d7a47c,609097,365a72","chips:c37556,dbc7aa,90a69c,42677d"],
  'dominant-color': ["ratio:d9e3db,f5f1e7,315b52","ratio:34455e,d9e0e7,c78f63","ratio:dac6d1,f4ebe7,6b455d","ratio:5e736c,aebbb0,ebd2ae"],
  'accent-color': ["field:e5e6db,a94347","field:ecede5,817134","field:f1e9e3,4c5b92","field:efe4e9,c89243"],
  '60-30-10': ["ratio:dcded2,566c63,b76549","ratio:d7dae2,727c93,b15d70","ratio:eadbc8,8d705c,386963","ratio:f3eadc,acb799,425f59"],
  'color-contrast': ["strip:f5efdf,40332a","strip:507b9f,b66d63","strip:b5a2ac,ac2a61","strip:d79769,4b7794"],
  'accessibility-contrast': ["ui:fffdf8,282522,a8a092","ui:f3e9db,54412f,ab9985","ui:f9f5ed,355650,a6b0a7","ui:f8f4ec,4b4e8c,b5b4c7"],
  'semantic-colors': ["ui:e4efe8,205541,397959","ui:f7eed6,654719,957039","ui:f6e4e3,792f38,a34650","ui:e4ebf3,304d74,4c6d96"],
  'color-tokens': ["ui:e7ddd0,332e28,82766b","ui:f8f4eb,3e3a4c,8c8290","ui:f7f3eb,2f3027,777458","ui:f8efed,78384e,a9526a"],
}

export const colorContent = new Map(colorStudies.map((study) => [study.id, study]))

const groupByStudy = new Map<string, ColorGroup>()
let offset = 0
for (const group of colorGroups) {
  for (const study of colorStudies.slice(offset, offset + group.count)) groupByStudy.set(study.id, group.id)
  offset += group.count
}

function buildStudy(content: ColorStudy, index: number): Study {
  const visuals = palettes[content.id]
  const group = groupByStudy.get(content.id)
  if (!visuals || !group || content.examples.length !== 4) throw new Error(`Invalid Color study: ${content.id}`)

  function example(position: 0 | 1 | 2 | 3): Example {
    const [presentation, values] = visuals[position].split(':')
    return {
      kind: 'palette', presentation: presentation as ColorVisual,
      colors: values.split(',').map((value) => `#${value}`),
      label: content.examples[position].label.en, note: '',
      uiVariant: presentation === 'ui' ? `${content.id}-${position}` : undefined,
    }
  }

  return {
    id: content.id, index: String(index + 1).padStart(2, '0'), category: 'Color',
    group, level: 'POINT', title: content.title.en, definition: content.definition.en, principle: content.principle.en,
    examples: [example(0), example(1), example(2), example(3)],
  }
}

export const colorCatalog = colorStudies.map(buildStudy)

