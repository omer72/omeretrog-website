import type { Locale } from "../i18n/translations";

export interface BlogPost {
  id: string;
  date: string;
  tags: string[];
  linkedInUrl: string;
  title: Record<Locale, string>;
  body: Record<Locale, string>;
}

const blogPosts: BlogPost[] = [
  {
    id: "jwt-chrome-extension",
    date: "2026-03-01",
    tags: ["AI", "Developer Productivity", "Chrome Extension", "JWT", "OIDC"],
    linkedInUrl:
      "https://www.linkedin.com/posts/omer72_ai-developerproductivity-chromeextension-activity-7433888810750504960-iqHr",
    title: {
      en: "Building a JWT Chrome Extension with AI in Minutes",
      he: "בניית תוסף Chrome ל-JWT בעזרת AI תוך דקות",
    },
    body: {
      en: `One of the things I love about working with AI is turning small daily frustrations into instant productivity wins. As part of my work on an OIDC integration project, I regularly need to inspect and validate JWT tokens. My workflow involved a repetitive cycle: copy the token from the browser cookies, paste it into jwt.io, read the payload, and repeat — dozens of times a day.

I decided to put AI to work. With a single prompt, I asked Claude to build a Chrome extension that automatically detects when I copy a JWT token — including directly from the browser's DevTools — and instantly decodes it.

The result? Exactly what I needed, built in minutes instead of hours. No more context-switching, no more manual decoding.

Sometimes the best developer tools are the ones you build yourself — with a little help from AI.`,
      he: `אחד הדברים שאני אוהב בעבודה עם AI הוא להפוך תסכולים יומיומיים קטנים לשיפורי פרודוקטיביות מיידיים. כחלק מהעבודה שלי על פרויקט אינטגרציית OIDC, אני צריך באופן קבוע לבדוק ולאמת טוקני JWT. תהליך העבודה שלי כלל מחזור חוזר: להעתיק את הטוקן מקובצי ה-cookies בדפדפן, להדביק אותו ב-jwt.io, לקרוא את ה-payload, ולחזור על זה — עשרות פעמים ביום.

החלטתי להפעיל AI. עם פרומפט אחד, ביקשתי מ-Claude לבנות תוסף Chrome שמזהה אוטומטית כשאני מעתיק טוקן JWT — כולל ישירות מה-DevTools של הדפדפן — ומפענח אותו מיידית.

התוצאה? בדיוק מה שהייתי צריך, נבנה בדקות במקום שעות. בלי החלפת הקשרים, בלי פיענוח ידני.

לפעמים הכלים הכי טובים למפתחים הם אלה שאתה בונה בעצמך — עם קצת עזרה מ-AI.`,
    },
  },
];

export function getBlogPosts(_locale: Locale): BlogPost[] {
  return blogPosts;
}
