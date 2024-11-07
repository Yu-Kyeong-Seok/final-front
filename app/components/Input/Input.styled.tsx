import styled from "styled-components";

const Wrapper = styled.input<{
    color?: string;
    borderColor?: string;
}>`
    width: 100%;
    height: 54px;
    padding: 0px 11px 1px 15px;
    border-radius: 4px;
    border: 1px solid rgb(221, 221, 221);
    border: ${(props) =>
        `1px solid ${props.borderColor || "black"}`};
    font-weight: 400;
    font-size: 14px;
    line-height: 1.5;
    color: ${(props) => props.color || "black"}; 
    outline: none;
    box-sizing: border-box;

    &:focus {
        border-color: ${(props) => props.color || "black"}; 
    }
`;

    // &::placeholder {
    //         ${(props) => props.color || "black"}; 
    //     }

export default {
    Wrapper
};
