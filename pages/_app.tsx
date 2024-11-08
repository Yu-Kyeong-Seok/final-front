import localFont from "next/font/local";

// PretendardVariable 폰트 설정
const pretendard = localFont({
  src: [
    {
      path: "/fonts/PretendardVariable.woff2",
      weight: "100 900",
      style: "normal",
    },
  ],
  display: "swap", // 폰트 로딩 방식
});

function MyApp({ Component, pageProps }) {
  return (
    <div className={pretendard.className}>
      {" "}
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
