import React from 'react'
import styles from './index.module.css'
import { useRouter } from 'next/router'
import Revenue from './hoahongdoanhthu/AddTable'
import AddTable from './hoahongvitri/AddTable'
import Plan from './hoahongloinhuan/AddTable'
import Profit from './hoahongkehoach/AddTable'
import Money from './hoahongtien/AddTable'

const Caidathoahong = () => {

  return (
    <>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={`${styles.all_modal} modal_one`}>
            <Money />
            <Revenue /> 
            <Plan />
          </div>
          <div className={`${styles.all_modal} modal_one`}>
            <AddTable />
            <Profit />
          </div>
          <div className={styles.video}>
            <iframe
              className='video_hd'
              style={{ borderRadius: 15 }}
              width='100%'
              height={430}
              src='https://www.youtube.com/embed/QD1Y6kS4dUU'
              title='YouTube video player'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
              allowFullScreen=''
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Caidathoahong
