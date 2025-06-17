"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { FeedbackBanner } from "./FeedbackBanner";
import type { Lesson, Question } from "@prisma/client";
import { Loader2, ArrowRight } from "lucide-react";

type Props = {
    lesson: Lesson;
    question: Question;
    userId: string;
    nextQuestionId: string | null;
};

export function QuestionClient({
    lesson,
    question,
    userId,
    nextQuestionId,
}: Props) {
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [explanation, setExplanation] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleCheck = async () => {
        if (!selectedAnswer) return;
        setIsLoading(true);

        try {
            const res = await fetch("/api/lessons/answer", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId,
                    lessonId: lesson.id,
                    questionId: question.id,
                    userAnswer: [selectedAnswer],
                }),
            });
            const data = await res.json();
            setIsCorrect(data.isCorrect);
            setExplanation(data.explanation);
        } catch (error) {
            console.error("Failed to check answer", error);
            // TODO: エラーハンドリングUI
        } finally {
            setIsSubmitted(true);
            setIsLoading(false);
        }
    };

    const handleNext = () => {
        if (nextQuestionId) {
            router.push(`/lessons/${lesson.id}/questions/${nextQuestionId}`);
        } else {
            // 最後の問題の場合はダッシュボードに戻る
            router.push("/dashboard");
            // TODO: 「レッスン完了」ページに遷移させるのが望ましい
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-secondary p-4">
            <Card className="w-full max-w-2xl">
                <CardHeader>
                    <CardDescription>{lesson.title}</CardDescription>
                    <CardTitle>{question.questionText}</CardTitle>
                </CardHeader>
                <CardContent>
                    <RadioGroup
                        value={selectedAnswer ?? ""}
                        onValueChange={setSelectedAnswer}
                        disabled={isSubmitted}
                        className="space-y-4"
                    >
                        {question.choices.map((choice, index) => (
                            <div
                                key={index}
                                className="flex items-center space-x-2"
                            >
                                <RadioGroupItem
                                    value={choice}
                                    id={`r${index}`}
                                />
                                <Label
                                    htmlFor={`r${index}`}
                                    className="text-base"
                                >
                                    {choice}
                                </Label>
                            </div>
                        ))}
                    </RadioGroup>

                    <div className="mt-8">
                        {isSubmitted ? (
                            <Button onClick={handleNext} className="w-full">
                                {nextQuestionId
                                    ? "次の問題へ"
                                    : "ダッシュボードへ戻る"}
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        ) : (
                            <Button
                                onClick={handleCheck}
                                disabled={!selectedAnswer || isLoading}
                                className="w-full"
                            >
                                {isLoading && (
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                )}
                                解答を確認
                            </Button>
                        )}
                    </div>

                    {isSubmitted && isCorrect !== null && (
                        <div className="mt-6">
                            <FeedbackBanner
                                isCorrect={isCorrect}
                                explanation={explanation}
                            />
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
