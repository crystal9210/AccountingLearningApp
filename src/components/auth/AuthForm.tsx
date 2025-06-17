"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

type Props = {
    mode: "login" | "register";
};

export function AuthForm({ mode }: Props) {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const title = mode === "login" ? "ログイン" : "新規登録";
    const description =
        mode === "login"
            ? "メールアドレスとパスワードを入力してください。"
            : "アカウントを作成します。";

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        const endpoint =
            mode === "login" ? "/api/auth/login" : "/api/auth/register";
        const body =
            mode === "login"
                ? JSON.stringify({ email, password })
                : JSON.stringify({ name, email, password });

        try {
            const res = await fetch(endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body,
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || "何らかのエラーが発生しました。");
            }

            // 成功したらダッシュボードにリダイレクト
            router.push("/dashboard");
            router.refresh(); // サーバーの状態を更新するために重要
        } catch (err) {
            if (err instanceof Error) setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-secondary">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">{title}</CardTitle>
                    <CardDescription>{description}</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {mode === "register" && (
                            <div className="space-y-2">
                                <Label htmlFor="name">お名前</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="会計 太郎"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                        )}
                        <div className="space-y-2">
                            <Label htmlFor="email">メールアドレス</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="email@example.com"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">パスワード</Label>
                            <Input
                                id="password"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        {error && (
                            <p className="text-sm font-medium text-destructive">
                                {error}
                            </p>
                        )}
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={isLoading}
                        >
                            {isLoading && (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            {title}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
