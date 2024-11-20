import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      "img-cf.kurly.com",
      "product-image.kurly.com",
      "firebasestorage.googleapis.com",
    ], // 외부 도메인 추가(컬리 이미지 불러오기)/ api 연결 시 firebasestorage불러오기
  },
};

export default nextConfig;
