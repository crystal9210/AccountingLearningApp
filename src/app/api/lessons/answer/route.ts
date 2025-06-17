import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { findQuestionById } from "@/lib/db/questions";
import { upsertUserProgress } from "@/lib/db/progress";

export async function POST(request: Request) {
    const user = await getCurrentUser();
    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { questionId, userAnswer, lessonId } = await request.json();
    if (!questionId || !userAnswer || !lessonId) {
        return NextResponse.json(
            { error: "Missing required fields" },
            { status: 400 }
        );
    }

    const question = await findQuestionById(questionId);
    if (!question) {
        return NextResponse.json(
            { error: "Question not found" },
            { status: 404 }
        );
    }

    const isCorrect =
        JSON.stringify(question.correctAnswer.sort()) ===
        JSON.stringify(userAnswer.sort());

    // ▼▼▼ 修正箇所 ▼▼▼
    // createdAnswer を使わないので、カンマで無視します
    const [, progress] = await Promise.all([
        prisma.userAnswer.create({
            data: {
                userId: user.id,
                questionId: questionId,
                userAnswer: userAnswer,
                isCorrect: isCorrect,
            },
        }),
        upsertUserProgress(user.id, lessonId, "IN_PROGRESS", isCorrect ? 1 : 0),
    ]);
    // ▲▲▲ 修正箇所 ▲▲▲

    const answeredCount = await prisma.userAnswer.count({
        where: {
            userId: user.id,
            question: {
                lessonId: lessonId,
            },
        },
    });

    if (progress.totalCount > 0 && answeredCount >= progress.totalCount) {
        await prisma.userProgress.update({
            where: {
                userId_lessonId: {
                    userId: user.id,
                    lessonId: lessonId,
                },
            },
            data: {
                status: "COMPLETED",
                completedAt: new Date(),
            },
        });
    }

    return NextResponse.json({
        isCorrect,
        explanation: question.explanation,
    });
}
