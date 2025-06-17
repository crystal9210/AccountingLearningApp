import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
    const { email, password, name } = await request.json();

    if (!email || !password || !name) {
        return NextResponse.json(
            { error: "Email, password, and name are required." },
            { status: 400 }
        );
    }

    const cookieStore = cookies();
    // Route Handler専用のSupabaseクライアントを作成
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

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
