export interface User {
    id: string;
    name: string;
    email: string;
    passwordHash: string;
    progress: { [lessonId: string]: number };
    badges: string[];
}

export interface LessonItem {
    inputItem: string[]; // this field's value is dynamically determined in the runtime.
    questionText: string;
    type: "input" | "multiple-choice" | "sorting";
    answer: string[];
    hints: string[];
    explanation: string[];
    tips: string[];
    notes: string[]; // user use this field for the notes during answering the question (,chatting with llm.)
}

export interface Lesson {
    id: string;
    title: string;
    description: string;
    level: number;
    order: number;
    questions: LessonItem[];
}

export interface Badge {
    id: string;
    name: string;
    description: string;
    condition: string; // TODO 堅牢化 | e.g. "全レッスンクリア"
}
