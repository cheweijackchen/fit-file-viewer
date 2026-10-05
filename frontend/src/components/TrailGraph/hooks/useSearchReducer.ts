import { useReducer } from 'react'

export type SearchState = {
  query: string;
  matchedNodeIds: string[];
  matchIndex: number;
}

type SearchAction =
  | { type: 'RESET'; }
  | { type: 'SET_QUERY'; query: string; }
  | { type: 'SET_RESULTS'; ids: string[]; }
  | { type: 'SET_INDEX'; index: number; }

const initialState: SearchState = {
  query: '',
  matchedNodeIds: [],
  matchIndex: 0,
}

function searchReducer(state: SearchState, action: SearchAction): SearchState {
  switch (action.type) {
    case 'RESET': return initialState
    case 'SET_QUERY': return {
      ...initialState,
      query: action.query,
    }
    case 'SET_RESULTS': return {
      ...state,
      matchedNodeIds: action.ids,
      matchIndex: 0,
    }
    case 'SET_INDEX': return {
      ...state,
      matchIndex: action.index,
    }
  }
}

export function useSearchReducer() {
  return useReducer(searchReducer, initialState)
}
