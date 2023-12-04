import { Modal, Button } from "antd"

export const ModalXacNhan = (
    open:boolean,
    setOpen:Function,
    content:string
  )=>(
    <Modal
      open={open}
      onCancel={() => setOpen(false)}
      width={287}
      closable={false}
      cancelButtonProps={{ style: { display: "none" } }}
      okButtonProps={{ style: { display: "none" } }}
    >
    <div style={{padding:'20px',textAlign:'center'}}>
      <p style={{fontSize:'16px',marginBottom:'20px'}}>{content}</p>
      <Button style={{backgroundColor:'#4C5BD4',padding:'5px 20px',height:'auto'}} onClick={()=>setOpen(false)}>
        <p style={{fontSize:'18px',color:'white'}}>OK</p>
      </Button>
    </div>
    </Modal>
  )