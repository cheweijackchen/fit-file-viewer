export interface HikerTitle {
  readonly min: number;
  readonly max: number;
  readonly title: string;
  readonly titleEn: string;
  readonly description: string;
}

export const HikerTitles: readonly HikerTitle[] = [
  {
    min: 1,
    max: 10,
    title: '啟程者',
    titleEn: 'The Initiator',
    description: '剛與山林建立初步的連結，正學習如何感受風的流動。',
  },
  {
    min: 11,
    max: 20,
    title: '尋徑人',
    titleEn: 'The Wayfinder',
    description: '開始熟悉稜線與溪谷的節奏，練習在草木間尋找自己的呼吸。',
  },
  {
    min: 21,
    max: 30,
    title: '雲霧友',
    titleEn: 'Friend of the Mists',
    description: '習慣了多變的氣候，與高山的雲海共處，開始讀懂山的表情。',
  },
  {
    min: 31,
    max: 40,
    title: '聽風客',
    titleEn: 'Listener of Winds',
    description: '在寂靜的高海拔森林中，聽見風穿過圓柏的聲音，體會孤獨的美學。',
  },
  {
    min: 41,
    max: 50,
    title: '隨山徒',
    titleEn: 'The Mountain Follower',
    description: '走過一半的歷程，身心已能順應大地的起伏，心境漸趨平和。',
  },
  {
    min: 51,
    max: 60,
    title: '觀星使',
    titleEn: 'Star-Watcher',
    description: '深知黑夜與白晝的轉換，在星空下感受人類的渺小與宇宙的壯闊。',
  },
  {
    min: 61,
    max: 70,
    title: '共生者',
    titleEn: 'The Symbiote',
    description: '不再執著於速度，而是能與自然環境達成一種動態的和諧。',
  },
  {
    min: 71,
    max: 80,
    title: '守境僧',
    titleEn: 'Guardian of the Realm',
    description: '累積了深厚的情感，對山林的每一寸土石都抱持著如信仰般的敬意。',
  },
  {
    min: 81,
    max: 90,
    title: '忘機叟',
    titleEn: 'The Zen Wayfarer',
    description: '步履已然純粹，沒有雜念，只是單純地行走在山與雲之間。',
  },
  {
    min: 91,
    max: 99,
    title: '入雲龍',
    titleEn: 'Dragon in the Clouds',
    description: '幾乎踏遍了每一條稜脈，身形如龍般遊走，但心始終貼近地表。',
  },
  {
    min: 100,
    max: 100,
    title: '山之子',
    titleEn: 'Child of the Mountains',
    description: '當百岳走完，不再是為了證明什麼，而是終於回到了家。你不再是山的訪客，而是山的一部分。這份榮耀代表你已被這片土地完全接納，懂得如何以謙卑之姿，與千年的山巒共存。',
  },
] as const

export function getHikerTitle(completedCount: number): HikerTitle | undefined {
  return HikerTitles.find(t => completedCount >= t.min && completedCount <= t.max)
}
