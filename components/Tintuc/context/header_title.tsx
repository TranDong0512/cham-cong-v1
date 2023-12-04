'use client'
import { createContext, useContext, useState } from 'react'
const defaultValue = 'Trang chủ'

export const NavigateContextNews = createContext(defaultValue)

export const NavigateContextNewsComponent: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const [headerTitle, setHeaderTitle] = useState(defaultValue)
  const [showBackButton, setShowBackButton] = useState(false)
  const [currentPath, setCurrentPath] = useState('/')

  return (
    <NavigateContextNews.Provider
      value={
        {
          headerTitle,
          setHeaderTitle,
          showBackButton,
          setShowBackButton,
          currentPath,
          setCurrentPath,
        } as any
      }>
      {children}
    </NavigateContextNews.Provider>
  )
}
