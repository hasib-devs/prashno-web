"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { EmptyState } from "@/components/ui/data-display";
import { formatBengaliNumber } from "@/lib/utils";
import type { Student } from "@/lib/student-types";
import {
  loadStudents,
  saveStudents,
} from "@/lib/student-store";

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Student | null>(null);
  const [name, setName] = useState("");
  const [roll, setRoll] = useState("");
  const [classLevel, setClassLevel] = useState("");
  const [section, setSection] = useState("");

  useEffect(() => {
    setStudents(loadStudents());
  }, []);

  const resetForm = () => {
    setName("");
    setRoll("");
    setClassLevel("");
    setSection("");
    setEditing(null);
    setShowForm(false);
  };

  const handleSave = () => {
    if (!name.trim() || !roll.trim() || !classLevel.trim()) return;

    let updated: Student[];
    if (editing) {
      updated = students.map((s) =>
        s.id === editing.id
          ? { ...s, name: name.trim(), roll: roll.trim(), classLevel: classLevel.trim(), section: section.trim() }
          : s
      );
    } else {
      const newStudent: Student = {
        id: crypto.randomUUID(),
        name: name.trim(),
        roll: roll.trim(),
        classLevel: classLevel.trim(),
        section: section.trim(),
        createdAt: Date.now(),
      };
      updated = [newStudent, ...students];
    }
    setStudents(updated);
    saveStudents(updated);
    resetForm();
  };

  const handleEdit = (s: Student) => {
    setEditing(s);
    setName(s.name);
    setRoll(s.roll);
    setClassLevel(s.classLevel);
    setSection(s.section);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    const updated = students.filter((s) => s.id !== id);
    setStudents(updated);
    saveStudents(updated);
  };

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-[var(--neutral-950)]">
            শিক্ষার্থী
          </h1>
          <p className="mt-1 text-[var(--neutral-600)]">
            {formatBengaliNumber(students.length)}টি শিক্ষার্থী নিবন্ধিত
          </p>
        </div>
        <Button
          onClick={() => {
            resetForm();
            setShowForm(!showForm);
          }}
        >
          {showForm ? "বাতিল" : "+ নতুন শিক্ষার্থী"}
        </Button>
      </div>

      {showForm && (
        <Card>
          <h3 className="text-lg font-semibold text-[var(--neutral-900)]">
            {editing ? "শিক্ষার্থী সম্পাদনা" : "নতুন শিক্ষার্থী যোগ করুন"}
          </h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Input
              label="নাম"
              placeholder="শিক্ষার্থীর নাম"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              label="রোল নম্বর"
              placeholder="১০১"
              value={roll}
              onChange={(e) => setRoll(e.target.value)}
            />
            <Input
              label="ক্লাস"
              placeholder="অষ্টম"
              value={classLevel}
              onChange={(e) => setClassLevel(e.target.value)}
            />
            <Input
              label="শাখা"
              placeholder="ক"
              value={section}
              onChange={(e) => setSection(e.target.value)}
            />
          </div>
          <div className="mt-4 flex gap-2">
            <Button
              onClick={handleSave}
              disabled={!name.trim() || !roll.trim() || !classLevel.trim()}
            >
              {editing ? "আপডেট" : "যোগ করুন"}
            </Button>
            {editing && (
              <Button variant="secondary" onClick={resetForm}>
                বাতিল
              </Button>
            )}
          </div>
        </Card>
      )}

      {students.length === 0 ? (
        <EmptyState
          title="কোনো শিক্ষার্থী নেই"
          description="নতুন শিক্ষার্থী যোগ করুন"
          action={
            <Button onClick={() => setShowForm(true)}>+ নতুন শিক্ষার্থী</Button>
          }
          icon={<span className="text-4xl">👥</span>}
        />
      ) : (
        <div className="overflow-hidden rounded-[var(--radius-lg)] border border-[var(--neutral-200)] bg-[var(--surface)]">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--neutral-200)] bg-[var(--neutral-50)] text-left text-[var(--neutral-600)]">
                <th className="px-4 py-3 font-medium">#</th>
                <th className="px-4 py-3 font-medium">নাম</th>
                <th className="px-4 py-3 font-medium">রোল</th>
                <th className="px-4 py-3 font-medium">ক্লাস</th>
                <th className="px-4 py-3 font-medium">শাখা</th>
                <th className="px-4 py-3 font-medium text-right">কাজ</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s, i) => (
                <tr
                  key={s.id}
                  className="border-b border-[var(--neutral-100)] last:border-0 hover:bg-[var(--neutral-50)]"
                >
                  <td className="px-4 py-3 text-[var(--neutral-500)]">
                    {formatBengaliNumber(i + 1)}
                  </td>
                  <td className="px-4 py-3 font-medium text-[var(--neutral-900)]">
                    {s.name}
                  </td>
                  <td className="px-4 py-3 text-[var(--neutral-700)]">
                    {s.roll}
                  </td>
                  <td className="px-4 py-3 text-[var(--neutral-700)]">
                    {s.classLevel}
                  </td>
                  <td className="px-4 py-3 text-[var(--neutral-700)]">
                    {s.section || "—"}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(s)}
                      >
                        সম্পাদনা
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(s.id)}
                      >
                        মুছুন
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
