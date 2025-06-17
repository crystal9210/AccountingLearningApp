import { prisma } from "../prisma";
// Prismaという名前空間をインポート、他の型もPrismaから参照するように
import {
    Prisma,
    type UserProgress,
    type ProgressStatus,
    type UserBadge,
} from "@prisma/client";

/**
 * ユーザーのレッスン進捗を作成または更新します。
 * @param userId ユーザーID
 * @param lessonId レッスンID
 * @param status 新しいステータス
 * @param correctIncrement 正解数の増分
 * @returns 更新された進捗オブジェクト
 */
export const upsertUserProgress = async (
    userId: string,
    lessonId: string,
    status: ProgressStatus,
    correctIncrement: number = 0
): Promise<UserProgress> => {
    const lesson = await prisma.lesson.findUnique({
        where: { id: lessonId },
        select: { _count: { select: { questions: true } } },
    });
    const totalCount = lesson?._count.questions ?? 0;

    return prisma.userProgress.upsert({
        where: {
            userId_lessonId: { userId, lessonId },
        },
        update: {
            status,
            correctCount: {
                increment: correctIncrement,
            },
        },
        create: {
            userId,
            lessonId,
            status,
            correctCount: correctIncrement,
            totalCount: totalCount,
            completedAt: status === "COMPLETED" ? new Date() : undefined,
        },
    });
};

/**
 * 特定のレッスンの進捗を取得します
 * @param userId ユーザーID
 * @param lessonId レッスンID
 * @returns ユーザーの進捗オブジェクト or null
 */
export const findUserProgress = async (
    userId: string,
    lessonId: string
): Promise<UserProgress | null> => {
    return prisma.userProgress.findUnique({
        where: {
            userId_lessonId: { userId, lessonId },
        },
    });
};

/**
 * 特定のバッジをユーザーに付与します。
 * @param userId ユーザーID
 * @param badgeId バッジID
 * @returns 付与されたバッジの関係オブジェクト or null (既に持っている場合)
 */
export const awardBadgeToUser = async (
    userId: string,
    badgeId: string
): Promise<UserBadge | null> => {
    try {
        return await prisma.userBadge.create({
            data: {
                userId,
                badgeId,
            },
        });
    } catch (error) {
        // Prisma.PrismaClientKnownRequestError を使って型を判定します ✅
        if (
            error instanceof Prisma.PrismaClientKnownRequestError &&
            error.code === "P2002"
        ) {
            // 複合主キー制約違反(unique constraint failed)の場合は、既にバッジを持っているためnullを返す
            return null;
        }
        // その他のエラーは再スローする
        throw error;
    }
};
