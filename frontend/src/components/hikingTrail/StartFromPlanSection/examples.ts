import type { HikingPlan } from '@/model/hikingTrail'

export type PlanTemplate = Omit<HikingPlan, 'id' | 'createdAt' | 'updatedAt'>

export const tripExamples: PlanTemplate[] = [{
  'name': '南二段逆走',
  'trailIds': [
    'south-second-section'
  ],
  'paceMultiplier': 1,
  'days': [
    {
      'id': '119404d2-8883-4a69-be55-aa68f9c46a15',
      'badges': [],
      'stops': [
        {
          'nodeId': 'global_dongpu-spring'
        },
        {
          'nodeId': 'global_batongguan-trailhead'
        },
        {
          'nodeId': 'global_sanshenggong'
        },
        {
          'nodeId': 'global_lele-spring-fork'
        },
        {
          'nodeId': 'global_yunlong-fall'
        },
        {
          'nodeId': 'global_lele-hut'
        },
        {
          'nodeId': 'global_yinv-fall'
        },
        {
          'nodeId': 'global_duiguan'
        },
        {
          'nodeId': 'global_guangao-ping'
        },
        {
          'nodeId': 'global_guangao-station'
        }
      ],
      'startingTime': '08:00'
    },
    {
      'id': 'b576d15a-ac2e-4d76-80ab-1a0335b743f0',
      'badges': [],
      'stops': [
        {
          'nodeId': 'global_guangao-station'
        },
        {
          'nodeId': 'global_guangao-ping'
        },
        {
          'nodeId': 'global_gudaobengduan-fork'
        },
        {
          'nodeId': 'global_batongguan-meadow'
        },
        {
          'nodeId': 'global_batongguan-mountain-trailhead'
        },
        {
          'nodeId': 'global_batongguan-mountain-fork'
        },
        {
          'nodeId': 'mountain_batongguan-mountain'
        },
        {
          'nodeId': 'global_batongguan-mountain-fork'
        },
        {
          'nodeId': 'global_batongguan-mountain-trailhead'
        },
        {
          'nodeId': 'global_banaiyike-hut'
        },
        {
          'nodeId': 'global_banaiyike-fork'
        },
        {
          'nodeId': 'global_zhongyangjinkuang-hut'
        },
        {
          'nodeId': 'global_baiyangjinkuang-hut'
        }
      ],
      'startingTime': '05:00'
    },
    {
      'id': 'dcea80cc-fb8e-4278-8b60-a920c05579bf',
      'badges': [],
      'stops': [
        {
          'nodeId': 'global_baiyangjinkuang-hut'
        },
        {
          'nodeId': 'global_xiuguping-fork'
        },
        {
          'nodeId': 'global_xiuguluan-mountain-south-trailhead'
        },
        {
          'nodeId': 'mountain_xiuguluan-mountain'
        },
        {
          'nodeId': 'global_xiuguluan-mountain-south-trailhead'
        },
        {
          'nodeId': 'global_xiuguping-fork'
        },
        {
          'nodeId': 'mountain_dashuiku-mountain'
        },
        {
          'nodeId': 'global_dashuiku-hut'
        }
      ],
      'startingTime': '05:00'
    },
    {
      'id': 'a7b4b682-634c-4c51-b4cf-5353468a0032',
      'badges': [],
      'stops': [
        {
          'nodeId': 'global_dashuiku-hut'
        },
        {
          'nodeId': 'mountain_south-dashuiku-mountain'
        },
        {
          'nodeId': 'south-second-section_heishui-fork'
        },
        {
          'nodeId': 'south-second-section_heishui-pond'
        },
        {
          'nodeId': 'south-second-section_dafenjian-mountain-trailhead'
        },
        {
          'nodeId': 'south-second-section_tafengu-hut'
        }
      ],
      'startingTime': '07:30'
    },
    {
      'id': '45006743-9d96-443f-9286-c18e2cb4c125',
      'badges': [],
      'stops': [
        {
          'nodeId': 'south-second-section_tafengu-hut'
        },
        {
          'nodeId': 'mountain_tafen-mountain'
        },
        {
          'nodeId': 'south-second-section_tafen-pond'
        },
        {
          'nodeId': 'south-second-section_lulu-mountain-trailhead'
        },
        {
          'nodeId': 'south-second-section_lulugu-hut'
        }
      ],
      'startingTime': '05:00'
    },
    {
      'id': 'a1481401-be4d-460d-84bc-548548607503',
      'badges': [],
      'stops': [
        {
          'nodeId': 'south-second-section_lulugu-hut'
        },
        {
          'nodeId': 'south-second-section_yun-peak-east-peak-fork-camp'
        },
        {
          'nodeId': 'south-second-section_xibei-saddle-nanshuang-pond-camp'
        },
        {
          'nodeId': 'mountain_nanshuangtou-mountain'
        },
        {
          'nodeId': 'global_lakuyin-river-hut'
        }
      ],
      'startingTime': '05:00'
    },
    {
      'id': '2a637e17-ce05-4034-a4aa-2f7dcd1f6336',
      'badges': [],
      'stops': [
        {
          'nodeId': 'global_lakuyin-river-hut'
        },
        {
          'nodeId': 'global_xinkang-mountain-fork'
        },
        {
          'nodeId': 'global_jiaming-lake-fork'
        },
        {
          'nodeId': 'mountain_sancha-mountain'
        },
        {
          'nodeId': 'global_sancha-mountain-trailhead'
        },
        {
          'nodeId': 'global_north-peak-sign'
        },
        {
          'nodeId': 'global_north-peak-fork'
        },
        {
          'nodeId': 'global_jiaming-lake-hut'
        },
        {
          'nodeId': 'global_xice-trailhead'
        },
        {
          'nodeId': 'global_xiangyang-hut'
        },
        {
          'nodeId': 'global_lindao-trailhead'
        },
        {
          'nodeId': 'global_xiangyang-forest-recreation-area'
        }
      ],
      'startingTime': '04:00'
    }
  ],
}]
