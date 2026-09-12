"use client";

import type { ExamResult } from "./exam-result-types";

const STORAGE_KEY = "pk-exam-results-v1";

export function loadExamResults(): ExamResult[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as ExamResult[]) : [];
  } catch {
    return [];
  }
}

export function saveExamResult(result: ExamResult): void {
  try {
    const existing = loadExamResults();
    existing.unshift(result);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
  } catch {
    // quota
  }
}

export function clearExamResults(): void {
  localStorage.removeItem(STORAGE_KEY);
}
