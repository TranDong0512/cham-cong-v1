import { ModalWrapper, ModalWrapper2 } from "@/components/modal/ModalWrapper";
import { POST_VT } from "@/pages/api/BaseApi";
import Image from "next/image";
import { useRouter } from "next/router";

export const DuyetModal = ({
  open,
  setOpen,
  selectedKeys,
  setSelectedKeys,
  selectedRow,
}: {
  open: boolean;
  setOpen: any;
  selectedKeys: any;
  setSelectedKeys: any;
  selectedRow: any;
}) => {
  const children = (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Image alt="/" src={"/big-x.png"} width={50} height={50} />
      <p style={{ marginTop: "20px", textAlign: "center" }}>
        Việc duyệt sẽ ảnh hưởng đến mức lương của nhân viên, bạn vẫn muốn tiếp
        tục ?
      </p>
    </div>
  );

  const onCancel = () => {
    setSelectedKeys(
      selectedKeys?.filter((item: any) => item !== selectedRow?.id)
    );
    setOpen(false);
  };

  const handleSubmit = () => {
    POST_VT("api/vanthu/editdx/duyet_de_xuat_tam_ung", {
      id_user_duyet: 5,
      id_user_theo_doi: 5,
      _id: selectedRow?.idDeXuat,
    }).then((res) => {
      if (res?.message === "Đã duyệt đề xuất") {
        setOpen(false);
      }
    });
    // console.log(selectedRow)
  };

  return ModalWrapper2(
    open,
    setOpen,
    children,
    600,
    "",
    "Đồng ý",
    handleSubmit,
    false,
    true,
    false,
    true,
    true,
    onCancel
  );
};

export const HuyDuyetModal = ({
  open,
  setOpen,
  selectedKeys,
  setSelectedKeys,
  selectedRow,
}: {
  open: boolean;
  setOpen: any;
  selectedKeys: any;
  setSelectedKeys: any;
  selectedRow: any;
}) => {
  const children = (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Image alt="/" src={"/big-x.png"} width={50} height={50} />
      <p style={{ marginTop: "20px" }}>Bạn có chắc chắn muốn bỏ duyệt không</p>
    </div>
  );

  const onCancel = () => {
    setSelectedKeys([...selectedKeys, selectedRow?.id]);
    setOpen(false);
  };

  return ModalWrapper2(
    open,
    setOpen,
    children,
    600,
    "",
    "Đồng ý",
    () => setOpen(false),
    false,
    true,
    false,
    true,
    true,
    onCancel
  );
};

export const ConfirmTamUngModal = ({
  open,
  setOpen,
  setTamUngState,
  dxDetail,
}: {
  open: boolean;
  setOpen: any;
  setTamUngState: (state: boolean) => void;
  dxDetail: any;
}) => {
  const router = useRouter();
  const id = router?.query?.id || null;

  const handleConfirm = () => {
    id &&
      POST_VT("api/vanthu/editdx/duyet_de_xuat_tam_ung", {
        id_user_duyet: dxDetail?.lanh_dao_duyet?.[0]?.idQLC,
        id_user_theo_doi: dxDetail?.lanh_dao_duyet?.[0]?.idQLC,
        _id: id,
      }).then((res) => {
        if (res?.message === "Đã duyệt đề xuất") {
          setOpen(false);
          setTamUngState(true);
        }
      });
  };

  return ModalWrapper(
    open,
    setOpen,
    <p style={{ textAlign: "center" }}>
      Bạn đã xác nhận tạm ứng tiền của nhân viên
    </p>,
    450,
    "",
    "OK",
    handleConfirm,
    false,
    true,
    false,
    false,
    true
  );
};

export const ConfirmHuyDuyet = ({
  open,
  setOpen,
  setTamUngState,
  dxDetail,
}: {
  open: boolean;
  setOpen: any;
  setTamUngState: (state: boolean) => void;
  dxDetail: any;
}) => {
  const handleConfirm = () => {
    setOpen(false);
    setTamUngState(false);
  };

  return ModalWrapper(
    open,
    setOpen,
    <p style={{ textAlign: "center" }}>
      Bạn đã hủy tạm ứng tiền của nhân viên
    </p>,
    450,
    "",
    "OK",
    handleConfirm,
    false,
    true,
    false,
    false,
    true
  );
};
