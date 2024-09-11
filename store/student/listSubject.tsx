import { create } from "zustand";

interface Course {
  id: number;
  name: string;
  description: string;
}

export interface Subject {
  course: Course;
  midterm: string | null;
  final: string | null;
  additional_grade_1: string | null;
  additional_grade_2: string | null;
  additional_grade_3: string | null;
}

interface ListSubjectStore {
  subjects: Subject[];
  setSubjects: (newSubjects: Subject[]) => void;
  addSubject: (subject: Subject) => void;
  updateSubject: (id: number, updatedSubject: Partial<Subject>) => void;
  removeSubject: (id: number) => void;
}

const initialSubjects: Subject[] = [];

const useListSubjectStore = create<ListSubjectStore>((set) => ({
  subjects: initialSubjects,
  setSubjects: (newSubjects: Subject[]) => set({ subjects: newSubjects }),
  addSubject: (subject: Subject) =>
    set((state) => ({
      subjects: [...state.subjects, subject],
    })),
  updateSubject: (id: number, updatedSubject: Partial<Subject>) =>
    set((state) => ({
      subjects: state.subjects.map((subject) =>
        subject.course.id === id ? { ...subject, ...updatedSubject } : subject
      ),
    })),
  removeSubject: (id: number) =>
    set((state) => ({
      subjects: state.subjects.filter((subject) => subject.course.id !== id),
    })),
}));

export default useListSubjectStore;
