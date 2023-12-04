import * as faceapi from 'face-api.js'
import _ from 'lodash'

export const handleVideoOnPlay = (canvasRef, videoRef, handleChangeScore) => {
  const video = document.getElementById('video')
  // console.log(video)

  const videoHeight = video.offsetHeight
  const videoWidth = video.offsetWidth
  canvasRef.current.innerHTML = faceapi.createCanvas(videoRef.current)
  // handleChangeScore(3)
  setInterval(async () => {
    if (canvasRef && canvasRef.current) {
      const displaySize = {
        width: videoWidth,
        height: videoHeight,
      }

      faceapi.matchDimensions(canvasRef.current, displaySize)
      const detections = await faceapi
        .detectAllFaces(video, new faceapi.SsdMobilenetv1Options())
        // .withFaceLandmarks()
        .withFaceExpressions()

      let resizedDetections = faceapi.resizeResults(detections, displaySize)
      // console.log(detections)
      canvasRef &&
        canvasRef.current &&
        canvasRef.current
          .getContext('2d', { willReadFrequently: true })
          .clearRect(0, 0, videoWidth, videoHeight)

      if (detections.length > 0) {
        detections.sort(function (a, b) {
          return b.detection.box.area - a.detection.box.area
        })
        const largestFace = detections[0]
        resizedDetections = faceapi.resizeResults(largestFace, displaySize)

        let totalScore = 0
        // Điểm được tính theo trọng số cảm xúc: tức giận-1 | ghê sợ-2 | lo sợ-3 | buồn-4 | bình thường-5 | ngạc nhiên-6 | vui vẻ-7
        totalScore += largestFace.expressions.angry * 1
        totalScore += largestFace.expressions.disgusted * 2
        totalScore += largestFace.expressions.fearful * 3
        totalScore += largestFace.expressions.sad * 4
        totalScore += largestFace.expressions.neutral * 5
        totalScore += largestFace.expressions.surprised * 6
        totalScore += largestFace.expressions.happy * 7
        
        if (totalScore > 0) {
          handleChangeScore(totalScore/7, largestFace)
        }
      }

      canvasRef &&
        canvasRef.current &&
        faceapi.draw.drawDetections(canvasRef.current, resizedDetections)
      // canvasRef &&
      //   canvasRef.current &&
      //   faceapi.draw.drawFaceLandmarks(canvasRef.current, resizedDetections)
      canvasRef &&
        canvasRef.current &&
        faceapi.draw.drawFaceExpressions(canvasRef.current, resizedDetections)
    }
  }, 100)
}
