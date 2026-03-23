export interface HikerTitle {
  readonly min: number;
  readonly max: number;
  readonly title: string;
  readonly titleEn: string;
  readonly description: string;
}

export const HikerTitleStyle = {
  Classic: 'classic',
  Rpg: 'rpg',
  Meme: 'meme',
} as const

export type HikerTitleStyle = typeof HikerTitleStyle[keyof typeof HikerTitleStyle]

export const HikerTitleStyleOptions: { value: HikerTitleStyle; label: string; }[] = [
  {
    value: HikerTitleStyle.Classic,
    label: '百岳山行者'
  },
  {
    value: HikerTitleStyle.Rpg,
    label: 'RPG 冒險者'
  },
  {
    value: HikerTitleStyle.Meme,
    label: '軟骨換貼紙計劃'
  },
]

const ClassicHikerTitles: readonly HikerTitle[] = [
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

const RpgHikerTitles: readonly HikerTitle[] = [
  {
    min: 1,
    max: 10,
    title: '初林者',
    titleEn: 'Forest Squire',
    description: '剛離開新手村，學習裝備負重與基礎呼吸，對稜線上的光影感到好奇與敬畏。',
  },
  {
    min: 11,
    max: 20,
    title: '覓蹤徒',
    titleEn: 'Path-Seeker',
    description: '學會解讀地形圖與路標，能在箭竹林中找尋正確路徑，體能條（Stamina）初次突破。',
  },
  {
    min: 21,
    max: 30,
    title: '風息獵人',
    titleEn: 'Wind-Breather',
    description: '掌握了高海拔的呼吸節律，能預判雲霧的變化，與風的抗衡轉為順應。',
  },
  {
    min: 31,
    max: 40,
    title: '岩脊漫遊者',
    titleEn: 'Crag Strider',
    description: '在斷崖與碎石坡間獲得了平衡加成，腳步變得輕盈，開始體會「空靈」的意境。',
  },
  {
    min: 41,
    max: 50,
    title: '山靈契約者',
    titleEn: 'Mountain Covenanter',
    description: '行程過半，與大地簽訂了默契，學會隱藏自己的存在感，不干擾野生動物的作息。',
  },
  {
    min: 51,
    max: 60,
    title: '星軌巡者',
    titleEn: 'Celestial Ranger',
    description: '習慣在無光害的深夜趕路，眼力能穿透黑暗，與銀河對話，精神力（Mana）大幅提升。',
  },
  {
    min: 61,
    max: 70,
    title: '圓柏賢者',
    titleEn: 'Juniper Sage',
    description: '領悟了高山植物的生存哲學，性格如圓柏般堅毅且曲折，面對惡劣天氣依然平穩。',
  },
  {
    min: 71,
    max: 80,
    title: '稜脈祭司',
    titleEn: 'Ridge Priest',
    description: '步履已帶有某種儀式感，每一腳都踩在土地的脈動上，與山林產生深層共振。',
  },
  {
    min: 81,
    max: 90,
    title: '萬岳隱士',
    titleEn: 'The Great Hermit',
    description: '幾乎與山合而為一，身外之物降至最低，追求的是極簡的純粹與心靈的自由。',
  },
  {
    min: 91,
    max: 99,
    title: '大地的觀察使',
    titleEn: 'Terra Watcher',
    description: '即將走完所有地圖，視野已不再侷限於腳下，而是能俯瞰整座島嶼的生命流動。',
  },
  {
    min: 100,
    max: 100,
    title: '山域守護靈',
    titleEn: 'Spirit of the Wilds',
    description: '滿級並非遊戲的結束，而是解鎖了「守護」的終極任務。你不再是為了攻略地圖，而是成為了地圖本身。山允許你完整地走過一遍，是為了讓你傳承那份對土地的謙卑與智慧。',
  },
] as const

const MemeHikerTitles: readonly HikerTitle[] = [
  {
    min: 1,
    max: 10,
    title: '裝備暴發戶',
    titleEn: 'Gear Flexer',
    description: '穿著全套最新款始祖鳥，在合歡北峰拍網美照，內心想著：「靠，樓梯怎麼這麼長？」',
  },
  {
    min: 11,
    max: 20,
    title: '撤退小天才',
    titleEn: 'Strategic Retreater',
    description: '只要看到雲霧濃一點就想下山吃火鍋。名言是：「山永遠都在，但我的炸雞冷了就不好吃。」',
  },
  {
    min: 21,
    max: 30,
    title: '箭竹洗臉機',
    titleEn: 'Bamboo Face-Washer',
    description: '每天早上被濕透的箭竹甩臉甩到懷疑人生，「這就是大地的洗禮」。',
  },
  {
    min: 31,
    max: 40,
    title: '輕量化偏執狂',
    titleEn: 'Gram Counter',
    description: '為了省 10 克把牙刷柄鋸掉，結果上山後發現自己多帶了兩公斤的脂肪，是在鬧？',
  },
  {
    min: 41,
    max: 50,
    title: '高海拔醉氧族',
    titleEn: 'Oxygen-Drunk Bummer',
    description: '待在海拔 3000 公尺以上才覺得清醒，一回到平地就醉氧、反應遲鈍，甚至覺得台北的空氣有毒。',
  },
  {
    min: 51,
    max: 60,
    title: '山屋靜音過濾器',
    titleEn: 'Cabin NC Filter',
    description: '你已經不再是那個被山屋噪音折磨的凡人，而是一個行走的人體耳塞，對山屋裡的各種聲音都能自動過濾，甚至還能幫忙轉發給其他人。「外界的頻率再亂，也 ping 不進我那進入 Silent Mode 的靈魂。」',
  },
  {
    min: 61,
    max: 70,
    title: '地形圖幻覺者',
    titleEn: 'Topo-Map Dreamer',
    description: '盯著等高線看覺得「這坡還好啊」，實際走上去才發現那是「垂直的牆」。山：我允許你上來，沒說你可以站著上來。',
  },
  {
    min: 71,
    max: 80,
    title: '天氣賭徒',
    titleEn: 'The Meteorological Gambler',
    description: '開了好幾個視窗，從 Windy、中央氣象局到 Facebook 登山借問站，分析了三天三夜，最後決定入山的理由通常是：「我覺得今天雲的形狀看起來很吉利。」結果登頂時遇到暴雨白牆，還要濕著身子對天空大喊：「這不是雨，這是山靈在幫我做全身 SPA 兼壓力測試！」 你的登山紀錄不是 .gpx 軌跡，而是你的博弈帳單。',
  },
  {
    min: 81,
    max: 90,
    title: '看天池水品水師',
    titleEn: 'Pond Water Sommelier',
    description: '喝過各種顏色的看天池水，能輕易分辨這碗水是「紅蟲風味」還是「腐植質後韻」。胃壁已鍍膜。',
  },
  {
    min: 90,
    max: 99,
    title: '集點卡人質',
    titleEn: 'The Point-Card Hostage',
    description: '你的百岳集點卡已經貼到了 9x 個，剩下最後那幾格空白，就像深夜裡對著你尖叫的 Bug 一樣，讓你寢食難安。你已經不在乎山頂有沒有展望，你只在乎那個三角點能不能幫你「蓋章」',
  },
  {
    min: 100,
    max: 100,
    title: '山林釘子戶',
    titleEn: 'Mountain Squatter',
    description: '你在山上的時間比在家還多，山神已經懶得趕你走了。祂甚至考慮要不要收你的管理費，或者直接在你的戶籍謄本上註記「常駐稜線」。你不是登頂，你只是回巡守區視察。',
  },
] as const

export const HikerTitleMap: Record<HikerTitleStyle, readonly HikerTitle[]> = {
  [HikerTitleStyle.Classic]: ClassicHikerTitles,
  [HikerTitleStyle.Rpg]: RpgHikerTitles,
  [HikerTitleStyle.Meme]: MemeHikerTitles,
}

export function getHikerTitle(completedCount: number, style: HikerTitleStyle): HikerTitle | undefined {
  return HikerTitleMap[style].find(t => completedCount >= t.min && completedCount <= t.max)
}
