import { Link } from "react-router-dom";
import styles from "./Logo.module.css";

function Logo() {
  return (
    <Link to="/">
      <img src="../public/logo.png" alt="Main-logo" className={styles.logo} />
    </Link>
  );
}

export default Logo;
