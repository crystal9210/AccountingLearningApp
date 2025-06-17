import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { findQuestionById, findNextQuestionId } from "@/lib/db/questions";
import { QuestionClient } from "./_components/QuestionClient";
import { prisma } from "@/lib/prisma";

type Props = {
    params: Promise<{
        lessonId: string;
        questionId: string;
    }>;
};

export default async function QuestionPage({ params }: Props) {
    const user = await getCurrentUser();
    if (!user) {
        redirect("/login");
    }

    const { lessonId, questionId } = await params;

    const [question, lesson] = await Promise.all([
        findQuestionById(questionId),
        prisma.lesson.findUnique({ where: { id: lessonId } }),
    ]);

    if (!question || !lesson) {
        return redirect("/dashboard");
    }

    const nextQuestionId = await findNextQuestionId(lesson.id, question.order);

    return (
        <QuestionClient
            lesson={lesson}
            question={question}
            userId={user.id}
            nextQuestionId={nextQuestionId}
        />
    );
}
