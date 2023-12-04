import { SuDungXeCong } from "@/components/tao-de-xuat/de-xuat-dang-ki-su-dung-xe-cong/su-dung-xe-cong";
import { Form } from "antd";
import { useState } from "react";
export default function DeXuatSuDungXeCong(){
  const [fileData, setFileData] = useState<Blob>();

    const [form] = Form.useForm()
    

    return <SuDungXeCong form={form} fileData={fileData} setFileData={setFileData} />
}