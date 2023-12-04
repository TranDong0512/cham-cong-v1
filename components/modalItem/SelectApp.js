/** @format */

import React, {useState} from 'react';
import styles from './modalitem.module.scss';
export default function SelectApp({check, img, app_name}) {
   const [checked, setChecked] = useState(false);
   return (
      <div className={styles.select_user}>
         {check && (
            <div className={styles.option_user} onClick={() => setChecked(!checked)}>
               {checked ? (
                  <div className={styles.edit_tick}>
                     <img src='../img/charm_tick.png' alt='' />
                  </div>
               ) : (
                  <img src='../img/Select.png' alt='' />
               )}
            </div>
         )}
         <img src={`../img/${img}`} alt='' width={52} height={52} />
         <div className={styles.name_id}>
            <div className={styles.name_app}>{app_name ? app_name : ''}</div>
         </div>
      </div>
   );
}
