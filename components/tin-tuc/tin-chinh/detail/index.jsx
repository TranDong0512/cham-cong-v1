import styles from './index.module.css'
import { useState, useEffect } from 'react'
import { SmileOutlined } from '@ant-design/icons'
import LikeButton from '../detail/handleLike'
import Recent from '../detail/recent'
import { Button, Popover } from 'antd'
import { Modal } from 'antd'

const Detail = () => {
  const [isHovered, setIsHovered] = useState(false)
  const [hover, setHovered] = useState(false)
  const [showIcons, setShowIcons] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [likeIcon, setLikeIcon] = useState(
    'https://dev.timviec365.vn/images/img_comment/Ic_color_2.png'
  )
  const [likeText, setLikeText] = useState('Thích')
  const [likeTextColor, setLikeTextColor] = useState('#474747')
  const defaultIcon =
    'https://dev.timviec365.vn/images/img_comment/Ic_color_2.png'

  const iconData = [
    { src: '/icon_like.png', alt: 'Thích', textColor: '#4C5BD4' },
    { src: '/ic_tim.png', alt: 'Yêu thích', textColor: '#FE4B4B' },
    { src: '/icZ_wow.png', alt: 'Wow', textColor: '#FFA800' },
    { src: '/ic_yt.png', alt: 'Thương thương', textColor: '#FFA800' },
    { src: '/ic_pn.png', alt: 'Phẫn nộ', textColor: '#FE4B4B' },
    { src: '/ic_sad.png', alt: 'Buồn', textColor: '#FFA800' },
    { src: '/ic_haha.png', alt: 'Haha', textColor: '#FFA800' },
  ]
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalChatOpen, setModalChatOpen] = useState(false)

  const showModalChat = () => {
    setModalChatOpen(true)
  }
  const cancelModalChat = () => {
    setModalChatOpen(false)
  }

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const handleLikeHover = () => {
    if ((!isLiked && !showIcons) || (isLiked && !showIcons)) {
      setShowIcons(!showIcons)
    }
  }

  const handleLikeLeave = () => {
    if (isLiked && !showIcons) {
      setShowIcons(true)
    }
  }

  const handleIconClick = (newSrc, newAlt, textColor) => {
    setLikeIcon(newSrc)
    setLikeText(newAlt)
    setLikeTextColor(textColor)
    setIsLiked(true)
    setShowIcons(false)
  }

  const handleLikeClick = () => {
    if (!isLiked) {
      setIsLiked(true)
      setLikeIcon('/icon_like.png')
      setLikeText('Thích')
      setLikeTextColor('#4C5BD4')
      setShowIcons(false)
    } else {
      setLikeIcon(defaultIcon)
      setLikeText('Thích')
      setLikeTextColor('#474747')
      setIsLiked(false)
      setShowIcons(true)
    }
  }

  const handleDocumentClick = (event) => {
    if (!event.target.closest(`.${styles.like_event_active}`)) {
      setShowIcons(false)
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick)

    return () => {
      document.removeEventListener('click', handleDocumentClick)
    }
  }, [])

  const hdHover = () => {
    setHovered(!hover)
  }

  const handleHover = () => {
    setIsHovered(!isHovered)
  }
  return (
    <div className={styles.blog_detail_news_detail}>
      <div className={styles.summary}>
        <p>
          Công nghệ đã và đang thay đổi bộ mặt của đời sống doanh nghiệp. Giờ
          đây, thay vì sử dụng những thao tác thủ công, bộ phận quản lý có thể
          dễ dàng cậy nhờ đến công nghệ để chuyên nghiệp hóa các khâu trong quản
          lý nhân sự nhất là quản lý công cán, theo dõi được giờ giấc của các
          thành viên trong công ty và ưu việt hóa quá trình chấm công tính lương
          nhanh chóng. Một trong những đại diện tiêu biểu nhất của quá trình ứng
          dụng công nghệ vào quản trị doanh nghiệp hiệu quả chính là ứng dụng
          chấm công như máy chấm công hay các phần mềm chấm công trực tuyến.
          Trong bài viết dưới đây chúng ta hãy cùng giải mã ngay chấm công là gì
          và những lợi ích to lớn của những ứng dụng này trong đời sống doanh
          nghiệp nhé.
        </p>
      </div>
      <div className={styles.content_detail}>
        <h3>1. Khái niệm Chấm công là gì?</h3>
        <p>
          Chấm công là một việc làm quen thuộc cùng như quan trọng đối với mỗi
          cá nhân, doanh nghiệp, công ty, tổ chức. Việc chấm công như một cách
          điểm danh, giúp nhân viên điểm danh giờ đi làm. Bên cạnh đó, giúp cho
          bộ phận hành chính nhân sự, kế toán của doanh nghiệp có thể nắm rõ
          được số ngày, số công, giờ giấc đi làm của mỗi nhân viên trong doanh
          nghiệp đó. Từ việc chấm công này sẽ có thể căn cứ dễ dàng thực thi các
          quy định, nội quy của công ty, đồng thời là một căn cứ để dựa vào đó
          tính lương, thưởng hay phạt cho nhân viên.
        </p>
        <img src='/cham-cong1.png' alt={'cham cong'} />
        <h3>2. Sự ra đời của máy chấm công</h3>
        <p>
          Khi một doanh nghiệp ra đời và có nhu cầu thuê mượn lao động để phục
          vụ sản xuất ra thành phẩm giúp doanh nghiệp của họ trên thị trường,
          bất cứ một bậc quản lý nào cũng phải nghĩ ngay đến cơ chế để theo dõi
          kỷ luật, giờ giấc đến tính công lương, thưởng cho người lao động. Đây
          chính là lý do ra đời các loại máy chấm công. Ở giai đoạn đầu, các
          chuyên gia của làng máy chấm công đã trình làng những phiên bản máy
          chấm công cơ học trong lịch sử. Sau ấn phẩm máy chấm công cơ học đầu
          tiên của Wellard Bundy - một nhà khoa học người Mỹ ra đời vào năm
          1890, được mô tả với diện mạo tựa một chiếc đồng hồ lớn và phát phiếu
          cho từng công nhân trong công xưởng để ghi nhận công, hàng loạt những
          sản phẩm máy chấm công khác đã lần lượt ra đời và trở thành một công
          cụ không thể thiếu trong đời sống doanh nghiệp ở bất kỳ một lĩnh vực
          nào.Từ máy chấm công bằng cơ học như máy chấm dựa trên các đặc điểm
          nhân trắc học như vây tay hay các sổ chấm công hằng ngày đến các ứng
          dụng chấm công trên điện thoại đến phần mềm chấm công trên máy tính,
          iPad…mang nhiều lợi ích giúp cả bộ phận nhân viên và quản lý có thể
          tối ưu hóa quá trình chấm công và tính lương chính xác và nhanh chóng.
          Đặc biệt là tránh những sai sót không đánh có trong quá trình ghi nhận
          công và dễ dàng xử lý những vấn đề liên quan đến khiếu nại công cán
          nhờ vào tính năng xuất công tự động và ghi nhớ lịch sử đến bù công…
          Khi công nghệ trở thành ông hoàng chi phối mọi lĩnh vực của đời sống,
          những loại máy chấm công hiện đại cũng trở thành lựa chọn hàng tại các
          doanh nghiệp nhất là trong những công ty lớn có đông nhân lực và có
          trình quản lý nhân sự bài bản, khoa học. Chúng ta hãy cùng tham khảo
          tiếp những bài sau đây xem là có những loại máy chấm công nào nhé
        </p>
        <img src={'/chamcong.png'} alt={'Cham cong'} />
        <p className={styles.p}>Tải phần mềm app chấm công nhanh chóng</p>
        <div className={styles.box_see_2}>
          <a>Xem thêm</a>
        </div>
        <div className={styles.box_social_2}>
          <p>Chia sẻ :</p>
          <div className={styles.box_social_2_div}>
            <div className={styles.box_social_2_div2}>
              <div className={styles.box_social_2_div_ls}>
                <img
                  src={'/vector.png'}
                  alt={'like'}
                  style={{ width: '12px', height: '12px' }}
                />
                <p className={styles._p}>Like 0</p>
              </div>
            </div>
            <div className={styles.box_social_2_div2}>
              <div className={styles.box_social_2_div_ls}>
                <img
                  src={
                    'https://static.xx.fbcdn.net/rsrc.php/v3/yn/r/GzgedhmzSQa.png'
                  }
                  alt={'like'}
                  style={{ width: '12px', height: '12px' }}
                />
                <p className={styles._p}>Share</p>
              </div>
            </div>
            <div
              className={styles.box_social_2_div2}
              style={{ background: '#1D9BF0' }}>
              <div className={styles.box_social_2_div_ls}>
                <img
                  src={'/tw.png'}
                  alt={'like'}
                  style={{ width: '12px', height: '12px' }}
                />
                <p className={styles._p}>Tweet</p>
              </div>
            </div>
            <div className={styles.box_social_2_div2}>
              <div className={styles.box_social_2_div_ls}>
                <img
                  src={'/luu.png'}
                  alt={'like'}
                  style={{ width: '18px', height: '18px' }}
                />
                <p className={styles._p}>Lưu</p>
              </div>
            </div>
            <div
              className={styles.box_social_2_div2}
              style={{ background: '#0073B1', width: '100px' }}>
              <div className={styles.box_social_2_div_ls}>
                <p className={styles._p}>Share in VK</p>
              </div>
            </div>
            <div
              className={styles.box_social_2_div2}
              style={{ background: '#0073B1' }}>
              <div className={styles.box_social_2_div_ls}>
                <img
                  src={'/Group.png'}
                  alt={'like'}
                  style={{
                    width: '12px',
                    height: '12px',
                    background: '#ffffff',
                  }}
                />
                <p className={styles._p}>Share</p>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.comment}>
          <div className={styles.box_cm_head}>
            <span>Bình luận</span>
          </div>
          <div className={styles.box_cm_body}>
            <div className={styles.cm_like}>
              <div className={styles.frame_cm_like}>
                <div className={styles.box_items_like_ic} onClick={showModal}>
                  {isLiked && (
                    <span className={styles.cm_like_ic}>
                      <img
                        className={styles.item_like_ic_ic1}
                        src={likeIcon}
                        alt={'Thích'}
                      />
                    </span>
                  )}
                </div>
                <span className={styles.count_ic} data-like={'0'}></span>
              </div>
              <span
                className={styles.cm_sh_ic}
                onMouseEnter={hdHover}
                onMouseLeave={hdHover}>
                <b>•</b>0 chia sẻ
              </span>
              <span
                className={styles.cm_sh_ic}
                onMouseEnter={handleHover}
                onMouseLeave={handleHover}>
                <b>•</b>0 bình luận
              </span>
              <span className={styles.cm_view_ic}>0 lượt xem</span>
              <div className={`${styles.box_sh_ic} ${hover ? styles.vs : ''}`}>
                <div className={styles.frame}>
                  <p className={styles.sh_title}>Chia sẻ</p>
                </div>
              </div>
              <div
                className={`${styles.box_cm_ic} ${
                  isHovered ? styles.visible : ''
                }`}>
                <div className={styles.frame}>
                  <p className={styles.cm_title}>Bình luận</p>
                </div>
              </div>
            </div>
            <div className={styles.cm_event}>
              <div className={styles.cm_ev_div}>
                <span
                  className={styles.like_event_active}
                  onMouseEnter={handleLikeHover}
                  onMouseLeave={handleLikeLeave}
                  onClick={handleLikeClick}>
                  <img
                    className={styles.like_event_img}
                    src={likeIcon}
                    alt={likeText}
                  />
                  <span
                    className={styles.like_event_txt_liked}
                    style={{ color: likeTextColor }}>
                    {likeText}
                  </span>
                  {showIcons && (
                    <div
                      className={styles.show_ic}
                      onClick={(e) => e.stopPropagation()}>
                      {iconData.map((icon, index) => (
                        <span
                          className={styles.cm_like_ic1}
                          key={index}
                          onClick={() =>
                            handleIconClick(icon.src, icon.alt, icon.textColor)
                          }>
                          <img src={icon.src} alt={icon.alt} />
                        </span>
                      ))}
                    </div>
                  )}
                </span>
              </div>
              <div className={styles.cm_ev_div}>
                <span className={styles.comment_event}>
                  <img src={'/Messenger.png'} alt={'mess'} />
                  Bình luận
                </span>
              </div>
              <div className={styles.cm_ev_div}>
                <Popover
                  placement='bottom'
                  content={
                    <div>
                      <div
                        className={styles.box_share_items_share_items_chat365}>
                        <img src='/bi-plus.png' alt='oce' />
                        Chia sẻ lên trang cá nhân (Của bạn)
                      </div>
                      <div
                        className={styles.box_share_items_share_items_chat365}>
                        <img src='/share.png' alt='oce' />
                        Chia sẻ lên trang cá nhân (Bạn bè)
                      </div>
                      <div
                        className={styles.box_share_items_share_items_chat365}
                        onClick={showModalChat}>
                        <img src='/chat365_share.png' alt='oce' />
                        Gửi bằng Chat365
                      </div>
                      <div
                        className={styles.box_share_items_share_items_chat365}>
                        <img src='/people.png' alt='oce' />
                        Gửi lên Nhóm Chat365
                      </div>
                      <Popover
                        placement='rightBottom'
                        content={
                          <div className={styles.popover_padding}>
                            <div className={styles.box_share_items}>
                              <img src='/facebook.png' alt='facebook' />
                              Facebook
                            </div>
                            <div className={styles.box_share_items}>
                              <img src='/zalo.png' alt='facebook' />
                              Zalo
                            </div>
                            <div className={styles.box_share_items}>
                              <img src='/pinterest.png' alt='facebook' />
                              Pinterest
                            </div>
                            <div className={styles.box_share_items}>
                              <img src='/twitter.png' alt='facebook' />
                              Twitter
                            </div>
                            <div className={styles.box_share_items}>
                              <img src='/vkontakte.png' alt='facebook' />
                              Vkontakte
                            </div>
                            <div className={styles.box_share_items}>
                              <img src='/linked_in.png' alt='facebook' />
                              Linked In
                            </div>
                          </div>
                        }
                        trigger='click'
                        arrow={{ pointAtCenter: false }}>
                        <div
                          className={
                            styles.box_share_items_share_items_chat365
                          }>
                          <img src='/lucide_list-plus.png' alt='oce' />
                          Khác
                        </div>
                      </Popover>
                    </div>
                  }
                  trigger='click'
                  arrow={{ pointAtCenter: true }}>
                  <span className={styles.comment_event_share}>
                    <img src={'/share.png'} alt={'share'} />
                    Chia sẻ
                  </span>
                </Popover>
              </div>
            </div>
            <div className={styles.order_cm}>
              <select className={styles.new_old}>
                <option value={'1'} selected>
                  Mới nhất
                </option>
                <option value={'2'} selected>
                  Cũ nhất
                </option>
              </select>
              <div className={styles.cm_input_input_comment}>
                <img
                  className={styles.img_user}
                  src={'https://timviec365.vn/images/user_no.png'}
                  alt={'avt_user'}
                />
                <div className={styles.div_ip}>
                  <textarea
                    className={styles.ct_cm}
                    placeholder={'Viết bình luận'}
                  />
                  <SmileOutlined className={styles.icon} />
                  <img
                    className={styles.img}
                    src={'/camera.png'}
                    alt={'camera'}
                  />
                  <input
                    className={styles.input}
                    id={'secleimg'}
                    name={'listing'}
                    onChange={'preview_image(event, this)'}
                    type={'file'}
                  />
                  <div className={styles.div_div}></div>
                </div>
              </div>
            </div>
            <div className={styles.cm_list}>
              <div className={styles.cm_content_cm}>
                <div className={styles.cmt}>
                  <img
                    className={styles.ava_cm}
                    src={'https://timviec365.vn/images/user_no.png'}
                    alt={'avt'}
                  />
                  <div className={styles.cm_cm_ct}>
                    <p className={styles.cm_content_user}>Free</p>
                    <p className={styles.cm_nd}>ádsjadasjd</p>
                  </div>
                </div>
                <LikeButton />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Recent />

      {/* modal like */}
      <Modal
        className={`modal_like ${styles.modal_like}`}
        footer={false}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}>
        <div>
          <div className={styles.box_header}>
            <div className={styles.title}>
              <span className={styles.items_ic}>Tất cả</span>
              <span className={styles.items_ic_ic}>
                <img src='/icon_like.png' alt='like' />0
              </span>
              <span className={styles.items_ic_ic}>
                <img src='/ic_tim.png' alt='like' />0
              </span>
              <span className={styles.items_ic_ic}>
                <img src='/icZ_wow.png' alt='like' />0
              </span>
              <span className={styles.items_ic_ic}>
                <img src='/ic_yt.png' alt='like' />0
              </span>
              <span className={styles.items_ic_ic}>
                <img src='/ic_haha.png' alt='like' />0
              </span>
              <span className={styles.more}>
                Xem thêm
                <img src='/Polygon2.png' alt='icon' />
              </span>
            </div>
          </div>
          <div className={styles.item}>
            <div className={styles.item_u}>
              <img src='/facebook.png' alt='avt' />
              <span>HHP</span>
            </div>
            <div className={styles.btn_buttom_user}>
              <img src='/bi_chat.png' alt='bi chat' />
              Chat
            </div>
          </div>
          <div className={styles.item}>
            <div className={styles.item_u}>
              <img src='/facebook.png' alt='avt' />
              <span>HHP</span>
            </div>
            <div className={styles.btn_buttom_user_done}>
              <img src='/bi_chat.png' alt='bi chat' />
              Chat
            </div>
          </div>
          <div className={styles.item}>
            <div className={styles.item_u}>
              <img src='/facebook.png' alt='avt' />
              <span>HHP</span>
            </div>
            <div className={styles.btn_buttom_user_add}>
              <img src='/add_fr.png' alt='bi chat' />
              Kết bạn
            </div>
          </div>
          <div className={styles.item}>
            <div className={styles.item_u}>
              <img src='/facebook.png' alt='avt' />
              <span>HHP</span>
            </div>
            <div className={styles.btn_buttom_user_huy}>
              <img src='/huy_fr.png' alt='bi chat' />
              Hủy kết bạn
            </div>
          </div>
        </div>
      </Modal>
      {/* modal chat */}
      <Modal
        className={`modalchat ${styles.modal_chat}`}
        footer={false}
        title='Gửi bằng Chat365'
        open={modalChatOpen}
        onCancel={cancelModalChat}>
        <div>
          <div className={styles.box_header_cm_input}>
            <img
              className={styles.img_user}
              src={'https://timviec365.vn/images/user_no.png'}
              alt={'avt_user'}
            />
            <div>
              <textarea
                className={styles.ct_cm_textarea}
                placeholder={'Hãy nói gì về nội dung này'}
              />
            </div>
          </div>
          <div className={styles.frame_items}>
            <div className={styles.item}>
              <div className={styles.item_u}>
                <img src='/facebook.png' alt='avt' />
                <span>Nguyễn Thế Anh</span>
              </div>
              <div className={styles.btn_buttom_send_bg_send}>Đã gửi</div>
            </div>
            <div className={styles.item}>
              <div className={styles.item_u}>
                <img src='/facebook.png' alt='avt' />
                <span>HHP</span>
              </div>
              <div className={styles.btn_buttom_send_bg_send1}>Gửi</div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}
export default Detail
