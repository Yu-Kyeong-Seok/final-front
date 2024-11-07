import styled from "styled-components";

const Text = styled.span``;

const Wrapper = styled.button<{
    backgroundColor?: string;
    color?: string;
    borderWidth?: number;
    borderStyle?: string;
    borderColor?: string;
    borderRadius?: number;
}>`
    display: block;
    text-align: center;
    overflow: hidden;
    width: 100%;
    height: 46px;
    border-radius: ${(props) => (props.borderRadius !== undefined ? props.borderRadius : 0)}px;

    color: ${(props) => props.color || "black"}; 
    background-color: ${(props) => props.backgroundColor || "transparent"};

    border: ${(props) =>
        `${props.borderWidth || 0}px ${props.borderStyle || "solid"} ${props.borderColor || "black"}`};

    &:focus {
        border-color: ${(props) => props.borderColor || "black"}; 
    }
    &:hover {
        border-color: ${(props) => props.borderColor || "black"}; 
    }
    &:active {
        border-color: ${(props) => props.borderColor || "black"}; 
    }
    &:disabled {
        background-color: var(--color-100);
        color: var(--color-white);
        border : 2px none transparent;
    }
`;

const Image = styled.img``;

const WrapperImage = styled.button<{
    backgroundColor?: string;
    borderColor?: string;
}>`
    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;
    height: 100%;
    padding: 3px;
    border-radius: 5px;
    border: ${(props) => `1px solid ${props.borderColor || "black"}`};
    background-color: ${(props) => props.backgroundColor || "transparent"};
`;

const Span = styled.span<{
    color?: string;
}>`
    color: ${(props) => props.color || "black"}; 
`;

export default {
    Wrapper,
    Text,
    WrapperImage,
    Image,
    Span,
};
