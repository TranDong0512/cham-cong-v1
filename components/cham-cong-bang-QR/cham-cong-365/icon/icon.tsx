import { Image } from "antd"
export const CheckTicked:React.FC = () =>{
    return(
        <div>
            <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 44 44" fill="none">
            <g clip-path="url(#clip0_1_110931)">
                <path d="M44 22C44 34.1484 34.1484 44 22 44C9.8516 44 0 34.1484 0 22C0 9.8516 9.8516 0 22 0C34.1484 0 44 9.8516 44 22Z" fill="url(#paint0_linear_1_110931)"/>
                <path d="M31.3159 13.6668L18.2002 27.5081L13.6815 22.7588C12.8382 21.8726 11.4735 21.8735 10.6319 22.7615C9.78863 23.6504 9.7895 25.0925 10.6337 25.9805L16.6775 32.3357C17.5208 33.2228 18.8864 33.221 19.728 32.333L34.3689 16.8822C35.2105 15.9932 35.2105 14.5539 34.3681 13.6659C33.5247 12.7779 32.1584 12.7779 31.3159 13.6668Z" fill="white"/>
            </g>
            <defs>
                <linearGradient id="paint0_linear_1_110931" x1="22" y1="0" x2="22" y2="44" gradientUnits="userSpaceOnUse">
                <stop stop-color="#42D778"/>
                <stop offset="0.996" stop-color="#34B171"/>
                <stop offset="1" stop-color="#34B171"/>
                </linearGradient>
                <clipPath id="clip0_1_110931">
                <rect width="44" height="44" fill="white"/>
                </clipPath>
            </defs>
            </svg>
        </div>
    )
}
export const CheckUnticked: React.FC = () =>{
    return(
        <div>
            <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 44 44" fill="none">
            <circle cx="22" cy="22" r="22" fill="white"/>
            </svg>
        </div>
    )
}
export const Chamcong365: React.FC =() =>{
    return (
        <div>
            <Image src='/cc.png' alt=''/>
        </div>
    )
}