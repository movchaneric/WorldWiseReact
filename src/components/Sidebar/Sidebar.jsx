import { Outlet } from "react-router-dom";
import AppNav from "../AppNav/AppNav";
import Logo from "../Logo/Logo";
import PageNav from "../PageNav/PageNav";
import styles from "../Sidebar/Sidebar.module.css";
import Footer from "../Footer/Footer";

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <Logo />

      <AppNav />

      <Outlet />
      <Footer />
    </div>
  );
};

export default Sidebar;
