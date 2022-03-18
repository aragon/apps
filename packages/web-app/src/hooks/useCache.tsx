import React, { createContext, ReactNode, useContext, useState } from "react"

interface CacheContext {
  set: (key: string, value: any) => void
  get: (key: string) => any
}

const UseCacheContext = createContext<CacheContext>({} as CacheContext)

export const useCache = () => {
  const ctx = useContext(UseCacheContext)
  if (ctx === null) {
    throw new Error('useCache() can only be used on the descendants of <UseCacheProvider />')
  }
  return ctx
}

export const UseCacheProvider = ({ children }: { children: ReactNode }) => {
  const [cache, setCache] = useState(new Map<string, any>())
  const get = (key: string) => {
    return cache.get(key) || null
  }
  const set = (key: string, value: any) => {
    setCache(new Map(cache.set(key, value)));
  }
  const value = {
    get,
    set
  }
  return (
    <UseCacheContext.Provider value={value} >
      {children}
    </UseCacheContext.Provider>
  )
}
