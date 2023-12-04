import { Modal, Input, Select, Button, Form } from "antd";
import styles from "./modal-xoa.module.css";
import Image from "next/image";
import { POST_TL } from "@/pages/api/BaseApi";
import { useRouter } from "next/router";
export function ModalXoa(open: boolean, setOpen: Function, selectedRow: any) {
  const router = useRouter();

  const onConfirm = async () => {
    const res = await POST_TL("api/tinhluong/congty/delete_basic_salary", {
      sb_id: selectedRow?.sb_id,
    });
    // console.log(res)
    if (res?.message === "success") {
      // router.replace(router.asPath);
      router.reload();
    }
  };

  return (
    <Modal
      open={open}
      onCancel={() => setOpen(false)}
      width={360}
      closable={false}
      cancelButtonProps={{ style: { display: "none" } }}
      okButtonProps={{ style: { display: "none" } }}
    >
      <div className={styles.body}>
        <div className={styles.logo}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="50"
            viewBox="0 0 50 50"
            fill="none"
          >
            <g clip-path="url(#clip0_897_133047)">
              <circle cx="25" cy="25" r="25" fill="#FF5B4D" />
              <path
                d="M15 15L35 35"
                stroke="white"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <path
                d="M35 15L15 35"
                stroke="white"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <path
                d="M15 15L35 35"
                stroke="white"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <path
                d="M35 15L15 35"
                stroke="white"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_897_133047">
                <rect width="50" height="50" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>
        <div className={styles.title}>
          <p>Bạn có chắc chắn muốn xoá không</p>
        </div>
        <div className={styles.button}>
          <button className={styles.button1} onClick={() => setOpen(false)}>
            Huỷ
          </button>
          <button className={styles.button2} onClick={onConfirm}>
            Đồng ý
          </button>
        </div>
      </div>
    </Modal>
  );
}

export function ModalXoaCon(
  open: boolean,
  setOpen: Function,
  selectedRow: any
) {
  const router = useRouter();

  const onConfirm = async () => {
    const res = await POST_TL("api/tinhluong/congty/delete_contract", {
      con_id: selectedRow?.con_id,
      con_id_user: selectedRow?.con_id_user,
    });
    // console.log(res)
    if (res?.message === "success") {
      // router.replace(router.asPath)
      router.reload();
    }
  };

  return (
    <Modal
      open={open}
      onCancel={() => setOpen(false)}
      width={360}
      closable={false}
      cancelButtonProps={{ style: { display: "none" } }}
      okButtonProps={{ style: { display: "none" } }}
    >
      <div className={styles.body}>
        <div className={styles.logo}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="50"
            viewBox="0 0 50 50"
            fill="none"
          >
            <g clip-path="url(#clip0_897_133047)">
              <circle cx="25" cy="25" r="25" fill="#FF5B4D" />
              <path
                d="M15 15L35 35"
                stroke="white"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <path
                d="M35 15L15 35"
                stroke="white"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <path
                d="M15 15L35 35"
                stroke="white"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <path
                d="M35 15L15 35"
                stroke="white"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_897_133047">
                <rect width="50" height="50" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>
        <div className={styles.title}>
          <p>Bạn có chắc chắn muốn xoá không</p>
        </div>
        <div className={styles.button}>
          <button className={styles.button1} onClick={() => setOpen(false)}>
            Huỷ
          </button>
          <button className={styles.button2} onClick={onConfirm}>
            Đồng ý
          </button>
        </div>
      </div>
    </Modal>
  );
}
