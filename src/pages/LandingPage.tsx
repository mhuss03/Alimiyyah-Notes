import { Link } from "react-router-dom";
import { sections } from "../data/sections";
import styles from "./LandingPage.module.css";

export function LandingPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>Alimiyyah Notes</h1>
        <p className={styles.heroSub}>
          A collection of organized study resources for Islamic jurisprudence,
          classical texts, and foundational scholarship.
        </p>
      </section>

      <section className={styles.sections}>
        <h2 className={styles.sectionTitle}>Study Collections</h2>
        <div className={styles.sectionGrid}>
          {sections.map((section) => (
            <Link
              key={section.id}
              to={`/${section.id}`}
              className={styles.sectionCard}
            >
              <h3 className={styles.cardTitle}>{section.name}</h3>
              <p className={styles.cardDesc}>{section.description}</p>
              <div className={styles.bookCount}>
                {section.books.length} subject
                {section.books.length !== 1 ? "s" : ""}
              </div>
              <span className={styles.arrow}>→</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
