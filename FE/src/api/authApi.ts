// src/api/authApi.ts
import axios from "axios";

const API_BASE_URL = "http://172.20.10.2:8080";

const authApi = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 이메일 존재 여부 확인
export const existsEmail = async (email: string) => {
  const response = await authApi.get("/api/users/exists-email", {
    params: {
      email,
    },
  });

  return response.data; // true or false
};

// 이메일 인증번호 발송
export const sendSignupCode = async (email: string) => {
  const response = await authApi.post("/api/emails/send-code", {
    email,
  });

  return response.data;
};

// 이메일 인증번호 검증
export const verifySignupCode = async (email: string, code: string) => {
  const response = await authApi.post("/api/emails/verify-code", {
    email,
    code,
  });

  return response.data;
};

// 회원가입
export const signup = async (data: {
  email: string;
  password: string;
  nickname: string;
  nationality: string;
  language: string;
  birthDate: string;
}) => {
  const response = await authApi.post("/api/users/signup", data);

  return response.data;
};

// 로그인
export const login = async (data: {
  email: string;
  password: string;
}) => {
  const response = await authApi.post("/api/users/login", data);

  return response.data;
};

// 비밀번호 찾기 인증번호 발송
export const sendPasswordResetCode = async (email: string) => {
  const response = await authApi.post("/api/emails/password-reset-code", {
    email,
  });

  return response.data;
};

// 비밀번호 찾기 인증번호 검증
export const verifyPasswordResetCode = async (email: string, code: string) => {
  const response = await authApi.post("/api/emails/password-reset-verify", {
    email,
    code,
  });

  return response.data;
};

// 비밀번호 변경
export const resetPassword = async (data: {
  email: string;
  newPassword: string;
}) => {
  const response = await authApi.patch("/api/users/password/reset", data);

  return response.data;
};

export default authApi;