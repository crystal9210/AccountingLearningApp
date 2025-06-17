import { prisma } from "../prisma";
import type { Question, UserAnswer, Prisma } from "@prisma/client";

/**
 * レッスンに含まれる全ての問題を取得します。
 * @param lessonId レッスンID
 * @returns 問題の配列
 */
export const findQuestionsByLessonId = async (
    lessonId: string
): Promise<Question[]> => {
    return prisma.question.findMany({
        where: { lessonId },
        orderBy: { order: "asc" },
    });
};

/**
 * ユーザーの回答を記録します。
 * @param data ユーザーの回答データ
 * @returns 作成された回答オブジェクト
 */
export const createUserAnswer = async (
    data: Prisma.UserAnswerUncheckedCreateInput
): Promise<UserAnswer> => {
    return prisma.userAnswer.create({ data });
};

/**
 * ユーザーの回答履歴（最新のもの）と合わせて問題を取得します。
 * @param questionId 問題ID
 * @param userId ユーザーID
 * @returns 問題と最新の回答履歴
 */
export const findQuestionWithLatestAnswer = async (
    questionId: string,
    userId: string
): Promise<(Question & { latestAnswer: UserAnswer | null }) | null> => {
    const question = await prisma.question.findUnique({
        where: { id: questionId },
        include: {
            answers: {
                where: { userId },
                orderBy: { answeredAt: "desc" },
                take: 1,
            },
        },
    });

    if (!question) return null;

    return {
        ...question,
        latestAnswer: question.answers.length > 0 ? question.answers[0] : null,
    };
};

/**
 * IDで単一の問題を取得します。
 * @param questionId 問題ID
 * @returns 問題オブジェクト or null
 */
export const findQuestionById = async (
    questionId: string
): Promise<Question | null> => {
    return prisma.question.findUnique({
        where: { id: questionId },
    });
};

/**
 * 指定された問題の「次の問題」のIDを取得します。
 * @param lessonId レッスンID
 * @param currentQuestionOrder 現在の問題のorder
 * @returns 次の問題のID or null (次の問題がない場合)
 */
export const findNextQuestionId = async (
    lessonId: string,
    currentQuestionOrder: number
): Promise<string | null> => {
    const nextQuestion = await prisma.question.findFirst({
        where: {
            lessonId: lessonId,
            order: {
                gt: currentQuestionOrder, // 現在のorderより大きい
            },
        },
        orderBy: {
            order: "asc", // その中で最も小さいorder
        },
        select: {
            id: true,
        },
    });
    return nextQuestion?.id ?? null;
};
