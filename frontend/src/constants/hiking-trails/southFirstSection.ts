import { type Trail } from '@/model/hikingTrail'

export const southFirstSection: Trail = {
  id: 'south-first-section',
  name: '南一段',
  nameEn: 'South First Section',
  i18nKey: 'south-first-section.south-first-section',
  nodes: [
    // --- 進涇橋 → 小關山北峰 ---
    {
      id: 'south-first-section_jinjing-bridge',
      name: '進涇橋',
      i18nKey: 'south-first-section.jinjing-bridge',
      nodeType: 'other'
    },
    {
      id: 'south-first-section_3026-hut',
      name: '3026山屋',
      i18nKey: 'south-first-section.3026-hut',
      nodeType: 'hut'
    },
    {
      id: 'mountain_kuhanuoxin-mountain',
      name: '庫哈諾辛山',
      i18nKey: 'mountain.kuhanuoxin-mountain',
      nodeType: 'peak'
    },
    {
      id: 'south-first-section_3444-main-ridge',
      name: '3444主稜',
      i18nKey: 'south-first-section.3444-main-ridge',
      nodeType: 'other'
    },
    {
      id: 'mountain_guan-mountain',
      name: '關山',
      i18nKey: 'mountain.guan-mountain',
      nodeType: 'peak'
    },
    {
      id: 'south-first-section_2920-saddle-camp',
      name: '2920鞍營地',
      i18nKey: 'south-first-section.2920-saddle-camp',
      nodeType: 'camp'
    },
    {
      id: 'south-first-section_2920-saddle-water-source',
      name: '水源',
      i18nKey: 'south-first-section.2920-saddle-water-source',
      nodeType: 'water-source'
    },
    {
      id: 'mountain_hainuonan-mountain',
      name: '海諾南山',
      i18nKey: 'mountain.hainuonan-mountain',
      nodeType: 'peak'
    },
    {
      id: 'mountain_xiaoguan-north-peak',
      name: '小關山北峰',
      i18nKey: 'mountain.xiaoguan-north-peak',
      nodeType: 'peak'
    },
    // --- 四岔路口與支線 ---
    {
      id: 'south-first-section_xiaoguan-fork',
      name: '四岔路口',
      i18nKey: 'south-first-section.xiaoguan-fork',
      nodeType: 'fork'
    },
    {
      id: 'mountain_xiaoguan-mountain',
      name: '小關山',
      i18nKey: 'mountain.xiaoguan-mountain',
      nodeType: 'peak'
    },
    {
      id: 'south-first-section_aogu-camp',
      name: '凹谷營地',
      i18nKey: 'south-first-section.aogu-camp',
      nodeType: 'camp'
    },
    {
      id: 'south-first-section_tieshan-trailhead',
      name: '登山口',
      i18nKey: 'south-first-section.tieshan-trailhead',
      nodeType: 'fork'
    },
    {
      id: 'south-first-section_tieshan-camp',
      name: '鐵杉營地',
      i18nKey: 'south-first-section.tieshan-camp',
      nodeType: 'camp'
    },
    {
      id: 'south-first-section_zuidi-saddle',
      name: '最低鞍部',
      i18nKey: 'south-first-section.zuidi-saddle',
      nodeType: 'fork'
    },
    // --- 雲水山 → 卑南主山 ---
    {
      id: 'mountain_yunshui-mountain',
      name: '雲水山',
      i18nKey: 'mountain.yunshui-mountain',
      nodeType: 'peak'
    },
    {
      id: 'south-first-section_yunma-saddle-camp',
      name: '雲馬鞍營地',
      i18nKey: 'south-first-section.yunma-saddle-camp',
      nodeType: 'camp'
    },
    {
      id: 'south-first-section_yunma-saddle-water-source',
      name: '水源',
      i18nKey: 'south-first-section.yunma-saddle-water-source',
      nodeType: 'water-source'
    },
    {
      id: 'mountain_maxibaxiu-mountain',
      name: '馬西巴秀山',
      i18nKey: 'mountain.maxibaxiu-mountain',
      nodeType: 'peak'
    },
    {
      id: 'south-first-section_maxibaxiu-rock-cave-camp',
      name: '馬西巴秀石洞營地',
      i18nKey: 'south-first-section.maxibaxiu-rock-cave-camp',
      nodeType: 'camp'
    },
    {
      id: 'mountain_3237-peak',
      name: '3237公尺峰',
      i18nKey: 'mountain.3237-peak',
      nodeType: 'peak'
    },
    {
      id: 'south-first-section_sancha-peak-camp',
      name: '三叉峰下營地',
      i18nKey: 'south-first-section.sancha-peak-camp',
      nodeType: 'camp'
    },
    {
      id: 'south-first-section_beinan-fork',
      name: '三岔路口',
      i18nKey: 'south-first-section.beinan-fork',
      nodeType: 'fork'
    },
    {
      id: 'mountain_beinan-mountain',
      name: '卑南主山',
      i18nKey: 'mountain.beinan-mountain',
      nodeType: 'peak'
    },
    {
      id: 'south-first-section_heaven-on-earth',
      name: '人間天堂',
      i18nKey: 'south-first-section.heaven-on-earth',
      nodeType: 'other'
    },
    // --- 石山林道 / 溪南山 ---
    {
      id: 'south-first-section_xinjiu-road-fork',
      name: '新舊路岔路',
      i18nKey: 'south-first-section.xinjiu-road-fork',
      nodeType: 'fork'
    },
    {
      id: 'south-first-section_forest-road-saddle',
      name: '林道鞍部',
      i18nKey: 'south-first-section.forest-road-saddle',
      nodeType: 'fork'
    },
    {
      id: 'south-first-section_shipu-area',
      name: '石瀑區',
      i18nKey: 'south-first-section.shipu-area',
      nodeType: 'other'
    },
    {
      id: 'south-first-section_shishan-fork',
      name: '石山岔路口',
      i18nKey: 'south-first-section.shishan-fork',
      nodeType: 'fork'
    },
    {
      id: 'mountain_shishan-mountain',
      name: '石山',
      i18nKey: 'mountain.shishan-mountain',
      nodeType: 'peak'
    },
    {
      id: 'south-first-section_shishanxi-saddle',
      name: '石山西鞍',
      i18nKey: 'south-first-section.shishanxi-saddle',
      nodeType: 'fork'
    },
    {
      id: 'south-first-section_xinan-mountain-trailhead',
      name: '溪南山登山口',
      i18nKey: 'south-first-section.xinan-mountain-trailhead',
      nodeType: 'fork'
    },
    {
      id: 'south-first-section_shishanxiu-lake',
      name: '石山秀湖',
      i18nKey: 'south-first-section.shishanxiu-lake',
      nodeType: 'water-source'
    },
    {
      id: 'mountain_xinan-mountain',
      name: '溪南山',
      i18nKey: 'mountain.xinan-mountain',
      nodeType: 'peak'
    },
    {
      id: 'south-first-section_container-house',
      name: '貨櫃屋',
      i18nKey: 'south-first-section.container-house',
      nodeType: 'other'
    },
    {
      id: 'south-first-section_shishan-forest-road-trailhead',
      name: '石山林道登山口/特生中心',
      i18nKey: 'south-first-section.shishan-forest-road-trailhead',
      nodeType: 'fork'
    },
    {
      id: 'south-first-section_chuyun-mountain-station',
      name: '出雲山檢查哨',
      i18nKey: 'south-first-section.chuyun-mountain-station',
      nodeType: 'other'
    },
    {
      id: 'south-first-section_18k-road-end',
      name: '18K行車終點',
      i18nKey: 'south-first-section.18k-road-end',
      nodeType: 'other'
    },
    // --- 塔關山（與主線無步行連線） ---
    {
      id: 'south-first-section_taguan-mountain-trailhead',
      name: '塔關山登山口',
      i18nKey: 'south-first-section.taguan-mountain-trailhead',
      nodeType: 'fork'
    },
    {
      id: 'mountain_taguan-mountain',
      name: '塔關山',
      i18nKey: 'mountain.taguan-mountain',
      nodeType: 'peak'
    },
    // --- 關山嶺山（與主線無步行連線） ---
    {
      id: 'global_pass-hut',
      name: '埡口山莊',
      i18nKey: 'global.pass-hut',
      nodeType: 'hut'
    },
    {
      id: 'mountain_guanshanling-mountain',
      name: '關山嶺山',
      i18nKey: 'mountain.guanshanling-mountain',
      nodeType: 'peak'
    },
    // --- 中之關 / 天池（與主線無步行連線） ---
    {
      id: 'south-first-section_zhongzhiguan-trailhead',
      name: '中之關步道口',
      i18nKey: 'south-first-section.zhongzhiguan-trailhead',
      nodeType: 'fork'
    },
    {
      id: 'south-first-section_zhongzhiguan',
      name: '中之關',
      i18nKey: 'south-first-section.zhongzhiguan',
      nodeType: 'other'
    },
    {
      id: 'south-first-section_historic-trail-trailhead',
      name: '古道口',
      i18nKey: 'south-first-section.historic-trail-trailhead',
      nodeType: 'fork'
    },
    {
      id: 'south-first-section_tianchi-pond',
      name: '天池',
      i18nKey: 'south-first-section.tianchi-pond',
      nodeType: 'water-source'
    }
  ],
  edges: [
    // 進涇橋 <-> 3026山屋
    {
      from: 'south-first-section_jinjing-bridge',
      to: 'south-first-section_3026-hut',
      minutes: 135
    },
    {
      from: 'south-first-section_3026-hut',
      to: 'south-first-section_jinjing-bridge',
      minutes: 100
    },
    // 3026山屋 <-> 庫哈諾辛山
    {
      from: 'south-first-section_3026-hut',
      to: 'mountain_kuhanuoxin-mountain',
      minutes: 80
    },
    {
      from: 'mountain_kuhanuoxin-mountain',
      to: 'south-first-section_3026-hut',
      minutes: 70
    },
    // 3026山屋 <-> 3444主稜
    {
      from: 'south-first-section_3026-hut',
      to: 'south-first-section_3444-main-ridge',
      minutes: 150
    },
    {
      from: 'south-first-section_3444-main-ridge',
      to: 'south-first-section_3026-hut',
      minutes: 120
    },
    // 3444主稜 <-> 關山
    {
      from: 'south-first-section_3444-main-ridge',
      to: 'mountain_guan-mountain',
      minutes: 130
    },
    {
      from: 'mountain_guan-mountain',
      to: 'south-first-section_3444-main-ridge',
      minutes: 100
    },
    // 關山 <-> 2920鞍營地
    {
      from: 'mountain_guan-mountain',
      to: 'south-first-section_2920-saddle-camp',
      minutes: 180
    },
    {
      from: 'south-first-section_2920-saddle-camp',
      to: 'mountain_guan-mountain',
      minutes: 320
    },
    // 2920鞍營地 <-> 水源
    {
      from: 'south-first-section_2920-saddle-camp',
      to: 'south-first-section_2920-saddle-water-source',
      minutes: 10
    },
    {
      from: 'south-first-section_2920-saddle-water-source',
      to: 'south-first-section_2920-saddle-camp',
      minutes: 20
    },
    // 2920鞍營地 <-> 海諾南山
    {
      from: 'south-first-section_2920-saddle-camp',
      to: 'mountain_hainuonan-mountain',
      minutes: 130
    },
    {
      from: 'mountain_hainuonan-mountain',
      to: 'south-first-section_2920-saddle-camp',
      minutes: 110
    },
    // 海諾南山 <-> 小關山北峰
    {
      from: 'mountain_hainuonan-mountain',
      to: 'mountain_xiaoguan-north-peak',
      minutes: 170
    },
    {
      from: 'mountain_xiaoguan-north-peak',
      to: 'mountain_hainuonan-mountain',
      minutes: 150
    },
    // 小關山北峰 <-> 四岔路口
    {
      from: 'mountain_xiaoguan-north-peak',
      to: 'south-first-section_xiaoguan-fork',
      minutes: 160
    },
    {
      from: 'south-first-section_xiaoguan-fork',
      to: 'mountain_xiaoguan-north-peak',
      minutes: 160
    },
    // 四岔路口 <-> 小關山
    {
      from: 'south-first-section_xiaoguan-fork',
      to: 'mountain_xiaoguan-mountain',
      minutes: 1
    },
    {
      from: 'mountain_xiaoguan-mountain',
      to: 'south-first-section_xiaoguan-fork',
      minutes: 1
    },
    // 四岔路口 <-> 凹谷營地
    {
      from: 'south-first-section_xiaoguan-fork',
      to: 'south-first-section_aogu-camp',
      minutes: 40
    },
    {
      from: 'south-first-section_aogu-camp',
      to: 'south-first-section_xiaoguan-fork',
      minutes: 50
    },
    // 凹谷營地 <-> 登山口
    {
      from: 'south-first-section_aogu-camp',
      to: 'south-first-section_tieshan-trailhead',
      minutes: 70
    },
    {
      from: 'south-first-section_tieshan-trailhead',
      to: 'south-first-section_aogu-camp',
      minutes: 100
    },
    // 登山口 <-> 鐵杉營地
    {
      from: 'south-first-section_tieshan-trailhead',
      to: 'south-first-section_tieshan-camp',
      minutes: 20
    },
    {
      from: 'south-first-section_tieshan-camp',
      to: 'south-first-section_tieshan-trailhead',
      minutes: 20
    },
    // 四岔路口 <-> 最低鞍部
    {
      from: 'south-first-section_xiaoguan-fork',
      to: 'south-first-section_zuidi-saddle',
      minutes: 70
    },
    {
      from: 'south-first-section_zuidi-saddle',
      to: 'south-first-section_xiaoguan-fork',
      minutes: 110
    },
    // 最低鞍部 <-> 雲水山
    {
      from: 'south-first-section_zuidi-saddle',
      to: 'mountain_yunshui-mountain',
      minutes: 60
    },
    {
      from: 'mountain_yunshui-mountain',
      to: 'south-first-section_zuidi-saddle',
      minutes: 45
    },
    // 雲水山 <-> 雲馬鞍營地
    {
      from: 'mountain_yunshui-mountain',
      to: 'south-first-section_yunma-saddle-camp',
      minutes: 90
    },
    {
      from: 'south-first-section_yunma-saddle-camp',
      to: 'mountain_yunshui-mountain',
      minutes: 120
    },
    // 雲馬鞍營地 <-> 水源
    {
      from: 'south-first-section_yunma-saddle-camp',
      to: 'south-first-section_yunma-saddle-water-source',
      minutes: 15
    },
    {
      from: 'south-first-section_yunma-saddle-water-source',
      to: 'south-first-section_yunma-saddle-camp',
      minutes: 20
    },
    // 雲馬鞍營地 <-> 馬西巴秀山
    {
      from: 'south-first-section_yunma-saddle-camp',
      to: 'mountain_maxibaxiu-mountain',
      minutes: 70
    },
    {
      from: 'mountain_maxibaxiu-mountain',
      to: 'south-first-section_yunma-saddle-camp',
      minutes: 60
    },
    // 馬西巴秀山 <-> 馬西巴秀石洞營地
    {
      from: 'mountain_maxibaxiu-mountain',
      to: 'south-first-section_maxibaxiu-rock-cave-camp',
      minutes: 35
    },
    {
      from: 'south-first-section_maxibaxiu-rock-cave-camp',
      to: 'mountain_maxibaxiu-mountain',
      minutes: 40
    },
    // 馬西巴秀石洞營地 <-> 3237公尺峰
    {
      from: 'south-first-section_maxibaxiu-rock-cave-camp',
      to: 'mountain_3237-peak',
      minutes: 330
    },
    {
      from: 'mountain_3237-peak',
      to: 'south-first-section_maxibaxiu-rock-cave-camp',
      minutes: 300
    },
    // 3237公尺峰 <-> 三叉峰下營地
    {
      from: 'mountain_3237-peak',
      to: 'south-first-section_sancha-peak-camp',
      minutes: 65
    },
    {
      from: 'south-first-section_sancha-peak-camp',
      to: 'mountain_3237-peak',
      minutes: 60
    },
    // 三叉峰下營地 <-> 三岔路口
    {
      from: 'south-first-section_sancha-peak-camp',
      to: 'south-first-section_beinan-fork',
      minutes: 10
    },
    {
      from: 'south-first-section_beinan-fork',
      to: 'south-first-section_sancha-peak-camp',
      minutes: 5
    },
    // 三岔路口 <-> 卑南主山
    {
      from: 'south-first-section_beinan-fork',
      to: 'mountain_beinan-mountain',
      minutes: 30
    },
    {
      from: 'mountain_beinan-mountain',
      to: 'south-first-section_beinan-fork',
      minutes: 25
    },
    // 卑南主山 <-> 人間天堂
    {
      from: 'mountain_beinan-mountain',
      to: 'south-first-section_heaven-on-earth',
      minutes: 50
    },
    {
      from: 'south-first-section_heaven-on-earth',
      to: 'mountain_beinan-mountain',
      minutes: 70
    },
    // 三岔路口 <-> 新舊路岔路
    {
      from: 'south-first-section_beinan-fork',
      to: 'south-first-section_xinjiu-road-fork',
      minutes: 145
    },
    {
      from: 'south-first-section_xinjiu-road-fork',
      to: 'south-first-section_beinan-fork',
      minutes: 190
    },
    // 新舊路岔路 <-> 林道鞍部
    {
      from: 'south-first-section_xinjiu-road-fork',
      to: 'south-first-section_forest-road-saddle',
      minutes: 130
    },
    {
      from: 'south-first-section_forest-road-saddle',
      to: 'south-first-section_xinjiu-road-fork',
      minutes: 180
    },
    // 林道鞍部 <-> 石瀑區
    {
      from: 'south-first-section_forest-road-saddle',
      to: 'south-first-section_shipu-area',
      minutes: 100
    },
    {
      from: 'south-first-section_shipu-area',
      to: 'south-first-section_forest-road-saddle',
      minutes: 70
    },
    // 石瀑區 <-> 石山岔路口
    {
      from: 'south-first-section_shipu-area',
      to: 'south-first-section_shishan-fork',
      minutes: 40
    },
    {
      from: 'south-first-section_shishan-fork',
      to: 'south-first-section_shipu-area',
      minutes: 30
    },
    // 石山岔路口 <-> 石山
    {
      from: 'south-first-section_shishan-fork',
      to: 'mountain_shishan-mountain',
      minutes: 2
    },
    {
      from: 'mountain_shishan-mountain',
      to: 'south-first-section_shishan-fork',
      minutes: 2
    },
    // 石山岔路口 <-> 石山西鞍
    {
      from: 'south-first-section_shishan-fork',
      to: 'south-first-section_shishanxi-saddle',
      minutes: 75
    },
    {
      from: 'south-first-section_shishanxi-saddle',
      to: 'south-first-section_shishan-fork',
      minutes: 110
    },
    // 石山西鞍 <-> 溪南山登山口
    {
      from: 'south-first-section_shishanxi-saddle',
      to: 'south-first-section_xinan-mountain-trailhead',
      minutes: 15
    },
    {
      from: 'south-first-section_xinan-mountain-trailhead',
      to: 'south-first-section_shishanxi-saddle',
      minutes: 15
    },
    // 溪南山登山口 <-> 石山秀湖
    {
      from: 'south-first-section_xinan-mountain-trailhead',
      to: 'south-first-section_shishanxiu-lake',
      minutes: 40
    },
    {
      from: 'south-first-section_shishanxiu-lake',
      to: 'south-first-section_xinan-mountain-trailhead',
      minutes: 60
    },
    // 溪南山登山口 <-> 溪南山
    {
      from: 'south-first-section_xinan-mountain-trailhead',
      to: 'mountain_xinan-mountain',
      minutes: 60
    },
    {
      from: 'mountain_xinan-mountain',
      to: 'south-first-section_xinan-mountain-trailhead',
      minutes: 50
    },
    // 溪南山 <-> 貨櫃屋
    {
      from: 'mountain_xinan-mountain',
      to: 'south-first-section_container-house',
      minutes: 50
    },
    {
      from: 'south-first-section_container-house',
      to: 'mountain_xinan-mountain',
      minutes: 60
    },
    // 貨櫃屋 <-> 石山林道登山口/特生中心
    {
      from: 'south-first-section_container-house',
      to: 'south-first-section_shishan-forest-road-trailhead',
      minutes: 100
    },
    {
      from: 'south-first-section_shishan-forest-road-trailhead',
      to: 'south-first-section_container-house',
      minutes: 200
    },
    // 石山林道登山口/特生中心 <-> 出雲山檢查哨
    {
      from: 'south-first-section_shishan-forest-road-trailhead',
      to: 'south-first-section_chuyun-mountain-station',
      minutes: 110
    },
    {
      from: 'south-first-section_chuyun-mountain-station',
      to: 'south-first-section_shishan-forest-road-trailhead',
      minutes: 115
    },
    // 出雲山檢查哨 <-> 18K行車終點
    {
      from: 'south-first-section_chuyun-mountain-station',
      to: 'south-first-section_18k-road-end',
      minutes: 50
    },
    {
      from: 'south-first-section_18k-road-end',
      to: 'south-first-section_chuyun-mountain-station',
      minutes: 70
    },
    // 塔關山登山口 <-> 塔關山
    {
      from: 'south-first-section_taguan-mountain-trailhead',
      to: 'mountain_taguan-mountain',
      minutes: 110
    },
    {
      from: 'mountain_taguan-mountain',
      to: 'south-first-section_taguan-mountain-trailhead',
      minutes: 85
    },
    // 埡口山莊 <-> 關山嶺山
    {
      from: 'global_pass-hut',
      to: 'mountain_guanshanling-mountain',
      minutes: 105,
      note: '圖上箭頭止於南橫公路，接埡口山莊為推定'
    },
    {
      from: 'mountain_guanshanling-mountain',
      to: 'global_pass-hut',
      minutes: 80,
      note: '圖上箭頭止於南橫公路，接埡口山莊為推定'
    },
    // 中之關步道口 <-> 中之關
    {
      from: 'south-first-section_zhongzhiguan-trailhead',
      to: 'south-first-section_zhongzhiguan',
      minutes: 20
    },
    {
      from: 'south-first-section_zhongzhiguan',
      to: 'south-first-section_zhongzhiguan-trailhead',
      minutes: 10
    },
    // 中之關 <-> 古道口
    {
      from: 'south-first-section_zhongzhiguan',
      to: 'south-first-section_historic-trail-trailhead',
      minutes: 90
    },
    {
      from: 'south-first-section_historic-trail-trailhead',
      to: 'south-first-section_zhongzhiguan',
      minutes: 70
    },
    // 古道口 <-> 天池
    {
      from: 'south-first-section_historic-trail-trailhead',
      to: 'south-first-section_tianchi-pond',
      minutes: 25
    },
    {
      from: 'south-first-section_tianchi-pond',
      to: 'south-first-section_historic-trail-trailhead',
      minutes: 30
    }
  ]
}
