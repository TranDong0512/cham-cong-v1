import { POST, getCompIdCS } from "@/pages/api/BaseApi";
import axios from "axios";
import { getCookie } from "cookies-next";
import Cookies from "js-cookie";
export const baseURL: any = process.env.NEXT_PUBLIC_BASE_URL;
// Read - show
export const fetchData = async (token: string, api: string, data?: any) => {
  try {
    const response = await axios.post(`${baseURL}${api}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response?.data;
  } catch (err) {
    console.error("Error fetching home data:", err);
  }
};
export const fetchDataHome = async (token: string, api: string) => {
  try {
    const response = await axios.get(`${baseURL}${api}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response?.data;
  } catch (err) {
    console.error("Error fetching home data:", err);
  }
};
/// Add - create - update
export const handleCreate = async (api: string, data: any) => {
  try {
    const token = Cookies.get("token_base365");
    const response = await axios.post(`${baseURL}${api}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status == 200) {
      alert("Thành công");
    }
    return response.status;
  } catch (error) {
    alert("Thất bại");
    console.log("Lỗi khi thêm ý kiêns:", error);
  }
};
// delete
export const handleDelete = async (api: string, data: any) => {
  try {
    const token = Cookies.get("token_base365");
    const response = await axios.post(`${baseURL}${api}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    alert("Thất bại");
    console.log("Lỗi khi xóa:", error);
  }
};
// Hàm lấy ra sổ văn bản chi tiết
export const fetchListSoVB = async (id_book: any) => {
  try {
    const token = Cookies.get("token_base365");
    const response = await fetchData(
      token,
      `api/vanthu/guiNhanCongVan/setting/getListSoVanBan`,
      { id_so_vb: id_book }
    );
    return response?.data?.so_vb?.name_book;
  } catch (error) {
    console.error("Error fetching user name:", error);
    return "";
  }
};

export const getSettingOrganize = async () => {
  const com_id = getCompIdCS();
  if (com_id) {
    const res = await POST("api/qlc/settingOrganize/listAll", {
      com_id: com_id,
    });

    if (res?.result) {
      return res?.data;
    } else {
      return [];
    }
  } else {
    return [];
  }
};

export const getOrganizeDetail = async () => {
  const com_id = getCompIdCS();

  if (com_id) {
    const res = await POST("api/qlc/organizeDetail/listAll", {
      com_id: com_id,
      // settingOrganizeId: settingOrganizeId,
    });

    if (res?.result) {
      return res?.data;
    } else {
      return [];
    }
  } else {
    return [];
  }
};
