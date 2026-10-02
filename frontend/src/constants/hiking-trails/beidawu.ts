import { type Trail } from '@/model/hikingTrail'

export const beidawu: Trail = {
  id: 'beidawu',
  name: '北大武山',
  nameEn: 'Beidawu Mountain',
  i18nKey: 'beidawu.beidawu',
  nodes: [
    {
      id: 'beidawu_xin-trailhead',
      name: '新登山口',
      i18nKey: 'beidawu.xin-trailhead',
      nodeType: 'fork'
    },
    {
      id: 'beidawu_0k-jiu-trailhead',
      name: '0K舊登山口',
      i18nKey: 'beidawu.0k-jiu-trailhead',
      nodeType: 'fork'
    },
    {
      id: 'beidawu_1-75k-yueling-saddle',
      name: '1.75K越嶺鞍部',
      i18nKey: 'beidawu.1-75k-yueling-saddle',
      nodeType: 'fork'
    },
    {
      id: 'beidawu_3-8k-viewing-platform',
      name: '3.8K展望平台',
      i18nKey: 'beidawu.3-8k-viewing-platform',
      nodeType: 'other'
    },
    {
      id: 'beidawu_4k-fork',
      name: '4K三岔路口',
      i18nKey: 'beidawu.4k-fork',
      nodeType: 'fork'
    },
    {
      id: 'beidawu_kuaigu-hut',
      name: '檜谷山莊',
      i18nKey: 'beidawu.kuaigu-hut',
      nodeType: 'hut'
    },
    {
      id: 'beidawu_south-dawu-mountain-viewpoint',
      name: '南大武山展望點',
      i18nKey: 'beidawu.south-dawu-mountain-viewpoint',
      nodeType: 'other'
    },
    {
      id: 'beidawu_5-5k-dawu-sacred-tree',
      name: '5.5K大武神木',
      i18nKey: 'beidawu.5-5k-dawu-sacred-tree',
      nodeType: 'other'
    },
    {
      id: 'beidawu_6-3k-last-water-source',
      name: '6.3K最後水源',
      i18nKey: 'beidawu.6-3k-last-water-source',
      nodeType: 'water-source'
    },
    {
      id: 'beidawu_main-ridgeline',
      name: '主稜嶺線',
      i18nKey: 'beidawu.main-ridgeline',
      nodeType: 'other'
    },
    {
      id: 'beidawu_8k-dawu-shrine',
      name: '8K大武祠',
      i18nKey: 'beidawu.8k-dawu-shrine',
      nodeType: 'other'
    },
    {
      id: 'mountain_beidawu-mountain',
      name: '9K北大武山',
      i18nKey: 'mountain.beidawu-mountain',
      nodeType: 'peak'
    }
  ],
  edges: [
    // 新登山口 <-> 0K舊登山口
    {
      from: 'beidawu_xin-trailhead',
      to: 'beidawu_0k-jiu-trailhead',
      minutes: 100
    },
    {
      from: 'beidawu_0k-jiu-trailhead',
      to: 'beidawu_xin-trailhead',
      minutes: 70
    },
    // 0K舊登山口 <-> 1.75K越嶺鞍部
    {
      from: 'beidawu_0k-jiu-trailhead',
      to: 'beidawu_1-75k-yueling-saddle',
      minutes: 90
    },
    {
      from: 'beidawu_1-75k-yueling-saddle',
      to: 'beidawu_0k-jiu-trailhead',
      minutes: 60
    },
    // 1.75K越嶺鞍部 <-> 3.8K展望平台
    {
      from: 'beidawu_1-75k-yueling-saddle',
      to: 'beidawu_3-8k-viewing-platform',
      minutes: 90
    },
    {
      from: 'beidawu_3-8k-viewing-platform',
      to: 'beidawu_1-75k-yueling-saddle',
      minutes: 60
    },
    // 3.8K展望平台 <-> 4K三岔路口
    {
      from: 'beidawu_3-8k-viewing-platform',
      to: 'beidawu_4k-fork',
      minutes: 10
    },
    {
      from: 'beidawu_4k-fork',
      to: 'beidawu_3-8k-viewing-platform',
      minutes: 10
    },
    // 4K三岔路口 <-> 檜谷山莊
    {
      from: 'beidawu_4k-fork',
      to: 'beidawu_kuaigu-hut',
      minutes: 5
    },
    {
      from: 'beidawu_kuaigu-hut',
      to: 'beidawu_4k-fork',
      minutes: 5
    },
    // 4K三岔路口 <-> 南大武山展望點
    {
      from: 'beidawu_4k-fork',
      to: 'beidawu_south-dawu-mountain-viewpoint',
      minutes: 60
    },
    {
      from: 'beidawu_south-dawu-mountain-viewpoint',
      to: 'beidawu_4k-fork',
      minutes: 40
    },
    // 南大武山展望點 <-> 5.5K大武神木
    {
      from: 'beidawu_south-dawu-mountain-viewpoint',
      to: 'beidawu_5-5k-dawu-sacred-tree',
      minutes: 30
    },
    {
      from: 'beidawu_5-5k-dawu-sacred-tree',
      to: 'beidawu_south-dawu-mountain-viewpoint',
      minutes: 20
    },
    // 5.5K大武神木 <-> 6.3K最後水源
    {
      from: 'beidawu_5-5k-dawu-sacred-tree',
      to: 'beidawu_6-3k-last-water-source',
      minutes: 65
    },
    {
      from: 'beidawu_6-3k-last-water-source',
      to: 'beidawu_5-5k-dawu-sacred-tree',
      minutes: 50
    },
    // 6.3K最後水源 <-> 主稜嶺線
    {
      from: 'beidawu_6-3k-last-water-source',
      to: 'beidawu_main-ridgeline',
      minutes: 65
    },
    {
      from: 'beidawu_main-ridgeline',
      to: 'beidawu_6-3k-last-water-source',
      minutes: 40
    },
    // 主稜嶺線 <-> 8K大武祠
    {
      from: 'beidawu_main-ridgeline',
      to: 'beidawu_8k-dawu-shrine',
      minutes: 65
    },
    {
      from: 'beidawu_8k-dawu-shrine',
      to: 'beidawu_main-ridgeline',
      minutes: 40
    },
    // 8K大武祠 <-> 9K北大武山
    {
      from: 'beidawu_8k-dawu-shrine',
      to: 'mountain_beidawu-mountain',
      minutes: 65
    },
    {
      from: 'mountain_beidawu-mountain',
      to: 'beidawu_8k-dawu-shrine',
      minutes: 55
    }
  ]
}
