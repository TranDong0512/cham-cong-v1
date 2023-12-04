import { CongCong } from '@/components/cai-dat-luong/cong-cong/cong-cong'
import styles from './index.module.css'
import { POST_SS, POST_SS_TL, getCompIdSS } from '@/pages/api/BaseApi'
import moment from 'moment'

export default function Page({ listCC, listPb }) {
  return (
    <div>
      <CongCong />
    </div>
  )
}
