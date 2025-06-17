import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { BadgeWithUserStatus } from "@/lib/db/stats";

type Props = {
    badge: BadgeWithUserStatus;
};

export const BadgeCard = ({ badge }: Props) => {
    return (
        <Card
            className={cn(
                "text-center transition-all duration-300",
                badge.isEarned ? "border-accent shadow-lg" : "bg-secondary"
            )}
        >
            <CardHeader className="items-center">
                <div
                    className={cn(
                        "w-24 h-24 rounded-full flex items-center justify-center",
                        badge.isEarned ? "bg-accent/10" : "bg-muted"
                    )}
                >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={badge.iconUrl}
                        alt={badge.name}
                        className={cn(
                            "w-16 h-16",
                            !badge.isEarned && "opacity-30 grayscale"
                        )}
                    />
                </div>
            </CardHeader>
            <CardContent>
                <CardTitle
                    className={cn(!badge.isEarned && "text-muted-foreground")}
                >
                    {badge.name}
                </CardTitle>
                <CardDescription className="mt-2 h-10">
                    {badge.description}
                </CardDescription>
                {badge.isEarned && badge.earnedAt && (
                    <p className="text-xs text-accent mt-4">
                        {new Date(badge.earnedAt).toLocaleDateString()} に獲得
                    </p>
                )}
            </CardContent>
        </Card>
    );
};
