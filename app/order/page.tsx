import { ButtonImageSteamed } from "../components/Button/Button";
import styles from "./order.module.scss";
import cn from "classnames/bind";

const cx = cn.bind(styles);

export default function Home() {
  return (
    <div className={cx("Wrapper")}>
      <ButtonImageSteamed />
    </div>
  );
}
