import React from 'react'
import { INDEX_DATA } from './constants'
import styles from './index.module.css'

export default function IndexSection({
  className,
  setShowmore,
}: {
  className: string
  setShowmore: any
}) {
  const scrollTo = async (id) => {
    setShowmore(true)
    try {
      setShowmore(true)
      await document.getElementById(id).scrollIntoView()
    } catch (error) {
      console.log(error)
    }
    // const section = document.querySelector(`#${id}`)

    // section.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className={`${styles.indexWrapper} ${className}`}>
      <div className={styles.ribbon}>
        <span className={styles.text} style={{ color: '#fff', fontSize: "18px" }}>
          MỤC LỤC
        </span>
      </div>
      <div className='fix-font-size-cc'>
        {INDEX_DATA.map((item, index) => (
          <div key={index}>
            <div style={{ marginTop: '10px' }}>
              <span onClick={() => scrollTo(`${index + 1}`)}>
                {index + 1}. {item.title}
              </span>
            </div>
            {item?.sub &&
              item?.sub?.map((subItem, subIndex) => (
                <div key={subIndex} style={{ marginTop: '10px' }}>
                  <ul>
                    <li
                      style={{ marginLeft: '20px', fontStyle: 'italic' }}
                      onClick={() => scrollTo(`${index + 1}_${subIndex + 1}`)}>
                      {index + 1}.{subIndex + 1}. {subItem.title}
                    </li>
                    {subItem?.sub &&
                      subItem?.sub?.map((sub2Item, sub2Index) => (
                        <div key={sub2Index} style={{ marginTop: '10px' }}>
                          <div style={{ marginLeft: '40px' }}>
                            <li
                              onClick={() =>
                                scrollTo(
                                  `${index + 1}_${subIndex + 1}_${sub2Index + 1
                                  }`
                                )
                              }>
                              {index + 1}.{subIndex + 1}.{sub2Index + 1}.{' '}
                              {sub2Item?.title}
                            </li>
                          </div>
                        </div>
                      ))}
                  </ul>
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  )
}
