import { Link, useParams, Navigate } from "react-router-dom";
import { findSection } from "../data/sections";
import styles from "./AlimiyyahNotesPage.module.css";

export function AlimiyyahNotesPage() {
  const { sectionId } = useParams<{ sectionId: string }>();
  const section = sectionId ? findSection(sectionId) : null;

  if (sectionId && !section) {
    return <Navigate to="/" replace />;
  }

  if (!section) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <Link to="/" className={styles.backLink}>
          ← Back to sections
        </Link>
        <h1 className={styles.title}>{section.name}</h1>
        <p className={styles.description}>{section.description}</p>
      </div>

      <section className={styles.books}>
        <h2 className={styles.booksTitle}>Available Subjects</h2>
        <div className={styles.bookGrid}>
          {section.books.map((book) => (
            <Link
              key={book.id}
              to={`/${section.id}/${book.id}`}
              className={styles.bookCard}
              style={
                {
                  "--card-color": book.color || "#667eea",
                } as React.CSSProperties
              }
            >
              <div className={styles.cardContent}>
                <h3 className={styles.bookTitle}>{book.title}</h3>
                <p className={styles.bookArabic}>{book.arabicTitle}</p>
                <p className={styles.bookDesc}>{book.description}</p>
              </div>
              <span className={styles.arrow}>→</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
