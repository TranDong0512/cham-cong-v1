import { Button, Image, Modal, Typography } from "antd";
const { Text } = Typography;
export default function PopupBackup({ open, close, user, company, onOK }) {
    return (
        <Modal
            open={open}
            wrapClassName="CustomerModal"
            footer={false}
            onCancel={close}
        >
            <div className="p-30 flex flex-center flex-align-center">
                <div className="text-align-center">
                    <Image src="/gh_ip/why.svg" preview={false} alt="xxx" />
                    <div className="my-24">
                        <Text>
                            Bạn muốn khôi phục cài đặt{" "}
                            <Text
                                style={{
                                    fontWeight: "bold",
                                }}
                            >
                                {user}{" "}
                            </Text>{" "}
                            của{" "}
                            <Text
                                style={{
                                    fontWeight: "bold",
                                }}
                            >
                                {company}
                            </Text>{" "}
                            ?
                        </Text>
                    </div>
                    <div className="flex mt-16 flex-center">
                        <div className="max-w-140 w-100 mx-10">
                            <Button block size="large" onClick={close}>
                                Huỷ
                            </Button>
                        </div>
                        <div className="max-w-140 w-100 mx-10">
                            <Button
                                style={{
                                    backgroundColor: "#FF7A00",
                                    color: "#fff",
                                }}
                                block
                                size="large"
                                onClick={onOK}
                            >
                                Khôi phục
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
}
