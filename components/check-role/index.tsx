import { getCookie } from "cookies-next";
const COOKIE_KEY = "token_base365";
import jwtDecode from "jwt-decode";

export default function checkRoleAdmin() {
    const cookieData = getCookie(COOKIE_KEY)?.toString();
    if (cookieData) {
       
        let data: any = jwtDecode(cookieData);
        if (data?.data?.type === 1 || data?.data?.isAdmin) {
            return true;
        } else return false;
    } else return undefined;
}
