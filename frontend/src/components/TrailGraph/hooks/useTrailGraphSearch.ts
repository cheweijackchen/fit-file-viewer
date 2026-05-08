import { notifications } from '@mantine/notifications'
import type cytoscape from 'cytoscape'
import { useTranslations } from 'next-intl'
import type { RefObject } from 'react'
import { useEffect } from 'react'
import { useSearchReducer } from './useSearchReducer'

const MAX_ZOOM = 2.0

function focusNode(cy: cytoscape.Core, nodeId: string) {
  const node = cy.getElementById(nodeId)
  cy.stop()
  cy.fit(node, 80)
  if (cy.zoom() > MAX_ZOOM) {
    cy.zoom({
      level: MAX_ZOOM,
      renderedPosition: {
        x: cy.width() / 2,
        y: cy.height() / 2,
      },
    })
  }
}

interface UseTrailGraphSearchReturn {
  searchQuery: string;
  matchIndex: number | undefined;
  matchCount: number | undefined;
  handleSearch: () => void;
  handleQueryChange: (q: string) => void;
  handleNavigatePrev: () => void;
  handleNavigateNext: () => void;
}

export function useTrailGraphSearch(
  cyRef: RefObject<cytoscape.Core | null>,
  searchOpen: boolean
): UseTrailGraphSearchReturn {
  const t = useTranslations('hiking-trail-planner')
  const [{ query, matchedNodeIds, matchIndex }, dispatch] = useSearchReducer()

  useEffect(() => {
    if (!searchOpen) {
      dispatch({ type: 'RESET' })
    }
  }, [searchOpen, dispatch])

  function handleSearch() {
    const cy = cyRef.current
    if (!cy || !query.trim()) {
      return
    }

    if (matchedNodeIds.length > 0) {
      const next = (matchIndex + 1) % matchedNodeIds.length
      dispatch({
        type: 'SET_INDEX',
        index: next 
      })
      focusNode(cy, matchedNodeIds[next])
      return
    }

    const q = query.trim().toLowerCase()
    const ids = cy.nodes()
      .filter(node => (node.data('label') as string).toLowerCase().includes(q))
      .map(node => node.id())

    if (ids.length > 0) {
      dispatch({
        type: 'SET_RESULTS',
        ids 
      })
      focusNode(cy, ids[0])
    } else {
      notifications.show({
        message: t('planDetail.trailNetwork.searchNotFound', { query }),
        color: 'orange',
      })
    }
  }

  function handleQueryChange(q: string) {
    dispatch({
      type: 'SET_QUERY',
      query: q 
    })
  }

  function handleNavigatePrev() {
    const cy = cyRef.current
    if (!cy || matchedNodeIds.length === 0) {
      return
    }
    const prev = (matchIndex - 1 + matchedNodeIds.length) % matchedNodeIds.length
    dispatch({
      type: 'SET_INDEX',
      index: prev 
    })
    focusNode(cy, matchedNodeIds[prev])
  }

  function handleNavigateNext() {
    const cy = cyRef.current
    if (!cy || matchedNodeIds.length === 0) {
      return
    }
    const next = (matchIndex + 1) % matchedNodeIds.length
    dispatch({
      type: 'SET_INDEX',
      index: next 
    })
    focusNode(cy, matchedNodeIds[next])
  }

  return {
    searchQuery: query,
    matchIndex: matchedNodeIds.length > 0 ? matchIndex : undefined,
    matchCount: matchedNodeIds.length > 0 ? matchedNodeIds.length : undefined,
    handleSearch,
    handleQueryChange,
    handleNavigatePrev,
    handleNavigateNext,
  }
}
