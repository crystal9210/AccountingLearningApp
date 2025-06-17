import { findLessonsWithUserProgress } from "@/lib/db/lessons";
import { LessonCard } from "./LessonCard";

type Props = {
    userId: string;
};

export const LessonList = async ({ userId }: Props) => {
    const lessons = await findLessonsWithUserProgress(userId);

    if (lessons.length === 0) {
        return (
            <div className="text-center text-muted-foreground py-16">
                <p>現在、受講できるレッスンがありません。</p>
                <p>新しいレッスンが追加されるのをお待ちください。</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {lessons.map((lesson) => (
                <LessonCard key={lesson.id} lesson={lesson} />
            ))}
        </div>
    );
};
