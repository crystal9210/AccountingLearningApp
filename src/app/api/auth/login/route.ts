import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
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

    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

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
