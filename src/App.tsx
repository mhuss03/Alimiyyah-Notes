import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { LandingPage } from "./pages/LandingPage";
import { AlimiyyahNotesPage } from "./pages/AlimiyyahNotesPage";
import { QuduriBooksPage } from "./pages/QuduriBooksPage";
import { ChapterPage } from "./pages/ChapterPage";
import styles from "./App.module.css";

export default function App() {
  return (
    <div className={styles.app}>
      <Navbar />
      <main className={styles.main}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/:sectionId" element={<AlimiyyahNotesPage />} />
          <Route path="/:sectionId/:bookId" element={<QuduriBooksPage />} />
          <Route
            path="/:sectionId/:bookId/chapter/:id"
            element={<ChapterPage />}
          />
          <Route path="*" element={<LandingPage />} />
        </Routes>
      </main>
      <footer className={styles.footer}>
        <p>
          Alimiyyah Notes &nbsp;·&nbsp;
          <span>Islamic Jurisprudence</span> &nbsp;·&nbsp; Study Resources
        </p>
      </footer>
    </div>
  );
}
