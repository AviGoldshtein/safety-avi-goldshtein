import { useState } from "react";

import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

import styles from "./LayoutMain.module.css";
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import Footer from "../components/Footer/Footer";

interface LayoutMainProps {
  children: React.ReactNode;
}


export default function LayoutMain({ children }: LayoutMainProps) {
  const [openSidebar, setOpenSidebar] = useState(true);

  return (
    <div className={styles.layoutContainer}>
      <Header />

      <IconButton
        onClick={() => setOpenSidebar((prev) => !prev)}
        sx={{
          position: "fixed",
          top: "90px",
          right: openSidebar ? "230px" : "10px",
          zIndex: 3000,
          transition: "all 0.35s ease",
          bgcolor: "background.paper",
          border: "1px solid rgba(255,255,255,0.2)",
          boxShadow: 2,
        }}
      >
        <MenuIcon />
      </IconButton>

      <div className={styles.contentWrapper}>
        <Sidebar open={openSidebar} />

        <main
            className={styles.main}
            style={{
                marginRight: openSidebar ? "260px" : "20px",
                transition: "margin-right 0.3s ease",
            }}
        >
            {children}
        </main>
      </div>

      <Footer />
    </div>
  );
}
