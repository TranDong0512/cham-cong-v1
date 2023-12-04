import { useRouter } from 'next/router'
import {
  BackButton,
  MyBreadCrumb,
} from '../../../components/bodyFrameNs/bread-crump/BreadCrump'
import styles from './chat365.module.css'
import Image from 'next/image'
import { useState } from 'react'
import {
  CheckTicked,
  CheckUnticked,
} from '../../../components/cham-cong-bang-QR/cham-cong-365/icon/icon'
import { Button, Col, Row } from 'antd'
import Link from 'next/link'
export const Chat365: React.FC = () => {
  const listchat365 = [
    {
      title:
        'Tại trang chủ chọn tiện ích, trong mục công cụ của tiện ích chọn “CHẤM CÔNG”',
      clicked: true,
      img: '/Chat1.png',
    },
    {
      title:
        'Chọn “Mã QR” và xem vị trí  và wifi có đủ điều kiện để chấm công không”',
      clicked: false,
      img: '/Chat2.png',
    },
    {
      title:
        'Đưa điện thoại vào khung QR đợi nhận diện rồi đối chiếu các điều kiện về thông tin vị trí và wifi xem đã chuẩn chưa, sau đó lựa chọn “CA ĐIỂM DANH” phù hợp nhất. Ấn “ĐIỂM DANH”',
      clicked: false,
      img: '/Chat3.png',
    },
    {
      title:
        'Nếu chấm công thành công, sẽ có màn hình thông báo Điểm danh thành công màu xanh, còn nếu chấm công thất bại, sẽ có thông báo màu đỏ trên màn hình, hãy chọn CHẤM CÔNG LẠI.',
      clicked: false,
      img: '/Chat4.png',
    },
  ]
  const router = useRouter()
  const [Index, setIndex] = useState(0)
  const [listStep, setListStep] = useState(listchat365)

  const setTicked = (input: String, index: any) => {
    setIndex(index)
    const updateArr = listStep.map((item) => {
      if (item.title === input) {
        item.clicked = true
      }
      return item
    })
    setListStep(updateArr)
  }
  const tickOrUntick = (x: String) => {
    if (x === 'true') return <CheckTicked />
    return <CheckUnticked />
  }
  return (
    <div className={styles.main}>
      <div className={styles.back}>
        <BackButton router={router} color='#fff' isCC={true} />
      </div>
      <div className={styles.title}>
        <p className={styles.texttitle}>CÁC CHỨC NĂNG CƠ BẢN CHẤM CÔNG</p>
      </div>
      <div className={styles.breadcrumb}>Chấm công bằng QR / Chat365</div>
      <Row gutter={{ sm: 32, xs: 32 }} className={styles.options}>
        <Col xxl={4} xl={7} sm={8} xs={24}>
          <Link href='/cham-cong-bang-QR/cham-cong-365'>
            <div className={styles.cc365} style={{ background: '#fff' }}>
              <Image
                src='/cc.png'
                width={40}
                height={40}
                alt=''
                className={styles.iconlogo}
              />
              <p className={styles.textbutton} style={{ color: `#4C5BD4` }}>
                Chamcong365
              </p>
            </div>
          </Link>
        </Col>
        <Col xxl={4} xl={7} sm={8} xs={24}>
          <Link href='/cham-cong-bang-QR/chat-365'>
            <div className={styles.chat365} style={{ background: `#FFC460` }}>
              <div className={styles.iconlogo}>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='40'
                  height='40'
                  viewBox='0 0 40 40'
                  fill='none'>
                  <path
                    d='M19.9986 35.4453C29.7442 35.4453 37.6457 28.0373 37.6457 18.8989C37.6457 9.76059 29.7442 2.35254 19.9986 2.35254C10.253 2.35254 2.35156 9.76059 2.35156 18.8989C2.35156 23.0592 3.99053 26.8648 6.69715 29.7723C6.48318 32.1739 5.7773 34.8071 4.99642 36.7832C4.82215 37.2229 5.15965 37.7145 5.59862 37.6389C10.5751 36.7643 13.5332 35.4217 14.8192 34.722C16.5087 35.2049 18.2501 35.4481 19.9986 35.4453Z'
                    fill='#4C5BD4'
                    stroke='#4C5BD4'
                    stroke-width='2'
                  />
                  <path
                    d='M9.76288 20.9044C9.39938 21.2048 8.86287 21.3855 8.09024 21.3855H4.32422V20.7269H7.35789C7.80416 20.7269 8.23418 20.6588 8.55048 20.4362L8.55052 20.4362L8.557 20.4315C8.90435 20.1785 9.04579 19.7974 9.04579 19.3891C9.04579 18.9968 8.90601 18.6388 8.59605 18.3796L8.58818 18.373L8.58004 18.3667C8.25841 18.1195 7.81483 18.0469 7.35947 18.0469L7.35762 18.0469L4.97591 18.0557V17.4004H7.30569C7.75778 17.4004 8.19348 17.3374 8.51121 17.1189L8.51255 17.118C8.86916 16.871 8.99834 16.4811 8.99834 16.0855C8.99834 15.6933 8.86278 15.3282 8.53683 15.077C8.36917 14.9428 8.17134 14.865 7.97287 14.8207L7.96349 14.8186L7.95403 14.8169C7.75951 14.7813 7.54337 14.7646 7.30569 14.7646H4.32422V14.1074H7.9115C8.80326 14.1074 9.39386 14.2814 9.75856 14.5538C10.0813 14.8035 10.2824 15.2087 10.2824 15.8799C10.2824 16.1896 10.2125 16.4455 10.0846 16.6621C9.93018 16.9096 9.72953 17.1298 9.47698 17.3218L8.88648 17.7707L9.52411 18.1496C9.79609 18.3113 9.96469 18.4865 10.063 18.6648L10.0681 18.6742L10.0737 18.6833C10.2096 18.9068 10.2935 19.2087 10.2935 19.6176C10.2935 20.203 10.1062 20.6101 9.76288 20.9044Z'
                    fill='#4C5BD4'
                    stroke='white'
                  />
                  <path
                    d='M12.7056 14.9974L12.7056 14.9974L12.7075 14.9956C13.3061 14.4355 14.2951 14.1055 15.7841 14.1055H18.3714L18.3689 14.7626H15.7398C14.922 14.7626 14.2161 14.911 13.7326 15.3092L13.7326 15.3092L13.7304 15.3111C13.5005 15.5026 13.329 15.7432 13.2146 16.0224C13.0876 16.3175 13.0316 16.64 13.0316 16.9807V17.4807H13.5316H16.3219C17.2772 17.4807 17.8974 17.6667 18.268 17.9534C18.6107 18.224 18.8193 18.653 18.8193 19.3445C18.8193 20.0661 18.5588 20.5614 18.0559 20.9061C17.5206 21.273 16.6957 21.4887 15.5136 21.4887C14.1275 21.4887 13.2044 21.1662 12.6392 20.6195C12.0841 20.0825 11.7539 19.1909 11.7539 17.8291C11.7539 16.4616 12.1036 15.5548 12.7056 14.9974ZM17.2207 18.468L17.2124 18.46L17.2037 18.4524C16.9332 18.2151 16.576 18.1393 16.2222 18.1393H13.5427H13.0427V18.6393C13.0427 19.301 13.2381 19.8842 13.7048 20.2933C14.1624 20.7092 14.8291 20.8635 15.5879 20.8635C16.1488 20.8635 16.6582 20.7901 17.0151 20.5548C17.4138 20.2952 17.5875 19.8871 17.5875 19.4329C17.5875 19.079 17.4912 18.7284 17.2207 18.468Z'
                    fill='#4C5BD4'
                    stroke='white'
                  />
                  <path
                    d='M24.1309 21.384H20.1055V20.7269H23.7386C24.1689 20.7269 24.6066 20.6621 24.9112 20.4167L24.9112 20.4167L24.9142 20.4143C25.2372 20.1499 25.3332 19.7544 25.3332 19.3785C25.3332 18.9951 25.236 18.5997 24.9248 18.3303L24.9159 18.3226L24.9067 18.3154C24.6019 18.0755 24.1652 18.0149 23.7386 18.0149H20.1055V14.1074H26.2405L26.238 14.7646H21.7203H21.2203V15.2646V16.8669V17.3669H21.7203H24.5153C25.2281 17.3669 25.7456 17.553 26.1215 17.8804C26.2926 18.0536 26.4267 18.2562 26.5233 18.491C26.6124 18.7326 26.6631 19.0272 26.6631 19.3785C26.6631 20.0675 26.4447 20.5344 26.0575 20.8541C25.6476 21.1855 25.0276 21.384 24.1309 21.384Z'
                    fill='#4C5BD4'
                    stroke='white'
                  />
                  <path
                    d='M30.3445 24.5563C29.9452 24.4506 29.5562 24.3482 29.227 24.2617L31.4669 22.3176L34.6151 23.1975C34.627 23.2027 34.6432 23.2101 34.6632 23.2195C34.7132 23.243 34.7851 23.2788 34.8684 23.3263C35.0391 23.4234 35.2391 23.5587 35.3984 23.7225C35.5592 23.8879 35.6463 24.0487 35.6637 24.2004C35.6789 24.3334 35.6499 24.5394 35.4151 24.8316C35.1388 25.0934 34.9416 25.2669 34.6244 25.3583C34.2917 25.4541 33.7612 25.4741 32.8125 25.2294C32.4933 25.1289 31.3716 24.8283 30.3445 24.5563Z'
                    fill='#4C5BD4'
                    stroke='white'
                  />
                  <path
                    d='M9.43397 22.768L9.434 22.768C9.42612 22.7501 9.41608 22.7308 9.40215 22.7084C9.3911 22.6959 9.37122 22.6772 9.34079 22.6571C9.30382 22.6326 9.26132 22.6127 9.21969 22.6005C9.15985 22.5829 9.12988 22.5873 9.12059 22.5896C9.11283 22.5975 9.09503 22.6201 9.08095 22.6696C9.0632 22.7319 9.06305 22.7993 9.07322 22.8453L9.0735 22.8465C9.25497 23.6769 9.55404 24.4698 10.0193 25.1572L10.0195 25.1574C10.7729 26.2718 11.9583 27.0085 13.3301 27.338L13.3303 27.3381C14.7078 27.6697 16.1828 27.6321 17.6335 27.4353L9.43397 22.768ZM9.43397 22.768L9.43634 22.7732M9.43397 22.768L9.43634 22.7732M9.43634 22.7732C9.44785 22.7985 9.45861 22.824 9.47247 22.8568C9.47448 22.8616 9.47655 22.8665 9.4787 22.8716C9.49448 22.9089 9.51401 22.9547 9.53658 23.0021L9.53667 23.0023M9.43634 22.7732L9.53667 23.0023M9.53667 23.0023C9.6061 23.148 9.68203 23.2873 9.76384 23.4231L9.76461 23.4243M9.53667 23.0023L9.76461 23.4243M9.76461 23.4243C9.97315 23.7681 10.2255 24.0856 10.5143 24.3688L10.5149 24.3695M9.76461 23.4243L10.5149 24.3695M10.5149 24.3695C10.8782 24.7243 11.2975 25.0213 11.7499 25.2519M10.5149 24.3695L11.7499 25.2519M19.121 25.2695L19.1209 25.2695C18.1077 25.5698 17.0541 25.8051 15.9779 25.9034L19.121 25.2695ZM19.121 25.2695C22.0232 24.4087 24.7296 23.133 27.0312 21.1428L27.0326 21.1416M19.121 25.2695L27.0326 21.1416M27.0326 21.1416C27.0665 21.1121 27.0954 21.0869 27.1251 21.0622L27.1252 21.0623M27.0326 21.1416L27.1252 21.0623M27.1252 21.0623L27.1349 21.0538M27.1252 21.0623L27.1349 21.0538M27.1349 21.0538C27.9134 20.3717 28.8134 19.525 29.4888 18.5532C30.1647 17.5806 30.6482 16.4358 30.5136 15.1721L30.5135 15.1718M27.1349 21.0538L30.5135 15.1718M30.5135 15.1718C30.4165 14.2656 29.8018 13.6109 29.1318 13.1685C28.634 12.8398 28.0645 12.5993 27.5368 12.4353M30.5135 15.1718L27.5368 12.4353M27.5368 12.4353C28.5574 12.4981 29.5417 12.6733 30.3709 13.009C31.3417 13.4019 32.0656 13.9989 32.4265 14.8662C32.4287 14.872 32.43 14.8753 32.4309 14.8778C32.6174 15.4603 32.6616 16.1058 32.6074 16.7422L32.6073 16.7427C32.5055 17.9505 32.0202 19.1192 31.3051 20.1563L31.305 20.1566C30.1058 21.8981 28.3401 23.2624 26.4484 24.3794L26.4482 24.3795C24.86 25.318 23.2235 26.046 21.4547 26.5761L21.4546 26.5761C20.1965 26.9533 18.9243 27.2601 17.6335 27.4353L27.5368 12.4353ZM11.7499 25.2519C12.3195 25.5437 12.9325 25.7298 13.5482 25.8344L11.7499 25.2519ZM33.1056 16.7847C32.9948 18.0976 32.4697 19.3481 31.7168 20.4401L33.1056 16.7847ZM13.5485 25.8344C14.3593 25.9729 15.1809 25.9763 15.9778 25.9034L13.5485 25.8344Z'
                    stroke='white'
                  />
                  <mask id='path-7-inside-1_1_96223' fill='white'>
                    <path
                      fill-rule='evenodd'
                      clip-rule='evenodd'
                      d='M10.8438 22.4211C10.8438 22.4211 15.2237 26.2365 22.7434 22.1484C21.905 23.1019 12.5426 27.4626 10.8438 22.4211Z'
                    />
                  </mask>
                  <path
                    fill-rule='evenodd'
                    clip-rule='evenodd'
                    d='M10.8438 22.4211C10.8438 22.4211 15.2237 26.2365 22.7434 22.1484C21.905 23.1019 12.5426 27.4626 10.8438 22.4211Z'
                    fill='#4C5BD4'
                  />
                  <path
                    d='M10.8438 22.4211L11.5006 21.667L8.71748 19.2426L9.8961 22.7404L10.8438 22.4211ZM22.7434 22.1484L23.4944 22.8087L22.2658 21.2699L22.7434 22.1484ZM10.8438 22.4211C10.1869 23.1751 10.1874 23.1756 10.188 23.176C10.1882 23.1762 10.1887 23.1767 10.1892 23.1771C10.19 23.1778 10.1909 23.1785 10.1918 23.1793C10.1937 23.181 10.1959 23.1829 10.1984 23.185C10.2033 23.1892 10.2094 23.1943 10.2165 23.2002C10.2308 23.2122 10.2496 23.2275 10.2727 23.2459C10.319 23.2826 10.3829 23.3316 10.4642 23.3899C10.6267 23.5063 10.8592 23.6602 11.1594 23.8272C11.7597 24.1612 12.6339 24.5496 13.761 24.7949C16.0374 25.2903 19.2567 25.1822 23.221 23.027L22.2658 21.2699C18.7104 23.2027 15.9798 23.2309 14.1863 22.8406C13.2785 22.6431 12.5877 22.3331 12.1318 22.0795C11.9039 21.9527 11.7355 21.8404 11.6291 21.7642C11.5759 21.7261 11.5384 21.6971 11.5169 21.68C11.5061 21.6714 11.4993 21.6658 11.4966 21.6635C11.4952 21.6624 11.4949 21.6621 11.4955 21.6627C11.4959 21.663 11.4964 21.6635 11.4973 21.6642C11.4977 21.6645 11.4982 21.665 11.4988 21.6654C11.499 21.6657 11.4995 21.6661 11.4996 21.6662C11.5001 21.6666 11.5006 21.667 10.8438 22.4211ZM21.9924 21.4881C22.0039 21.475 21.8938 21.578 21.5523 21.7797C21.2494 21.9587 20.8411 22.1714 20.3559 22.3917C19.3832 22.8333 18.149 23.2843 16.9033 23.5558C15.6405 23.831 14.4602 23.9005 13.5467 23.6699C12.6913 23.4539 12.0905 22.9895 11.7914 22.1017L9.8961 22.7404C10.4464 24.3734 11.653 25.2545 13.0571 25.609C14.403 25.9488 15.9342 25.8139 17.3292 25.5099C18.7413 25.2022 20.111 24.6994 21.1827 24.2128C21.7197 23.969 22.1936 23.7239 22.5698 23.5016C22.9074 23.3021 23.2732 23.0603 23.4944 22.8087L21.9924 21.4881Z'
                    fill='white'
                    mask='url(#path-7-inside-1_1_96223)'
                  />
                </svg>
              </div>
              <p className={styles.textbutton} style={{ color: `#fff` }}>
                Chat 365
              </p>
            </div>
          </Link>
        </Col>
        <Col xxl={4} xl={7} sm={8} xs={24}>
          <Link href='/cham-cong-bang-QR/pc-365'>
            <div className={styles.pc365} style={{ background: '#fff' }}>
              <div className={styles.iconlogo}>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='40'
                  height='42'
                  viewBox='0 0 40 42'
                  fill='none'>
                  <rect
                    width='40'
                    height='40'
                    fill='url(#paint0_linear_1_96237)'
                  />
                  <g filter='url(#filter0_d_1_96237)'>
                    <path
                      fill-rule='evenodd'
                      clip-rule='evenodd'
                      d='M14.1095 24.8286C15.6878 27.116 18.3265 28.6152 21.3155 28.6152C24.0798 28.6152 26.5445 27.3331 28.1479 25.3312C28.5127 24.8757 29.0673 24.6143 29.651 24.6143C31.6004 24.6143 32.6557 26.8949 31.3969 28.3835C28.9761 31.2463 25.3582 33.0641 21.3154 33.0641C18.6563 33.0641 16.1813 32.2769 14.1094 30.924V24.8286H14.1095Z'
                      fill='white'
                    />
                  </g>
                  <g filter='url(#filter1_d_1_96237)'>
                    <path
                      fill-rule='evenodd'
                      clip-rule='evenodd'
                      d='M31.5344 11.6578C29.1615 8.67318 25.5236 6.73974 21.4311 6.66896C14.045 6.54137 8 12.6337 8 20.021V33.2389L12.4489 33.228V29.7461V20.0044C12.4489 15.1147 16.4503 11.0398 21.3395 11.117C24.0091 11.1592 26.3883 12.3972 27.9652 14.3188C28.3756 14.8189 28.982 15.1168 29.629 15.1168H29.859C31.6432 15.1168 32.6448 13.0543 31.5344 11.6578Z'
                      fill='white'
                    />
                  </g>
                  <path
                    d='M30.8073 6.66699L26.2721 14.9665L26.2642 14.9808L25.6186 16.1626L24.5384 18.1395L20.7431 25.0846L16.7148 18.0638L20.243 20.2432L23.3687 16.226L24.3125 15.013L24.9886 14.1443L25.0287 14.0925L30.8073 6.66699Z'
                    fill='white'
                    stroke='url(#paint1_linear_1_96237)'
                    stroke-miterlimit='10'
                  />
                  <defs>
                    <filter
                      id='filter0_d_1_96237'
                      x='14.1094'
                      y='24.6143'
                      width='25.832'
                      height='16.4502'
                      filterUnits='userSpaceOnUse'
                      color-interpolation-filters='sRGB'>
                      <feFlood flood-opacity='0' result='BackgroundImageFix' />
                      <feColorMatrix
                        in='SourceAlpha'
                        type='matrix'
                        values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
                        result='hardAlpha'
                      />
                      <feOffset dx='4' dy='4' />
                      <feGaussianBlur stdDeviation='2' />
                      <feColorMatrix
                        type='matrix'
                        values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0'
                      />
                      <feBlend
                        mode='normal'
                        in2='BackgroundImageFix'
                        result='effect1_dropShadow_1_96237'
                      />
                      <feBlend
                        mode='normal'
                        in='SourceGraphic'
                        in2='effect1_dropShadow_1_96237'
                        result='shape'
                      />
                    </filter>
                    <filter
                      id='filter1_d_1_96237'
                      x='8'
                      y='6.66699'
                      width='32'
                      height='34.5723'
                      filterUnits='userSpaceOnUse'
                      color-interpolation-filters='sRGB'>
                      <feFlood flood-opacity='0' result='BackgroundImageFix' />
                      <feColorMatrix
                        in='SourceAlpha'
                        type='matrix'
                        values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
                        result='hardAlpha'
                      />
                      <feOffset dx='4' dy='4' />
                      <feGaussianBlur stdDeviation='2' />
                      <feColorMatrix
                        type='matrix'
                        values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0'
                      />
                      <feBlend
                        mode='normal'
                        in2='BackgroundImageFix'
                        result='effect1_dropShadow_1_96237'
                      />
                      <feBlend
                        mode='normal'
                        in='SourceGraphic'
                        in2='effect1_dropShadow_1_96237'
                        result='shape'
                      />
                    </filter>
                    <linearGradient
                      id='paint0_linear_1_96237'
                      x1='38.4488'
                      y1='-3.41398e-07'
                      x2='44.5742'
                      y2='39.1101'
                      gradientUnits='userSpaceOnUse'>
                      <stop stop-color='#47A4FF' />
                      <stop offset='1' stop-color='#2482DC' />
                    </linearGradient>
                    <linearGradient
                      id='paint1_linear_1_96237'
                      x1='23.7611'
                      y1='6.66699'
                      x2='23.7611'
                      y2='25.0846'
                      gradientUnits='userSpaceOnUse'>
                      <stop stop-color='#409EF8' />
                      <stop offset='1' stop-color='#3492EC' />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <p className={styles.textbutton} style={{ color: `#4C5BD4` }}>
                PC365 NHAN VIEN
              </p>
            </div>
          </Link>
        </Col>
      </Row>
      <div className={styles.body}>
        <div className={styles.left}>
          <div className={styles.textb1left}>
            <p className={styles.textb1}>BƯỚC 1: TẢI APP CHAT 365 TẠI ĐÂY</p>
          </div>
          <div className={styles.leftimage}>
            <Image
              className={styles.imgQR}
              src='/QRchat.png'
              width={120}
              height={120}
              alt=''
            />
          </div>
        </div>
        <div className={styles.center}>
          <Image
            src={`${listStep[Index].img}`}
            alt=''
            width={361.489}
            height={707.224}
            className={styles.image}
          />
        </div>
        <div className={styles.right}>
          <div className={styles.right1}>
            <p className={styles.textb1}>BƯỚC 1: TẢI APP CHAT 365 TẠI ĐÂY</p>
            <div className={styles.right1image}>
              <Image
                src='/QRchat.png'
                className={styles.imgQR}
                width={120}
                height={120}
                alt=''
              />
            </div>
          </div>
          <div className={styles.right2}>
            <p className={styles.textb2}>
              BƯỚC 2: ĐĂNG NHẬP APP VÀ THỰC HIỆN CÁC BƯỚC
            </p>
            {listStep.map((x, index) => (
              <div
                className={styles.step}
                key={index}
                onClick={() => setTicked(x.title, index)}>
                <div className={styles.stepTick}>
                  {tickOrUntick(`${x.clicked}`)}
                </div>
                <p
                  className={styles.stepFont}
                  style={{ color: `${x.clicked ? '#FED851' : '#FFFFFF'}` }}>
                  {index + 1} :
                </p>
                <p
                  className={styles.stepAfter}
                  style={{ color: `${x.clicked ? '#FED851' : '#FFFFFF'}` }}>
                  {x.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Link href='/cham-cong-bang-QR/pc-365'>
        <div className={styles.end}>
          <p className={styles.textend}>Chuyển tiếp</p>
          <div className={styles.iconend}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='25'
              height='25'
              viewBox='0 0 25 25'
              fill='none'>
              <path
                d='M14.8136 12.5001L6.55792 4.07161C6.18983 3.696 6.19358 3.09504 6.56543 2.71944L8.04154 1.24333C8.4209 0.867729 9.02937 0.867729 9.40497 1.24709L19.9105 11.8203C20.0983 12.0081 20.1922 12.2522 20.1922 12.5001C20.1922 12.748 20.0983 12.9921 19.9105 13.1799L9.40497 23.7531C9.02937 24.1325 8.4209 24.1325 8.04154 23.7569L6.56543 22.2807C6.19358 21.9051 6.18983 21.3042 6.55792 20.9286L14.8136 12.5001Z'
                fill='white'
              />
            </svg>
          </div>
        </div>
      </Link>
    </div>
  )
}
