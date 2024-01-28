import { Outlet } from "react-router-dom";
import AppNav from "../AppNav/AppNav";
import Logo from "../Logo/Logo";
import PageNav from "../PageNav/PageNav";
import styles from "../Sidebar/Sidebar.module.css";

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />

      <Outlet />

      <footer className={styles.footer}>
        <p className={styles.copyright}>Created by Eric</p>
      </footer>
    </div>
  );
};

export default Sidebar;
