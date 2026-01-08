import { IconChartBar, IconClipboardList, IconIcons } from '@tabler/icons-react';

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
      }
    ]
  },
  {
    icon: IconClipboardList,
    title: 'Forms',
    children: []
  },
  {
    icon: IconChartBar,
    title: 'Chart',
    children: []
  },
]
