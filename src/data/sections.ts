export interface Section {
  id: string;
  name: string;
  description: string;
  books: Book[];
}

export interface Book {
  id: string;
  title: string;
  arabicTitle: string;
  description: string;
  icon?: string;
  color?: string;
}

export const sections: Section[] = [
  {
    id: "alimiyyah-notes",
    name: "Alimiyyah Notes",
    description:
      "Comprehensive study resources for Islamic jurisprudence and classical texts",
    books: [
      {
        id: "quduri",
        title: "Mukhtaṣar al-Qudūrī",
        arabicTitle: "مختصر القدوري",
        description:
          "Five chapters of Commercial Transactions (Bay3, Ribā, Salam, Ṣarf) with rules, scholar comparisons, flowcharts and flashcards",
        color: "#8b5a3c",
      },
    ],
  },
];

export function findSection(id: string): Section | undefined {
  return sections.find((s) => s.id === id);
}

export function findBook(sectionId: string, bookId: string): Book | undefined {
  const section = findSection(sectionId);
  return section?.books.find((b) => b.id === bookId);
}
