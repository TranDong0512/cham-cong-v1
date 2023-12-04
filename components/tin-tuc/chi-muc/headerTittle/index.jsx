import { useHeader } from '../../../../components/Tintuc/hooks/useHeader'
import React, { useEffect } from 'react'
import styles from '../index.module.css'

const HeaderTittle = () => {
  const {
    headerTitle,
    setHeaderTitle,
    showBackButton,
    setShowBackButton,
    currentPath,
    setCurrentPath,
  } = useHeader()
  const header = 'Phần mềm chấm công'

  useEffect(() => {
    ;() => setCurrentPath('')
    ;() => setShowBackButton(false)
    ;() => setHeaderTitle(`Trang chủ / Tin tức / ${header}`)
  }, [])
  return (
    <div>
      <ul className={styles.breadcrumb}>
        <li className={styles.first}>
          <a href={currentPath} target={'_blank'}>
            <span>{headerTitle}</span>
          </a>
        </li>
      </ul>
    </div>
  )
}
export default HeaderTittle
