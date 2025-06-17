import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { getUserStats } from "@/lib/db/stats";
import { StatsCard } from "@/components/profile/StatsCard";
import { BookCheck, Trophy, Percent, Star } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default async function ProfilePage() {
    const user = await getCurrentUser();
    if (!user) redirect("/login");

    const stats = await getUserStats(user.id);
    const userInitial = user.name
        ? user.name.charAt(0).toUpperCase()
        : user.email.charAt(0).toUpperCase();

    return (
        <div className="container mx-auto p-4 sm:p-6 lg:p-8">
            <header className="mb-8 flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                    <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="@shadcn"
                    />
                    <AvatarFallback>{userInitial}</AvatarFallback>
                </Avatar>
                <div>
                    <h1 className="text-3xl font-bold">
                        {user.name || "No Name"}
                    </h1>
                    <p className="text-muted-foreground">{user.email}</p>
                </div>
            </header>

            <Card>
                <CardHeader>
                    <CardTitle>学習統計</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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
                </CardContent>
            </Card>
        </div>
    );
}
