import styles from "./modal.module.css"
import { Button, Modal } from "antd"
import Image from "next/image"
import { useRouter } from "next/router"
export function modalNhapLaiMat(
  open: boolean,
  setOpen: Function,
  context: string,
  router: any
) {
  const handleClickOk = () => {
    setOpen(false)
    router?.replace(router.asPath)
  }

  return (
    <Modal
      open={open}
      onCancel={() => setOpen(false)}
      width={450}
      closable={false}
      cancelButtonProps={{ style: { display: "none" } }}
      okButtonProps={{ style: { display: "none" } }}
    >
      <div className={styles.header}></div>
      <p className={styles.body}>{context}</p>
      <div className={styles.footer}>
        <Button className={styles.button} onClick={handleClickOk}>
          <p className={styles.text}>OK</p>
        </Button>
      </div>
    </Modal>
  )
}
