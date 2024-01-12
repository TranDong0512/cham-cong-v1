import { useState } from "react";
import { Row, Col, Card, Button } from "antd";
import IndexSection from "@/components/home/index";
import styles from "../bodyFrame.module.css";
import Article from "@/components/home/article/article";
export default function BlogIndexPage() {
    const [showMore, setShowmore] = useState<boolean>(false);

    return (
        <Row gutter={[20, 20]} className={`bannerQLC ${styles.moreSection}`}>
            <Col lg={6} md={8} sm={8} xs={24}>
                <Card className={styles.cardArticleSection}>
                    <IndexSection
                        className={styles.idxSection}
                        setShowmore={setShowmore}
                    />
                </Card>
            </Col>
            <Col lg={18} md={16} sm={16} xs={24}>
                <Card className={styles.cardArticleSection}>
                    <Article
                        className={styles.articleSection}
                        showMore={showMore}
                        setShowmore={setShowmore}
                    />
                </Card>
                <div className={styles.btnWrapper}>
                    <Button
                        className={styles.moreBtn}
                        size="large"
                        onClick={() => setShowmore(!showMore)}
                    >
                        <p className={styles.text} style={{ fontSize: "18px" }}>Xem thêm</p>
                    </Button>
                </div>
            </Col>
        </Row>
    );
}
