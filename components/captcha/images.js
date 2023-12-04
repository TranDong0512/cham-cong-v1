import { useState, useEffect, useRef } from 'react';

const ImageConverter = ({ text }) => {

    const canvasRef = useRef(null);
    useEffect(() => {
        const canvas = canvasRef.current;

        const ctx = canvas.getContext('2d');

        for (let i = 0; i < text.length; i++) {
            // Thiết lập màu cho từng ký tự
            ctx.fillStyle = i % 2 === 0 ? 'red' : 'blue'; // Màu chữ xen kẽ (ví dụ: đỏ và xanh dương)

            // Thiết lập font-style cho từng ký tự
            ctx.font = i % 2 === 0 ? 'italic bold 14px Arial' : '14px Arial'; // Font chữ xen kẽ

            ctx.fillText(text[i], 15 + i * 15, 25); // Vẽ từng ký tự lên canvas
        }
    }, [text]);

    return (
        <><canvas ref={canvasRef} width={120} height={50} /></>
    );
};

export default ImageConverter;