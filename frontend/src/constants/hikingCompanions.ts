import type { StaticImageData } from 'next/image'
import formosaBear01 from '@/assets/animals/formosa-bear-01.webp'
import formosaBear02 from '@/assets/animals/formosa-bear-02.webp'
import formosaBear03 from '@/assets/animals/formosa-bear-03.webp'
import formosaSerow from '@/assets/animals/formosa-serow-01.webp'
import leopardCat from '@/assets/animals/leopard-cat-01.webp'
import monkey from '@/assets/animals/monkey-01.webp'
import mythicalBear from '@/assets/animals/mythical-beast-formosa-bear.webp'
import mythicalPangolin from '@/assets/animals/mythical-beast-pangolin.webp'
import mythicalDeer from '@/assets/animals/mythical-beast-sambar-deer.webp'
import pangolin from '@/assets/animals/pangolin-01.webp'
import sambarDeer from '@/assets/animals/sambar-deer-01.webp'
import scopsOwl from '@/assets/animals/scops-owl-01.webp'
import taiwanBlueMagpie from '@/assets/animals/taiwan-blue-magpie-01.webp'
import yellowThroatedMarten from '@/assets/animals/yellow-throated-marten-01.webp'
import femaleHiker01 from '@/assets/hikers/female-hiker-01-short-hair.webp'
import femaleHiker02 from '@/assets/hikers/female-hiker-02-long-hair-with-green-outfit.webp'
import femaleHiker03 from '@/assets/hikers/female-hiker-03.webp'
import maleHiker03 from '@/assets/hikers/male-hiker-03.webp'
import myself02 from '@/assets/hikers/myself-02-with-camera.webp'

export interface CompanionPosition {
  readonly top: number;
  readonly left: number;
}

export type CompanionType = 'animal' | 'mythical' | 'hiker' | 'special'

export interface HikingCompanion {
  readonly id: string;
  readonly label: string;
  readonly image: StaticImageData;
  readonly width: number;
  readonly positionLeft: CompanionPosition;
  readonly positionRight: CompanionPosition;
  readonly mythical: boolean;
  readonly companionType: CompanionType;
}

export const HikingCompanions: HikingCompanion[] = [
  {
    id: 'formosa-bear-01',
    label: '台灣黑熊（坐姿）',
    image: formosaBear01,
    width: 120,
    positionLeft: {
      top: 40,
      left: -66,
    },
    positionRight: {
      top: 40,
      left: 102,
    },
    mythical: false,
    companionType: 'animal',
  },
  {
    id: 'formosa-bear-02',
    label: '台灣黑熊（站姿）',
    image: formosaBear02,
    width: 120,
    positionLeft: {
      top: 50,
      left: -55,
    },
    positionRight: {
      top: 40,
      left: 100,
    },
    mythical: false,
    companionType: 'animal',
  },
  {
    id: 'formosa-bear-03',
    label: '台灣黑熊（立姿）',
    image: formosaBear03,
    width: 90,
    positionLeft: {
      top: 10,
      left: -50,
    },
    positionRight: {
      top: 10,
      left: 115,
    },
    mythical: false,
    companionType: 'animal',
  },
  {
    id: 'sambar-deer',
    label: '水鹿',
    image: sambarDeer,
    width: 100,
    positionLeft: {
      top: -20,
      left: -48,
    },
    positionRight: {
      top: -20,
      left: 112,
    },
    mythical: false,
    companionType: 'animal',
  },
  {
    id: 'monkey',
    label: '台灣獼猴',
    image: monkey,
    width: 90,
    positionLeft: {
      top: 70,
      left: -35,
    },
    positionRight: {
      top: 70,
      left: 116
    },
    mythical: false,
    companionType: 'animal',
  },
  {
    id: 'formosa-serow',
    label: '長鬃山羊',
    image: formosaSerow,
    width: 85,
    positionLeft: {
      top: 55,
      left: -45,
    },
    positionRight: {
      top: 55,
      left: 103,
    },
    mythical: false,
    companionType: 'animal',
  },
  {
    id: 'leopard-cat',
    label: '石虎',
    image: leopardCat,
    width: 70,
    positionLeft: {
      top: 75,
      left: -30,
    },
    positionRight: {
      top: 75,
      left: 105,
    },
    mythical: false,
    companionType: 'animal',
  },
  {
    id: 'pangolin',
    label: '穿山甲',
    image: pangolin,
    width: 80,
    positionLeft: {
      top: 72,
      left: -40,
    },
    positionRight: {
      top: 75,
      left: 110,
    },
    mythical: false,
    companionType: 'animal',
  },
  {
    id: 'yellow-throated-marten',
    label: '黃喉貂',
    image: yellowThroatedMarten,
    width: 75,
    positionLeft: {
      top: 80,
      left: -18,
    },
    positionRight: {
      top: 80,
      left: 110,
    },
    mythical: false,
    companionType: 'animal',
  },
  {
    id: 'taiwan-blue-magpie',
    label: '台灣藍鵲',
    image: taiwanBlueMagpie,
    width: 120,
    positionLeft: {
      top: -25,
      left: -30,
    },
    positionRight: {
      top: -25,
      left: 100,
    },
    mythical: false,
    companionType: 'animal',
  },
  {
    id: 'scops-owl',
    label: '角鴞',
    image: scopsOwl,
    width: 120,
    positionLeft: {
      top: -15,
      left: -20,
    },
    positionRight: {
      top: -15,
      left: 90,
    },
    mythical: false,
    companionType: 'animal',
  },
  {
    id: 'female-hiker-01',
    label: '登山女子 A',
    image: femaleHiker01,
    width: 110,
    positionLeft: {
      top: -25,
      left: -50,
    },
    positionRight: {
      top: -25,
      left: 102,
    },
    mythical: false,
    companionType: 'hiker',
  },
  {
    id: 'female-hiker-02',
    label: '登山女子 B',
    image: femaleHiker02,
    width: 110,
    positionLeft: {
      top: -25,
      left: -50,
    },
    positionRight: {
      top: -25,
      left: 102,
    },
    mythical: false,
    companionType: 'hiker',
  },
  {
    id: 'female-hiker-03',
    label: '登山女子 C',
    image: femaleHiker03,
    width: 110,
    positionLeft: {
      top: -25,
      left: -50,
    },
    positionRight: {
      top: -25,
      left: 102,
    },
    mythical: false,
    companionType: 'hiker',
  },
  {
    id: 'male-hiker-03',
    label: '登山男子 C',
    image: maleHiker03,
    width: 110,
    positionLeft: {
      top: -25,
      left: -55,
    },
    positionRight: {
      top: -25,
      left: 102,
    },
    mythical: false,
    companionType: 'hiker',
  },
  {
    id: 'male-hiker-01',
    label: '你的好朋友 白毛 ：）',
    image: myself02,
    width: 120,
    positionLeft: {
      top: -25,
      left: -60,
    },
    positionRight: {
      top: -25,
      left: 98,
    },
    mythical: false,
    companionType: 'special',
  },
  {
    id: 'mythical-bear',
    label: '神獸黑熊',
    image: mythicalBear,
    width: 200,
    positionLeft: {
      top: -10,
      left: -120,
    },
    positionRight: {
      top: -10,
      left: 40,
    },
    mythical: true,
    companionType: 'mythical',
  },
  {
    id: 'mythical-deer',
    label: '神獸水鹿',
    image: mythicalDeer,
    width: 180,
    positionLeft: {
      top: 0,
      left: -110,
    },
    positionRight: {
      top: 0,
      left: 48,
    },
    mythical: true,
    companionType: 'mythical',
  },
  {
    id: 'mythical-pangolin',
    label: '神獸穿山甲',
    image: mythicalPangolin,
    width: 80,
    positionLeft: {
      top: 70,
      left: -40,
    },
    positionRight: {
      top: 70,
      left: 108,
    },
    mythical: true,
    companionType: 'mythical',
  },
]

export function getAvailableCompanions(completedCount: number): HikingCompanion[] {
  return HikingCompanions.filter(c => !c.mythical || completedCount >= 100)
}

export function getCompanionById(id: string): HikingCompanion | undefined {
  return HikingCompanions.find(c => c.id === id)
}
