import Image from 'next/image'
import styles from './chi-tiet-de-xuat.module.css'

export function Status(
  name: string,
  time: string,
  action: string,
  type: string
) {
  return (
    <div className={styles.status} key={name}>
      <Image
        src={`${
          type === '1'
            ? '/add-circle.png'
            : type === '2'
            ? '/share.png'
            : '/approve.png'
        }`}
        alt=''
        width={20}
        height={20}></Image>
      {type === '1' ? (
        <p className={styles.statusText}>
          {time} <span style={{ color: '#4c5bd4' }}>{name}</span> {action}
        </p>
      ) : type === '2' ? (
        <p className={styles.statusText}>
          {time} <span style={{ color: '#4c5bd4' }}>{name}</span> {action}
        </p>
      ) : (
        <p className={styles.statusText}>
          {time} <span style={{ color: '#4c5bd4' }}>{name}</span> {action}
        </p>
      )}
    </div>
  )
}
