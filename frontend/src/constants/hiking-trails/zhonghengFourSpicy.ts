import { type Trail } from '@/model/hikingTrail'

export const zhonghengFourSpicy: Trail = {
  id: 'zhongheng-4-spicy',
  name: '中橫四辣',
  nameEn: 'Central Cross-Island Four Peaks',
  i18nKey: 'zhongheng-4-spicy.zhongheng-4-spicy',
  nodes: [
    // --- 白姑大山 ---
    {
      id: 'mountain_baigu',
      name: '白姑大山',
      i18nKey: 'mountain.baigu',
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
    }
  ],
  edges: [
    // 白姑大山 <-> 草青池
    {
      from: 'mountain_baigu',
      to: 'zhongheng-4-spicy_caoqing-pond',
      minutes: 45
    },
    {
      from: 'zhongheng-4-spicy_caoqing-pond',
      to: 'mountain_baigu',
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
    }
  ]
}
