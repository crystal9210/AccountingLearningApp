import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const { email, password } = await request.json();

    if (!email || !password) {
        return NextResponse.json(
            { error: "Email and password are required." },
            { status: 400 }
        );
    }

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
    // Supabase Authでユーザーのサインインを試みる
    const {
        data: { user },
        error,
    } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        // 認証情報が間違っている場合など
        return NextResponse.json(
            { error: "Invalid login credentials." },
            { status: 401 } // 401 Unauthorized
        );
    }

    // ログイン成功
    // Supabase Auth Helperが自動的にセッションCookieを設定してくれる
    return NextResponse.json(
        { message: "Login successful", user },
        { status: 200 }
    );
}
