"use client";

import React from "react";
import ButtonStyled from "./Button.styled";
import { ButtonBaseProps, ButtonFullProps } from "./Button.type";
import "../../styles/global.scss"
import { FaRegHeart } from "react-icons/fa";
import { MdOutlineRefresh } from "react-icons/md";

const Button = (props: ButtonFullProps) => {
    const { backgroundColor, color, borderWidth, borderStyle, borderColor, borderRadius, text, onClick, disabled} = props;
    return (
        <ButtonStyled.Wrapper backgroundColor={backgroundColor} color={color} borderWidth={borderWidth} borderStyle={borderStyle} borderColor={borderColor} borderRadius={borderRadius} onClick={onClick} disabled={disabled}>
            <ButtonStyled.Text>{text}</ButtonStyled.Text>
        </ButtonStyled.Wrapper>
    );
};

export const ButtonStyle1 = (props: ButtonBaseProps) => {
    const { text, onClick, disabled } = props;
    return (
        <Button 
            backgroundColor={"var(--color-main)"}
            color={"var(--color-white)"}
            borderWidth={1}
            borderStyle={"none"}
            borderColor={"transparent"}
            borderRadius={5}
            text={text}
            onClick={onClick}
            disabled={disabled}
        />
        );
}

export const ButtonStyle2 = (props: ButtonBaseProps) => {
    const { text, onClick } = props;
    return (
        <Button 
            backgroundColor={"var(--color-white)"}
            color={"var(--color-main)"}
            borderWidth={2}
            borderStyle={"solid"}
            borderColor={"var(--color-main)"}
            borderRadius={5}
            text={text}
            onClick={onClick}
        />
        );
}

export const ButtonStyle3 = (props: ButtonBaseProps) => {
    const { text, onClick } = props;
    return (
        <Button 
            backgroundColor={"var(--color-100)"}
            color={"var(--color-white)"}
            borderWidth={2}
            borderStyle={"none"}
            borderColor={"transparent"}
            borderRadius={5}
            text={text}
            onClick={onClick}
        />
        );
}

export const ButtonStyle4 = (props: ButtonBaseProps) => {
    const { text, onClick } = props;
    return (
        <Button 
            backgroundColor={"var(--color-white)"}
            color={"var(--color-800)"}
            borderWidth={2}
            borderStyle={"solid"}
            borderColor={"var(--color-100)"}
            borderRadius={5}
            text={text}
            onClick={onClick}
        />
        );
}

export const ButtonStyle5 = (props: ButtonBaseProps) => {
    const { text, onClick } = props;
    return (
        <Button 
            backgroundColor={"var(--color-white)"}
            color={"var(--color-200)"}
            borderWidth={2}
            borderStyle={"solid"}
            borderColor={"var(--color-100)"}
            borderRadius={5}
            text={text}
            onClick={onClick}
        />
        );
}

export const ButtonImageSteamed = () => {
    return (
        <ButtonStyled.WrapperImage backgroundColor={"var(--color-white)"} borderColor={"var(--color-100)"}>
            <FaRegHeart 
            size={24}
            color="var(--color-main)"
            />
        </ButtonStyled.WrapperImage>
    )
}

export const ButtonImageRefresh = () => {
    return (
        <ButtonStyled.WrapperImage backgroundColor={"var(--color-white)"} borderColor={"transparent"}>
            <MdOutlineRefresh 
            size={24}
            color="var(--color-black)"
            />
            <ButtonStyled.Span color="var(--color-black)">초기화</ButtonStyled.Span>
        </ButtonStyled.WrapperImage>
    )
}

// export default Button;
