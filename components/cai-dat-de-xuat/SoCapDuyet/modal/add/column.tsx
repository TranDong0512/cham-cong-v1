import type { ColumnsType } from "antd/es/table";
import { Image } from "antd";
interface DataType {
    key: string;
    stt: string;
    ep_id: string;
    userName: string;
    organizeDetailName: string;
    positionName: string;
    confirm_level: number;
    confirm_type: number;
    phone: string | null;
    avatarUser: string | null;
    email: string;
}
const columnsModal: ColumnsType<DataType> = [
    {
        title: "ID",
        dataIndex: "ep_id",
        key: "id",
        align: "center",
    },
    {
        title: "Họ và tên",
        key: "hoTen",
        align: "center",
        render: (name: string, record: DataType) => (
            <div className="flex flex-align-center">
                <div className="w-30px h-30px">
                    {record.avatarUser ? (
                        <div
                            style={{
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                lineHeight: "30px",
                            }}
                        >
                            record?.avatarUser
                        </div>
                    ) : (
                        <Image
                            src="/avt_365.png"
                            width="100%"
                            alt="img"
                            preview={false}
                        />
                    )}
                </div>
                <div className="ml-8">{record.userName}</div>
            </div>
        ),
    },
    {
        title: "Tổ chức",
        dataIndex: "organizeDetailName",
        key: "organizeDetailName",
        align: "center",
    },
    {
        title: "Vị trí",
        dataIndex: "positionName",
        key: "positionName",
        align: "center",
    },
];
export default columnsModal;
