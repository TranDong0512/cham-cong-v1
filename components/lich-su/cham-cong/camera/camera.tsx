import { Button, Card, Col, Popover, Row,List, Avatar } from "antd"
import React, { useState, useEffect, useRef } from "react"
import styles from './camera.module.css'
export const Camera:  React.FC = () =>{
    const [isWebcamOpen, setWebcamOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
    const [giaodien, setGiaoDien] = useState(true)
  useEffect(() => {
    if (isWebcamOpen) {
      openWebcam();
    } else {
      closeWebcam();
    }
  }, [isWebcamOpen]);

  const openWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.log("Error accessing webcam: ", error);
    }
  };

  const closeWebcam = () => {
    if (videoRef.current) {
      const stream = videoRef.current.srcObject as MediaStream;
      if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
      }
    }
  };
    return(
    <div className={styles.khung}>
        {giaodien? (
            <div style={{width:'100%'}}>
                <div className={styles.anh}>
                <Avatar src='/camera.png'/>
                </div>
                <div className={styles.thongbao}>
                    <p className={styles.text}>Vui lòng hướng khuôn mặt theo khung trên màn hình, nhìn thẳng và xoay nhẹ sang 2 bên để nhận được kết quả tốt nhất</p>
                </div>
                <div className={styles.khungbutton}>
                    <button className={styles.button}  onClick={() => {setWebcamOpen(!isWebcamOpen), setGiaoDien(false)}}>
                        <p className={styles.textbutton}>Bắt đầu</p>
                    </button>
                </div>
                </div>
        ):(<></>)}
        {isWebcamOpen && (
        <div className={styles.webcamContainer}>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className={styles.webcam}
          />
          <div style={{color:'red',height:'10px',width:'10px'}}>aa</div>
        </div>
      )}
      </div>
    )
}