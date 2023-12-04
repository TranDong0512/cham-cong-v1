import styles from "./cai-dat-di-muon-ve-som.module.css";
import { Row, Col, Select, Button, Table, Form } from "antd";
import Image from "next/image";
import type { ColumnsType } from "antd/es/table";
import {
  ModalCaiDatDiMuonVeSom,
  ModalUpDateCaiDatDiMuonVeSom,
  ModalXoaCaiDaiDMVS,
} from "./modal/modal";
import { useState, useEffect } from "react";
import moment from "moment";
import { GET, POST, POST_SS, POST_TL, getCompIdCS } from "@/pages/api/BaseApi";
import _ from "lodash";
import dayjs from "dayjs";

const TableCaiDatDiMuonVeSom = ({
  data,
  setModalChinhSua,
  setModalXoa,
  setSelectedRow,
  listShift,
}: {
  data: any[];
  setModalChinhSua: (a: boolean) => void;
  setModalXoa: (a: boolean) => void;
  setSelectedRow: (a: any) => void;
  listShift?: any;
}) => {
  console.log(data);

  const columns: any[] = [
    {
      key: "1",
      title: "Loại phạt",
      render: (record) => (
        <p>{record?.pm_type === 1 ? "Phạt đi muộn" : "Phạt về sớm"}</p>
      ),
      align: "center",
    },
    {
      key: "2",
      title: "Ca làm việc áp dụng",
      render: (record) => (
        <p>
          {listShift?.length > 0
            ? listShift?.find((shift) => shift?.shift_id === record?.pm_shift)
                ?.shift_name
            : "Chưa cập nhật"}
        </p>
      ),
      align: "center",
    },
    {
      key: "3",
      title: "Từ tháng",
      render: (record) => (
        <p>
          {record?.pm_time_begin &&
            `Tháng ${moment(record?.pm_time_begin)?.month() + 1} /${moment(
              record?.pm_time_begin
            )?.year()}`}
        </p>
      ),
      align: "center",
    },

    {
      key: "4",
      title: "Đến tháng",
      render: (record) => {
        console.log("record", record);
        return (
          <p>
            {moment(record?.pm_time_end)?.year() < 2018
              ? "---"
              : moment(record?.pm_time_end)?.format("DD-MM-YYYY")}
          </p>
        );
      },
      align: "center",
    },
    {
      key: "5",
      title: "Thời gian tính phạt",
      render: (record) => <p>{`Đi muộn ${record?.pm_minute} phút`}</p>,
      align: "center",
    },
    {
      key: "6",
      title: "Mức phạt",
      align: "center",
      render: (record: any) => (
        <>
          {record?.pm_monney &&
            new Intl.NumberFormat().format(record?.pm_monney)}{" "}
          {record?.pm_type_phat === 1 ? "VNĐ" : "công"}
          /ca
        </>
      ),
    },
    {
      key: "7",
      title: "Tùy chỉnh",
      align: "center",
      render: (record: any) => (
        <div className={styles.actionGroup}>
          <Image
            alt="/"
            src={"/edit.png"}
            width={24}
            height={24}
            onClick={() => {
              // console.log(record)
              setSelectedRow(record);
              setModalChinhSua(true);
            }}
          />
          <div className={styles.divider}></div>
          <Image
            alt="/"
            src={"/delete-icon.png"}
            width={24}
            height={24}
            onClick={() => {
              setSelectedRow(record);
              setModalXoa(true);
            }}
          />
        </div>
      ),
    },
  ];
  return (
    <div>
      <Table
        className={`green-table-bodyBorder`}
        columns={columns}
        dataSource={data}
        scroll={{ x: "max-content" }}
        pagination={{ position: ["bottomCenter"] }}
      ></Table>
    </div>
  );
};

export function CpmCaiDatDiMuonVeSom() {
  const [form] = Form.useForm();
  const [modalCaiDatDMVS, setModalCaiDatDMVS] = useState(false);
  const [listData, setListData] = useState();
  const [modalChinhSua, setModalChinhSua] = useState(false);
  const [modalXoa, setModalXoa] = useState(false);
  const [reload, setReload] = useState(false);
  const [selectedRow, setSelectedRow] = useState();
  const [listCa, setListCa] = useState([]);
  const [year, setYear] = useState(moment().year());
  const [month, setMonth] = useState(moment().month() + 1);
  const LIST_YEARS = _.range(2022, 2025, 1).map((item) => ({
    label: `Năm ${item}`,
    value: item,
  }));

  const LIST_MONTHS = _.range(1, 13, 1).map((item) => ({
    label: `Tháng ${item}`,
    value: item,
  }));

  useEffect(() => {
    const getPmInfo = async () => {
      // const year = moment().year()
      const com_id = getCompIdCS();
      const res = await POST_TL("api/tinhluong/congty/takeinfo_phat_muon", {
        pm_time_begin: `${year}-${month}-01`,
        pm_time_end: `${year}-${month}-${dayjs().endOf("month").format("DD")}`,
        pm_id_com: com_id,
      });

      if (res?.data) {
        setListData(res?.phat_muon_info);
      }
    };

    getPmInfo();
  }, [year, month, reload]);

  useEffect(() => {
    const getListCa = async () => {
      const res = await GET("api/qlc/shift/list");
      // console.log(res)

      if (res?.result) {
        setListCa(res?.items);
      }
    };

    getListCa();
  }, []);

  return (
    <div>
      <Form form={form} initialValues={{ month: month, year: year }}>
        <Row>
          <Col sm={3} xs={1}></Col>
          <Col sm={21} xs={24}>
            <Row gutter={20} justify={"end"}>
              <Col
                lg={4}
                md={4}
                sm={5}
                xs={10}
                className={`${styles.button} ${styles.button2}`}
              >
                <Button size="large" onClick={() => setModalCaiDatDMVS(true)}>
                  <Image
                    src="/plus-w.png"
                    width={24}
                    height={24}
                    alt=""
                    style={{ marginRight: "10px" }}
                  ></Image>
                  Thêm mới
                </Button>
              </Col>
              <Col lg={6} md={7} sm={8} xs={24} className={styles.selects}>
                <Form.Item name={"year"}>
                  <Select
                    size="large"
                    placeholder="Chọn năm"
                    options={LIST_YEARS}
                    suffixIcon={<img src="/search-black.png"></img>}
                    onChange={(val) => setYear(val)}
                  ></Select>
                </Form.Item>
              </Col>
              <Col lg={6} md={7} sm={8} xs={24} className={styles.selects}>
                <Form.Item name={"month"}>
                  <Select
                    size="large"
                    placeholder="Chọn tháng"
                    options={LIST_MONTHS}
                    onChange={(val) => setMonth(val)}
                    suffixIcon={<img src="/search-black.png"></img>}
                  ></Select>
                </Form.Item>
              </Col>
              <Col
                lg={4}
                md={5}
                sm={6}
                xs={9}
                className={`${styles.button} ${styles.button1}`}
              >
                <Button size="large" onClick={() => setModalCaiDatDMVS(true)}>
                  <Image
                    src="/plus-w.png"
                    width={24}
                    height={24}
                    alt=""
                    style={{ marginRight: "10px" }}
                  ></Image>
                  Thêm mới
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>
      <div className={styles.text}>Danh sách mức phạt đi muộn về sớm</div>
      <div className={styles.table}>
        <TableCaiDatDiMuonVeSom
          data={listData}
          setModalChinhSua={setModalChinhSua}
          setModalXoa={setModalXoa}
          setSelectedRow={setSelectedRow}
          listShift={listCa}
        />
      </div>
      {ModalCaiDatDiMuonVeSom(
        modalCaiDatDMVS,
        setModalCaiDatDMVS,
        listData,
        setListData,
        listCa,
        reload,
        setReload
      )}
      {ModalUpDateCaiDatDiMuonVeSom(
        modalChinhSua,
        setModalChinhSua,
        selectedRow,
        reload,
        setReload,
        listCa
      )}
      {ModalXoaCaiDaiDMVS(
        modalXoa,
        setModalXoa,
        selectedRow,
        reload,
        setReload
      )}
    </div>
  );
}
