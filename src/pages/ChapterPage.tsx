import { useState, useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { chapters } from "../data/chapters";
import { RuleCard } from "../components/RuleCard";
import { DataTable } from "../components/DataTable";
import { FlashcardDeck } from "../components/FlashcardDeck";
import styles from "./ChapterPage.module.css";

type Tab = "summary" | "scholars" | "flashcards";

const TABS: { id: Tab; label: string }[] = [
  { id: "summary", label: "Summary" },
  { id: "scholars", label: "Scholar Tables" },
  { id: "flashcards", label: "Flashcards" },
];

export function ChapterPage() {
  const { sectionId, bookId, id } = useParams<{
    sectionId: string;
    bookId: string;
    id: string;
  }>();
  const chapter = chapters.find((c) => c.id === id);
  const [activeTab, setActiveTab] = useState<Tab>("summary");

  // reset tab when chapter changes
  useEffect(() => {
    setActiveTab("summary");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  if (!chapter) return <Navigate to={`/${sectionId}/${bookId}`} replace />;
  if (!sectionId || !bookId) return <Navigate to="/" replace />;

  const currentIndex = chapters.findIndex((c) => c.id === id);
  const prev = chapters[currentIndex - 1];
  const next = chapters[currentIndex + 1];

  return (
    <div className={styles.page}>
      {/* chapter header */}
      <div className={styles.header} key={id}>
        <div className={styles.headerMeta}>
          <span className={styles.chapterNum}>Chapter {chapter.number}</span>
          <Link to={`/${sectionId}/${bookId}`} className={styles.backLink}>
            ← All chapters
          </Link>
        </div>
        <h1 className={styles.title}>{chapter.title}</h1>
        <p className={styles.arabicTitle}>{chapter.arabicTitle}</p>
        <p className={styles.subtitle}>{chapter.subtitle}</p>

        <blockquote className={styles.arabicText}>
          {chapter.arabicText}
        </blockquote>
      </div>

      {/* tab bar */}
      <div className={styles.tabBar} role="tablist">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            className={`${styles.tabBtn} ${activeTab === tab.id ? styles.tabActive : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
            {tab.id === "flashcards" && (
              <span className={styles.tabBadge}>
                {chapter.flashcards.length}
              </span>
            )}
            {tab.id === "summary" && (
              <span className={styles.tabBadge}>{chapter.rules.length}</span>
            )}
          </button>
        ))}
      </div>

      {/* tab panels */}
      <div className={styles.content}>
        {activeTab === "summary" && (
          <div className={styles.panel} key={`${id}-summary`}>
            <div className={styles.rulesGrid}>
              {chapter.rules.map((rule, i) => (
                <RuleCard key={rule.title} rule={rule} index={i} />
              ))}
            </div>
          </div>
        )}

        {activeTab === "scholars" && (
          <div className={styles.panel} key={`${id}-scholars`}>
            {chapter.tables.length > 0 ? (
              chapter.tables.map((table, i) => (
                <DataTable
                  key={i}
                  table={table}
                  title={i === 0 ? "Scholar comparison" : `Table ${i + 1}`}
                />
              ))
            ) : (
              <p className={styles.empty}>
                No scholar comparison tables for this chapter.
              </p>
            )}
          </div>
        )}

        {activeTab === "flashcards" && (
          <div className={styles.panel} key={`${id}-flash`}>
            <FlashcardDeck cards={chapter.flashcards} />
          </div>
        )}
      </div>

      {/* chapter nav */}
      <div className={styles.chapterNav}>
        {prev ? (
          <Link
            to={`/${sectionId}/${bookId}/chapter/${prev.id}`}
            className={styles.navCard}
            data-dir="prev"
          >
            <span className={styles.navLabel}>← Previous</span>
            <span className={styles.navTitle}>{prev.title}</span>
            <span className={styles.navArabic}>{prev.arabicTitle}</span>
          </Link>
        ) : (
          <div />
        )}

        {next ? (
          <Link
            to={`/${sectionId}/${bookId}/chapter/${next.id}`}
            className={styles.navCard}
            data-dir="next"
          >
            <span className={styles.navLabel}>Next →</span>
            <span className={styles.navTitle}>{next.title}</span>
            <span className={styles.navArabic}>{next.arabicTitle}</span>
          </Link>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}
