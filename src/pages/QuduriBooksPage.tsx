import { Link, useParams } from "react-router-dom";
import { chapters } from "../data/chapters";
import styles from "./QuduriBooksPage.module.css";

export function QuduriBooksPage() {
  const { sectionId, bookId } = useParams<{
    sectionId: string;
    bookId: string;
  }>();

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroGrid} aria-hidden="true" />
        <Link to={`/${sectionId}`} className={styles.backLink}>
          ← Back to {sectionId}
        </Link>
        <p className={styles.heroArabic}>فقه البيوع</p>
        <h1 className={styles.heroTitle}>
          Islamic <em>Commercial</em> Law
        </h1>
        <p className={styles.heroSub}>
          Five chapters of Mukhtaṣar al-Qudūrī — Ḥanafī fiqh study notes with
          rules, scholar comparisons, flowcharts and flashcards.
        </p>
        <div className={styles.heroTags}>
          {[
            "Ḥanafī Fiqh",
            "Bay3 · Sales",
            "Ribā · Usury",
            "Salam · Forward",
            "Ṣarf · Currency",
          ].map((t) => (
            <span key={t} className={styles.tag}>
              {t}
            </span>
          ))}
        </div>
      </section>

      <section className={styles.grid}>
        {chapters.map((ch, i) => (
          <Link
            key={ch.id}
            to={`/${sectionId}/${bookId}/chapter/${ch.id}`}
            className={styles.card}
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <div className={styles.cardTop}>
              <span className={styles.cardNum}>{ch.number}</span>
              <span className={styles.cardCount}>
                {ch.flashcards.length} cards
              </span>
            </div>
            <h2 className={styles.cardTitle}>{ch.title}</h2>
            <p className={styles.cardArabic}>{ch.arabicTitle}</p>
            <p className={styles.cardSub}>{ch.subtitle}</p>
            <div className={styles.cardFooter}>
              <span>{ch.rules.length} rules</span>
              <span>
                {ch.tables.length} table{ch.tables.length !== 1 ? "s" : ""}
              </span>
              <span className={styles.arrow}>→</span>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
}
