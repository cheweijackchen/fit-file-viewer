import { type Trail } from '@/model/hikingTrail'

export const northFirstSection: Trail = {
  id: 'north-first-section',
  name: '北一段',
  nameEn: 'North First Section',
  i18nKey: 'north-first-section.north-first-section',
  nodes: [
    // --- 西段起點 ---
    {
      id: 'north-first-section_si-yuan-ya-kou',
      name: '思源埡口',
      i18nKey: 'north-first-section.si-yuan-ya-kou',
      nodeType: 'other' 
    },
    {
      id: 'north-first-section_trailhead-6-7k',
      name: '6.7K 登山口',
      i18nKey: 'north-first-section.trailhead-6-7k',
      nodeType: 'fork' 
    },
    {
      id: 'north-first-section_duo-jia-tun-mountain-survey-point',
      name: '多加屯山水利三角點',
      i18nKey: 'north-first-section.duo-jia-tun-mountain-survey-point',
      nodeType: 'peak' 
    },
    {
      id: 'north-first-section_mu-gan-saddle',
      name: '木杆鞍部',
      i18nKey: 'north-first-section.mu-gan-saddle',
      nodeType: 'fork' 
    },
    {
      id: 'north-first-section_nan-hu-river-hut',
      name: '南湖溪山屋',
      i18nKey: 'north-first-section.nan-hu-river-hut',
      nodeType: 'hut' 
    },
    {
      id: 'north-first-section_new-yun-leng-hut',
      name: '新雲稜山莊',
      i18nKey: 'north-first-section.new-yun-leng-hut',
      nodeType: 'hut' 
    },
    
    // --- 審馬陣與北山區域 ---
    {
      id: 'north-first-section_shen-ma-zhen-mountain-trailhead',
      name: '審馬陣山登山口',
      i18nKey: 'north-first-section.shen-ma-zhen-mountain-trailhead',
      nodeType: 'fork' 
    },
    {
      id: 'north-first-section_shen-ma-zhen-mountain',
      name: '審馬陣山',
      i18nKey: 'north-first-section.shen-ma-zhen-mountain',
      nodeType: 'peak' 
    },
    {
      id: 'north-first-section_shen-ma-zhen-hut-fork',
      name: '審馬陣山莊岔路',
      i18nKey: 'north-first-section.shen-ma-zhen-hut-fork',
      nodeType: 'fork' 
    },
    {
      id: 'north-first-section_shen-ma-zhen-hut',
      name: '審馬陣山莊',
      i18nKey: 'north-first-section.shen-ma-zhen-hut',
      nodeType: 'hut' 
    },
    {
      id: 'north-first-section_nan-hu-north-mountain-fork',
      name: '南湖北山岔路',
      i18nKey: 'north-first-section.nan-hu-north-mountain-fork',
      nodeType: 'fork' 
    },
    {
      id: 'north-first-section_nan-hu-north-mountain',
      name: '南湖北山',
      i18nKey: 'north-first-section.nan-hu-north-mountain',
      nodeType: 'peak' 
    },
    {
      id: 'north-first-section_nan-hu-north-mountain-north-peak',
      name: '南湖大山北峰',
      i18nKey: 'north-first-section.nan-hu-north-mountain-north-peak',
      nodeType: 'peak' 
    },
    
    // --- 圈谷與主東峰區域 ---
    {
      id: 'north-first-section_nan-hu-main-peak',
      name: '南湖主峰',
      i18nKey: 'north-first-section.nan-hu-main-peak',
      nodeType: 'peak' 
    },
    {
      id: 'north-first-section_nan-hu-cirque-hut',
      name: '南湖圈谷山莊',
      i18nKey: 'north-first-section.nan-hu-cirque-hut',
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
      id: 'north-first-section_nan-hu-east-peak',
      name: '南湖大山東峰',
      i18nKey: 'north-first-section.nan-hu-east-peak',
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
      id: 'north-first-section_nan-hu-pond-hut',
      name: '南湖池山屋',
      i18nKey: 'north-first-section.nan-hu-pond-hut',
      nodeType: 'hut' 
    },
    {
      id: 'north-first-section_nan-hu-south-peak-fork',
      name: '南湖大山南峰岔路',
      i18nKey: 'north-first-section.nan-hu-south-peak-fork',
      nodeType: 'fork' 
    },
    {
      id: 'north-first-section_nan-hu-south-peak',
      name: '南湖大山南峰',
      i18nKey: 'north-first-section.nan-hu-south-peak',
      nodeType: 'peak' 
    },
    {
      id: 'north-first-section_ba-ba-mountain',
      name: '巴巴山',
      i18nKey: 'north-first-section.ba-ba-mountain',
      nodeType: 'peak' 
    },
    {
      id: 'north-first-section_zhong-yang-jian-hut',
      name: '中央尖山屋',
      i18nKey: 'north-first-section.zhong-yang-jian-hut',
      nodeType: 'hut' 
    },
    {
      id: 'north-first-section_first-mushroom-hut-site',
      name: '第一香菇寮舊址',
      i18nKey: 'north-first-section.first-mushroom-hut-site',
      nodeType: 'camp' 
    },
    {
      id: 'north-first-section_zhong-yang-jian-saddle',
      name: '中央尖鞍部',
      i18nKey: 'north-first-section.zhong-yang-jian-saddle',
      nodeType: 'fork' 
    },
    {
      id: 'north-first-section_zhong-yang-jian-mountain',
      name: '中央尖山',
      i18nKey: 'north-first-section.zhong-yang-jian-mountain',
      nodeType: 'peak' 
    },
    {
      id: 'north-first-section_zhong-yang-jian-east-peak',
      name: '中央尖山東峰',
      i18nKey: 'north-first-section.zhong-yang-jian-east-peak',
      nodeType: 'peak' 
    },
    
    // --- 馬比杉山東段 ---
    {
      id: 'north-first-section_tao-sai-peak',
      name: '陶塞峰',
      i18nKey: 'north-first-section.tao-sai-peak',
      nodeType: 'peak' 
    },
    {
      id: 'north-first-section_nan-hu-southeast-peak',
      name: '南湖大山東南峰',
      i18nKey: 'north-first-section.nan-hu-southeast-peak',
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
      id: 'north-first-section_ma-bi-shan-mountain',
      name: '馬比杉山',
      i18nKey: 'north-first-section.ma-bi-shan-mountain',
      nodeType: 'peak' 
    }
  ],
  edges: [
    // 思源埡口 <-> 6.7K (140/100)
    {
      from: 'north-first-section_si-yuan-ya-kou',
      to: 'north-first-section_trailhead-6-7k',
      minutes: 140 
    },
    {
      from: 'north-first-section_trailhead-6-7k',
      to: 'north-first-section_si-yuan-ya-kou',
      minutes: 100 
    },
    // 6.7K <-> 多加屯 (100/60)
    {
      from: 'north-first-section_trailhead-6-7k',
      to: 'north-first-section_duo-jia-tun-mountain-survey-point',
      minutes: 100 
    },
    {
      from: 'north-first-section_duo-jia-tun-mountain-survey-point',
      to: 'north-first-section_trailhead-6-7k',
      minutes: 60 
    },
    // 多加屯 <-> 木杆鞍部 (90/120)
    {
      from: 'north-first-section_duo-jia-tun-mountain-survey-point',
      to: 'north-first-section_mu-gan-saddle',
      minutes: 90 
    },
    {
      from: 'north-first-section_mu-gan-saddle',
      to: 'north-first-section_duo-jia-tun-mountain-survey-point',
      minutes: 120 
    },
    // 木杆鞍部 <-> 新雲稜 (30/20)
    {
      from: 'north-first-section_mu-gan-saddle',
      to: 'north-first-section_new-yun-leng-hut',
      minutes: 30 
    },
    {
      from: 'north-first-section_new-yun-leng-hut',
      to: 'north-first-section_mu-gan-saddle',
      minutes: 20 
    },
    // 木杆鞍部 <-> 南湖溪山屋 (70/60)
    {
      from: 'north-first-section_mu-gan-saddle',
      to: 'north-first-section_nan-hu-river-hut',
      minutes: 70 
    },
    {
      from: 'north-first-section_nan-hu-river-hut',
      to: 'north-first-section_mu-gan-saddle',
      minutes: 60 
    },
    // 新雲稜 <-> 審馬陣登山口 (150/100)
    {
      from: 'north-first-section_new-yun-leng-hut',
      to: 'north-first-section_shen-ma-zhen-mountain-trailhead',
      minutes: 150 
    },
    {
      from: 'north-first-section_shen-ma-zhen-mountain-trailhead',
      to: 'north-first-section_new-yun-leng-hut',
      minutes: 100 
    },
    // 審馬陣登山口 <-> 審馬陣山 (3/3)
    {
      from: 'north-first-section_shen-ma-zhen-mountain-trailhead',
      to: 'north-first-section_shen-ma-zhen-mountain',
      minutes: 3 
    },
    {
      from: 'north-first-section_shen-ma-zhen-mountain',
      to: 'north-first-section_shen-ma-zhen-mountain-trailhead',
      minutes: 3 
    },
    // 審馬陣登山口 <-> 審馬陣莊岔 (25/20)
    {
      from: 'north-first-section_shen-ma-zhen-mountain-trailhead',
      to: 'north-first-section_shen-ma-zhen-hut-fork',
      minutes: 25 
    },
    {
      from: 'north-first-section_shen-ma-zhen-hut-fork',
      to: 'north-first-section_shen-ma-zhen-mountain-trailhead',
      minutes: 20 
    },
    // 審馬陣莊岔 <-> 審馬陣山莊 (10/10)
    {
      from: 'north-first-section_shen-ma-zhen-hut-fork',
      to: 'north-first-section_shen-ma-zhen-hut',
      minutes: 10 
    },
    {
      from: 'north-first-section_shen-ma-zhen-hut',
      to: 'north-first-section_shen-ma-zhen-hut-fork',
      minutes: 10 
    },
    // 審馬陣莊岔 <-> 南湖北山岔路 (75/40)
    {
      from: 'north-first-section_shen-ma-zhen-hut-fork',
      to: 'north-first-section_nan-hu-north-mountain-fork',
      minutes: 75 
    },
    {
      from: 'north-first-section_nan-hu-north-mountain-fork',
      to: 'north-first-section_shen-ma-zhen-hut-fork',
      minutes: 40 
    },
    // 南湖北山岔路 <-> 南湖北山 (5/5)
    {
      from: 'north-first-section_nan-hu-north-mountain-fork',
      to: 'north-first-section_nan-hu-north-mountain',
      minutes: 5 
    },
    {
      from: 'north-first-section_nan-hu-north-mountain',
      to: 'north-first-section_nan-hu-north-mountain-fork',
      minutes: 5 
    },
    // 南湖北山岔路 <-> 南湖大山北峰 (75/65)
    {
      from: 'north-first-section_nan-hu-north-mountain-fork',
      to: 'north-first-section_nan-hu-north-mountain-north-peak',
      minutes: 75 
    },
    {
      from: 'north-first-section_nan-hu-north-mountain-north-peak',
      to: 'north-first-section_nan-hu-north-mountain-fork',
      minutes: 65 
    },
    // 北峰 <-> 圈谷山莊 (25/45)
    {
      from: 'north-first-section_nan-hu-north-mountain-north-peak',
      to: 'north-first-section_nan-hu-cirque-hut',
      minutes: 25 
    },
    {
      from: 'north-first-section_nan-hu-cirque-hut',
      to: 'north-first-section_nan-hu-north-mountain-north-peak',
      minutes: 45 
    },
    // 北峰 <-> 南湖主峰 (15/20)
    {
      from: 'north-first-section_nan-hu-north-mountain-north-peak',
      to: 'north-first-section_nan-hu-main-peak',
      minutes: 15 
    },
    {
      from: 'north-first-section_nan-hu-main-peak',
      to: 'north-first-section_nan-hu-north-mountain-north-peak',
      minutes: 20 
    },
    // 圈谷山莊 <-> 主峰鞍部 (30/20)
    {
      from: 'north-first-section_nan-hu-cirque-hut',
      to: 'north-first-section_main-peak-saddle',
      minutes: 30 
    },
    {
      from: 'north-first-section_main-peak-saddle',
      to: 'north-first-section_nan-hu-cirque-hut',
      minutes: 20 
    },
    // 圈谷山莊 <-> 上圈谷 (15/10)
    {
      from: 'north-first-section_nan-hu-cirque-hut',
      to: 'north-first-section_upper-cirque',
      minutes: 15 
    },
    {
      from: 'north-first-section_upper-cirque',
      to: 'north-first-section_nan-hu-cirque-hut',
      minutes: 10 
    },
    // 主峰鞍部 <-> 東峰鞍部 (40/20)
    {
      from: 'north-first-section_main-peak-saddle',
      to: 'north-first-section_east-peak-saddle',
      minutes: 40 
    },
    {
      from: 'north-first-section_east-peak-saddle',
      to: 'north-first-section_main-peak-saddle',
      minutes: 20 
    },
    // 主峰鞍部 <-> 主峰、南峰岔路 (10/15)
    {
      from: 'north-first-section_main-peak-saddle',
      to: 'north-first-section_main-south-peak-fork',
      minutes: 10 
    },
    {
      from: 'north-first-section_main-south-peak-fork',
      to: 'north-first-section_main-peak-saddle',
      minutes: 15 
    },
    // 主南岔路 <-> 南湖池山屋 (45/25)
    {
      from: 'north-first-section_main-south-peak-fork',
      to: 'north-first-section_nan-hu-pond-hut',
      minutes: 45 
    },
    {
      from: 'north-first-section_nan-hu-pond-hut',
      to: 'north-first-section_main-south-peak-fork',
      minutes: 25 
    },
    // 南湖池山屋 <-> 南大山南峰岔路 (100/90)
    {
      from: 'north-first-section_nan-hu-pond-hut',
      to: 'north-first-section_nan-hu-south-peak-fork',
      minutes: 100 
    },
    {
      from: 'north-first-section_nan-hu-south-peak-fork',
      to: 'north-first-section_nan-hu-pond-hut',
      minutes: 90 
    },
    // 南南峰岔路 <-> 南湖大山南峰 (10/15)
    {
      from: 'north-first-section_nan-hu-south-peak-fork',
      to: 'north-first-section_nan-hu-south-peak',
      minutes: 10 
    },
    {
      from: 'north-first-section_nan-hu-south-peak',
      to: 'north-first-section_nan-hu-south-peak-fork',
      minutes: 15 
    },
    // 南湖大山南峰 <-> 巴巴山 (60/55)
    {
      from: 'north-first-section_nan-hu-south-peak',
      to: 'north-first-section_ba-ba-mountain',
      minutes: 60 
    },
    {
      from: 'north-first-section_ba-ba-mountain',
      to: 'north-first-section_nan-hu-south-peak',
      minutes: 55 
    },
    // 南南峰岔路 <-> 中央尖山屋 (300/180)
    {
      from: 'north-first-section_nan-hu-south-peak-fork',
      to: 'north-first-section_zhong-yang-jian-hut',
      minutes: 300 
    },
    {
      from: 'north-first-section_zhong-yang-jian-hut',
      to: 'north-first-section_nan-hu-south-peak-fork',
      minutes: 180 
    },
    // 中央尖山屋 <-> 第一香菇寮 (145/120)
    {
      from: 'north-first-section_zhong-yang-jian-hut',
      to: 'north-first-section_first-mushroom-hut-site',
      minutes: 145 
    },
    {
      from: 'north-first-section_first-mushroom-hut-site',
      to: 'north-first-section_zhong-yang-jian-hut',
      minutes: 120 
    },
    // 第一香菇寮 <-> 木杆鞍部 (220/130)
    {
      from: 'north-first-section_first-mushroom-hut-site',
      to: 'north-first-section_mu-gan-saddle',
      minutes: 220 
    },
    {
      from: 'north-first-section_mu-gan-saddle',
      to: 'north-first-section_first-mushroom-hut-site',
      minutes: 130 
    },
    // 中央尖山屋 <-> 中央尖鞍部 (170/240)
    {
      from: 'north-first-section_zhong-yang-jian-hut',
      to: 'north-first-section_zhong-yang-jian-saddle',
      minutes: 170 
    },
    {
      from: 'north-first-section_zhong-yang-jian-saddle',
      to: 'north-first-section_zhong-yang-jian-hut',
      minutes: 240 
    },
    // 中央尖鞍部 <-> 中央尖山 (35/50)
    {
      from: 'north-first-section_zhong-yang-jian-saddle',
      to: 'north-first-section_zhong-yang-jian-mountain',
      minutes: 35 
    },
    {
      from: 'north-first-section_zhong-yang-jian-mountain',
      to: 'north-first-section_zhong-yang-jian-saddle',
      minutes: 50 
    },
    // 中央尖鞍部 <-> 中央尖山東峰 (40/30)
    {
      from: 'north-first-section_zhong-yang-jian-saddle',
      to: 'north-first-section_zhong-yang-jian-east-peak',
      minutes: 40 
    },
    {
      from: 'north-first-section_zhong-yang-jian-east-peak',
      to: 'north-first-section_zhong-yang-jian-saddle',
      minutes: 30 
    },
    
    // --- 東段路線 ---
    {
      from: 'north-first-section_upper-cirque',
      to: 'north-first-section_east-peak-saddle',
      minutes: 30 
    },
    {
      from: 'north-first-section_east-peak-saddle',
      to: 'north-first-section_upper-cirque',
      minutes: 40 
    },
    {
      from: 'north-first-section_upper-cirque',
      to: 'north-first-section_nan-hu-east-peak',
      minutes: 60 
    },
    {
      from: 'north-first-section_nan-hu-east-peak',
      to: 'north-first-section_upper-cirque',
      minutes: 30 
    },
    {
      from: 'north-first-section_nan-hu-east-peak',
      to: 'north-first-section_tao-sai-peak',
      minutes: 100 
    },
    {
      from: 'north-first-section_tao-sai-peak',
      to: 'north-first-section_nan-hu-east-peak',
      minutes: 85 
    },
    {
      from: 'north-first-section_tao-sai-peak',
      to: 'north-first-section_nan-hu-southeast-peak',
      minutes: 70 
    },
    {
      from: 'north-first-section_nan-hu-southeast-peak',
      to: 'north-first-section_tao-sai-peak',
      minutes: 75 
    },
    {
      from: 'north-first-section_nan-hu-southeast-peak',
      to: 'north-first-section_signpost-2-2k-fork',
      minutes: 75 
    },
    {
      from: 'north-first-section_signpost-2-2k-fork',
      to: 'north-first-section_nan-hu-southeast-peak',
      minutes: 45 
    },
    {
      from: 'north-first-section_signpost-2-2k-fork',
      to: 'north-first-section_da-zhuo-shui-south-river-fork',
      minutes: 55 
    },
    {
      from: 'north-first-section_da-zhuo-shui-south-river-fork',
      to: 'north-first-section_signpost-2-2k-fork',
      minutes: 45 
    },
    {
      from: 'north-first-section_da-zhuo-shui-south-river-fork',
      to: 'north-first-section_east-peak-saddle',
      minutes: 40 
    },
    {
      from: 'north-first-section_east-peak-saddle',
      to: 'north-first-section_da-zhuo-shui-south-river-fork',
      minutes: 45 
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
      minutes: 25 
    },
    {
      from: 'north-first-section_signpost-1-0k',
      to: 'north-first-section_signpost-2-2k-fork',
      minutes: 30 
    },
    {
      from: 'north-first-section_signpost-1-0k',
      to: 'north-first-section_ma-bi-shan-mountain',
      minutes: 20 
    },
    {
      from: 'north-first-section_ma-bi-shan-mountain',
      to: 'north-first-section_signpost-1-0k',
      minutes: 30 
    }
  ]
}
