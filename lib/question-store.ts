"use client";
import type { Question } from "./question-types";
import { STORAGE_KEY } from "./question-types";
import { SEED_QUESTIONS } from "./seed-questions";

export function loadQuestions(): Question[] {
  if (typeof window === "undefined") return SEED_QUESTIONS;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_QUESTIONS));
      return SEED_QUESTIONS;
    }
    const parsed = JSON.parse(raw) as Question[];
    return Array.isArray(parsed) ? parsed : SEED_QUESTIONS;
  } catch {
    return SEED_QUESTIONS;
  }
}

export function saveQuestions(qs: Question[]): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(qs));
  } catch {
    // quota/private-mode: bank stays in memory for the session
  }
}
