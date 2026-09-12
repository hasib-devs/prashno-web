export type ExamType = "omr" | "online";

export interface ExamResult {
  id: string;
  type: ExamType;
  title: string;
  timestamp: number;
  totalQuestions: number;
  correct: number;
  wrong: number;
  empty: number;
  percentage: number;
  durationSeconds: number;
  questions: {
    id: string;
    stem: string;
    subject: string;
    studentAnswer: number | null;
    correctIndex: number;
  }[];
}
