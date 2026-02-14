import { IconChartBar, IconClipboardList, IconIcons, IconPick } from '@tabler/icons-react'

export const demoNavLinks = [
  {
    icon: IconIcons,
    title: 'Components',
    children: [
      {
        title: 'ComponentA',
        link: '/demo/demo-component-a',
      },
      {
        title: 'ComponentB',
        link: '/demo/demo-component-b',
      },
    ]
  },
  {
    icon: IconPick,
    title: 'Functionalities',
    children: [
      {
        title: 'Fit File Parser',
        link: '/demo/demo-fit-file-parser'
      }
    ]
  },
  {
    icon: IconClipboardList,
    title: 'Form',
    children: []
  },
  {
    icon: IconChartBar,
    title: 'Charts',
    children: [
      {
        title: 'HeartRateTrendGraph',
        link: '/demo/demo-heart-rate-trend-graph'
      },
      {
        title: 'HeartRateDonutChart',
        link: '/demo/demo-heart-rate-donut-chart'
      }
    ]
  },
]
