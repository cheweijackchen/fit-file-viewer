import type { StaticImageData } from 'next/image'
import formosaBear from '@/assets/animals/formosa-bear-01.png'
import formosaSerow from '@/assets/animals/formosa-serow-01.png'
import leopardCat from '@/assets/animals/leopard-cat-01.png'
import mythicalBear from '@/assets/animals/mythical-beast-formosa-bear-sitting.png'
import mythicalPangolin from '@/assets/animals/mythical-beast-pangolin.png'
import pangolin from '@/assets/animals/pangolin-01.png'
import yellowThroatedMarten from '@/assets/animals/yellow-throated-marten-01.png'

export interface AnimalCompanion {
  readonly id: string;
  readonly label: string;
  readonly image: StaticImageData;
  readonly width: number;
  readonly top: number;
  readonly left: number;
  readonly mythical: boolean;
}

export const AnimalCompanions: AnimalCompanion[] = [
  {
    id: 'formosa-bear',
    label: '台灣黑熊',
    image: formosaBear,
    width: 120,
    top: 40,
    left: 85,
    mythical: false,
  },
  {
    id: 'formosa-serow',
    label: '長鬃山羊',
    image: formosaSerow,
    width: 85,
    top: 55,
    left: 103,
    mythical: false,
  },
  {
    id: 'leopard-cat',
    label: '石虎',
    image: leopardCat,
    width: 70,
    top: 75,
    left: 105,
    mythical: false,
  },
  {
    id: 'pangolin',
    label: '穿山甲',
    image: pangolin,
    width: 80,
    top: 75,
    left: 110,
    mythical: false,
  },
  {
    id: 'yellow-throated-marten',
    label: '黃喉貂',
    image: yellowThroatedMarten,
    width: 75,
    top: 80,
    left: 110,
    mythical: false,
  },
  {
    id: 'mythical-bear',
    label: '神獸黑熊',
    image: mythicalBear,
    width: 110,
    top: 50,
    left: 88,
    mythical: true,
  },
  {
    id: 'mythical-pangolin',
    label: '神獸穿山甲',
    image: mythicalPangolin,
    width: 80,
    top: 70,
    left: 108,
    mythical: true,
  },
]

export function getAvailableCompanions(completedCount: number): AnimalCompanion[] {
  return AnimalCompanions.filter(c => !c.mythical || completedCount >= 100)
}

export function getCompanionById(id: string): AnimalCompanion | undefined {
  return AnimalCompanions.find(c => c.id === id)
}
