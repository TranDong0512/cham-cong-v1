import {
  Row,
  Col,
  Modal,
  Input,
  Checkbox,
  Button,
  List,
  Divider,
  Skeleton,
  Tabs,
  Form,
} from 'antd'
import styles from './modal-them-nhan-vien.module.css'
import Image from 'next/image'
import { SearchOutlined } from '@ant-design/icons'
import { use, useEffect, useState } from 'react'
// import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import { POST_TL, getCompIdCS } from '@/pages/api/BaseApi'
import _ from 'lodash'
import { useForm } from 'antd/es/form/Form'
import { useRouter } from 'next/router'

export function ModalThemMoiNhanVien(
  openFilterAddClick: boolean,
  setOpenFilterAddClick: any,
  id: any,
  listNhanVien: any
) {
  const [checkedList, setCheckedList]: any = useState([])
  const [indeterminate, setIndeterminate] = useState(false)
  const [checkAll, setCheckAll] = useState(false)
  const [list, setList]: any = useState()
  const [listNhanVienFiltered, setListNhanVienFiltered] = useState(listNhanVien)
  const [form] = Form.useForm()
  const router = useRouter()
  useEffect(() => {
    POST_TL('api/tinhluong/congty/take_list_nv_nhom', { cls_id_cl: 615 }).then(
      (res) => {
        if (res?.data) {
          let temp_list: any = []
          res?.listUserFinal.forEach((data) => {
            temp_list.push(data.idQLC)
          })
          setList(temp_list)
          setCheckedList([...checkedList, ...temp_list])
        }
      }
    )
  }, [id])
  const onSearch = (value) => {
    // console.log("on search");
  }
  const onFinish = async (value) => {
    let listFinal = checkedList.filter(
      (value, index, array) => array.indexOf(value) === index
    )
    listFinal = listFinal.filter((val) => !list.includes(val))
    const com_id = getCompIdCS()
    await Promise.all(
      listFinal.map((data) =>
        POST_TL('api/tinhluong/congty/them_nv_nhom', {
          cls_id_cl: id,
          cls_id_com: com_id,
          cls_id_user: data,
          ...(value ?? {}),
        })
      )
    ).then((res) => {
      setOpenFilterAddClick(false)
      // router.replace(router.asPath)
      router.reload()
    })
  }
  const handleCheckedList = (e: any) => {
    setCheckedList([...checkedList, e])
  }

  const handleRemoveFromCheckedList = (e: any) => {
    const updatedList = checkedList.filter((staff) => staff !== e.idQLC)
    setCheckedList(updatedList)
  }

  const onChange = (checkedValues) => {
    setCheckedList(checkedValues)
    setIndeterminate(
      !!checkedValues.length && checkedValues.length < listNhanVien.length
    )
    setCheckAll(checkedValues.length === listNhanVien.length)
  }

  const onCheckAllChange = (e) => {
    setCheckedList(e.target.checked ? listNhanVien : [])
    setIndeterminate(false)
    setCheckAll(e.target.checked)
  }

  const LIST_TABS = [
    {
      key: '1',
      label: <div className={styles.labelTabs}>Nhân viên</div>,
      children: (
        <div style={{ marginBottom: '20px' }}>
          <div className={`${styles.checkboxDiv}`}>
            <Checkbox
              indeterminate={indeterminate}
              onChange={onCheckAllChange}
              checked={checkAll}>
              <span className={styles.textCheckbox}>Tất cả nhân viên</span>
            </Checkbox>
          </div>
          <div className={`${styles.listStaff} ${styles.scrollList}`}>
            {listNhanVienFiltered?.map(
              (item, index) =>
                !list?.includes(item.idQLC) && (
                  <div
                    key={index}
                    style={{
                      marginBottom: '0px',
                      marginTop: '0px',
                      width: '100%',
                    }}>
                    <Checkbox
                      key={index}
                      value={item}
                      style={{ width: '100%' }}
                      checked={checkedList.some(
                        (staff) => staff === item.idQLC
                      )}
                      onChange={(e) => {
                        const checkedItem = e.target.checked ? item : null
                        onChange(
                          checkedItem
                            ? [...checkedList, checkedItem.idQLC]
                            : checkedList.filter(
                              (staff) => staff !== item.idQLC
                            )
                        )
                      }}>
                      <Row style={{ margin: '10px', width: '100%' }}>
                        <Col
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Image
                            src={`/avt_365.png`}
                            alt=''
                            height={40}
                            width={40}></Image>
                        </Col>
                        <Col
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            margin: '10px',
                          }}>
                          <div style={{ color: '#4C5BD4', fontSize: '18px' }}>
                            {item?.userName}
                          </div>

                          <div style={{ fontSize: '16px', color: '#474747' }}>
                            {item?.idQLC}
                          </div>
                        </Col>
                      </Row>
                    </Checkbox>
                    <div
                      style={{
                        width: '100%',
                        height: '1px',
                        borderBottom: '1px dashed rgba(0, 0, 0, 0.3)',
                      }}></div>
                  </div>
                )
            )}
          </div>
        </div>
      ),
    },
  ]

  return (
    <Modal
      open={openFilterAddClick}
      width={700}
      closable={false}
      onCancel={() => {
        setCheckedList([])
        form.resetFields()
        setOpenFilterAddClick(false)
        setCheckAll(false)
      }}
      cancelButtonProps={{ style: { display: 'none' } }}
      okButtonProps={{ style: { display: 'none' } }}
      className={`modal_them_moi_phuc_loi`}>
      <div className={styles.header}>
        <div className={styles.textHead}>Thêm nhân viên</div>
        <div className={styles.crossImage}>
          <Image
            alt='/'
            src={'/cross.png'}
            width={14}
            height={14}
            onClick={() => {
              setCheckedList([])
              form.resetFields()
              setOpenFilterAddClick(false)
              setCheckAll(false)
            }}
          />
        </div>
      </div>
      <div className={styles.body}>
        <div className={styles.bodyItem}>
          <Input
            prefix={<SearchOutlined rev='' />}
            style={{ fontSize: '16px ' }}
            placeholder='Nhập từ cần tìm'
            // onPressEnter={onSearch}
            onChange={(e) => {
              const value = e.target.value
              if (value) {
                const filteredList = listNhanVien.filter(
                  (item) =>
                    item.userName
                      ?.toLowerCase()
                      ?.includes(value?.toLowerCase()) ||
                    item?.userNameWithOutVN
                      ?.toLowerCase()
                      .includes(value?.toLowerCase())
                )
                // delay time output to enhance performance
                setTimeout(() => {
                  setListNhanVienFiltered(filteredList)
                }, 500)
              } else {
                setListNhanVienFiltered(listNhanVien)
              }
            }}
          />
        </div>
        <Form form={form} onFinish={onFinish}>
          <div className={styles.bodyItem}>
            <Tabs
              defaultActiveKey='1'
              items={LIST_TABS}
              className={`tab_themNhanVienPhucLoi`}
            />
            <span style={{ fontSize: '16px' }}>
              Thời điểm áp dụng <span style={{ color: 'red' }}>*</span>
            </span>
            <Form.Item name={'cls_day'}>
              <Input
                required
                type='month'
                style={{ width: '100%' }}
                placeholder='Chọn tháng'></Input>
            </Form.Item>
          </div>
          <div className={styles.bodyItem}>
            <span style={{ fontSize: '16px' }}>Kết thúc (Không bắt buộc)</span>
            <Form.Item name={'cls_day_end'}>
              <Input
                type='month'
                style={{ width: '100%' }}
                placeholder='Chọn tháng'></Input>
            </Form.Item>
          </div>
          <div className={styles.hasButton}>
            <Form.Item>
              <Button className={styles.Button} htmlType='submit'>
                <p className={styles.txt}>Thêm mới</p>
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </Modal>
  )
}
