import { LessonCard } from "@/app/dashboard/_components/LessonCard";
import { findLessonsWithUserProgress } from "@/lib/db/lessons";

type Props = {
    userId: string;
};

// LessonList とほぼ同じですが、責務を分離するためにファイルを分けています。
// 今後、表示形式（グリッド/リスト）の切り替えなどの機能追加が容易になります。
export const LessonGrid = async ({ userId }: Props) => {
    const lessons = await findLessonsWithUserProgress(userId);

    if (lessons.length === 0) {
        return (
            <div className="text-center text-muted-foreground py-16">
                <p>現在、受講できるレッスンがありません。</p>
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
