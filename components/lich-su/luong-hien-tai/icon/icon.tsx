import styles from './icon.module.css'


export function IconLuong(
    {
        actives,
        colorLeft,
        colorRight,
        colorCircleLeft,
        colorCircleRight,
        colorIcon,
        colorText,
        textTop,
        textBottom,
        id
    }){
    if(actives)
        return(
            <div className={styles.body} style={{background: `linear-gradient(90deg, ${colorLeft} 0%, ${colorRight} 100%)`}}>
                <div className={styles.icon}>
                <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="30" cy="30" r="27.5" fill={`${colorLeft}`} stroke={`url(#${id})`} stroke-width="5"/>
                    <path d="M24.5013 28.9168V33.2502M37.5013 26.7502V31.0835M36.418 21.3335C39.0707 21.3335 40.5055 21.7395 41.2194 22.0544C41.3145 22.0963 41.362 22.1173 41.4992 22.2482C41.5815 22.3267 41.7316 22.557 41.7702 22.6639C41.8346 22.8423 41.8346 22.9398 41.8346 23.1348V34.7789C41.8346 35.7634 41.8346 36.2557 41.687 36.5087C41.5368 36.7661 41.392 36.8857 41.1109 36.9846C40.8346 37.0819 40.2768 36.9747 39.1612 36.7603C38.3803 36.6103 37.4542 36.5002 36.418 36.5002C33.168 36.5002 29.918 38.6668 25.5846 38.6668C22.9319 38.6668 21.4971 38.2608 20.7832 37.9459C20.6881 37.904 20.6406 37.883 20.5034 37.7521C20.4211 37.6736 20.271 37.4433 20.2324 37.3364C20.168 37.158 20.168 37.0605 20.168 36.8655L20.168 25.2214C20.168 24.2369 20.168 23.7447 20.3156 23.4917C20.4658 23.2343 20.6106 23.1146 20.8917 23.0157C21.168 22.9185 21.7258 23.0256 22.8414 23.24C23.6223 23.39 24.5484 23.5002 25.5846 23.5002C28.8346 23.5002 32.0846 21.3335 36.418 21.3335ZM33.7096 30.0002C33.7096 31.4959 32.4971 32.7085 31.0013 32.7085C29.5055 32.7085 28.293 31.4959 28.293 30.0002C28.293 28.5044 29.5055 27.2918 31.0013 27.2918C32.4971 27.2918 33.7096 28.5044 33.7096 30.0002Z" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <defs>
                    <linearGradient id={`${id}`} x1="8.5" y1="9" x2="49.5" y2="49.5" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#fff"/>
                    <stop offset="1" stop-color="#fff"/>
                    </linearGradient>
                    </defs>
                </svg>
                </div>
                <div className={styles.text}>
                    <p className={styles.textTop}>{textTop}</p>
                    <p className={styles.textBottom}>{textBottom}</p>
                </div>
            </div>
        )
    return(
        <div className={`${styles.body} ${styles.bodyWhite}`}>
            <div className={styles.icon}>
            <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="30" cy="30" r="27.5" fill="white" stroke={`url(#${id})`} stroke-width="5"/>
                <path d="M24.5013 28.9168V33.2502M37.5013 26.7502V31.0835M36.418 21.3335C39.0707 21.3335 40.5055 21.7395 41.2194 22.0544C41.3145 22.0963 41.362 22.1173 41.4992 22.2482C41.5815 22.3267 41.7316 22.557 41.7702 22.6639C41.8346 22.8423 41.8346 22.9398 41.8346 23.1348V34.7789C41.8346 35.7634 41.8346 36.2557 41.687 36.5087C41.5368 36.7661 41.392 36.8857 41.1109 36.9846C40.8346 37.0819 40.2768 36.9747 39.1612 36.7603C38.3803 36.6103 37.4542 36.5002 36.418 36.5002C33.168 36.5002 29.918 38.6668 25.5846 38.6668C22.9319 38.6668 21.4971 38.2608 20.7832 37.9459C20.6881 37.904 20.6406 37.883 20.5034 37.7521C20.4211 37.6736 20.271 37.4433 20.2324 37.3364C20.168 37.158 20.168 37.0605 20.168 36.8655L20.168 25.2214C20.168 24.2369 20.168 23.7447 20.3156 23.4917C20.4658 23.2343 20.6106 23.1146 20.8917 23.0157C21.168 22.9185 21.7258 23.0256 22.8414 23.24C23.6223 23.39 24.5484 23.5002 25.5846 23.5002C28.8346 23.5002 32.0846 21.3335 36.418 21.3335ZM33.7096 30.0002C33.7096 31.4959 32.4971 32.7085 31.0013 32.7085C29.5055 32.7085 28.293 31.4959 28.293 30.0002C28.293 28.5044 29.5055 27.2918 31.0013 27.2918C32.4971 27.2918 33.7096 28.5044 33.7096 30.0002Z" stroke={`${colorIcon}`} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <defs>
                <linearGradient id={`${id}`} x1="8.5" y1="9" x2="49.5" y2="49.5" gradientUnits="userSpaceOnUse">
                <stop stop-color={`${colorCircleLeft}`}/>
                <stop offset="1" stop-color={`${colorCircleRight}`}/>
                </linearGradient>
                </defs>
            </svg>
            </div>
            <div className={styles.text}>
                <p className={`${styles.textTop} ${styles.textTopNormal}`} style={{color:`${colorText}`}}>{textTop}</p>
                <p className={`${styles.textBottom} ${styles.textBottomNormal}`}>{textBottom}</p>
            </div>
        </div>
    )
}