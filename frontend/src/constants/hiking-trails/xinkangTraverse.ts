import { type Trail } from '@/model/hikingTrail'

export const xinkangTraverse: Trail = {
  id: 'xinkang-traverse',
  name: '新康橫斷',
  nameEn: 'Xinkang Traverse',
  i18nKey: 'xinkang-traverse.xinkang-traverse',
  nodes: [
    // --- 向陽森林遊樂區至嘉明湖岔路口 ---
    {
      id: 'global_xiangyang-forest-recreation-area',
      name: '向陽森林遊樂區',
      i18nKey: 'global.xiangyang-forest-recreation-area',
      nodeType: 'other'
    },
    {
      id: 'global_lindao-trailhead',
      name: '林道登山口',
      i18nKey: 'global.lindao-trailhead',
      nodeType: 'fork'
    },
    {
      id: 'global_xiangyang-hut',
      name: '向陽山屋',
      i18nKey: 'global.xiangyang-hut',
      nodeType: 'hut'
    },
    {
      id: 'global_xice-trailhead',
      name: '西側登山口',
      i18nKey: 'global.xice-trailhead',
      nodeType: 'fork'
    },
    {
      id: 'mountain_xiangyang-mountain',
      name: '向陽山',
      i18nKey: 'mountain.xiangyang-mountain',
      nodeType: 'peak'
    },
    {
      id: 'global_jiaming-lake-hut',
      name: '嘉明湖避難山屋',
      i18nKey: 'global.jiaming-lake-hut',
      nodeType: 'hut'
    },
    {
      id: 'global_north-peak-fork',
      name: '三岔路口',
      i18nKey: 'global.north-peak-fork',
      nodeType: 'fork'
    },
    {
      id: 'global_north-peak-sign',
      name: '北峰下解說牌',
      i18nKey: 'global.north-peak-sign',
      nodeType: 'other'
    },
    {
      id: 'global_sancha-mountain-trailhead',
      name: '三叉山登山口',
      i18nKey: 'global.sancha-mountain-trailhead',
      nodeType: 'fork'
    },
    {
      id: 'global_jiaming-lake-fork',
      name: '嘉明湖岔路口',
      i18nKey: 'global.jiaming-lake-fork',
      nodeType: 'fork'
    },
    // --- 嘉明湖與戒茂斯山支線 ---
    {
      id: 'global_jiaming-lake',
      name: '嘉明湖',
      i18nKey: 'global.jiaming-lake',
      nodeType: 'water-source'
    },
    {
      id: 'xinkang-traverse_jiamingmei-pond',
      name: '嘉明妹池',
      i18nKey: 'xinkang-traverse.jiamingmei-pond',
      nodeType: 'water-source'
    },
    {
      id: 'xinkang-traverse_zuqiuchang-camp',
      name: '足球場營地',
      i18nKey: 'xinkang-traverse.zuqiuchang-camp',
      nodeType: 'camp'
    },
    {
      id: 'xinkang-traverse_xinwulu-river',
      name: '新武呂溪',
      i18nKey: 'xinkang-traverse.xinwulu-river',
      nodeType: 'water-source'
    },
    {
      id: 'xinkang-traverse_jiemaosi-mountain-fork',
      name: '岔路口',
      i18nKey: 'xinkang-traverse.jiemaosi-mountain-fork',
      nodeType: 'fork'
    },
    {
      id: 'mountain_jiemaosi-mountain',
      name: '戒茂斯山',
      i18nKey: 'mountain.jiemaosi-mountain',
      nodeType: 'peak'
    },
    {
      id: 'xinkang-traverse_jiemaosi-mountain-front-peak',
      name: '戒茂斯山前鋒',
      i18nKey: 'xinkang-traverse.jiemaosi-mountain-front-peak',
      nodeType: 'other'
    },
    {
      id: 'xinkang-traverse_156-5k-trailhead',
      name: '156.5K登山口',
      i18nKey: 'xinkang-traverse.156-5k-trailhead',
      nodeType: 'fork'
    },
    {
      id: 'mountain_sancha-mountain',
      name: '三叉山',
      i18nKey: 'mountain.sancha-mountain',
      nodeType: 'peak'
    },
    // --- 新康山岔路口與拉庫音溪山屋 ---
    {
      id: 'global_xinkang-mountain-fork',
      name: '新康山岔路口',
      i18nKey: 'global.xinkang-mountain-fork',
      nodeType: 'fork'
    },
    {
      id: 'global_lakuyin-river-hut',
      name: '拉庫音溪山屋',
      i18nKey: 'global.lakuyin-river-hut',
      nodeType: 'hut'
    },
    // --- 布新岔路口與布拉克桑山支線 ---
    {
      id: 'xinkang-traverse_buxin-fork',
      name: '布新岔路口',
      i18nKey: 'xinkang-traverse.buxin-fork',
      nodeType: 'fork'
    },
    {
      id: 'xinkang-traverse_sanchalengxia-camp',
      name: '三叉稜下營地',
      i18nKey: 'xinkang-traverse.sanchalengxia-camp',
      nodeType: 'camp'
    },
    {
      id: 'xinkang-traverse_caoyuan-dawa-depression',
      name: '草原大窪地',
      i18nKey: 'xinkang-traverse.caoyuan-dawa-depression',
      nodeType: 'other'
    },
    {
      id: 'xinkang-traverse_2835-saddle',
      name: '2835鞍部',
      i18nKey: 'xinkang-traverse.2835-saddle',
      nodeType: 'fork'
    },
    {
      id: 'mountain_bulakesang-mountain',
      name: '布拉克桑山',
      i18nKey: 'mountain.bulakesang-mountain',
      nodeType: 'peak'
    },
    // --- 3058公尺峰至新康山 ---
    {
      id: 'mountain_3058-meter-peak',
      name: '3058公尺峰',
      i18nKey: 'mountain.3058-meter-peak',
      nodeType: 'peak'
    },
    {
      id: 'xinkang-traverse_lianli-west-peak-front-camp',
      name: '連理西峰前營地',
      i18nKey: 'xinkang-traverse.lianli-west-peak-front-camp',
      nodeType: 'camp'
    },
    {
      id: 'xinkang-traverse_west-peak-east-ridge-platform',
      name: '西峰東稜平台',
      i18nKey: 'xinkang-traverse.west-peak-east-ridge-platform',
      nodeType: 'other'
    },
    {
      id: 'xinkang-traverse_plane-wreckage',
      name: '飛機殘骸',
      i18nKey: 'xinkang-traverse.plane-wreckage',
      nodeType: 'other'
    },
    {
      id: 'xinkang-traverse_taoyuan-camp',
      name: '桃源營地',
      i18nKey: 'xinkang-traverse.taoyuan-camp',
      nodeType: 'camp'
    },
    {
      id: 'xinkang-traverse_shanbi-water-source',
      name: '山壁水源',
      i18nKey: 'xinkang-traverse.shanbi-water-source',
      nodeType: 'water-source'
    },
    {
      id: 'mountain_lianli-mountain',
      name: '連理山',
      i18nKey: 'mountain.lianli-mountain',
      nodeType: 'peak'
    },
    {
      id: 'xinkang-traverse_saddle-heishui-pond',
      name: '鞍部黑水塘',
      i18nKey: 'xinkang-traverse.saddle-heishui-pond',
      nodeType: 'water-source'
    },
    {
      id: 'xinkang-traverse_xinxian-mountain-front-camp',
      name: '新仙山前營地',
      i18nKey: 'xinkang-traverse.xinxian-mountain-front-camp',
      nodeType: 'camp'
    },
    {
      id: 'xinkang-traverse_xinxian-mountain-camp-fork',
      name: '新仙山營地·三岔路口',
      i18nKey: 'xinkang-traverse.xinxian-mountain-camp-fork',
      nodeType: 'fork'
    },
    {
      id: 'xinkang-traverse_songzhen-camp',
      name: '松針營地',
      i18nKey: 'xinkang-traverse.songzhen-camp',
      nodeType: 'camp'
    },
    {
      id: 'xinkang-traverse_xiaqie-point',
      name: '下切點',
      i18nKey: 'xinkang-traverse.xiaqie-point',
      nodeType: 'other'
    },
    {
      id: 'xinkang-traverse_xinkang-mountain-trailhead',
      name: '新康山登山口',
      i18nKey: 'xinkang-traverse.xinkang-mountain-trailhead',
      nodeType: 'fork'
    },
    {
      id: 'xinkang-traverse_baoya-hut',
      name: '抱崖山屋',
      i18nKey: 'xinkang-traverse.baoya-hut',
      nodeType: 'hut'
    },
    {
      id: 'xinkang-traverse_walami-hut',
      name: '瓦拉米山屋',
      i18nKey: 'xinkang-traverse.walami-hut',
      nodeType: 'hut'
    },
    {
      id: 'xinkang-traverse_walami-trail-start',
      name: '瓦拉米步道起點',
      i18nKey: 'xinkang-traverse.walami-trail-start',
      nodeType: 'other'
    },
    {
      id: 'mountain_xinxian-mountain',
      name: '新仙山',
      i18nKey: 'mountain.xinxian-mountain',
      nodeType: 'peak'
    },
    {
      id: 'xinkang-traverse_zuidi-saddle',
      name: '最低鞍部',
      i18nKey: 'xinkang-traverse.zuidi-saddle',
      nodeType: 'fork'
    },
    {
      id: 'mountain_xinkang-mountain',
      name: '新康山',
      i18nKey: 'mountain.xinkang-mountain',
      nodeType: 'peak'
    },
    {
      id: 'xinkang-traverse_tiangong-fortress',
      name: '天宮堡壘',
      i18nKey: 'xinkang-traverse.tiangong-fortress',
      nodeType: 'other'
    },
    // --- 其他 ---
    {
      id: 'global_pass-hut',
      name: '埡口山莊',
      i18nKey: 'global.pass-hut',
      nodeType: 'hut'
    }
  ],
  edges: [
    // 向陽森林遊樂區 <-> 林道登山口
    {
      from: 'global_xiangyang-forest-recreation-area',
      to: 'global_lindao-trailhead',
      minutes: 80
    },
    {
      from: 'global_lindao-trailhead',
      to: 'global_xiangyang-forest-recreation-area',
      minutes: 50
    },
    // 林道登山口 <-> 向陽山屋
    {
      from: 'global_lindao-trailhead',
      to: 'global_xiangyang-hut',
      minutes: 70
    },
    {
      from: 'global_xiangyang-hut',
      to: 'global_lindao-trailhead',
      minutes: 40
    },
    // 向陽山屋 <-> 西側登山口
    {
      from: 'global_xiangyang-hut',
      to: 'global_xice-trailhead',
      minutes: 180
    },
    {
      from: 'global_xice-trailhead',
      to: 'global_xiangyang-hut',
      minutes: 130
    },
    // 西側登山口 <-> 向陽山
    {
      from: 'global_xice-trailhead',
      to: 'mountain_xiangyang-mountain',
      minutes: 35
    },
    {
      from: 'mountain_xiangyang-mountain',
      to: 'global_xice-trailhead',
      minutes: 25
    },
    // 向陽山 <-> 三岔路口
    {
      from: 'mountain_xiangyang-mountain',
      to: 'global_north-peak-fork',
      minutes: 45
    },
    {
      from: 'global_north-peak-fork',
      to: 'mountain_xiangyang-mountain',
      minutes: 60
    },
    // 西側登山口 <-> 嘉明湖避難山屋
    {
      from: 'global_xice-trailhead',
      to: 'global_jiaming-lake-hut',
      minutes: 40
    },
    {
      from: 'global_jiaming-lake-hut',
      to: 'global_xice-trailhead',
      minutes: 45
    },
    // 嘉明湖避難山屋 <-> 三岔路口
    {
      from: 'global_jiaming-lake-hut',
      to: 'global_north-peak-fork',
      minutes: 15
    },
    {
      from: 'global_north-peak-fork',
      to: 'global_jiaming-lake-hut',
      minutes: 15
    },
    // 三岔路口 <-> 北峰下解說牌
    {
      from: 'global_north-peak-fork',
      to: 'global_north-peak-sign',
      minutes: 40
    },
    {
      from: 'global_north-peak-sign',
      to: 'global_north-peak-fork',
      minutes: 35
    },
    // 北峰下解說牌 <-> 三叉山登山口
    {
      from: 'global_north-peak-sign',
      to: 'global_sancha-mountain-trailhead',
      minutes: 80
    },
    {
      from: 'global_sancha-mountain-trailhead',
      to: 'global_north-peak-sign',
      minutes: 55
    },
    // 三叉山登山口 <-> 嘉明湖岔路口
    {
      from: 'global_sancha-mountain-trailhead',
      to: 'global_jiaming-lake-fork',
      minutes: 30
    },
    {
      from: 'global_jiaming-lake-fork',
      to: 'global_sancha-mountain-trailhead',
      minutes: 25
    },
    // 三叉山登山口 <-> 三叉山
    {
      from: 'global_sancha-mountain-trailhead',
      to: 'mountain_sancha-mountain',
      minutes: 25
    },
    {
      from: 'mountain_sancha-mountain',
      to: 'global_sancha-mountain-trailhead',
      minutes: 15
    },
    // 嘉明湖岔路口 <-> 三叉山
    {
      from: 'global_jiaming-lake-fork',
      to: 'mountain_sancha-mountain',
      minutes: 20
    },
    {
      from: 'mountain_sancha-mountain',
      to: 'global_jiaming-lake-fork',
      minutes: 10
    },
    // 嘉明湖岔路口 <-> 嘉明湖
    {
      from: 'global_jiaming-lake-fork',
      to: 'global_jiaming-lake',
      minutes: 15
    },
    {
      from: 'global_jiaming-lake',
      to: 'global_jiaming-lake-fork',
      minutes: 20
    },
    // 嘉明湖 <-> 嘉明妹池
    {
      from: 'global_jiaming-lake',
      to: 'xinkang-traverse_jiamingmei-pond',
      minutes: 70
    },
    {
      from: 'xinkang-traverse_jiamingmei-pond',
      to: 'global_jiaming-lake',
      minutes: 110
    },
    // 嘉明妹池 <-> 足球場營地
    {
      from: 'xinkang-traverse_jiamingmei-pond',
      to: 'xinkang-traverse_zuqiuchang-camp',
      minutes: 120
    },
    {
      from: 'xinkang-traverse_zuqiuchang-camp',
      to: 'xinkang-traverse_jiamingmei-pond',
      minutes: 190
    },
    // 足球場營地 <-> 新武呂溪
    {
      from: 'xinkang-traverse_zuqiuchang-camp',
      to: 'xinkang-traverse_xinwulu-river',
      minutes: 120
    },
    {
      from: 'xinkang-traverse_xinwulu-river',
      to: 'xinkang-traverse_zuqiuchang-camp',
      minutes: 210
    },
    // 新武呂溪 <-> 岔路口
    {
      from: 'xinkang-traverse_xinwulu-river',
      to: 'xinkang-traverse_jiemaosi-mountain-fork',
      minutes: 100
    },
    {
      from: 'xinkang-traverse_jiemaosi-mountain-fork',
      to: 'xinkang-traverse_xinwulu-river',
      minutes: 70
    },
    // 岔路口 <-> 戒茂斯山
    {
      from: 'xinkang-traverse_jiemaosi-mountain-fork',
      to: 'mountain_jiemaosi-mountain',
      minutes: 10
    },
    {
      from: 'mountain_jiemaosi-mountain',
      to: 'xinkang-traverse_jiemaosi-mountain-fork',
      minutes: 10
    },
    // 岔路口 <-> 戒茂斯山前鋒
    {
      from: 'xinkang-traverse_jiemaosi-mountain-fork',
      to: 'xinkang-traverse_jiemaosi-mountain-front-peak',
      minutes: 80
    },
    {
      from: 'xinkang-traverse_jiemaosi-mountain-front-peak',
      to: 'xinkang-traverse_jiemaosi-mountain-fork',
      minutes: 120
    },
    // 戒茂斯山前鋒 <-> 156.5K登山口
    {
      from: 'xinkang-traverse_jiemaosi-mountain-front-peak',
      to: 'xinkang-traverse_156-5k-trailhead',
      minutes: 25
    },
    {
      from: 'xinkang-traverse_156-5k-trailhead',
      to: 'xinkang-traverse_jiemaosi-mountain-front-peak',
      minutes: 40
    },
    // 嘉明湖岔路口 <-> 新康山岔路口
    {
      from: 'global_jiaming-lake-fork',
      to: 'global_xinkang-mountain-fork',
      minutes: 40
    },
    {
      from: 'global_xinkang-mountain-fork',
      to: 'global_jiaming-lake-fork',
      minutes: 30
    },
    // 新康山岔路口 <-> 拉庫音溪山屋
    {
      from: 'global_xinkang-mountain-fork',
      to: 'global_lakuyin-river-hut',
      minutes: 130
    },
    {
      from: 'global_lakuyin-river-hut',
      to: 'global_xinkang-mountain-fork',
      minutes: 220
    },
    // 新康山岔路口 <-> 布新岔路口
    {
      from: 'global_xinkang-mountain-fork',
      to: 'xinkang-traverse_buxin-fork',
      minutes: 70
    },
    {
      from: 'xinkang-traverse_buxin-fork',
      to: 'global_xinkang-mountain-fork',
      minutes: 80
    },
    // 布新岔路口 <-> 三叉稜下營地
    {
      from: 'xinkang-traverse_buxin-fork',
      to: 'xinkang-traverse_sanchalengxia-camp',
      minutes: 8
    },
    {
      from: 'xinkang-traverse_sanchalengxia-camp',
      to: 'xinkang-traverse_buxin-fork',
      minutes: 15
    },
    // 三叉稜下營地 <-> 草原大窪地
    {
      from: 'xinkang-traverse_sanchalengxia-camp',
      to: 'xinkang-traverse_caoyuan-dawa-depression',
      minutes: 110
    },
    {
      from: 'xinkang-traverse_caoyuan-dawa-depression',
      to: 'xinkang-traverse_sanchalengxia-camp',
      minutes: 140
    },
    // 草原大窪地 <-> 2835鞍部
    {
      from: 'xinkang-traverse_caoyuan-dawa-depression',
      to: 'xinkang-traverse_2835-saddle',
      minutes: 90
    },
    {
      from: 'xinkang-traverse_2835-saddle',
      to: 'xinkang-traverse_caoyuan-dawa-depression',
      minutes: 120
    },
    // 2835鞍部 <-> 布拉克桑山
    {
      from: 'xinkang-traverse_2835-saddle',
      to: 'mountain_bulakesang-mountain',
      minutes: 30
    },
    {
      from: 'mountain_bulakesang-mountain',
      to: 'xinkang-traverse_2835-saddle',
      minutes: 20
    },
    // 布新岔路口 <-> 3058公尺峰
    {
      from: 'xinkang-traverse_buxin-fork',
      to: 'mountain_3058-meter-peak',
      minutes: 80
    },
    {
      from: 'mountain_3058-meter-peak',
      to: 'xinkang-traverse_buxin-fork',
      minutes: 90
    },
    // 3058公尺峰 <-> 連理西峰前營地
    {
      from: 'mountain_3058-meter-peak',
      to: 'xinkang-traverse_lianli-west-peak-front-camp',
      minutes: 50
    },
    {
      from: 'xinkang-traverse_lianli-west-peak-front-camp',
      to: 'mountain_3058-meter-peak',
      minutes: 40
    },
    // 連理西峰前營地 <-> 西峰東稜平台
    {
      from: 'xinkang-traverse_lianli-west-peak-front-camp',
      to: 'xinkang-traverse_west-peak-east-ridge-platform',
      minutes: 40
    },
    {
      from: 'xinkang-traverse_west-peak-east-ridge-platform',
      to: 'xinkang-traverse_lianli-west-peak-front-camp',
      minutes: 40
    },
    // 西峰東稜平台 <-> 飛機殘骸
    {
      from: 'xinkang-traverse_west-peak-east-ridge-platform',
      to: 'xinkang-traverse_plane-wreckage',
      minutes: 80
    },
    {
      from: 'xinkang-traverse_plane-wreckage',
      to: 'xinkang-traverse_west-peak-east-ridge-platform',
      minutes: 120
    },
    // 飛機殘骸 <-> 桃源營地
    {
      from: 'xinkang-traverse_plane-wreckage',
      to: 'xinkang-traverse_taoyuan-camp',
      minutes: 60
    },
    {
      from: 'xinkang-traverse_taoyuan-camp',
      to: 'xinkang-traverse_plane-wreckage',
      minutes: 70
    },
    // 桃源營地 <-> 山壁水源
    {
      from: 'xinkang-traverse_taoyuan-camp',
      to: 'xinkang-traverse_shanbi-water-source',
      minutes: 20
    },
    {
      from: 'xinkang-traverse_shanbi-water-source',
      to: 'xinkang-traverse_taoyuan-camp',
      minutes: 30
    },
    // 桃源營地 <-> 連理山
    {
      from: 'xinkang-traverse_taoyuan-camp',
      to: 'mountain_lianli-mountain',
      minutes: 130
    },
    {
      from: 'mountain_lianli-mountain',
      to: 'xinkang-traverse_taoyuan-camp',
      minutes: 90
    },
    // 連理山 <-> 鞍部黑水塘
    {
      from: 'mountain_lianli-mountain',
      to: 'xinkang-traverse_saddle-heishui-pond',
      minutes: 65
    },
    {
      from: 'xinkang-traverse_saddle-heishui-pond',
      to: 'mountain_lianli-mountain',
      minutes: 110
    },
    // 鞍部黑水塘 <-> 新仙山前營地
    {
      from: 'xinkang-traverse_saddle-heishui-pond',
      to: 'xinkang-traverse_xinxian-mountain-front-camp',
      minutes: 45
    },
    {
      from: 'xinkang-traverse_xinxian-mountain-front-camp',
      to: 'xinkang-traverse_saddle-heishui-pond',
      minutes: 25
    },
    // 新仙山前營地 <-> 新仙山營地·三岔路口
    {
      from: 'xinkang-traverse_xinxian-mountain-front-camp',
      to: 'xinkang-traverse_xinxian-mountain-camp-fork',
      minutes: 20
    },
    {
      from: 'xinkang-traverse_xinxian-mountain-camp-fork',
      to: 'xinkang-traverse_xinxian-mountain-front-camp',
      minutes: 15
    },
    // 新仙山營地·三岔路口 <-> 松針營地
    {
      from: 'xinkang-traverse_xinxian-mountain-camp-fork',
      to: 'xinkang-traverse_songzhen-camp',
      minutes: 70
    },
    {
      from: 'xinkang-traverse_songzhen-camp',
      to: 'xinkang-traverse_xinxian-mountain-camp-fork',
      minutes: 120
    },
    // 松針營地 <-> 下切點
    {
      from: 'xinkang-traverse_songzhen-camp',
      to: 'xinkang-traverse_xiaqie-point',
      minutes: 40
    },
    {
      from: 'xinkang-traverse_xiaqie-point',
      to: 'xinkang-traverse_songzhen-camp',
      minutes: 60
    },
    // 下切點 <-> 新康山登山口
    {
      from: 'xinkang-traverse_xiaqie-point',
      to: 'xinkang-traverse_xinkang-mountain-trailhead',
      minutes: 140
    },
    {
      from: 'xinkang-traverse_xinkang-mountain-trailhead',
      to: 'xinkang-traverse_xiaqie-point',
      minutes: 280
    },
    // 新康山登山口 <-> 抱崖山屋
    {
      from: 'xinkang-traverse_xinkang-mountain-trailhead',
      to: 'xinkang-traverse_baoya-hut',
      minutes: 50
    },
    {
      from: 'xinkang-traverse_baoya-hut',
      to: 'xinkang-traverse_xinkang-mountain-trailhead',
      minutes: 55
    },
    // 抱崖山屋 <-> 瓦拉米山屋
    {
      from: 'xinkang-traverse_baoya-hut',
      to: 'xinkang-traverse_walami-hut',
      minutes: 305
    },
    {
      from: 'xinkang-traverse_walami-hut',
      to: 'xinkang-traverse_baoya-hut',
      minutes: 345
    },
    // 瓦拉米山屋 <-> 瓦拉米步道起點
    {
      from: 'xinkang-traverse_walami-hut',
      to: 'xinkang-traverse_walami-trail-start',
      minutes: 295
    },
    {
      from: 'xinkang-traverse_walami-trail-start',
      to: 'xinkang-traverse_walami-hut',
      minutes: 335
    },
    // 新仙山營地·三岔路口 <-> 新仙山
    {
      from: 'xinkang-traverse_xinxian-mountain-camp-fork',
      to: 'mountain_xinxian-mountain',
      minutes: 1
    },
    {
      from: 'mountain_xinxian-mountain',
      to: 'xinkang-traverse_xinxian-mountain-camp-fork',
      minutes: 1
    },
    // 新仙山 <-> 最低鞍部
    {
      from: 'mountain_xinxian-mountain',
      to: 'xinkang-traverse_zuidi-saddle',
      minutes: 70
    },
    {
      from: 'xinkang-traverse_zuidi-saddle',
      to: 'mountain_xinxian-mountain',
      minutes: 90
    },
    // 最低鞍部 <-> 新康山
    {
      from: 'xinkang-traverse_zuidi-saddle',
      to: 'mountain_xinkang-mountain',
      minutes: 75
    },
    {
      from: 'mountain_xinkang-mountain',
      to: 'xinkang-traverse_zuidi-saddle',
      minutes: 60
    },
    // 新康山 <-> 天宮堡壘
    {
      from: 'mountain_xinkang-mountain',
      to: 'xinkang-traverse_tiangong-fortress',
      minutes: 25
    },
    {
      from: 'xinkang-traverse_tiangong-fortress',
      to: 'mountain_xinkang-mountain',
      minutes: 25
    }
  ]
}
