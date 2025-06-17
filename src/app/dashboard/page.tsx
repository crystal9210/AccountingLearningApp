import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { LessonList } from "./_components/LessonList";
import { Suspense } from "react";
import { getUserStats, getAllBadgesWithUserStatus } from "@/lib/db/stats";
import { StatsCard } from "@/components/profile/StatsCard";
import { BadgeCard } from "@/components/badges/BadgeCard";
import { BookCheck, Star, Trophy, Percent } from "lucide-react";

export default async function DashboardPage() {
    const user = await getCurrentUser();
    if (!user) redirect("/login");

    const [stats, allBadges] = await Promise.all([
        getUserStats(user.id),
        getAllBadgesWithUserStatus(user.id),
    ]);
    const recentBadges = allBadges.filter((b) => b.isEarned).slice(0, 3); // 直近3つ

    return (
        <div className="min-h-screen bg-secondary">
            <div className="container mx-auto p-4 sm:p-6 lg:p-8">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold">
                        ようこそ、{user.name || user.email}さん！
                    </h1>
                </header>

                {/* 統計サマリー */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
                    <StatsCard
                        title="完了レッスン"
                        value={`${stats.completedLessons} / ${stats.totalLessons}`}
                        Icon={BookCheck}
                    />
                    <StatsCard
                        title="獲得バッジ"
                        value={`${stats.earnedBadges} / ${stats.totalBadges}`}
                        Icon={Trophy}
                    />
                    <StatsCard
                        title="平均正解率"
                        value={`${stats.overallAccuracy.toFixed(0)}%`}
                        Icon={Percent}
                    />
                    <StatsCard title="総合スコア" value="1,250" Icon={Star} />{" "}
                    {/* TODO: スコアロジック */}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        <Card className="shadow-sm">
                            <CardHeader>
                                <CardTitle>レッスン一覧</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Suspense
                                    fallback={<p>レッスンを読み込み中...</p>}
                                >
                                    <LessonList userId={user.id} />
                                </Suspense>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="space-y-6">
                        <Card className="shadow-sm">
                            <CardHeader>
                                <CardTitle>最近獲得したバッジ</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {recentBadges.length > 0 ? (
                                    <div className="space-y-4">
                                        {recentBadges.map((badge) => (
                                            <BadgeCard
                                                key={badge.id}
                                                badge={badge}
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-center text-muted-foreground py-8">
                                        まだバッジがありません。
                                    </p>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
