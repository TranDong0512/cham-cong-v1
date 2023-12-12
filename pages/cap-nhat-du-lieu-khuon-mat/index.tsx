import BlockFaceUpdate from "@/components/cap-nhap-khuon-mat/chan-cap-nhat-khuan-mat";
import Cookies from "js-cookie";
import dynamic from "next/dynamic";
const DynamicUpdateFace = dynamic(
  () => import("@/components/cap-nhap-khuon-mat"),
  {
    ssr: false,
  }
);

export default function UpdateFace3d() {
  const com_id: any = Cookies.get("com_id");

  return <>{com_id != 57 ? <DynamicUpdateFace /> : <BlockFaceUpdate />}</>;
}
