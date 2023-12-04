import Cookies from "js-cookie";

export default function Logout({ showLogout, setShowLogout }) {
  const no = () => {
    setShowLogout(false);
  };
  const yes = () => {
    Cookies.remove("token_base365");
    Cookies.remove("rf_token");
    Cookies.remove("role");
    Cookies.remove("phone");
    window.location.href = "/";
  };

  return (
    <>
      <div
        className="modal_share modal_share_four logout_ht"
        style={{ display: showLogout ? "block" : "none" }}
      >
        <div className="modal-content">
          <div className="info_modal">
            <div className="modal-header">
              <div className="header_ctn_share">
                <h4 className="ctn_share_h share_clr_tow tex_center cr_weight_bold">
                  Đăng xuất
                </h4>
              </div>
            </div>
            <div className="modal-body">
              <div className="ctn_body_modal">
                <div className="madal_form">
                  <div className="edit_share_form share_distance_big logout_ht_form">
                    <div className="titl_dele_nv">
                      <p className="share_fsize_tow share_clr_one tex_center log_tlt">
                        Bạn có muốn đăng xuất ra khỏi hệ thống?
                      </p>
                    </div>
                    <div className="form_butt_ht">
                      <div className="tow_butt_flex">
                        <button
                          type="button"
                          className="share_fsize_three cr_weight share_cursor share_clr_four share_bgr_tow huy_button"
                          onClick={no}
                        >
                          Hủy
                        </button>
                        <button
                          type="button"
                          className="share_clr_tow cr_weight share_cursor share_fsize_three share_bgr_one dongy_button logout_all"
                          onClick={yes}
                        >
                          Đồng ý
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
