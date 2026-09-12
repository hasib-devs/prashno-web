export type Question = {
  id: string;
  stem: string;
  options: [string, string, string, string];
  correctIndex: 0 | 1 | 2 | 3;
  subject: string;
  chapter: string;
  classLevel: string;
  marks: number;
};

export const OPTION_LABELS = ["ক", "খ", "গ", "ঘ"] as const;

export const STORAGE_KEY = "pk-questions-v1";
