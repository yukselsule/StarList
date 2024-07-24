import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";

import styles from "./AppLayout.module.scss";

function AppLayout() {
  const location = useLocation();
  const [isHomePage, setIsHomePage] = useState(true);

  useEffect(() => {
    const isHomePage = location.pathname === "/";
    setIsHomePage(isHomePage);
  }, [isHomePage, location.pathname]);

  return (
    <div className={styles["app-layout"]}>
      <Header />

      <main className={isHomePage ? styles["homepage-main"] : ""}>
        <Outlet />
      </main>

      {!isHomePage && <Footer />}
    </div>
  );
}

export default AppLayout;
