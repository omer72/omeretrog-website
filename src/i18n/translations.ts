import en from "./en";
import he from "./he";

export type Locale = "en" | "he";

const translations: Record<Locale, Record<string, string>> = { en, he };

export default translations;
