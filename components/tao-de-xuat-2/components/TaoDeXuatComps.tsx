import { Button, Card, DatePicker, Form, Input, Select } from "antd";
import styles from "./TaoDeXuatComps.module.css";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import _ from "lodash";

const BACK_ICON = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M15.6 2.66189L6.12626 12.1356L15.6 21.6094"
      stroke="white"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);
const PIN_ICON = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="15"
    height="16"
    viewBox="0 0 15 16"
    fill="none"
  >
    <g clip-path="url(#clip0_3014_188270)">
      <path
        d="M13.4 7.40608L7.65625 13.1498C6.9526 13.8535 5.99824 14.2488 5.00312 14.2488C4.00801 14.2488 3.05365 13.8535 2.35 13.1498C1.64635 12.4462 1.25104 11.4918 1.25104 10.4967C1.25104 9.50159 1.64635 8.54723 2.35 7.84358L8.09375 2.09983C8.56285 1.63073 9.19909 1.36719 9.8625 1.36719C10.5259 1.36719 11.1621 1.63073 11.6312 2.09983C12.1003 2.56893 12.3639 3.20517 12.3639 3.86858C12.3639 4.53199 12.1003 5.16823 11.6312 5.63733L5.88125 11.3811C5.6467 11.6156 5.32858 11.7474 4.99687 11.7474C4.66517 11.7474 4.34705 11.6156 4.1125 11.3811C3.87795 11.1465 3.74618 10.8284 3.74618 10.4967C3.74618 10.165 3.87795 9.84688 4.1125 9.61233L9.41875 4.31233"
        stroke="#666666"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_3014_188270">
        <rect
          width="15"
          height="15"
          fill="white"
          transform="translate(0 0.5)"
        />
      </clipPath>
    </defs>
  </svg>
);

const DROPDOWN_ICON = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="8"
    height="6"
    viewBox="0 0 8 6"
    fill="none"
  >
    <path
      d="M0.875 1.5L4 4.5L7.125 1.5"
      stroke="#666666"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

export const ADD_ICON = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="21"
    height="20"
    viewBox="0 0 21 20"
    fill="none"
  >
    <path
      d="M6.33398 10.0007L10.5007 10.0007M10.5007 10.0007L14.6673 10.0007M10.5007 10.0007V5.83398M10.5007 10.0007L10.5007 14.1673"
      stroke="#4C5BD4"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <circle
      cx="10.5"
      cy="10"
      r="7.5"
      stroke="#4C5BD4"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

export const DEL_ICON = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="25"
    height="24"
    viewBox="0 0 25 24"
    fill="none"
  >
    <g clip-path="url(#clip0_2489_206027)">
      <circle cx="12.5" cy="12" r="12" fill="#FF5B4D" />
      <path
        d="M7.5 7L17.5 17"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
      />
      <path
        d="M17.5 7L7.5 17"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_2489_206027">
        <rect width="24" height="24" fill="white" transform="translate(0.5)" />
      </clipPath>
    </defs>
  </svg>
);

const { TextArea } = Input;

export const TaoDeXuatWrapper = ({
  children,
  header,
  onCreateClicked,
}: {
  children: any;
  header: string;
  onCreateClicked: () => void;
}) => {
  const router = useRouter();

  return (
    <div>
      <div className={styles.main}>
        <div className={styles.header}>
          <div style={{ cursor: "pointer" }} onClick={() => router.back()}>
            <BACK_ICON />
          </div>
          <p className={styles.headerTxt}>{header}</p>
        </div>
        <div className={`taoDeXuatForm ${styles.wrapper}`}>{children}</div>
      </div>

      <div className={styles.btnGroup}>
        <Button
          className={styles.cancelBtn}
          size="large"
          onClick={() => router.back()}
        >
          <p className={styles.txt}>Hủy</p>
        </Button>
        <Button
          className={styles.createBtn}
          onClick={onCreateClicked}
          size="large"
        >
          <span className={styles.txt}>Tạo đề xuất</span>
        </Button>
      </div>
    </div>
  );
};

// input text
export const DxInputTxt = ({
  title,
  name,
  required,
  placeholder,
  disabled,
  type,
}: {
  title: string;
  name: string;
  required: boolean;
  placeholder: string;
  disabled: boolean;
  type?: string;
}) => {
  return (
    <Form.Item
      label={<p style={{ fontWeight: "600" }}>{title}</p>}
      labelCol={{ span: 24 }}
      name={name}
      rules={
        required
          ? [
              {
                required: true,
                message: "Trường này là bắt buộc",
              },
            ]
          : []
      }
    >
      <Input
        type={type || ""}
        placeholder={placeholder}
        size="large"
        style={{ width: "100%" }}
        disabled={disabled}
        className={styles.input}
      />
    </Form.Item>
  );
};

//select
export const DxSelect = ({
  title,
  name,
  required,
  placeholder,
  options,
  showSearch,
  isMulti,
  handleChange
}: {
  title: string;
  name: string;
  required: boolean;
  placeholder: string;
  options: any[];
  showSearch: boolean;
  isMulti: boolean;
  handleChange?: Function
}) => {
  return (
    <Form.Item
      label={<p style={{ fontWeight: "600" }}> {title}</p>}
      labelCol={{ span: 24 }}
      name={name}
      rules={
        required
          ? [
              {
                required: true,
                message: "Trường này là bắt buộc",
              },
            ]
          : []
      }
    >
      <Select
        optionFilterProp="label"
        options={options}
        placeholder={placeholder}
        showSearch={showSearch}
        style={{ width: "100%" }}
        size="large"
        mode={isMulti ? "tags" : undefined}
        suffixIcon={<DROPDOWN_ICON />}
        onChange={(value: any, option: any) => handleChange && handleChange(value, option)}
      />
    </Form.Item>
  );
};

//Date picker
export const DxDatePicker = ({
  title,
  name,
  required,
  placeholder,
}: {
  title: string;
  name: string;
  required: boolean;
  placeholder: string;
}) => {
  return (
    <Form.Item
      label={<p style={{ fontWeight: "600" }}>{title}</p>}
      labelCol={{ span: 24 }}
      name={name}
      rules={
        required
          ? [
              {
                required: true,
                message: "Trường này là bắt buộc",
              },
            ]
          : []
      }
    >
      <DatePicker
        style={{ width: "100%" }}
        size="large"
        placeholder={placeholder}
      />
    </Form.Item>
  );
};

// file input
export const DXFileInput = ({ setFileData, label = "Tài liệu đính kèm" }: { setFileData?: any, label?: string}) => {
  const inputFileRef = useRef<any>(null);
  const [listFile, setListFile] = useState<any>();
  // console.log(listFile);
  return (
    <div>
      <input
        type="file"
        multiple
        onChange={(e) => {
          const temp = e.target.files;

          // if (temp) {
          // const formData = new FormData()
          // formData.append('file', temp?.[0])
          // new Response(formData).text().then(console.log)

          setFileData(temp?.[0]);

          setListFile(e.target.files?.[0]?.name);
          // }
        }}
        style={{ display: "none" }}
        ref={inputFileRef}
      />
      <Form.Item
        label={<p>{label}</p>}
        labelCol={{ span: 24 }}
      >
        <div
          style={{
            width: "100%",
            border: "1px solid #d9d9d9",
            padding: "10px",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "40px",
          }}
          placeholder="Thêm tài liệu đính kèm"
          onClick={() => inputFileRef.current.click()}
        >
          {listFile ? (
            <div>
              <p>{listFile}</p>
            </div>
          ) : (
            <p style={{ color: "#d9d9d9 " }}>Nhập tài liệu đính kèm</p>
          )}
          <div style={{ display: "flex" }}>
            <PIN_ICON />
          </div>
        </div>
      </Form.Item>
    </div>
  );
};

//text area
export const DXTextArea = ({
  title,
  placeholder,
  name,
  required,
}: {
  title: string;
  placeholder: string;
  name: string;
  required: boolean;
}) => {
  return (
    <Form.Item
      name={name}
      label={<p style={{ fontWeight: "600" }}>{title}</p>}
      labelCol={{ span: 24 }}
      rules={
        required
          ? [
              {
                required: true,
                message: "Trường này là bắt buộc",
              },
            ]
          : []
      }
    >
      <TextArea rows={5} size="large" placeholder={placeholder} />
    </Form.Item>
  );
};

//input money
export const DXInputMoney = ({
  title,
  name,
  placeholder,
  required,
}: {
  title: string;
  name: string;
  placeholder: string;
  required: boolean;
}) => {
  return (
    <Form.Item
      name={name}
      label={<p style={{ fontWeight: "600" }}>{title}</p>}
      labelCol={{ span: 24 }}
      rules={
        required
          ? [
              {
                required: true,
                message: "Trường này là bắt buộc",
              },
            ]
          : []
      }
    >
      <Input
        type="number"
        suffix="VNĐ"
        size="large"
        style={{ width: "100%" }}
        placeholder={placeholder}
      />
    </Form.Item>
  );
};

