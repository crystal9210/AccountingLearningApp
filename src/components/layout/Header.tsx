import Link from "next/link";
import { cookies } from "next/headers";
import { Button } from "@/components/ui/button";
import { createServerClient } from "@supabase/ssr";

export async function Header() {
    const cookieStore = await cookies();
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll();
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) =>
                        cookieStore.set(name, value, options)
                    );
                },
            },
        }
    );

    const {
        data: { session },
    } = await supabase.auth.getSession();

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center">
                <Link href="/" className="mr-6 flex items-center space-x-2">
                    <span className="font-bold">会計学習アプリ</span>
                </Link>
                <div className="flex flex-1 items-center justify-end space-x-4">
                    <nav className="flex items-center space-x-2">
                        {session ? (
                            <>
                                <Button variant="ghost" asChild>
                                    <Link href="/dashboard">
                                        ダッシュボード
                                    </Link>
                                </Button>
                                <form action="/api/auth/logout" method="post">
                                    <Button type="submit">ログアウト</Button>
                                </form>
                            </>
                        ) : (
                            <>
                                <Button variant="ghost" asChild>
                                    <Link href="/login">ログイン</Link>
                                </Button>
                                <Button asChild>
                                    <Link href="/register">新規登録</Link>
                                </Button>
                            </>
                        )}
                    </nav>
                </div>
            </div>
        </header>
    );
}
