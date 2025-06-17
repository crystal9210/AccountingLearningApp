import { prisma } from "../prisma";
import { Lesson, UserProgress } from "@prisma/client";

// 進捗情報を含むレッスン型
export type LessonWithProgress = Lesson & {
    progress: UserProgress | null;
    _count: {
        questions: number;
        progresses: number;
        // 他にカウントしたいリレーションがあればここに追加
    };
};

/**
 * すべてのレッスンをユーザーの進捗状況と合わせて取得します。
 * @param userId ユーザーID
 * @returns 進捗情報を含むレッスンの配列
 */
export const findLessonsWithUserProgress = async (
    userId: string
): Promise<LessonWithProgress[]> => {
    const lessons = await prisma.lesson.findMany({
        orderBy: { order: "asc" },
        include: {
            progresses: {
                where: { userId },
            },
            _count: {
                select: {
                    questions: true,
                    progresses: true,
                },
            },
        },
    });

    // progressesは配列なので、最初の要素またはnullをセット
    return lessons.map((lesson) => ({
        ...lesson,
        progress: lesson.progresses[0] ?? null,
    }));
};

/**
 * IDで単一のレッスンを取得します。
 * @param lessonId レッスンID
 * @returns レッスンオブジェクト or null
 */
export const findLessonById = async (
    lessonId: string
): Promise<Lesson | null> => {
    return prisma.lesson.findUnique({
        where: { id: lessonId },
    });
};

/**
 * (管理者用) 新しいレッスンを作成します。
 * @param data レッスンのデータ
 * @returns 作成されたレッスンオブジェクト
 */
export const createLesson = async (
    data: Omit<Lesson, "id" | "createdAt" | "updatedAt">
): Promise<Lesson> => {
    return prisma.lesson.create({ data });
};
