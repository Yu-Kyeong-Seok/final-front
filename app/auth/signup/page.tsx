"use client";
import React from "react";
// import { ButtonImageRefresh, ButtonImageSteamed, ButtonStyle1 ,ButtonStyle2, ButtonStyle3, ButtonStyle4, ButtonStyle5 } from "../../components/Button/Button";
// import { InputStyle1 } from "../../components/Input/Input";
import SignUpView from "@/app/views/auth/signUp/signUp.view";

export default async function Home() {
  return (
    <React.Fragment>
      <SignUpView />
    </React.Fragment>
  );
}
