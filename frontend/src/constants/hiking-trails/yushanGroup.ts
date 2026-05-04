import { type Trail } from '@/model/hikingTrail'

export const yushanGroup: Trail = {
  id: 'yushan-group',
  name: '玉山群峰',
  nameEn: 'Yushan Group',
  i18nKey: 'yushan-group.yushan-group',
  nodes: [
    // --- 塔塔加側起點 ---
    {
      id: 'yushan-group_tataka-parking',
      name: '塔塔加停車場',
      i18nKey: 'yushan-group.tataka-parking',
      nodeType: 'fork' 
    },
    {
      id: 'yushan-group_checkpost',
      name: '檢查哨',
      i18nKey: 'yushan-group.checkpost',
      nodeType: 'hut' 
    },
    {
      id: 'yushan-group_tataka-saddle',
      name: '塔塔加鞍部',
      i18nKey: 'yushan-group.tataka-saddle',
      nodeType: 'fork' 
    },
    {
      id: 'yushan-group_great-hemlock',
      name: '大鐵杉',
      i18nKey: 'yushan-group.great-hemlock',
      nodeType: 'other' 
    },
    {
      id: 'yushan-group_lulin-hut',
      name: '鹿林山莊',
      i18nKey: 'yushan-group.lulin-hut',
      nodeType: 'hut' 
    },
    
    // --- 步道沿線 ---
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
      id: 'yushan-group_west-peak-rest-pavilion',
      name: '西峰下休憩亭',
      i18nKey: 'yushan-group.west-peak-rest-pavilion',
      nodeType: 'other' 
    },
    {
      id: 'yushan-group_great-precipice',
      name: '大峭壁',
      i18nKey: 'yushan-group.great-precipice',
      nodeType: 'other' 
    },
    {
      id: 'yushan-group_paiyun-lodge',
      name: '排雲山莊',
      i18nKey: 'yushan-group.paiyun-lodge',
      nodeType: 'hut' 
    },
    {
      id: 'mountain_yushan-west-peak',
      name: '玉山西峰',
      i18nKey: 'mountain.yushan-west-peak',
      nodeType: 'peak' 
    },
    
    // --- 主東區域 ---
    {
      id: 'yushan-group_main-south-fork',
      name: '主南岔路',
      i18nKey: 'yushan-group.main-south-fork',
      nodeType: 'fork' 
    },
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
      id: 'yushan-group_north-peak-saddle',
      name: '北峰鞍部',
      i18nKey: 'yushan-group.north-peak-saddle',
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
    
    // --- 南峰區域 ---
    {
      id: 'yushan-group_yuanfeng-hut',
      name: '圓峰山屋',
      i18nKey: 'yushan-group.yuanfeng-hut',
      nodeType: 'hut' 
    },
    {
      id: 'mountain_sancha-peak',
      name: '三叉峰',
      i18nKey: 'mountain.sancha-peak',
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
    
    // --- 八通關側 (往東埔) ---
    {
      id: 'yushan-group_batongguan',
      name: '八通關',
      i18nKey: 'yushan-group.batongguan',
      nodeType: 'other' 
    },
    {
      id: 'global_guangao-ping',
      name: '觀高坪',
      i18nKey: 'yushan-group.guangao-ping',
      nodeType: 'fork' 
    },
    {
      id: 'global_guangao-station',
      name: '觀高登山服務站',
      i18nKey: 'yushan-group.guangao-station',
      nodeType: 'hut' 
    },
    {
      id: 'yushan-group_duiguan',
      name: '對關',
      i18nKey: 'yushan-group.duiguan',
      nodeType: 'other' 
    },
    {
      id: 'yushan-group_yinv-fall',
      name: '乙女瀑布',
      i18nKey: 'yushan-group.yinv-fall',
      nodeType: 'water-source' 
    },
    {
      id: 'global_lele-hut',
      name: '樂樂山屋',
      i18nKey: 'yushan-group.lele-hut',
      nodeType: 'hut' 
    },
    {
      id: 'global_yunlong-fall',
      name: '雲龍瀑布',
      i18nKey: 'yushan-group.yunlong-fall',
      nodeType: 'water-source' 
    },
    {
      id: 'yushan-group_father-son-cliff',
      name: '父子斷崖',
      i18nKey: 'yushan-group.father-son-cliff',
      nodeType: 'other' 
    },
    {
      id: 'yushan-group_dongpu-trailhead',
      name: '登山口',
      i18nKey: 'yushan-group.dongpu-trailhead',
      nodeType: 'fork' 
    },
    {
      id: 'yushan-group_dongpu-tribe',
      name: '東埔部落',
      i18nKey: 'yushan-group.dongpu-tribe',
      nodeType: 'other' 
    },
    {
      id: 'global_dongpu-spring',
      name: '東埔溫泉',
      i18nKey: 'yushan-group.dongpu-spring',
      nodeType: 'other' 
    }
  ],
  edges: [
    // 塔塔加側步道
    {
      from: 'yushan-group_tataka-parking',
      to: 'yushan-group_checkpost',
      minutes: 10
    },
    {
      from: 'yushan-group_checkpost',
      to: 'yushan-group_tataka-parking',
      minutes: 10
    },
    {
      from: 'yushan-group_checkpost',
      to: 'yushan-group_great-hemlock',
      minutes: 25
    },
    {
      from: 'yushan-group_great-hemlock',
      to: 'yushan-group_checkpost',
      minutes: 20
    },
    {
      from: 'yushan-group_tataka-saddle',
      to: 'yushan-group_great-hemlock',
      minutes: 35
    },
    {
      from: 'yushan-group_great-hemlock',
      to: 'yushan-group_tataka-saddle',
      minutes: 25 
    },
    {
      from: 'yushan-group_great-hemlock',
      to: 'yushan-group_lulin-hut',
      minutes: 35
    },
    {
      from: 'yushan-group_lulin-hut',
      to: 'yushan-group_great-hemlock',
      minutes: 35
    },
    
    // 主線路段
    {
      from: 'yushan-group_tataka-saddle',
      to: 'yushan-group_monroe-pavilion',
      minutes: 50 
    },
    {
      from: 'yushan-group_monroe-pavilion',
      to: 'yushan-group_tataka-saddle',
      minutes: 35 
    },
    {
      from: 'yushan-group_monroe-pavilion',
      to: 'yushan-group_front-peak-trailhead',
      minutes: 35
    },
    {
      from: 'yushan-group_front-peak-trailhead',
      to: 'yushan-group_monroe-pavilion',
      minutes: 30
    },
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
    {
      from: 'yushan-group_front-peak-trailhead',
      to: 'yushan-group_west-peak-rest-pavilion',
      minutes: 45 
    },
    {
      from: 'yushan-group_west-peak-rest-pavilion',
      to: 'yushan-group_front-peak-trailhead',
      minutes: 35 
    },
    {
      from: 'yushan-group_west-peak-rest-pavilion',
      to: 'yushan-group_great-precipice',
      minutes: 40 
    },
    {
      from: 'yushan-group_great-precipice',
      to: 'yushan-group_west-peak-rest-pavilion',
      minutes: 30 
    },
    {
      from: 'yushan-group_great-precipice',
      to: 'yushan-group_paiyun-lodge',
      minutes: 50
    },
    {
      from: 'yushan-group_paiyun-lodge',
      to: 'yushan-group_great-precipice',
      minutes: 40
    },
    
    // 排雲至西、主峰
    {
      from: 'yushan-group_paiyun-lodge',
      to: 'mountain_yushan-west-peak',
      minutes: 90 
    },
    {
      from: 'mountain_yushan-west-peak',
      to: 'yushan-group_paiyun-lodge',
      minutes: 70 
    },
    {
      from: 'yushan-group_paiyun-lodge',
      to: 'yushan-group_main-south-fork',
      minutes: 45
    },
    {
      from: 'yushan-group_main-south-fork',
      to: 'yushan-group_paiyun-lodge',
      minutes: 30
    },
    {
      from: 'yushan-group_main-north-fork',
      to: 'yushan-group_main-south-fork',
      minutes: 50
    },
    {
      from: 'yushan-group_main-south-fork',
      to: 'yushan-group_main-north-fork',
      minutes: 90 
    },
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
    
    // 北峰區域
    {
      from: 'yushan-group_main-north-fork',
      to: 'yushan-group_north-peak-saddle',
      minutes: 10
    },
    {
      from: 'yushan-group_north-peak-saddle',
      to: 'yushan-group_main-north-fork',
      minutes: 20
    },
    {
      from: 'yushan-group_north-peak-saddle',
      to: 'mountain_yushan-north-peak',
      minutes: 70
    },
    {
      from: 'mountain_yushan-north-peak',
      to: 'yushan-group_north-peak-saddle',
      minutes: 45
    },
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
    {
      from: 'yushan-group_north-peak-saddle',
      to: 'yushan-group_laonong-river-camp',
      minutes: 80
    },
    {
      from: 'yushan-group_laonong-river-camp',
      to: 'yushan-group_north-peak-saddle',
      minutes: 120
    },
    
    // 南峰區域
    {
      from: 'yushan-group_main-south-fork',
      to: 'yushan-group_yuanfeng-hut',
      minutes: 70
    },
    {
      from: 'yushan-group_yuanfeng-hut',
      to: 'yushan-group_main-south-fork',
      minutes: 60
    },
    {
      from: 'yushan-group_yuanfeng-hut',
      to: 'mountain_sancha-peak',
      minutes: 45
    },
    {
      from: 'mountain_sancha-peak',
      to: 'yushan-group_yuanfeng-hut',
      minutes: 30
    },
    {
      from: 'mountain_sancha-peak',
      to: 'mountain_yushan-south-peak',
      minutes: 25
    },
    {
      from: 'mountain_yushan-south-peak',
      to: 'mountain_sancha-peak',
      minutes: 25
    },
    {
      from: 'mountain_yushan-south-peak',
      to: 'mountain_dongxiaonan-mountain',
      minutes: 50
    },
    {
      from: 'mountain_dongxiaonan-mountain',
      to: 'mountain_yushan-south-peak',
      minutes: 70
    },
    {
      from: 'mountain_yushan-south-peak',
      to: 'mountain_lu-mountain',
      minutes: 120
    },
    {
      from: 'mountain_lu-mountain',
      to: 'mountain_yushan-south-peak',
      minutes: 240
    },
    {
      from: 'mountain_sancha-peak',
      to: 'mountain_yushan-xiaonan-mountain',
      minutes: 150
    },
    {
      from: 'mountain_yushan-xiaonan-mountain',
      to: 'mountain_sancha-peak',
      minutes: 200
    },
    {
      from: 'mountain_yushan-xiaonan-mountain',
      to: 'mountain_south-yushan-mountain',
      minutes: 100
    },
    {
      from: 'mountain_south-yushan-mountain',
      to: 'mountain_yushan-xiaonan-mountain',
      minutes: 150 
    },
    
    // 八通關古道路段
    {
      from: 'yushan-group_laonong-river-camp',
      to: 'yushan-group_batongguan',
      minutes: 130
    },
    {
      from: 'yushan-group_batongguan',
      to: 'yushan-group_laonong-river-camp',
      minutes: 200 
    },
    {
      from: 'yushan-group_batongguan',
      to: 'global_guangao-ping',
      minutes: 45
    },
    {
      from: 'global_guangao-ping',
      to: 'yushan-group_batongguan',
      minutes: 60
    },
    {
      from: 'global_guangao-ping',
      to: 'global_guangao-station',
      minutes: 10
    },
    {
      from: 'global_guangao-station',
      to: 'global_guangao-ping',
      minutes: 10
    },
    {
      from: 'global_guangao-ping',
      to: 'yushan-group_duiguan',
      minutes: 90
    },
    {
      from: 'yushan-group_duiguan',
      to: 'global_guangao-ping',
      minutes: 140
    },
    {
      from: 'yushan-group_duiguan',
      to: 'yushan-group_yinv-fall',
      minutes: 75
    },
    {
      from: 'yushan-group_yinv-fall',
      to: 'yushan-group_duiguan',
      minutes: 100
    },
    {
      from: 'yushan-group_yinv-fall',
      to: 'global_lele-hut',
      minutes: 30
    },
    {
      from: 'global_lele-hut',
      to: 'yushan-group_yinv-fall',
      minutes: 30
    },
    {
      from: 'global_lele-hut',
      to: 'global_yunlong-fall',
      minutes: 55
    },
    {
      from: 'global_yunlong-fall',
      to: 'global_lele-hut',
      minutes: 65
    },
    {
      from: 'global_yunlong-fall',
      to: 'yushan-group_father-son-cliff',
      minutes: 70 
    },
    {
      from: 'yushan-group_father-son-cliff',
      to: 'global_yunlong-fall',
      minutes: 100
    },
    {
      from: 'yushan-group_father-son-cliff',
      to: 'yushan-group_dongpu-trailhead',
      minutes: 30
    },
    {
      from: 'yushan-group_dongpu-trailhead',
      to: 'yushan-group_father-son-cliff',
      minutes: 55
    },
    {
      from: 'yushan-group_dongpu-trailhead',
      to: 'yushan-group_dongpu-tribe',
      minutes: 20
    },
    {
      from: 'yushan-group_dongpu-tribe',
      to: 'yushan-group_dongpu-trailhead',
      minutes: 20
    },
    {
      from: 'yushan-group_dongpu-trailhead',
      to: 'global_dongpu-spring',
      minutes: 10
    },
    {
      from: 'global_dongpu-spring',
      to: 'yushan-group_dongpu-trailhead',
      minutes: 10
    }
  ]
}
