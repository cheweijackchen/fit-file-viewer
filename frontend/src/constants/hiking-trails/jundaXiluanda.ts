import { type Trail } from '@/model/hikingTrail'

export const jundaXiluanda: Trail = {
  id: 'junda-xiluanda',
  name: '郡大山西巒大山',
  nameEn: 'Mt. Junda and Mt. Xiluanda',
  i18nKey: 'junda-xiluanda.junda-xiluanda',
  nodes: [
    // --- 郡大山 ---
    {
      id: 'junda-xiluanda_32k-trailhead',
      name: '32K登山口',
      i18nKey: 'junda-xiluanda.32k-trailhead',
      nodeType: 'fork'
    },
    {
      id: 'mountain_wangxiang-mountain',
      name: '望鄉山',
      i18nKey: 'mountain.wangxiang-mountain',
      nodeType: 'peak'
    },
    {
      id: 'mountain_junda-north-peak',
      name: '郡大山北峰',
      i18nKey: 'mountain.junda-north-peak',
      nodeType: 'peak'
    },
    {
      id: 'mountain_junda-mountain',
      name: '郡大山',
      i18nKey: 'mountain.junda-mountain',
      nodeType: 'peak'
    },
    // --- 西巒大山 ---
    {
      id: 'junda-xiluanda_17-1k-gate',
      name: '17.1K柵欄',
      i18nKey: 'junda-xiluanda.17-1k-gate',
      nodeType: 'other'
    },
    {
      id: 'junda-xiluanda_renlun-station',
      name: '人倫工作站',
      i18nKey: 'junda-xiluanda.renlun-station',
      nodeType: 'hut'
    },
    {
      id: 'junda-xiluanda_renlun-first-trailhead',
      name: '登山口',
      i18nKey: 'junda-xiluanda.renlun-first-trailhead',
      nodeType: 'fork'
    },
    {
      id: 'junda-xiluanda_forest-camp',
      name: '森林營地',
      i18nKey: 'junda-xiluanda.forest-camp',
      nodeType: 'camp'
    },
    {
      id: 'junda-xiluanda_liaowangtai-camp',
      name: '瞭望台營地',
      i18nKey: 'junda-xiluanda.liaowangtai-camp',
      nodeType: 'camp'
    },
    {
      id: 'junda-xiluanda_viewpoint',
      name: '展望點',
      i18nKey: 'junda-xiluanda.viewpoint',
      nodeType: 'other'
    },
    {
      id: 'mountain_xiluanda-mountain',
      name: '西巒大山',
      i18nKey: 'mountain.xiluanda-mountain',
      nodeType: 'peak'
    }
  ],
  edges: [
    // 32K登山口 <-> 望鄉山
    {
      from: 'junda-xiluanda_32k-trailhead',
      to: 'mountain_wangxiang-mountain',
      minutes: 40
    },
    {
      from: 'mountain_wangxiang-mountain',
      to: 'junda-xiluanda_32k-trailhead',
      minutes: 25
    },
    // 望鄉山 <-> 郡大山北峰
    {
      from: 'mountain_wangxiang-mountain',
      to: 'mountain_junda-north-peak',
      minutes: 100
    },
    {
      from: 'mountain_junda-north-peak',
      to: 'mountain_wangxiang-mountain',
      minutes: 60
    },
    // 郡大山北峰 <-> 郡大山
    {
      from: 'mountain_junda-north-peak',
      to: 'mountain_junda-mountain',
      minutes: 65
    },
    {
      from: 'mountain_junda-mountain',
      to: 'mountain_junda-north-peak',
      minutes: 55
    },
    // 17.1K柵欄 <-> 人倫工作站
    {
      from: 'junda-xiluanda_17-1k-gate',
      to: 'junda-xiluanda_renlun-station',
      minutes: 5
    },
    {
      from: 'junda-xiluanda_renlun-station',
      to: 'junda-xiluanda_17-1k-gate',
      minutes: 5
    },
    // 人倫工作站 <-> 登山口
    {
      from: 'junda-xiluanda_renlun-station',
      to: 'junda-xiluanda_renlun-first-trailhead',
      minutes: 30
    },
    {
      from: 'junda-xiluanda_renlun-first-trailhead',
      to: 'junda-xiluanda_renlun-station',
      minutes: 30
    },
    // 登山口 <-> 森林營地
    {
      from: 'junda-xiluanda_renlun-first-trailhead',
      to: 'junda-xiluanda_forest-camp',
      minutes: 120
    },
    {
      from: 'junda-xiluanda_forest-camp',
      to: 'junda-xiluanda_renlun-first-trailhead',
      minutes: 80
    },
    // 森林營地 <-> 瞭望台營地
    {
      from: 'junda-xiluanda_forest-camp',
      to: 'junda-xiluanda_liaowangtai-camp',
      minutes: 60
    },
    {
      from: 'junda-xiluanda_liaowangtai-camp',
      to: 'junda-xiluanda_forest-camp',
      minutes: 45
    },
    // 瞭望台營地 <-> 展望點
    {
      from: 'junda-xiluanda_liaowangtai-camp',
      to: 'junda-xiluanda_viewpoint',
      minutes: 160
    },
    {
      from: 'junda-xiluanda_viewpoint',
      to: 'junda-xiluanda_liaowangtai-camp',
      minutes: 100
    },
    // 展望點 <-> 西巒大山
    {
      from: 'junda-xiluanda_viewpoint',
      to: 'mountain_xiluanda-mountain',
      minutes: 20
    },
    {
      from: 'mountain_xiluanda-mountain',
      to: 'junda-xiluanda_viewpoint',
      minutes: 15
    }
  ]
}
