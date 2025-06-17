import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

type Props = {
    params: {
        lessonId: string;
    };
};

export default async function LessonStartPage({ params }: Props) {
    const user = await getCurrentUser();
    if (!user) {
        redirect("/login");
    }

    const { lessonId } = await params;

    // このレッスンの最初の問題を取得
    const firstQuestion = await prisma.question.findFirst({
        where: { lessonId: lessonId },
        orderBy: { order: "asc" },
        select: { id: true },
    });

    if (!firstQuestion) {
        // 問題がない場合はダッシュボードに戻す
        return redirect("/dashboard");
    }

    // 最初の問題のページにリダイレクト
    redirect(`/lessons/${lessonId}/questions/${firstQuestion.id}`);
}
