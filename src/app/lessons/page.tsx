import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { LessonGrid } from "@/components/lessons/LessonGrid";
import { Suspense } from "react";

export default async function LessonsPage() {
    const user = await getCurrentUser();
    if (!user) {
        // ログインしていない場合はログインページへ
        redirect("/login");
    }

    return (
        <div className="container mx-auto p-4 sm:p-6 lg:p-8">
            <header className="mb-8">
                <h1 className="text-3xl font-bold">レッスンカタログ</h1>
                <p className="text-muted-foreground">
                    興味のあるレッスンを選んで学習を始めましょう。
                </p>
            </header>

            <main>
                <Suspense fallback={<p>レッスンを読み込み中...</p>}>
                    <LessonGrid userId={user.id} />
                </Suspense>
            </main>
        </div>
    );
}
