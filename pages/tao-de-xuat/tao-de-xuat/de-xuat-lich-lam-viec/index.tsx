import { Button, Col, Form, MenuProps, Row } from 'antd';
import React, { useState, useEffect } from 'react';
import styles from './index.module.css';
import {
  MyDatePicker,
  MyInput,
  MySelect,
  MySelectMulti,
  MySelectTags,
  MyTextArea,
} from '@/components/quan-ly-cong-ty/quan-ly-cong-ty-con/modal';
import {
  MyDate,
  MyInputFile,
  MySelectAcp,
  MyTime,
} from '@/components/tao-de-xuat/loai-de-xuat/tao-de-xuat/de-xuat-cong-cong/de-xuat-cong-cong';
import Image from 'next/image';
import {
  ModalAlertChooseShift,
  ModalAlertChooseTimeApply,
  ModalOkConfirm,
  MyMenuThemeColorMultiCheckbox,
  MyTimePicker,
  TableLich,
} from '@/components/tao-de-xuat/de-xuat-lich-lam-viec/modal/modal';
import dayjs, { Dayjs } from 'dayjs';
import { GET, GET_SS, POST_VT, getInfoUser } from '@/pages/api/BaseApi';

export default function Page({ listShift }) {
  const [current, setCurrent]: any = useState(new Date());
  const [listCheck, setListCheck]: any = useState([]);
  const [openCheck, setOpenCheck] = useState(false);
  const [allCheck, setAllCheck]: any = useState({});
  const [shiftLabel, setShiftLabel]: any = useState([]);
  const [data, setData]: any = useState({ apply_month: '2023-08-01' });
  const [listShiftSelected, setListShiftSelected]: any[] = useState([]);
  const [isMenuSelectShiftOpen, setIsMenuSelectShiftOpen]: any = useState([]);
  const [modalAlertChooseShift, setModalAlertChooseShift]: any =
    useState(false);
  const [modalAlertChooseTimeApply, setModalAlertChooseTimeApply]: any =
    useState(false);
  const [modalOkConfirm, setModalOkConfirm]: any = useState(false);
  const [isBlur, setIsBlur]: any = useState(true);
  const [weekType, setWeekType]: any = useState(2);
  const [shiftType, setShiftType]: any = useState(1);
  const [listHours, setListHours]: any[] = useState([]);
  const [timeEndShift, setTimeEndShift] = useState<Dayjs | null>(null);
  const [timeStartShift, setTimeStartShift] = useState<Dayjs | null>(null);
  const [isAddHour, setIsAddHour] = useState<boolean>(false);
  const [isFirstTime, setIsFirstTime] = useState(true);
  const [form] = Form.useForm();

  const values = Form.useWatch(
    ['thang_ap_dung', 'time-start-shift', 'time-end-shift'],
    form
  );

  useEffect(() => {
    const today = new Date();
    const dd = String(current.getDate()).padStart(2, '0');
    const mm = String(current.getMonth() + 1).padStart(2, '0');
    const yyyy = current.getFullYear();
    const timeFormat = yyyy + '-' + mm + '-' + dd;
    setData({ apply_month: timeFormat });
  }, []);

  useEffect(() => {
    if (data?.apply_month) {
      isBlur
        ? setCurrent(
            new Date(
              Number(data?.apply_month?.substring(0, 4)),
              Number(data?.apply_month?.substring(5, 7)) - 1
            ),
            Number(data?.apply_month?.substring(8))
          )
        : setCurrent(new Date('2000-01-01'));
    }
  }, [data]);

  useEffect(() => {
    setAllCheck({ ...allCheck, [formatDate(current)]: listCheck });
  }, [listCheck]);

  useEffect(() => {
    setAllCheck({ ...allCheck, [formatDate(current)]: listHours });
  }, [listHours]);

  useEffect(() => {
    shiftType === 1
      ? setListCheck(
          !(formatDate(current) in allCheck)
            ? []
            : allCheck[formatDate(current)]
        )
      : setListHours(
          !(formatDate(current) in allCheck)
            ? []
            : allCheck[formatDate(current)]
        );
  }, [current]);

  useEffect(() => {
    if (form.getFieldValue('thang_ap_dung') !== undefined) {
      openCheck
        ? listShiftSelected?.length > 0
          ? (getDaysInMonth(data?.apply_month, listShiftSelected, weekType),
            setListCheck(listShiftSelected))
          : setAllCheck({})
        : null;
    } else {
    }
  }, [listShiftSelected]);

  useEffect(() => {
    isBlur
      ? null
      : shiftType === 1
      ? getDaysInMonth(data?.apply_month, listShiftSelected, weekType)
      : getDaysInMonth(data?.apply_month, listHours, weekType);
  }, [weekType]);

  useEffect(() => {
    setAllCheck({});
  }, [shiftType]);

  useEffect(() => {
    setIsFirstTime(false);
  }, []);

  useEffect(() => {
    if (!isFirstTime) {
      shiftType === 1
        ? form.validateFields(['thang_ap_dung', 'ca_lam_viec']).then(() => {
            setOpenCheck(true);
            handleRemoveBlur();
            setData({
              apply_month: dayjs(form.getFieldValue('ngay_bat_dau')).format(
                'YYYY-MM-DD'
              ),
              cy_detail: getDaysInMonth(
                dayjs(form.getFieldValue('ngay_bat_dau')).format('YYYY-MM-DD'),
                listShiftSelected,
                weekType
              ),
            });
          })
        : form
            .validateFields([
              'thang_ap_dung',
              'time-start-shift',
              'time-end-shift',
            ])
            .then(() => {
              setOpenCheck(true);
              handleRemoveBlur();
              setData({
                apply_month: dayjs(form.getFieldValue('ngay_bat_dau')).format(
                  'YYYY-MM-DD'
                ),
                cy_detail: getDaysInMonth(
                  dayjs(form.getFieldValue('ngay_bat_dau')).format(
                    'YYYY-MM-DD'
                  ),
                  [{ time: `${timeStartShift} - ${timeEndShift}` }],
                  weekType,
                  'hour'
                ),
              });
              setListHours([{ time: `${timeStartShift} - ${timeEndShift}` }]);
            });
    }
  }, [timeEndShift, shiftType]);

  const getDaysInMonth = (
    thang_ap_dung,
    listShiftSelected,
    weekType,
    type: 'shift' | 'hour' = 'shift'
  ) => {
    var date: Date = new Date(
      Number(thang_ap_dung?.substring(0, 4)),
      Number(thang_ap_dung?.substring(5, 7)) - 1,
      1
    );
    var days = {};
    var current: Date = new Date(new Date(thang_ap_dung).setHours(0));
    while (date.getMonth() === Number(thang_ap_dung?.substring(5, 7)) - 1) {
      if (date >= current) {
        switch (weekType) {
          case 2:
            if (date.getDay() !== 0) {
              days = { ...days, [formatDate(date)]: listShiftSelected };
            }
            break;
          case 1:
            if (date.getDay() === 0 || date.getDay() === 6) {
            } else {
              days = { ...days, [formatDate(date)]: listShiftSelected };
            }
            break;
          case 3:
            days = { ...days, [formatDate(date)]: listShiftSelected };
            break;
          default:
            break;
        }
      }
      date.setDate(date.getDate() + 1);
    }
    setAllCheck(days);
    return days;
  };

  const formatDate = (date = new Date()) => {
    const year = date?.toLocaleString('default', { year: 'numeric' });
    const month = date?.toLocaleString('default', { month: '2-digit' });
    const day = date?.toLocaleString('default', { day: '2-digit' });

    return [year, month, day].join('-');
  };

  const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
    const latestOpenKey = keys?.find(
      (key) => isMenuSelectShiftOpen?.indexOf(key) === -1
    );
    if (['1'].indexOf(latestOpenKey!) === -1) {
      setIsMenuSelectShiftOpen(keys);
    } else {
      setIsMenuSelectShiftOpen(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  const handleRemoveBlur = () => {
    const table = document.querySelector('.ant-col.blur');
    table?.classList?.contains('blur')
      ? table?.classList?.remove('blur')
      : null;
    setIsBlur(false);
    table?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleChangeMonth = (value, timeStr) => {
    timeStr === ''
      ? form.setFieldValue('ngay_bat_dau', '')
      : form.setFieldValue('ngay_bat_dau', dayjs(timeStr + '-01'));

    shiftType === 1 &&
      form
        .validateFields([
          'de-xuat-name',
          'userConfirm',
          'userFollow',
          'reason',
          'thang_ap_dung',
        ])
        .then(() => {
          setOpenCheck(true);
          handleRemoveBlur();
          setData({
            apply_month: dayjs(form.getFieldValue('ngay_bat_dau')).format(
              'YYYY-MM-DD'
            ),
            cy_detail: getDaysInMonth(
              dayjs(form.getFieldValue('ngay_bat_dau')).format('YYYY-MM-DD'),
              listShiftSelected,
              weekType
            ),
          });
        });
  };

  const handleChangeDate = (value, timeStr) => {
    timeStr === ''
      ? setData({ apply_month: formatDate(new Date()), cy_detail: [] })
      : !isBlur && shiftType === 1
      ? setData({
          apply_month: dayjs(form.getFieldValue('ngay_bat_dau')).format(
            'YYYY-MM-DD'
          ),
          cy_detail: getDaysInMonth(
            dayjs(form.getFieldValue('ngay_bat_dau')).format('YYYY-MM-DD'),
            listShiftSelected,
            weekType
          ),
        })
      : !isBlur &&
        shiftType === 2 &&
        setData({
          apply_month: dayjs(form.getFieldValue('ngay_bat_dau')).format(
            'YYYY-MM-DD'
          ),
          cy_detail: getDaysInMonth(
            dayjs(form.getFieldValue('ngay_bat_dau')).format('YYYY-MM-DD'),
            listHours,
            weekType,
            'hour'
          ),
        });
  };

  const handleChangeTimeStart = (value, timeStr) => {
    setTimeStartShift(timeStr);
  };

  const handleChangeTimeEnd = (value, timeStr) => {
    setTimeEndShift(timeStr);
  };

  const handlePreviewCheck = () => {
    if (form?.getFieldValue('ngay_bat_dau') === undefined) {
      setModalAlertChooseTimeApply(true);
    } else {
      if (listShiftSelected?.length > 0) {
        setOpenCheck(true);
        // console.log(dayjs(form.getFieldValue("ngay_bat_dau")).format("YYYY-MM-DD"))
        setData({
          apply_month: dayjs(form.getFieldValue('ngay_bat_dau')).format(
            'YYYY-MM-DD'
          ),
          cy_detail: getDaysInMonth(
            dayjs(form.getFieldValue('ngay_bat_dau')).format('YYYY-MM-DD'),
            listShiftSelected,
            weekType
          ),
        });
        handleRemoveBlur();
      } else {
        setModalAlertChooseShift(true);
      }
    }
  };

  const [infoUser, setInfoUser] = useState<any>();
  const [listDuyet, setListDuyet] = useState<any>({});
  const [shifts, setShifts] = useState();
  console.log(listDuyet);

  useEffect(() => {
    const getListDuyet = async () => {
      const res = await POST_VT('api/vanthu/dexuat/showadd', {});

      if (res?.result) {
        setListDuyet({
          listDuyet: res?.listUsersDuyet?.map((user) => ({
            label: user?.userName,
            value: user?.idQLC ? `${user?.idQLC}` : '/nhanvien.png',
            url: user?.avatarUser,
          })),
          listTheoDoi: res?.listUsersTheoDoi?.map((user) => ({
            label: user?.userName,
            value: user?.idQLC,
            url: user?.avatarUser,
          })),
        });
      }
    };

    getListDuyet();
    GET('api/qlc/shift/list').then((res) => {
      if (res?.result === true) {
        setShiftLabel(
          res?.items.map((item) => {
            return {
              value: `${item?.shift_id}`,
              label: item?.shift_name,
            };
          })
        );
      }
    });

    setInfoUser(getInfoUser());
  }, []);

  useEffect(() => {
    if (infoUser?.idQLC) {
      form.setFieldValue('name', infoUser?.userName);
    }
  }, [infoUser]);

  return (
    <div className={styles.main}>
      <Form
        form={form}
        initialValues={{
          name: 'Vũ Văn Khá',
          type_shift: 1,
          deXuatType: 'Đề xuất lịch làm việc',
          lich_lam_viec: 2,
          ca_lam_viec: ['Ca sáng Lương <= 5TR'],
        }}
        className="taoDeXuatForm"
      >
        <Row gutter={[20, 10]} style={{ rowGap: '20px' }} className="rowGap20">
          <Col xl={12} className={styles.column}>
            <div className={styles.header}>
              <p className={styles.headerText}>Đề xuất lịch làm việc</p>
            </div>

            <div
              className={`${styles.colContent} contentFormItemLLV shadowForm`}
            >
              <Col xl={24} className={styles.colItem}>
                {MyInput(
                  'Tên đề xuất',
                  'Nhập tên đề xuất',
                  true,
                  true,
                  'name_dx',
                  '',
                  false
                )}
              </Col>
              <Col xl={24} className={styles.colItem}>
                {MySelect(
                  'Loại lịch làm việc',
                  'Làm việc theo ca',
                  true,
                  true,
                  'type_shift',
                  [
                    { label: 'Làm việc theo ca', value: 1 },
                    { label: 'Làm việc theo giờ', value: 2 },
                  ],
                  shiftType,
                  setShiftType
                )}
              </Col>
              <Col xl={24} className={styles.colItem}>
                {MyInput(
                  'Họ và tên',
                  'Vũ Văn Khá',
                  true,
                  true,
                  'name',
                  '',
                  true,
                  '#EDF3FF'
                )}
              </Col>
              <Col xl={24} className={styles.colItem}>
                {MyInput(
                  'Loại đề xuất',
                  'Đề xuất lịch làm việc',
                  true,
                  true,
                  'deXuatType',
                  '',
                  true,
                  '#EDF3FF'
                )}
              </Col>
              <Col xl={24} className={styles.colItem}>
                {MySelectTags(
                  'Người xét duyệt',
                  'Nhập người xét duyệt',
                  true,
                  true,
                  'id_user_duyet',
                  listDuyet?.listDuyet,
                  []
                )}
              </Col>
              <Col xl={24} className={styles.colItem}>
                {MySelectTags(
                  'Người theo dõi',
                  'Nhập người theo dõi',
                  true,
                  true,
                  'id_user_theo_doi',
                  listDuyet?.listTheoDoi,
                  []
                )}
              </Col>

              <Col xl={24} className={styles.colItem}>
                <MyTextArea
                  name="ly_do"
                  required={true}
                  title="Lý do"
                  hasLabel={true}
                  placeholder="Nhập lý do"
                />
              </Col>
              <Col xl={24} className={styles.colItem}>
                {MySelect(
                  'Chọn lịch làm việc',
                  'Chọn lịch làm việc',
                  true,
                  true,
                  'lich_lam_viec',
                  [
                    { label: 'Thứ 2 - Thứ 7', value: 2 },
                    { label: 'Thứ 2 - Thứ 6', value: 1 },
                    { label: 'Thứ 2 - CN', value: 3 },
                  ],
                  weekType,
                  setWeekType
                )}
              </Col>
              <Col xl={24} className={styles.colItem}>
                {MyDatePicker(
                  'Tháng áp dụng',
                  '---------- ----',
                  true,
                  true,
                  'thang_ap_dung',
                  'month',
                  '',
                  false,
                  handleChangeMonth
                )}
              </Col>
              <Col xl={24} className={styles.colItem}>
                {MyDatePicker(
                  'Ngày bắt đầu làm việc',
                  'yyyy-mm-dd',
                  true,
                  true,
                  'ngay_bat_dau',
                  '',
                  '',
                  false,
                  handleChangeDate
                )}
              </Col>

              {shiftType === 1 ? (
                <>
                  <Col xl={24} className={`${styles.colItem} themeColor`}>
                    {MyMenuThemeColorMultiCheckbox(
                      'Ca làm việc',
                      'Chọn ca làm việc',
                      true,
                      true,
                      'ca_lam_viec',
                      shiftLabel,
                      listShiftSelected,
                      setListShiftSelected,
                      isMenuSelectShiftOpen,
                      onOpenChange
                    )}
                  </Col>

                  {!isBlur ? (
                    <></>
                  ) : (
                    <Col xl={24} className={`${styles.colItem} themeColor`}>
                      <Button type="primary" block onClick={handlePreviewCheck}>
                        <div className={styles.btnContent}>
                          <span>Xem lịch làm việc</span>
                          <i style={{ marginRight: '10px' }}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="6"
                              height="8"
                              viewBox="0 0 6 8"
                              fill="none"
                            >
                              <path
                                d="M1.5 7.125L4.5 4L1.5 0.875"
                                stroke="#4C5BD4"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </i>
                        </div>
                      </Button>
                    </Col>
                  )}
                </>
              ) : (
                <>
                  <Col xl={24} className={`${styles.colItem}`}>
                    {MyTimePicker(
                      'Thời gian bắt đầu',
                      '',
                      true,
                      true,
                      'time-start-shift',
                      '',
                      undefined,
                      false,
                      handleChangeTimeStart
                    )}
                  </Col>
                  <Col xl={24} className={`${styles.colItem}`}>
                    {MyTimePicker(
                      'Thời gian kết thúc',
                      '',
                      true,
                      true,
                      'time-end-shift',
                      '',
                      undefined,
                      false,
                      handleChangeTimeEnd
                    )}
                  </Col>
                </>
              )}
            </div>
          </Col>
          <Col xl={12} className={`${styles.column} blur`}>
            {TableLich({
              current,
              setCurrent,
              listCheck,
              setListCheck,
              openCheck,
              setOpenCheck,
              allCheck,
              setAllCheck,
              shiftLabel,
              data,
              form,
              isBlur,
              weekType,
              shiftType,
              listShiftSelected,
              listHours,
              setListHours,
              isAddHour,
              setIsAddHour,
              modalOkConfirm,
              setModalOkConfirm,
            })}
          </Col>
        </Row>
      </Form>
      {ModalAlertChooseShift({
        open: modalAlertChooseShift,
        setOpen: setModalAlertChooseShift,
      })}
      {ModalAlertChooseTimeApply({
        open: modalAlertChooseTimeApply,
        setOpen: setModalAlertChooseTimeApply,
      })}
      {ModalOkConfirm({
        open: modalOkConfirm,
        setOpen: setModalOkConfirm,
      })}
    </div>
  );
}

export const getServerSideProps = async (context) => {
  const res = await GET_SS('api/qlc/shift/list', context);

  return {
    props: {
      // listShift
      listShift: res?.items || [],
    },
  };
};
