import { Checkbox, Modal, List, Button, Form } from "antd";
import styles from "./modal-them-ca.module.css";
import { useState, useEffect } from "react";
import _, { divide } from "lodash";
import { GET, POST } from "@/pages/api/BaseApi";
import { useRouter } from "next/router";
import dayjs from "dayjs";

const TYPE_NOTFULL = "T2-T6";
const TYPE_MALFULL = "T2-T7";
const TYPE_FULL = "T2-CN";

function dates(current: any) {

  let month = new Array();
  let m = current.getMonth();
  current.setDate(current.getDate() - current.getDay());
  if (m == 0) {
    do {
      const date = new Date(current);
      date.setHours(7);
      month.push(date);
      current.setDate(current.getDate() + 1);
    } while (
      (current.getMonth() <= m || current.getDay() != 0) &&
      current.getMonth() !== 2
    );
    return month;
  } if (m == 1) {
    do {
      const date = new Date(current);
      date.setHours(7);
      month.push(date);
      current.setDate(current.getDate() + 1);
    } while (
      (current.getMonth() <= m || current.getDay() != 0) &&
      current.getMonth() !== 3
    );
    return month;
  } else {
    do {
      const date = new Date(current);
      date.setHours(7);
      month.push(date);
      current.setDate(current.getDate() + 1);
    } while (
      (current.getMonth() <= m || current.getDay() != 0) &&
      current.getMonth() + 1 !== 1
    );
    return month;
  }

}
function filterDate(item: any, type: number) {
  switch (type) {
    case 3:
      return true;
    case 2:
      return item.getDay() === 0 ? false : true;
    case 1:
      return item.getDay() === 0 || item.getDay() === 6 ? false : true;
  }
}

const formatDate = (date = new Date()) => {
  const year = date?.toLocaleString("default", { year: "numeric" });
  const month = date?.toLocaleString("default", { month: "2-digit" });
  const day = date?.toLocaleString("default", { day: "2-digit" });

  return [year, month, day].join("-");
};

export function ModalThemCa(
  open: boolean,
  setOpen: Function,
  setBack: Function,
  form: any,
  handleSubmitAddCy: Function,
  type: any,
  listShift: any,
  listShiftSelected: any,
  dateApply: any,
  setListShiftSelected: Function
) {
  const [applyMonth, setApplyMonth]: any = useState(dateApply?.substring(0, 7));
  const [current, setCurrent]: any = useState(new Date(dateApply));
  const [firstDate, setFirstDate]: any = useState(new Date(dateApply));
  const [month, setMonth]: any = useState(dates(new Date()));
  const [listCheck, setListCheck]: any = useState(listShiftSelected);
  const [openCheck, setOpenCheck] = useState(false);
  const [allCheck, setAllCheck]: any = useState({});
  // const [typeWeek, setTypeWeek] = useState<any>(form.getFieldValue('type_week'))
  const getDaysInMonth = (
    thang_ap_dung,
    listShiftSelected,
    weekType,
    type: "shift" | "hour" = "shift"
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

  useEffect(() => {
    setCurrent(new Date(dateApply));
    setFirstDate(new Date(dateApply));
    setMonth(dates(new Date(`${dateApply?.substring(0, 7)}-01`)));
    setOpenCheck(true);
  }, [dateApply]);

  const handleSubmit = () => {
    // handleSubmitAddCy()
    // change typical allCheck data from {"2023-06-02": [12,13]} to [{date: "2023-06-02", shift_id: "12,13"}]
    const details = Object.entries(allCheck)
      .filter((item) => new Date(item[0]) >= firstDate)
      .map((item: any) => {
        return {
          date: item[0],
          shift_id: item[1].join(","),
        };
      });

    form.setFieldValue("cy_detail", details);
    handleSubmitAddCy();
  };

  useEffect(() => {
    getDaysInMonth(dateApply, listShiftSelected, type);
  }, [listShiftSelected, type, dateApply]);

  useEffect(() => {
    setAllCheck({ ...allCheck, [formatDate(current)]: listCheck });
  }, [listCheck]);

  useEffect(() => {
    setListCheck(
      !(formatDate(current) in allCheck) ? [] : allCheck[formatDate(current)]
    );
    // console.log(allCheck[formatDate(current)])
  }, [current]);

  // console.log(allCheck)
  const Calender = (dates: any) => (
    <div className={styles.day}>
      <div>
        <List
          className={styles.list}
          header={
            <div className={styles.header}>
              <div className={styles.dayname}> CN</div>
              <div className={styles.dayname}>Thứ 2</div>
              <div className={styles.dayname}>Thứ 3</div>
              <div className={styles.dayname}>Thứ 4</div>
              <div className={styles.dayname}>Thứ 5</div>
              <div className={styles.dayname}>Thứ 6</div>
              <div className={styles.dayname}>Thứ 7</div>
            </div>
          }
          grid={{
            column: 7,
          }}
          dataSource={dates.map((d: any) => d)}
          renderItem={(item: any, index: number) => {
            const onClick = () => {
              setCurrent(item);
              setOpenCheck(true);
            };

            return (
              <List.Item key={index} style={{ padding: "10px 0" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <span
                    onClick={() => onClick()}
                    className={`${styles.cover} circleDate ${styles[
                      _.isEqual(
                        `${item?.getDate()} ${item?.getMonth()}`,
                        `${current?.getDate()} ${current?.getMonth()}`
                      )
                        ? "active"
                        : item >= firstDate &&
                          item.getMonth() ===
                          Number(dateApply?.substring(5, 7) - 1) &&
                          filterDate(item, type)
                          ? "choose"
                          : item.getMonth() ===
                            Number(dateApply?.substring(5, 7) - 1) &&
                            filterDate(item, type)
                            ? "overDay"
                            : item.getMonth() ===
                              Number(dateApply?.substring(5, 7) - 1)
                              ? "normal"
                              : "disable"
                    ]
                      }  ${styles[
                      allCheck[formatDate(item)] &&
                        allCheck[formatDate(item)].length > 0
                        ? "circleActive"
                        : "circleBase"
                      ]
                      } `}
                  >
                    <span className={styles.dateTxt}>{item.getDate()}</span>
                    <i className={styles.iconX}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="39"
                        height="30"
                        viewBox="0 0 39 26"
                        fill="none"
                      >
                        <path
                          d="M36.4727 2L2.09766 24"
                          stroke="#FF3221"
                          strokeWidth="4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M2.09766 2L36.4727 24"
                          stroke="#FF3221"
                          strokeWidth="4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </i>
                  </span>
                  <span
                    className={`${styles[
                      allCheck[formatDate(item)] &&
                        allCheck[formatDate(item)].length > 0
                        ? "count_base"
                        : "count_none"
                    ]
                      } ${styles[
                      _.isEqual(
                        `${item?.getDate()} ${item?.getMonth()}`,
                        `${current?.getDate()} ${current?.getMonth()}`
                      )
                        ? "count_red"
                        : "count_blue"
                      ]
                      }`}
                  >
                    {allCheck[formatDate(item)] &&
                      allCheck[formatDate(item)].length}
                  </span>
                </div>
              </List.Item>
            );
          }}
        />
      </div>
    </div>
  );

  const checkCa = () => {
    const onChange = async (key: string) => {
      listCheck.includes(key)
        ? setListCheck(listCheck?.filter((d: any) => d !== key))
        : setListCheck([...listCheck, key]);
    };
    const checked = (key: any): boolean => {
      return listCheck?.includes(key);
    };
    const checkComponent = (index: number, key: string, content: string) => {
      return (
        <li key={index}>
          <Checkbox
            key={key}
            className={styles.checkbox}
            onChange={() => onChange(key)}
            checked={checked(key)}
          ></Checkbox>
          {content}
        </li>
      );
    };
    return (
      <div style={{ marginTop: "20px" }}>
        <div style={{ marginBottom: "5px", color: "red" }}>
          Chọn vào ngày bên trên sau đó tích vào ca làm việc bên dưới để chọn ca
          làm việc tương ứng với ngày hôm đó.
        </div>
        <div style={{ marginBottom: "5px" }}>
          Ca làm việc trong ngày {current?.getDate()}-{current?.getMonth() + 1}-
          {current?.getFullYear()}
        </div>
        <div>
          <ul className={styles.listli}>
            {listShift &&
              listShift?.map((d: any, index: number) =>
                checkComponent(index, d?.shift_id, d?.shift_name)
              )}
          </ul>
        </div>
      </div>
    );
  };
  return (
    <Modal
      className="bannerQLC modalThemLLV"
      open={open}
      onCancel={() => {
        form.resetFields()
        setAllCheck({})
        setListShiftSelected([])
        setOpen(false)
      }}
      width={600}
      destroyOnClose={true}
      closable={false}
      cancelButtonProps={{ style: { display: "none" } }}
      okButtonProps={{ style: { display: "none" } }}
    >
      <Form.Item name={"cy_detail"}>
        <div style={{ padding: "20px" }}>
          <div style={{ fontSize: "16px", fontWeight: "500" }}>
            Tháng {applyMonth?.substring(5, 7)}/{applyMonth?.substring(0, 4)}
          </div>
          <div>{Calender(month)}</div>
          <div style={{ fontSize: "16px" }}>{openCheck && checkCa()}</div>
          <div
            style={{
              marginTop: "20px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button
              className={styles.button_white}
              onClick={() => {
                setOpen(false), setBack(true);
              }}
            >
              <img src="/quay_lai.png" alt="" />
              <p
                style={{
                  color: "#4C5BD4",
                  fontSize: "18px",
                  marginLeft: "10px",
                }}
              >
                Quay lại
              </p>
            </Button>
            <Button className={styles.button} onClick={handleSubmit}>
              <p style={{ color: "white", fontSize: "18px" }}>Tạo chu kì</p>
            </Button>
          </div>
        </div>
      </Form.Item>
    </Modal>
  );
}

export function ModalChinhSua_Them({
  data,
  form,
  setOpen,
  setDataTotal
}: {
  data: any;
  form: any;
  setOpen: Function;
  setDataTotal: Function;
}) {
  // const [current, setCurrent]: any = useState(data?.apply_month && dayjs(data?.apply_month).format('YYYY-MM-DD'));

  const [listCheck, setListCheck]: any = useState([]);
  const [openCheck, setOpenCheck] = useState(false);
  const [allCheck, setAllCheck]: any = useState({});
  const [listShift, setListShift]: any = useState([]);
  const [current, setCurrent]: any = useState(
    new Date(dayjs(data?.apply_month).format("YYYY-MM-DD"))
  );
  const [firstDate, setFirstDate]: any = useState(
    new Date(dayjs(data?.apply_month).format("YYYY-MM-DD"))
  );

  const [month, setMonth]: any = useState(
    dates(new Date(dayjs(data?.apply_month).format("YYYY-MM-01")))
  );
  const router = useRouter();
  useEffect(() => {
    GET("api/qlc/shift/list").then((res) => {
      if (res?.result === true) {
        setListShift(res?.items);
      }
    });
  }, []);

  useEffect(() => {
    if (data) {
      setCurrent(
        new Date(
          Number(data?.apply_month?.substring(0, 4)),
          Number(data?.apply_month?.substring(5, 7)) - 1
        ),
        1
      );

      let obj = {};
      data?.cy_detail?.map((item) => {
        obj = {
          ...obj,
          [item["date"]]:
            item["shift_id"] === "" ? [] : item["shift_id"].split(","),
        };
      });
      setAllCheck(obj);
    }
  }, [data]);

  let date = new Date(dayjs(data?.apply_month).format("YYYY-MM-DD"));

  useEffect(() => {
    setAllCheck({ ...allCheck, [formatDate(current)]: listCheck });
    setOpenCheck(true);
  }, []);

  useEffect(() => {
    setAllCheck({ ...allCheck, [formatDate(current)]: listCheck });
  }, [listCheck]);

  useEffect(() => {
    setListCheck(
      !allCheck?.hasOwnProperty(formatDate(current))
        ? []
        : allCheck[formatDate(current)]
    );
    // if (formatDate(current) in allCheck) {
    // }
  }, [current]);
  // if (data?.apply_month) {
  //   date = dayjs(data?.apply_month).format('YYYY-MM-DD')
  // }

  const Calender = (dates: any) => (
    <div className={styles.day}>
      <div>
        <List
          className={styles.list}
          header={
            <div className={styles.header}>
              <div className={styles.dayname}> CN</div>
              <div className={styles.dayname}>Thứ 2</div>
              <div className={styles.dayname}>Thứ 3</div>
              <div className={styles.dayname}>Thứ 4</div>
              <div className={styles.dayname}>Thứ 5</div>
              <div className={styles.dayname}>Thứ 6</div>
              <div className={styles.dayname}>Thứ 7</div>
            </div>
          }
          grid={{
            column: 7,
          }}
          dataSource={dates.map((d: any) => d)}
          renderItem={(item: any, index: number) => {
            const onClick = () => {
              setCurrent(item);
              setOpenCheck(true);
            };
            return (
              <List.Item key={index} style={{ padding: "10px 0" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <span
                    onClick={() => onClick()}
                    className={`${styles.cover} circleDate ${styles[
                      _.isEqual(
                        `${item?.getDate()} ${item?.getMonth()}`,
                        `${current?.getDate()} ${current?.getMonth()}`
                      )
                        ? "active"
                        : item >= firstDate &&
                          item.getMonth() ===
                          Number(data?.apply_month?.substring(5, 7) - 1)
                          ? "choose"
                          : item.getMonth() ===
                            Number(data?.apply_month?.substring(5, 7) - 1)
                            ? "overDay"
                            : item.getMonth() ===
                              Number(data?.apply_month?.substring(5, 7) - 1)
                              ? "normal"
                              : "disable"
                    ]
                      } `}
                  >
                    {item.getDate()}
                  </span>
                  <span
                    className={`${styles[
                      allCheck[formatDate(item)] &&
                        allCheck[formatDate(item)].length > 0
                        ? "count_base"
                        : "count_none"
                    ]
                      }`}
                  >
                    {allCheck[formatDate(item)] &&
                      allCheck[formatDate(item)].length}
                  </span>
                </div>
              </List.Item>
            );
          }}
        />
      </div>
    </div>
  );
  const checkCa = () => {
    const onChange = async (key: string) => {
      listCheck.includes(key)
        ? setListCheck(listCheck.filter((d: any) => d !== key))
        : setListCheck([...listCheck, key]);
    };
    const checked = (key: any): boolean => listCheck.includes(key);
    const checkComponent = (index: number, key: string, content: string) => {
      return (
        <li key={index}>
          <Checkbox
            key={key}
            className={styles.checkbox}
            onChange={() => onChange(key?.toString())}
            checked={checked(key?.toString())}
          ></Checkbox>
          {content}
        </li>
      );
    };
    return (
      <div style={{ marginTop: "20px" }}>
        <div style={{ marginBottom: "5px", color: "red" }}>
          Chọn vào ngày bên trên sau đó tích vào ca làm việc bên dưới để chọn ca
          làm việc tương ứng với ngày hôm đó.
        </div>
        <div style={{ marginBottom: "5px" }}>
          Ca làm việc trong ngày {current?.getDate()}-{current?.getMonth() + 1}-
          {current?.getFullYear()}
        </div>
        <div>
          <ul className={styles.listli}>
            {listShift?.map((d: any, index: number) =>
              checkComponent(index, d?.shift_id, d?.shift_name)
            )}
          </ul>
        </div>
      </div>
    );
  };
  // let month = dates(date);

  const handleSubmit = () => {
    // change typical allCheck data from {"2023-06-02": [12,13]} to [{date: "2023-06-02", shift_id: "12,13"}]
    const details = Object.entries(allCheck)
      .filter(
        (item) =>
          new Date(item[0]).getMonth() + 1 ===
          Number(data?.apply_month?.substring(5, 7))
      )
      .map((item: any) => {
        return {
          date: item[0],
          shift_id: item[1].join(","),
        };
      });

    form.validateFields().then((value) => {
      POST("api/qlc/cycle/edit", {
        cy_id: data?.cy_id,
        cy_name: form.getFieldValue("cy_name"),
        apply_month: data?.apply_month,
        cy_detail: JSON.stringify(details),
      }).then((res) => {
        if (res?.result === true) {
          alert(res?.message);
          setDataTotal()
          setOpen(false);
          //router.reload();
        }
      });
    });
  };
  return (
    <div className="bannerQLC modalThemLLV" style={{ padding: "0 20px 20px" }}>
      <Form.Item name={"cy_name"}>
        <div style={{ fontSize: "16px", fontWeight: "500" }}>
          Tháng {data?.apply_month?.substring(5, 7)}/
          {data?.apply_month?.substring(0, 4)}
        </div>
      </Form.Item>
      <div>
        {Calender(
          dates(new Date(dayjs(data?.apply_month).format("YYYY-MM-01")))
        )}
      </div>
      <div style={{ fontSize: "16px" }}>{openCheck && checkCa()}</div>
      <div
        style={{
          marginTop: "20px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button
          style={{ backgroundColor: "#4C5BD4", width: "100%", height: "auto" }}
          onClick={handleSubmit}
        >
          <p className={styles.buttonTxt}>Lưu lại</p>
        </Button>
      </div>
    </div>
  );
}
