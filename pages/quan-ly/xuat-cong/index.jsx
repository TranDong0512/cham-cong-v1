import "./xuat-cong.module.css";
import styles from "./xuat-cong.module.css";
import React, { FC, use, useEffect, useState } from 'react'
import { Card, Input, Row, Col, Button, Form, Select, DatePicker } from "antd";
import dayjs from 'dayjs'
import axios from 'axios'
import _ from 'lodash'
import cookieCutter from 'cookie-cutter'
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons'
import { useRouter } from 'next/router'
import { Calendar } from 'antd'
// import { TokenForTinhLuong } from "../../api/BaseApi";
import { domain } from '../../cai-dat-luong/hoa-hong/hoahongdoanhthu/AddTable'
import jwtDecode from 'jwt-decode'


export default function QuanLyNhanVien({ title }) {
  const [form] = Form.useForm();
  return (
    <Card>
      <div className={styles.main}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <p className={styles.headText} style={{ color: "#474747" }}>
            Xuất công
          </p>
        </div>


        <Form form={form} >
          <div style={{ margin: "20px 0px 20px 0px" }}>
            <Col xl={9} sm={24} xs={24}>
              <Row gutter={20}>
                <Col xl={12} lg={12} className={styles.Pre}>
                  <Row gutter={20}>
                    <Col
                      span={5}
                      className={styles.text}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}

                    >
                      <p> Từ</p>
                    </Col>
                    <Col span={19}>
                      <Form.Item name="from" className={styles.input}>
                        <DatePicker size="large" format={"DD-MM-YYYY"} placeholder="Chọn ngày" />
                      </Form.Item>
                    </Col>
                  </Row>
                </Col>
                <Col xl={12} lg={12} className={styles.Pre}>
                  <Row gutter={20}>
                    <Col
                      span={5}
                      className={styles.text}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <p>Đến</p>
                    </Col>
                    <Col span={19}>
                      <Form.Item name="to" className={styles.input}>
                        <DatePicker size="large" format={"DD-MM-YYYY"} placeholder="Chọn ngày" />
                      </Form.Item>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
            {/* <Row
              gutter={[20, 10]}
              justify={{ ["sm"]: "end" }}
              className={styles.row2}
            >
              <Col xl={12} sm={12} md={12} xs={24} className={styles.After}>
                <Row gutter={20}>
                  <Col
                    span={2}
                    className={styles.text}
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    Từ
                  </Col>
                  <Col span={22}>
                    <Form.Item name="from" className={styles.input}>
                      <DatePicker size="large" format={"DD-MM-YYYY"} />
                    </Form.Item>
                  </Col>
                </Row>
              </Col>
              <Col xl={12} sm={12} md={12} xs={24} className={styles.After}>
                <Row gutter={20}>
                  <Col
                    span={2}
                    className={styles.text}
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    Đến
                  </Col>
                  <Col span={22}>
                    <Form.Item name="to" className={styles.input}>
                      <DatePicker size="large" format={"DD-MM-YYYY"} />
                    </Form.Item>
                  </Col>
                </Row>
              </Col>
              <Col xl={16} lg={4} md={5} sm={7} xs={12}>
                <p style={{ fontWeight: "bold", fontSize: "20px" }}>
                  {totalCong > 0 && `Tổng công trong tháng:  ${totalCong}`}
                </p>
              </Col>
              <Col xl={4} lg={4} md={5} sm={7} xs={12}>
                <Button
                  className={styles.button}
                  htmlType="submit"
                  size="large"
                  onClick={() => null}
                >
                  <p className={styles.txt} style={{ color: "#fff" }}>
                    Lọc
                  </p>
                </Button>
              </Col>
              <Col xl={4} lg={4} md={5} sm={7} xs={12}>
                <ExportExcel
                  title={`BẢNG XUẤT CÔNG TỪ ${moment(startDate).format(
                    "DD-MM-YYYY"
                  )} đến ${moment(endDate).format("DD-MM-YYYY")}`}
                  columns={[
                    { header: "Mã nhân viên", key: "col1", width: 20 },
                    { header: "Họ và tên", key: "col2", width: 35 },
                    { header: "Phòng ban", key: "col2", width: 55 },
                    { header: "Ngày tháng", key: "col3", width: 20 },
                    { header: "Ca làm việc", key: "col4", width: 35 },
                    {
                      header: "Thời gian làm việc (giờ)",
                      key: "col5",
                      width: 25,
                    },
                    { header: "Đi muộn (phút)", key: "col6", width: 15 },
                    { header: "Về sớm (phút)", key: "col7", width: 15 },
                    { header: "Công", key: "col8", width: 15 },
                    { header: "Tiền", key: "col9", width: 20 },
                    { header: "Tiền theo giờ", key: "col10", width: 15 },
                    { header: "Phụ cấp ca", key: "col10", width: 15 },
                    { header: "Cộng công", key: "col11", width: 15 },
                    { header: "Cộng tiền", key: "col12", width: 15 },
                    {
                      header: "Chi tiết ",
                      key: "col16",
                      width: 10,
                    },
                  ]}
                  data={
                    data
                      ? data?.map((item) => [

                        item?.ep_id || "Chưa cập nhật",
                        item?.ep_name || "Chưa cập nhật",
                        item?.organizeDetailName || "Chưa cập nhật",
                        moment(item?.ts_date)?.format("DD-MM-YYYY"),
                        item?.shift_name || "Chưa cập nhật",
                        `${item?.hour_real || 0}`,
                        `${item?.late || 0} `,
                        `${item?.early || 0}`,
                        `${item?.num_to_calculate || 0} công`,
                        `${item?.num_to_money || 0} VNĐ`,
                        `${item?.money_per_hour || 0} VNĐ`,
                        `${item?.money_allowances || 0} VNĐ`,
                        `${item?.cong_xn_them || 0} công`,
                        `${item?.tien_xn_them || item?.tientheogio_xn_them || 0
                        } VNĐ`,
                        ...item?.lst_time?.map((i) => {
                          return moment(i)?.format("HH:mm:ss");
                        }),
                      ])
                      : []
                  }
                  name={nameCty?.data.userName}
                  nameFile={"Bang_cong_nhan_vien"}
                  loading={loading}
                  type={2}
                ></ExportExcel>
              </Col>
            </Row> */}
          </div>
        </Form>
      </div>
    </Card>
  )
}
