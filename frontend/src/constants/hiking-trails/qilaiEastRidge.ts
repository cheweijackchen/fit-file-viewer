import { type Trail } from '@/model/hikingTrail'

export const qilaiEastRidge: Trail = {
  id: 'qilai-east-ridge',
  name: '奇萊東稜',
  nameEn: 'Qilai East Ridge',
  i18nKey: 'qilai-east-ridge.qilai-east-ridge',
  nodes: [
    // --- 奇萊山登山口至主北三岔路 ---
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
    // --- 月形池至磐石山 ---
    {
      id: 'qilai-east-ridge_yuexing-pond',
      name: '月形池',
      i18nKey: 'qilai-east-ridge.yuexing-pond',
      nodeType: 'water-source'
    },
    {
      id: 'mountain_jingtanhao-pond-west-peak',
      name: '驚嘆號水池/西峰',
      i18nKey: 'mountain.jingtanhao-pond-west-peak',
      nodeType: 'peak'
    },
    {
      id: 'mountain_panshi-middle-peak',
      name: '磐石中峰',
      i18nKey: 'mountain.panshi-middle-peak',
      nodeType: 'peak'
    },
    {
      id: 'qilai-east-ridge_panshi-middle-peak-camp',
      name: '磐石中峰營地',
      i18nKey: 'qilai-east-ridge.panshi-middle-peak-camp',
      nodeType: 'camp'
    },
    {
      id: 'mountain_panshi-mountain',
      name: '磐石山',
      i18nKey: 'mountain.panshi-mountain',
      nodeType: 'peak'
    },
    // --- 鐵線斷崖至三岔營地 ---
    {
      id: 'qilai-east-ridge_tiexian-cliff-front-camp',
      name: '鐵線斷崖前營地',
      i18nKey: 'qilai-east-ridge.tiexian-cliff-front-camp',
      nodeType: 'camp'
    },
    {
      id: 'qilai-east-ridge_tiexian-cliff-back-camp',
      name: '鐵線斷崖後營地',
      i18nKey: 'qilai-east-ridge.tiexian-cliff-back-camp',
      nodeType: 'camp'
    },
    {
      id: 'qilai-east-ridge_shangxiapu-camp',
      name: '上下舖營地',
      i18nKey: 'qilai-east-ridge.shangxiapu-camp',
      nodeType: 'camp'
    },
    {
      id: 'mountain_3077-peak',
      name: '3077峰',
      i18nKey: 'mountain.3077-peak',
      nodeType: 'peak'
    },
    {
      id: 'qilai-east-ridge_sancha-camp',
      name: '三岔營地',
      i18nKey: 'qilai-east-ridge.sancha-camp',
      nodeType: 'camp'
    },
    {
      id: 'mountain_taroko-mountain',
      name: '太魯閣大山',
      i18nKey: 'mountain.taroko-mountain',
      nodeType: 'peak'
    },
    // --- 平安池至立霧主山 ---
    {
      id: 'qilai-east-ridge_pingan-pond',
      name: '平安池',
      i18nKey: 'qilai-east-ridge.pingan-pond',
      nodeType: 'water-source'
    },
    {
      id: 'qilai-east-ridge_2687-saddle-fork',
      name: '2687鞍三岔口',
      i18nKey: 'qilai-east-ridge.2687-saddle-fork',
      nodeType: 'fork'
    },
    {
      id: 'qilai-east-ridge_dalishi-camp',
      name: '大理石營地',
      i18nKey: 'qilai-east-ridge.dalishi-camp',
      nodeType: 'camp'
    },
    {
      id: 'mountain_liwuzhu-mountain',
      name: '立霧主山',
      i18nKey: 'mountain.liwuzhu-mountain',
      nodeType: 'peak'
    },
    // --- 沼澤營地至帕托魯山 ---
    {
      id: 'qilai-east-ridge_marsh-camp',
      name: '沼澤營地',
      i18nKey: 'qilai-east-ridge.marsh-camp',
      nodeType: 'camp'
    },
    {
      id: 'qilai-east-ridge_sancha-fork-camp',
      name: '三岔路口營地',
      i18nKey: 'qilai-east-ridge.sancha-fork-camp',
      nodeType: 'camp'
    },
    {
      id: 'mountain_patuolu-mountain',
      name: '帕托魯山',
      i18nKey: 'mountain.patuolu-mountain',
      nodeType: 'peak'
    },
    // --- 12K工寮至岳王亭 ---
    {
      id: 'qilai-east-ridge_12k-work-shed',
      name: '12K工寮',
      i18nKey: 'qilai-east-ridge.12k-work-shed',
      nodeType: 'other'
    },
    {
      id: 'qilai-east-ridge_9k-cement-work-shed',
      name: '9K水泥工寮',
      i18nKey: 'qilai-east-ridge.9k-cement-work-shed',
      nodeType: 'other'
    },
    {
      id: 'qilai-east-ridge_6k-gaorao-fork',
      name: '6K高繞岔路口',
      i18nKey: 'qilai-east-ridge.6k-gaorao-fork',
      nodeType: 'fork'
    },
    {
      id: 'qilai-east-ridge_jiangkou-mountain-fork',
      name: '江口山岔路口',
      i18nKey: 'qilai-east-ridge.jiangkou-mountain-fork',
      nodeType: 'fork'
    },
    {
      id: 'mountain_jiangkou-mountain',
      name: '江口山',
      i18nKey: 'mountain.jiangkou-mountain',
      nodeType: 'peak'
    },
    {
      id: 'qilai-east-ridge_3-8k-cableway-head',
      name: '3.8K流籠頭',
      i18nKey: 'qilai-east-ridge.3-8k-cableway-head',
      nodeType: 'other'
    },
    {
      id: 'qilai-east-ridge_1-cableway-head',
      name: '1號索道頭',
      i18nKey: 'qilai-east-ridge.1-cableway-head',
      nodeType: 'other'
    },
    {
      id: 'qilai-east-ridge_yuewang-pavilion',
      name: '岳王亭',
      i18nKey: 'qilai-east-ridge.yuewang-pavilion',
      nodeType: 'other'
    }
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
    // 奇萊主山北峰 <-> 月形池
    {
      from: 'mountain_qilai-north-peak',
      to: 'qilai-east-ridge_yuexing-pond',
      minutes: 80
    },
    {
      from: 'qilai-east-ridge_yuexing-pond',
      to: 'mountain_qilai-north-peak',
      minutes: 140
    },
    // 月形池 <-> 驚嘆號水池/西峰
    {
      from: 'qilai-east-ridge_yuexing-pond',
      to: 'mountain_jingtanhao-pond-west-peak',
      minutes: 110
    },
    {
      from: 'mountain_jingtanhao-pond-west-peak',
      to: 'qilai-east-ridge_yuexing-pond',
      minutes: 160
    },
    // 驚嘆號水池/西峰 <-> 磐石中峰
    {
      from: 'mountain_jingtanhao-pond-west-peak',
      to: 'mountain_panshi-middle-peak',
      minutes: 65
    },
    {
      from: 'mountain_panshi-middle-peak',
      to: 'mountain_jingtanhao-pond-west-peak',
      minutes: 75
    },
    // 磐石中峰 <-> 磐石中峰營地
    {
      from: 'mountain_panshi-middle-peak',
      to: 'qilai-east-ridge_panshi-middle-peak-camp',
      minutes: 5
    },
    {
      from: 'qilai-east-ridge_panshi-middle-peak-camp',
      to: 'mountain_panshi-middle-peak',
      minutes: 10
    },
    // 磐石中峰營地 <-> 磐石山
    {
      from: 'qilai-east-ridge_panshi-middle-peak-camp',
      to: 'mountain_panshi-mountain',
      minutes: 90
    },
    {
      from: 'mountain_panshi-mountain',
      to: 'qilai-east-ridge_panshi-middle-peak-camp',
      minutes: 100
    },
    // 磐石山 <-> 鐵線斷崖前營地
    {
      from: 'mountain_panshi-mountain',
      to: 'qilai-east-ridge_tiexian-cliff-front-camp',
      minutes: 55
    },
    {
      from: 'qilai-east-ridge_tiexian-cliff-front-camp',
      to: 'mountain_panshi-mountain',
      minutes: 65
    },
    // 鐵線斷崖前營地 <-> 鐵線斷崖後營地
    {
      from: 'qilai-east-ridge_tiexian-cliff-front-camp',
      to: 'qilai-east-ridge_tiexian-cliff-back-camp',
      minutes: 100
    },
    {
      from: 'qilai-east-ridge_tiexian-cliff-back-camp',
      to: 'qilai-east-ridge_tiexian-cliff-front-camp',
      minutes: 120
    },
    // 鐵線斷崖後營地 <-> 上下舖營地
    {
      from: 'qilai-east-ridge_tiexian-cliff-back-camp',
      to: 'qilai-east-ridge_shangxiapu-camp',
      minutes: 60
    },
    {
      from: 'qilai-east-ridge_shangxiapu-camp',
      to: 'qilai-east-ridge_tiexian-cliff-back-camp',
      minutes: 80
    },
    // 上下舖營地 <-> 3077峰
    {
      from: 'qilai-east-ridge_shangxiapu-camp',
      to: 'mountain_3077-peak',
      minutes: 100
    },
    {
      from: 'mountain_3077-peak',
      to: 'qilai-east-ridge_shangxiapu-camp',
      minutes: 130
    },
    // 3077峰 <-> 三岔營地
    {
      from: 'mountain_3077-peak',
      to: 'qilai-east-ridge_sancha-camp',
      minutes: 100
    },
    {
      from: 'qilai-east-ridge_sancha-camp',
      to: 'mountain_3077-peak',
      minutes: 130
    },
    // 三岔營地 <-> 太魯閣大山
    {
      from: 'qilai-east-ridge_sancha-camp',
      to: 'mountain_taroko-mountain',
      minutes: 100
    },
    {
      from: 'mountain_taroko-mountain',
      to: 'qilai-east-ridge_sancha-camp',
      minutes: 80
    },
    // 三岔營地 <-> 平安池
    {
      from: 'qilai-east-ridge_sancha-camp',
      to: 'qilai-east-ridge_pingan-pond',
      minutes: 200
    },
    {
      from: 'qilai-east-ridge_pingan-pond',
      to: 'qilai-east-ridge_sancha-camp',
      minutes: 260
    },
    // 平安池 <-> 2687鞍三岔口
    {
      from: 'qilai-east-ridge_pingan-pond',
      to: 'qilai-east-ridge_2687-saddle-fork',
      minutes: 70
    },
    {
      from: 'qilai-east-ridge_2687-saddle-fork',
      to: 'qilai-east-ridge_pingan-pond',
      minutes: 85
    },
    // 2687鞍三岔口 <-> 大理石營地
    {
      from: 'qilai-east-ridge_2687-saddle-fork',
      to: 'qilai-east-ridge_dalishi-camp',
      minutes: 130
    },
    {
      from: 'qilai-east-ridge_dalishi-camp',
      to: 'qilai-east-ridge_2687-saddle-fork',
      minutes: 100
    },
    // 大理石營地 <-> 立霧主山
    {
      from: 'qilai-east-ridge_dalishi-camp',
      to: 'mountain_liwuzhu-mountain',
      minutes: 25
    },
    {
      from: 'mountain_liwuzhu-mountain',
      to: 'qilai-east-ridge_dalishi-camp',
      minutes: 20
    },
    // 立霧主山 <-> 沼澤營地
    {
      from: 'mountain_liwuzhu-mountain',
      to: 'qilai-east-ridge_marsh-camp',
      minutes: 90
    },
    {
      from: 'qilai-east-ridge_marsh-camp',
      to: 'mountain_liwuzhu-mountain',
      minutes: 130
    },
    // 三岔路口營地 <-> 沼澤營地
    {
      from: 'qilai-east-ridge_sancha-fork-camp',
      to: 'qilai-east-ridge_marsh-camp',
      minutes: 140
    },
    {
      from: 'qilai-east-ridge_marsh-camp',
      to: 'qilai-east-ridge_sancha-fork-camp',
      minutes: 120
    },
    // 帕托魯山 <-> 三岔路口營地
    {
      from: 'mountain_patuolu-mountain',
      to: 'qilai-east-ridge_sancha-fork-camp',
      minutes: 105
    },
    {
      from: 'qilai-east-ridge_sancha-fork-camp',
      to: 'mountain_patuolu-mountain',
      minutes: 150
    },
    // 三岔路口營地 <-> 12K工寮
    {
      from: 'qilai-east-ridge_sancha-fork-camp',
      to: 'qilai-east-ridge_12k-work-shed',
      minutes: 100
    },
    {
      from: 'qilai-east-ridge_12k-work-shed',
      to: 'qilai-east-ridge_sancha-fork-camp',
      minutes: 140
    },
    // 12K工寮 <-> 9K水泥工寮
    {
      from: 'qilai-east-ridge_12k-work-shed',
      to: 'qilai-east-ridge_9k-cement-work-shed',
      minutes: 75
    },
    {
      from: 'qilai-east-ridge_9k-cement-work-shed',
      to: 'qilai-east-ridge_12k-work-shed',
      minutes: 80
    },
    // 9K水泥工寮 <-> 6K高繞岔路口
    {
      from: 'qilai-east-ridge_9k-cement-work-shed',
      to: 'qilai-east-ridge_6k-gaorao-fork',
      minutes: 75
    },
    {
      from: 'qilai-east-ridge_6k-gaorao-fork',
      to: 'qilai-east-ridge_9k-cement-work-shed',
      minutes: 80
    },
    // 6K高繞岔路口 <-> 江口山岔路口
    {
      from: 'qilai-east-ridge_6k-gaorao-fork',
      to: 'qilai-east-ridge_jiangkou-mountain-fork',
      minutes: 70
    },
    {
      from: 'qilai-east-ridge_jiangkou-mountain-fork',
      to: 'qilai-east-ridge_6k-gaorao-fork',
      minutes: 40
    },
    // 江口山岔路口 <-> 江口山
    {
      from: 'qilai-east-ridge_jiangkou-mountain-fork',
      to: 'mountain_jiangkou-mountain',
      minutes: 10
    },
    {
      from: 'mountain_jiangkou-mountain',
      to: 'qilai-east-ridge_jiangkou-mountain-fork',
      minutes: 5
    },
    // 江口山岔路口 <-> 3.8K流籠頭
    {
      from: 'qilai-east-ridge_jiangkou-mountain-fork',
      to: 'qilai-east-ridge_3-8k-cableway-head',
      minutes: 135
    },
    {
      from: 'qilai-east-ridge_3-8k-cableway-head',
      to: 'qilai-east-ridge_jiangkou-mountain-fork',
      minutes: 210
    },
    // 3.8K流籠頭 <-> 1號索道頭
    {
      from: 'qilai-east-ridge_3-8k-cableway-head',
      to: 'qilai-east-ridge_1-cableway-head',
      minutes: 80
    },
    {
      from: 'qilai-east-ridge_1-cableway-head',
      to: 'qilai-east-ridge_3-8k-cableway-head',
      minutes: 85
    },
    // 1號索道頭 <-> 岳王亭
    {
      from: 'qilai-east-ridge_1-cableway-head',
      to: 'qilai-east-ridge_yuewang-pavilion',
      minutes: 150
    },
    {
      from: 'qilai-east-ridge_yuewang-pavilion',
      to: 'qilai-east-ridge_1-cableway-head',
      minutes: 280
    }
  ]
}
