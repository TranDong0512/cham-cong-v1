import { MySwitch } from '@/components/de-xuat/cai-dat-duyet-phep/qua-nhieu-cap/DuyetQuaNhieuCap';
import {
  MyInput,
  MySelect,
} from '@/components/quan-ly-cong-ty/quan-ly-cong-ty-con/modal';
import { Button, Card, Col, Form, Row, Space, Switch } from 'antd';
import { useEffect, useState } from 'react';
import styles from './index.module.css';
import { HorizontalLine, MySelectTime } from '@/components/commons/Components';
import { UpdateSuccessModal } from '@/components/de-xuat/cai-dat-thoi-gian-de-xuat/CaiDatThoiGianDeXuat';
import { POST, POST_SS_VT, POST_VT } from '@/pages/api/BaseApi';
import dayjs from 'dayjs';
import _, { sample } from 'lodash';
import { useRouter } from 'next/router';

export default function CaiDatThoiGianDuyetPage({ ListDataSetting }) {
  const [iSchedule, setIsSchedule] = useState(true);
  const [isSudden, setIsSudden] = useState(true);
  const [isBounty, setIsBounty] = useState(true);
  const [isPusnish, setIsPunish] = useState(true);
  const [openUpdateSuccessModal, setOpenUpdateSuccessModal] = useState(false);
  const [dataSudden, setDataSudden] = useState(
    ListDataSetting?.settingDx?.time_limit_l
  );
  // console.log(ListDataSetting)
  const [listShifts, setListShifts] = useState<any>([]);
  const [data, setData] = useState(ListDataSetting?.settingDx);
  const [isObtainData, setIsObtainData] = useState(false);
  console.log(isObtainData);
  const [form] = Form.useForm();
  const [formListShift] = Form.useForm();
  const router = useRouter();

  const getData = async () => {
    let listShiftsData: any[] = [];

    await JSON.parse(dataSudden)?.map(async (item: any) => {
      const sample = await POST('api/qlc/shift/detail', {
        shift_id: Number(item[0]),
      });
      listShiftsData.push({ ...sample?.shift, preview_time: item[1] });
    });
    setIsObtainData(listShiftsData.length > 0);
    setListShifts(listShiftsData);
  };

  useEffect(() => {
    if (dataSudden) {
      getData();
    }
  }, [dataSudden]);

  const UpdateBtn = ({ onclick }: { onclick: (e: any) => void }) => (
    <Button
      size="large"
      style={{
        backgroundColor: '#4C5BD4',
        borderRadius: '10px',
        marginBottom: '20px',
      }}
      onClick={onclick}
    >
      <p style={{ color: '#fff', padding: '0px 10px' }}>Cập nhật</p>
    </Button>
  );

  const handleUpdateTime = () => {
    // console.log(form.getFieldValue("time_tp"));
    POST_VT('api/vanthu/setting/editSetting', {
      time_limit: form.getFieldValue('time_limit'),
      time_tp: form.getFieldValue('time_tp'),
      time_hh: form.getFieldValue('time_hh'),
    }).then((res) => {
      if (res?.result === true) {
        setOpenUpdateSuccessModal(true);
        router.reload();
      }
    });
  };

  const handleUpdateListTime = () => {
    const bodySuddenTime = form.getFieldsValue();
    delete bodySuddenTime['time_tp'];
    delete bodySuddenTime['time_limit'];
    delete bodySuddenTime['time_hh'];

    POST_VT('api/vanthu/setting/editSetting', {
      time_limit_l: JSON.stringify(Object.entries(bodySuddenTime)),
    }).then((res) => {
      if (res?.result === true) {
        setOpenUpdateSuccessModal(true);
        // setDataSudden(JSON.stringify(Object.entries(bodySuddenTime)));
        router.reload();
      }
    });
  };

  const handleChangeTime = (dateString, name) => {
    form.setFieldValue(name, dateString);
  };

  useEffect(() => {
    form.setFieldsValue(data);
  }, [form, data]);

  // if (!isObtainData) {
  //   return <>Loading...</>;
  // }

  return (
    <>
      <Card>
        <Form form={form} initialValues={data}>
          <div>
            <p className={styles.headerTxt}>
              Thời gian duyệt đề xuất có kế hoạch
            </p>
            <MySwitch
              open={iSchedule}
              setOpen={setIsSchedule}
              title="Thời gian duyệt đề xuất có kế hoạch"
            />
            {iSchedule && (
              <>
                <div className={styles.input}>
                  {MyInput(
                    'Thời gian duyệt đề xuất có kế hoạch (Giờ)',
                    'Giờ',
                    false,
                    true,
                    'time_limit'
                  )}
                </div>
                <UpdateBtn onclick={handleUpdateTime} />
                <ul className={styles.alertTxt}>
                  <li>
                    Đề xuất nghỉ có kế hoạch là đề xuất được tạo bởi nhân viên
                    với những lý do như nghỉ cưới, nghỉ đi học, nghỉ đi du
                    lịch,... Trong đó người tạo chủ động báo trước với trưởng
                    phòng để sắp xếp công việc.
                  </li>
                  <li>
                    Thời gian duyệt đề xuất có kế hoạch là khoảng thời gian tối
                    đa để lãnh đạo duyệt phép cho nhân viên kể từ thời điểm nhân
                    viên tạo đề xuất xin nghỉ phép có kế hoạch. Nếu vượt quá
                    khoảng thời gian này mà đề xuất không được lãnh đạo duyệt,
                    hệ thống tính lương sẽ xét đó vào diện nghỉ sai quy định.
                  </li>
                  <li>
                    <span style={{ color: 'red' }}>Lưu ý:</span> chỗ này nếu để
                    trống, tức là không cài đặt thời gian thì lãnh đạo có thể
                    duyệt phép bất cứ khi nào.
                  </li>
                </ul>
              </>
            )}
          </div>
          <HorizontalLine color="#ACACAC" />
          <div>
            <p className={styles.headerTxt}>Thời gian duyệt đề xuất đột xuẩt</p>
            <MySwitch
              open={isObtainData}
              setOpen={setIsObtainData}
              title="Thời gian duyệt đề xuất đột xuất"
            />
            {isObtainData && (
              <>
                <p className={styles.formHeader}>Danh sách ca làm việc</p>
                <Row gutter={{ sm: 20 }}>
                  {listShifts?.length > 0 &&
                    listShifts.map((item, index) => {
                      // console.log(item)
                      return (
                        <Col sm={12} xs={24} key={index}>
                          <MySelectTime
                            name={item.shift_id}
                            label="Thời gian duyệt trước"
                            info={`${item.shift_name}: ${item.start_time}`}
                            time={item.preview_time}
                            handleChangeTime={handleChangeTime}
                          />
                        </Col>
                      );
                    })}
                </Row>
                <UpdateBtn onclick={handleUpdateListTime} />
                <ul className={styles.alertTxt}>
                  <li>
                    Đề xuất nghỉ đột xuất áp dụng đối với những trường hợp không
                    có dự kiến từ trước mà xảy ra mang tính đột xuất, bất ngờ
                    như: Nghỉ ốm, nghỉ người nhà mất, tai nạn....
                  </li>
                  <li>
                    Thời gian duyệt đề xuất đột xuất là mốc thời gian mà các
                    lãnh đạo cần duyệt phép cho nhân viên trước thời điểm vào
                    ca. Nếu sau mốc thời gian này, đề xuất mà không được duyệt,
                    hệ thống tính lương sẽ ghi nhận nhân viên nghỉ sai quy định.
                    Ví dụ: Cài đặt trước 8 giờ sáng đối với ca sáng, thì lãnh
                    đạo phải duyệt phép cho nhân viên trước 8h sáng. Nếu sau 8
                    giờ mới duyệt thì lệnh duyệt không được phần mềm tính lương
                    công nhận.
                  </li>
                </ul>
              </>
            )}
          </div>

          <HorizontalLine color="#ACACAC" />
          <div>
            <p className={styles.headerTxt}>
              Thời gian duyệt đề xuất thưởng phạt
            </p>
            <p className={styles.underHeaderTxt}>
              Là khoảng thời gian (giờ) tối đa cho phép duyệt đề xuất cho ngày
              thưởng.
            </p>
            <MySwitch
              open={isBounty}
              setOpen={setIsBounty}
              title="Là khoảng thời gian (giờ) tối đa cho phép duyệt đề xuất cho ngày thưởng."
            />
            {isBounty && (
              <>
                <div className={styles.input}>
                  {MyInput(
                    'Thời gian duyệt đề xuất thưởng phạt (Giờ)',
                    'Giờ',
                    false,
                    true,
                    'time_tp'
                  )}
                </div>
                <UpdateBtn onclick={handleUpdateTime} />
              </>
            )}
          </div>

          <HorizontalLine color="#ACACAC" />
          <div>
            <p className={styles.headerTxt}>
              Thời gian duyệt đề xuất hoa hồng doanh thu
            </p>
            <p className={styles.underHeaderTxt}>
              Là thời gian (giờ) tối đa cho phép duyệt đề xuất cho ngày tính hoa
              hồng doanh thu đó.
            </p>
            <MySwitch
              open={isPusnish}
              setOpen={setIsPunish}
              title="Thời gian duyệt đề xuất hoa hồng doanh thu"
            />
            {isPusnish && (
              <>
                <div className={styles.input}>
                  {MyInput(
                    'Thời gian duyệt đề xuất hoa hồng doanh thu (Giờ)',
                    'Giờ',
                    false,
                    true,
                    'time_hh'
                  )}
                </div>
                <UpdateBtn onclick={handleUpdateTime} />
              </>
            )}
          </div>
        </Form>
      </Card>
      <UpdateSuccessModal
        open={openUpdateSuccessModal}
        setOpen={setOpenUpdateSuccessModal}
      />
    </>
  );
}

export const getServerSideProps = async (context) => {
  const ListDataSetting = await POST_SS_VT(
    'api/vanthu/setting/createF',
    {},
    context
  );

  return {
    props: {
      ListDataSetting,
    },
  };
};
