import { prisma } from "../prisma";
import type { Badge } from "@prisma/client";

export type UserStats = {
    completedLessons: number;
    totalLessons: number;
    earnedBadges: number;
    totalBadges: number;
    overallAccuracy: number;
};

export type BadgeWithUserStatus = Badge & {
    isEarned: boolean;
    earnedAt: Date | null;
};

/**
 * ユーザーの学習統計情報を取得します。
 * @param userId ユーザーID
 * @returns 統計情報オブジェクト
 */
export const getUserStats = async (userId: string): Promise<UserStats> => {
    const [
        completedLessons,
        totalLessons,
        earnedBadges,
        totalBadges,
        userAnswers,
    ] = await Promise.all([
        prisma.userProgress.count({ where: { userId, status: "COMPLETED" } }),
        prisma.lesson.count(),
        prisma.userBadge.count({ where: { userId } }),
        prisma.badge.count(),
        prisma.userAnswer.findMany({
            where: { userId },
            select: { isCorrect: true },
        }),
    ]);

    const correctAnswers = userAnswers.filter((a) => a.isCorrect).length;
    const totalAnswers = userAnswers.length;
    const overallAccuracy =
        totalAnswers > 0 ? (correctAnswers / totalAnswers) * 100 : 0;

    return {
        completedLessons,
        totalLessons,
        earnedBadges,
        totalBadges,
        overallAccuracy,
    };
};

/**
 * 全てのバッジと、ユーザーの獲得状況を取得します。
 * @param userId ユーザーID
 * @returns 獲得状況を含むバッジの配列
 */
export const getAllBadgesWithUserStatus = async (
    userId: string
): Promise<BadgeWithUserStatus[]> => {
    const allBadges = await prisma.badge.findMany();
    const userBadges = await prisma.userBadge.findMany({
        where: { userId },
        select: { badgeId: true, earnedAt: true },
    });

    const earnedBadgeMap = new Map(
        userBadges.map((ub) => [ub.badgeId, ub.earnedAt])
    );

    return allBadges.map((badge) => ({
        ...badge,
        isEarned: earnedBadgeMap.has(badge.id),
        earnedAt: earnedBadgeMap.get(badge.id) || null,
    }));
};
