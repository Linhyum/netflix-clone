'use client'
import useLocalStorage from '@/hooks/useLocalStorage'
import { Result } from '@/types/movieList.type'
import React, { createContext } from 'react'
interface AppContextInterface {
   favourite: Result[]
   setFavourite: (value: Result[] | ((val: Result[]) => Result[])) => void
}

const initialAppContext: AppContextInterface = {
   favourite: [],
   setFavourite: () => null
}

export const AppContext = createContext<AppContextInterface>(initialAppContext)

//khi không truyền value vào AppProvider thì cái initialAppContext của AppContext sẽ được sử dụng
export const AppProvider = ({ children }: { children: React.ReactNode }) => {
   const [favourite, setFavourite] = useLocalStorage<Result[]>('favouriteNetflix', initialAppContext.favourite)
   return <AppContext.Provider value={{ favourite, setFavourite }}>{children}</AppContext.Provider>
}
