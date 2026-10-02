import { type Trail } from '@/model/hikingTrail'

export const zhonghengFourSpicy: Trail = {
  id: 'zhongheng-4-spicy',
  name: '中橫四辣',
  nameEn: 'Central Cross-Island Four Peaks',
  i18nKey: 'zhongheng-4-spicy.zhongheng-4-spicy',
  nodes: [
    // --- 白姑大山 ---
    {
      id: 'mountain_baigu-mountain',
      name: '白姑大山',
      i18nKey: 'mountain.baigu-mountain',
      nodeType: 'peak'
    },
    {
      id: 'zhongheng-4-spicy_caoqing-pond',
      name: '草青池',
      i18nKey: 'zhongheng-4-spicy.caoqing-pond',
      nodeType: 'water-source'
    },
    {
      id: 'zhongheng-4-spicy_yixiantian-rock-wall',
      name: '一線天岩壁',
      i18nKey: 'zhongheng-4-spicy.yixiantian-rock-wall',
      nodeType: 'other'
    },
    {
      id: 'zhongheng-4-spicy_jita-camp',
      name: '吉他營地',
      i18nKey: 'zhongheng-4-spicy.jita-camp',
      nodeType: 'camp'
    },
    {
      id: 'mountain_baigu-southeast-peak',
      name: '白姑大山東南峰',
      i18nKey: 'mountain.baigu-southeast-peak',
      nodeType: 'peak'
    },
    {
      id: 'zhongheng-4-spicy_siyan-pond-camp',
      name: '司晏池營地',
      i18nKey: 'zhongheng-4-spicy.siyan-pond-camp',
      nodeType: 'camp'
    },
    {
      id: 'mountain_sanzhui-mountain',
      name: '三錐山',
      i18nKey: 'mountain.sanzhui-mountain',
      nodeType: 'peak'
    },
    {
      id: 'zhongheng-4-spicy_shuiguanlu-fork',
      name: '水管路岔路口',
      i18nKey: 'zhongheng-4-spicy.shuiguanlu-fork',
      nodeType: 'fork'
    },
    {
      id: 'zhongheng-4-spicy_baigu-trailhead',
      name: '白姑大山登山口',
      i18nKey: 'zhongheng-4-spicy.baigu-trailhead',
      nodeType: 'fork'
    },
    {
      id: 'zhongheng-4-spicy_baigu-parking',
      name: '停車場',
      i18nKey: 'zhongheng-4-spicy.baigu-parking',
      nodeType: 'other'
    },
    // --- 畢祿羊頭連峰 ---
    {
      id: 'mountain_bilu-mountain',
      name: '畢祿山',
      i18nKey: 'mountain.bilu-mountain',
      nodeType: 'peak'
    },
    {
      id: 'zhongheng-4-spicy_main-ridge-fork',
      name: '主稜三岔路口',
      i18nKey: 'zhongheng-4-spicy.main-ridge-fork',
      nodeType: 'fork'
    },
    {
      id: 'zhongheng-4-spicy_lasheng-rock-wall',
      name: '拉繩垂直岩壁',
      i18nKey: 'zhongheng-4-spicy.lasheng-rock-wall',
      nodeType: 'other'
    },
    {
      id: 'zhongheng-4-spicy_8-4k-trailhead-camp',
      name: '8.4k登山口營地',
      i18nKey: 'zhongheng-4-spicy.8-4k-trailhead-camp',
      nodeType: 'camp'
    },
    {
      id: 'mountain_diyi-peak',
      name: '第一峰',
      i18nKey: 'mountain.diyi-peak',
      nodeType: 'peak'
    },
    {
      id: 'mountain_ju-mountain',
      name: '鋸山',
      i18nKey: 'mountain.ju-mountain',
      nodeType: 'peak'
    },
    {
      id: 'zhongheng-4-spicy_east-peak-front-camp',
      name: '東峰前營地',
      i18nKey: 'zhongheng-4-spicy.east-peak-front-camp',
      nodeType: 'camp'
    },
    {
      id: 'mountain_ju-east-peak',
      name: '鋸山東峰',
      i18nKey: 'mountain.ju-east-peak',
      nodeType: 'peak'
    },
    {
      id: 'zhongheng-4-spicy_yangtou-mountain-fork',
      name: '三岔路口',
      i18nKey: 'zhongheng-4-spicy.yangtou-mountain-fork',
      nodeType: 'fork'
    },
    {
      id: 'mountain_yangtou-mountain',
      name: '羊頭山',
      i18nKey: 'mountain.yangtou-mountain',
      nodeType: 'peak'
    },
    {
      id: 'zhongheng-4-spicy_yangtou-mountain-trailhead',
      name: '羊頭山登山口',
      i18nKey: 'zhongheng-4-spicy.yangtou-mountain-trailhead',
      nodeType: 'fork'
    },
    // --- 屏風山 ---
    {
      id: 'zhongheng-4-spicy_pingfeng-hut-songzhen-camp',
      name: '屏風山屋/松針營地',
      i18nKey: 'zhongheng-4-spicy.pingfeng-hut-songzhen-camp',
      nodeType: 'camp'
    },
    {
      id: 'zhongheng-4-spicy_tiexian-suspension-bridge',
      name: '鐵線吊橋',
      i18nKey: 'zhongheng-4-spicy.tiexian-suspension-bridge',
      nodeType: 'other'
    },
    {
      id: 'zhongheng-4-spicy_first-crossing',
      name: '第一次過溪',
      i18nKey: 'zhongheng-4-spicy.first-crossing',
      nodeType: 'other'
    },
    {
      id: 'zhongheng-4-spicy_pingfeng-mountain-new-trailhead',
      name: '屏風山新登山口',
      i18nKey: 'zhongheng-4-spicy.pingfeng-mountain-new-trailhead',
      nodeType: 'fork'
    },
    {
      id: 'zhongheng-4-spicy_tacijili-river',
      name: '塔次基里溪',
      i18nKey: 'zhongheng-4-spicy.tacijili-river',
      nodeType: 'water-source'
    },
    {
      id: 'zhongheng-4-spicy_caopo-pavilion',
      name: '草坡展望台',
      i18nKey: 'zhongheng-4-spicy.caopo-pavilion',
      nodeType: 'other'
    },
    {
      id: 'zhongheng-4-spicy_bare-rock-area',
      name: '裸岩區',
      i18nKey: 'zhongheng-4-spicy.bare-rock-area',
      nodeType: 'other'
    },
    {
      id: 'mountain_pingfeng-mountain',
      name: '屏風山',
      i18nKey: 'mountain.pingfeng-mountain',
      nodeType: 'peak'
    },
    {
      id: 'zhongheng-4-spicy_hehuan-gold-mine-camp',
      name: '合歡金礦營地',
      i18nKey: 'zhongheng-4-spicy.hehuan-gold-mine-camp',
      nodeType: 'camp'
    },
    {
      id: 'zhongheng-4-spicy_fourth-water-source',
      name: '第四水源',
      i18nKey: 'zhongheng-4-spicy.fourth-water-source',
      nodeType: 'water-source'
    },
    {
      id: 'zhongheng-4-spicy_3241-ridge',
      name: '3241稜線',
      i18nKey: 'zhongheng-4-spicy.3241-ridge',
      nodeType: 'other'
    }
  ],
  edges: [
    // 白姑大山 <-> 草青池
    {
      from: 'mountain_baigu-mountain',
      to: 'zhongheng-4-spicy_caoqing-pond',
      minutes: 45
    },
    {
      from: 'zhongheng-4-spicy_caoqing-pond',
      to: 'mountain_baigu-mountain',
      minutes: 55
    },
    // 草青池 <-> 一線天岩壁
    {
      from: 'zhongheng-4-spicy_caoqing-pond',
      to: 'zhongheng-4-spicy_yixiantian-rock-wall',
      minutes: 65
    },
    {
      from: 'zhongheng-4-spicy_yixiantian-rock-wall',
      to: 'zhongheng-4-spicy_caoqing-pond',
      minutes: 75
    },
    // 一線天岩壁 <-> 吉他營地
    {
      from: 'zhongheng-4-spicy_yixiantian-rock-wall',
      to: 'zhongheng-4-spicy_jita-camp',
      minutes: 70
    },
    {
      from: 'zhongheng-4-spicy_jita-camp',
      to: 'zhongheng-4-spicy_yixiantian-rock-wall',
      minutes: 85
    },
    // 吉他營地 <-> 白姑大山東南峰
    {
      from: 'zhongheng-4-spicy_jita-camp',
      to: 'mountain_baigu-southeast-peak',
      minutes: 80
    },
    {
      from: 'mountain_baigu-southeast-peak',
      to: 'zhongheng-4-spicy_jita-camp',
      minutes: 60
    },
    // 白姑大山東南峰 <-> 司晏池營地
    {
      from: 'mountain_baigu-southeast-peak',
      to: 'zhongheng-4-spicy_siyan-pond-camp',
      minutes: 50
    },
    {
      from: 'zhongheng-4-spicy_siyan-pond-camp',
      to: 'mountain_baigu-southeast-peak',
      minutes: 60
    },
    // 司晏池營地 <-> 三錐山
    {
      from: 'zhongheng-4-spicy_siyan-pond-camp',
      to: 'mountain_sanzhui-mountain',
      minutes: 110
    },
    {
      from: 'mountain_sanzhui-mountain',
      to: 'zhongheng-4-spicy_siyan-pond-camp',
      minutes: 130
    },
    // 三錐山 <-> 水管路岔路口
    {
      from: 'mountain_sanzhui-mountain',
      to: 'zhongheng-4-spicy_shuiguanlu-fork',
      minutes: 110
    },
    {
      from: 'zhongheng-4-spicy_shuiguanlu-fork',
      to: 'mountain_sanzhui-mountain',
      minutes: 160
    },
    // 水管路岔路口 <-> 白姑大山登山口
    {
      from: 'zhongheng-4-spicy_shuiguanlu-fork',
      to: 'zhongheng-4-spicy_baigu-trailhead',
      minutes: 25
    },
    {
      from: 'zhongheng-4-spicy_baigu-trailhead',
      to: 'zhongheng-4-spicy_shuiguanlu-fork',
      minutes: 25
    },
    // 白姑大山登山口 <-> 停車場
    {
      from: 'zhongheng-4-spicy_baigu-trailhead',
      to: 'zhongheng-4-spicy_baigu-parking',
      minutes: 5
    },
    {
      from: 'zhongheng-4-spicy_baigu-parking',
      to: 'zhongheng-4-spicy_baigu-trailhead',
      minutes: 10
    },
    // --- 畢祿羊頭連峰 ---
    // 畢祿山 <-> 主稜三岔路口
    {
      from: 'mountain_bilu-mountain',
      to: 'zhongheng-4-spicy_main-ridge-fork',
      minutes: 5
    },
    {
      from: 'zhongheng-4-spicy_main-ridge-fork',
      to: 'mountain_bilu-mountain',
      minutes: 5
    },
    // 主稜三岔路口 <-> 拉繩垂直岩壁
    {
      from: 'zhongheng-4-spicy_main-ridge-fork',
      to: 'zhongheng-4-spicy_lasheng-rock-wall',
      minutes: 60
    },
    {
      from: 'zhongheng-4-spicy_lasheng-rock-wall',
      to: 'zhongheng-4-spicy_main-ridge-fork',
      minutes: 90
    },
    // 拉繩垂直岩壁 <-> 8.4k登山口營地
    {
      from: 'zhongheng-4-spicy_lasheng-rock-wall',
      to: 'zhongheng-4-spicy_8-4k-trailhead-camp',
      minutes: 80
    },
    {
      from: 'zhongheng-4-spicy_8-4k-trailhead-camp',
      to: 'zhongheng-4-spicy_lasheng-rock-wall',
      minutes: 110
    },
    // 主稜三岔路口 <-> 第一峰
    {
      from: 'zhongheng-4-spicy_main-ridge-fork',
      to: 'mountain_diyi-peak',
      minutes: 30
    },
    {
      from: 'mountain_diyi-peak',
      to: 'zhongheng-4-spicy_main-ridge-fork',
      minutes: 30
    },
    // 第一峰 <-> 鋸山
    {
      from: 'mountain_diyi-peak',
      to: 'mountain_ju-mountain',
      minutes: 105
    },
    {
      from: 'mountain_ju-mountain',
      to: 'mountain_diyi-peak',
      minutes: 120
    },
    // 鋸山 <-> 東峰前營地
    {
      from: 'mountain_ju-mountain',
      to: 'zhongheng-4-spicy_east-peak-front-camp',
      minutes: 110
    },
    {
      from: 'zhongheng-4-spicy_east-peak-front-camp',
      to: 'mountain_ju-mountain',
      minutes: 180
    },
    // 東峰前營地 <-> 鋸山東峰
    {
      from: 'zhongheng-4-spicy_east-peak-front-camp',
      to: 'mountain_ju-east-peak',
      minutes: 50
    },
    {
      from: 'mountain_ju-east-peak',
      to: 'zhongheng-4-spicy_east-peak-front-camp',
      minutes: 40
    },
    // 鋸山東峰 <-> 三岔路口
    {
      from: 'mountain_ju-east-peak',
      to: 'zhongheng-4-spicy_yangtou-mountain-fork',
      minutes: 25
    },
    {
      from: 'zhongheng-4-spicy_yangtou-mountain-fork',
      to: 'mountain_ju-east-peak',
      minutes: 30
    },
    // 三岔路口 <-> 羊頭山
    {
      from: 'zhongheng-4-spicy_yangtou-mountain-fork',
      to: 'mountain_yangtou-mountain',
      minutes: 50
    },
    {
      from: 'mountain_yangtou-mountain',
      to: 'zhongheng-4-spicy_yangtou-mountain-fork',
      minutes: 45
    },
    // 三岔路口 <-> 羊頭山登山口
    {
      from: 'zhongheng-4-spicy_yangtou-mountain-fork',
      to: 'zhongheng-4-spicy_yangtou-mountain-trailhead',
      minutes: 180
    },
    {
      from: 'zhongheng-4-spicy_yangtou-mountain-trailhead',
      to: 'zhongheng-4-spicy_yangtou-mountain-fork',
      minutes: 350
    },
    // --- 屏風山 ---
    // 屏風山屋/松針營地 <-> 鐵線吊橋
    {
      from: 'zhongheng-4-spicy_pingfeng-hut-songzhen-camp',
      to: 'zhongheng-4-spicy_tiexian-suspension-bridge',
      minutes: 35
    },
    {
      from: 'zhongheng-4-spicy_tiexian-suspension-bridge',
      to: 'zhongheng-4-spicy_pingfeng-hut-songzhen-camp',
      minutes: 40
    },
    // 鐵線吊橋 <-> 第一次過溪
    {
      from: 'zhongheng-4-spicy_tiexian-suspension-bridge',
      to: 'zhongheng-4-spicy_first-crossing',
      minutes: 45
    },
    {
      from: 'zhongheng-4-spicy_first-crossing',
      to: 'zhongheng-4-spicy_tiexian-suspension-bridge',
      minutes: 40
    },
    // 第一次過溪 <-> 屏風山新登山口
    {
      from: 'zhongheng-4-spicy_first-crossing',
      to: 'zhongheng-4-spicy_pingfeng-mountain-new-trailhead',
      minutes: 130
    },
    {
      from: 'zhongheng-4-spicy_pingfeng-mountain-new-trailhead',
      to: 'zhongheng-4-spicy_first-crossing',
      minutes: 80
    },
    // 屏風山屋/松針營地 <-> 塔次基里溪
    {
      from: 'zhongheng-4-spicy_pingfeng-hut-songzhen-camp',
      to: 'zhongheng-4-spicy_tacijili-river',
      minutes: 8
    },
    {
      from: 'zhongheng-4-spicy_tacijili-river',
      to: 'zhongheng-4-spicy_pingfeng-hut-songzhen-camp',
      minutes: 8
    },
    // 塔次基里溪 <-> 草坡展望台
    {
      from: 'zhongheng-4-spicy_tacijili-river',
      to: 'zhongheng-4-spicy_caopo-pavilion',
      minutes: 170
    },
    {
      from: 'zhongheng-4-spicy_caopo-pavilion',
      to: 'zhongheng-4-spicy_tacijili-river',
      minutes: 120
    },
    // 草坡展望台 <-> 裸岩區
    {
      from: 'zhongheng-4-spicy_caopo-pavilion',
      to: 'zhongheng-4-spicy_bare-rock-area',
      minutes: 70
    },
    {
      from: 'zhongheng-4-spicy_bare-rock-area',
      to: 'zhongheng-4-spicy_caopo-pavilion',
      minutes: 50
    },
    // 裸岩區 <-> 屏風山
    {
      from: 'zhongheng-4-spicy_bare-rock-area',
      to: 'mountain_pingfeng-mountain',
      minutes: 60
    },
    {
      from: 'mountain_pingfeng-mountain',
      to: 'zhongheng-4-spicy_bare-rock-area',
      minutes: 40
    },
    // 3241稜線 <-> 屏風山
    {
      from: 'zhongheng-4-spicy_3241-ridge',
      to: 'mountain_pingfeng-mountain',
      minutes: 30
    },
    {
      from: 'mountain_pingfeng-mountain',
      to: 'zhongheng-4-spicy_3241-ridge',
      minutes: 25
    },
    // 屏風山屋/松針營地 <-> 合歡金礦營地
    {
      from: 'zhongheng-4-spicy_pingfeng-hut-songzhen-camp',
      to: 'zhongheng-4-spicy_hehuan-gold-mine-camp',
      minutes: 90
    },
    {
      from: 'zhongheng-4-spicy_hehuan-gold-mine-camp',
      to: 'zhongheng-4-spicy_pingfeng-hut-songzhen-camp',
      minutes: 65
    },
    // 合歡金礦營地 <-> 第四水源
    {
      from: 'zhongheng-4-spicy_hehuan-gold-mine-camp',
      to: 'zhongheng-4-spicy_fourth-water-source',
      minutes: 50
    },
    {
      from: 'zhongheng-4-spicy_fourth-water-source',
      to: 'zhongheng-4-spicy_hehuan-gold-mine-camp',
      minutes: 45
    },
    // 第四水源 <-> 3241稜線
    {
      from: 'zhongheng-4-spicy_fourth-water-source',
      to: 'zhongheng-4-spicy_3241-ridge',
      minutes: 220
    },
    {
      from: 'zhongheng-4-spicy_3241-ridge',
      to: 'zhongheng-4-spicy_fourth-water-source',
      minutes: 190
    }
  ]
}
