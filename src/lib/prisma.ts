import { PrismaClient } from "@prisma/client";

// 型定義: グローバルオブジェクトにprismaを追加
const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined;
};

// Prisma Clientのインスタンスを生成または再利用
export const prisma =
    globalForPrisma.prisma ??
    new PrismaClient({
        log: ["error"], // 必要なら "query" なども追加可
        errorFormat: "minimal",
    });

// 開発環境ではグローバルに保存して再利用（ホットリロード対策）
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
