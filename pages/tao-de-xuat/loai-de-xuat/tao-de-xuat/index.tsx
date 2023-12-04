import Icon from '@ant-design/icons/lib/components/AntdIcon'
import styles from './index.module.css'
import { Button, Select, Row, Col } from 'antd'
import Image from 'next/image'
import { BlockItem } from '@/components/tao-de-xuat-2/block-item/block-item'
import { useEffect, useState } from 'react'
import React from 'react'
import { useRouter } from 'next/router'
import { PAGE_DOMAIN } from '@/components/bodyFrameNs/bodyFrame'

export default function TaoDeXuat() {
  const [seeMore, setSeeMore] = useState(false)
  const [choice, setChoice] = useState<any>(undefined)
  const [value, setValue] = useState('')
  const [optionSearch, setOptionSearch] = useState<
    { value: string; label: string; urlRouter: string }[]
  >([])
  const [onSearch, setOnSearch] = useState(false)
  const router = useRouter()

  const SelectedEle = (icon: any, value: any) => {
    return (
      <div
        style={{ display: 'flex', alignItems: 'center' }}
        className={styles.divHover}>
        <Image
          src={icon}
          alt=''
          width={20}
          height={20}
          className={styles.hoverImage}></Image>
        <span
          style={{ marginLeft: '12px', fontSize: '16px', color: '#4c5bd4' }}
          className={`taoDeXuatSelectTxt ${styles.hoverText}`}>
          {value}
        </span>
      </div>
    )
  }

  const handleSetSeeMore = () => {
    setSeeMore(true)
  }
  const handleSearch = () => {
    const foundObject = options.find((item) => item.value === value)

    if (foundObject) {
      router.push(`/${foundObject?.urlRouter}`)
      setOptionSearch([foundObject])
      setOnSearch(true)
    } else {
      setOptionSearch([])
      setOnSearch(false)
    }
  }
  useEffect(() => {
    console.log(optionSearch)
  }, [optionSearch])

  const options = [
    {
      value: '1',
      label: 'Đơn xin nghỉ phép',
      urlRouter: '/tao-de-xuat/tao-de-xuat/don-xin-nghi-phep',
    },
    {
      value: '2',
      label: 'Đơn xin đổi ca',
      urlRouter: '/tao-de-xuat/tao-de-xuat/doi-ca',
    },
    {
      value: '3',
      label: 'Đơn tạm ứng',
      urlRouter: '/tao-de-xuat/tao-de-xuat/don-xin-tam-ung',
    },
    {
      value: '4',
      label: 'Đơn xin cấp phát tài sản',
      urlRouter: '/tao-de-xuat/tao-de-xuat/don-xin-cap-phat-ts',
    },
    {
      value: '5',
      label: 'Đơn xin thôi việc',
      urlRouter: '/tao-de-xuat/tao-de-xuat/de-xuat-thoi-viec',
    },
    {
      value: '6',
      label: 'Đề xuất tăng lương',
      urlRouter: '/tao-de-xuat/tao-de-xuat/de-xuat-xin-tang-luong',
    },
    {
      value: '7',
      label: 'Đề xuất bổ nhiệm',
      urlRouter: '/tao-de-xuat/tao-de-xuat/de-xuat-bo-nhiem',
    },
    {
      value: '8',
      label: 'Đề xuât luân chuyển công tác',
      urlRouter: '/tao-de-xuat/tao-de-xuat/luan-chuyen-cong-tac',
    },
    {
      value: '9',
      label: 'Đề xuất tham gia dự án',
      urlRouter: '/tao-de-xuat/tao-de-xuat/tham-gia-du-an',
    },
    {
      value: '10',
      label: 'Đề xuất xin tăng ca',
      urlRouter: '/tao-de-xuat/tao-de-xuat/xin-tang-ca',
    },
    {
      value: '11',
      label: 'Đề xuất xin nghỉ chế độ thai sản',
      urlRouter: '/tao-de-xuat/tao-de-xuat/xin-nghi-che-do-thai-san',
    },
    {
      value: '12',
      label: 'Đề xuất đăng kí sử dụng phòng họp',
      urlRouter: '/tao-de-xuat/tao-de-xuat/xin-su-dung-phong-hop',
    },
    {
      value: '13',
      label: 'Đề xuất đăng kí sử dụng xe công',
      urlRouter: '/tao-de-xuat/tao-de-xuat/de-xuat-dang-ki-su-dung-xe-cong',
    },
    {
      value: '14',
      label: 'Đề xuất sửa chữa cơ sở vật chất',
      urlRouter: '/tao-de-xuat/tao-de-xuat/de-xuat-sua-csvc',
    },
    {
      value: '15',
      label: 'Đề xuất thanh toán',
      urlRouter: '/tao-de-xuat/tao-de-xuat/de-xuat-thanh-toan',
    },
    {
      value: '16',
      label: 'Đề xuất khiếu nại',
      urlRouter: '/tao-de-xuat/tao-de-xuat/khieu-nai',
    },
    {
      value: '17',
      label: 'Đề xuất cộng công',
      urlRouter: '/tao-de-xuat/tao-de-xuat/de-xuat-cong-cong',
    },
    {
      value: '18',
      label: 'Đề xuất cộng tiền/trừ tiền',
      urlRouter: '/tao-de-xuat/tao-de-xuat/de-xuat-cong-tru-tien',
    },
    {
      value: '19',
      label: 'Đề xuất hoa hồng doanh thu',
      urlRouter: '/tao-de-xuat/tao-de-xuat/de-xuat-hoa-hong-doanh-thu',
    },
    {
      value: '20',
      label: 'Đề xuất lịch làm việc',
      urlRouter: '/tao-de-xuat/tao-de-xuat/de-xuat-lich-lam-viec',
    },
    {
      value: '21',
      label: 'Đơn xin nghỉ phép ra ngoài',
      urlRouter: '/tao-de-xuat/tao-de-xuat/don-xin-nghi-phep-ra-ngoai',
    },
    {
      value: '22',
      label: 'Đề xuất xin đi muộn về sớm',
      urlRouter: '/tao-de-xuat/tao-de-xuat/de-xuat-xin-di-muon-ve-som',
    },
    {
      value: '23',
      label: 'Đề xuất xin tải tài liệu',
      urlRouter: '/tao-de-xuat/tao-de-xuat/de-xuat-xin-tai-tai-lieu',
    },
    {
      value: '24',
      label: 'Đề xuất nhập ngày nhận lương',
      urlRouter: '/tao-de-xuat/tao-de-xuat/de-xuat-nhap-ngay-nhan-luong',
    },
  ]

  const options2 = [
    {
      value: '1',
      label: (
        <div
          style={{ display: 'flex', alignItems: 'center' }}
          className={styles.divHover}>
          <Image
            src='/nghi-phep.svg'
            alt=''
            width={20}
            height={20}
            className={styles.hoverImage}></Image>
          <span
            style={{ marginLeft: '12px', fontSize: '16px', color: '#4c5bd4' }}
            className={`taoDeXuatSelectTxt ${styles.hoverText}`}>
            Nghỉ phép
          </span>
        </div>
      ),
    },
    {
      value: '2',
      label: (
        <div
          style={{ display: 'flex', alignItems: 'center' }}
          className={styles.divHover}>
          <Image
            src='/doi-ca.svg'
            alt=''
            width={20}
            height={20}
            className={styles.hoverImage}></Image>
          <span
            style={{ marginLeft: '12px', fontSize: '16px', color: '#4c5bd4' }}
            className={`taoDeXuatSelectTxt ${styles.hoverText}`}>
            Đổi ca
          </span>
        </div>
      ),
    },
    {
      value: '3',
      label: (
        <div
          style={{ display: 'flex', alignItems: 'center' }}
          className={styles.divHover}>
          <Image
            src='/tam-ung-tien.svg'
            alt=''
            width={20}
            height={20}
            className={styles.hoverImage}></Image>
          <span
            style={{ marginLeft: '12px', fontSize: '16px', color: '#4c5bd4' }}
            className={`taoDeXuatSelectTxt ${styles.hoverText}`}>
            Tạm ứng tiền
          </span>
        </div>
      ),
    },
    {
      value: '4',
      label: (
        <div
          style={{ display: 'flex', alignItems: 'center' }}
          className={styles.divHover}>
          <Image
            src='/cap-phat-tai-san.svg'
            alt=''
            width={20}
            height={20}
            className={styles.hoverImage}></Image>
          <span
            style={{ marginLeft: '12px', fontSize: '16px', color: '#4c5bd4' }}
            className={`taoDeXuatSelectTxt ${styles.hoverText}`}>
            Cấp phát tài sản
          </span>
        </div>
      ),
    },
    {
      value: '5',
      label: (
        <div
          style={{ display: 'flex', alignItems: 'center' }}
          className={styles.divHover}>
          <Image
            src='/thoi-viec.svg'
            alt=''
            width={20}
            height={20}
            className={styles.hoverImage}></Image>
          <span
            style={{ marginLeft: '12px', fontSize: '16px', color: '#4c5bd4' }}
            className={`taoDeXuatSelectTxt ${styles.hoverText}`}>
            Thôi việc
          </span>
        </div>
      ),
    },
    {
      value: '6',
      label: (
        <div
          style={{ display: 'flex', alignItems: 'center' }}
          className={styles.divHover}>
          <Image
            src='/tang-luong.svg'
            alt=''
            width={20}
            height={20}
            className={styles.hoverImage}></Image>
          <span
            style={{ marginLeft: '12px', fontSize: '16px', color: '#4c5bd4' }}
            className={`taoDeXuatSelectTxt ${styles.hoverText}`}>
            Tăng lương
          </span>
        </div>
      ),
    },
    {
      value: '7',
      label: (
        <div
          style={{ display: 'flex', alignItems: 'center' }}
          className={styles.divHover}>
          <Image
            src='/bo-nhiem.svg'
            alt=''
            width={20}
            height={20}
            className={styles.hoverImage}></Image>
          <span
            style={{ marginLeft: '12px', fontSize: '16px', color: '#4c5bd4' }}
            className={`taoDeXuatSelectTxt ${styles.hoverText}`}>
            Bổ nhiệm
          </span>
        </div>
      ),
    },
    {
      value: '8',
      label: (
        <div
          style={{ display: 'flex', alignItems: 'center' }}
          className={styles.divHover}>
          <Image
            src='/luan-chuyen-cong-tac.svg'
            alt=''
            width={20}
            height={20}
            className={styles.hoverImage}></Image>
          <span
            style={{ marginLeft: '12px', fontSize: '16px', color: '#4c5bd4' }}
            className={`taoDeXuatSelectTxt ${styles.hoverText}`}>
            Luân chuyển công tác
          </span>
        </div>
      ),
    },
    {
      value: '9',
      label: (
        <div
          style={{ display: 'flex', alignItems: 'center' }}
          className={styles.divHover}>
          <Image
            src='/tham-gia-du-an.svg'
            alt=''
            width={20}
            height={20}
            className={styles.hoverImage}></Image>
          <span
            style={{ marginLeft: '12px', fontSize: '16px', color: '#4c5bd4' }}
            className={`taoDeXuatSelectTxt ${styles.hoverText}`}>
            Tham gia dự án
          </span>
        </div>
      ),
    },
    {
      value: '10',
      label: (
        <div
          style={{ display: 'flex', alignItems: 'center' }}
          className={styles.divHover}>
          <Image
            src='/xin-tang-ca.svg'
            alt=''
            width={20}
            height={20}
            className={styles.hoverImage}></Image>
          <span
            style={{ marginLeft: '12px', fontSize: '16px', color: '#4c5bd4' }}
            className={`taoDeXuatSelectTxt ${styles.hoverText}`}>
            Xin tăng ca
          </span>
        </div>
      ),
    },
    {
      value: '11',
      label: (
        <div
          style={{ display: 'flex', alignItems: 'center' }}
          className={styles.divHover}>
          <Image
            src='/nghi-che-do-thai-san.svg'
            alt=''
            width={20}
            height={20}
            className={styles.hoverImage}></Image>
          <span
            style={{ marginLeft: '12px', fontSize: '16px', color: '#4c5bd4' }}
            className={`taoDeXuatSelectTxt ${styles.hoverText}`}>
            Xin nghỉ chế độ thai sản
          </span>
        </div>
      ),
    },
    {
      value: '12',
      label: (
        <div
          style={{ display: 'flex', alignItems: 'center' }}
          className={styles.divHover}>
          <Image
            src='/su-dung-phong-hop.svg'
            alt=''
            width={20}
            height={20}
            className={styles.hoverImage}></Image>
          <span
            style={{ marginLeft: '12px', fontSize: '16px', color: '#4c5bd4' }}
            className={`taoDeXuatSelectTxt ${styles.hoverText}`}>
            Đăng ký sử dụng phòng họp
          </span>
        </div>
      ),
    },
    {
      value: '13',
      label: (
        <div
          style={{ display: 'flex', alignItems: 'center' }}
          className={styles.divHover}>
          <Image
            src='/su-dung-xe-cong.svg'
            alt=''
            width={20}
            height={20}
            className={styles.hoverImage}></Image>
          <span
            style={{ marginLeft: '12px', fontSize: '16px', color: '#4c5bd4' }}
            className={`taoDeXuatSelectTxt ${styles.hoverText}`}>
            Đăng ký sử dụng xe công
          </span>
        </div>
      ),
    },
    {
      value: '14',
      label: (
        <div
          style={{ display: 'flex', alignItems: 'center' }}
          className={styles.divHover}>
          <Image
            src='/sua-chua-co-so-vat-chat.svg'
            alt=''
            width={20}
            height={20}
            className={styles.hoverImage}></Image>
          <span
            style={{ marginLeft: '12px', fontSize: '16px', color: '#4c5bd4' }}
            className={`taoDeXuatSelectTxt ${styles.hoverText}`}>
            Sửa chữa cơ sở vật chất
          </span>
        </div>
      ),
    },
    {
      value: '15',
      label: (
        <div
          style={{ display: 'flex', alignItems: 'center' }}
          className={styles.divHover}>
          <Image
            src='/thanh-toan.svg'
            alt=''
            width={20}
            height={20}
            className={styles.hoverImage}></Image>
          <span
            style={{ marginLeft: '12px', fontSize: '16px', color: '#4c5bd4' }}
            className={`taoDeXuatSelectTxt ${styles.hoverText}`}>
            Thanh toán
          </span>
        </div>
      ),
    },
    {
      value: '16',
      label: (
        <div
          style={{ display: 'flex', alignItems: 'center' }}
          className={styles.divHover}>
          <Image
            src='/khieu-nai.svg'
            alt=''
            width={20}
            height={20}
            className={styles.hoverImage}></Image>
          <span
            style={{ marginLeft: '12px', fontSize: '16px', color: '#4c5bd4' }}
            className={`taoDeXuatSelectTxt ${styles.hoverText}`}>
            Khiếu nại
          </span>
        </div>
      ),
    },
    {
      value: '17',
      label: (
        <div
          style={{ display: 'flex', alignItems: 'center' }}
          className={styles.divHover}>
          <Image
            src='/cong-cong.svg'
            alt=''
            width={20}
            height={20}
            className={styles.hoverImage}></Image>
          <span
            style={{ marginLeft: '12px', fontSize: '16px', color: '#4c5bd4' }}
            className={`taoDeXuatSelectTxt ${styles.hoverText}`}>
            Cộng công
          </span>
        </div>
      ),
    },
    {
      value: '18',
      label: (
        <div
          style={{ display: 'flex', alignItems: 'center' }}
          className={styles.divHover}>
          <Image
            src='/cong-tien-tru-tien.svg'
            alt=''
            width={20}
            height={20}
            className={styles.hoverImage}></Image>
          <span
            style={{ marginLeft: '12px', fontSize: '16px', color: '#4c5bd4' }}
            className={`taoDeXuatSelectTxt ${styles.hoverText}`}>
            Cộng tiền/trừ tiền
          </span>
        </div>
      ),
    },
    {
      value: '19',
      label: (
        <div
          style={{ display: 'flex', alignItems: 'center' }}
          className={styles.divHover}>
          <Image
            src='/hoa-hong-doanh-thu.svg'
            alt=''
            width={20}
            height={20}
            className={styles.hoverImage}></Image>
          <span
            style={{ marginLeft: '12px', fontSize: '16px', color: '#4c5bd4' }}
            className={`taoDeXuatSelectTxt ${styles.hoverText}`}>
            Hoa hồng doanh thu
          </span>
        </div>
      ),
    },
    {
      value: '20',
      label: (
        <div
          style={{ display: 'flex', alignItems: 'center' }}
          className={styles.divHover}>
          <Image
            src='/lich-lam-viec.svg'
            alt=''
            width={20}
            height={20}
            className={styles.hoverImage}></Image>
          <span
            style={{ marginLeft: '12px', fontSize: '16px', color: '#4c5bd4' }}
            className={`taoDeXuatSelectTxt ${styles.hoverText}`}>
            Lịch làm việc
          </span>
        </div>
      ),
    },
    {
      value: '21',
      label: (
        <div
          style={{ display: 'flex', alignItems: 'center' }}
          className={styles.divHover}>
          <Image
            src='/nghi-phep-ra-nuoc-ngoai.svg'
            alt=''
            width={20}
            height={20}
            className={styles.hoverImage}></Image>
          <span
            style={{ marginLeft: '12px', fontSize: '16px', color: '#4c5bd4' }}
            className={`taoDeXuatSelectTxt ${styles.hoverText}`}>
            Nghỉ phép ra ngoài
          </span>
        </div>
      ),
    },
    {
      value: '22',
      label: (
        <div
          style={{ display: 'flex', alignItems: 'center' }}
          className={styles.divHover}>
          <Image
            src='/di-muon-ve-som.svg'
            alt=''
            width={20}
            height={20}
            className={styles.hoverImage}></Image>
          <span
            style={{ marginLeft: '12px', fontSize: '16px', color: '#4c5bd4' }}
            className={`taoDeXuatSelectTxt ${styles.hoverText}`}>
            Xin đi muộn về sớm
          </span>
        </div>
      ),
    },
    {
      value: '23',
      label: (
        <div
          style={{ display: 'flex', alignItems: 'center' }}
          className={styles.divHover}>
          <Image
            src='/tai-tai-lieu.png'
            alt=''
            width={20}
            height={20}
            className={styles.hoverImage}></Image>
          <span
            style={{ marginLeft: '12px', fontSize: '16px', color: '#4c5bd4' }}
            className={`taoDeXuatSelectTxt ${styles.hoverText}`}>
            Xin tải tài liệu
          </span>
        </div>
      ),
    },
    {
      value: '24',
      label: (
        <div
          style={{ display: 'flex', alignItems: 'center' }}
          className={styles.divHover}>
          <Image
            src='/nhap-ngay-nhan-luong.svg'
            alt=''
            width={20}
            height={20}
            className={styles.hoverImage}></Image>
          <span
            style={{ marginLeft: '12px', fontSize: '16px', color: '#4c5bd4' }}
            className={`taoDeXuatSelectTxt ${styles.hoverText}`}>
            Nhập ngày nhận lương
          </span>
        </div>
      ),
    },
  ]

  const handleSelectChange = (value: string) => {
    setValue(value)
    const foundObjects = options2.filter((item) => item.value === value)[0]
    // console.log(foundObjects)
    const label = foundObjects.label.props.children[1].props.children
    const ele = foundObjects.label

    setChoice(label)
  }

  return (
    <div
      style={{
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
      }}>
      <div className={styles.tabs}>
        <div className={styles.header}>
          <div className={styles.headingDiv}>
            <div className={styles.headingTxt}>Danh sách đề xuất(24)</div>
          </div>
        </div>

        <Row className={styles.groupSearch}>
          <Col xxl={10} xl={10} md={10} sm={14} className={styles.selecteDiv}>
            <Select
              optionFilterProp='label'
              onChange={handleSelectChange}
              defaultValue={'Tìm kiếm đề xuất'}
              // value={choice}
              // open={true}

              className={`select_taoDeXuat ${styles.selectInput}`}
              style={{ width: '100%' }}
              options={options2}
              filterOption={(input, option) =>
                (
                  option?.label.props.children[1].props.children.toLowerCase() ??
                  ''
                ).includes(input.toLowerCase())
              }
              suffixIcon={
                <Image
                  src='/polygon-9.svg'
                  alt=''
                  height={8}
                  width={12}></Image>
              }
            />
          </Col>
          <Col xxl={3} xl={3} md={4} sm={5} className={styles.btnSearchWrapper}>
            <Button className={styles.buttonSearch} onClick={handleSearch}>
              <Image src='/search.png' alt='' height={24} width={24}></Image>{' '}
              <span className={styles.txt}>Tìm kiếm</span>
            </Button>
          </Col>
        </Row>

        <div className={styles.body}>
          <Row
            gutter={[{ xl: 30, sm: 10 }, 20]}
            className={styles.row1}
            style={{ display: onSearch ? 'none' : 'flex' }}>
            {options.map((object, index) => (
              <React.Fragment key={index}>
                <Col
                  md={8}
                  sm={12}
                  xs={24}
                  key={object.value}
                  className={`${styles.col1} ${
                    index >= 20 ? (seeMore ? styles.col : styles.hover) : ''
                  }`}>
                  {BlockItem(object.label, `/${object.urlRouter}`)}
                </Col>
                <Col
                  key={object.value}
                  className={`${styles.col2} ${
                    index >= 10 ? (seeMore ? styles.col : styles.hover) : ''
                  }`}>
                  {BlockItem(object.label, `${PAGE_DOMAIN}${object.urlRouter}`)}
                </Col>
              </React.Fragment>
            ))}
          </Row>
          <Row
            gutter={[25, 20]}
            className={styles.row1}
            style={{ display: onSearch ? 'flex' : 'none' }}>
            {optionSearch.map((object, index) => (
              <React.Fragment key={object.value}>
                <Col
                  style={{ padding: '0px' }}
                  key={object.value}
                  className={`${styles.col1} ${
                    index >= 20 ? (seeMore ? styles.col : styles.hover) : ''
                  }`}>
                  {BlockItem(object.label, `/${object.urlRouter}`)}
                </Col>
                <Col
                  style={{ padding: '0px' }}
                  key={object.value}
                  className={`${styles.col2} ${
                    index >= 10 ? (seeMore ? styles.col : styles.hover) : ''
                  }`}>
                  {BlockItem(object.label, `/${object.urlRouter}`)}
                </Col>
              </React.Fragment>
            ))}
          </Row>
          <Row className={styles.row2}>
            <Button
              className={`${!seeMore ? styles.button : styles.hover}`}
              onClick={() => handleSetSeeMore()}>
              <Image
                src='/arrow-down.svg'
                alt=''
                width={24}
                height={24}></Image>
              <span className={styles.txt}>Xem thêm</span>
            </Button>
          </Row>
        </div>
      </div>
    </div>
  )
}
