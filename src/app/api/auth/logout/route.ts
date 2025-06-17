import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(_request: Request) {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

    // ユーザーのセッションを破棄
    const { error } = await supabase.auth.signOut();

    if (error) {
        return NextResponse.json({ error: "Logout failed" }, { status: 500 });
    }

    return NextResponse.json({ message: "Logout successful" }, { status: 200 });
}
