import localFont from "next/font/local";

// PretendardVariable 폰트 설정
const pretendard = localFont({
  src: [
    {
      path: "../public/fonts/PretendardVariable.woff2",
      weight: "100 900",
      style: "normal",
    },
  ],
  display: "swap",
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
