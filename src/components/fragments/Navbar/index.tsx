import { signIn, signOut, useSession } from "next-auth/react";
import styles from "./Navbar.module.scss";
import router from "next/router";
import Image from "next/image";
import { useState } from "react";

const Navbar = () => {
  const { data: session } = useSession();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  return (
    <div>
      <div className={styles.navbar}>
        <div className={styles.navbar__content}>
          <div className={styles.navbar__logo} onClick={() => router.push("/")}>
            <Image
              src={"/logo_letsgomas.png"}
              alt="logo"
              width={100}
              height={28}
            />
          </div>
          <div className={styles.navbar__buttonContainer}>
            <button
              className={styles.navbar__button1}
              onClick={() => router.push("/")}
            >
              Destinasi
            </button>
            <button
              className={styles.navbar__button1}
              onClick={() => router.push("/articles")}
            >
              Artikel
            </button>
            <button
              className={styles.navbar__button1}
              onClick={() => router.push("/us")}
            >
              Tentang Kami
            </button>
            <button
              className={styles.navbar__button1}
              onClick={() => router.push("/banyumas")}
            >
              Tentang Banyumas
            </button>

            {/* Tampilkan tombol Admin jika user telah login */}
            {session && (
              <button
                className={styles.navbar__button1}
                onClick={() => router.push("/admin")}
              >
                Admin
              </button>
            )}

            <button
              className={styles.navbar__button2}
              onClick={() => (session ? signOut() : signIn())}
            >
              {session ? "Log out" : "Log in"}
            </button>
          </div>

          <button className={styles.navbar__menuButton} onClick={toggleSidebar}>
            ☰
          </button>
        </div>
      </div>

      <div
        className={`${styles.sidebar} ${
          isSidebarOpen ? styles.sidebar_open : ""
        }`}
      >
        <div className={styles.sidebar__content}>
          <div className={styles.navbar__logo} onClick={() => router.push("/")}>
            <Image
              src={"/logo_letsgomas.png"}
              alt="logo"
              width={100}
              height={28}
            />
          </div>
          <button
            className={styles.sidebar__closeButton}
            onClick={toggleSidebar}
          >
            X
          </button>
        </div>
        <button
          className={styles.sidebar__item}
          onClick={() => router.push("/articles")}
        >
          Artikel
        </button>
        <button
          className={styles.sidebar__item}
          onClick={() => router.push("/us")}
        >
          Tentang Kami
        </button>
        <button
          className={styles.sidebar__item}
          onClick={() => router.push("/banyumas")}
        >
          Tentang Banyumas
        </button>

        {/* Tampilkan tombol Admin di sidebar jika user telah login */}
        {session && (
          <button
            className={styles.sidebar__item}
            onClick={() => router.push("/admin")}
          >
            Admin
          </button>
        )}

        <button
          className={styles.sidebar__item}
          onClick={() => (session ? signOut() : signIn())}
        >
          {session ? "Log out" : "Log in"}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
