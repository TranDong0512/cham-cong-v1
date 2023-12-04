import dynamic from "next/dynamic";
const DynamicUpdateFace = dynamic(
    () => import("@/components/cap-nhap-khuon-mat"),
    {
        ssr: false,
    }
);
export default function UpdateFace3d() {
    return <DynamicUpdateFace />;
}
