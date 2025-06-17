import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createServerClient } from "@supabase/ssr";

export async function POST(request: Request) {
    const { email, password, name } = await request.json();

    if (!email || !password || !name) {
        return NextResponse.json(
            { error: "Email, password, and name are required." },
            { status: 400 }
        );
    }

    const cookieStore = await cookies();
    // Route Handler専用のSupabaseクライアントを作成
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

    // 1. Supabase Authでユーザーを作成
    const {
        data: { user },
        error: signUpError,
    } = await supabase.auth.signUp({
        email,
        password,
        options: {
            // nameをSupabaseのuser_metadataに保存
            data: {
                name: name,
            },
            emailRedirectTo:
                "https://accounting-learning-quufz7n8e-yutosekis-projects.vercel.app",
        },
    });

    if (signUpError) {
        return NextResponse.json(
            { error: signUpError.message },
            { status: 400 }
        );
    }

    // signUpが成功しても、メール認証が有効な場合はuserがnullになることがある
    // ここではuserが返されることを期待する（テスト環境など）
    if (!user) {
        return NextResponse.json(
            {
                message:
                    "Sign up successful, please check your email to verify.",
            },
            { status: 200 }
        );
    }

    try {
        // 2. Supabase AuthのIDを使用して、public.usersテーブルにプロフィールを作成
        await prisma.user.create({
            data: {
                id: user.id, // Supabase AuthのユーザーIDを主キーとして使用
                email: user.email!,
                name: name,
            },
        });

        return NextResponse.json(
            { message: "User created successfully", user },
            { status: 201 }
        );
    } catch (dbError) {
        // DBへの書き込みでエラーが発生した場合の処理
        // ここでSupabase Authからユーザーを削除するクリーンアップ処理を入れることも可能
        console.error("Database Error:", dbError);
        return NextResponse.json(
            { error: "Failed to create user profile in database." },
            { status: 500 }
        );
    }
}
