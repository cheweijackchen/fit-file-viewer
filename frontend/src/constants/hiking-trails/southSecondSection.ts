import { type Trail } from '@/model/hikingTrail'

export const southSecondSection: Trail = {
  id: 'south-second-section',
  name: '南二段',
  nameEn: 'South Second Section',
  i18nKey: 'south-second-section.south-second-section',
  nodes: [
    // --- 八通關古道：東埔溫泉 → 八通關山登山口（共用節點，與玉山群峰檔一致）---
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
    // --- 巴奈伊克山屋 ---
    {
      id: 'south-second-section_banaiyike-hut',
      name: '巴奈伊克山屋',
      i18nKey: 'south-second-section.banaiyike-hut',
      nodeType: 'hut'
    },
    {
      id: 'south-second-section_banaiyike-fork',
      name: '三岔路口',
      i18nKey: 'south-second-section.banaiyike-fork',
      nodeType: 'fork'
    },
    // --- 荖濃溪／稜線支線 ---
    {
      id: 'south-second-section_laonong-river',
      name: '荖濃溪',
      i18nKey: 'south-second-section.laonong-river',
      nodeType: 'water-source'
    },
    {
      id: 'south-second-section_lengxian-fork',
      name: '稜線岔路',
      i18nKey: 'south-second-section.lengxian-fork',
      nodeType: 'fork'
    },
    {
      id: 'south-second-section_rhododendron-camp',
      name: '杜鵑營地',
      i18nKey: 'south-second-section.rhododendron-camp',
      nodeType: 'camp'
    },
    {
      id: 'south-second-section_rhododendron-fork',
      name: '四岔路口',
      i18nKey: 'south-second-section.rhododendron-fork',
      nodeType: 'fork'
    },
    {
      id: 'south-second-section_nan-camp',
      name: '南營地',
      i18nKey: 'south-second-section.nan-camp',
      nodeType: 'camp'
    },
    {
      id: 'south-second-section_laonong-river-bottom-camp',
      name: '老濃溪底營地',
      i18nKey: 'south-second-section.laonong-river-bottom-camp',
      nodeType: 'camp'
    },
    // --- 中央金礦山屋 → 秀姑坪 ---
    {
      id: 'south-second-section_zhongyangjinkuang-hut',
      name: '中央金礦山屋',
      i18nKey: 'south-second-section.zhongyangjinkuang-hut',
      nodeType: 'hut'
    },
    {
      id: 'south-second-section_baiyangjinkuang-hut',
      name: '白洋金礦山屋',
      i18nKey: 'south-second-section.baiyangjinkuang-hut',
      nodeType: 'hut'
    },
    {
      id: 'south-second-section_xiuguping-fork',
      name: '秀姑坪岔路',
      i18nKey: 'south-second-section.xiuguping-fork',
      nodeType: 'fork'
    },
    {
      id: 'south-second-section_xiuguluan-mountain-south-trailhead',
      name: '秀姑巒山南登山口',
      i18nKey: 'south-second-section.xiuguluan-mountain-south-trailhead',
      nodeType: 'fork'
    },
    {
      id: 'mountain_xiuguluan-mountain',
      name: '秀姑巒山',
      i18nKey: 'mountain.xiuguluan-mountain',
      nodeType: 'peak'
    },
    {
      id: 'south-second-section_xiuma-hut-ruins',
      name: '秀馬山屋舊址',
      i18nKey: 'south-second-section.xiuma-hut-ruins',
      nodeType: 'camp'
    },
    // --- 大水窟山 → 黑水塘 ---
    {
      id: 'mountain_dashuiku-mountain',
      name: '大水窟山',
      i18nKey: 'mountain.dashuiku-mountain',
      nodeType: 'peak'
    },
    {
      id: 'south-second-section_dashuiku-hut',
      name: '大水窟山屋',
      i18nKey: 'south-second-section.dashuiku-hut',
      nodeType: 'hut'
    },
    {
      id: 'mountain_south-dashuiku-mountain',
      name: '南大水窟山',
      i18nKey: 'mountain.south-dashuiku-mountain',
      nodeType: 'peak'
    },
    {
      id: 'south-second-section_heishui-fork',
      name: '三岔路口',
      i18nKey: 'south-second-section.heishui-fork',
      nodeType: 'fork'
    },
    {
      id: 'south-second-section_heishui-pond',
      name: '黑水塘',
      i18nKey: 'south-second-section.heishui-pond',
      nodeType: 'water-source'
    },
    // --- 達芬尖山登山口 → 轆轆谷山屋 ---
    {
      id: 'south-second-section_dafenjian-mountain-trailhead',
      name: '達芬尖山登山口',
      i18nKey: 'south-second-section.dafenjian-mountain-trailhead',
      nodeType: 'fork'
    },
    {
      id: 'mountain_dafenjian-mountain',
      name: '達芬尖山',
      i18nKey: 'mountain.dafenjian-mountain',
      nodeType: 'peak'
    },
    {
      id: 'south-second-section_tafengu-hut',
      name: '塔芬谷山屋',
      i18nKey: 'south-second-section.tafengu-hut',
      nodeType: 'hut'
    },
    {
      id: 'mountain_tafen-mountain',
      name: '塔芬山',
      i18nKey: 'mountain.tafen-mountain',
      nodeType: 'peak'
    },
    {
      id: 'south-second-section_tafen-pond',
      name: '塔芬池',
      i18nKey: 'south-second-section.tafen-pond',
      nodeType: 'water-source'
    },
    {
      id: 'south-second-section_lulu-mountain-trailhead',
      name: '轆轆山登山口',
      i18nKey: 'south-second-section.lulu-mountain-trailhead',
      nodeType: 'fork'
    },
    {
      id: 'mountain_lulu-east-peak',
      name: '轆轆東峰',
      i18nKey: 'mountain.lulu-east-peak',
      nodeType: 'peak'
    },
    {
      id: 'mountain_lulu-mountain',
      name: '轆轆山',
      i18nKey: 'mountain.lulu-mountain',
      nodeType: 'peak'
    },
    {
      id: 'south-second-section_lulugu-hut',
      name: '轆轆谷山屋',
      i18nKey: 'south-second-section.lulugu-hut',
      nodeType: 'hut'
    },
    // --- 雲峰東峰三岔路口營地 → 拉庫音溪山屋 ---
    {
      id: 'south-second-section_yun-peak-east-peak-fork-camp',
      name: '雲峰東峰三岔路口營地',
      i18nKey: 'south-second-section.yun-peak-east-peak-fork-camp',
      nodeType: 'camp'
    },
    {
      id: 'mountain_yun-peak',
      name: '雲峰',
      i18nKey: 'mountain.yun-peak',
      nodeType: 'peak'
    },
    {
      id: 'south-second-section_yun-peak-water-source',
      name: '水源',
      i18nKey: 'south-second-section.yun-peak-water-source',
      nodeType: 'water-source'
    },
    {
      id: 'south-second-section_xibei-saddle-nanshuang-pond-camp',
      name: '西北鞍南雙池營地',
      i18nKey: 'south-second-section.xibei-saddle-nanshuang-pond-camp',
      nodeType: 'camp'
    },
    {
      id: 'mountain_nanshuangtou-mountain',
      name: '南雙頭山',
      i18nKey: 'mountain.nanshuangtou-mountain',
      nodeType: 'peak'
    },
    {
      id: 'global_lakuyin-river-hut',
      name: '拉庫音溪山屋',
      i18nKey: 'global.lakuyin-river-hut',
      nodeType: 'hut'
    },
    // --- 新康山岔路口 → 嘉明湖／三叉山 ---
    {
      id: 'global_xinkang-mountain-fork',
      name: '新康山岔路口',
      i18nKey: 'global.xinkang-mountain-fork',
      nodeType: 'fork'
    },
    {
      id: 'global_jiaming-lake-fork',
      name: '嘉明湖岔路口',
      i18nKey: 'global.jiaming-lake-fork',
      nodeType: 'fork'
    },
    {
      id: 'global_jiaming-lake',
      name: '嘉明湖',
      i18nKey: 'global.jiaming-lake',
      nodeType: 'water-source'
    },
    {
      id: 'global_sancha-mountain-trailhead',
      name: '三叉山登山口',
      i18nKey: 'global.sancha-mountain-trailhead',
      nodeType: 'fork'
    },
    {
      id: 'mountain_sancha-mountain',
      name: '三叉山',
      i18nKey: 'mountain.sancha-mountain',
      nodeType: 'peak'
    },
    // --- 北峰下解說牌 → 向陽森林遊樂區 ---
    {
      id: 'global_north-peak-sign',
      name: '北峰下解說牌',
      i18nKey: 'global.north-peak-sign',
      nodeType: 'other'
    },
    {
      id: 'global_north-peak-fork',
      name: '三岔路口',
      i18nKey: 'global.north-peak-fork',
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
      id: 'global_xice-trailhead',
      name: '西側登山口',
      i18nKey: 'global.xice-trailhead',
      nodeType: 'fork'
    },
    {
      id: 'global_xiangyang-hut',
      name: '向陽山屋',
      i18nKey: 'global.xiangyang-hut',
      nodeType: 'hut'
    },
    {
      id: 'global_lindao-trailhead',
      name: '林道登山口',
      i18nKey: 'global.lindao-trailhead',
      nodeType: 'fork'
    },
    {
      id: 'global_xiangyang-forest-recreation-area',
      name: '向陽森林遊樂區',
      i18nKey: 'global.xiangyang-forest-recreation-area',
      nodeType: 'other'
    },
    // --- 獨立節點（圖上無分鐘數連線）---
    {
      id: 'global_pass-hut',
      name: '埡口山莊',
      i18nKey: 'global.pass-hut',
      nodeType: 'hut'
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
    // 觀高坪 <-> 八通關草原
    {
      from: 'global_guangao-ping',
      to: 'global_batongguan-meadow',
      minutes: 65,
      note: '稜線捷徑，G17 標示'
    },
    {
      from: 'global_batongguan-meadow',
      to: 'global_guangao-ping',
      minutes: 75,
      note: '稜線捷徑，G17 標示'
    },
    // 八通關山登山口 <-> 巴奈伊克山屋
    {
      from: 'global_batongguan-mountain-trailhead',
      to: 'south-second-section_banaiyike-hut',
      minutes: 30
    },
    {
      from: 'south-second-section_banaiyike-hut',
      to: 'global_batongguan-mountain-trailhead',
      minutes: 30
    },
    // 巴奈伊克山屋 <-> 三岔路口
    {
      from: 'south-second-section_banaiyike-hut',
      to: 'south-second-section_banaiyike-fork',
      minutes: 15
    },
    {
      from: 'south-second-section_banaiyike-fork',
      to: 'south-second-section_banaiyike-hut',
      minutes: 15
    },
    // 三岔路口 <-> 荖濃溪
    {
      from: 'south-second-section_banaiyike-fork',
      to: 'south-second-section_laonong-river',
      minutes: 15
    },
    {
      from: 'south-second-section_laonong-river',
      to: 'south-second-section_banaiyike-fork',
      minutes: 20
    },
    // 荖濃溪 <-> 稜線岔路
    {
      from: 'south-second-section_laonong-river',
      to: 'south-second-section_lengxian-fork',
      minutes: 105
    },
    {
      from: 'south-second-section_lengxian-fork',
      to: 'south-second-section_laonong-river',
      minutes: 55
    },
    // 稜線岔路 <-> 杜鵑營地
    {
      from: 'south-second-section_lengxian-fork',
      to: 'south-second-section_rhododendron-camp',
      minutes: 45
    },
    {
      from: 'south-second-section_rhododendron-camp',
      to: 'south-second-section_lengxian-fork',
      minutes: 45
    },
    // 杜鵑營地 <-> 四岔路口
    {
      from: 'south-second-section_rhododendron-camp',
      to: 'south-second-section_rhododendron-fork',
      minutes: 70
    },
    {
      from: 'south-second-section_rhododendron-fork',
      to: 'south-second-section_rhododendron-camp',
      minutes: 65
    },
    // 四岔路口 <-> 南營地
    {
      from: 'south-second-section_rhododendron-fork',
      to: 'south-second-section_nan-camp',
      minutes: 55
    },
    {
      from: 'south-second-section_nan-camp',
      to: 'south-second-section_rhododendron-fork',
      minutes: 55
    },
    // 四岔路口 <-> 老濃溪底營地
    {
      from: 'south-second-section_rhododendron-fork',
      to: 'south-second-section_laonong-river-bottom-camp',
      minutes: 50
    },
    {
      from: 'south-second-section_laonong-river-bottom-camp',
      to: 'south-second-section_rhododendron-fork',
      minutes: 90
    },
    // 三岔路口 <-> 中央金礦山屋
    {
      from: 'south-second-section_banaiyike-fork',
      to: 'south-second-section_zhongyangjinkuang-hut',
      minutes: 35
    },
    {
      from: 'south-second-section_zhongyangjinkuang-hut',
      to: 'south-second-section_banaiyike-fork',
      minutes: 30
    },
    // 稜線岔路 <-> 中央金礦山屋
    {
      from: 'south-second-section_lengxian-fork',
      to: 'south-second-section_zhongyangjinkuang-hut',
      minutes: 90
    },
    {
      from: 'south-second-section_zhongyangjinkuang-hut',
      to: 'south-second-section_lengxian-fork',
      minutes: 110
    },
    // 中央金礦山屋 <-> 白洋金礦山屋
    {
      from: 'south-second-section_zhongyangjinkuang-hut',
      to: 'south-second-section_baiyangjinkuang-hut',
      minutes: 190
    },
    {
      from: 'south-second-section_baiyangjinkuang-hut',
      to: 'south-second-section_zhongyangjinkuang-hut',
      minutes: 160
    },
    // 白洋金礦山屋 <-> 秀姑坪岔路
    {
      from: 'south-second-section_baiyangjinkuang-hut',
      to: 'south-second-section_xiuguping-fork',
      minutes: 30
    },
    {
      from: 'south-second-section_xiuguping-fork',
      to: 'south-second-section_baiyangjinkuang-hut',
      minutes: 20
    },
    // 秀姑坪岔路 <-> 秀姑巒山南登山口
    {
      from: 'south-second-section_xiuguping-fork',
      to: 'south-second-section_xiuguluan-mountain-south-trailhead',
      minutes: 60
    },
    {
      from: 'south-second-section_xiuguluan-mountain-south-trailhead',
      to: 'south-second-section_xiuguping-fork',
      minutes: 40
    },
    // 秀姑巒山南登山口 <-> 秀姑巒山
    {
      from: 'south-second-section_xiuguluan-mountain-south-trailhead',
      to: 'mountain_xiuguluan-mountain',
      minutes: 50
    },
    {
      from: 'mountain_xiuguluan-mountain',
      to: 'south-second-section_xiuguluan-mountain-south-trailhead',
      minutes: 60,
      note: '輕裝 30 分'
    },
    // 秀姑巒山 <-> 秀馬山屋舊址
    {
      from: 'mountain_xiuguluan-mountain',
      to: 'south-second-section_xiuma-hut-ruins',
      minutes: 20
    },
    {
      from: 'south-second-section_xiuma-hut-ruins',
      to: 'mountain_xiuguluan-mountain',
      minutes: 25
    },
    // 秀姑巒山南登山口 <-> 秀馬山屋舊址
    {
      from: 'south-second-section_xiuguluan-mountain-south-trailhead',
      to: 'south-second-section_xiuma-hut-ruins',
      minutes: 60
    },
    {
      from: 'south-second-section_xiuma-hut-ruins',
      to: 'south-second-section_xiuguluan-mountain-south-trailhead',
      minutes: 50
    },
    // 秀姑坪岔路 <-> 大水窟山
    {
      from: 'south-second-section_xiuguping-fork',
      to: 'mountain_dashuiku-mountain',
      minutes: 140
    },
    {
      from: 'mountain_dashuiku-mountain',
      to: 'south-second-section_xiuguping-fork',
      minutes: 100
    },
    // 四岔路口 <-> 大水窟山
    {
      from: 'south-second-section_rhododendron-fork',
      to: 'mountain_dashuiku-mountain',
      minutes: 140
    },
    {
      from: 'mountain_dashuiku-mountain',
      to: 'south-second-section_rhododendron-fork',
      minutes: 110
    },
    // 大水窟山 <-> 大水窟山屋
    {
      from: 'mountain_dashuiku-mountain',
      to: 'south-second-section_dashuiku-hut',
      minutes: 100
    },
    {
      from: 'south-second-section_dashuiku-hut',
      to: 'mountain_dashuiku-mountain',
      minutes: 140
    },
    // 南營地 <-> 大水窟山屋
    {
      from: 'south-second-section_nan-camp',
      to: 'south-second-section_dashuiku-hut',
      minutes: 70
    },
    {
      from: 'south-second-section_dashuiku-hut',
      to: 'south-second-section_nan-camp',
      minutes: 70
    },
    // 大水窟山屋 <-> 南大水窟山
    {
      from: 'south-second-section_dashuiku-hut',
      to: 'mountain_south-dashuiku-mountain',
      minutes: 95
    },
    {
      from: 'mountain_south-dashuiku-mountain',
      to: 'south-second-section_dashuiku-hut',
      minutes: 60
    },
    // 南大水窟山 <-> 三岔路口
    {
      from: 'mountain_south-dashuiku-mountain',
      to: 'south-second-section_heishui-fork',
      minutes: 95
    },
    {
      from: 'south-second-section_heishui-fork',
      to: 'mountain_south-dashuiku-mountain',
      minutes: 120
    },
    // 老濃溪底營地 <-> 三岔路口
    {
      from: 'south-second-section_laonong-river-bottom-camp',
      to: 'south-second-section_heishui-fork',
      minutes: 130
    },
    {
      from: 'south-second-section_heishui-fork',
      to: 'south-second-section_laonong-river-bottom-camp',
      minutes: 95
    },
    // 三岔路口 <-> 黑水塘
    {
      from: 'south-second-section_heishui-fork',
      to: 'south-second-section_heishui-pond',
      minutes: 5
    },
    {
      from: 'south-second-section_heishui-pond',
      to: 'south-second-section_heishui-fork',
      minutes: 7
    },
    // 黑水塘 <-> 達芬尖山登山口
    {
      from: 'south-second-section_heishui-pond',
      to: 'south-second-section_dafenjian-mountain-trailhead',
      minutes: 135
    },
    {
      from: 'south-second-section_dafenjian-mountain-trailhead',
      to: 'south-second-section_heishui-pond',
      minutes: 120
    },
    // 達芬尖山 <-> 達芬尖山登山口
    {
      from: 'mountain_dafenjian-mountain',
      to: 'south-second-section_dafenjian-mountain-trailhead',
      minutes: 10
    },
    {
      from: 'south-second-section_dafenjian-mountain-trailhead',
      to: 'mountain_dafenjian-mountain',
      minutes: 20
    },
    // 達芬尖山登山口 <-> 塔芬谷山屋
    {
      from: 'south-second-section_dafenjian-mountain-trailhead',
      to: 'south-second-section_tafengu-hut',
      minutes: 90
    },
    {
      from: 'south-second-section_tafengu-hut',
      to: 'south-second-section_dafenjian-mountain-trailhead',
      minutes: 150
    },
    // 塔芬谷山屋 <-> 塔芬山
    {
      from: 'south-second-section_tafengu-hut',
      to: 'mountain_tafen-mountain',
      minutes: 160
    },
    {
      from: 'mountain_tafen-mountain',
      to: 'south-second-section_tafengu-hut',
      minutes: 80
    },
    // 塔芬山 <-> 塔芬池
    {
      from: 'mountain_tafen-mountain',
      to: 'south-second-section_tafen-pond',
      minutes: 20
    },
    {
      from: 'south-second-section_tafen-pond',
      to: 'mountain_tafen-mountain',
      minutes: 30
    },
    // 塔芬池 <-> 轆轆山登山口
    {
      from: 'south-second-section_tafen-pond',
      to: 'south-second-section_lulu-mountain-trailhead',
      minutes: 250
    },
    {
      from: 'south-second-section_lulu-mountain-trailhead',
      to: 'south-second-section_tafen-pond',
      minutes: 210
    },
    // 轆轆東峰 <-> 轆轆山登山口
    {
      from: 'mountain_lulu-east-peak',
      to: 'south-second-section_lulu-mountain-trailhead',
      minutes: 3
    },
    {
      from: 'south-second-section_lulu-mountain-trailhead',
      to: 'mountain_lulu-east-peak',
      minutes: 5
    },
    // 轆轆山 <-> 轆轆東峰
    {
      from: 'mountain_lulu-mountain',
      to: 'mountain_lulu-east-peak',
      minutes: 15
    },
    {
      from: 'mountain_lulu-east-peak',
      to: 'mountain_lulu-mountain',
      minutes: 25
    },
    // 轆轆山登山口 <-> 轆轆谷山屋
    {
      from: 'south-second-section_lulu-mountain-trailhead',
      to: 'south-second-section_lulugu-hut',
      minutes: 45
    },
    {
      from: 'south-second-section_lulugu-hut',
      to: 'south-second-section_lulu-mountain-trailhead',
      minutes: 70
    },
    // 轆轆谷山屋 <-> 雲峰東峰三岔路口營地
    {
      from: 'south-second-section_lulugu-hut',
      to: 'south-second-section_yun-peak-east-peak-fork-camp',
      minutes: 240
    },
    {
      from: 'south-second-section_yun-peak-east-peak-fork-camp',
      to: 'south-second-section_lulugu-hut',
      minutes: 200
    },
    // 雲峰 <-> 雲峰東峰三岔路口營地
    {
      from: 'mountain_yun-peak',
      to: 'south-second-section_yun-peak-east-peak-fork-camp',
      minutes: 90
    },
    {
      from: 'south-second-section_yun-peak-east-peak-fork-camp',
      to: 'mountain_yun-peak',
      minutes: 120
    },
    // 雲峰東峰三岔路口營地 <-> 水源
    {
      from: 'south-second-section_yun-peak-east-peak-fork-camp',
      to: 'south-second-section_yun-peak-water-source',
      minutes: 15
    },
    {
      from: 'south-second-section_yun-peak-water-source',
      to: 'south-second-section_yun-peak-east-peak-fork-camp',
      minutes: 20
    },
    // 雲峰東峰三岔路口營地 <-> 西北鞍南雙池營地
    {
      from: 'south-second-section_yun-peak-east-peak-fork-camp',
      to: 'south-second-section_xibei-saddle-nanshuang-pond-camp',
      minutes: 150
    },
    {
      from: 'south-second-section_xibei-saddle-nanshuang-pond-camp',
      to: 'south-second-section_yun-peak-east-peak-fork-camp',
      minutes: 170
    },
    // 西北鞍南雙池營地 <-> 南雙頭山
    {
      from: 'south-second-section_xibei-saddle-nanshuang-pond-camp',
      to: 'mountain_nanshuangtou-mountain',
      minutes: 50
    },
    {
      from: 'mountain_nanshuangtou-mountain',
      to: 'south-second-section_xibei-saddle-nanshuang-pond-camp',
      minutes: 25
    },
    // 南雙頭山 <-> 拉庫音溪山屋
    {
      from: 'mountain_nanshuangtou-mountain',
      to: 'global_lakuyin-river-hut',
      minutes: 110
    },
    {
      from: 'global_lakuyin-river-hut',
      to: 'mountain_nanshuangtou-mountain',
      minutes: 180
    },
    // 拉庫音溪山屋 <-> 新康山岔路口
    {
      from: 'global_lakuyin-river-hut',
      to: 'global_xinkang-mountain-fork',
      minutes: 220
    },
    {
      from: 'global_xinkang-mountain-fork',
      to: 'global_lakuyin-river-hut',
      minutes: 130
    },
    // 新康山岔路口 <-> 嘉明湖岔路口
    {
      from: 'global_xinkang-mountain-fork',
      to: 'global_jiaming-lake-fork',
      minutes: 30
    },
    {
      from: 'global_jiaming-lake-fork',
      to: 'global_xinkang-mountain-fork',
      minutes: 40
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
    // 三叉山 <-> 嘉明湖岔路口
    {
      from: 'mountain_sancha-mountain',
      to: 'global_jiaming-lake-fork',
      minutes: 10
    },
    {
      from: 'global_jiaming-lake-fork',
      to: 'mountain_sancha-mountain',
      minutes: 20
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
    // 三岔路口 <-> 向陽山
    {
      from: 'global_north-peak-fork',
      to: 'mountain_xiangyang-mountain',
      minutes: 60
    },
    {
      from: 'mountain_xiangyang-mountain',
      to: 'global_north-peak-fork',
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
    }
  ]
}
