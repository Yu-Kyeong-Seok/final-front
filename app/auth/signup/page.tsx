"use client";
import React from "react";
import { ButtonImageRefresh, ButtonImageSteamed, ButtonStyle1 ,ButtonStyle2, ButtonStyle3, ButtonStyle4, ButtonStyle5 } from "../../components/Button/Button";
import { InputStyle1 } from "../../components/Input/Input";

export default async function Home() {
    const handleClick = () => {
        alert('Button clicked!');
    };

    return (
        <div>
            <ButtonStyle1 text="CTA" disabled={false}/>
            <ButtonStyle1 text="CTA" disabled={true}/>
            <ButtonStyle2 text="CTA"/>
            <ButtonStyle3 text="CTA"/>
            <ButtonStyle4 text="CTA"/>
            <ButtonStyle5 text="CTA" onClick={handleClick}/>

            <InputStyle1 placeholder="텍스트를 입력하세요"></InputStyle1>
            <InputStyle1 placeholder="텍스트를 입력하세요"></InputStyle1>
            <InputStyle1 placeholder="텍스트를 입력하세요"></InputStyle1>
            {/* <InputStyle2 placeholder="텍스트를 입력하세요"></InputStyle2> */}
            {/* <InputStyle3 placeholder="텍스트를 입력하세요"></InputStyle3> */}
            <ButtonImageSteamed></ButtonImageSteamed>
            <ButtonImageRefresh></ButtonImageRefresh>
            <button>textww</button>

            <input placeholder="텍스트를 입력하세요" type="text"></input>
        </div>
    );
}