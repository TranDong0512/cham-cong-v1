import { useContext } from 'react'
import { NavigateContextNews } from '@/components/Tintuc/context/header_title'

export function useHeader() {
  return useContext(NavigateContextNews)
}
