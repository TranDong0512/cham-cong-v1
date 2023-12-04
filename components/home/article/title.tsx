import styles from "./title.module.scss";
export default function TilteBlog({ title }) {
    return <div className={styles.title}>{title}</div>;
}
