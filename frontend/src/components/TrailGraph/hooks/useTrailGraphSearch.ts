import { notifications } from '@mantine/notifications'
import type cytoscape from 'cytoscape'
import { useTranslations } from 'next-intl'
import type { RefObject } from 'react'
import { useEffect, useState } from 'react'

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
  const [searchQuery, setSearchQuery] = useState('')
  const [matchedNodeIds, setMatchedNodeIds] = useState<string[]>([])
  const [matchIndex, setMatchIndex] = useState(0)

  useEffect(() => {
    if (!searchOpen) {
      setSearchQuery('')
      setMatchedNodeIds([])
      setMatchIndex(0)
    }
  }, [searchOpen])

  function handleSearch() {
    const cy = cyRef.current
    if (!cy || !searchQuery.trim()) {
      return
    }

    if (matchedNodeIds.length > 0) {
      const next = (matchIndex + 1) % matchedNodeIds.length
      setMatchIndex(next)
      focusNode(cy, matchedNodeIds[next])
      return
    }

    const query = searchQuery.trim().toLowerCase()
    const ids = cy.nodes()
      .filter(node => (node.data('label') as string).toLowerCase().includes(query))
      .map(node => node.id())

    if (ids.length > 0) {
      setMatchedNodeIds(ids)
      setMatchIndex(0)
      focusNode(cy, ids[0])
    } else {
      notifications.show({
        message: t('planDetail.trailNetwork.searchNotFound', { query: searchQuery }),
        color: 'orange',
      })
    }
  }

  function handleQueryChange(q: string) {
    setSearchQuery(q)
    setMatchedNodeIds([])
    setMatchIndex(0)
  }

  function handleNavigatePrev() {
    const cy = cyRef.current
    if (!cy || matchedNodeIds.length === 0) {
      return
    }
    const prev = (matchIndex - 1 + matchedNodeIds.length) % matchedNodeIds.length
    setMatchIndex(prev)
    focusNode(cy, matchedNodeIds[prev])
  }

  function handleNavigateNext() {
    const cy = cyRef.current
    if (!cy || matchedNodeIds.length === 0) {
      return
    }
    const next = (matchIndex + 1) % matchedNodeIds.length
    setMatchIndex(next)
    focusNode(cy, matchedNodeIds[next])
  }

  return {
    searchQuery,
    matchIndex: matchedNodeIds.length > 0 ? matchIndex : undefined,
    matchCount: matchedNodeIds.length > 0 ? matchedNodeIds.length : undefined,
    handleSearch,
    handleQueryChange,
    handleNavigatePrev,
    handleNavigateNext,
  }
}
