import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { LessonList } from "./_components/LessonList";
import { Suspense } from "react";

export default async function DashboardPage() {
    const user = await getCurrentUser();

    if (!user) {
        redirect("/login");
    }

    return (
        <div className="min-h-screen bg-secondary">
            <div className="container mx-auto p-4 sm:p-6 lg:p-8">
                <header className="mb-8">
                    <div className="space-y-1">
                        <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                            ダッシュボード
                        </h1>
                        <p className="text-muted-foreground">
                            ようこそ、{user.name || user.email}
                            さん！学習の進捗を確認しましょう。
                        </p>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        <Card className="shadow-sm">
                            <CardHeader>
                                <CardTitle>レッスン一覧</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {/* LessonListをSuspenseでラップ */}
                                <Suspense
                                    fallback={<p>レッスンを読み込み中...</p>}
                                >
                                    <LessonList userId={user.id} />
                                </Suspense>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="space-y-6">
                        <Card className="shadow-sm">
                            <CardHeader>
                                <CardTitle>学習の進捗</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-center text-muted-foreground py-8">
                                    (ここに進捗グラフが表示されます)
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
