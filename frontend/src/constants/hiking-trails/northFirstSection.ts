import { type Trail } from '@/model/hikingTrail'

export const northFirstSection: Trail = {
  id: 'north-first-section',
  name: '北一段',
  nameEn: 'North First Section',
  i18nKey: 'north-first-section.north-first-section',
  nodes: [
    // --- 西段起點與公路登山口 ---
    {
      id: 'north-first-section_siyuan-pass',
      name: '思源埡口',
      i18nKey: 'north-first-section.siyuan-pass',
      nodeType: 'other'
    },
    {
      id: 'north-first-section_4-8k-fork',
      name: '4.8K岔路口',
      i18nKey: 'north-first-section.4-8k-fork',
      nodeType: 'fork'
    },
    {
      id: 'north-first-section_dashui-pond-trailhead',
      name: '大水池登山口',
      i18nKey: 'north-first-section.dashui-pond-trailhead',
      nodeType: 'fork'
    },
    {
      id: 'north-first-section_shengguang-trailhead',
      name: '勝光登山口',
      i18nKey: 'north-first-section.shengguang-trailhead',
      nodeType: 'fork'
    },
    {
      id: 'north-first-section_6-8k-trailhead',
      name: '6.8K登山口',
      i18nKey: 'north-first-section.6-8k-trailhead',
      nodeType: 'fork'
    },
    {
      id: 'mountain_duojiatun-mountain-survey-point',
      name: '多加屯山水利三角點',
      i18nKey: 'mountain.duojiatun-mountain-survey-point',
      nodeType: 'peak'
    },
    {
      id: 'north-first-section_mugan-saddle',
      name: '木杆鞍部',
      i18nKey: 'north-first-section.mugan-saddle',
      nodeType: 'fork'
    },

    // --- 南湖溪山屋與中央尖區域 ---
    {
      id: 'north-first-section_nanhu-river-hut',
      name: '南湖溪山屋',
      i18nKey: 'north-first-section.nanhu-river-hut',
      nodeType: 'hut'
    },
    {
      id: 'north-first-section_xiangguliao-camp',
      name: '香菇寮營地',
      i18nKey: 'north-first-section.xiangguliao-camp',
      nodeType: 'camp'
    },
    {
      id: 'north-first-section_chungyangjian-river-hut',
      name: '中央尖溪山屋',
      i18nKey: 'north-first-section.chungyangjian-river-hut',
      nodeType: 'hut'
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

    // --- 審馬陣與北山區域 ---
    {
      id: 'north-first-section_xinyunleng-hut',
      name: '新雲稜山莊',
      i18nKey: 'north-first-section.xinyunleng-hut',
      nodeType: 'hut'
    },
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
      name: '審馬陣山莊岔路口',
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
      id: 'north-first-section_beishan-mountain-trailhead',
      name: '北山登山口',
      i18nKey: 'north-first-section.beishan-mountain-trailhead',
      nodeType: 'fork'
    },
    {
      id: 'mountain_nanhu-north-mountain',
      name: '南湖北山',
      i18nKey: 'mountain.nanhu-north-mountain',
      nodeType: 'peak'
    },
    {
      id: 'mountain_nanhu-north-peak',
      name: '南湖大山北峰',
      i18nKey: 'mountain.nanhu-north-peak',
      nodeType: 'peak'
    },

    // --- 圈谷與東段區域 ---
    {
      id: 'north-first-section_nanhu-cirque-hut',
      name: '南湖圈谷山莊',
      i18nKey: 'north-first-section.nanhu-cirque-hut',
      nodeType: 'hut'
    },
    {
      id: 'north-first-section_shangquangu-cirque',
      name: '上圈谷',
      i18nKey: 'north-first-section.shangquangu-cirque',
      nodeType: 'other'
    },
    {
      id: 'mountain_nanhu-east-peak',
      name: '南湖大山東峰',
      i18nKey: 'mountain.nanhu-east-peak',
      nodeType: 'peak'
    },
    {
      id: 'north-first-section_east-peak-trailhead',
      name: '東峰登山口',
      i18nKey: 'north-first-section.east-peak-trailhead',
      nodeType: 'fork'
    },
    {
      id: 'north-first-section_taosai-peak-trailhead',
      name: '陶塞峰登山口',
      i18nKey: 'north-first-section.taosai-peak-trailhead',
      nodeType: 'fork'
    },
    {
      id: 'mountain_nanhu-southeast-peak',
      name: '南湖大山東南峰',
      i18nKey: 'mountain.nanhu-southeast-peak',
      nodeType: 'peak'
    },
    {
      id: 'north-first-section_signpost-2-2k-fork',
      name: '指標2.2K岔路口',
      i18nKey: 'north-first-section.signpost-2-2k-fork',
      nodeType: 'fork'
    },
    {
      id: 'north-first-section_signpost-1-0k',
      name: '指標1.0K',
      i18nKey: 'north-first-section.signpost-1-0k',
      nodeType: 'other'
    },
    {
      id: 'mountain_mabishan-mountain',
      name: '馬比杉山',
      i18nKey: 'mountain.mabishan-mountain',
      nodeType: 'peak'
    },
    {
      id: 'north-first-section_hunting-hut-fork',
      name: '獵寮岔路',
      i18nKey: 'north-first-section.hunting-hut-fork',
      nodeType: 'fork'
    },
    {
      id: 'north-first-section_shidong-hunting-hut',
      name: '石洞獵寮',
      i18nKey: 'north-first-section.shidong-hunting-hut',
      nodeType: 'camp'
    },
    {
      id: 'north-first-section_dazhuoshuinan-river-fork',
      name: '大濁水南溪岔路',
      i18nKey: 'north-first-section.dazhuoshuinan-river-fork',
      nodeType: 'fork'
    },
    {
      id: 'north-first-section_taosai-hut-ruins',
      name: '陶塞山屋遺址',
      i18nKey: 'north-first-section.taosai-hut-ruins',
      nodeType: 'camp'
    },
    {
      id: 'north-first-section_shangquangu-fork',
      name: '四岔路口',
      i18nKey: 'north-first-section.shangquangu-fork',
      nodeType: 'fork'
    },

    // --- 主峰與南峰區域 ---
    {
      id: 'north-first-section_main-east-fork',
      name: '主東岔路',
      i18nKey: 'north-first-section.main-east-fork',
      nodeType: 'fork'
    },
    {
      id: 'north-first-section_main-south-peak-fork',
      name: '主峰、南峰三岔路口',
      i18nKey: 'north-first-section.main-south-peak-fork',
      nodeType: 'fork'
    },
    {
      id: 'mountain_nanhu-main-peak',
      name: '南湖主峰',
      i18nKey: 'mountain.nanhu-main-peak',
      nodeType: 'peak'
    },
    {
      id: 'north-first-section_nanhuchi-hut',
      name: '南湖池山屋',
      i18nKey: 'north-first-section.nanhuchi-hut',
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
    }
  ],
  edges: [
    // 思源埡口 <-> 4.8K岔路口
    {
      from: 'north-first-section_siyuan-pass',
      to: 'north-first-section_4-8k-fork',
      minutes: 145
    },
    {
      from: 'north-first-section_4-8k-fork',
      to: 'north-first-section_siyuan-pass',
      minutes: 100
    },
    // 4.8K岔路口 <-> 大水池登山口
    {
      from: 'north-first-section_4-8k-fork',
      to: 'north-first-section_dashui-pond-trailhead',
      minutes: 45
    },
    {
      from: 'north-first-section_dashui-pond-trailhead',
      to: 'north-first-section_4-8k-fork',
      minutes: 70
    },
    // 大水池登山口 <-> 勝光登山口
    {
      from: 'north-first-section_dashui-pond-trailhead',
      to: 'north-first-section_shengguang-trailhead',
      minutes: 25
    },
    {
      from: 'north-first-section_shengguang-trailhead',
      to: 'north-first-section_dashui-pond-trailhead',
      minutes: 30
    },
    // 4.8K岔路口 <-> 6.8K登山口
    {
      from: 'north-first-section_4-8k-fork',
      to: 'north-first-section_6-8k-trailhead',
      minutes: 45
    },
    {
      from: 'north-first-section_6-8k-trailhead',
      to: 'north-first-section_4-8k-fork',
      minutes: 40
    },
    // 6.8K登山口 <-> 多加屯山水利三角點
    {
      from: 'north-first-section_6-8k-trailhead',
      to: 'mountain_duojiatun-mountain-survey-point',
      minutes: 100
    },
    {
      from: 'mountain_duojiatun-mountain-survey-point',
      to: 'north-first-section_6-8k-trailhead',
      minutes: 60
    },
    // 多加屯山水利三角點 <-> 木杆鞍部
    {
      from: 'mountain_duojiatun-mountain-survey-point',
      to: 'north-first-section_mugan-saddle',
      minutes: 90
    },
    {
      from: 'north-first-section_mugan-saddle',
      to: 'mountain_duojiatun-mountain-survey-point',
      minutes: 100
    },
    // 木杆鞍部 <-> 南湖溪山屋
    {
      from: 'north-first-section_mugan-saddle',
      to: 'north-first-section_nanhu-river-hut',
      minutes: 65
    },
    {
      from: 'north-first-section_nanhu-river-hut',
      to: 'north-first-section_mugan-saddle',
      minutes: 75
    },
    // 南湖溪山屋 <-> 香菇寮營地
    {
      from: 'north-first-section_nanhu-river-hut',
      to: 'north-first-section_xiangguliao-camp',
      minutes: 220
    },
    {
      from: 'north-first-section_xiangguliao-camp',
      to: 'north-first-section_nanhu-river-hut',
      minutes: 170
    },
    // 香菇寮營地 <-> 中央尖溪山屋
    {
      from: 'north-first-section_xiangguliao-camp',
      to: 'north-first-section_chungyangjian-river-hut',
      minutes: 180
    },
    {
      from: 'north-first-section_chungyangjian-river-hut',
      to: 'north-first-section_xiangguliao-camp',
      minutes: 150
    },
    // 中央尖溪山屋 <-> 中央尖鞍部
    {
      from: 'north-first-section_chungyangjian-river-hut',
      to: 'north-first-section_chungyangjian-saddle',
      minutes: 240
    },
    {
      from: 'north-first-section_chungyangjian-saddle',
      to: 'north-first-section_chungyangjian-river-hut',
      minutes: 200
    },
    // 中央尖鞍部 <-> 中央尖山
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
    // 中央尖鞍部 <-> 中央尖山東峰
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
    // 木杆鞍部 <-> 新雲稜山莊
    {
      from: 'north-first-section_mugan-saddle',
      to: 'north-first-section_xinyunleng-hut',
      minutes: 40
    },
    {
      from: 'north-first-section_xinyunleng-hut',
      to: 'north-first-section_mugan-saddle',
      minutes: 25
    },
    // 新雲稜山莊 <-> 審馬陣山登山口
    {
      from: 'north-first-section_xinyunleng-hut',
      to: 'north-first-section_shenmazhen-mountain-trailhead',
      minutes: 170
    },
    {
      from: 'north-first-section_shenmazhen-mountain-trailhead',
      to: 'north-first-section_xinyunleng-hut',
      minutes: 100
    },
    // 審馬陣山登山口 <-> 審馬陣山
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
    // 審馬陣山登山口 <-> 審馬陣山莊岔路口
    {
      from: 'north-first-section_shenmazhen-mountain-trailhead',
      to: 'north-first-section_shenmazhen-hut-fork',
      minutes: 30
    },
    {
      from: 'north-first-section_shenmazhen-hut-fork',
      to: 'north-first-section_shenmazhen-mountain-trailhead',
      minutes: 20
    },
    // 審馬陣山莊岔路口 <-> 審馬陣山莊
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
    // 審馬陣山莊岔路口 <-> 北山登山口
    {
      from: 'north-first-section_shenmazhen-hut-fork',
      to: 'north-first-section_beishan-mountain-trailhead',
      minutes: 100
    },
    {
      from: 'north-first-section_beishan-mountain-trailhead',
      to: 'north-first-section_shenmazhen-hut-fork',
      minutes: 60
    },
    // 北山登山口 <-> 南湖北山
    {
      from: 'north-first-section_beishan-mountain-trailhead',
      to: 'mountain_nanhu-north-mountain',
      minutes: 10
    },
    {
      from: 'mountain_nanhu-north-mountain',
      to: 'north-first-section_beishan-mountain-trailhead',
      minutes: 10
    },
    // 北山登山口 <-> 南湖大山北峰
    {
      from: 'north-first-section_beishan-mountain-trailhead',
      to: 'mountain_nanhu-north-peak',
      minutes: 80
    },
    {
      from: 'mountain_nanhu-north-peak',
      to: 'north-first-section_beishan-mountain-trailhead',
      minutes: 70
    },
    // 南湖大山北峰 <-> 南湖圈谷山莊
    {
      from: 'mountain_nanhu-north-peak',
      to: 'north-first-section_nanhu-cirque-hut',
      minutes: 35
    },
    {
      from: 'north-first-section_nanhu-cirque-hut',
      to: 'mountain_nanhu-north-peak',
      minutes: 55
    },
    // 南湖圈谷山莊 <-> 上圈谷
    {
      from: 'north-first-section_nanhu-cirque-hut',
      to: 'north-first-section_shangquangu-cirque',
      minutes: 15
    },
    {
      from: 'north-first-section_shangquangu-cirque',
      to: 'north-first-section_nanhu-cirque-hut',
      minutes: 10
    },
    // 上圈谷 <-> 南湖大山東峰
    {
      from: 'north-first-section_shangquangu-cirque',
      to: 'mountain_nanhu-east-peak',
      minutes: 60
    },
    {
      from: 'mountain_nanhu-east-peak',
      to: 'north-first-section_shangquangu-cirque',
      minutes: 30
    },
    // 南湖大山東峰 <-> 東峰登山口
    {
      from: 'mountain_nanhu-east-peak',
      to: 'north-first-section_east-peak-trailhead',
      minutes: 10
    },
    {
      from: 'north-first-section_east-peak-trailhead',
      to: 'mountain_nanhu-east-peak',
      minutes: 15
    },
    // 東峰登山口 <-> 陶塞峰登山口
    {
      from: 'north-first-section_east-peak-trailhead',
      to: 'north-first-section_taosai-peak-trailhead',
      minutes: 65
    },
    {
      from: 'north-first-section_taosai-peak-trailhead',
      to: 'north-first-section_east-peak-trailhead',
      minutes: 70
    },
    // 陶塞峰登山口 <-> 南湖大山東南峰
    {
      from: 'north-first-section_taosai-peak-trailhead',
      to: 'mountain_nanhu-southeast-peak',
      minutes: 75
    },
    {
      from: 'mountain_nanhu-southeast-peak',
      to: 'north-first-section_taosai-peak-trailhead',
      minutes: 70
    },
    // 南湖大山東南峰 <-> 指標2.2K岔路口
    {
      from: 'mountain_nanhu-southeast-peak',
      to: 'north-first-section_signpost-2-2k-fork',
      minutes: 55
    },
    {
      from: 'north-first-section_signpost-2-2k-fork',
      to: 'mountain_nanhu-southeast-peak',
      minutes: 75
    },
    // 指標2.2K岔路口 <-> 指標1.0K
    {
      from: 'north-first-section_signpost-2-2k-fork',
      to: 'north-first-section_signpost-1-0k',
      minutes: 35
    },
    {
      from: 'north-first-section_signpost-1-0k',
      to: 'north-first-section_signpost-2-2k-fork',
      minutes: 50
    },
    // 指標1.0K <-> 馬比杉山
    {
      from: 'north-first-section_signpost-1-0k',
      to: 'mountain_mabishan-mountain',
      minutes: 40
    },
    {
      from: 'mountain_mabishan-mountain',
      to: 'north-first-section_signpost-1-0k',
      minutes: 20
    },
    // 指標2.2K岔路口 <-> 獵寮岔路
    {
      from: 'north-first-section_signpost-2-2k-fork',
      to: 'north-first-section_hunting-hut-fork',
      minutes: 45
    },
    {
      from: 'north-first-section_hunting-hut-fork',
      to: 'north-first-section_signpost-2-2k-fork',
      minutes: 50
    },
    // 獵寮岔路 <-> 石洞獵寮
    {
      from: 'north-first-section_hunting-hut-fork',
      to: 'north-first-section_shidong-hunting-hut',
      minutes: 5
    },
    {
      from: 'north-first-section_shidong-hunting-hut',
      to: 'north-first-section_hunting-hut-fork',
      minutes: 5
    },
    // 獵寮岔路 <-> 大濁水南溪岔路
    {
      from: 'north-first-section_hunting-hut-fork',
      to: 'north-first-section_dazhuoshuinan-river-fork',
      minutes: 15
    },
    {
      from: 'north-first-section_dazhuoshuinan-river-fork',
      to: 'north-first-section_hunting-hut-fork',
      minutes: 10
    },
    // 大濁水南溪岔路 <-> 陶塞山屋遺址
    {
      from: 'north-first-section_dazhuoshuinan-river-fork',
      to: 'north-first-section_taosai-hut-ruins',
      minutes: 60
    },
    {
      from: 'north-first-section_taosai-hut-ruins',
      to: 'north-first-section_dazhuoshuinan-river-fork',
      minutes: 40
    },
    // 陶塞山屋遺址 <-> 四岔路口
    {
      from: 'north-first-section_taosai-hut-ruins',
      to: 'north-first-section_shangquangu-fork',
      minutes: 70
    },
    {
      from: 'north-first-section_shangquangu-fork',
      to: 'north-first-section_taosai-hut-ruins',
      minutes: 40
    },
    // 四岔路口 <-> 東峰登山口
    {
      from: 'north-first-section_shangquangu-fork',
      to: 'north-first-section_east-peak-trailhead',
      minutes: 25
    },
    {
      from: 'north-first-section_east-peak-trailhead',
      to: 'north-first-section_shangquangu-fork',
      minutes: 20
    },
    // 上圈谷 <-> 四岔路口
    {
      from: 'north-first-section_shangquangu-cirque',
      to: 'north-first-section_shangquangu-fork',
      minutes: 50
    },
    {
      from: 'north-first-section_shangquangu-fork',
      to: 'north-first-section_shangquangu-cirque',
      minutes: 30
    },
    // 四岔路口 <-> 主東岔路
    {
      from: 'north-first-section_shangquangu-fork',
      to: 'north-first-section_main-east-fork',
      minutes: 30
    },
    {
      from: 'north-first-section_main-east-fork',
      to: 'north-first-section_shangquangu-fork',
      minutes: 30
    },
    // 南湖圈谷山莊 <-> 主東岔路
    {
      from: 'north-first-section_nanhu-cirque-hut',
      to: 'north-first-section_main-east-fork',
      minutes: 50
    },
    {
      from: 'north-first-section_main-east-fork',
      to: 'north-first-section_nanhu-cirque-hut',
      minutes: 40
    },
    // 主東岔路 <-> 主峰、南峰三岔路口
    {
      from: 'north-first-section_main-east-fork',
      to: 'north-first-section_main-south-peak-fork',
      minutes: 20
    },
    {
      from: 'north-first-section_main-south-peak-fork',
      to: 'north-first-section_main-east-fork',
      minutes: 15
    },
    // 主峰、南峰三岔路口 <-> 南湖主峰
    {
      from: 'north-first-section_main-south-peak-fork',
      to: 'mountain_nanhu-main-peak',
      minutes: 45
    },
    {
      from: 'mountain_nanhu-main-peak',
      to: 'north-first-section_main-south-peak-fork',
      minutes: 30
    },
    // 主峰、南峰三岔路口 <-> 南湖池山屋
    {
      from: 'north-first-section_main-south-peak-fork',
      to: 'north-first-section_nanhuchi-hut',
      minutes: 35
    },
    {
      from: 'north-first-section_nanhuchi-hut',
      to: 'north-first-section_main-south-peak-fork',
      minutes: 55
    },
    // 南湖池山屋 <-> 南湖大山南峰岔路
    {
      from: 'north-first-section_nanhuchi-hut',
      to: 'north-first-section_nanhu-south-peak-fork',
      minutes: 95
    },
    {
      from: 'north-first-section_nanhu-south-peak-fork',
      to: 'north-first-section_nanhuchi-hut',
      minutes: 120
    },
    // 南湖大山南峰岔路 <-> 南湖大山南峰
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
    // 南湖大山南峰 <-> 巴巴山
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
    // 中央尖溪山屋 <-> 南湖大山南峰岔路
    {
      from: 'north-first-section_chungyangjian-river-hut',
      to: 'north-first-section_nanhu-south-peak-fork',
      minutes: 340
    },
    {
      from: 'north-first-section_nanhu-south-peak-fork',
      to: 'north-first-section_chungyangjian-river-hut',
      minutes: 190
    }
  ]
}
