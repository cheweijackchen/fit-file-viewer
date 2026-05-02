import { type Trail } from '@/model/hikingTrail'

export const northFirstSection: Trail = {
  id: 'north-first-section',
  name: '北一段',
  nameEn: 'North First Section',
  i18nKey: 'north-first-section.north-first-section',
  nodes: [
    // --- 西段起點 ---
    {
      id: 'north-first-section_siyuan-wind-gap',
      name: '思源埡口',
      i18nKey: 'north-first-section.siyuan-wind-gap',
      nodeType: 'other' 
    },
    {
      id: 'north-first-section_trailhead-6-7k',
      name: '6.7K 登山口',
      i18nKey: 'north-first-section.trailhead-6-7k',
      nodeType: 'fork' 
    },
    {
      id: 'mountain_duojiatun-mountain-survey-point',
      name: '多加屯山水利三角點',
      i18nKey: 'mountain.duojiatun-mountain-survey-point',
      nodeType: 'peak' 
    },
    {
      id: 'north-first-section_mu-gan-saddle',
      name: '木杆鞍部',
      i18nKey: 'north-first-section.mu-gan-saddle',
      nodeType: 'fork' 
    },
    {
      id: 'north-first-section_nanhu-river-hut',
      name: '南湖溪山屋',
      i18nKey: 'north-first-section.nanhu-river-hut',
      nodeType: 'hut' 
    },
    {
      id: 'north-first-section_new-yunleng-hut',
      name: '新雲稜山莊',
      i18nKey: 'north-first-section.new-yunleng-hut',
      nodeType: 'hut' 
    },
    
    // --- 審馬陣與北山區域 ---
    {
      id: 'north-first-section_shenmazhen-mountain-trailhead',
      name: '審馬陣山登山口',
      i18nKey: 'north-first-section.shenmazhen-mountain-trailhead',
      nodeType: 'fork' 
    },
    {
      id: 'mountain_shenmazhen-mountain',
      name: '審馬陣山',
      i18nKey: 'mountain.shenmazhen-mountain',
      nodeType: 'peak' 
    },
    {
      id: 'north-first-section_shenmazhen-hut-fork',
      name: '審馬陣山莊岔路',
      i18nKey: 'north-first-section.shenmazhen-hut-fork',
      nodeType: 'fork' 
    },
    {
      id: 'north-first-section_shenmazhen-hut',
      name: '審馬陣山莊',
      i18nKey: 'north-first-section.shenmazhen-hut',
      nodeType: 'hut' 
    },
    {
      id: 'north-first-section_nanhu-north-mountain-fork',
      name: '南湖北山岔路',
      i18nKey: 'north-first-section.nanhu-north-mountain-fork',
      nodeType: 'fork' 
    },
    {
      id: 'mountain_nanhu-north-mountain',
      name: '南湖北山',
      i18nKey: 'mountain.nanhu-north-mountain',
      nodeType: 'peak' 
    },
    {
      id: 'mountain_nanhu-north-mountain-north-peak',
      name: '南湖大山北峰',
      i18nKey: 'mountain.nanhu-north-mountain-north-peak',
      nodeType: 'peak' 
    },
    
    // --- 圈谷與主東峰區域 ---
    {
      id: 'mountain_nanhu-main-peak',
      name: '南湖主峰',
      i18nKey: 'mountain.nanhu-main-peak',
      nodeType: 'peak' 
    },
    {
      id: 'north-first-section_nanhu-cirque-hut',
      name: '南湖圈谷山莊',
      i18nKey: 'north-first-section.nanhu-cirque-hut',
      nodeType: 'hut' 
    },
    {
      id: 'north-first-section_upper-cirque',
      name: '上圈谷',
      i18nKey: 'north-first-section.upper-cirque',
      nodeType: 'other' 
    },
    {
      id: 'north-first-section_main-peak-saddle',
      name: '主峰鞍部',
      i18nKey: 'north-first-section.main-peak-saddle',
      nodeType: 'fork' 
    },
    {
      id: 'north-first-section_east-peak-saddle',
      name: '東峰鞍部',
      i18nKey: 'north-first-section.east-peak-saddle',
      nodeType: 'fork' 
    },
    {
      id: 'mountain_nanhu-east-peak',
      name: '南湖大山東峰',
      i18nKey: 'mountain.nanhu-east-peak',
      nodeType: 'peak' 
    },
    
    // --- 南峰與中央尖區域 ---
    {
      id: 'north-first-section_main-south-peak-fork',
      name: '主峰、南峰三岔路口',
      i18nKey: 'north-first-section.main-south-peak-fork',
      nodeType: 'fork' 
    },
    {
      id: 'north-first-section_nanhu-pond-hut',
      name: '南湖池山屋',
      i18nKey: 'north-first-section.nanhu-pond-hut',
      nodeType: 'hut' 
    },
    {
      id: 'north-first-section_nanhu-south-peak-fork',
      name: '南湖大山南峰岔路',
      i18nKey: 'north-first-section.nanhu-south-peak-fork',
      nodeType: 'fork' 
    },
    {
      id: 'mountain_nanhu-south-peak',
      name: '南湖大山南峰',
      i18nKey: 'mountain.nanhu-south-peak',
      nodeType: 'peak' 
    },
    {
      id: 'mountain_baba-mountain',
      name: '巴巴山',
      i18nKey: 'mountain.baba-mountain',
      nodeType: 'peak' 
    },
    {
      id: 'north-first-section_chungyangjian-hut',
      name: '中央尖山屋',
      i18nKey: 'north-first-section.chungyangjian-hut',
      nodeType: 'hut' 
    },
    {
      id: 'north-first-section_first-mushroom-hut-site',
      name: '第一香菇寮舊址',
      i18nKey: 'north-first-section.first-mushroom-hut-site',
      nodeType: 'camp' 
    },
    {
      id: 'north-first-section_chungyangjian-saddle',
      name: '中央尖鞍部',
      i18nKey: 'north-first-section.chungyangjian-saddle',
      nodeType: 'fork' 
    },
    {
      id: 'mountain_chungyangjian-mountain',
      name: '中央尖山',
      i18nKey: 'mountain.chungyangjian-mountain',
      nodeType: 'peak' 
    },
    {
      id: 'mountain_chungyangjian-east-peak',
      name: '中央尖山東峰',
      i18nKey: 'mountain.chungyangjian-east-peak',
      nodeType: 'peak' 
    },
    
    // --- 馬比杉山東段 ---
    {
      id: 'mountain_taosai-peak',
      name: '陶塞峰',
      i18nKey: 'mountain.taosai-peak',
      nodeType: 'peak' 
    },
    {
      id: 'mountain_nanhu-southeast-peak',
      name: '南湖大山東南峰',
      i18nKey: 'mountain.nanhu-southeast-peak',
      nodeType: 'peak' 
    },
    {
      id: 'north-first-section_signpost-2-2k-fork',
      name: '指標 2.2K 岔路口',
      i18nKey: 'north-first-section.signpost-2-2k-fork',
      nodeType: 'fork' 
    },
    {
      id: 'north-first-section_da-zhuo-shui-south-river-fork',
      name: '大濁水南溪岔路',
      i18nKey: 'north-first-section.da-zhuo-shui-south-river-fork',
      nodeType: 'fork' 
    },
    {
      id: 'north-first-section_taosai-hut-ruins',
      name: '陶塞山屋遺址',
      i18nKey: 'north-first-section.taosai-hut-ruins',
      nodeType: 'hut' 
    },
    {
      id: 'north-first-section_stone-cave-hunting-hut-pond',
      name: '石洞獵寮水池',
      i18nKey: 'north-first-section.stone-cave-hunting-hut-pond',
      nodeType: 'water-source' 
    },
    {
      id: 'north-first-section_signpost-1-0k',
      name: '指標 1.0K',
      i18nKey: 'north-first-section.signpost-1-0k',
      nodeType: 'fork' 
    },
    {
      id: 'mountain_mabishan-mountain',
      name: '馬比杉山',
      i18nKey: 'mountain.mabishan-mountain',
      nodeType: 'peak' 
    }
  ],
  edges: [
    // 思源埡口 <-> 6.7K (140/100)
    {
      from: 'north-first-section_siyuan-wind-gap',
      to: 'north-first-section_trailhead-6-7k',
      minutes: 140 
    },
    {
      from: 'north-first-section_trailhead-6-7k',
      to: 'north-first-section_siyuan-wind-gap',
      minutes: 100 
    },
    // 6.7K <-> 多加屯 (100/60)
    {
      from: 'north-first-section_trailhead-6-7k',
      to: 'mountain_duojiatun-mountain-survey-point',
      minutes: 100 
    },
    {
      from: 'mountain_duojiatun-mountain-survey-point',
      to: 'north-first-section_trailhead-6-7k',
      minutes: 60 
    },
    // 多加屯 <-> 木杆鞍部 (90/120)
    {
      from: 'mountain_duojiatun-mountain-survey-point',
      to: 'north-first-section_mu-gan-saddle',
      minutes: 90 
    },
    {
      from: 'north-first-section_mu-gan-saddle',
      to: 'mountain_duojiatun-mountain-survey-point',
      minutes: 120 
    },
    // 木杆鞍部 <-> 新雲稜 (30/20)
    {
      from: 'north-first-section_mu-gan-saddle',
      to: 'north-first-section_new-yunleng-hut',
      minutes: 30 
    },
    {
      from: 'north-first-section_new-yunleng-hut',
      to: 'north-first-section_mu-gan-saddle',
      minutes: 20 
    },
    // 木杆鞍部 <-> 南湖溪山屋 (70/60)
    {
      from: 'north-first-section_mu-gan-saddle',
      to: 'north-first-section_nanhu-river-hut',
      minutes: 60 
    },
    {
      from: 'north-first-section_nanhu-river-hut',
      to: 'north-first-section_mu-gan-saddle',
      minutes: 70 
    },
    // 新雲稜 <-> 審馬陣登山口 (150/100)
    {
      from: 'north-first-section_new-yunleng-hut',
      to: 'north-first-section_shenmazhen-mountain-trailhead',
      minutes: 150 
    },
    {
      from: 'north-first-section_shenmazhen-mountain-trailhead',
      to: 'north-first-section_new-yunleng-hut',
      minutes: 100 
    },
    // 審馬陣登山口 <-> 審馬陣山 (3/3)
    {
      from: 'north-first-section_shenmazhen-mountain-trailhead',
      to: 'mountain_shenmazhen-mountain',
      minutes: 3 
    },
    {
      from: 'mountain_shenmazhen-mountain',
      to: 'north-first-section_shenmazhen-mountain-trailhead',
      minutes: 3 
    },
    // 審馬陣登山口 <-> 審馬陣莊岔 (25/20)
    {
      from: 'north-first-section_shenmazhen-mountain-trailhead',
      to: 'north-first-section_shenmazhen-hut-fork',
      minutes: 25 
    },
    {
      from: 'north-first-section_shenmazhen-hut-fork',
      to: 'north-first-section_shenmazhen-mountain-trailhead',
      minutes: 20 
    },
    // 審馬陣莊岔 <-> 審馬陣山莊 (10/10)
    {
      from: 'north-first-section_shenmazhen-hut-fork',
      to: 'north-first-section_shenmazhen-hut',
      minutes: 10 
    },
    {
      from: 'north-first-section_shenmazhen-hut',
      to: 'north-first-section_shenmazhen-hut-fork',
      minutes: 10 
    },
    // 審馬陣莊岔 <-> 南湖北山岔路 (75/40)
    {
      from: 'north-first-section_shenmazhen-hut-fork',
      to: 'north-first-section_nanhu-north-mountain-fork',
      minutes: 75 
    },
    {
      from: 'north-first-section_nanhu-north-mountain-fork',
      to: 'north-first-section_shenmazhen-hut-fork',
      minutes: 40 
    },
    // 南湖北山岔路 <-> 南湖北山 (5/5)
    {
      from: 'north-first-section_nanhu-north-mountain-fork',
      to: 'mountain_nanhu-north-mountain',
      minutes: 5 
    },
    {
      from: 'mountain_nanhu-north-mountain',
      to: 'north-first-section_nanhu-north-mountain-fork',
      minutes: 5 
    },
    // 南湖北山岔路 <-> 南湖大山北峰 (75/65)
    {
      from: 'north-first-section_nanhu-north-mountain-fork',
      to: 'mountain_nanhu-north-mountain-north-peak',
      minutes: 75 
    },
    {
      from: 'mountain_nanhu-north-mountain-north-peak',
      to: 'north-first-section_nanhu-north-mountain-fork',
      minutes: 65 
    },
    // 北峰 <-> 圈谷山莊 (25/45)
    {
      from: 'mountain_nanhu-north-mountain-north-peak',
      to: 'north-first-section_nanhu-cirque-hut',
      minutes: 25 
    },
    {
      from: 'north-first-section_nanhu-cirque-hut',
      to: 'mountain_nanhu-north-mountain-north-peak',
      minutes: 45 
    },
    // 主峰南峰岔路 <-> 南湖主峰 (15/20)
    {
      from: 'north-first-section_main-south-peak-fork',
      to: 'mountain_nanhu-main-peak',
      minutes: 20
    },
    {
      from: 'mountain_nanhu-main-peak',
      to: 'north-first-section_main-south-peak-fork',
      minutes: 15 
    },
    // 圈谷山莊 <-> 主峰鞍部 (40/30)
    {
      from: 'north-first-section_nanhu-cirque-hut',
      to: 'north-first-section_main-peak-saddle',
      minutes: 40 
    },
    {
      from: 'north-first-section_main-peak-saddle',
      to: 'north-first-section_nanhu-cirque-hut',
      minutes: 30 
    },
    // 圈谷山莊 <-> 上圈谷 (15/10)
    {
      from: 'north-first-section_nanhu-cirque-hut',
      to: 'north-first-section_upper-cirque',
      minutes: 15 
    },
    {
      from: 'north-first-section_upper-cirque',
      to: 'north-first-section_nanhu-cirque-hut',
      minutes: 10 
    },
    // 主峰鞍部 <-> 東峰鞍部 (20/20)
    {
      from: 'north-first-section_main-peak-saddle',
      to: 'north-first-section_east-peak-saddle',
      minutes: 20
    },
    {
      from: 'north-first-section_east-peak-saddle',
      to: 'north-first-section_main-peak-saddle',
      minutes: 20
    },
    // 主峰鞍部 <-> 主峰、南峰岔路 (15/10)
    {
      from: 'north-first-section_main-peak-saddle',
      to: 'north-first-section_main-south-peak-fork',
      minutes: 15
    },
    {
      from: 'north-first-section_main-south-peak-fork',
      to: 'north-first-section_main-peak-saddle',
      minutes: 10 
    },
    // 主南岔路 <-> 南湖池山屋 (25/45)
    {
      from: 'north-first-section_main-south-peak-fork',
      to: 'north-first-section_nanhu-pond-hut',
      minutes: 25
    },
    {
      from: 'north-first-section_nanhu-pond-hut',
      to: 'north-first-section_main-south-peak-fork',
      minutes: 45
    },
    // 南湖池山屋 <-> 南大山南峰岔路 (90/100)
    {
      from: 'north-first-section_nanhu-pond-hut',
      to: 'north-first-section_nanhu-south-peak-fork',
      minutes: 90
    },
    {
      from: 'north-first-section_nanhu-south-peak-fork',
      to: 'north-first-section_nanhu-pond-hut',
      minutes: 100
    },
    // 南峰岔路 <-> 南湖大山南峰 (10/15)
    {
      from: 'north-first-section_nanhu-south-peak-fork',
      to: 'mountain_nanhu-south-peak',
      minutes: 15
    },
    {
      from: 'mountain_nanhu-south-peak',
      to: 'north-first-section_nanhu-south-peak-fork',
      minutes: 10
    },
    // 南湖大山南峰 <-> 巴巴山 (60/55)
    {
      from: 'mountain_nanhu-south-peak',
      to: 'mountain_baba-mountain',
      minutes: 55
    },
    {
      from: 'mountain_baba-mountain',
      to: 'mountain_nanhu-south-peak',
      minutes: 60
    },
    // 南南峰岔路 <-> 中央尖山屋 (300/180)
    {
      from: 'north-first-section_nanhu-south-peak-fork',
      to: 'north-first-section_chungyangjian-hut',
      minutes: 180
    },
    {
      from: 'north-first-section_chungyangjian-hut',
      to: 'north-first-section_nanhu-south-peak-fork',
      minutes: 300
    },
    // 中央尖山屋 <-> 第一香菇寮 (145/120)
    {
      from: 'north-first-section_chungyangjian-hut',
      to: 'north-first-section_first-mushroom-hut-site',
      minutes: 120
    },
    {
      from: 'north-first-section_first-mushroom-hut-site',
      to: 'north-first-section_chungyangjian-hut',
      minutes: 130
    },
    // 第一香菇寮 <-> 南湖溪山屋 (145/220)
    {
      from: 'north-first-section_first-mushroom-hut-site',
      to: 'north-first-section_nanhu-river-hut',
      minutes: 145
    },
    {
      from: 'north-first-section_nanhu-river-hut',
      to: 'north-first-section_first-mushroom-hut-site',
      minutes: 220
    },
    // 中央尖溪山屋 <-> 中央尖鞍部 (240/170)
    {
      from: 'north-first-section_chungyangjian-hut',
      to: 'north-first-section_chungyangjian-saddle',
      minutes: 240
    },
    {
      from: 'north-first-section_chungyangjian-saddle',
      to: 'north-first-section_chungyangjian-hut',
      minutes: 170
    },
    // 中央尖鞍部 <-> 中央尖山 (50/35)
    {
      from: 'north-first-section_chungyangjian-saddle',
      to: 'mountain_chungyangjian-mountain',
      minutes: 50
    },
    {
      from: 'mountain_chungyangjian-mountain',
      to: 'north-first-section_chungyangjian-saddle',
      minutes: 35
    },
    // 中央尖鞍部 <-> 中央尖山東峰 (40/30)
    {
      from: 'north-first-section_chungyangjian-saddle',
      to: 'mountain_chungyangjian-east-peak',
      minutes: 40
    },
    {
      from: 'mountain_chungyangjian-east-peak',
      to: 'north-first-section_chungyangjian-saddle',
      minutes: 30
    },
    
    // --- 東段路線 ---
    {
      from: 'north-first-section_upper-cirque',
      to: 'north-first-section_east-peak-saddle',
      minutes: 40 
    },
    {
      from: 'north-first-section_east-peak-saddle',
      to: 'north-first-section_upper-cirque',
      minutes: 30 
    },
    {
      from: 'mountain_nanhu-east-peak',
      to: 'north-first-section_east-peak-saddle',
      minutes: 30 
    },
    {
      from: 'north-first-section_east-peak-saddle',
      to: 'mountain_nanhu-east-peak',
      minutes: 40 
    },
    {
      from: 'north-first-section_upper-cirque',
      to: 'mountain_nanhu-east-peak',
      minutes: 60 
    },
    {
      from: 'mountain_nanhu-east-peak',
      to: 'north-first-section_upper-cirque',
      minutes: 30 
    },
    {
      from: 'mountain_nanhu-east-peak',
      to: 'mountain_taosai-peak',
      minutes: 85
    },
    {
      from: 'mountain_taosai-peak',
      to: 'mountain_nanhu-east-peak',
      minutes: 100 
    },
    {
      from: 'mountain_taosai-peak',
      to: 'mountain_nanhu-southeast-peak',
      minutes: 75
    },
    {
      from: 'mountain_nanhu-southeast-peak',
      to: 'mountain_taosai-peak',
      minutes: 70
    },
    {
      from: 'mountain_nanhu-southeast-peak',
      to: 'north-first-section_signpost-2-2k-fork',
      minutes: 45
    },
    {
      from: 'north-first-section_signpost-2-2k-fork',
      to: 'mountain_nanhu-southeast-peak',
      minutes: 75
    },
    {
      from: 'north-first-section_signpost-2-2k-fork',
      to: 'north-first-section_stone-cave-hunting-hut-pond',
      minutes: 45
    },
    {
      from: 'north-first-section_stone-cave-hunting-hut-pond',
      to: 'north-first-section_signpost-2-2k-fork',
      minutes: 55
    },
    {
      from: 'north-first-section_da-zhuo-shui-south-river-fork',
      to: 'north-first-section_taosai-hut-ruins',
      minutes: 45
    },
    {
      from: 'north-first-section_taosai-hut-ruins',
      to: 'north-first-section_da-zhuo-shui-south-river-fork',
      minutes: 40
    },
    {
      from: 'north-first-section_taosai-hut-ruins',
      to: 'north-first-section_east-peak-saddle',
      minutes: 50
    },
    {
      from: 'north-first-section_east-peak-saddle',
      to: 'north-first-section_taosai-hut-ruins',
      minutes: 30
    },
    {
      from: 'north-first-section_da-zhuo-shui-south-river-fork',
      to: 'north-first-section_stone-cave-hunting-hut-pond',
      minutes: 10 
    },
    {
      from: 'north-first-section_stone-cave-hunting-hut-pond',
      to: 'north-first-section_da-zhuo-shui-south-river-fork',
      minutes: 10 
    },
    {
      from: 'north-first-section_signpost-2-2k-fork',
      to: 'north-first-section_signpost-1-0k',
      minutes: 30
    },
    {
      from: 'north-first-section_signpost-1-0k',
      to: 'north-first-section_signpost-2-2k-fork',
      minutes: 25
    },
    {
      from: 'north-first-section_signpost-1-0k',
      to: 'mountain_mabishan-mountain',
      minutes: 30
    },
    {
      from: 'mountain_mabishan-mountain',
      to: 'north-first-section_signpost-1-0k',
      minutes: 20
    }
  ]
}
