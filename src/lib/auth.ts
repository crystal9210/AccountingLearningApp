import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import type { User } from "@prisma/client";

/**
 * サーバーサイドで現在のログインユーザー情報を取得します。
 * Supabaseの認証情報と、ローカルDBのプロフィール情報を結合して返します。
 * @returns ログインしているユーザーのプロフィール情報、またはnull
 */
export const getCurrentUser = async (): Promise<User | null> => {
    const cookieStore = cookies();
    // サーバーコンポーネント専用のSupabaseクライアントを作成
    const supabase = createServerComponentClient({
        cookies: () => cookieStore,
    });

    // 現在のセッションから認証ユーザー情報を取得
    const {
        data: { session },
        error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError) {
        console.error("Session Error:", sessionError.message);
        return null;
    }

    if (!session) {
        return null; // ログインしていない
    }

    // 認証ユーザーのIDを使って、Prismaでプロフィール情報を検索
    const userProfile = await prisma.user.findUnique({
        where: { id: session.user.id },
    });

    if (!userProfile) {
        // Supabase Authには存在するが、ローカルDBにプロフィールがない場合
        // 本来は発生しづらいが、念のためログを出力
        console.warn(
            `User profile not found for auth user ID: ${session.user.id}`
        );
        return null;
    }

    return userProfile;
};
