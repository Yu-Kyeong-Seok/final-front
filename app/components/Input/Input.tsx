import React from "react";
import { InputBaseProps, InputFullProps } from "./Input.type";
import InputStyled from "./Input.styled";

const Input = (props: InputFullProps) => {
  const { color, borderColor, placeholder } = props;
  return (
    <InputStyled.Wrapper
      color={color}
      borderColor={borderColor}
      placeholder={placeholder}
      type="text"
    ></InputStyled.Wrapper>
  );
};

export const InputStyle1 = (props: InputBaseProps) => {
  const { placeholder } = props;
  return (
    <Input
      color={"var(--color-800)"}
      borderColor={"var(--color-100)"}
      placeholder={placeholder}
    />
  );
};

// export const InputStyle2 = (props: InputBaseProps) => {
//     const { placeholder } = props;
//     return (
//         <Input
//         color={"var(--color-200)"}
//         borderColor={"var(--color-800)"}
//         placeholder={placeholder}
//     />
//     );
// }

// export const InputStyle3 = (props: InputBaseProps) => {
//     const { placeholder } = props;
//     return (
//         <Input
//         color={"var(--color-800)"}
//         borderColor={"var(--color-800)"}
//         placeholder={placeholder}
//     />
//     );
// }
