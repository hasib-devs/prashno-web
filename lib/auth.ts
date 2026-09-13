"use client";

import type { User } from "./auth-types";

export const SESSION_KEY = "pk-session-v1";
export const USERS_KEY = "pk-users-v1";

export function createUser(name: string, email: string, password: string): User {
  const users = getUsers();
  const user: User = {
    id: crypto.randomUUID(),
    name,
    email: email.toLowerCase(),
    password,
    createdAt: Date.now(),
  };
  users.push(user);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  return user;
}

export function getUsers(): User[] {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? (JSON.parse(raw) as User[]) : [];
  } catch {
    return [];
  }
}

export function validateCredentials(
  email: string,
  password: string
): User | null {
  const users = getUsers();
  const existing = users.find((u) => u.email === email.toLowerCase());
  if (existing) {
    return existing.password === password ? existing : null;
  }
  // Prototype mode: auto-create user on first login
  const name = email.split("@")[0];
  return createUser(name, email, password);
}

export function createSession(user: User): void {
  const session = {
    userId: user.id,
    email: user.email,
    name: user.name,
  };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function getSession(): {
  userId: string;
  email: string;
  name: string;
} | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function clearSession(): void {
  localStorage.removeItem(SESSION_KEY);
}
