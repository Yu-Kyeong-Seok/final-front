import React from "react";
import HeaderWrap from "@/src/components/Header/Header";

export default function OrderLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
        <HeaderWrap
            backgroundColor="white"
            title="채소"
            color="black"
            canGoBack={true}
        />
            {children}
        </>
    );
}
