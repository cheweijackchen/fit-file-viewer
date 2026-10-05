import { type Trail } from '@/model/hikingTrail'

export const yushanGroup: Trail = {
  id: 'yushan-group',
  name: '玉山群峰',
  nameEn: 'Yushan Group',
  i18nKey: 'yushan-group.yushan-group',
  nodes: [
    // --- 塔塔加側起點與步道 ---
    {
      id: 'yushan-group_shangdongpu-parking',
      name: '上東埔停車場',
      i18nKey: 'yushan-group.shangdongpu-parking',
      nodeType: 'other'
    },
    {
      id: 'yushan-group_paiyun-station',
      name: '排雲管理站',
      i18nKey: 'yushan-group.paiyun-station',
      nodeType: 'other'
    },
    {
      id: 'yushan-group_datieshan',
      name: '大鐵杉',
      i18nKey: 'yushan-group.datieshan',
      nodeType: 'fork'
    },
    {
      id: 'yushan-group_lulin-hut',
      name: '鹿林山莊',
      i18nKey: 'yushan-group.lulin-hut',
      nodeType: 'hut'
    },
    {
      id: 'yushan-group_tataka-saddle',
      name: '塔塔加鞍部',
      i18nKey: 'yushan-group.tataka-saddle',
      nodeType: 'fork'
    },
    {
      id: 'yushan-group_monroe-pavilion',
      name: '孟祿亭',
      i18nKey: 'yushan-group.monroe-pavilion',
      nodeType: 'other'
    },
    {
      id: 'yushan-group_front-peak-trailhead',
      name: '前峰登山口',
      i18nKey: 'yushan-group.front-peak-trailhead',
      nodeType: 'fork'
    },
    {
      id: 'mountain_yushan-front-peak',
      name: '玉山前峰',
      i18nKey: 'mountain.yushan-front-peak',
      nodeType: 'peak'
    },
    {
      id: 'yushan-group_west-peak-pavilion',
      name: '西峰下觀景台',
      i18nKey: 'yushan-group.west-peak-pavilion',
      nodeType: 'other'
    },
    {
      id: 'yushan-group_da-cliff',
      name: '大峭壁',
      i18nKey: 'yushan-group.da-cliff',
      nodeType: 'other'
    },
    {
      id: 'yushan-group_paiyun-hut',
      name: '排雲山莊',
      i18nKey: 'yushan-group.paiyun-hut',
      nodeType: 'hut'
    },
    {
      id: 'mountain_yushan-west-peak',
      name: '玉山西峰',
      i18nKey: 'mountain.yushan-west-peak',
      nodeType: 'peak'
    },
    {
      id: 'yushan-group_main-south-fork',
      name: '主南岔路',
      i18nKey: 'yushan-group.main-south-fork',
      nodeType: 'fork'
    },

    // --- 南側（圓峰山屋、三叉峰、四岔路口、2K三岔路口） ---
    {
      id: 'yushan-group_yuan-peak-hut',
      name: '圓峰山屋',
      i18nKey: 'yushan-group.yuan-peak-hut',
      nodeType: 'hut'
    },
    {
      id: 'yushan-group_yuan-peak-fork',
      name: '三岔路口',
      i18nKey: 'yushan-group.yuan-peak-fork',
      nodeType: 'fork'
    },
    {
      id: 'mountain_sancha-peak',
      name: '三叉峰',
      i18nKey: 'mountain.sancha-peak',
      nodeType: 'peak'
    },
    {
      id: 'yushan-group_yushan-south-peak-fork',
      name: '四岔路口',
      i18nKey: 'yushan-group.yushan-south-peak-fork',
      nodeType: 'fork'
    },
    {
      id: 'mountain_yushan-south-peak',
      name: '玉山南峰',
      i18nKey: 'mountain.yushan-south-peak',
      nodeType: 'peak'
    },
    {
      id: 'mountain_dongxiaonan-mountain',
      name: '東小南山',
      i18nKey: 'mountain.dongxiaonan-mountain',
      nodeType: 'peak'
    },
    {
      id: 'mountain_lu-mountain',
      name: '鹿山',
      i18nKey: 'mountain.lu-mountain',
      nodeType: 'peak'
    },
    {
      id: 'yushan-group_2k-fork',
      name: '2K三岔路口',
      i18nKey: 'yushan-group.2k-fork',
      nodeType: 'fork'
    },
    {
      id: 'mountain_yushan-xiaonan-mountain',
      name: '玉山小南山',
      i18nKey: 'mountain.yushan-xiaonan-mountain',
      nodeType: 'peak'
    },
    {
      id: 'mountain_south-yushan-mountain',
      name: '南玉山',
      i18nKey: 'mountain.south-yushan-mountain',
      nodeType: 'peak'
    },

    // --- 主東區域 ---
    {
      id: 'yushan-group_main-north-fork',
      name: '主北岔路',
      i18nKey: 'yushan-group.main-north-fork',
      nodeType: 'fork'
    },
    {
      id: 'mountain_yushan-main-peak',
      name: '玉山主峰',
      i18nKey: 'mountain.yushan-main-peak',
      nodeType: 'peak'
    },
    {
      id: 'mountain_yushan-east-peak',
      name: '玉山東峰',
      i18nKey: 'mountain.yushan-east-peak',
      nodeType: 'peak'
    },

    // --- 北峰區域 ---
    {
      id: 'yushan-group_fengkou',
      name: '風口',
      i18nKey: 'yushan-group.fengkou',
      nodeType: 'fork'
    },
    {
      id: 'mountain_yushan-north-peak',
      name: '玉山北峰',
      i18nKey: 'mountain.yushan-north-peak',
      nodeType: 'peak'
    },
    {
      id: 'mountain_yushan-north-north-peak',
      name: '玉山北北峰',
      i18nKey: 'mountain.yushan-north-north-peak',
      nodeType: 'peak'
    },
    {
      id: 'yushan-group_laonong-river-camp',
      name: '荖濃溪營地',
      i18nKey: 'yushan-group.laonong-river-camp',
      nodeType: 'camp'
    },

    // --- 八通關古道 ---
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
      id: 'mountain_batongguan-west-peak',
      name: '八通關山西峰',
      i18nKey: 'mountain.batongguan-west-peak',
      nodeType: 'peak'
    },
    {
      id: 'global_west-peak-fork',
      name: '西峰岔路',
      i18nKey: 'global.west-peak-fork',
      nodeType: 'fork'
    },
    {
      id: 'global_xishui-camp',
      name: '溪水營地',
      i18nKey: 'global.xishui-camp',
      nodeType: 'camp'
    },
    {
      id: 'global_gudaobengduan-fork',
      name: '古道崩斷岔路',
      i18nKey: 'global.gudaobengduan-fork',
      nodeType: 'fork'
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
      id: 'global_duiguan',
      name: '對觀',
      i18nKey: 'global.duiguan',
      nodeType: 'other'
    },
    {
      id: 'global_yinv-fall',
      name: '乙女瀑布',
      i18nKey: 'global.yinv-fall',
      nodeType: 'water-source'
    },
    {
      id: 'global_lele-hut',
      name: '樂樂山屋',
      i18nKey: 'global.lele-hut',
      nodeType: 'hut'
    },
    {
      id: 'global_yunlong-fall',
      name: '雲龍瀑布',
      i18nKey: 'global.yunlong-fall',
      nodeType: 'water-source'
    },
    {
      id: 'global_lele-spring-fork',
      name: '樂樂溫泉岔路',
      i18nKey: 'global.lele-spring-fork',
      nodeType: 'fork'
    },
    {
      id: 'global_sanshenggong',
      name: '三聖宮',
      i18nKey: 'global.sanshenggong',
      nodeType: 'other'
    },
    {
      id: 'global_batongguan-trailhead',
      name: '八通關登山口',
      i18nKey: 'global.batongguan-trailhead',
      nodeType: 'fork'
    },
    {
      id: 'global_dongpu-spring',
      name: '東埔溫泉',
      i18nKey: 'global.dongpu-spring',
      nodeType: 'other'
    }
  ],
  edges: [
    // 上東埔停車場 <-> 排雲管理站
    {
      from: 'yushan-group_shangdongpu-parking',
      to: 'yushan-group_paiyun-station',
      minutes: 10
    },
    {
      from: 'yushan-group_paiyun-station',
      to: 'yushan-group_shangdongpu-parking',
      minutes: 10
    },
    // 排雲管理站 <-> 大鐵杉
    {
      from: 'yushan-group_paiyun-station',
      to: 'yushan-group_datieshan',
      minutes: 25
    },
    {
      from: 'yushan-group_datieshan',
      to: 'yushan-group_paiyun-station',
      minutes: 20
    },
    // 大鐵杉 <-> 鹿林山莊
    {
      from: 'yushan-group_datieshan',
      to: 'yushan-group_lulin-hut',
      minutes: 35
    },
    {
      from: 'yushan-group_lulin-hut',
      to: 'yushan-group_datieshan',
      minutes: 35
    },
    // 大鐵杉 <-> 塔塔加鞍部
    {
      from: 'yushan-group_datieshan',
      to: 'yushan-group_tataka-saddle',
      minutes: 25
    },
    {
      from: 'yushan-group_tataka-saddle',
      to: 'yushan-group_datieshan',
      minutes: 30
    },
    // 塔塔加鞍部 <-> 孟祿亭
    {
      from: 'yushan-group_tataka-saddle',
      to: 'yushan-group_monroe-pavilion',
      minutes: 50
    },
    {
      from: 'yushan-group_monroe-pavilion',
      to: 'yushan-group_tataka-saddle',
      minutes: 40
    },
    // 孟祿亭 <-> 前峰登山口
    {
      from: 'yushan-group_monroe-pavilion',
      to: 'yushan-group_front-peak-trailhead',
      minutes: 40
    },
    {
      from: 'yushan-group_front-peak-trailhead',
      to: 'yushan-group_monroe-pavilion',
      minutes: 35
    },
    // 前峰登山口 <-> 玉山前峰
    {
      from: 'yushan-group_front-peak-trailhead',
      to: 'mountain_yushan-front-peak',
      minutes: 75
    },
    {
      from: 'mountain_yushan-front-peak',
      to: 'yushan-group_front-peak-trailhead',
      minutes: 45
    },
    // 前峰登山口 <-> 西峰下觀景台
    {
      from: 'yushan-group_front-peak-trailhead',
      to: 'yushan-group_west-peak-pavilion',
      minutes: 50
    },
    {
      from: 'yushan-group_west-peak-pavilion',
      to: 'yushan-group_front-peak-trailhead',
      minutes: 40
    },
    // 西峰下觀景台 <-> 大峭壁
    {
      from: 'yushan-group_west-peak-pavilion',
      to: 'yushan-group_da-cliff',
      minutes: 50
    },
    {
      from: 'yushan-group_da-cliff',
      to: 'yushan-group_west-peak-pavilion',
      minutes: 40
    },
    // 大峭壁 <-> 排雲山莊
    {
      from: 'yushan-group_da-cliff',
      to: 'yushan-group_paiyun-hut',
      minutes: 70
    },
    {
      from: 'yushan-group_paiyun-hut',
      to: 'yushan-group_da-cliff',
      minutes: 50
    },
    // 排雲山莊 <-> 玉山西峰
    {
      from: 'yushan-group_paiyun-hut',
      to: 'mountain_yushan-west-peak',
      minutes: 90
    },
    {
      from: 'mountain_yushan-west-peak',
      to: 'yushan-group_paiyun-hut',
      minutes: 70
    },
    // 排雲山莊 <-> 主南岔路
    {
      from: 'yushan-group_paiyun-hut',
      to: 'yushan-group_main-south-fork',
      minutes: 45
    },
    {
      from: 'yushan-group_main-south-fork',
      to: 'yushan-group_paiyun-hut',
      minutes: 30
    },
    // 主南岔路 <-> 圓峰山屋
    {
      from: 'yushan-group_main-south-fork',
      to: 'yushan-group_yuan-peak-hut',
      minutes: 90
    },
    {
      from: 'yushan-group_yuan-peak-hut',
      to: 'yushan-group_main-south-fork',
      minutes: 70
    },
    // 圓峰山屋 <-> 三岔路口
    {
      from: 'yushan-group_yuan-peak-hut',
      to: 'yushan-group_yuan-peak-fork',
      minutes: 30
    },
    {
      from: 'yushan-group_yuan-peak-fork',
      to: 'yushan-group_yuan-peak-hut',
      minutes: 25
    },
    // 三岔路口 <-> 三叉峰
    {
      from: 'yushan-group_yuan-peak-fork',
      to: 'mountain_sancha-peak',
      minutes: 20
    },
    {
      from: 'mountain_sancha-peak',
      to: 'yushan-group_yuan-peak-fork',
      minutes: 15
    },
    // 三叉峰 <-> 四岔路口
    {
      from: 'mountain_sancha-peak',
      to: 'yushan-group_yushan-south-peak-fork',
      minutes: 30
    },
    {
      from: 'yushan-group_yushan-south-peak-fork',
      to: 'mountain_sancha-peak',
      minutes: 20
    },
    // 四岔路口 <-> 玉山南峰
    {
      from: 'yushan-group_yushan-south-peak-fork',
      to: 'mountain_yushan-south-peak',
      minutes: 5
    },
    {
      from: 'mountain_yushan-south-peak',
      to: 'yushan-group_yushan-south-peak-fork',
      minutes: 5
    },
    // 四岔路口 <-> 東小南山
    {
      from: 'yushan-group_yushan-south-peak-fork',
      to: 'mountain_dongxiaonan-mountain',
      minutes: 40
    },
    {
      from: 'mountain_dongxiaonan-mountain',
      to: 'yushan-group_yushan-south-peak-fork',
      minutes: 60
    },
    // 四岔路口 <-> 鹿山
    {
      from: 'yushan-group_yushan-south-peak-fork',
      to: 'mountain_lu-mountain',
      minutes: 180
    },
    {
      from: 'mountain_lu-mountain',
      to: 'yushan-group_yushan-south-peak-fork',
      minutes: 280
    },
    // 三岔路口 <-> 2K三岔路口
    {
      from: 'yushan-group_yuan-peak-fork',
      to: 'yushan-group_2k-fork',
      minutes: 155
    },
    {
      from: 'yushan-group_2k-fork',
      to: 'yushan-group_yuan-peak-fork',
      minutes: 180
    },
    // 2K三岔路口 <-> 玉山小南山
    {
      from: 'yushan-group_2k-fork',
      to: 'mountain_yushan-xiaonan-mountain',
      minutes: 10
    },
    {
      from: 'mountain_yushan-xiaonan-mountain',
      to: 'yushan-group_2k-fork',
      minutes: 5
    },
    // 2K三岔路口 <-> 南玉山
    {
      from: 'yushan-group_2k-fork',
      to: 'mountain_south-yushan-mountain',
      minutes: 70
    },
    {
      from: 'mountain_south-yushan-mountain',
      to: 'yushan-group_2k-fork',
      minutes: 80
    },
    // 主南岔路 <-> 主北岔路
    {
      from: 'yushan-group_main-south-fork',
      to: 'yushan-group_main-north-fork',
      minutes: 90
    },
    {
      from: 'yushan-group_main-north-fork',
      to: 'yushan-group_main-south-fork',
      minutes: 50
    },
    // 主北岔路 <-> 玉山主峰
    {
      from: 'yushan-group_main-north-fork',
      to: 'mountain_yushan-main-peak',
      minutes: 25
    },
    {
      from: 'mountain_yushan-main-peak',
      to: 'yushan-group_main-north-fork',
      minutes: 15
    },
    // 玉山主峰 <-> 玉山東峰
    {
      from: 'mountain_yushan-main-peak',
      to: 'mountain_yushan-east-peak',
      minutes: 80
    },
    {
      from: 'mountain_yushan-east-peak',
      to: 'mountain_yushan-main-peak',
      minutes: 90
    },
    // 主北岔路 <-> 風口
    {
      from: 'yushan-group_main-north-fork',
      to: 'yushan-group_fengkou',
      minutes: 10
    },
    {
      from: 'yushan-group_fengkou',
      to: 'yushan-group_main-north-fork',
      minutes: 20
    },
    // 風口 <-> 玉山北峰
    {
      from: 'yushan-group_fengkou',
      to: 'mountain_yushan-north-peak',
      minutes: 70
    },
    {
      from: 'mountain_yushan-north-peak',
      to: 'yushan-group_fengkou',
      minutes: 45
    },
    // 玉山北峰 <-> 玉山北北峰
    {
      from: 'mountain_yushan-north-peak',
      to: 'mountain_yushan-north-north-peak',
      minutes: 25
    },
    {
      from: 'mountain_yushan-north-north-peak',
      to: 'mountain_yushan-north-peak',
      minutes: 25
    },
    // 風口 <-> 荖濃溪營地
    {
      from: 'yushan-group_fengkou',
      to: 'yushan-group_laonong-river-camp',
      minutes: 80
    },
    {
      from: 'yushan-group_laonong-river-camp',
      to: 'yushan-group_fengkou',
      minutes: 120
    },
    // 荖濃溪營地 <-> 八通關草原
    {
      from: 'yushan-group_laonong-river-camp',
      to: 'global_batongguan-meadow',
      minutes: 130
    },
    {
      from: 'global_batongguan-meadow',
      to: 'yushan-group_laonong-river-camp',
      minutes: 200
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
    // 八通關山登山口 <-> 三岔路口
    {
      from: 'global_batongguan-mountain-trailhead',
      to: 'global_batongguan-mountain-fork',
      minutes: 60
    },
    {
      from: 'global_batongguan-mountain-fork',
      to: 'global_batongguan-mountain-trailhead',
      minutes: 45
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
    }
  ]
}
