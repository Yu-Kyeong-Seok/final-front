import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["img-cf.kurly.com", "product-image.kurly.com"], // 외부 도메인 추가(컬리 이미지 불러오기)
  },
};

export default nextConfig;
