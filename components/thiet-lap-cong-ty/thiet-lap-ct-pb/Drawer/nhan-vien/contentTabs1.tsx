import { Descriptions } from "antd";

export default function ContentTabs1({ data }) {
    return (
        <div>
            <Descriptions
                labelStyle={{
                    width: "160px",
                }}
                column={1}
                items={data}
            />
        </div>
    );
}
