import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https", // 이미지 URL이 https로 시작하는 경우
        hostname: "firebasestorage.googleapis.com", // 세 번째 도메인
        port: "", // 기본 포트(https인 경우 기본적으로 443 포트 사용)
        pathname: "/**", // 이미지 경로
      },
    ],
  },
};

export default nextConfig;
