import { redirect } from "next/navigation";
import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { findUserProgress } from "@/lib/db/progress";
import { prisma } from "@/lib/prisma";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Award, RotateCcw, Home } from "lucide-react";
import { checkAndAwardLessonCompletionBadges } from "@/lib/badge";
import { Confetti } from "@/components/ui/Confetti";

type Props = {
    params: { lessonId: string };
};

export default async function LessonResultsPage({ params }: Props) {
    const user = await getCurrentUser();
    if (!user) {
        redirect("/login");
    }

    const [lesson, progress] = await Promise.all([
        prisma.lesson.findUnique({ where: { id: params.lessonId } }),
        findUserProgress(user.id, params.lessonId),
    ]);

    if (!lesson || !progress) {
        return redirect("/dashboard");
    }

    const newBadges = await checkAndAwardLessonCompletionBadges(
        user.id,
        lesson.id
    );

    const accuracy =
        progress.totalCount > 0
            ? (progress.correctCount / progress.totalCount) * 100
            : 0;

    return (
        <>
            <Confetti />
            <div className="flex flex-col justify-center items-center min-h-screen bg-secondary p-4">
                <Card className="w-full max-w-2xl text-center shadow-2xl">
                    <CardHeader>
                        <div className="mx-auto bg-accent rounded-full p-4 w-fit">
                            <Award className="h-12 w-12 text-accent-foreground" />
                        </div>
                        <CardTitle className="text-3xl font-bold mt-4">
                            おめでとうございます！
                        </CardTitle>
                        <CardDescription className="text-lg">
                            {lesson.title} を完了しました。
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="text-center">
                            <p className="text-muted-foreground">
                                あなたのスコア
                            </p>
                            <p className="text-5xl font-bold">
                                {progress.correctCount} / {progress.totalCount}
                            </p>
                            <p className="text-2xl font-semibold text-primary">
                                {accuracy.toFixed(0)}%
                            </p>
                        </div>
                        {newBadges.length > 0 && (
                            <div className="p-4 bg-primary/10 rounded-lg">
                                <h3 className="font-bold text-primary">
                                    新しいバッジを獲得しました！
                                </h3>
                                {newBadges.map((badge) => (
                                    <p key={badge.id}>「{badge.name}」</p>
                                ))}
                            </div>
                        )}
                    </CardContent>
                    <CardFooter className="flex flex-col sm:flex-row gap-4">
                        <Link href={`/lessons/${lesson.id}`} className="w-full">
                            <Button variant="outline" className="w-full">
                                <RotateCcw className="mr-2 h-4 w-4" />
                                もう一度挑戦する
                            </Button>
                        </Link>
                        <Link href="/dashboard" className="w-full">
                            <Button className="w-full">
                                <Home className="mr-2 h-4 w-4" />
                                ダッシュボードに戻る
                            </Button>
                        </Link>
                    </CardFooter>
                </Card>
            </div>
        </>
    );
}
