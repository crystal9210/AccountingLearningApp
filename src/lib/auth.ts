import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import type { User } from "@prisma/client";
import { createServerClient } from "@supabase/ssr";

/**
 * サーバーサイドで現在のログインユーザー情報を取得します。
 * Supabaseの認証情報と、ローカルDBのプロフィール情報を結合して返します。
 * @returns ログインしているユーザーのプロフィール情報、またはnull
 */
export const getCurrentUser = async (): Promise<User | null> => {
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

    // ここで「getUser」を使うのが安全
    const {
        data: { user },
        error: userError,
    } = await supabase.auth.getUser();

    if (userError) {
        console.error("Supabase getUser Error:", userError.message);
        return null;
    }

    if (!user) {
        return null; // ログインしていない
    }

    // 認証ユーザーのIDを使って、Prismaでプロフィール情報を検索
    const userProfile = await prisma.user.findUnique({
        where: { id: user.id },
    });

    if (!userProfile) {
        // Supabase Authには存在するが、ローカルDBにプロフィールがない場合
        console.warn(`User profile not found for auth user ID: ${user.id}`);
        return null;
    }

    return userProfile;
};
