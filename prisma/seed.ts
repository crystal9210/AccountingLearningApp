import { PrismaClient, QuestionType } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    console.log("Start seeding ...");

    // 既存のデータをクリーンアップ
    await prisma.question.deleteMany();
    await prisma.lesson.deleteMany();

    const lessonsData = [
        {
            id: "clwdu9ztd000008l5c27g7w3c",
            title: "簿記3級 - 仕訳の基礎",
            description:
                "すべての基本となる仕訳のルールを学びます。借方と貸方の概念をマスターしましょう。",
            level: 1,
            order: 1,
        },
        {
            id: "clwdua5q1000108l5e0gnh5p1",
            title: "財務諸表入門 - 損益計算書(P/L)",
            description:
                "企業の「成績表」である損益計算書の読み方と、主要な勘定科目を学びます。",
            level: 2,
            order: 2,
        },
        {
            id: "clwdua9yq000208l5bnh03a8v",
            title: "財務諸表入門 - 貸借対照表(B/S)",
            description:
                "企業の「財産リスト」である貸借対照表の構造を理解します。",
            level: 2,
            order: 3,
        },
        {
            id: "clwdub3f1000308l5hfg3a6c2",
            title: "実践！減価償却の計算",
            description:
                "固定資産の価値の減少を会計に反映させる、減価償却の計算方法を学びます。",
            level: 3,
            order: 4,
        },
    ];

    await prisma.lesson.createMany({
        data: lessonsData,
    });

    // 各レッスンに問題を紐付け
    await prisma.question.create({
        data: {
            lessonId: "clwdu9ztd000008l5c27g7w3c",
            questionText:
                "現金100円を資本金として事業を開始した。この時の仕訳として正しいものは？",
            type: QuestionType.MULTIPLE_CHOICE,
            choices: [
                "(借) 現金 100 / (貸) 売上 100",
                "(借) 現金 100 / (貸) 資本金 100",
                "(借) 資本金 100 / (貸) 現金 100",
            ],
            correctAnswer: ["(借) 現金 100 / (貸) 資本金 100"],
            explanation:
                "事業を開始するために元手となるお金（資本金）が増え、同時に会社（事業）の現金も増えるため、この仕訳となります。",
            tips: ["資産の増加は借方（左側）", "資本の増加は貸方（右側）"],
            order: 1,
        },
    });

    // 他の問題も同様に作成...

    console.log("Seeding finished.");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
