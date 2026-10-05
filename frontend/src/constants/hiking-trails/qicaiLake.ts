import { type Trail } from '@/model/hikingTrail'

export const qicaiLake: Trail = {
  id: 'qicai-lake',
  name: '七彩湖',
  nameEn: 'Qicai Lake',
  i18nKey: 'qicai-lake.qicai-lake',
  nodes: [
    // --- 主線：林道入口至丹大山 ---
    {
      id: 'qicai-lake_lindao-entrance',
      name: '林道入口',
      i18nKey: 'qicai-lake.lindao-entrance',
      nodeType: 'other'
    },
    {
      id: 'qicai-lake_lindao-old-trailhead',
      name: '林道舊登山口',
      i18nKey: 'qicai-lake.lindao-old-trailhead',
      nodeType: 'fork'
    },
    {
      id: 'mountain_2897-peak',
      name: '2897公尺峰',
      i18nKey: 'mountain.2897-peak',
      nodeType: 'peak'
    },
    {
      id: 'mountain_liushun-mountain',
      name: '六順山',
      i18nKey: 'mountain.liushun-mountain',
      nodeType: 'peak'
    },
    {
      id: 'qicai-lake_2813-saddle-camp',
      name: '2813鞍營地',
      i18nKey: 'qicai-lake.2813-saddle-camp',
      nodeType: 'camp'
    },
    {
      id: 'qicai-lake_2761-lowest-saddle',
      name: '2761最低鞍部',
      i18nKey: 'qicai-lake.2761-lowest-saddle',
      nodeType: 'fork'
    },
    {
      id: 'mountain_guanmen-north-mountain',
      name: '關門北山',
      i18nKey: 'mountain.guanmen-north-mountain',
      nodeType: 'peak'
    },
    {
      id: 'qicai-lake_guanmen-mountain-col',
      name: '關門山凹',
      i18nKey: 'qicai-lake.guanmen-mountain-col',
      nodeType: 'other'
    },
    {
      id: 'mountain_yan-mountain',
      name: '巖山',
      i18nKey: 'mountain.yan-mountain',
      nodeType: 'peak'
    },
    {
      id: 'qicai-lake_2603-saddle',
      name: '2603公尺鞍部',
      i18nKey: 'qicai-lake.2603-saddle',
      nodeType: 'fork'
    },
    {
      id: 'mountain_dashigong-mountain',
      name: '大石公山',
      i18nKey: 'mountain.dashigong-mountain',
      nodeType: 'peak'
    },
    {
      id: 'mountain_xiaoshigong-mountain',
      name: '小石公山',
      i18nKey: 'mountain.xiaoshigong-mountain',
      nodeType: 'peak'
    },
    {
      id: 'qicai-lake_2833-saddle',
      name: '2833公尺鞍部',
      i18nKey: 'qicai-lake.2833-saddle',
      nodeType: 'fork'
    },
    {
      id: 'mountain_3255-peak',
      name: '3255公尺峰',
      i18nKey: 'mountain.3255-peak',
      nodeType: 'peak'
    },
    {
      id: 'mountain_danda-mountain',
      name: '丹大山',
      i18nKey: 'mountain.danda-mountain',
      nodeType: 'peak'
    },
    // --- 七彩湖支線 ---
    {
      id: 'qicai-lake_qicai-lake',
      name: '七彩湖',
      i18nKey: 'qicai-lake.qicai-lake',
      nodeType: 'water-source'
    },
    {
      id: 'qicai-lake_qicaimei-pond',
      name: '七彩妹池',
      i18nKey: 'qicai-lake.qicaimei-pond',
      nodeType: 'water-source'
    },
    {
      id: 'qicai-lake_shuanglong-fall',
      name: '雙龍瀑布',
      i18nKey: 'qicai-lake.shuanglong-fall',
      nodeType: 'water-source'
    },
    {
      id: 'qicai-lake_abandoned-work-shed',
      name: '廢棄工寮',
      i18nKey: 'qicai-lake.abandoned-work-shed',
      nodeType: 'camp'
    },
    {
      id: 'qicai-lake_railway-fork',
      name: '鐵軌岔路',
      i18nKey: 'qicai-lake.railway-fork',
      nodeType: 'fork'
    },
    {
      id: 'qicai-lake_taipower-gaodeng-station',
      name: '台電高登連絡站',
      i18nKey: 'qicai-lake.taipower-gaodeng-station',
      nodeType: 'other'
    },
    // --- 六順山東側稜線至萬榮林道 ---
    {
      id: 'mountain_2863-peak',
      name: '2863公尺峰',
      i18nKey: 'mountain.2863-peak',
      nodeType: 'peak'
    },
    {
      id: 'qicai-lake_2780-meadow-pond',
      name: '2780草原水池',
      i18nKey: 'qicai-lake.2780-meadow-pond',
      nodeType: 'water-source'
    },
    {
      id: 'qicai-lake_liushun-mountain-new-trailhead',
      name: '六順山新登山口',
      i18nKey: 'qicai-lake.liushun-mountain-new-trailhead',
      nodeType: 'fork'
    },
    {
      id: 'qicai-lake_tiantiding-fork',
      name: '天梯頂·岔路口',
      i18nKey: 'qicai-lake.tiantiding-fork',
      nodeType: 'fork'
    },
    {
      id: 'qicai-lake_qingren-suspension-bridge',
      name: '情人吊橋',
      i18nKey: 'qicai-lake.qingren-suspension-bridge',
      nodeType: 'other'
    },
    {
      id: 'qicai-lake_46k-jiuzu-work-shed',
      name: '46K九族工寮',
      i18nKey: 'qicai-lake.46k-jiuzu-work-shed',
      nodeType: 'camp'
    },
    {
      id: 'qicai-lake_42k-adao-villa',
      name: '42K阿道別墅',
      i18nKey: 'qicai-lake.42k-adao-villa',
      nodeType: 'other'
    },
    {
      id: 'qicai-lake_36k-dabeng-cliff',
      name: '36K大崩壁',
      i18nKey: 'qicai-lake.36k-dabeng-cliff',
      nodeType: 'other'
    }
  ],
  edges: [
    // 林道入口 <-> 林道舊登山口
    {
      from: 'qicai-lake_lindao-entrance',
      to: 'qicai-lake_lindao-old-trailhead',
      minutes: 5
    },
    {
      from: 'qicai-lake_lindao-old-trailhead',
      to: 'qicai-lake_lindao-entrance',
      minutes: 5
    },
    // 林道入口 <-> 七彩湖
    {
      from: 'qicai-lake_lindao-entrance',
      to: 'qicai-lake_qicai-lake',
      minutes: 10
    },
    {
      from: 'qicai-lake_qicai-lake',
      to: 'qicai-lake_lindao-entrance',
      minutes: 20
    },
    // 七彩湖 <-> 七彩妹池
    {
      from: 'qicai-lake_qicai-lake',
      to: 'qicai-lake_qicaimei-pond',
      minutes: 10
    },
    {
      from: 'qicai-lake_qicaimei-pond',
      to: 'qicai-lake_qicai-lake',
      minutes: 10
    },
    // 七彩妹池 <-> 雙龍瀑布
    {
      from: 'qicai-lake_qicaimei-pond',
      to: 'qicai-lake_shuanglong-fall',
      minutes: 60
    },
    {
      from: 'qicai-lake_shuanglong-fall',
      to: 'qicai-lake_qicaimei-pond',
      minutes: 80
    },
    // 雙龍瀑布 <-> 廢棄工寮
    {
      from: 'qicai-lake_shuanglong-fall',
      to: 'qicai-lake_abandoned-work-shed',
      minutes: 90
    },
    {
      from: 'qicai-lake_abandoned-work-shed',
      to: 'qicai-lake_shuanglong-fall',
      minutes: 90
    },
    // 廢棄工寮 <-> 鐵軌岔路
    {
      from: 'qicai-lake_abandoned-work-shed',
      to: 'qicai-lake_railway-fork',
      minutes: 180
    },
    {
      from: 'qicai-lake_railway-fork',
      to: 'qicai-lake_abandoned-work-shed',
      minutes: 180
    },
    // 鐵軌岔路 <-> 台電高登連絡站
    {
      from: 'qicai-lake_railway-fork',
      to: 'qicai-lake_taipower-gaodeng-station',
      minutes: 10
    },
    {
      from: 'qicai-lake_taipower-gaodeng-station',
      to: 'qicai-lake_railway-fork',
      minutes: 10
    },
    // 鐵軌岔路 <-> 天梯頂·岔路口
    {
      from: 'qicai-lake_railway-fork',
      to: 'qicai-lake_tiantiding-fork',
      minutes: 10
    },
    {
      from: 'qicai-lake_tiantiding-fork',
      to: 'qicai-lake_railway-fork',
      minutes: 10
    },
    // 林道舊登山口 <-> 2897公尺峰
    {
      from: 'qicai-lake_lindao-old-trailhead',
      to: 'mountain_2897-peak',
      minutes: 70
    },
    {
      from: 'mountain_2897-peak',
      to: 'qicai-lake_lindao-old-trailhead',
      minutes: 70
    },
    // 2897公尺峰 <-> 六順山
    {
      from: 'mountain_2897-peak',
      to: 'mountain_liushun-mountain',
      minutes: 120
    },
    {
      from: 'mountain_liushun-mountain',
      to: 'mountain_2897-peak',
      minutes: 100
    },
    // 六順山 <-> 2863公尺峰
    {
      from: 'mountain_liushun-mountain',
      to: 'mountain_2863-peak',
      minutes: 50
    },
    {
      from: 'mountain_2863-peak',
      to: 'mountain_liushun-mountain',
      minutes: 60
    },
    // 2863公尺峰 <-> 2780草原水池
    {
      from: 'mountain_2863-peak',
      to: 'qicai-lake_2780-meadow-pond',
      minutes: 70
    },
    {
      from: 'qicai-lake_2780-meadow-pond',
      to: 'mountain_2863-peak',
      minutes: 90
    },
    // 2780草原水池 <-> 六順山新登山口
    {
      from: 'qicai-lake_2780-meadow-pond',
      to: 'qicai-lake_liushun-mountain-new-trailhead',
      minutes: 40
    },
    {
      from: 'qicai-lake_liushun-mountain-new-trailhead',
      to: 'qicai-lake_2780-meadow-pond',
      minutes: 50
    },
    // 六順山新登山口 <-> 天梯頂·岔路口
    {
      from: 'qicai-lake_liushun-mountain-new-trailhead',
      to: 'qicai-lake_tiantiding-fork',
      minutes: 5
    },
    {
      from: 'qicai-lake_tiantiding-fork',
      to: 'qicai-lake_liushun-mountain-new-trailhead',
      minutes: 5
    },
    // 天梯頂·岔路口 <-> 情人吊橋
    {
      from: 'qicai-lake_tiantiding-fork',
      to: 'qicai-lake_qingren-suspension-bridge',
      minutes: 100
    },
    {
      from: 'qicai-lake_qingren-suspension-bridge',
      to: 'qicai-lake_tiantiding-fork',
      minutes: 180
    },
    // 情人吊橋 <-> 46K九族工寮
    {
      from: 'qicai-lake_qingren-suspension-bridge',
      to: 'qicai-lake_46k-jiuzu-work-shed',
      minutes: 20
    },
    {
      from: 'qicai-lake_46k-jiuzu-work-shed',
      to: 'qicai-lake_qingren-suspension-bridge',
      minutes: 20
    },
    // 46K九族工寮 <-> 42K阿道別墅
    {
      from: 'qicai-lake_46k-jiuzu-work-shed',
      to: 'qicai-lake_42k-adao-villa',
      minutes: 70
    },
    {
      from: 'qicai-lake_42k-adao-villa',
      to: 'qicai-lake_46k-jiuzu-work-shed',
      minutes: 60
    },
    // 42K阿道別墅 <-> 36K大崩壁
    {
      from: 'qicai-lake_42k-adao-villa',
      to: 'qicai-lake_36k-dabeng-cliff',
      minutes: 110
    },
    {
      from: 'qicai-lake_36k-dabeng-cliff',
      to: 'qicai-lake_42k-adao-villa',
      minutes: 120
    },
    // 六順山 <-> 2813鞍營地
    {
      from: 'mountain_liushun-mountain',
      to: 'qicai-lake_2813-saddle-camp',
      minutes: 60
    },
    {
      from: 'qicai-lake_2813-saddle-camp',
      to: 'mountain_liushun-mountain',
      minutes: 100
    },
    // 2813鞍營地 <-> 2761最低鞍部
    {
      from: 'qicai-lake_2813-saddle-camp',
      to: 'qicai-lake_2761-lowest-saddle',
      minutes: 75
    },
    {
      from: 'qicai-lake_2761-lowest-saddle',
      to: 'qicai-lake_2813-saddle-camp',
      minutes: 100
    },
    // 2761最低鞍部 <-> 關門北山
    {
      from: 'qicai-lake_2761-lowest-saddle',
      to: 'mountain_guanmen-north-mountain',
      minutes: 210
    },
    {
      from: 'mountain_guanmen-north-mountain',
      to: 'qicai-lake_2761-lowest-saddle',
      minutes: 100
    },
    // 關門北山 <-> 關門山凹
    {
      from: 'mountain_guanmen-north-mountain',
      to: 'qicai-lake_guanmen-mountain-col',
      minutes: 150
    },
    {
      from: 'qicai-lake_guanmen-mountain-col',
      to: 'mountain_guanmen-north-mountain',
      minutes: 100
    },
    // 關門山凹 <-> 巖山
    {
      from: 'qicai-lake_guanmen-mountain-col',
      to: 'mountain_yan-mountain',
      minutes: 40
    },
    {
      from: 'mountain_yan-mountain',
      to: 'qicai-lake_guanmen-mountain-col',
      minutes: 55
    },
    // 巖山 <-> 2603公尺鞍部
    {
      from: 'mountain_yan-mountain',
      to: 'qicai-lake_2603-saddle',
      minutes: 250
    },
    {
      from: 'qicai-lake_2603-saddle',
      to: 'mountain_yan-mountain',
      minutes: 320
    },
    // 2603公尺鞍部 <-> 大石公山
    {
      from: 'qicai-lake_2603-saddle',
      to: 'mountain_dashigong-mountain',
      minutes: 90
    },
    {
      from: 'mountain_dashigong-mountain',
      to: 'qicai-lake_2603-saddle',
      minutes: 60
    },
    // 大石公山 <-> 小石公山
    {
      from: 'mountain_dashigong-mountain',
      to: 'mountain_xiaoshigong-mountain',
      minutes: 15
    },
    {
      from: 'mountain_xiaoshigong-mountain',
      to: 'mountain_dashigong-mountain',
      minutes: 20
    },
    // 小石公山 <-> 2833公尺鞍部
    {
      from: 'mountain_xiaoshigong-mountain',
      to: 'qicai-lake_2833-saddle',
      minutes: 50
    },
    {
      from: 'qicai-lake_2833-saddle',
      to: 'mountain_xiaoshigong-mountain',
      minutes: 80
    },
    // 2833公尺鞍部 <-> 3255公尺峰
    {
      from: 'qicai-lake_2833-saddle',
      to: 'mountain_3255-peak',
      minutes: 140
    },
    {
      from: 'mountain_3255-peak',
      to: 'qicai-lake_2833-saddle',
      minutes: 80
    },
    // 3255公尺峰 <-> 丹大山
    {
      from: 'mountain_3255-peak',
      to: 'mountain_danda-mountain',
      minutes: 260
    },
    {
      from: 'mountain_danda-mountain',
      to: 'mountain_3255-peak',
      minutes: 240
    }
  ]
}
