import { Button, Image, Modal, Table, Input, Tag } from "antd";
import styles from "./styles.module.scss";
import { useEffect, useState } from "react";
import ModalAddQr from "./modalAdd";
import instance from "../hooks/axios.config";
import type { ColumnsType } from "antd/es/table";
export default function SetupQR() {
  const [update, setUpdate] = useState(false);
  const [InitId, setInitId] = useState();
  const [initName, setInitName] = useState();
  const handleStop = async (value) => {
    const fetcher = async () => {
      return await instance.post("/api/qlc/qrCode/update", {
        id: value,
        QRstatus: 2,
      });
    };
    try {
      const data = await fetcher();
      if (data?.data?.data?.result) {
        setUpdate(!update);
      }
    } catch (err) {
      console.error(err);
    }
  };
  const handleStart = async (value) => {
    const fetcher = async () => {
      return await instance.post("/api/qlc/qrCode/update", {
        id: value,
        QRstatus: 1,
      });
    };
    try {
      const data = await fetcher();
      if (data?.data?.data?.result) {
        setUpdate(!update);
      }
    } catch (err) {
      console.error(err);
    }
  };
  const handleDelete = async (value) => {
    const fetcher = async () => {
      return await instance.post("/api/qlc/qrCode/delete", {
        id: value,
      });
    };
    try {
      const data = await fetcher();
      if (data?.data?.data?.result) {
        setUpdate(!update);
      }
    } catch (err) {
      console.error(err);
    }
  };
  const columns: ColumnsType = [
    {
      title: "Stt",
      dataIndex: "stt",
    },
    {
      title: "Tên QR",
      dataIndex: "QRCodeName",
      align: "center",
    },
    {
      title: "Hình ảnh",
      dataIndex: "QRCodeUrl",
      align: "center",

      render: (data) => {
        return (
          <div>
            <Image src={data} alt="img" />
          </div>
        );
      },
    },
    {
      title: "Trạng thái",
      dataIndex: "",
      align: "center",

      render: (data) => {
        return (
          <div>
            {data?.QRstatus === 1 ? (
              <div
                style={{
                  color: "#1677ff",
                  cursor: "pointer",
                  marginBottom: '10px'
                }}
                onClick={() => handleStop(data?.id)}
              >
                <Tag style={{ fontSize: '14px' }} color="warning">Tắt hoạt động</Tag>
              </div>
            ) : (
              <div
                style={{
                  color: "#1677ff",
                  cursor: "pointer",
                  marginBottom: '10px'
                }}
                onClick={() => {
                  handleStart(data?.id);
                }}
              >
                <Tag style={{ fontSize: '14px' }} color="success">Hoạt động</Tag>
              </div>
            )}
          </div>
        );
      },
    },
    {
      title: "Hành động",
      dataIndex: "",
      width: 200,
      render: (data) => {
        return (
          <div
            style={{
              textAlign: "center",
            }}
          >
            <div
              style={{
                color: "#1677ff",
                cursor: "pointer",
                marginBottom: '10px'
              }}
              onClick={() => {
                setOpenModalAdd(true);
                setInitId(data?.id);
                setInitName(data?.QRCodeName);
              }}
            >
              <Tag style={{ fontSize: '14px' }} color="processing">Chỉnh sửa</Tag>
            </div>
            <div
              style={{
                color: "#1677ff",
                cursor: "pointer",
                marginBottom: '10px',

              }}
              onClick={() => {
                handleDelete(data?.id);
              }}
            >
              <Tag style={{ fontSize: '14px' }} color="error">Xóa</Tag>
            </div>
          </div>
        );
      },
    },
  ];
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const closeModalAdd = () => {
    setOpenModalAdd(false);
    setInitName(null);
    setInitId(null);
  };
  const [data, setData] = useState([]);
  useEffect(() => {
    const unFollow = async () => {
      const fetcher = async () => {
        return await instance.post("/api/qlc/qrCode/listAll");
      };
      try {
        const result = await fetcher();
        const datas = result?.data?.data?.data?.map((data, index) => ({
          ...data,
          stt: index + 1,
        }));
        setData(datas);
      } catch (err) {
        console.log(err);
      }
    };
    unFollow();
  }, [update]);
  return (
    <div>
      <div className={styles.btnGroup}>
        <div>
          <span className={styles.title}>Danh sách QR:</span>
        </div>
        <div>
          <Button
            size="large"
            type="primary"
            onClick={() => setOpenModalAdd(true)}
          >
            <p>Thêm mới QR</p>
          </Button>
        </div>
      </div>

      <div>
        <Table columns={columns} dataSource={data} />
      </div>
      {openModalAdd ? (
        <ModalAddQr
          iniId={InitId}
          name={initName}
          update={update}
          open={openModalAdd}
          setUpdate={setUpdate}
          close={closeModalAdd}
        />
      ) : (
        <></>
      )}
    </div>
  );
}
