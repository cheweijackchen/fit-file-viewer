import { IconChartBar, IconClipboardList, IconIcons, IconMap2, IconPick } from '@tabler/icons-react'

export const demoNavLinks = [
  {
    icon: IconIcons,
    title: 'Components',
    children: [
      {
        title: 'ComponentA',
        link: '/demo/demo-component-a',
      }
    ]
  },
  {
    icon: IconMap2,
    title: 'Maps',
    children: [
      {
        title: 'MapLibre GL Map',
        link: '/demo/demo-vector-map',
      },
      {
        title: 'FitTrackMap',
        link: '/demo/demo-fit-track-map',
      }
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
