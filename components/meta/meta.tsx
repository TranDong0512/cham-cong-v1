import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";

export default function Meta({
    children,
    title,
    des,
    canonical,
    isSeo,
}: {
    title: any;
    children: any;
    des: any;
    canonical: any;
    isSeo: boolean;
}) {
    const router = useRouter();
    return (
        <>
            <Head>
                <meta charSet="UTF-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                {isSeo ? (
                    <meta name="robots" content="index,follow" />
                ) : (
                    <meta name="robots" content="noindex,nofollow" />
                )}

                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
                <link
                    rel="icon"
                    href="https://hungha365.com/favicon/HH365.ico"
                    sizes="any"
                />
                <title>{title}</title>
                <meta name="description" content={des} />
                <meta
                    name="keywords"
                    content="máy chấm công,máy chấm công vân tay,may chấm công vân tay,may cham cong,maychamcong,phần mềm chấm công,máy chấm công thẻ giấy,chấm công,máy chấm công ronald jack,chấm cong,wise eye on 39,wiseeyeon39,may cham cong ronald jack,ronaldjack,app chấm công,máy chấm công ronald jack mb22vl,máy chấm công hikvision,máy chấm công ronald jack rj800,chấm công nhận diện khuôn mặt dahahi,máy chấm công nhận diện khuôn mặt,máy chấm vân tay,máy chấm công ronald jack tx200,app chấm công trên điện thoại,máy chấm công nhận diện khuôn mặt dahahi,máy chấm công giá rẻ,máy chấm công zkteco,phần mềm chấm công miễn phí,phần mềm chấm công trên điện thoại,máy chấm công ronald jack tx300,ứng dụng chấm công,chấm công vân tay,may cham cong van tay,cham cong,máy chấm công vân tay giá rẻ,phần mềm công nghệ quốc tế chấm com,máy chấm công vân tay gia re,máy quét vân tay,thẻ chấm công,máy chấm công vân tay ronald jack,máy chấm công ronald jack rj3800pro,phần mềm chấm công wise eye on 39,phan mem cham cong"
                ></meta>
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:title" content={title} />
                <meta name="twitter:description" content={des} />
                <meta property="og:title" content={title} />
                <meta property="og:type" content="website" />
                <meta property="og:locale" content="vi_VN" />
                <meta property="og:description" content={des} />
                <meta property="og:url" content={canonical} />
                <meta
                    property="og:image"
                    content="https://hungha365.com/img/HH365.svg"
                />
                <link rel="canonical" href={canonical} />

                <link
                    rel="preload"
                    href="../fonts/Roboto-Bold.woff2"
                    as="font"
                    type="font/woff2"
                    crossOrigin="anonymous"
                />
                <link
                    rel="preload"
                    href="../fonts/Roboto-Medium.woff2"
                    as="font"
                    type="font/woff2"
                    crossOrigin="anonymous"
                />
                <meta
                    name="google-site-verification"
                    content="q4vBfRDO92RvPdYuA-xEEalSufKbzQiQQYpUBGTOqC4"
                />
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-KL3KDJW5');
`,
                    }}
                ></script>
                <script
                    async
                    src="https://www.googletagmanager.com/gtag/js?id=G-6LT1XMTDC3"
                ></script>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
 window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-6LT1XMTDC3');
`,
                    }}
                ></script>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: `{
                        "@context": "https://schema.org",
                        "@type": "WebSite",
                        "name": "Phần Mềm Chấm Công 365",
                        "description": "Phần mềm chấm công AI365 đa nền tảng (web, mobile, winform) với công nghệ AI365 giúp chấm công qua chat365 hoặc camera chấm công nhận diện khuôn mặt. Đảm bảo dữ liệu chính xác, minh bạch trong tính lương, quản lý tài sản và kết nối với 200 ứng dụng khác thông qua ứng dụng chat365.",
                        "url": "https://hungha365.com/phan-mem-cham-cong",
                        "potentialAction": {
                            "@type": "SearchAction",
                            "target": "https://timviec365.vn/tim-kiem?keyword={keyword}",
                            "query-input": "required name=keyword"
                        },
                        "additionaltype": ["https://en.wikipedia.org/wiki/Human_resource_management", "https://www.wikidata.org/wiki/Q1056396"]}`,
                    }}
                />

                <link
                    rel="preload"
                    href="../fonts/Roboto-Regular.woff2"
                    as="font"
                    type="font/woff2"
                    crossOrigin="anonymous"
                />
            </Head>
            {children}
        </>
    );
}
