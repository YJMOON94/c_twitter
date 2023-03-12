import { authService } from "myBase";
import React, { useState } from "react";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";
import AuthForm from "components/AuthForm";
import styled from "styled-components";

const Auth = () => {
  const auth = getAuth();

  // 구글, 깃헙 로그인
  // 구굴, 깃헙 이메일이 같을때 같은 이메일로 회원가입 안되는 오류 존재
  const onSocialClick = async (event) => {
    event.preventDefault();
    const {
      target: { name },
    } = event;
    let provider;
    if (name === "google") {
      provider = new GoogleAuthProvider();
    } else if (name === "github") {
      provider = new GithubAuthProvider();
    }

    await signInWithPopup(auth, provider);
  };
  return (
    <AuthWrapper>
      <AuthForm auth={auth} />
      <div>
        <button name="google" onClick={onSocialClick}>
          Continue With Google
        </button>
        <button name="github" onClick={onSocialClick}>
          Continue Wtih Github
        </button>
      </div>
    </AuthWrapper>
  );
};

const AuthWrapper = (styled.div = `
  width : 100%;
  max-width : 500px;
`);
export default Auth;
