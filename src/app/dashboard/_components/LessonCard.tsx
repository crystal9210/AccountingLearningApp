import Link from "next/link";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Circle, PlayCircle } from "lucide-react";
import type { LessonWithProgress } from "@/lib/db/lessons";

type Props = {
    lesson: LessonWithProgress;
};

export const LessonCard = ({ lesson }: Props) => {
    const status = lesson.progress?.status ?? "NOT_STARTED";
    const questionCount = lesson._count.questions;

    const statusMap = {
        COMPLETED: {
            label: "完了",
            icon: <CheckCircle2 className="mr-2 h-5 w-5 text-accent" />,
            badgeVariant: "default" as const,
            buttonText: "復習する",
        },
        IN_PROGRESS: {
            label: "学習中",
            icon: <PlayCircle className="mr-2 h-5 w-5 text-primary" />,
            badgeVariant: "secondary" as const,
            buttonText: "続きを読む",
        },
        NOT_STARTED: {
            label: "未着手",
            icon: <Circle className="mr-2 h-5 w-5 text-muted-foreground" />,
            badgeVariant: "outline" as const,
            buttonText: "学習を始める",
        },
    };

    const currentStatus = statusMap[status];

    return (
        <Card className="flex flex-col h-full shadow-sm hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
                <div className="flex justify-between items-start">
                    <Badge variant={currentStatus.badgeVariant}>
                        {currentStatus.label}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                        全{questionCount}問
                    </span>
                </div>
                <CardTitle className="mt-2">{lesson.title}</CardTitle>
                <CardDescription>{lesson.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow flex items-end">
                <Link href={`/lessons/${lesson.id}`} className="w-full">
                    <Button
                        className="w-full"
                        variant={status === "COMPLETED" ? "outline" : "default"}
                    >
                        {currentStatus.icon}
                        {currentStatus.buttonText}
                    </Button>
                </Link>
            </CardContent>
        </Card>
    );
};
