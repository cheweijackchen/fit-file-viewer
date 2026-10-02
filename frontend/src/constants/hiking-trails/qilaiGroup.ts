import { type Trail } from '@/model/hikingTrail'

export const qilaiGroup: Trail = {
  id: 'qilai-group',
  name: '奇萊群峰',
  nameEn: 'Qilai Group',
  i18nKey: 'qilai-group.qilai-group',
  nodes: [
    // --- 奇萊山登山口至主北岔路 ---
    {
      id: 'global_qilai-mountain-trailhead-ski-hut',
      name: '奇萊山登山口/滑雪山莊',
      i18nKey: 'global.qilai-mountain-trailhead-ski-hut',
      nodeType: 'fork'
    },
    {
      id: 'global_heishuitang-hut',
      name: '黑水塘山屋',
      i18nKey: 'global.heishuitang-hut',
      nodeType: 'hut'
    },
    {
      id: 'global_chenggong-hut',
      name: '成功山屋',
      i18nKey: 'global.chenggong-hut',
      nodeType: 'hut'
    },
    {
      id: 'global_chenggong-1-fort',
      name: '成功一號堡',
      i18nKey: 'global.chenggong-1-fort',
      nodeType: 'other'
    },
    {
      id: 'global_main-north-fork',
      name: '主北岔路',
      i18nKey: 'global.main-north-fork',
      nodeType: 'fork'
    },
    // --- 奇萊北峰與主山 ---
    {
      id: 'global_qilai-north-peak-fork',
      name: '奇萊北峰岔路',
      i18nKey: 'global.qilai-north-peak-fork',
      nodeType: 'fork'
    },
    {
      id: 'mountain_qilai-north-peak',
      name: '奇萊主山北峰',
      i18nKey: 'mountain.qilai-north-peak',
      nodeType: 'peak'
    },
    {
      id: 'global_main-north-three-way-fork',
      name: '主北三岔路',
      i18nKey: 'global.main-north-three-way-fork',
      nodeType: 'fork'
    },
    {
      id: 'global_qilai-hut',
      name: '奇萊山莊',
      i18nKey: 'global.qilai-hut',
      nodeType: 'hut'
    },
    {
      id: 'qilai-group_qilai-main-peak-trailhead',
      name: '主山登山口',
      i18nKey: 'qilai-group.qilai-main-peak-trailhead',
      nodeType: 'fork'
    },
    {
      id: 'mountain_qilai-main-peak',
      name: '奇萊主山',
      i18nKey: 'mountain.qilai-main-peak',
      nodeType: 'peak'
    },
    // --- 卡西至天池岔路口 ---
    {
      id: 'qilai-group_kaxi-camp',
      name: '卡西營地',
      i18nKey: 'qilai-group.kaxi-camp',
      nodeType: 'camp'
    },
    {
      id: 'qilai-group_kadong-camp',
      name: '卡東營地',
      i18nKey: 'qilai-group.kadong-camp',
      nodeType: 'camp'
    },
    {
      id: 'qilai-group_lishan-forest-entrance',
      name: '裡山森林入口',
      i18nKey: 'qilai-group.lishan-forest-entrance',
      nodeType: 'other'
    },
    {
      id: 'global_qilai-south-peak-trailhead',
      name: '南峰登山口',
      i18nKey: 'global.qilai-south-peak-trailhead',
      nodeType: 'fork'
    },
    {
      id: 'mountain_qilai-south-peak',
      name: '奇萊主山南峰',
      i18nKey: 'mountain.qilai-south-peak',
      nodeType: 'peak'
    },
    {
      id: 'global_tianchi-fork',
      name: '天池岔路口',
      i18nKey: 'global.tianchi-fork',
      nodeType: 'fork'
    },
    {
      id: 'mountain_nanhua-mountain',
      name: '南華山',
      i18nKey: 'mountain.nanhua-mountain',
      nodeType: 'peak'
    },
    // --- 天池山莊與屯原 ---
    {
      id: 'global_tianchi-hut',
      name: '天池山莊',
      i18nKey: 'global.tianchi-hut',
      nodeType: 'hut'
    },
    {
      id: 'global_xianjie-pass',
      name: '縣界埡口',
      i18nKey: 'global.xianjie-pass',
      nodeType: 'other'
    },
    {
      id: 'global_yunhai-tai-power-hut',
      name: '雲海保線所',
      i18nKey: 'global.yunhai-tai-power-hut',
      nodeType: 'other'
    },
    {
      id: 'global_tunyuan-trailhead',
      name: '屯原登山口',
      i18nKey: 'global.tunyuan-trailhead',
      nodeType: 'fork'
    },
    // --- 無步行連線 ---
  ],
  edges: [
    // 奇萊山登山口/滑雪山莊 <-> 黑水塘山屋
    {
      from: 'global_qilai-mountain-trailhead-ski-hut',
      to: 'global_heishuitang-hut',
      minutes: 110
    },
    {
      from: 'global_heishuitang-hut',
      to: 'global_qilai-mountain-trailhead-ski-hut',
      minutes: 130
    },
    // 黑水塘山屋 <-> 成功山屋
    {
      from: 'global_heishuitang-hut',
      to: 'global_chenggong-hut',
      minutes: 60
    },
    {
      from: 'global_chenggong-hut',
      to: 'global_heishuitang-hut',
      minutes: 50
    },
    // 成功山屋 <-> 成功一號堡
    {
      from: 'global_chenggong-hut',
      to: 'global_chenggong-1-fort',
      minutes: 50
    },
    {
      from: 'global_chenggong-1-fort',
      to: 'global_chenggong-hut',
      minutes: 40
    },
    // 成功一號堡 <-> 主北岔路
    {
      from: 'global_chenggong-1-fort',
      to: 'global_main-north-fork',
      minutes: 30
    },
    {
      from: 'global_main-north-fork',
      to: 'global_chenggong-1-fort',
      minutes: 15
    },
    // 主北岔路 <-> 奇萊北峰岔路
    {
      from: 'global_main-north-fork',
      to: 'global_qilai-north-peak-fork',
      minutes: 100
    },
    {
      from: 'global_qilai-north-peak-fork',
      to: 'global_main-north-fork',
      minutes: 80
    },
    // 奇萊北峰岔路 <-> 奇萊主山北峰
    {
      from: 'global_qilai-north-peak-fork',
      to: 'mountain_qilai-north-peak',
      minutes: 55
    },
    {
      from: 'mountain_qilai-north-peak',
      to: 'global_qilai-north-peak-fork',
      minutes: 35
    },
    // 主北岔路 <-> 主北三岔路
    {
      from: 'global_main-north-fork',
      to: 'global_main-north-three-way-fork',
      minutes: 90
    },
    {
      from: 'global_main-north-three-way-fork',
      to: 'global_main-north-fork',
      minutes: 70
    },
    // 奇萊北峰岔路 <-> 主北三岔路
    {
      from: 'global_qilai-north-peak-fork',
      to: 'global_main-north-three-way-fork',
      minutes: 30
    },
    {
      from: 'global_main-north-three-way-fork',
      to: 'global_qilai-north-peak-fork',
      minutes: 40
    },
    // 主北三岔路 <-> 奇萊山莊
    {
      from: 'global_main-north-three-way-fork',
      to: 'global_qilai-hut',
      minutes: 10
    },
    {
      from: 'global_qilai-hut',
      to: 'global_main-north-three-way-fork',
      minutes: 15
    },
    // 奇萊山莊 <-> 主山登山口
    {
      from: 'global_qilai-hut',
      to: 'qilai-group_qilai-main-peak-trailhead',
      minutes: 90
    },
    {
      from: 'qilai-group_qilai-main-peak-trailhead',
      to: 'global_qilai-hut',
      minutes: 70
    },
    // 主山登山口 <-> 奇萊主山
    {
      from: 'qilai-group_qilai-main-peak-trailhead',
      to: 'mountain_qilai-main-peak',
      minutes: 25
    },
    {
      from: 'mountain_qilai-main-peak',
      to: 'qilai-group_qilai-main-peak-trailhead',
      minutes: 15
    },
    // 主山登山口 <-> 卡西營地
    {
      from: 'qilai-group_qilai-main-peak-trailhead',
      to: 'qilai-group_kaxi-camp',
      minutes: 90
    },
    {
      from: 'qilai-group_kaxi-camp',
      to: 'qilai-group_qilai-main-peak-trailhead',
      minutes: 110
    },
    // 卡西營地 <-> 卡東營地
    {
      from: 'qilai-group_kaxi-camp',
      to: 'qilai-group_kadong-camp',
      minutes: 230
    },
    {
      from: 'qilai-group_kadong-camp',
      to: 'qilai-group_kaxi-camp',
      minutes: 270
    },
    // 卡東營地 <-> 裡山森林入口
    {
      from: 'qilai-group_kadong-camp',
      to: 'qilai-group_lishan-forest-entrance',
      minutes: 30
    },
    {
      from: 'qilai-group_lishan-forest-entrance',
      to: 'qilai-group_kadong-camp',
      minutes: 40
    },
    // 裡山森林入口 <-> 南峰登山口
    {
      from: 'qilai-group_lishan-forest-entrance',
      to: 'global_qilai-south-peak-trailhead',
      minutes: 150
    },
    {
      from: 'global_qilai-south-peak-trailhead',
      to: 'qilai-group_lishan-forest-entrance',
      minutes: 185
    },
    // 奇萊主山南峰 <-> 南峰登山口
    {
      from: 'mountain_qilai-south-peak',
      to: 'global_qilai-south-peak-trailhead',
      minutes: 40
    },
    {
      from: 'global_qilai-south-peak-trailhead',
      to: 'mountain_qilai-south-peak',
      minutes: 60
    },
    // 南峰登山口 <-> 天池岔路口
    {
      from: 'global_qilai-south-peak-trailhead',
      to: 'global_tianchi-fork',
      minutes: 15
    },
    {
      from: 'global_tianchi-fork',
      to: 'global_qilai-south-peak-trailhead',
      minutes: 20
    },
    // 天池岔路口 <-> 南華山
    {
      from: 'global_tianchi-fork',
      to: 'mountain_nanhua-mountain',
      minutes: 40
    },
    {
      from: 'mountain_nanhua-mountain',
      to: 'global_tianchi-fork',
      minutes: 30
    },
    // 天池岔路口 <-> 天池山莊
    {
      from: 'global_tianchi-fork',
      to: 'global_tianchi-hut',
      minutes: 40
    },
    {
      from: 'global_tianchi-hut',
      to: 'global_tianchi-fork',
      minutes: 60
    },
    // 天池山莊 <-> 縣界埡口
    {
      from: 'global_tianchi-hut',
      to: 'global_xianjie-pass',
      minutes: 50
    },
    {
      from: 'global_xianjie-pass',
      to: 'global_tianchi-hut',
      minutes: 55
    },
    // 縣界埡口 <-> 南華山
    {
      from: 'global_xianjie-pass',
      to: 'mountain_nanhua-mountain',
      minutes: 120
    },
    {
      from: 'mountain_nanhua-mountain',
      to: 'global_xianjie-pass',
      minutes: 80
    },
    // 天池山莊 <-> 雲海保線所
    {
      from: 'global_tianchi-hut',
      to: 'global_yunhai-tai-power-hut',
      minutes: 180
    },
    {
      from: 'global_yunhai-tai-power-hut',
      to: 'global_tianchi-hut',
      minutes: 210
    },
    // 雲海保線所 <-> 屯原登山口
    {
      from: 'global_yunhai-tai-power-hut',
      to: 'global_tunyuan-trailhead',
      minutes: 100
    },
    {
      from: 'global_tunyuan-trailhead',
      to: 'global_yunhai-tai-power-hut',
      minutes: 120
    }
  ]
}
