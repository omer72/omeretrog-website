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
    id: "flutter-legacy-upgrade",
    date: "2026-03-08",
    tags: ["Claude Code", "AI", "Flutter", "Mobile Development", "iOS", "Dart", "Tech Debt", "Code Migration"],
    linkedInUrl:
      "https://www.linkedin.com/posts/omer72_claudecode-ai-flutter-share-7436292249270861824-7WVx",
    title: {
      en: "Upgrading a Legacy Flutter iPad App to Flutter 3.41 with Claude Code",
      he: "שדרוג אפליקציית Flutter ישנה ל-iPad עם Claude Code",
    },
    body: {
      en: `Just finished upgrading an iPad loyalty/rewards app from an older Flutter SDK to Flutter 3.41 (Dart 3.11) — approximately 45 modified files across 3 local packages.

Key changes: null-safety migration across 30+ files with type adjustments, API replacements (WebView to WebViewWidget, QRView to MobileScanner, launch() to launchUrl()), core data model restructuring to eliminate downstream errors, iOS deployment target bumped from 13.0 to 15.5, router dependency upgrade (fluro 2.0.3 to 2.0.5), widget requirement fixes for newer Flutter versions, and network layer debugging enhancements.

My approach: fix at the source where possible, use parallel agents for bulk modifications, and iterate through build-test cycles until achieving zero compilation errors on the iOS simulator.

Another example of how AI-powered development turns weeks of tedious tech debt work into a focused, efficient process.`,
      he: `סיימתי לשדרג אפליקציית נאמנות/תגמולים ל-iPad מגרסת Flutter ישנה ל-Flutter 3.41 (Dart 3.11) — כ-45 קבצים ששונו ב-3 חבילות מקומיות.

שינויים מרכזיים: מעבר ל-null-safety ביותר מ-30 קבצים עם התאמות טיפוסים, החלפת API-ים (WebView ל-WebViewWidget, QRView ל-MobileScanner, launch() ל-launchUrl()), מבנה מחדש של מודל הנתונים המרכזי, העלאת יעד הפריסה ל-iOS מ-13.0 ל-15.5, שדרוג תלות ראוטר (fluro 2.0.3 ל-2.0.5), תיקוני דרישות ווידג'טים לגרסאות Flutter חדשות, ושיפורי דיבאג בשכבת הרשת.

הגישה שלי: לתקן במקור כשאפשר, להשתמש בסוכנים מקבילים לשינויים בכמויות, ולעבור מחזורי בנייה-בדיקה עד להגעה לאפס שגיאות קומפילציה בסימולטור iOS.

עוד דוגמה לאיך פיתוח מונע AI הופך שבועות של עבודת חוב טכני מייגעת לתהליך ממוקד ויעיל.`,
    },
  },
  {
    id: "bialystok-wix-migration",
    date: "2026-03-03",
    tags: ["Claude Code", "AI", "Web Development", "React", "TypeScript", "Wix Migration", "Performance", "Accessibility"],
    linkedInUrl:
      "https://www.linkedin.com/posts/omer72_claudecode-ai-webdevelopment-share-7434605480012038144-1qOM",
    title: {
      en: "Migrating a Nonprofit's Legacy Wix Site with Claude Code",
      he: "העברת אתר Wix ישן של עמותה בעזרת Claude Code",
    },
    body: {
      en: `I just finished migrating a nonprofit's legacy Wix website to a modern tech stack using Claude Code. The organization preserves Bialystok's Jewish community heritage in Israel.

The rebuilt site achieved impressive Lighthouse scores: Performance 99, Accessibility 100, Best Practices 96, SEO 100.

The solution employed React 18 + TypeScript + Vite, an Express backend with JWT authentication, a JSON-based CMS (no database required), bilingual support (Hebrew RTL and English), an admin content management panel, and a Puppeteer-based scraping pipeline.

I used Claude Code to scrape every page, blog post, and image while cleaning messy Wix-generated HTML, then rebuilt everything from scratch. Work that would typically require weeks was completed significantly faster.

AI isn't replacing developers. It's giving us superpowers.`,
      he: `סיימתי להעביר אתר Wix ישן של עמותה לסטאק טכנולוגי מודרני בעזרת Claude Code. הארגון שומר על מורשת הקהילה היהודית של ביאליסטוק בישראל.

האתר המחודש השיג ציוני Lighthouse מרשימים: ביצועים 99, נגישות 100, Best Practices 96, SEO 100.

הפתרון כולל React 18 + TypeScript + Vite, שרת Express עם אימות JWT, מערכת ניהול תוכן מבוססת JSON (ללא צורך במסד נתונים), תמיכה דו-לשונית (עברית RTL ואנגלית), פאנל ניהול תוכן, וצינור סקרייפינג מבוסס Puppeteer.

השתמשתי ב-Claude Code כדי לסרוק כל דף, פוסט בלוג ותמונה תוך ניקוי HTML מבולגן שנוצר על ידי Wix, ואז בניתי הכל מחדש מאפס. עבודה שבדרך כלל דורשת שבועות הושלמה מהר משמעותית.

AI לא מחליף מפתחים. הוא נותן לנו כוחות-על.`,
    },
  },
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
