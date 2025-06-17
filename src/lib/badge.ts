import { prisma } from "./prisma";
import { awardBadgeToUser } from "./db/progress"; // 将来的に progress.ts から移動
import type { Badge } from "@prisma/client";

/**
 * レッスン完了に基づき、獲得可能なバッジを確認・付与します。
 * @param userId ユーザーID
 * @param lessonId 完了したレッスンID
 * @returns 新しく獲得したバッジの配列
 */
export const checkAndAwardLessonCompletionBadges = async (
    userId: string,
    lessonId: string
): Promise<Badge[]> => {
    const awardedBadges: Badge[] = [];

    // TODO: ここにバッジ獲得ロジックを実装
    // 例1: 「初めてのレッスン完了」バッジ
    // 例2: 特定の難易度のレッスンをクリアしたバッジ
    // 例3: 全レッスンをクリアしたバッジ

    // ダミーのロジック: 'clwdu9ztd000008l5c27g7w3c'をクリアしたらバッジを付与
    const FIRST_LESSON_ID = "clwdu9ztd000008l5c27g7w3c";
    const FIRST_CLEAR_BADGE_ID = "clweo1g2y000008l5e8agf9z8"; // seedデータで作成するバッジID

    if (lessonId === FIRST_LESSON_ID) {
        const newBadge = await awardBadgeToUser(userId, FIRST_CLEAR_BADGE_ID);
        if (newBadge) {
            const badgeInfo = await prisma.badge.findUnique({
                where: { id: FIRST_CLEAR_BADGE_ID },
            });
            if (badgeInfo) awardedBadges.push(badgeInfo);
        }
    }

    return awardedBadges;
};

// prisma/seed.ts に以下のバッジを追加してください
/*
  await prisma.badge.create({
    data: {
      id: 'clweo1g2y000008l5e8agf9z8',
      name: '最初の一歩',
      description: '初めてのレッスンを完了しました！',
      iconUrl: '/badges/first-step.svg', // SVGアイコンのパス
      conditionType: 'LESSON_COMPLETION',
      conditionValue: 1
    }
  });
*/
