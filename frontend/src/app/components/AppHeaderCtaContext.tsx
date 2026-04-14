'use client'

import { createContext, useContext } from 'react'

const AppHeaderCtaContext = createContext<React.ReactNode>(null)

interface Props {
  children: React.ReactNode;
  cta: React.ReactNode;
}

export function AppHeaderCtaProvider({ children, cta }: Props) {
  return (
    <AppHeaderCtaContext.Provider value={cta}>
      {children}
    </AppHeaderCtaContext.Provider>
  )
}

export function useAppHeaderCta() {
  return useContext(AppHeaderCtaContext)
}
