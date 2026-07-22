import { Link, useParams } from "react-router-dom";
import { chapters } from "../data/chapters";
import { useTheme } from "../hooks/useTheme";
import styles from "./Navbar.module.css";

export function Navbar() {
  const { id, sectionId, bookId } = useParams<{
    id: string;
    sectionId: string;
    bookId: string;
  }>();
  const { theme, toggle } = useTheme();

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>
        <span className={styles.logoText}>
          Alimiyyah <span className={styles.logoSub}>Notes</span>
        </span>
      </Link>

      {/* desktop nav - only show chapters when in a book */}
      {sectionId && bookId && (
        <nav className={styles.pills} aria-label="Chapters">
          {chapters.map((ch) => (
            <Link
              key={ch.id}
              to={`/${sectionId}/${bookId}/chapter/${ch.id}`}
              className={`${styles.pill} ${id === ch.id ? styles.active : ""}`}
            >
              {ch.title}
            </Link>
          ))}
        </nav>
      )}

      <div className={styles.actions}>
        <button
          className={styles.themeBtn}
          onClick={toggle}
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        >
          {theme === "dark" ? "☀️" : "🌙"}
          <span className={styles.themeBtnLabel}>
            {theme === "dark" ? "Light" : "Dark"}
          </span>
        </button>
      </div>
    </header>
  );
}
