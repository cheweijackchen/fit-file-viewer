import { type Trail } from '@/model/hikingTrail'

export const maboTraverse: Trail = {
  id: 'mabo-traverse',
  name: '馬博橫斷',
  nameEn: 'Mabolasi Traverse',
  i18nKey: 'mabo-traverse.mabo-traverse',
  nodes: [
    // --- 八通關古道：東埔溫泉 → 八通關山登山口（共用節點） ---
    {
      id: 'global_dongpu-spring',
      name: '東埔溫泉',
      i18nKey: 'global.dongpu-spring',
      nodeType: 'other'
    },
    {
      id: 'global_batongguan-trailhead',
      name: '八通關登山口',
      i18nKey: 'global.batongguan-trailhead',
      nodeType: 'fork'
    },
    {
      id: 'global_sanshenggong',
      name: '三聖宮',
      i18nKey: 'global.sanshenggong',
      nodeType: 'other'
    },
    {
      id: 'global_lele-spring-fork',
      name: '樂樂溫泉岔路',
      i18nKey: 'global.lele-spring-fork',
      nodeType: 'fork'
    },
    {
      id: 'global_yunlong-fall',
      name: '雲龍瀑布',
      i18nKey: 'global.yunlong-fall',
      nodeType: 'water-source'
    },
    {
      id: 'global_lele-hut',
      name: '樂樂山屋',
      i18nKey: 'global.lele-hut',
      nodeType: 'hut'
    },
    {
      id: 'global_yinv-fall',
      name: '乙女瀑布',
      i18nKey: 'global.yinv-fall',
      nodeType: 'water-source'
    },
    {
      id: 'global_duiguan',
      name: '對觀',
      i18nKey: 'global.duiguan',
      nodeType: 'other'
    },
    {
      id: 'global_guangao-ping',
      name: '觀高坪',
      i18nKey: 'global.guangao-ping',
      nodeType: 'fork'
    },
    {
      id: 'global_guangao-station',
      name: '觀高登山服務站',
      i18nKey: 'global.guangao-station',
      nodeType: 'hut'
    },
    {
      id: 'global_gudaobengduan-fork',
      name: '古道崩斷岔路',
      i18nKey: 'global.gudaobengduan-fork',
      nodeType: 'fork'
    },
    {
      id: 'global_xishui-camp',
      name: '溪水營地',
      i18nKey: 'global.xishui-camp',
      nodeType: 'camp'
    },
    {
      id: 'global_west-peak-fork',
      name: '西峰岔路',
      i18nKey: 'global.west-peak-fork',
      nodeType: 'fork'
    },
    {
      id: 'mountain_batongguan-west-peak',
      name: '八通關山西峰',
      i18nKey: 'mountain.batongguan-west-peak',
      nodeType: 'peak'
    },
    {
      id: 'global_batongguan-mountain-fork',
      name: '三岔路口',
      i18nKey: 'global.batongguan-mountain-fork',
      nodeType: 'fork'
    },
    {
      id: 'mountain_batongguan-mountain',
      name: '八通關山',
      i18nKey: 'mountain.batongguan-mountain',
      nodeType: 'peak'
    },
    {
      id: 'global_batongguan-meadow',
      name: '八通關草原',
      i18nKey: 'global.batongguan-meadow',
      nodeType: 'camp'
    },
    {
      id: 'global_batongguan-mountain-trailhead',
      name: '八通關山登山口',
      i18nKey: 'global.batongguan-mountain-trailhead',
      nodeType: 'fork'
    },
    // --- 巴奈伊克山屋／荖濃溪／大水窟山支線（沿用南二段節點） ---
    {
      id: 'global_banaiyike-hut',
      name: '巴奈伊克山屋',
      i18nKey: 'global.banaiyike-hut',
      nodeType: 'hut'
    },
    {
      id: 'global_banaiyike-fork',
      name: '三岔路口',
      i18nKey: 'global.banaiyike-fork',
      nodeType: 'fork'
    },
    {
      id: 'global_laonong-river',
      name: '荖濃溪',
      i18nKey: 'global.laonong-river',
      nodeType: 'water-source'
    },
    {
      id: 'global_lengxian-fork',
      name: '稜線岔路',
      i18nKey: 'global.lengxian-fork',
      nodeType: 'fork'
    },
    {
      id: 'global_rhododendron-camp',
      name: '杜鵑營地',
      i18nKey: 'global.rhododendron-camp',
      nodeType: 'camp'
    },
    {
      id: 'global_rhododendron-fork',
      name: '四岔路口',
      i18nKey: 'global.rhododendron-fork',
      nodeType: 'fork'
    },
    {
      id: 'global_nan-camp',
      name: '南營地',
      i18nKey: 'global.nan-camp',
      nodeType: 'camp'
    },
    {
      id: 'global_dashuiku-hut',
      name: '大水窟山屋',
      i18nKey: 'global.dashuiku-hut',
      nodeType: 'hut'
    },
    {
      id: 'mountain_dashuiku-mountain',
      name: '大水窟山',
      i18nKey: 'mountain.dashuiku-mountain',
      nodeType: 'peak'
    },
    {
      id: 'global_zhongyangjinkuang-hut',
      name: '中央金礦山屋',
      i18nKey: 'global.zhongyangjinkuang-hut',
      nodeType: 'hut'
    },
    // --- 金礦山屋至秀姑巒山 ---
    {
      id: 'global_baiyangjinkuang-hut',
      name: '白洋金礦山屋',
      i18nKey: 'global.baiyangjinkuang-hut',
      nodeType: 'hut'
    },
    {
      id: 'global_xiuguping-fork',
      name: '秀姑坪岔路',
      i18nKey: 'global.xiuguping-fork',
      nodeType: 'fork'
    },
    {
      id: 'global_xiuguluan-mountain-south-trailhead',
      name: '秀姑巒山南登山口',
      i18nKey: 'global.xiuguluan-mountain-south-trailhead',
      nodeType: 'fork'
    },
    {
      id: 'mountain_xiuguluan-mountain',
      name: '秀姑巒山',
      i18nKey: 'mountain.xiuguluan-mountain',
      nodeType: 'peak'
    },
    {
      id: 'global_xiuma-hut-ruins',
      name: '秀馬山屋舊址',
      i18nKey: 'global.xiuma-hut-ruins',
      nodeType: 'camp'
    },
    {
      id: 'mabo-traverse_mabo-zuidi-saddle',
      name: '最低鞍部',
      i18nKey: 'mabo-traverse.mabo-zuidi-saddle',
      nodeType: 'fork'
    },
    // --- 馬博前岔路與馬博拉斯山周邊 ---
    {
      id: 'mabo-traverse_mabo-front-fork',
      name: '馬博前岔路',
      i18nKey: 'mabo-traverse.mabo-front-fork',
      nodeType: 'fork'
    },
    {
      id: 'mountain_mabolasi-mountain',
      name: '馬博拉斯山',
      i18nKey: 'mountain.mabolasi-mountain',
      nodeType: 'peak'
    },
    {
      id: 'mountain_penju-south-peak',
      name: '盆駒山南峰',
      i18nKey: 'mountain.penju-south-peak',
      nodeType: 'peak'
    },
    {
      id: 'mabo-traverse_2950-saddle-fork',
      name: '2950鞍岔路',
      i18nKey: 'mabo-traverse.2950-saddle-fork',
      nodeType: 'fork'
    },
    {
      id: 'mountain_penju-mountain',
      name: '盆駒山',
      i18nKey: 'mountain.penju-mountain',
      nodeType: 'peak'
    },
    {
      id: 'mabo-traverse_mabolasi-hut',
      name: '馬博拉斯山屋',
      i18nKey: 'mabo-traverse.mabolasi-hut',
      nodeType: 'hut'
    },
    {
      id: 'mountain_maliyawenlu-mountain',
      name: '馬利亞文路山',
      i18nKey: 'mountain.maliyawenlu-mountain',
      nodeType: 'peak'
    },
    // --- 馬利亞文路山至馬利加南山 ---
    {
      id: 'mountain_maliyawenlu-east-peak',
      name: '馬利亞文路山東峰',
      i18nKey: 'mountain.maliyawenlu-east-peak',
      nodeType: 'peak'
    },
    {
      id: 'mabo-traverse_malijiannan-zuidi-saddle',
      name: '最低鞍部',
      i18nKey: 'mabo-traverse.malijiannan-zuidi-saddle',
      nodeType: 'fork'
    },
    {
      id: 'mountain_malijiannan-mountain',
      name: '馬利加南山',
      i18nKey: 'mountain.malijiannan-mountain',
      nodeType: 'peak'
    },
    {
      id: 'global_malijiannan-east-peak-hut',
      name: '馬利加南東峰山屋',
      i18nKey: 'global.malijiannan-east-peak-hut',
      nodeType: 'hut'
    },
    {
      id: 'mountain_malijiannan-east-peak',
      name: '馬利加南山東峰',
      i18nKey: 'mountain.malijiannan-east-peak',
      nodeType: 'peak'
    },
    {
      id: 'mountain_3191-meter-peak',
      name: '3191公尺峰',
      i18nKey: 'mountain.3191-meter-peak',
      nodeType: 'peak'
    },
    {
      id: 'global_mabu-valley-hut',
      name: '馬布谷山屋',
      i18nKey: 'global.mabu-valley-hut',
      nodeType: 'hut'
    },
    {
      id: 'mountain_bugan-mountain',
      name: '布干山',
      i18nKey: 'mountain.bugan-mountain',
      nodeType: 'peak'
    },
    // --- 馬布谷山屋、布干山 ---
    {
      id: 'mabo-traverse_maxi-mountain-trailhead',
      name: '馬西山登山口',
      i18nKey: 'mabo-traverse.maxi-mountain-trailhead',
      nodeType: 'fork'
    },
    {
      id: 'mountain_maxi-mountain',
      name: '馬西山',
      i18nKey: 'mountain.maxi-mountain',
      nodeType: 'peak'
    },
    // --- 馬西山至喀西帕南山 ---
    {
      id: 'mabo-traverse_kaxipanan-fork-trailhead',
      name: '岔路登山口',
      i18nKey: 'mabo-traverse.kaxipanan-fork-trailhead',
      nodeType: 'fork'
    },
    {
      id: 'mountain_kaxipanan-mountain',
      name: '喀西帕南山',
      i18nKey: 'mountain.kaxipanan-mountain',
      nodeType: 'peak'
    },
    {
      id: 'mabo-traverse_kaxipanan-mountain-trailhead',
      name: '喀西帕南山登山口',
      i18nKey: 'mabo-traverse.kaxipanan-mountain-trailhead',
      nodeType: 'fork'
    },
    {
      id: 'global_taipinggu-nan-exit',
      name: '太平谷南口',
      i18nKey: 'global.taipinggu-nan-exit',
      nodeType: 'other'
    },
    {
      id: 'mabo-traverse_taipinggu-dongbei-exit',
      name: '太平谷東北口',
      i18nKey: 'mabo-traverse.taipinggu-dongbei-exit',
      nodeType: 'other'
    },
    // --- 太平谷至中平林道（44K 至 16.5K） ---
    {
      id: 'mabo-traverse_44k-forest-road-end',
      name: '44K林道盡頭',
      i18nKey: 'mabo-traverse.44k-forest-road-end',
      nodeType: 'other'
    },
    {
      id: 'mabo-traverse_43k-abandoned-work-shed',
      name: '43K廢棄工寮',
      i18nKey: 'mabo-traverse.43k-abandoned-work-shed',
      nodeType: 'camp'
    },
    {
      id: 'mabo-traverse_shortcut-descent-point',
      name: '捷徑下切點',
      i18nKey: 'mabo-traverse.shortcut-descent-point',
      nodeType: 'other'
    },
    {
      id: 'mabo-traverse_abandoned-generator',
      name: '廢棄發電機',
      i18nKey: 'mabo-traverse.abandoned-generator',
      nodeType: 'other'
    },
    {
      id: 'mabo-traverse_35k-work-shed-fork',
      name: '岔路',
      i18nKey: 'mabo-traverse.35k-work-shed-fork',
      nodeType: 'fork'
    },
    {
      id: 'mabo-traverse_35k-abandoned-work-shed',
      name: '35K廢棄工寮',
      i18nKey: 'mabo-traverse.35k-abandoned-work-shed',
      nodeType: 'camp'
    },
    {
      id: 'mabo-traverse_forest-road-yulin-bridge-descent-point',
      name: '林道玉林橋下切點',
      i18nKey: 'mabo-traverse.forest-road-yulin-bridge-descent-point',
      nodeType: 'other'
    },
    {
      id: 'global_descent-streambed-point',
      name: '下切溪床點',
      i18nKey: 'global.descent-streambed-point',
      nodeType: 'other'
    },
    {
      id: 'mabo-traverse_dashi-fanbu-camp',
      name: '大石帆布營地',
      i18nKey: 'mabo-traverse.dashi-fanbu-camp',
      nodeType: 'camp'
    },
    {
      id: 'mabo-traverse_valley-ascent-point',
      name: '溪谷上切處',
      i18nKey: 'mabo-traverse.valley-ascent-point',
      nodeType: 'other'
    },
    {
      id: 'mabo-traverse_forest-road-collapse-point',
      name: '林道崩毀處',
      i18nKey: 'mabo-traverse.forest-road-collapse-point',
      nodeType: 'other'
    },
    {
      id: 'mabo-traverse_forest-road-shibi-camp',
      name: '林道石壁營地',
      i18nKey: 'mabo-traverse.forest-road-shibi-camp',
      nodeType: 'camp'
    },
    {
      id: 'mabo-traverse_19k-abandoned-work-shed',
      name: '19K廢工寮',
      i18nKey: 'mabo-traverse.19k-abandoned-work-shed',
      nodeType: 'camp'
    },
    {
      id: 'mabo-traverse_17k-concrete-bridge',
      name: '17K水泥橋',
      i18nKey: 'mabo-traverse.17k-concrete-bridge',
      nodeType: 'other'
    },
    {
      id: 'global_16-5k-vehicle-road-end',
      name: '16.5K行車終點',
      i18nKey: 'global.16-5k-vehicle-road-end',
      nodeType: 'other'
    }
  ],
  edges: [
    // 東埔溫泉 <-> 八通關登山口
    {
      from: 'global_dongpu-spring',
      to: 'global_batongguan-trailhead',
      minutes: 10
    },
    {
      from: 'global_batongguan-trailhead',
      to: 'global_dongpu-spring',
      minutes: 10
    },
    // 八通關登山口 <-> 三聖宮
    {
      from: 'global_batongguan-trailhead',
      to: 'global_sanshenggong',
      minutes: 25
    },
    {
      from: 'global_sanshenggong',
      to: 'global_batongguan-trailhead',
      minutes: 15
    },
    // 三聖宮 <-> 樂樂溫泉岔路
    {
      from: 'global_sanshenggong',
      to: 'global_lele-spring-fork',
      minutes: 50
    },
    {
      from: 'global_lele-spring-fork',
      to: 'global_sanshenggong',
      minutes: 45
    },
    // 樂樂溫泉岔路 <-> 雲龍瀑布
    {
      from: 'global_lele-spring-fork',
      to: 'global_yunlong-fall',
      minutes: 45
    },
    {
      from: 'global_yunlong-fall',
      to: 'global_lele-spring-fork',
      minutes: 45
    },
    // 雲龍瀑布 <-> 樂樂山屋
    {
      from: 'global_yunlong-fall',
      to: 'global_lele-hut',
      minutes: 60
    },
    {
      from: 'global_lele-hut',
      to: 'global_yunlong-fall',
      minutes: 55
    },
    // 樂樂山屋 <-> 乙女瀑布
    {
      from: 'global_lele-hut',
      to: 'global_yinv-fall',
      minutes: 25
    },
    {
      from: 'global_yinv-fall',
      to: 'global_lele-hut',
      minutes: 25
    },
    // 乙女瀑布 <-> 對觀
    {
      from: 'global_yinv-fall',
      to: 'global_duiguan',
      minutes: 100
    },
    {
      from: 'global_duiguan',
      to: 'global_yinv-fall',
      minutes: 80
    },
    // 對觀 <-> 觀高坪
    {
      from: 'global_duiguan',
      to: 'global_guangao-ping',
      minutes: 150
    },
    {
      from: 'global_guangao-ping',
      to: 'global_duiguan',
      minutes: 110
    },
    // 觀高坪 <-> 觀高登山服務站
    {
      from: 'global_guangao-ping',
      to: 'global_guangao-station',
      minutes: 15
    },
    {
      from: 'global_guangao-station',
      to: 'global_guangao-ping',
      minutes: 15
    },
    // 觀高坪 <-> 古道崩斷岔路
    {
      from: 'global_guangao-ping',
      to: 'global_gudaobengduan-fork',
      minutes: 5
    },
    {
      from: 'global_gudaobengduan-fork',
      to: 'global_guangao-ping',
      minutes: 5
    },
    // 古道崩斷岔路 <-> 溪水營地
    {
      from: 'global_gudaobengduan-fork',
      to: 'global_xishui-camp',
      minutes: 60
    },
    {
      from: 'global_xishui-camp',
      to: 'global_gudaobengduan-fork',
      minutes: 40
    },
    // 溪水營地 <-> 西峰岔路
    {
      from: 'global_xishui-camp',
      to: 'global_west-peak-fork',
      minutes: 40
    },
    {
      from: 'global_west-peak-fork',
      to: 'global_xishui-camp',
      minutes: 35
    },
    // 西峰岔路 <-> 八通關山西峰
    {
      from: 'global_west-peak-fork',
      to: 'mountain_batongguan-west-peak',
      minutes: 50
    },
    {
      from: 'mountain_batongguan-west-peak',
      to: 'global_west-peak-fork',
      minutes: 30
    },
    // 八通關山西峰 <-> 三岔路口
    {
      from: 'mountain_batongguan-west-peak',
      to: 'global_batongguan-mountain-fork',
      minutes: 50
    },
    {
      from: 'global_batongguan-mountain-fork',
      to: 'mountain_batongguan-west-peak',
      minutes: 50
    },
    // 三岔路口 <-> 八通關山
    {
      from: 'global_batongguan-mountain-fork',
      to: 'mountain_batongguan-mountain',
      minutes: 30
    },
    {
      from: 'mountain_batongguan-mountain',
      to: 'global_batongguan-mountain-fork',
      minutes: 20
    },
    // 三岔路口 <-> 八通關山登山口
    {
      from: 'global_batongguan-mountain-fork',
      to: 'global_batongguan-mountain-trailhead',
      minutes: 45
    },
    {
      from: 'global_batongguan-mountain-trailhead',
      to: 'global_batongguan-mountain-fork',
      minutes: 60
    },
    // 西峰岔路 <-> 八通關草原
    {
      from: 'global_west-peak-fork',
      to: 'global_batongguan-meadow',
      minutes: 50
    },
    {
      from: 'global_batongguan-meadow',
      to: 'global_west-peak-fork',
      minutes: 70
    },
    // 古道崩斷岔路 <-> 八通關草原
    {
      from: 'global_gudaobengduan-fork',
      to: 'global_batongguan-meadow',
      minutes: 60,
      note: '稜線捷徑'
    },
    {
      from: 'global_batongguan-meadow',
      to: 'global_gudaobengduan-fork',
      minutes: 70,
      note: '稜線捷徑'
    },
    // 八通關草原 <-> 八通關山登山口
    {
      from: 'global_batongguan-meadow',
      to: 'global_batongguan-mountain-trailhead',
      minutes: 80
    },
    {
      from: 'global_batongguan-mountain-trailhead',
      to: 'global_batongguan-meadow',
      minutes: 80
    },
    // 八通關山登山口 <-> 巴奈伊克山屋
    {
      from: 'global_batongguan-mountain-trailhead',
      to: 'global_banaiyike-hut',
      minutes: 30
    },
    {
      from: 'global_banaiyike-hut',
      to: 'global_batongguan-mountain-trailhead',
      minutes: 30
    },
    // 巴奈伊克山屋 <-> 三岔路口
    {
      from: 'global_banaiyike-hut',
      to: 'global_banaiyike-fork',
      minutes: 15
    },
    {
      from: 'global_banaiyike-fork',
      to: 'global_banaiyike-hut',
      minutes: 15
    },
    // 三岔路口 <-> 荖濃溪
    {
      from: 'global_banaiyike-fork',
      to: 'global_laonong-river',
      minutes: 15
    },
    {
      from: 'global_laonong-river',
      to: 'global_banaiyike-fork',
      minutes: 20
    },
    // 荖濃溪 <-> 稜線岔路
    {
      from: 'global_laonong-river',
      to: 'global_lengxian-fork',
      minutes: 105
    },
    {
      from: 'global_lengxian-fork',
      to: 'global_laonong-river',
      minutes: 55
    },
    // 稜線岔路 <-> 杜鵑營地
    {
      from: 'global_lengxian-fork',
      to: 'global_rhododendron-camp',
      minutes: 45
    },
    {
      from: 'global_rhododendron-camp',
      to: 'global_lengxian-fork',
      minutes: 45
    },
    // 杜鵑營地 <-> 四岔路口
    {
      from: 'global_rhododendron-camp',
      to: 'global_rhododendron-fork',
      minutes: 70
    },
    {
      from: 'global_rhododendron-fork',
      to: 'global_rhododendron-camp',
      minutes: 65
    },
    // 四岔路口 <-> 南營地
    {
      from: 'global_rhododendron-fork',
      to: 'global_nan-camp',
      minutes: 55
    },
    {
      from: 'global_nan-camp',
      to: 'global_rhododendron-fork',
      minutes: 55
    },
    // 南營地 <-> 大水窟山屋
    {
      from: 'global_nan-camp',
      to: 'global_dashuiku-hut',
      minutes: 70
    },
    {
      from: 'global_dashuiku-hut',
      to: 'global_nan-camp',
      minutes: 70
    },
    // 大水窟山屋 <-> 大水窟山
    {
      from: 'global_dashuiku-hut',
      to: 'mountain_dashuiku-mountain',
      minutes: 140
    },
    {
      from: 'mountain_dashuiku-mountain',
      to: 'global_dashuiku-hut',
      minutes: 100
    },
    // 大水窟山 <-> 四岔路口
    {
      from: 'mountain_dashuiku-mountain',
      to: 'global_rhododendron-fork',
      minutes: 110
    },
    {
      from: 'global_rhododendron-fork',
      to: 'mountain_dashuiku-mountain',
      minutes: 140
    },
    // 三岔路口 <-> 中央金礦山屋
    {
      from: 'global_banaiyike-fork',
      to: 'global_zhongyangjinkuang-hut',
      minutes: 35
    },
    {
      from: 'global_zhongyangjinkuang-hut',
      to: 'global_banaiyike-fork',
      minutes: 30
    },
    // 稜線岔路 <-> 中央金礦山屋
    {
      from: 'global_lengxian-fork',
      to: 'global_zhongyangjinkuang-hut',
      minutes: 90
    },
    {
      from: 'global_zhongyangjinkuang-hut',
      to: 'global_lengxian-fork',
      minutes: 110
    },
    // 中央金礦山屋 <-> 白洋金礦山屋
    {
      from: 'global_zhongyangjinkuang-hut',
      to: 'global_baiyangjinkuang-hut',
      minutes: 190
    },
    {
      from: 'global_baiyangjinkuang-hut',
      to: 'global_zhongyangjinkuang-hut',
      minutes: 160
    },
    // 白洋金礦山屋 <-> 秀姑坪岔路
    {
      from: 'global_baiyangjinkuang-hut',
      to: 'global_xiuguping-fork',
      minutes: 30
    },
    {
      from: 'global_xiuguping-fork',
      to: 'global_baiyangjinkuang-hut',
      minutes: 20
    },
    // 秀姑坪岔路 <-> 大水窟山
    {
      from: 'global_xiuguping-fork',
      to: 'mountain_dashuiku-mountain',
      minutes: 140
    },
    {
      from: 'mountain_dashuiku-mountain',
      to: 'global_xiuguping-fork',
      minutes: 100
    },
    // 秀姑坪岔路 <-> 秀姑巒山南登山口
    {
      from: 'global_xiuguping-fork',
      to: 'global_xiuguluan-mountain-south-trailhead',
      minutes: 60
    },
    {
      from: 'global_xiuguluan-mountain-south-trailhead',
      to: 'global_xiuguping-fork',
      minutes: 40
    },
    // 秀姑巒山南登山口 <-> 秀姑巒山
    {
      from: 'global_xiuguluan-mountain-south-trailhead',
      to: 'mountain_xiuguluan-mountain',
      minutes: 50
    },
    {
      from: 'mountain_xiuguluan-mountain',
      to: 'global_xiuguluan-mountain-south-trailhead',
      minutes: 60,
      note: '輕裝 30 分'
    },
    // 秀姑巒山 <-> 秀馬山屋舊址
    {
      from: 'mountain_xiuguluan-mountain',
      to: 'global_xiuma-hut-ruins',
      minutes: 20
    },
    {
      from: 'global_xiuma-hut-ruins',
      to: 'mountain_xiuguluan-mountain',
      minutes: 25
    },
    // 秀姑巒山南登山口 <-> 秀馬山屋舊址
    {
      from: 'global_xiuguluan-mountain-south-trailhead',
      to: 'global_xiuma-hut-ruins',
      minutes: 60
    },
    {
      from: 'global_xiuma-hut-ruins',
      to: 'global_xiuguluan-mountain-south-trailhead',
      minutes: 50
    },
    // 秀馬山屋舊址 <-> 最低鞍部
    {
      from: 'global_xiuma-hut-ruins',
      to: 'mabo-traverse_mabo-zuidi-saddle',
      minutes: 110
    },
    {
      from: 'mabo-traverse_mabo-zuidi-saddle',
      to: 'global_xiuma-hut-ruins',
      minutes: 180
    },
    // 最低鞍部 <-> 馬博前岔路
    {
      from: 'mabo-traverse_mabo-zuidi-saddle',
      to: 'mabo-traverse_mabo-front-fork',
      minutes: 90
    },
    {
      from: 'mabo-traverse_mabo-front-fork',
      to: 'mabo-traverse_mabo-zuidi-saddle',
      minutes: 40
    },
    // 馬博前岔路 <-> 馬博拉斯山
    {
      from: 'mabo-traverse_mabo-front-fork',
      to: 'mountain_mabolasi-mountain',
      minutes: 10
    },
    {
      from: 'mountain_mabolasi-mountain',
      to: 'mabo-traverse_mabo-front-fork',
      minutes: 5
    },
    // 馬博拉斯山 <-> 盆駒山南峰
    {
      from: 'mountain_mabolasi-mountain',
      to: 'mountain_penju-south-peak',
      minutes: 90
    },
    {
      from: 'mountain_penju-south-peak',
      to: 'mountain_mabolasi-mountain',
      minutes: 120
    },
    // 盆駒山南峰 <-> 2950鞍岔路
    {
      from: 'mountain_penju-south-peak',
      to: 'mabo-traverse_2950-saddle-fork',
      minutes: 90
    },
    {
      from: 'mabo-traverse_2950-saddle-fork',
      to: 'mountain_penju-south-peak',
      minutes: 120
    },
    // 2950鞍岔路 <-> 盆駒山
    {
      from: 'mabo-traverse_2950-saddle-fork',
      to: 'mountain_penju-mountain',
      minutes: 50
    },
    {
      from: 'mountain_penju-mountain',
      to: 'mabo-traverse_2950-saddle-fork',
      minutes: 40
    },
    // 馬博前岔路 <-> 馬博拉斯山屋
    {
      from: 'mabo-traverse_mabo-front-fork',
      to: 'mabo-traverse_mabolasi-hut',
      minutes: 30
    },
    {
      from: 'mabo-traverse_mabolasi-hut',
      to: 'mabo-traverse_mabo-front-fork',
      minutes: 40
    },
    // 馬博拉斯山屋 <-> 馬利亞文路山
    {
      from: 'mabo-traverse_mabolasi-hut',
      to: 'mountain_maliyawenlu-mountain',
      minutes: 150
    },
    {
      from: 'mountain_maliyawenlu-mountain',
      to: 'mabo-traverse_mabolasi-hut',
      minutes: 135
    },
    // 馬利亞文路山 <-> 馬利亞文路山東峰
    {
      from: 'mountain_maliyawenlu-mountain',
      to: 'mountain_maliyawenlu-east-peak',
      minutes: 45
    },
    {
      from: 'mountain_maliyawenlu-east-peak',
      to: 'mountain_maliyawenlu-mountain',
      minutes: 60
    },
    // 馬利亞文路山東峰 <-> 最低鞍部
    {
      from: 'mountain_maliyawenlu-east-peak',
      to: 'mabo-traverse_malijiannan-zuidi-saddle',
      minutes: 50
    },
    {
      from: 'mabo-traverse_malijiannan-zuidi-saddle',
      to: 'mountain_maliyawenlu-east-peak',
      minutes: 60
    },
    // 最低鞍部 <-> 馬利加南山
    {
      from: 'mabo-traverse_malijiannan-zuidi-saddle',
      to: 'mountain_malijiannan-mountain',
      minutes: 150
    },
    {
      from: 'mountain_malijiannan-mountain',
      to: 'mabo-traverse_malijiannan-zuidi-saddle',
      minutes: 110
    },
    // 馬利加南山 <-> 馬利加南東峰山屋
    {
      from: 'mountain_malijiannan-mountain',
      to: 'global_malijiannan-east-peak-hut',
      minutes: 80
    },
    {
      from: 'global_malijiannan-east-peak-hut',
      to: 'mountain_malijiannan-mountain',
      minutes: 130
    },
    // 馬利加南東峰山屋 <-> 馬利加南山東峰
    {
      from: 'global_malijiannan-east-peak-hut',
      to: 'mountain_malijiannan-east-peak',
      minutes: 30
    },
    {
      from: 'mountain_malijiannan-east-peak',
      to: 'global_malijiannan-east-peak-hut',
      minutes: 20
    },
    // 馬利加南山東峰 <-> 3191公尺峰
    {
      from: 'mountain_malijiannan-east-peak',
      to: 'mountain_3191-meter-peak',
      minutes: 185
    },
    {
      from: 'mountain_3191-meter-peak',
      to: 'mountain_malijiannan-east-peak',
      minutes: 220
    },
    // 3191公尺峰 <-> 馬布谷山屋
    {
      from: 'mountain_3191-meter-peak',
      to: 'global_mabu-valley-hut',
      minutes: 60
    },
    {
      from: 'global_mabu-valley-hut',
      to: 'mountain_3191-meter-peak',
      minutes: 90
    },
    // 馬布谷山屋 <-> 布干山
    {
      from: 'global_mabu-valley-hut',
      to: 'mountain_bugan-mountain',
      minutes: 70
    },
    {
      from: 'mountain_bugan-mountain',
      to: 'global_mabu-valley-hut',
      minutes: 60
    },
    // 馬布谷山屋 <-> 馬西山登山口
    {
      from: 'global_mabu-valley-hut',
      to: 'mabo-traverse_maxi-mountain-trailhead',
      minutes: 100
    },
    {
      from: 'mabo-traverse_maxi-mountain-trailhead',
      to: 'global_mabu-valley-hut',
      minutes: 70
    },
    // 馬西山登山口 <-> 馬西山
    {
      from: 'mabo-traverse_maxi-mountain-trailhead',
      to: 'mountain_maxi-mountain',
      minutes: 20
    },
    {
      from: 'mountain_maxi-mountain',
      to: 'mabo-traverse_maxi-mountain-trailhead',
      minutes: 15
    },
    // 馬西山登山口 <-> 岔路登山口
    {
      from: 'mabo-traverse_maxi-mountain-trailhead',
      to: 'mabo-traverse_kaxipanan-fork-trailhead',
      minutes: 130
    },
    {
      from: 'mabo-traverse_kaxipanan-fork-trailhead',
      to: 'mabo-traverse_maxi-mountain-trailhead',
      minutes: 165
    },
    // 岔路登山口 <-> 喀西帕南山
    {
      from: 'mabo-traverse_kaxipanan-fork-trailhead',
      to: 'mountain_kaxipanan-mountain',
      minutes: 25
    },
    {
      from: 'mountain_kaxipanan-mountain',
      to: 'mabo-traverse_kaxipanan-fork-trailhead',
      minutes: 20
    },
    // 岔路登山口 <-> 喀西帕南山登山口
    {
      from: 'mabo-traverse_kaxipanan-fork-trailhead',
      to: 'mabo-traverse_kaxipanan-mountain-trailhead',
      minutes: 15
    },
    {
      from: 'mabo-traverse_kaxipanan-mountain-trailhead',
      to: 'mabo-traverse_kaxipanan-fork-trailhead',
      minutes: 15
    },
    // 喀西帕南山登山口 <-> 喀西帕南山
    {
      from: 'mabo-traverse_kaxipanan-mountain-trailhead',
      to: 'mountain_kaxipanan-mountain',
      minutes: 30
    },
    {
      from: 'mountain_kaxipanan-mountain',
      to: 'mabo-traverse_kaxipanan-mountain-trailhead',
      minutes: 20
    },
    // 喀西帕南山登山口 <-> 太平谷南口
    {
      from: 'mabo-traverse_kaxipanan-mountain-trailhead',
      to: 'global_taipinggu-nan-exit',
      minutes: 80
    },
    {
      from: 'global_taipinggu-nan-exit',
      to: 'mabo-traverse_kaxipanan-mountain-trailhead',
      minutes: 110
    },
    // 太平谷南口 <-> 太平谷東北口
    {
      from: 'global_taipinggu-nan-exit',
      to: 'mabo-traverse_taipinggu-dongbei-exit',
      minutes: 30
    },
    {
      from: 'mabo-traverse_taipinggu-dongbei-exit',
      to: 'global_taipinggu-nan-exit',
      minutes: 30
    },
    // 太平谷東北口 <-> 44K林道盡頭
    {
      from: 'mabo-traverse_taipinggu-dongbei-exit',
      to: 'mabo-traverse_44k-forest-road-end',
      minutes: 65
    },
    {
      from: 'mabo-traverse_44k-forest-road-end',
      to: 'mabo-traverse_taipinggu-dongbei-exit',
      minutes: 60
    },
    // 44K林道盡頭 <-> 43K廢棄工寮
    {
      from: 'mabo-traverse_44k-forest-road-end',
      to: 'mabo-traverse_43k-abandoned-work-shed',
      minutes: 20
    },
    {
      from: 'mabo-traverse_43k-abandoned-work-shed',
      to: 'mabo-traverse_44k-forest-road-end',
      minutes: 25
    },
    // 43K廢棄工寮 <-> 捷徑下切點
    {
      from: 'mabo-traverse_43k-abandoned-work-shed',
      to: 'mabo-traverse_shortcut-descent-point',
      minutes: 70
    },
    {
      from: 'mabo-traverse_shortcut-descent-point',
      to: 'mabo-traverse_43k-abandoned-work-shed',
      minutes: 85
    },
    // 捷徑下切點 <-> 廢棄發電機
    {
      from: 'mabo-traverse_shortcut-descent-point',
      to: 'mabo-traverse_abandoned-generator',
      minutes: 40
    },
    {
      from: 'mabo-traverse_abandoned-generator',
      to: 'mabo-traverse_shortcut-descent-point',
      minutes: 60
    },
    // 廢棄發電機 <-> 岔路
    {
      from: 'mabo-traverse_abandoned-generator',
      to: 'mabo-traverse_35k-work-shed-fork',
      minutes: 20
    },
    {
      from: 'mabo-traverse_35k-work-shed-fork',
      to: 'mabo-traverse_abandoned-generator',
      minutes: 25
    },
    // 岔路 <-> 35K廢棄工寮
    {
      from: 'mabo-traverse_35k-work-shed-fork',
      to: 'mabo-traverse_35k-abandoned-work-shed',
      minutes: 2
    },
    {
      from: 'mabo-traverse_35k-abandoned-work-shed',
      to: 'mabo-traverse_35k-work-shed-fork',
      minutes: 2
    },
    // 岔路 <-> 林道玉林橋下切點
    {
      from: 'mabo-traverse_35k-work-shed-fork',
      to: 'mabo-traverse_forest-road-yulin-bridge-descent-point',
      minutes: 25
    },
    {
      from: 'mabo-traverse_forest-road-yulin-bridge-descent-point',
      to: 'mabo-traverse_35k-work-shed-fork',
      minutes: 30
    },
    // 林道玉林橋下切點 <-> 下切溪床點
    {
      from: 'mabo-traverse_forest-road-yulin-bridge-descent-point',
      to: 'global_descent-streambed-point',
      minutes: 85
    },
    {
      from: 'global_descent-streambed-point',
      to: 'mabo-traverse_forest-road-yulin-bridge-descent-point',
      minutes: 120
    },
    // 下切溪床點 <-> 大石帆布營地
    {
      from: 'global_descent-streambed-point',
      to: 'mabo-traverse_dashi-fanbu-camp',
      minutes: 45
    },
    {
      from: 'mabo-traverse_dashi-fanbu-camp',
      to: 'global_descent-streambed-point',
      minutes: 60
    },
    // 大石帆布營地 <-> 溪谷上切處
    {
      from: 'mabo-traverse_dashi-fanbu-camp',
      to: 'mabo-traverse_valley-ascent-point',
      minutes: 10
    },
    {
      from: 'mabo-traverse_valley-ascent-point',
      to: 'mabo-traverse_dashi-fanbu-camp',
      minutes: 10
    },
    // 溪谷上切處 <-> 林道崩毀處
    {
      from: 'mabo-traverse_valley-ascent-point',
      to: 'mabo-traverse_forest-road-collapse-point',
      minutes: 15
    },
    {
      from: 'mabo-traverse_forest-road-collapse-point',
      to: 'mabo-traverse_valley-ascent-point',
      minutes: 10
    },
    // 林道崩毀處 <-> 林道石壁營地
    {
      from: 'mabo-traverse_forest-road-collapse-point',
      to: 'mabo-traverse_forest-road-shibi-camp',
      minutes: 70
    },
    {
      from: 'mabo-traverse_forest-road-shibi-camp',
      to: 'mabo-traverse_forest-road-collapse-point',
      minutes: 80
    },
    // 林道石壁營地 <-> 19K廢工寮
    {
      from: 'mabo-traverse_forest-road-shibi-camp',
      to: 'mabo-traverse_19k-abandoned-work-shed',
      minutes: 25
    },
    {
      from: 'mabo-traverse_19k-abandoned-work-shed',
      to: 'mabo-traverse_forest-road-shibi-camp',
      minutes: 30
    },
    // 19K廢工寮 <-> 17K水泥橋
    {
      from: 'mabo-traverse_19k-abandoned-work-shed',
      to: 'mabo-traverse_17k-concrete-bridge',
      minutes: 40
    },
    {
      from: 'mabo-traverse_17k-concrete-bridge',
      to: 'mabo-traverse_19k-abandoned-work-shed',
      minutes: 45
    },
    // 17K水泥橋 <-> 16.5K行車終點
    {
      from: 'mabo-traverse_17k-concrete-bridge',
      to: 'global_16-5k-vehicle-road-end',
      minutes: 20
    },
    {
      from: 'global_16-5k-vehicle-road-end',
      to: 'mabo-traverse_17k-concrete-bridge',
      minutes: 20
    }
  ]
}
