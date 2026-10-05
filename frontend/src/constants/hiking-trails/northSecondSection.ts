import { type Trail } from '@/model/hikingTrail'

export const northSecondSection: Trail = {
  id: 'north-second-section',
  name: '北二段',
  nameEn: 'North Second Section',
  i18nKey: 'north-second-section.north-second-section',
  nodes: [
    // --- 起點與北側登山口 ---
    {
      id: 'north-second-section_11-7k-road-end',
      name: '11.7K行車終點',
      i18nKey: 'north-second-section.11-7k-road-end',
      nodeType: 'other'
    },
    {
      id: 'north-second-section_17-5k-trailhead',
      name: '17.5K登山口',
      i18nKey: 'north-second-section.17-5k-trailhead',
      nodeType: 'fork'
    },
    // --- 北稜：遠多志山至甘薯峰 ---
    {
      id: 'north-second-section_ermu-river-confluence',
      name: '耳無溪合流點',
      i18nKey: 'north-second-section.ermu-river-confluence',
      nodeType: 'other'
    },
    {
      id: 'mountain_yuanduozhi-mountain',
      name: '遠多志山',
      i18nKey: 'mountain.yuanduozhi-mountain',
      nodeType: 'peak'
    },
    {
      id: 'mountain_ganshu-south-peak',
      name: '甘薯南峰',
      i18nKey: 'mountain.ganshu-south-peak',
      nodeType: 'fork'
    },
    {
      id: 'mountain_ganshu-peak',
      name: '甘薯峰',
      i18nKey: 'mountain.ganshu-peak',
      nodeType: 'peak'
    },
    // --- 東側：鬼門關峰至無明山 ---
    {
      id: 'north-second-section_ganshu-south-peak-saddle',
      name: '鞍部',
      i18nKey: 'north-second-section.ganshu-south-peak-saddle',
      nodeType: 'fork'
    },
    {
      id: 'mountain_guimenguan-peak',
      name: '鬼門關峰',
      i18nKey: 'mountain.guimenguan-peak',
      nodeType: 'peak'
    },
    {
      id: 'north-second-section_wuming-pond',
      name: '無明水池',
      i18nKey: 'north-second-section.wuming-pond',
      nodeType: 'water-source'
    },
    {
      id: 'mountain_wuming-mountain',
      name: '無明山',
      i18nKey: 'mountain.wuming-mountain',
      nodeType: 'peak'
    },
    {
      id: 'mountain_wuming-west-peak',
      name: '無明山西峰',
      i18nKey: 'mountain.wuming-west-peak',
      nodeType: 'peak'
    },
    {
      id: 'north-second-section_dongan-camp',
      name: '東鞍營地',
      i18nKey: 'north-second-section.dongan-camp',
      nodeType: 'camp'
    },
    {
      id: 'north-second-section_dongan-water-source',
      name: '水源',
      i18nKey: 'north-second-section.dongan-water-source',
      nodeType: 'water-source'
    },
    // --- 南側：鈴鳴山至閂山 ---
    {
      id: 'mountain_lingming-mountain',
      name: '鈴鳴山',
      i18nKey: 'mountain.lingming-mountain',
      nodeType: 'peak'
    },
    {
      id: 'north-second-section_rendai-mountain-ridge-fork',
      name: '人待山稜線岔路',
      i18nKey: 'north-second-section.rendai-mountain-ridge-fork',
      nodeType: 'fork'
    },
    {
      id: 'north-second-section_27-5k-forest-road-trailhead',
      name: '27.5K林道登山口',
      i18nKey: 'north-second-section.27-5k-forest-road-trailhead',
      nodeType: 'fork'
    },
    {
      id: 'north-second-section_25k-work-shed',
      name: '25K工寮',
      i18nKey: 'north-second-section.25k-work-shed',
      nodeType: 'camp'
    },
    {
      id: 'north-second-section_23-2k-trailhead',
      name: '23.2K登山口',
      i18nKey: 'north-second-section.23-2k-trailhead',
      nodeType: 'fork'
    },
    {
      id: 'north-second-section_rain-gauge-fork',
      name: '雨量計前岔路口',
      i18nKey: 'north-second-section.rain-gauge-fork',
      nodeType: 'fork'
    },
    {
      id: 'mountain_shuan-mountain',
      name: '閂山',
      i18nKey: 'mountain.shuan-mountain',
      nodeType: 'peak'
    }
  ],
  edges: [
    // 11.7K行車終點 <-> 17.5K登山口
    {
      from: 'north-second-section_11-7k-road-end',
      to: 'north-second-section_17-5k-trailhead',
      minutes: 180
    },
    {
      from: 'north-second-section_17-5k-trailhead',
      to: 'north-second-section_11-7k-road-end',
      minutes: 140
    },
    // 17.5K登山口 <-> 耳無溪合流點
    {
      from: 'north-second-section_17-5k-trailhead',
      to: 'north-second-section_ermu-river-confluence',
      minutes: 110
    },
    {
      from: 'north-second-section_ermu-river-confluence',
      to: 'north-second-section_17-5k-trailhead',
      minutes: 160
    },
    // 耳無溪合流點 <-> 遠多志山
    {
      from: 'north-second-section_ermu-river-confluence',
      to: 'mountain_yuanduozhi-mountain',
      minutes: 240
    },
    {
      from: 'mountain_yuanduozhi-mountain',
      to: 'north-second-section_ermu-river-confluence',
      minutes: 140
    },
    // 遠多志山 <-> 甘薯南峰
    {
      from: 'mountain_yuanduozhi-mountain',
      to: 'mountain_ganshu-south-peak',
      minutes: 90
    },
    {
      from: 'mountain_ganshu-south-peak',
      to: 'mountain_yuanduozhi-mountain',
      minutes: 50
    },
    // 甘薯南峰 <-> 甘薯峰
    {
      from: 'mountain_ganshu-south-peak',
      to: 'mountain_ganshu-peak',
      minutes: 140
    },
    {
      from: 'mountain_ganshu-peak',
      to: 'mountain_ganshu-south-peak',
      minutes: 140
    },
    // 甘薯南峰 <-> 鞍部
    {
      from: 'mountain_ganshu-south-peak',
      to: 'north-second-section_ganshu-south-peak-saddle',
      minutes: 60
    },
    {
      from: 'north-second-section_ganshu-south-peak-saddle',
      to: 'mountain_ganshu-south-peak',
      minutes: 70
    },
    // 鞍部 <-> 鬼門關峰
    {
      from: 'north-second-section_ganshu-south-peak-saddle',
      to: 'mountain_guimenguan-peak',
      minutes: 110
    },
    {
      from: 'mountain_guimenguan-peak',
      to: 'north-second-section_ganshu-south-peak-saddle',
      minutes: 70
    },
    // 鬼門關峰 <-> 無明水池
    {
      from: 'mountain_guimenguan-peak',
      to: 'north-second-section_wuming-pond',
      minutes: 15
    },
    {
      from: 'north-second-section_wuming-pond',
      to: 'mountain_guimenguan-peak',
      minutes: 20
    },
    // 無明水池 <-> 無明山
    {
      from: 'north-second-section_wuming-pond',
      to: 'mountain_wuming-mountain',
      minutes: 70
    },
    {
      from: 'mountain_wuming-mountain',
      to: 'north-second-section_wuming-pond',
      minutes: 45
    },
    // 無明山 <-> 無明山西峰
    {
      from: 'mountain_wuming-mountain',
      to: 'mountain_wuming-west-peak',
      minutes: 200
    },
    {
      from: 'mountain_wuming-west-peak',
      to: 'mountain_wuming-mountain',
      minutes: 260,
      note: '快 160 分'
    },
    // 無明山西峰 <-> 東鞍營地
    {
      from: 'mountain_wuming-west-peak',
      to: 'north-second-section_dongan-camp',
      minutes: 290
    },
    {
      from: 'north-second-section_dongan-camp',
      to: 'mountain_wuming-west-peak',
      minutes: 350,
      note: '快 190 分'
    },
    // 東鞍營地 <-> 水源
    {
      from: 'north-second-section_dongan-camp',
      to: 'north-second-section_dongan-water-source',
      minutes: 15
    },
    {
      from: 'north-second-section_dongan-water-source',
      to: 'north-second-section_dongan-camp',
      minutes: 25
    },
    // 東鞍營地 <-> 鈴鳴山
    {
      from: 'north-second-section_dongan-camp',
      to: 'mountain_lingming-mountain',
      minutes: 30
    },
    {
      from: 'mountain_lingming-mountain',
      to: 'north-second-section_dongan-camp',
      minutes: 20
    },
    // 鈴鳴山 <-> 人待山稜線岔路
    {
      from: 'mountain_lingming-mountain',
      to: 'north-second-section_rendai-mountain-ridge-fork',
      minutes: 45
    },
    {
      from: 'north-second-section_rendai-mountain-ridge-fork',
      to: 'mountain_lingming-mountain',
      minutes: 60
    },
    // 人待山稜線岔路 <-> 27.5K林道登山口
    {
      from: 'north-second-section_rendai-mountain-ridge-fork',
      to: 'north-second-section_27-5k-forest-road-trailhead',
      minutes: 50
    },
    {
      from: 'north-second-section_27-5k-forest-road-trailhead',
      to: 'north-second-section_rendai-mountain-ridge-fork',
      minutes: 70
    },
    // 27.5K林道登山口 <-> 25K工寮
    {
      from: 'north-second-section_27-5k-forest-road-trailhead',
      to: 'north-second-section_25k-work-shed',
      minutes: 110
    },
    {
      from: 'north-second-section_25k-work-shed',
      to: 'north-second-section_27-5k-forest-road-trailhead',
      minutes: 110
    },
    // 25K工寮 <-> 23.2K登山口
    {
      from: 'north-second-section_25k-work-shed',
      to: 'north-second-section_23-2k-trailhead',
      minutes: 40
    },
    {
      from: 'north-second-section_23-2k-trailhead',
      to: 'north-second-section_25k-work-shed',
      minutes: 50
    },
    // 23.2K登山口 <-> 17.5K登山口
    {
      from: 'north-second-section_23-2k-trailhead',
      to: 'north-second-section_17-5k-trailhead',
      minutes: 120
    },
    {
      from: 'north-second-section_17-5k-trailhead',
      to: 'north-second-section_23-2k-trailhead',
      minutes: 140
    },
    // 23.2K登山口 <-> 雨量計前岔路口
    {
      from: 'north-second-section_23-2k-trailhead',
      to: 'north-second-section_rain-gauge-fork',
      minutes: 20
    },
    {
      from: 'north-second-section_rain-gauge-fork',
      to: 'north-second-section_23-2k-trailhead',
      minutes: 15
    },
    // 雨量計前岔路口 <-> 閂山
    {
      from: 'north-second-section_rain-gauge-fork',
      to: 'mountain_shuan-mountain',
      minutes: 80
    },
    {
      from: 'mountain_shuan-mountain',
      to: 'north-second-section_rain-gauge-fork',
      minutes: 60
    },
    // 閂山 <-> 25K工寮
    {
      from: 'mountain_shuan-mountain',
      to: 'north-second-section_25k-work-shed',
      minutes: 80
    },
    {
      from: 'north-second-section_25k-work-shed',
      to: 'mountain_shuan-mountain',
      minutes: 100
    }
  ]
}
