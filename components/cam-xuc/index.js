import React from 'react';
import styles from './cx.module.scss';
import Image from 'next/image';
const CauHinh = () => {
  return (
    <>
      <div className={styles.status}>
        <div className={styles.status_top}>
          <div className={styles.status_text}>
            {`Nhân viên chấm công sẽ có 7 loại cảm xúc, bao gồm: tức giận, ghê sợ,lo sợ, buồn bã, bình thường, vui vẻ, ngạc nhiên, tổng 7 loại được được bạn định nghĩa bằng câu thoại bên dưới:`}
          </div>
          <div className={styles.khoi_button_add}>
            <div className={styles.status_button}>
              <Image src="/plus_circle.png" height={20} width={20} alt="" />
              <div className={styles.status_button_text}>Thêm thang điểm</div>
            </div>
          </div>
        </div>
        <div className={styles.status_form}>
          <div className={styles.khoi_form}>
            <div className={styles.khoi_flex}>
              <div className={styles.form_left}>
                <div className={styles.khoi_label}>
                  <div className={styles.left_text}>Thang điểm cảm xúc 1</div>
                  <div className={styles.khoi_button_dele}>
                    <Image src="/img/Xoa.png" height={20} width={20} alt="" />
                  </div>
                </div>
                <div className={styles.khoi_form_con}>
                  <div className={styles.khoi_form_con_top}>
                    <div className={styles.khoi_label_con}>
                      <div className={styles.label_con}>Điểm cảm xúc</div>
                    </div>
                    <div className={styles.khoi_input_con}>
                      <div className={styles.text_from}>Từ</div>
                      <input
                        type="text"
                        className={styles.text_number}
                        defaultValue={'0'}
                      />
                    </div>
                    <div className={styles.khoi_input_con}>
                      <div className={styles.text_from}>Đến</div>
                      <input
                        type="text"
                        className={styles.text_number}
                        defaultValue={'4,0'}
                      />
                    </div>
                  </div>
                  <div className={styles.khoi_form_con_bottom}>
                    <div className={styles.khoi_label_con}>
                      <div className={styles.label_con}>Nội dung hiển thị</div>
                    </div>
                    <div className={styles.khoi_input_con_2}>
                      <input
                        type="text"
                        placeholder="Tâm trạng của bạn đang rất tệ"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.form_left}>
                <div className={styles.khoi_label}>
                  <div className={styles.left_text}>Thang điểm cảm xúc 2</div>
                  <div className={styles.khoi_button_dele}>
                    <Image src="/img/Xoa.png" height={20} width={20} alt="" />
                  </div>
                </div>
                <div className={styles.khoi_form_con}>
                  <div className={styles.khoi_form_con_top}>
                    <div className={styles.khoi_label_con}>
                      <div className={styles.label_con}>Điểm cảm xúc</div>
                    </div>
                    <div className={styles.khoi_input_con}>
                      <div className={styles.text_from}>Từ</div>
                      <input
                        type="text"
                        className={styles.text_number}
                        defaultValue={'4,1'}
                      />
                    </div>
                    <div className={styles.khoi_input_con}>
                      <div className={styles.text_from}>Đến</div>
                      <input
                        type="text"
                        className={styles.text_number}
                        defaultValue={'5,9'}
                      />
                    </div>
                  </div>
                  <div className={styles.khoi_form_con_bottom}>
                    <div className={styles.khoi_label_con}>
                      <div className={styles.label_con}>Nội dung hiển thị</div>
                    </div>
                    <div className={styles.khoi_input_con_2}>
                      <input type="text" placeholder="Cảm xúc bạn thế nào?" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.khoi_form}>
            <div className={styles.khoi_flex}>
              <div className={styles.form_left}>
                <div className={styles.khoi_label}>
                  <div className={styles.left_text}>Thang điểm cảm xúc 3</div>
                  <div className={styles.khoi_button_dele}>
                    <Image src="/img/Xoa.png" height={20} width={20} alt="" />
                  </div>
                </div>
                <div className={styles.khoi_form_con}>
                  <div className={styles.khoi_form_con_top}>
                    <div className={styles.khoi_label_con}>
                      <div className={styles.label_con}>Điểm cảm xúc</div>
                    </div>
                    <div className={styles.khoi_input_con}>
                      <div className={styles.text_from}>Từ</div>
                      <input
                        type="text"
                        className={styles.text_number}
                        defaultValue={'6,0'}
                      />
                    </div>
                    <div className={styles.khoi_input_con}>
                      <div className={styles.text_from}>Đến</div>
                      <input
                        type="text"
                        className={styles.text_number}
                        defaultValue={'7,9'}
                      />
                    </div>
                  </div>
                  <div className={styles.khoi_form_con_bottom}>
                    <div className={styles.khoi_label_con}>
                      <div className={styles.label_con}>Nội dung hiển thị</div>
                    </div>
                    <div className={styles.khoi_input_con_2}>
                      <input type="text" placeholder="Cảm xúc bạn thế nào?" />
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.form_left}>
                <div className={styles.khoi_label}>
                  <div className={styles.left_text}>Thang điểm cảm xúc 4</div>
                  <div className={styles.khoi_button_dele}>
                    <Image src="/img/Xoa.png" height={20} width={20} alt="" />
                  </div>
                </div>
                <div className={styles.khoi_form_con}>
                  <div className={styles.khoi_form_con_top}>
                    <div className={styles.khoi_label_con}>
                      <div className={styles.label_con}>Điểm cảm xúc</div>
                    </div>
                    <div className={styles.khoi_input_con}>
                      <div className={styles.text_from}>Từ</div>
                      <input
                        type="text"
                        className={styles.text_number}
                        defaultValue={'7,9'}
                      />
                    </div>
                    <div className={styles.khoi_input_con}>
                      <div className={styles.text_from}>Đến</div>
                      <input
                        type="text"
                        className={styles.text_number}
                        defaultValue={'10'}
                      />
                    </div>
                  </div>
                  <div className={styles.khoi_form_con_bottom}>
                    <div className={styles.khoi_label_con}>
                      <div className={styles.label_con}>Nội dung hiển thị</div>
                    </div>
                    <div className={styles.khoi_input_con_2}>
                      <input type="text" placeholder="Cảm xúc bạn thế nào?" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.khoi_button}>
            <div className={styles.btn_huy}>
              <div className={styles.btn_huy_text}>Hủy</div>
            </div>
            <div className={styles.btn_luu}>
              <div className={styles.btn_luu_text}>Lưu</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CauHinh;
