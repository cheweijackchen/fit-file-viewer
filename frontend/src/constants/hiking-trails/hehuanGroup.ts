import { type Trail } from '@/model/hikingTrail'

export const hehuanGroup: Trail = {
  id: 'hehuan-group',
  name: '合歡群峰',
  nameEn: 'Hehuan Group',
  i18nKey: 'hehuan-group.hehuan-group',
  nodes: [
    // --- 北段：華岡至北合歡山 ---
    {
      id: 'hehuan-group_roundabout',
      name: '圓環',
      i18nKey: 'hehuan-group.roundabout',
      nodeType: 'other'
    },
    {
      id: 'hehuan-group_huagang-trailhead',
      name: '華岡登山口',
      i18nKey: 'hehuan-group.huagang-trailhead',
      nodeType: 'fork'
    },
    {
      id: 'hehuan-group_huagang-fork',
      name: '華岡岔路口',
      i18nKey: 'hehuan-group.huagang-fork',
      nodeType: 'fork'
    },
    {
      id: 'mountain_west-hehuan-mountain',
      name: '西合歡山',
      i18nKey: 'mountain.west-hehuan-mountain',
      nodeType: 'peak'
    },
    {
      id: 'hehuan-group_shuichi-camp',
      name: '水池營地',
      i18nKey: 'hehuan-group.shuichi-camp',
      nodeType: 'camp'
    },
    {
      id: 'hehuan-group_zuidi-saddle',
      name: '最低較部',
      i18nKey: 'hehuan-group.zuidi-saddle',
      nodeType: 'fork'
    },
    {
      id: 'mountain_north-hehuan-mountain',
      name: '北合歡山',
      i18nKey: 'mountain.north-hehuan-mountain',
      nodeType: 'peak'
    },
    {
      id: 'hehuan-group_reflector',
      name: '反射板',
      i18nKey: 'hehuan-group.reflector',
      nodeType: 'fork'
    },
    {
      id: 'hehuan-group_bichi-pond',
      name: '碧池',
      i18nKey: 'hehuan-group.bichi-pond',
      nodeType: 'water-source'
    },
    {
      id: 'hehuan-group_north-hehuan-mountain-trailhead',
      name: '北合歡山登山口',
      i18nKey: 'hehuan-group.north-hehuan-mountain-trailhead',
      nodeType: 'fork'
    },
    // --- 克難關與石門山 ---
    {
      id: 'hehuan-group_kenanguan-pass',
      name: '克難關',
      i18nKey: 'hehuan-group.kenanguan-pass',
      nodeType: 'other'
    },
    {
      id: 'mountain_shimen-north-peak',
      name: '石門山北峰',
      i18nKey: 'mountain.shimen-north-peak',
      nodeType: 'peak'
    },
    {
      id: 'hehuan-group_jiuhuaxun-center',
      name: '舊滑訓中心',
      i18nKey: 'hehuan-group.jiuhuaxun-center',
      nodeType: 'other'
    },
    {
      id: 'mountain_shimen-mountain',
      name: '石門山',
      i18nKey: 'mountain.shimen-mountain',
      nodeType: 'peak'
    },
    {
      id: 'mountain_hehuanjian-mountain',
      name: '合歡尖山',
      i18nKey: 'mountain.hehuanjian-mountain',
      nodeType: 'peak'
    },
    {
      id: 'hehuan-group_hehuan-hut',
      name: '合歡山莊',
      i18nKey: 'hehuan-group.hehuan-hut',
      nodeType: 'hut'
    },
    // --- 武嶺與合歡山 ---
    {
      id: 'hehuan-group_wuling-ridge',
      name: '武嶺',
      i18nKey: 'hehuan-group.wuling-ridge',
      nodeType: 'other'
    },
    {
      id: 'mountain_hehuan-mountain',
      name: '合歡山',
      i18nKey: 'mountain.hehuan-mountain',
      nodeType: 'peak'
    },
    // --- 奇萊山登山口與合歡山東峰 ---
    {
      id: 'global_qilai-mountain-trailhead-ski-hut',
      name: '奇萊山登山口/滑雪山莊',
      i18nKey: 'global.qilai-mountain-trailhead-ski-hut',
      nodeType: 'fork'
    },
    {
      id: 'mountain_hehuan-east-peak',
      name: '合歡山東峰',
      i18nKey: 'mountain.hehuan-east-peak',
      nodeType: 'peak'
    },
    // --- 無步行連線 ---
  ],
  edges: [
    // 圓環 <-> 華岡登山口
    {
      from: 'hehuan-group_roundabout',
      to: 'hehuan-group_huagang-trailhead',
      minutes: 80
    },
    {
      from: 'hehuan-group_huagang-trailhead',
      to: 'hehuan-group_roundabout',
      minutes: 70
    },
    // 華岡登山口 <-> 華岡岔路口
    {
      from: 'hehuan-group_huagang-trailhead',
      to: 'hehuan-group_huagang-fork',
      minutes: 140
    },
    {
      from: 'hehuan-group_huagang-fork',
      to: 'hehuan-group_huagang-trailhead',
      minutes: 80
    },
    // 華岡岔路口 <-> 西合歡山
    {
      from: 'hehuan-group_huagang-fork',
      to: 'mountain_west-hehuan-mountain',
      minutes: 35
    },
    {
      from: 'mountain_west-hehuan-mountain',
      to: 'hehuan-group_huagang-fork',
      minutes: 45
    },
    // 華岡岔路口 <-> 水池營地
    {
      from: 'hehuan-group_huagang-fork',
      to: 'hehuan-group_shuichi-camp',
      minutes: 30
    },
    {
      from: 'hehuan-group_shuichi-camp',
      to: 'hehuan-group_huagang-fork',
      minutes: 40
    },
    // 水池營地 <-> 最低較部
    {
      from: 'hehuan-group_shuichi-camp',
      to: 'hehuan-group_zuidi-saddle',
      minutes: 20
    },
    {
      from: 'hehuan-group_zuidi-saddle',
      to: 'hehuan-group_shuichi-camp',
      minutes: 30
    },
    // 最低較部 <-> 北合歡山
    {
      from: 'hehuan-group_zuidi-saddle',
      to: 'mountain_north-hehuan-mountain',
      minutes: 110
    },
    {
      from: 'mountain_north-hehuan-mountain',
      to: 'hehuan-group_zuidi-saddle',
      minutes: 75
    },
    // 北合歡山 <-> 反射板
    {
      from: 'mountain_north-hehuan-mountain',
      to: 'hehuan-group_reflector',
      minutes: 15
    },
    {
      from: 'hehuan-group_reflector',
      to: 'mountain_north-hehuan-mountain',
      minutes: 20
    },
    // 反射板 <-> 碧池
    {
      from: 'hehuan-group_reflector',
      to: 'hehuan-group_bichi-pond',
      minutes: 5
    },
    {
      from: 'hehuan-group_bichi-pond',
      to: 'hehuan-group_reflector',
      minutes: 10
    },
    // 反射板 <-> 北合歡山登山口
    {
      from: 'hehuan-group_reflector',
      to: 'hehuan-group_north-hehuan-mountain-trailhead',
      minutes: 45
    },
    {
      from: 'hehuan-group_north-hehuan-mountain-trailhead',
      to: 'hehuan-group_reflector',
      minutes: 70
    },
    // 克難關 <-> 石門山北峰
    {
      from: 'hehuan-group_kenanguan-pass',
      to: 'mountain_shimen-north-peak',
      minutes: 30
    },
    {
      from: 'mountain_shimen-north-peak',
      to: 'hehuan-group_kenanguan-pass',
      minutes: 15
    },
    // 舊滑訓中心 <-> 石門山
    {
      from: 'hehuan-group_jiuhuaxun-center',
      to: 'mountain_shimen-mountain',
      minutes: 30
    },
    {
      from: 'mountain_shimen-mountain',
      to: 'hehuan-group_jiuhuaxun-center',
      minutes: 20
    },
    // 合歡尖山 <-> 舊滑訓中心
    {
      from: 'mountain_hehuanjian-mountain',
      to: 'hehuan-group_jiuhuaxun-center',
      minutes: 15
    },
    {
      from: 'hehuan-group_jiuhuaxun-center',
      to: 'mountain_hehuanjian-mountain',
      minutes: 25
    },
    // 合歡尖山 <-> 合歡山莊
    {
      from: 'mountain_hehuanjian-mountain',
      to: 'hehuan-group_hehuan-hut',
      minutes: 10
    },
    {
      from: 'hehuan-group_hehuan-hut',
      to: 'mountain_hehuanjian-mountain',
      minutes: 20
    },
    // 合歡山 <-> 武嶺
    {
      from: 'mountain_hehuan-mountain',
      to: 'hehuan-group_wuling-ridge',
      minutes: 40
    },
    {
      from: 'hehuan-group_wuling-ridge',
      to: 'mountain_hehuan-mountain',
      minutes: 60
    },
    // 奇萊山登山口/滑雪山莊 <-> 合歡山東峰
    {
      from: 'global_qilai-mountain-trailhead-ski-hut',
      to: 'mountain_hehuan-east-peak',
      minutes: 80
    },
    {
      from: 'mountain_hehuan-east-peak',
      to: 'global_qilai-mountain-trailhead-ski-hut',
      minutes: 60
    }
  ]
}
