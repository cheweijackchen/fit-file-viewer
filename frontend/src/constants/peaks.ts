
export const MountainCategory = {
  YushanGroup: '玉山群峰',
  XueshanGroup: '雪山群峰',
  Wuling4: '武陵四秀',
  DabaGroup: '大霸尖山群',
  HehuanGroup: '合歡群峰',
  QilaiGroup: '奇萊群峰',
  NenggaoGroup: '能高安東軍',
  North1: '北一段',
  North2: '北二段',
  South1: '南一段',
  South2: '南二段',
  South3: '南三段',
  Zhongheng4Spicy: '中橫四辣',
  Nanheng3: '南橫三星',
  MaboTraverse: '馬博橫斷',
  XinkangTraverse: '新康橫斷',
  GanzhuowanGroup: '干卓萬群峰',
  Other: '其他'
} as const

export type MountainCategory = typeof MountainCategory[keyof typeof MountainCategory]

export interface Coordinate {
  readonly lat: number; // 緯度 (WGS84)
  readonly lng: number; // 經度 (WGS84)
}

export interface MountainPeak {
  readonly rank: number;
  readonly name: string;
  readonly elevation: number;
  readonly category: MountainCategory;
  readonly coordinate: Coordinate;
}

export const Taiwan100MountainPeak = {
  P001: {
    rank: 1,
    name: '玉山',
    elevation: 3952,
    category: MountainCategory.YushanGroup,
    coordinate: {
      lat: 23.4700,
      lng: 120.9572
    }
  },
  P002: {
    rank: 2,
    name: '雪山',
    elevation: 3886,
    category: MountainCategory.XueshanGroup,
    coordinate: {
      lat: 24.3853,
      lng: 121.2320
    }
  },
  P003: {
    rank: 3,
    name: '玉山東峰',
    elevation: 3869,
    category: MountainCategory.YushanGroup,
    coordinate: {
      lat: 23.4714,
      lng: 120.9673
    }
  },
  P004: {
    rank: 4,
    name: '玉山北峰',
    elevation: 3858,
    category: MountainCategory.YushanGroup,
    coordinate: {
      lat: 23.4876,
      lng: 120.9594
    }
  },
  P005: {
    rank: 5,
    name: '玉山南峰',
    elevation: 3844,
    category: MountainCategory.YushanGroup,
    coordinate: {
      lat: 23.4532,
      lng: 120.9545
    }
  },
  P006: {
    rank: 6,
    name: '秀姑巒山',
    elevation: 3805,
    category: MountainCategory.South2,
    coordinate: {
      lat: 23.4952,
      lng: 121.0594
    }
  },
  P007: {
    rank: 7,
    name: '馬博拉斯山',
    elevation: 3785,
    category: MountainCategory.MaboTraverse,
    coordinate: {
      lat: 23.5181,
      lng: 121.0663
    }
  },
  P008: {
    rank: 8,
    name: '南湖大山',
    elevation: 3742,
    category: MountainCategory.North1,
    coordinate: {
      lat: 24.3642,
      lng: 121.3934
    }
  },
  P009: {
    rank: 9,
    name: '東小南山',
    elevation: 3709,
    category: MountainCategory.YushanGroup,
    coordinate: {
      lat: 23.4442,
      lng: 120.9551
    }
  },
  P010: {
    rank: 10,
    name: '中央尖山',
    elevation: 3705,
    category: MountainCategory.North1,
    coordinate: {
      lat: 24.3142,
      lng: 121.4194
    }
  },
  P011: {
    rank: 11,
    name: '雪山北峰',
    elevation: 3703,
    category: MountainCategory.XueshanGroup,
    coordinate: {
      lat: 24.4172,
      lng: 121.2423
    }
  },
  P012: {
    rank: 12,
    name: '關山',
    elevation: 3668,
    category: MountainCategory.South1,
    coordinate: {
      lat: 23.2273,
      lng: 120.9092
    }
  },
  P013: {
    rank: 13,
    name: '大水窟山',
    elevation: 3642,
    category: MountainCategory.South2,
    coordinate: {
      lat: 23.4772,
      lng: 121.0544
    }
  },
  P014: {
    rank: 14,
    name: '南湖大山東峰',
    elevation: 3632,
    category: MountainCategory.North1,
    coordinate: {
      lat: 24.3634,
      lng: 121.4054
    }
  },
  P015: {
    rank: 15,
    name: '東郡大山',
    elevation: 3619,
    category: MountainCategory.South3,
    coordinate: {
      lat: 23.6334,
      lng: 121.1345
    }
  },
  P016: {
    rank: 16,
    name: '奇萊主山北峰',
    elevation: 3607,
    category: MountainCategory.QilaiGroup,
    coordinate: {
      lat: 24.1183,
      lng: 121.3323
    }
  },
  P017: {
    rank: 17,
    name: '向陽山',
    elevation: 3603,
    category: MountainCategory.South2,
    coordinate: {
      lat: 23.2843,
      lng: 120.9594
    }
  },
  P018: {
    rank: 18,
    name: '大劍山',
    elevation: 3594,
    category: MountainCategory.XueshanGroup,
    coordinate: {
      lat: 24.3314,
      lng: 121.1513
    }
  },
  P019: {
    rank: 19,
    name: '雲峰',
    elevation: 3564,
    category: MountainCategory.South2,
    coordinate: {
      lat: 23.3853,
      lng: 121.0334
    }
  },
  P020: {
    rank: 20,
    name: '奇萊主山',
    elevation: 3560,
    category: MountainCategory.QilaiGroup,
    coordinate: {
      lat: 24.1023,
      lng: 121.3214
    }
  },
  P021: {
    rank: 21,
    name: '馬利加南山',
    elevation: 3546,
    category: MountainCategory.MaboTraverse,
    coordinate: {
      lat: 23.5113,
      lng: 121.1114
    }
  },
  P022: {
    rank: 22,
    name: '南湖北山',
    elevation: 3536,
    category: MountainCategory.North1,
    coordinate: {
      lat: 24.3854,
      lng: 121.3723
    }
  },
  P023: {
    rank: 23,
    name: '大雪山',
    elevation: 3530,
    category: MountainCategory.XueshanGroup,
    coordinate: {
      lat: 24.3033,
      lng: 121.0872
    }
  },
  P024: {
    rank: 24,
    name: '品田山',
    elevation: 3524,
    category: MountainCategory.Wuling4,
    coordinate: {
      lat: 24.4283,
      lng: 121.2644
    }
  },
  P025: {
    rank: 25,
    name: '玉山西峰',
    elevation: 3518,
    category: MountainCategory.YushanGroup,
    coordinate: {
      lat: 23.4734,
      lng: 120.9413
    }
  },
  P026: {
    rank: 26,
    name: '頭鷹山',
    elevation: 3510,
    category: MountainCategory.XueshanGroup,
    coordinate: {
      lat: 24.3163,
      lng: 121.1074
    }
  },
  P027: {
    rank: 27,
    name: '三叉山',
    elevation: 3496,
    category: MountainCategory.South2,
    coordinate: {
      lat: 23.2984,
      lng: 121.0063
    }
  },
  P028: {
    rank: 28,
    name: '大霸尖山',
    elevation: 3492,
    category: MountainCategory.DabaGroup,
    coordinate: {
      lat: 24.4564,
      lng: 121.2584
    }
  },
  P029: {
    rank: 29,
    name: '南湖大山南峰',
    elevation: 3475,
    category: MountainCategory.North1,
    coordinate: {
      lat: 24.3292,
      lng: 121.3943
    }
  },
  P030: {
    rank: 30,
    name: '東巒大山',
    elevation: 3468,
    category: MountainCategory.South3,
    coordinate: {
      lat: 23.6493,
      lng: 121.1344
    }
  },
  P031: {
    rank: 31,
    name: '無明山',
    elevation: 3451,
    category: MountainCategory.North2,
    coordinate: {
      lat: 24.2644,
      lng: 121.3624
    }
  },
  P032: {
    rank: 32,
    name: '巴巴山',
    elevation: 3449,
    category: MountainCategory.North1,
    coordinate: {
      lat: 24.3224,
      lng: 121.3965
    }
  },
  P033: {
    rank: 33,
    name: '馬西山',
    elevation: 3443,
    category: MountainCategory.MaboTraverse,
    coordinate: {
      lat: 23.5134,
      lng: 121.1963
    }
  },
  P034: {
    rank: 34,
    name: '合歡山北峰',
    elevation: 3422,
    category: MountainCategory.HehuanGroup,
    coordinate: {
      lat: 24.1814,
      lng: 121.2813
    }
  },
  P035: {
    rank: 35,
    name: '合歡山東峰',
    elevation: 3421,
    category: MountainCategory.HehuanGroup,
    coordinate: {
      lat: 24.1374,
      lng: 121.2854
    }
  },
  P036: {
    rank: 36,
    name: '小霸尖山',
    elevation: 3418,
    category: MountainCategory.DabaGroup,
    coordinate: {
      lat: 24.4523,
      lng: 121.2523
    }
  },
  P037: {
    rank: 37,
    name: '合歡山主峰',
    elevation: 3417,
    category: MountainCategory.HehuanGroup,
    coordinate: {
      lat: 24.1432,
      lng: 121.2723
    }
  },
  P038: {
    rank: 38,
    name: '南玉山',
    elevation: 3383,
    category: MountainCategory.YushanGroup,
    coordinate: {
      lat: 23.4192,
      lng: 120.9304
    }
  },
  P039: {
    rank: 39,
    name: '畢祿山',
    elevation: 3371,
    category: MountainCategory.Zhongheng4Spicy,
    coordinate: {
      lat: 24.2132,
      lng: 121.3484
    }
  },
  P040: {
    rank: 40,
    name: '卓社大山',
    elevation: 3369,
    category: MountainCategory.GanzhuowanGroup,
    coordinate: {
      lat: 23.8123,
      lng: 121.1092
    }
  },
  P041: {
    rank: 41,
    name: '奇萊南峰',
    elevation: 3358,
    category: MountainCategory.QilaiGroup,
    coordinate: {
      lat: 24.0624,
      lng: 121.2874
    }
  },
  P042: {
    rank: 42,
    name: '南雙頭山',
    elevation: 3356,
    category: MountainCategory.South2,
    coordinate: {
      lat: 23.3653,
      lng: 121.0374
    }
  },
  P043: {
    rank: 43,
    name: '能高南峰',
    elevation: 3349,
    category: MountainCategory.NenggaoGroup,
    coordinate: {
      lat: 23.9572,
      lng: 121.2673
    }
  },
  P044: {
    rank: 44,
    name: '志佳陽大山',
    elevation: 3345,
    category: MountainCategory.XueshanGroup,
    coordinate: {
      lat: 24.3632,
      lng: 121.2214
    }
  },
  P045: {
    rank: 45,
    name: '白姑大山',
    elevation: 3342,
    category: MountainCategory.Zhongheng4Spicy,
    coordinate: {
      lat: 24.2014,
      lng: 121.1113
    }
  },
  P046: {
    rank: 46,
    name: '八通關山',
    elevation: 3335,
    category: MountainCategory.South2,
    coordinate: {
      lat: 23.4933,
      lng: 121.0114
    }
  },
  P047: {
    rank: 47,
    name: '新康山',
    elevation: 3331,
    category: MountainCategory.XinkangTraverse,
    coordinate: {
      lat: 23.3424,
      lng: 121.1964
    }
  },
  P048: {
    rank: 48,
    name: '桃山',
    elevation: 3325,
    category: MountainCategory.Wuling4,
    coordinate: {
      lat: 24.4324,
      lng: 121.3023
    }
  },
  P049: {
    rank: 49,
    name: '丹大山',
    elevation: 3325,
    category: MountainCategory.South3,
    coordinate: {
      lat: 23.5934,
      lng: 121.2134
    }
  },
  P050: {
    rank: 50,
    name: '佳陽山',
    elevation: 3314,
    category: MountainCategory.XueshanGroup,
    coordinate: {
      lat: 24.3123,
      lng: 121.1842
    }
  },
  P051: {
    rank: 51,
    name: '火石山',
    elevation: 3310,
    category: MountainCategory.XueshanGroup,
    coordinate: {
      lat: 24.3754,
      lng: 121.1593
    }
  },
  P052: {
    rank: 52,
    name: '池有山',
    elevation: 3303,
    category: MountainCategory.Wuling4,
    coordinate: {
      lat: 24.4362,
      lng: 121.2824
    }
  },
  P053: {
    rank: 53,
    name: '伊澤山',
    elevation: 3297,
    category: MountainCategory.DabaGroup,
    coordinate: {
      lat: 24.4714,
      lng: 121.2353
    }
  },
  P054: {
    rank: 54,
    name: '卑南主山',
    elevation: 3295,
    category: MountainCategory.South1,
    coordinate: {
      lat: 23.0454,
      lng: 120.8872
    }
  },
  P055: {
    rank: 55,
    name: '干卓萬山',
    elevation: 3284,
    category: MountainCategory.GanzhuowanGroup,
    coordinate: {
      lat: 23.8643,
      lng: 121.1342
    }
  },
  P056: {
    rank: 56,
    name: '太魯閣大山',
    elevation: 3283,
    category: MountainCategory.QilaiGroup,
    coordinate: {
      lat: 24.0864,
      lng: 121.4114
    }
  },
  P057: {
    rank: 57,
    name: '轆轆山',
    elevation: 3279,
    category: MountainCategory.South2,
    coordinate: {
      lat: 23.4194,
      lng: 121.0542
    }
  },
  P058: {
    rank: 58,
    name: '喀西帕南山',
    elevation: 3276,
    category: MountainCategory.MaboTraverse,
    coordinate: {
      lat: 23.4912,
      lng: 121.2223
    }
  },
  P059: {
    rank: 59,
    name: '內嶺爾山',
    elevation: 3275,
    category: MountainCategory.South3,
    coordinate: {
      lat: 23.5854,
      lng: 121.2003
    }
  },
  P060: {
    rank: 60,
    name: '鈴鳴山',
    elevation: 3272,
    category: MountainCategory.North2,
    coordinate: {
      lat: 24.2392,
      lng: 121.3194
    }
  },
  P061: {
    rank: 61,
    name: '郡大山',
    elevation: 3265,
    category: MountainCategory.Other,
    coordinate: {
      lat: 23.5852,
      lng: 120.9632
    }
  },
  P062: {
    rank: 62,
    name: '能高山',
    elevation: 3262,
    category: MountainCategory.NenggaoGroup,
    coordinate: {
      lat: 23.9964,
      lng: 121.2582
    }
  },
  P063: {
    rank: 63,
    name: '火山',
    elevation: 3258,
    category: MountainCategory.GanzhuowanGroup,
    coordinate: {
      lat: 23.8732,
      lng: 121.1634
    }
  },
  P064: {
    rank: 64,
    name: '劍山',
    elevation: 3253,
    category: MountainCategory.XueshanGroup,
    coordinate: {
      lat: 24.2953,
      lng: 121.1684
    }
  },
  P065: {
    rank: 65,
    name: '屏風山',
    elevation: 3250,
    category: MountainCategory.Zhongheng4Spicy,
    coordinate: {
      lat: 24.1624,
      lng: 121.3283
    }
  },
  P066: {
    rank: 66,
    name: '小關山',
    elevation: 3249,
    category: MountainCategory.South1,
    coordinate: {
      lat: 23.1552,
      lng: 120.9082
    }
  },
  P067: {
    rank: 67,
    name: '義西請馬至山',
    elevation: 3245,
    category: MountainCategory.South3,
    coordinate: {
      lat: 23.5354,
      lng: 121.1462
    }
  },
  P068: {
    rank: 68,
    name: '牧山',
    elevation: 3241,
    category: MountainCategory.GanzhuowanGroup,
    coordinate: {
      lat: 23.8642,
      lng: 121.1553
    }
  },
  P069: {
    rank: 69,
    name: '玉山前峰',
    elevation: 3239,
    category: MountainCategory.YushanGroup,
    coordinate: {
      lat: 23.4832,
      lng: 120.9254
    }
  },
  P070: {
    rank: 70,
    name: '石門山',
    elevation: 3237,
    category: MountainCategory.HehuanGroup,
    coordinate: {
      lat: 24.1502,
      lng: 121.2852
    }
  },
  P071: {
    rank: 71,
    name: '無雙山',
    elevation: 3231,
    category: MountainCategory.South3,
    coordinate: {
      lat: 23.5412,
      lng: 121.0974
    }
  },
  P072: {
    rank: 72,
    name: '塔關山',
    elevation: 3222,
    category: MountainCategory.Nanheng3,
    coordinate: {
      lat: 23.2512,
      lng: 120.9234
    }
  },
  P073: {
    rank: 73,
    name: '馬比杉山',
    elevation: 3211,
    category: MountainCategory.North1,
    coordinate: {
      lat: 24.3432,
      lng: 121.4323
    }
  },
  P074: {
    rank: 74,
    name: '達芬尖山',
    elevation: 3208,
    category: MountainCategory.South2,
    coordinate: {
      lat: 23.4534,
      lng: 121.0342
    }
  },
  P075: {
    rank: 75,
    name: '雪山東峰',
    elevation: 3201,
    category: MountainCategory.XueshanGroup,
    coordinate: {
      lat: 24.3822,
      lng: 121.2683
    }
  },
  P076: {
    rank: 76,
    name: '南華山',
    elevation: 3184,
    category: MountainCategory.QilaiGroup,
    coordinate: {
      lat: 24.0382,
      lng: 121.2852
    }
  },
  P077: {
    rank: 77,
    name: '關山嶺山',
    elevation: 3176,
    category: MountainCategory.Nanheng3,
    coordinate: {
      lat: 23.2682,
      lng: 120.9412
    }
  },
  P078: {
    rank: 78,
    name: '海諾南山',
    elevation: 3174,
    category: MountainCategory.South1,
    coordinate: {
      lat: 23.1852,
      lng: 120.8984
    }
  },
  P079: {
    rank: 79,
    name: '中雪山',
    elevation: 3173,
    category: MountainCategory.XueshanGroup,
    coordinate: {
      lat: 24.3164,
      lng: 121.0543
    }
  },
  P080: {
    rank: 80,
    name: '閂山',
    elevation: 3168,
    category: MountainCategory.North2,
    coordinate: {
      lat: 24.2542,
      lng: 121.3032
    }
  },
  P081: {
    rank: 81,
    name: '甘薯峰',
    elevation: 3158,
    category: MountainCategory.North2,
    coordinate: {
      lat: 24.2882,
      lng: 121.3653
    }
  },
  P082: {
    rank: 82,
    name: '西合歡山',
    elevation: 3145,
    category: MountainCategory.HehuanGroup,
    coordinate: {
      lat: 24.1832,
      lng: 121.2412
    }
  },
  P083: {
    rank: 83,
    name: '審馬陣山',
    elevation: 3141,
    category: MountainCategory.North1,
    coordinate: {
      lat: 24.3872,
      lng: 121.3552
    }
  },
  P084: {
    rank: 84,
    name: '喀拉業山',
    elevation: 3133,
    category: MountainCategory.Wuling4,
    coordinate: {
      lat: 24.4602,
      lng: 121.3142
    }
  },
  P085: {
    rank: 85,
    name: '庫哈諾辛山',
    elevation: 3115,
    category: MountainCategory.Nanheng3,
    coordinate: {
      lat: 23.2424,
      lng: 120.9002
    }
  },
  P086: {
    rank: 86,
    name: '加利山',
    elevation: 3112,
    category: MountainCategory.DabaGroup,
    coordinate: {
      lat: 24.4842,
      lng: 121.2012
    }
  },
  P087: {
    rank: 87,
    name: '白石山',
    elevation: 3110,
    category: MountainCategory.NenggaoGroup,
    coordinate: {
      lat: 23.9072,
      lng: 121.2852
    }
  },
  P088: {
    rank: 88,
    name: '磐石山',
    elevation: 3106,
    category: MountainCategory.QilaiGroup,
    coordinate: {
      lat: 24.1022,
      lng: 121.3684
    }
  },
  P089: {
    rank: 89,
    name: '帕托魯山',
    elevation: 3101,
    category: MountainCategory.QilaiGroup,
    coordinate: {
      lat: 24.0862,
      lng: 121.4423
    }
  },
  P090: {
    rank: 90,
    name: '北大武山',
    elevation: 3092,
    category: MountainCategory.Other,
    coordinate: {
      lat: 22.6282,
      lng: 120.7574
    }
  },
  P091: {
    rank: 91,
    name: '西巒大山',
    elevation: 3081,
    category: MountainCategory.Other,
    coordinate: {
      lat: 23.6932,
      lng: 120.9462
    }
  },
  P092: {
    rank: 92,
    name: '塔芬山',
    elevation: 3070,
    category: MountainCategory.South2,
    coordinate: {
      lat: 23.4352,
      lng: 121.0492
    }
  },
  P093: {
    rank: 93,
    name: '立霧主山',
    elevation: 3069,
    category: MountainCategory.QilaiGroup,
    coordinate: {
      lat: 24.0952,
      lng: 121.4052
    }
  },
  P094: {
    rank: 94,
    name: '安東軍山',
    elevation: 3068,
    category: MountainCategory.NenggaoGroup,
    coordinate: {
      lat: 23.8742,
      lng: 121.2652
    }
  },
  P095: {
    rank: 95,
    name: '光頭山',
    elevation: 3060,
    category: MountainCategory.NenggaoGroup,
    coordinate: {
      lat: 23.9312,
      lng: 121.2722
    }
  },
  P096: {
    rank: 96,
    name: '羊頭山',
    elevation: 3035,
    category: MountainCategory.Zhongheng4Spicy,
    coordinate: {
      lat: 24.2112,
      lng: 121.3702
    }
  },
  P097: {
    rank: 97,
    name: '布拉克桑山',
    elevation: 3026,
    category: MountainCategory.XinkangTraverse,
    coordinate: {
      lat: 23.2722,
      lng: 121.1442
    }
  },
  P098: {
    rank: 98,
    name: '駒盆山',
    elevation: 3022,
    category: MountainCategory.MaboTraverse,
    coordinate: {
      lat: 23.5412,
      lng: 121.0542
    }
  },
  P099: {
    rank: 99,
    name: '六順山',
    elevation: 2999,
    category: MountainCategory.Other,
    coordinate: {
      lat: 23.7312,
      lng: 121.2382
    }
  },
  P100: {
    rank: 100,
    name: '鹿山',
    elevation: 2981,
    category: MountainCategory.YushanGroup,
    coordinate: {
      lat: 23.4352,
      lng: 120.9752
    }
  }
} as const
