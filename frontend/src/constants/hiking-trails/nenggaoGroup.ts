import { type Trail } from '@/model/hikingTrail'

export const nenggaoGroup: Trail = {
  id: 'nenggao-group',
  name: '能高安東軍',
  nameEn: 'Nenggao-Andongjun Trail',
  i18nKey: 'nenggao-group.nenggao-group',
  nodes: [
    // --- 西段：屯原至能高山 ---
    {
      id: 'nenggao-group_tunyuan-trailhead',
      name: '屯原登山口',
      i18nKey: 'nenggao-group.tunyuan-trailhead',
      nodeType: 'fork'
    },
    {
      id: 'nenggao-group_yunhai-tai-power-hut',
      name: '雲海保線所',
      i18nKey: 'nenggao-group.yunhai-tai-power-hut',
      nodeType: 'other'
    },
    {
      id: 'nenggao-group_tianchi-hut',
      name: '天池山莊',
      i18nKey: 'nenggao-group.tianchi-hut',
      nodeType: 'hut'
    },
    {
      id: 'nenggao-group_xianjie-pass',
      name: '縣界埡口',
      i18nKey: 'nenggao-group.xianjie-pass',
      nodeType: 'other'
    },
    {
      id: 'mountain_kahor-mountain',
      name: '卡賀爾山',
      i18nKey: 'mountain.kahor-mountain',
      nodeType: 'peak'
    },
    {
      id: 'mountain_nenggao-main-peak',
      name: '能高山主峰',
      i18nKey: 'mountain.nenggao-main-peak',
      nodeType: 'peak'
    },
    // --- 能高山至南峰岔路口 ---
    {
      id: 'nenggao-group_nenggao-hut-ruins',
      name: '能高小屋舊址',
      i18nKey: 'nenggao-group.nenggao-hut-ruins',
      nodeType: 'camp'
    },
    {
      id: 'nenggao-group_taiwan-pond-camp',
      name: '台灣池營地',
      i18nKey: 'nenggao-group.taiwan-pond-camp',
      nodeType: 'camp'
    },
    {
      id: 'nenggao-group_dalu-pond-camp',
      name: '大陸池營地',
      i18nKey: 'nenggao-group.dalu-pond-camp',
      nodeType: 'camp'
    },
    {
      id: 'nenggao-group_vertical-cliff-rope',
      name: '垂直岩壁拉繩',
      i18nKey: 'nenggao-group.vertical-cliff-rope',
      nodeType: 'other'
    },
    {
      id: 'nenggao-group_nenggao-south-peak-bei-ridge',
      name: '能高南峰北嶺',
      i18nKey: 'nenggao-group.nenggao-south-peak-bei-ridge',
      nodeType: 'other'
    },
    {
      id: 'nenggao-group_south-peak-fork',
      name: '南峰岔路口',
      i18nKey: 'nenggao-group.south-peak-fork',
      nodeType: 'fork'
    },
    // --- 支線：能高山南峰 ---
    {
      id: 'mountain_nenggao-south-peak',
      name: '能高山南峰',
      i18nKey: 'mountain.nenggao-south-peak',
      nodeType: 'peak'
    },
    // --- 東段：南峰南鞍至白石池 ---
    {
      id: 'nenggao-group_south-peak-nan-saddle-camp',
      name: '南峰南鞍營地',
      i18nKey: 'nenggao-group.south-peak-nan-saddle-camp',
      nodeType: 'camp'
    },
    {
      id: 'nenggao-group_3039-saddle-camp',
      name: '3039鞍營地',
      i18nKey: 'nenggao-group.3039-saddle-camp',
      nodeType: 'camp'
    },
    {
      id: 'mountain_guangtou-mountain',
      name: '光頭山',
      i18nKey: 'mountain.guangtou-mountain',
      nodeType: 'peak'
    },
    {
      id: 'nenggao-group_baishi-pond',
      name: '白石池',
      i18nKey: 'nenggao-group.baishi-pond',
      nodeType: 'water-source'
    },
    // --- 白石池至三岔路口 ---
    {
      id: 'mountain_baishi-mountain',
      name: '白石山',
      i18nKey: 'mountain.baishi-mountain',
      nodeType: 'peak'
    },
    {
      id: 'nenggao-group_wanli-pond',
      name: '萬里池',
      i18nKey: 'nenggao-group.wanli-pond',
      nodeType: 'water-source'
    },
    {
      id: 'nenggao-group_tunlu-pond',
      name: '屯鹿池',
      i18nKey: 'nenggao-group.tunlu-pond',
      nodeType: 'water-source'
    },
    {
      id: 'nenggao-group_tunlu-pond-fork',
      name: '三岔路口',
      i18nKey: 'nenggao-group.tunlu-pond-fork',
      nodeType: 'fork'
    },
    // --- 支線：安東軍山 ---
    {
      id: 'mountain_andongjun-mountain',
      name: '安東軍山',
      i18nKey: 'mountain.andongjun-mountain',
      nodeType: 'peak'
    },
    // --- 西段：萬大南溪（安東軍山至奧萬大） ---
    {
      id: 'nenggao-group_first-hunting-hut-first-crossing',
      name: '第一獵寮/第一次過溪',
      i18nKey: 'nenggao-group.first-hunting-hut-first-crossing',
      nodeType: 'camp'
    },
    {
      id: 'nenggao-group_giant-red-cypress',
      name: '紅檜巨木',
      i18nKey: 'nenggao-group.giant-red-cypress',
      nodeType: 'other'
    },
    {
      id: 'nenggao-group_second-hunting-hut',
      name: '第二獵寮',
      i18nKey: 'nenggao-group.second-hunting-hut',
      nodeType: 'camp'
    },
    {
      id: 'nenggao-group_dabeng-cliff',
      name: '大崩壁',
      i18nKey: 'nenggao-group.dabeng-cliff',
      nodeType: 'other'
    },
    {
      id: 'nenggao-group_streambed-camp',
      name: '溪床營地',
      i18nKey: 'nenggao-group.streambed-camp',
      nodeType: 'camp'
    },
    {
      id: 'nenggao-group_jinxingzhen-road-fork',
      name: '金杏真路岔路口',
      i18nKey: 'nenggao-group.jinxingzhen-road-fork',
      nodeType: 'fork'
    },
    {
      id: 'nenggao-group_wanda-south-river-confluence',
      name: '萬大南溪合匯點',
      i18nKey: 'nenggao-group.wanda-south-river-confluence',
      nodeType: 'other'
    },
    {
      id: 'nenggao-group_second-tributary-confluence',
      name: '第二支流合匯點',
      i18nKey: 'nenggao-group.second-tributary-confluence',
      nodeType: 'fork'
    },
    {
      id: 'nenggao-group_tin-shed-camp-third-tributary-confluence',
      name: '鐵皮工寮營地/第三支流合匯點',
      i18nKey: 'nenggao-group.tin-shed-camp-third-tributary-confluence',
      nodeType: 'other'
    },
    {
      id: 'nenggao-group_fourth-tributary-confluence',
      name: '第四支流合匯點',
      i18nKey: 'nenggao-group.fourth-tributary-confluence',
      nodeType: 'other'
    },
    // --- 奧萬大端：越嶺點至遊客中心停車場 ---
    {
      id: 'nenggao-group_first-ridge-crossing',
      name: '第一越嶺點',
      i18nKey: 'nenggao-group.first-ridge-crossing',
      nodeType: 'other'
    },
    {
      id: 'nenggao-group_second-ridge-crossing',
      name: '第二越嶺點',
      i18nKey: 'nenggao-group.second-ridge-crossing',
      nodeType: 'other'
    },
    {
      id: 'nenggao-group_third-ridge-crossing-songfeng-ridge',
      name: '第三越嶺點/松風嶺',
      i18nKey: 'nenggao-group.third-ridge-crossing-songfeng-ridge',
      nodeType: 'other'
    },
    {
      id: 'nenggao-group_aowanda-suspension-bridge',
      name: '奧萬大吊橋',
      i18nKey: 'nenggao-group.aowanda-suspension-bridge',
      nodeType: 'other'
    },
    {
      id: 'nenggao-group_aowanda-visitor-center-parking',
      name: '遊客中心停車場',
      i18nKey: 'nenggao-group.aowanda-visitor-center-parking',
      nodeType: 'other'
    }
  ],
  edges: [
    // 屯原登山口 <-> 雲海保線所
    {
      from: 'nenggao-group_tunyuan-trailhead',
      to: 'nenggao-group_yunhai-tai-power-hut',
      minutes: 120
    },
    {
      from: 'nenggao-group_yunhai-tai-power-hut',
      to: 'nenggao-group_tunyuan-trailhead',
      minutes: 100
    },
    // 雲海保線所 <-> 天池山莊
    {
      from: 'nenggao-group_yunhai-tai-power-hut',
      to: 'nenggao-group_tianchi-hut',
      minutes: 210
    },
    {
      from: 'nenggao-group_tianchi-hut',
      to: 'nenggao-group_yunhai-tai-power-hut',
      minutes: 180
    },
    // 天池山莊 <-> 縣界埡口
    {
      from: 'nenggao-group_tianchi-hut',
      to: 'nenggao-group_xianjie-pass',
      minutes: 50
    },
    {
      from: 'nenggao-group_xianjie-pass',
      to: 'nenggao-group_tianchi-hut',
      minutes: 55
    },
    // 縣界埡口 <-> 卡賀爾山
    {
      from: 'nenggao-group_xianjie-pass',
      to: 'mountain_kahor-mountain',
      minutes: 170
    },
    {
      from: 'mountain_kahor-mountain',
      to: 'nenggao-group_xianjie-pass',
      minutes: 140
    },
    // 卡賀爾山 <-> 能高山主峰
    {
      from: 'mountain_kahor-mountain',
      to: 'mountain_nenggao-main-peak',
      minutes: 160
    },
    {
      from: 'mountain_nenggao-main-peak',
      to: 'mountain_kahor-mountain',
      minutes: 140
    },
    // 能高山主峰 <-> 能高小屋舊址
    {
      from: 'mountain_nenggao-main-peak',
      to: 'nenggao-group_nenggao-hut-ruins',
      minutes: 20
    },
    {
      from: 'nenggao-group_nenggao-hut-ruins',
      to: 'mountain_nenggao-main-peak',
      minutes: 30
    },
    // 能高小屋舊址 <-> 台灣池營地
    {
      from: 'nenggao-group_nenggao-hut-ruins',
      to: 'nenggao-group_taiwan-pond-camp',
      minutes: 15
    },
    {
      from: 'nenggao-group_taiwan-pond-camp',
      to: 'nenggao-group_nenggao-hut-ruins',
      minutes: 20
    },
    // 台灣池營地 <-> 大陸池營地
    {
      from: 'nenggao-group_taiwan-pond-camp',
      to: 'nenggao-group_dalu-pond-camp',
      minutes: 30
    },
    {
      from: 'nenggao-group_dalu-pond-camp',
      to: 'nenggao-group_taiwan-pond-camp',
      minutes: 35
    },
    // 大陸池營地 <-> 垂直岩壁拉繩
    {
      from: 'nenggao-group_dalu-pond-camp',
      to: 'nenggao-group_vertical-cliff-rope',
      minutes: 65
    },
    {
      from: 'nenggao-group_vertical-cliff-rope',
      to: 'nenggao-group_dalu-pond-camp',
      minutes: 60
    },
    // 垂直岩壁拉繩 <-> 能高南峰北嶺
    {
      from: 'nenggao-group_vertical-cliff-rope',
      to: 'nenggao-group_nenggao-south-peak-bei-ridge',
      minutes: 100
    },
    {
      from: 'nenggao-group_nenggao-south-peak-bei-ridge',
      to: 'nenggao-group_vertical-cliff-rope',
      minutes: 80
    },
    // 能高南峰北嶺 <-> 南峰岔路口
    {
      from: 'nenggao-group_nenggao-south-peak-bei-ridge',
      to: 'nenggao-group_south-peak-fork',
      minutes: 85
    },
    {
      from: 'nenggao-group_south-peak-fork',
      to: 'nenggao-group_nenggao-south-peak-bei-ridge',
      minutes: 60
    },
    // 南峰岔路口 <-> 能高山南峰
    {
      from: 'nenggao-group_south-peak-fork',
      to: 'mountain_nenggao-south-peak',
      minutes: 5
    },
    {
      from: 'mountain_nenggao-south-peak',
      to: 'nenggao-group_south-peak-fork',
      minutes: 3
    },
    // 南峰岔路口 <-> 南峰南鞍營地
    {
      from: 'nenggao-group_south-peak-fork',
      to: 'nenggao-group_south-peak-nan-saddle-camp',
      minutes: 70
    },
    {
      from: 'nenggao-group_south-peak-nan-saddle-camp',
      to: 'nenggao-group_south-peak-fork',
      minutes: 120
    },
    // 南峰南鞍營地 <-> 3039鞍營地
    {
      from: 'nenggao-group_south-peak-nan-saddle-camp',
      to: 'nenggao-group_3039-saddle-camp',
      minutes: 90
    },
    {
      from: 'nenggao-group_3039-saddle-camp',
      to: 'nenggao-group_south-peak-nan-saddle-camp',
      minutes: 80
    },
    // 3039鞍營地 <-> 光頭山
    {
      from: 'nenggao-group_3039-saddle-camp',
      to: 'mountain_guangtou-mountain',
      minutes: 60
    },
    {
      from: 'mountain_guangtou-mountain',
      to: 'nenggao-group_3039-saddle-camp',
      minutes: 60
    },
    // 光頭山 <-> 白石池
    {
      from: 'mountain_guangtou-mountain',
      to: 'nenggao-group_baishi-pond',
      minutes: 100
    },
    {
      from: 'nenggao-group_baishi-pond',
      to: 'mountain_guangtou-mountain',
      minutes: 140
    },
    // 白石池 <-> 白石山
    {
      from: 'nenggao-group_baishi-pond',
      to: 'mountain_baishi-mountain',
      minutes: 130
    },
    {
      from: 'mountain_baishi-mountain',
      to: 'nenggao-group_baishi-pond',
      minutes: 100
    },
    // 白石山 <-> 萬里池
    {
      from: 'mountain_baishi-mountain',
      to: 'nenggao-group_wanli-pond',
      minutes: 60
    },
    {
      from: 'nenggao-group_wanli-pond',
      to: 'mountain_baishi-mountain',
      minutes: 90
    },
    // 萬里池 <-> 屯鹿池
    {
      from: 'nenggao-group_wanli-pond',
      to: 'nenggao-group_tunlu-pond',
      minutes: 120
    },
    {
      from: 'nenggao-group_tunlu-pond',
      to: 'nenggao-group_wanli-pond',
      minutes: 110
    },
    // 屯鹿池 <-> 三岔路口
    {
      from: 'nenggao-group_tunlu-pond',
      to: 'nenggao-group_tunlu-pond-fork',
      minutes: 45
    },
    {
      from: 'nenggao-group_tunlu-pond-fork',
      to: 'nenggao-group_tunlu-pond',
      minutes: 45
    },
    // 三岔路口 <-> 安東軍山
    {
      from: 'nenggao-group_tunlu-pond-fork',
      to: 'mountain_andongjun-mountain',
      minutes: 50
    },
    {
      from: 'mountain_andongjun-mountain',
      to: 'nenggao-group_tunlu-pond-fork',
      minutes: 35
    },
    // 三岔路口 <-> 第一獵寮/第一次過溪
    {
      from: 'nenggao-group_tunlu-pond-fork',
      to: 'nenggao-group_first-hunting-hut-first-crossing',
      minutes: 80
    },
    {
      from: 'nenggao-group_first-hunting-hut-first-crossing',
      to: 'nenggao-group_tunlu-pond-fork',
      minutes: 150
    },
    // 第一獵寮/第一次過溪 <-> 紅檜巨木
    {
      from: 'nenggao-group_first-hunting-hut-first-crossing',
      to: 'nenggao-group_giant-red-cypress',
      minutes: 50
    },
    {
      from: 'nenggao-group_giant-red-cypress',
      to: 'nenggao-group_first-hunting-hut-first-crossing',
      minutes: 90
    },
    // 紅檜巨木 <-> 第二獵寮
    {
      from: 'nenggao-group_giant-red-cypress',
      to: 'nenggao-group_second-hunting-hut',
      minutes: 70
    },
    {
      from: 'nenggao-group_second-hunting-hut',
      to: 'nenggao-group_giant-red-cypress',
      minutes: 110
    },
    // 第二獵寮 <-> 大崩壁
    {
      from: 'nenggao-group_second-hunting-hut',
      to: 'nenggao-group_dabeng-cliff',
      minutes: 50
    },
    {
      from: 'nenggao-group_dabeng-cliff',
      to: 'nenggao-group_second-hunting-hut',
      minutes: 80
    },
    // 大崩壁 <-> 溪床營地
    {
      from: 'nenggao-group_dabeng-cliff',
      to: 'nenggao-group_streambed-camp',
      minutes: 60
    },
    {
      from: 'nenggao-group_streambed-camp',
      to: 'nenggao-group_dabeng-cliff',
      minutes: 110
    },
    // 溪床營地 <-> 金杏真路岔路口
    {
      from: 'nenggao-group_streambed-camp',
      to: 'nenggao-group_jinxingzhen-road-fork',
      minutes: 10
    },
    {
      from: 'nenggao-group_jinxingzhen-road-fork',
      to: 'nenggao-group_streambed-camp',
      minutes: 15
    },
    // 金杏真路岔路口 <-> 萬大南溪合匯點
    {
      from: 'nenggao-group_jinxingzhen-road-fork',
      to: 'nenggao-group_wanda-south-river-confluence',
      minutes: 25
    },
    {
      from: 'nenggao-group_wanda-south-river-confluence',
      to: 'nenggao-group_jinxingzhen-road-fork',
      minutes: 35
    },
    // 萬大南溪合匯點 <-> 第二支流合匯點
    {
      from: 'nenggao-group_wanda-south-river-confluence',
      to: 'nenggao-group_second-tributary-confluence',
      minutes: 35
    },
    {
      from: 'nenggao-group_second-tributary-confluence',
      to: 'nenggao-group_wanda-south-river-confluence',
      minutes: 40
    },
    // 第二支流合匯點 <-> 金杏真路岔路口
    {
      from: 'nenggao-group_second-tributary-confluence',
      to: 'nenggao-group_jinxingzhen-road-fork',
      minutes: 120,
      note: '溪水暴漲時替代路徑'
    },
    {
      from: 'nenggao-group_jinxingzhen-road-fork',
      to: 'nenggao-group_second-tributary-confluence',
      minutes: 100,
      note: '溪水暴漲時替代路徑'
    },
    // 第二支流合匯點 <-> 鐵皮工寮營地/第三支流合匯點
    {
      from: 'nenggao-group_second-tributary-confluence',
      to: 'nenggao-group_tin-shed-camp-third-tributary-confluence',
      minutes: 35
    },
    {
      from: 'nenggao-group_tin-shed-camp-third-tributary-confluence',
      to: 'nenggao-group_second-tributary-confluence',
      minutes: 35
    },
    // 鐵皮工寮營地/第三支流合匯點 <-> 第四支流合匯點
    {
      from: 'nenggao-group_tin-shed-camp-third-tributary-confluence',
      to: 'nenggao-group_fourth-tributary-confluence',
      minutes: 45
    },
    {
      from: 'nenggao-group_fourth-tributary-confluence',
      to: 'nenggao-group_tin-shed-camp-third-tributary-confluence',
      minutes: 55
    },
    // 第四支流合匯點 <-> 第一越嶺點
    {
      from: 'nenggao-group_fourth-tributary-confluence',
      to: 'nenggao-group_first-ridge-crossing',
      minutes: 50
    },
    {
      from: 'nenggao-group_first-ridge-crossing',
      to: 'nenggao-group_fourth-tributary-confluence',
      minutes: 40
    },
    // 第一越嶺點 <-> 第二越嶺點
    {
      from: 'nenggao-group_first-ridge-crossing',
      to: 'nenggao-group_second-ridge-crossing',
      minutes: 50
    },
    {
      from: 'nenggao-group_second-ridge-crossing',
      to: 'nenggao-group_first-ridge-crossing',
      minutes: 60
    },
    // 第二越嶺點 <-> 第三越嶺點/松風嶺
    {
      from: 'nenggao-group_second-ridge-crossing',
      to: 'nenggao-group_third-ridge-crossing-songfeng-ridge',
      minutes: 40
    },
    {
      from: 'nenggao-group_third-ridge-crossing-songfeng-ridge',
      to: 'nenggao-group_second-ridge-crossing',
      minutes: 55
    },
    // 第三越嶺點/松風嶺 <-> 奧萬大吊橋
    {
      from: 'nenggao-group_third-ridge-crossing-songfeng-ridge',
      to: 'nenggao-group_aowanda-suspension-bridge',
      minutes: 35
    },
    {
      from: 'nenggao-group_aowanda-suspension-bridge',
      to: 'nenggao-group_third-ridge-crossing-songfeng-ridge',
      minutes: 55
    },
    // 奧萬大吊橋 <-> 遊客中心停車場
    {
      from: 'nenggao-group_aowanda-suspension-bridge',
      to: 'nenggao-group_aowanda-visitor-center-parking',
      minutes: 70
    },
    {
      from: 'nenggao-group_aowanda-visitor-center-parking',
      to: 'nenggao-group_aowanda-suspension-bridge',
      minutes: 80
    }
  ]
}
