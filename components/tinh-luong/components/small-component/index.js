import styles from './index.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faE, faEye,faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
export function SignButton(props){
    return(
        <div className={styles.FirstLayout}>
            <div className={styles.SecondLayout} style={{height:props.height}}>
                <p> 
                    {props.title}
                </p>
            </div>
        </div>
    )
}
export function InputBox({title,placeholder,children}){
    return (
        <div className={styles.FirstLayoutInputBox}>
            <p>
                {title}
            </p>
           <div className={styles.BigPlaceHolder}>
            <input placeholder={placeholder} className={styles.placeholderInputBox}></input>
            {children}
           
           </div>
        </div>
    )
}
export function ChangingPassWord({title,placeholder,height1}){
    const [isHidden,setIsHidden] = useState(true)
    return (
        <div className={styles.FirstLayoutInputBox}>
            <p>
                {title}
            </p>
           <div className={styles.BigPlaceHolder} style={{height: height1}}>
            <input placeholder={placeholder} className={styles.placeholderInputBox} type={isHidden ? 'password' : 'text'}></input>
                <div className={styles.eye}>
                    <FontAwesomeIcon icon={isHidden ? faEyeSlash : faEye} onClick={()=> setIsHidden(!isHidden)} width={100}></FontAwesomeIcon>
                </div>
           
           </div>
        </div>
    )
}