import { useEffect, useRef, useState, useCallback } from "react";
import { debounce, delay } from "lodash";
import {
    POST,
    getCompIdCS,
    getUserIdCS,
    updateFace3d,
} from "@/pages/api/BaseApi";
import "@tensorflow/tfjs-core";
import "@tensorflow/tfjs-converter";
import "@tensorflow/tfjs-backend-webgl";
import { useRouter } from "next/router";
import * as faceMesh from "@mediapipe/face_mesh";
import * as faceLandmarksDetection from "@tensorflow-models/face-landmarks-detection";
import { Button } from "antd";
import { CaretLeftOutlined } from "@ant-design/icons";
import Webcam from "react-webcam";
import styles from "@/components/cap-nhap-khuon-mat/index.module.css";
import findMax from "@/components/cap-nhap-khuon-mat/findMax";
import imageAngles from "../../components/cap-nhap-khuon-mat/directions";
import axios from "axios";
import convertToDictLock from "@/components/cap-nhap-khuon-mat/conver";
import StartBeforeRecord from "@/components/cap-nhap-khuon-mat/start";
import ModalSuccess from "@/components/cap-nhap-khuon-mat/modalSuccess";
import ModalError from "@/components/cap-nhap-khuon-mat/modalError";
import Loading from "@/components/cap-nhap-khuon-mat/loading";
import getCosineSimilarity from "./getCosineSimilarity";
import getLandmarksArray from "@/components/cap-nhap-khuon-mat/getLandMark";

import {
    titleRobots,
    contentRobots,
} from "@/components/cap-nhap-khuon-mat/title";
import StartCountdown from "./count-down";
import ModalWaringNotFace from "./modalWaringNotFace";
import ExportImg from "./resizeImg";
import instance from "../hooks/axios.config";

export default function UpdateFace() {
    const webcamRef = useRef<Webcam>(null);
    const canvas = useRef<HTMLCanvasElement>(null);
    const router = useRouter();
    const com_id = getCompIdCS();
    const user_id = getUserIdCS();
    const [arr, setArr] = useState([]);
    const [modelsLoadOk, setModelsLoadOk] = useState(true);
    const [shouldStartRecord, setShouldStartRecord] = useState(false);
    const [imgOkPositions, setImgOkPositions] = useState("");
    const [imgOkUrl, setImgOkUrl] = useState("/data/camera.svg");
    const [openShowModalSuccess, setOpenShowModalSuccess] = useState(false);
    const [openShowModalError, setOpenShowModalError] = useState(false);
    const [openShowModalWaring, setOpenShowModalWaring] = useState(false);
    const [startCountDown, setStartCountDown] = useState(false);
    const [listImgOk, setListImgOk] = useState([]);
    useEffect(() => {
        const checkHasCam = async () => {
            const devices = await navigator.mediaDevices.enumerateDevices();
            // filter on video inputs, and map to query object
            const queries = devices.filter(({ kind }) => kind === "videoinput");
            if (queries[0]?.deviceId === "") {
                window.alert(
                    "Không tìm thấy camera. Vui lòng cắm camera vào để chấm công"
                );
            }
        };
        checkHasCam();
    }, []);
    useEffect(() => {
        fetch("/data/listImg.json")
            .then((res) => res.json())
            .then((d) => {
                setArr(d);
            });
    }, []);
    const [update, setUpdate] = useState(false);
    const [robotTitle, setRobotTitle] = useState(titleRobots[0]);
    // const myWorker = new Worker("/js/worker.js");
    const [openStartBeforeRecord, setOpenStartBeforeRecord] = useState(true);
    const [hiddenStates, setHiddenStates] = useState(new Array(9).fill(false));

    // const [list, setList] = useState([]);
    let list = [];
    const [oneAction, setOneAction] = useState(true);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const unFollow = async () => {
            if (listImgOk.length > 0) {
                const value = {
                    company_id: com_id,
                    user_id: user_id,
                    images: convertToDictLock(listImgOk),
                };
                console.log(value);

                let fetcher = async () => {
                    return await updateFace3d(value);
                };
                try {
                    let data = await fetcher();
                    setLoading(false);
                    setOpenShowModalSuccess(true);
                    console.log(data);
                } catch (err) {
                    setLoading(false);
                    setOpenShowModalError(true);
                    console.log(err);
                }
            }
        };
        unFollow();
    }, [update]);

    const speech = async (name) => {
        const synth = window.speechSynthesis;
        const utterThis = new SpeechSynthesisUtterance(name);
        utterThis.lang = "vi-VN";
        utterThis.rate = 0.8;
        synth.speak(utterThis);
        // const data = await instance.post("api/qlc/ai/tts", {
        //     text: name,
        // });
        // let text = data.data.data.link;
        // console.log(text);
        // setAudio(text);
    };
    const img = new Image();
    img.crossOrigin = "Anonymous";
    const getFrameImg = async (detector) => {
        const imageSrc = webcamRef?.current?.getScreenshot();
        img.src = imageSrc;
        const face: any = await detector.estimateFaces(img);
        return {
            landmark: face,
            url: imageSrc,
        };
    };

    let imgArr = [];
    let pending = true;
    let directionsInit = [
        "front",
        "right",
        "downright",
        "down",
        "downleft",
        "left",
        "upleft",
        "up",
        "upright",
    ];
    let directions = [
        "front",
        "right",
        "downright",
        "down",
        "downleft",
        "left",
        "upleft",
        "up",
        "upright",
    ];
    let subDirInit = [
        "Thẳng",
        "Phải",
        "Dưới phải",
        "Dưới",
        "Dưới trái",
        "Trái",
        "Trên trái",
        "Trên",
        "Trên phải",
    ];
    let subDir = [
        "Thẳng",
        "Phải",
        "Dưới phải",
        "Dưới",
        "Dưới trái",
        "Trái",
        "Trên trái",
        "Trên",
        "Trên phải",
    ];

    let landmark_points_68 = [
        162, 234, 93, 58, 172, 136, 149, 148, 152, 377, 378, 365, 397, 288, 323,
        454, 389, 71, 63, 105, 66, 107, 336, 296, 334, 293, 301, 168, 197, 5, 4,
        75, 97, 2, 326, 305, 33, 160, 158, 133, 153, 144, 362, 385, 387, 263,
        373, 380,
    ];
    const [audio, setAudio] = useState();
    const runDetection = async () => {
        try {
            const model =
                faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh;
            const detectorConfig = {
                runtime: "mediapipe", // or 'tfjs'
                solutionPath: `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh@${faceMesh.VERSION}`,
                maxFaces: 1,
            } as any;
            // create detector
            const detector = await faceLandmarksDetection.createDetector(
                model,
                detectorConfig
            );
            // faceDetection = detector;
            return detector;
        } catch (err) {
            console.error(err);
        }
    };
    const getLandMark = async (img) => {
        const selectedLandmarks = landmark_points_68.map(
            (index) => img[0]?.keypoints[index]
        );
        return {
            points: selectedLandmarks,
            boundingBox: img[0].box,
        };
    };
    const checkSimilarity = async ({ landMarkArrPoint, currentDirection }) => {
        // let initDer = arr.filter((img) => img.position === currentDirection);
        let list = [];
        for (var i = 0; i < arr.length; i++) {
            const similarity = getCosineSimilarity(
                landMarkArrPoint,
                arr[i].arrayPoint
            );
            list.push(similarity);
        }
        return list;
    };
    // let isRunning = false;
    // let currentIndex = 0;
    // let shouldStop = false;
    let currentPos = 0;
    const checkDirections = async (detector) => {
        delay(async () => {
            try {
                // if (shouldStop) {
                //     isRunning = false;
                //     shouldStop = false;
                //     return;
                // }
                // isRunning = true;
                const img = await getFrameImg(detector);
                if (img.landmark.length > 0) {
                    setOpenShowModalWaring(false);

                    const currentDirection: string = directions[0];
                    let botContent = titleRobots;
                    const landMarkPosition = await getLandMark(img.landmark);

                    const landMarkArrPoint = await getLandmarksArray(
                        landMarkPosition.points,
                        landMarkPosition.boundingBox.xMax -
                            landMarkPosition.boundingBox.xMin,
                        landMarkPosition.boundingBox.yMax -
                            landMarkPosition.boundingBox.yMin
                    );
                    let listSimilarity = await checkSimilarity({
                        landMarkArrPoint,
                        currentDirection,
                    });

                    const imgSimilarity = await findMax(listSimilarity);

                    if (
                        imgSimilarity?.value !== undefined &&
                        imgSimilarity.direction !== undefined
                    ) {
                        let currentDer = imgArr.filter(
                            (img) => img.position === imgSimilarity.direction
                        );
                        if (currentDer.length < 5) {
                            let imgUrl = await ExportImg(
                                img,
                                landMarkPosition.boundingBox
                            );
                            imgArr.push({
                                img: imgUrl,
                                position: imgSimilarity.direction,
                            });
                        }
                        let okPosIndex = directionsInit.findIndex(
                            (img) => img === imgSimilarity.direction
                        );
                        if (currentDer.length === 5) {
                            setImgOkUrl(img.url);
                            pending = false;
                            let newHidden = hiddenStates;
                            newHidden[okPosIndex] = true;
                            setImgOkPositions(subDirInit[okPosIndex]);
                            setHiddenStates([...newHidden]);
                            setRobotTitle(botContent[okPosIndex]);
                            // await speech(
                            //     `Lấy hướng ${subDirInit[okPosIndex]} thành công, Hướng tiếp theo: ${subDir[0]}`
                            // );
                            let sub = subDir.filter(
                                (dir) => dir !== subDir[okPosIndex]
                            );
                            let newDirection = directions.filter(
                                (dir) => dir !== imgSimilarity.direction
                            );
                            subDir = sub;
                            directions = newDirection;
                            if (directions.length === 0) {
                                list.push(...imgArr);
                                setLoading(true);
                                setListImgOk(list);
                                setUpdate(true);
                                await speech(
                                    "Lấy ảnh thành công, vui lòng chờ trong giây lát"
                                );
                                return;
                            }
                        } else {
                            console.log("false");
                        }
                    } else {
                        console.log(`Hướng không phù hợp: ${currentDirection}`);
                        pending = true;
                    }
                    if (pending) {
                        checkDirections(detector);
                    } else {
                        delay(() => checkDirections(detector), 500);
                    }
                } else {
                    setOpenShowModalWaring(true);
                    delay(() => checkDirections(detector), 1000);
                }
            } catch (err) {
                console.error(err);
            }
        }, 50);
    };

    const startRecord = async () => {
        const detector = await runDetection();
        // setShouldStartRecord(false);
        // setStartCountDown(true);
        await checkDirections(detector);
    };

    return (
        <>
            <div className={styles.main}>
                <div className={styles.back} onClick={() => router.back()}>
                    <span>
                        <CaretLeftOutlined /> Trở về
                    </span>
                </div>
                {openStartBeforeRecord ? (
                    <StartBeforeRecord
                        modelsLoadOk={modelsLoadOk}
                        setShouldStartRecord={setShouldStartRecord}
                        setOpenStartBeforeRecord={setOpenStartBeforeRecord}
                    />
                ) : (
                    <></>
                )}

                <div className={styles.wrapper}>
                    <div className={styles.container}>
                        <div className={` ${styles.leftImg} ${styles.square}`}>
                            <img
                                src={imgOkUrl}
                                alt="face3D"
                                width={180}
                                height={180}
                                // style={{
                                //     transform: "rotateY(180deg)",
                                // }}
                            />
                            <div className={styles.square1}></div>
                            <div className={styles.square2}></div>
                            <div className={styles.square3}></div>
                            <div className={styles.square4}></div>
                            <div className={styles.img_position}>
                                {imgOkPositions}
                            </div>
                        </div>
                        <div className={styles.webcam_container}>
                            {imageAngles?.map((item, index) => (
                                <>
                                    {hiddenStates[index] ? (
                                        <>
                                            {item.direction.map((d) => (
                                                <div
                                                    key={d}
                                                    className={`rectangle_border-${d}`}
                                                />
                                            ))}
                                        </>
                                    ) : (
                                        <>
                                            {item.direction.map((d) => (
                                                <div
                                                    key={d}
                                                    className={`rectangle_init-${d}`}
                                                />
                                            ))}
                                        </>
                                    )}
                                </>
                            ))}
                            <div className="sphere">
                                {/* <canvas
                                    id="myCanvas"
                                    width="400"
                                    height="400"
                                    ref={canvas}
                                    className="line-face"
                                    style={{
                                        transform: "rotateY(180deg)",
                                    }}
                                ></canvas> */}

                                <Webcam
                                    audio={false}
                                    ref={webcamRef}
                                    width={640}
                                    height={480}
                                    mirrored={true}
                                    screenshotFormat="image/jpeg"
                                    videoConstraints={{
                                        facingMode: "user",
                                    }}
                                />
                                <div className="sphere_img">
                                    <img
                                        src="/data/hix.svg"
                                        style={{
                                            zIndex: "9000",
                                        }}
                                    />
                                </div>
                                {/* <div
                                className={`sphere_vertical_${coordinates}`}
                            ></div>
                            <div
                                className={`sphere_horizontal_${coordinates}`}
                            ></div> */}
                            </div>
                        </div>
                        <div className={styles.rightImg}>
                            <div className={styles.comment_box}>
                                {robotTitle?.title}
                            </div>
                            <img
                                src={robotTitle?.url}
                                alt="face3D"
                                width={200}
                            />
                        </div>
                    </div>
                </div>
                <div
                    style={{
                        position: "absolute",
                        bottom: "20px",
                        zIndex: "999",
                    }}
                >
                    {shouldStartRecord ? (
                        <>
                            <Button size="large" onClick={startRecord}>
                                <p
                                    style={{
                                        fontSize: "16px",
                                        fontWeight: "bold",
                                        padding: "0 16px",
                                    }}
                                >
                                    Cập nhật
                                </p>
                            </Button>
                        </>
                    ) : (
                        <>
                            {oneAction ? (
                                <div>
                                    <Button
                                        block
                                        size="large"
                                        type="primary"
                                        onClick={() => {
                                            router.back();
                                        }}
                                    >
                                        <span
                                            style={{
                                                color: "#fff",
                                                minWidth: "120px",
                                                padding: "0 16px",
                                            }}
                                        >
                                            Huỷ
                                        </span>
                                    </Button>
                                </div>
                            ) : (
                                <></>
                            )}
                        </>
                    )}
                </div>
                {listImgOk?.map((img) => (
                    <div>
                        <img src={img.img} />
                    </div>
                ))}
                {loading ? <Loading /> : <></>}
                <audio src={audio} />
                <ModalSuccess
                    open={openShowModalSuccess}
                    close={() => {
                        setOpenShowModalSuccess(false);
                        router.back();
                    }}
                />
                <ModalWaringNotFace
                    open={openShowModalWaring}
                    close={() => {
                        setTimeout(() => {
                            setOpenShowModalWaring(false);
                        }, 1000);
                    }}
                />
                <ModalError
                    open={openShowModalError}
                    close={() => setOpenShowModalError(false)}
                />
                <StartCountdown start={startCountDown} />
            </div>
        </>
    );
}
