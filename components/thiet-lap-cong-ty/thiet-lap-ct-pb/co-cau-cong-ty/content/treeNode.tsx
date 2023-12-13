import React from "react";
import dynamic from "next/dynamic";
const DiagramNoSSR = dynamic(() => import("../diagram"), {
    ssr: false,
});

export default function TreeNodeContent() {
    return (
        <>
            <DiagramNoSSR />
        </>
    );
}
