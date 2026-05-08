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
          'nodeId': 'global_yunlong-fall'
        },
        {
          'nodeId': 'global_lele-hut'
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
          'nodeId': 'south-second-section_batongguan-meadow'
        },
        {
          'nodeId': 'south-second-section_batongguan-trailhead'
        },
        {
          'nodeId': 'mountain_batongguan-mountain'
        },
        {
          'nodeId': 'south-second-section_batongguan-trailhead'
        },
        {
          'nodeId': 'south-second-section_banaiyike-hut'
        },
        {
          'nodeId': 'south-second-section_central-gold-fork'
        },
        {
          'nodeId': 'south-second-section_central-gold-hut'
        },
        {
          'nodeId': 'south-second-section_baiyang-gold-hut'
        }
      ],
      'startingTime': '05:00'
    },
    {
      'id': 'dcea80cc-fb8e-4278-8b60-a920c05579bf',
      'badges': [],
      'stops': [
        {
          'nodeId': 'south-second-section_baiyang-gold-hut'
        },
        {
          'nodeId': 'south-second-section_xiuguping'
        },
        {
          'nodeId': 'south-second-section_xiuguluan-trailhead'
        },
        {
          'nodeId': 'mountain_xiuguluan-mountain'
        },
        {
          'nodeId': 'south-second-section_xiuguluan-trailhead'
        },
        {
          'nodeId': 'south-second-section_xiuguping'
        },
        {
          'nodeId': 'mountain_dashuiku-mountain'
        },
        {
          'nodeId': 'south-second-section_dashuiku-hut'
        }
      ],
      'startingTime': '05:00'
    },
    {
      'id': 'a7b4b682-634c-4c51-b4cf-5353468a0032',
      'badges': [],
      'stops': [
        {
          'nodeId': 'south-second-section_dashuiku-hut'
        },
        {
          'nodeId': 'mountain_south-dashuiku-mountain'
        },
        {
          'nodeId': 'south-second-section_south-three-way-fork'
        },
        {
          'nodeId': 'south-second-section_black-water-pond'
        },
        {
          'nodeId': 'south-second-section_jianshan-trailhead'
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
          'nodeId': 'south-second-section_lulu-trailhead'
        },
        {
          'nodeId': 'south-second-section_lulu-hut'
        }
      ],
      'startingTime': '05:00'
    },
    {
      'id': 'a1481401-be4d-460d-84bc-548548607503',
      'badges': [],
      'stops': [
        {
          'nodeId': 'south-second-section_lulu-hut'
        },
        {
          'nodeId': 'south-second-section_yun-mountain-fork-camp'
        },
        {
          'nodeId': 'south-second-section_northwest-saddle-camp'
        },
        {
          'nodeId': 'mountain_nanshuangtou-mountain'
        },
        {
          'nodeId': 'south-second-section_lakuynxi-hut'
        }
      ],
      'startingTime': '05:00'
    },
    {
      'id': '2a637e17-ce05-4034-a4aa-2f7dcd1f6336',
      'badges': [],
      'stops': [
        {
          'nodeId': 'south-second-section_lakuynxi-hut'
        },
        {
          'nodeId': 'south-second-section_xinkang-fork'
        },
        {
          'nodeId': 'south-second-section_jiaming-lake-fork'
        },
        {
          'nodeId': 'mountain_sancha-mountain'
        },
        {
          'nodeId': 'south-second-section_sancha-mountain-trailhead'
        },
        {
          'nodeId': 'south-second-section_xiangyang-east-fork'
        },
        {
          'nodeId': 'south-second-section_jiaming-refuge-hut'
        },
        {
          'nodeId': 'south-second-section_xiangyang-fork'
        },
        {
          'nodeId': 'south-second-section_xiangyang-hut'
        },
        {
          'nodeId': 'south-second-section_xiangyang-station'
        }
      ],
      'startingTime': '04:00'
    }
  ],
}]
