/** @format */

import React, { useState } from 'react'
import styles from './modalitem.module.scss'
export default function SelectUser({ check }) {
  const [checked, setChecked] = useState(false)
  return (
    <div className={styles.select_user}>
      {check && (
        <div
          className={styles.option_user}
          onClick={() => setChecked(!checked)}>
          {checked ? (
            <div className={styles.edit_tick}>
              <img src='../img/charm_tick.png' alt='' />
            </div>
          ) : (
            <img src='../img/Select.png' alt='' />
          )}
        </div>
      )}
      <img src='../img/img_user.png' alt='' width={60} height={60} />
      <div className={styles.name_id}>
        <div className={styles.name_user}>Trần Hoài Phương Chi</div>
        <div className={styles.id_user}>ID: 948492</div>
      </div>
    </div>
  )
}
