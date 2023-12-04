import styles from "./paragrap.module.scss";
import { Image } from "antd";
export default function ParagraphBlog({ paragraph }) {
    return (
        <div className={styles.content}>
            {paragraph?.map((p, index) => {
                return (
                    <div key={index}>
                        <div className={styles.title}>
                            <div id={index + 1}>{p.h2}</div>
                        </div>
                        {p.children && p.children.length > 0 && (
                            <div className={styles.desc}>
                                {p.children.map((c, index) => (
                                    <div key={index}>
                                        <div className={styles.fl}>{c.p}</div>
                                        {c.img ? c.img : <></>}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
