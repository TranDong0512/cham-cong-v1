import React, { useState } from "react"
import styles from "./sidebar.module.css"
import { number } from "prop-types"
import Link from "next/link"

export interface SideBarProp {}

export default function Sidebar(props: SideBarProp) {
  const [activeButton, setActiveButton] = useState(null)

  const handleClick = (buttonIndex: number) => {
    // @ts-ignore
    setActiveButton(buttonIndex)
  }

  return (
    <div className={`${styles.sidebar}`}>
      <div className={`${styles.ic_box1}`}>
        <Link
          className={`${styles.button1} ${
            activeButton === 0 ? styles.clicked : ""
          }`}
          onClick={() => handleClick(0)}
          href="/"
        >
          <img src={"chat.png"} className={`${styles.img_1}`} alt="Index" />
        </Link>
        <Link
          className={`${styles.button1} ${
            activeButton === 1 ? styles.clicked : ""
          }`}
          onClick={() => handleClick(1)}
          href="/chat"
        >
          <img src={"contact.png"} className={`${styles.img_1}`} alt="Index" />
        </Link>
        <Link
          className={`${styles.button1} ${
            activeButton === 2 ? styles.clicked : ""
          }`}
          onClick={() => handleClick(2)}
          href="/posts"
        >
          <img
            src={"element-4.png"}
            className={`${styles.img_1}`}
            alt="Index"
          />
        </Link>
        <button
          className={`${styles.button1} ${
            activeButton === 3 ? styles.clicked : ""
          }`}
          onClick={() => handleClick(3)}
        >
          <img src={"phone.png"} className={`${styles.img_1}`} alt="Phone" />
        </button>
        <button
          className={`${styles.button1} ${
            activeButton === 4 ? styles.clicked : ""
          }`}
          onClick={() => handleClick(4)}
        >
          <img src={"bell.png"} className={`${styles.img_1}`} alt="Bell" />
        </button>
      </div>

      <div className={`${styles.ic_box2}`}>
        <button
          className={`${styles.button1} ${
            activeButton === 5 ? styles.clicked : ""
          }`}
          onClick={() => handleClick(5)}
        >
          <img src={"chat.png"} className={`${styles.img_1}`} alt="Index" />
        </button>
        <button
          className={`${styles.button1} ${
            activeButton === 6 ? styles.clicked : ""
          }`}
          onClick={() => handleClick(6)}
        >
          <img
            src={"contact.png"}
            className={`${styles.img_1}`}
            alt="Contact"
          />
        </button>
        <button
          className={`${styles.button1} ${
            activeButton === 7 ? styles.clicked : ""
          }`}
          onClick={() => handleClick(7)}
        >
          <img src={"chat.png"} className={`${styles.img_1}`} alt="Index" />
        </button>
        <button
          className={`${styles.button1} ${
            activeButton === 8 ? styles.clicked : ""
          }`}
          onClick={() => handleClick(8)}
        >
          <img
            src={"videoCall.png"}
            className={`${styles.img_1}`}
            alt="Phone"
          />
        </button>
        <button
          className={`${styles.button1} ${
            activeButton === 9 ? styles.clicked : ""
          }`}
          onClick={() => handleClick(9)}
        >
          <img src={"bell.png"} className={`${styles.img_1}`} alt="Bell" />
        </button>
      </div>
    </div>
  )
}
