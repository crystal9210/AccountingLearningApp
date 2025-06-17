import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { getAllBadgesWithUserStatus } from "@/lib/db/stats";
import { BadgeCard } from "@/components/badges/BadgeCard";

export default async function BadgesPage() {
    const user = await getCurrentUser();
    if (!user) redirect("/login");

    const allBadges = await getAllBadgesWithUserStatus(user.id);

    return (
        <div className="container mx-auto p-4 sm:p-6 lg:p-8">
            <header className="mb-8">
                <h1 className="text-3xl font-bold">バッジコレクション</h1>
                <p className="text-muted-foreground">あなたの学習の証です。</p>
            </header>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {allBadges.map((badge) => (
                    <BadgeCard key={badge.id} badge={badge} />
                ))}
            </div>
        </div>
    );
}
