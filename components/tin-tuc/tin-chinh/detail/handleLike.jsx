import styles from './index.module.css'
import { SmileOutlined } from '@ant-design/icons'
import { useState, useEffect } from 'react'

const LikeButton = () => {
  const [showIcons, setShowIcons] = useState(false)

  const [likeCount, setLikeCount] = useState(0)
  const [showLikeCount, setShowLikeCount] = useState(false)
  const [showReplyDiv, setShowReplyDiv] = useState(false)

  const toggleReplyDiv = () => {
    setShowReplyDiv(!showReplyDiv)
  }

  const [isLiked, setIsLiked] = useState(false)
  const [likeIcon, setLikeIcon] = useState(
    'https://dev.timviec365.vn/images/img_comment/Ic_color_2.png'
  )
  const [likeText, setLikeText] = useState('Thích')
  const [likeTextColor, setLikeTextColor] = useState('#80889d')
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
      setLikeCount(1)
    } else {
      setLikeIcon(defaultIcon)
      setLikeText('Thích')
      setLikeTextColor('#474747')
      setIsLiked(false)
      setShowIcons(true)
      setLikeCount(0)
    }
    setShowLikeCount(true)
    setShowIcons(true)
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
  return (
    <div>
      <div className={styles.cm_cm_ev}>
        <div className={styles.cm_list_ev}>
          <div className={styles.span_like}>
            <span
              onMouseEnter={handleLikeHover}
              onMouseLeave={handleLikeLeave}
              onClick={handleLikeClick}>
              <span
                className={styles.cm_list_span}
                style={{ color: likeTextColor }}>
                {likeText} |
              </span>
              {showIcons && (
                <div
                  className={styles.show_ic1}
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
            <span onClick={toggleReplyDiv}>Phản hồi |</span>
            <span style={{ color: '#ff0029' }}>Xóa |</span>
            <span>4 giờ</span>
          </div>
          <span>
            {likeCount > 0 && (
              <span className={styles.item_like_ic_ic23}>
                <span>{likeCount}</span>
                <img alt={likeText} src={likeIcon} />
              </span>
            )}
          </span>
        </div>
      </div>
      {showReplyDiv && (
        <div className={styles.cm_input_input_reply_active}>
          <img
            className={styles.img_user}
            src={'https://timviec365.vn/images/user_no.png'}
            alt={'avt_user'}
          />
          <div className={styles.div_ip}>
            <textarea className={styles.ct_cm} placeholder={'Viết bình luận'} />
            <SmileOutlined className={styles.icon} />
            <img className={styles.img} src={'/camera.png'} alt={'camera'} />
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
      )}
    </div>
  )
}
export default LikeButton
