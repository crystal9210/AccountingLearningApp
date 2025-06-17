import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// NOTE: supabase.auth.signOut(): 現在のリクエストに紐づくセッション（= Cookieのユーザー）をログアウトさせるため、「どのユーザーをログアウトするか」は、APIの呼び出し元のCookie（セッション情報）によって自動的に判別される。
// API内でユーザーIDなどを明示的に指定する必要はない。
export async function POST() {
    // ← 引数を削除
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
    // ユーザーのセッションを破棄
    const { error } = await supabase.auth.signOut();

    if (error) {
        return NextResponse.json({ error: "Logout failed" }, { status: 500 });
    }

    return NextResponse.json({ message: "Logout successful" }, { status: 200 });
}
