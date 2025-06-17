承知しました。
**体験型会計学習アプリ**のための具体的な機能要件ドキュメント（詳細設計書レベル）を、
「ドメイン特有の学習体験」や「運用・拡張性」も踏まえて整理します。
**一切省略せず、各機能・体験・運用面を網羅的に記述します。**

---

# 体験型会計学習アプリ 機能要件・設計ドキュメント

---

## 1. ドメイン特有の学習体験

### 1-1. 会計学習の本質体験

-   **仕訳帳・総勘定元帳の記入体験**
    -   取引を見て仕訳を入力し、帳簿に転記する UI
    -   仕訳から試算表、決算書作成までの一連の流れを体験
-   **決算書作成シミュレーション**
    -   試算表から損益計算書・貸借対照表を自分で作成
    -   数値入力・ドラッグ&ドロップ対応
-   **業種別ケーススタディ**
    -   小売・製造・サービス業など、業種ごとに異なる会計処理を体験
    -   各業種の代表的な取引パターンを問題化
-   **法改正・最新トピック対応**
    -   会計基準改正や税制変更など、最新の会計トピックに対応した問題・解説

### 1-2. 学習パス・カリキュラム

-   **コース設計**
    -   「初級 → 中級 → 上級」「簿記 3 級 →2 級 →1 級」など体系的な学習パス
    -   ユーザーごとに最適な学習順序をレコメンド
-   **リマインダー・復習提案**
    -   苦手分野や未達成レッスンのリマインド通知
    -   スペースドリピティション（間隔反復）に基づく復習提案

### 1-3. コミュニティ・協働学習

-   **ユーザー同士の Q&A・ディスカッション**
    -   問題ごとに質問・回答・コメントができる掲示板
-   **ランキング・競争要素**
    -   週間・月間ランキング、友達とのスコア比較
    -   チーム対抗戦（任意）

### 1-4. 解説・フィードバック

-   **AI による個別フィードバック**
    -   間違えた理由や理解度に応じたヒントを自動生成
-   **参考文献・外部リンク**
    -   詳細な解説や公式テキストへのリンク

---

## 2. ユーザー管理

### 2-1. ユーザー登録・認証

-   メールアドレス、パスワード、ユーザー名で新規登録
-   入力バリデーション（形式・強度・重複）
-   パスワードはハッシュ化
-   ソーシャルログイン（Google, Apple 等）（任意）
-   パスワードリセット（メールリンク送信）

### 2-2. ログイン/ログアウト

-   メールアドレス・パスワードでログイン
-   JWT またはセッションによる認証
-   ログアウトでセッション破棄

### 2-3. プロフィール管理

-   ユーザー名・メールアドレスの表示・編集
-   アイコン画像アップロード
-   学習目的・所属（学校/会社/グループ）の登録

### 2-4. 進捗・履歴管理

-   レッスンごとの進捗（未着手/途中/完了/正答率/最終回答日時）
-   全体の学習進捗バー
-   学習履歴（回答履歴・バッジ獲得履歴・ポイント履歴）

---

## 3. レッスン・問題

### 3-1. レッスン管理

-   レッスン一覧（タイトル、説明、難易度、進捗表示）
-   ソート・フィルタ（進捗順、難易度順、カテゴリ別）

### 3-2. レッスン詳細

-   概要、学習目標、問題数表示
-   レッスン開始・再受講ボタン

### 3-3. 問題出題・回答

-   問題タイプ
    -   単一選択式（ラジオボタン）
    -   複数選択式（チェックボックス）
    -   ドラッグ&ドロップ式（仕訳パーツ・決算書作成）
    -   記述式（数値・テキスト入力）
-   問題文、選択肢、補足説明、ヒントボタン
-   タイマー（任意）

### 3-4. 回答・判定・解説

-   回答送信時に即時正誤判定
-   フィードバック（正解・不正解・詳細解説）
-   間違えた問題のみ再挑戦
-   各問題に「会計的な考え方」の詳細解説
-   関連用語やポイントのポップアップ表示

### 3-5. レッスン完了・復習

-   全問題クリアで「完了」状態
-   バッジやポイント付与
-   レッスン単位で再受講可能

---

## 4. ゲーミフィケーション

### 4-1. バッジシステム

-   レッスンクリア、全問正解、連続ログイン、初回チャレンジ等でバッジ付与
-   バッジ一覧・獲得履歴・未獲得バッジの条件表示

### 4-2. ポイント・スコア

-   問題正解・連続正解・初回クリア等でポイント付与
-   ポイント累計・ランキング表示

### 4-3. 進捗グラフ

-   レッスンごとの進捗バー
-   全体進捗の円グラフ・棒グラフ

### 4-4. モチベーション維持

-   日替わりチャレンジ
-   目標設定と達成通知
-   プッシュ通知・メール通知

---

## 5. 管理機能（管理者専用）

### 5-1. レッスン・問題管理

-   レッスン・問題の新規作成・編集・削除
-   問題文、選択肢、正答、解説、ヒントの登録
-   問題タイプ・カテゴリ・難易度の設定
-   問題・レッスンの一括インポート・エクスポート（CSV/Excel）

### 5-2. バッジ管理

-   バッジの新規作成・編集・削除
-   バッジ名、説明、獲得条件、アイコン画像の設定

### 5-3. ユーザー管理

-   ユーザー一覧表示
-   進捗・バッジ・ポイント状況の確認
-   ユーザーの強制退会・アカウント削除

### 5-4. ログ・監査

-   学習履歴・操作ログの保存
-   不正利用検知・管理者通知

---

## 6. 共通機能・UI/UX

### 6-1. レスポンシブデザイン

-   PC、タブレット、スマホに最適化

### 6-2. アクセシビリティ

-   キーボード操作、色覚バリアフリー、フォントサイズ調整
-   スクリーンリーダー対応

### 6-3. ヘルプ・サポート

-   使い方ガイド、FAQ
-   お問い合わせ・不具合報告フォーム
-   チャットボット（任意）

### 6-4. エラーハンドリング

-   入力エラー、通信エラー時のユーザー通知
-   サーバー・API エラーのログ保存

### 6-5. セキュリティ・プライバシー

-   パスワードのハッシュ化
-   認証・認可（管理者/一般ユーザー権限分離）
-   API への不正アクセス対策
-   GDPR 等の個人情報保護対応
-   アカウント削除・データエクスポート機能

---

## 7. API 要件

### 7-1. 認証系

-   新規登録、ログイン、ログアウト、パスワードリセット
-   ソーシャルログイン（任意）

### 7-2. ユーザー系

-   ユーザー情報取得・更新
-   進捗・バッジ・ポイント取得
-   学習履歴取得

### 7-3. レッスン・問題系

-   レッスン一覧・詳細取得
-   問題一覧・詳細取得
-   回答送信・判定
-   回答履歴取得

### 7-4. 管理系

-   レッスン/問題/バッジの CRUD
-   ユーザー一覧・進捗取得
-   ログ・監査データ取得

---

## 8. データモデル（ER 図レベル）

-   **User**: id, name, email, passwordHash, profileImage, purpose, group, createdAt, updatedAt
-   **Lesson**: id, title, description, level, order, category, questions[]
-   **Question**: id, lessonId, type, content, choices, correctAnswer, explanation, hint, image
-   **Answer**: id, userId, questionId, userAnswer, isCorrect, answeredAt
-   **Badge**: id, name, description, condition, iconUrl
-   **UserBadge**: userId, badgeId, earnedAt
-   **Progress**: userId, lessonId, status, correctCount, totalCount, lastAnsweredAt
-   **Log**: id, userId, action, detail, createdAt

---

## 9. ページ・UI 設計

-   トップページ：サービス紹介、ログイン/新規登録
-   ダッシュボード：進捗、バッジ、レッスン一覧、ランキング
-   レッスン詳細：レッスン説明、問題開始、進捗グラフ
-   問題ページ：問題文、選択肢、回答、解説、ヒント
-   バッジ一覧：獲得・未獲得バッジ
-   プロフィール：ユーザー情報、進捗、履歴
-   管理ページ：レッスン・問題・バッジ・ユーザー・ログ管理
-   コミュニティページ：Q&A、ディスカッション
-   サポート/ヘルプページ：FAQ、お問い合わせ

---

## 10. ディレクトリ構成（推奨）

```
/accounting-learn-app
├── app/
│   ├── page.tsx
│   ├── layout.tsx
│   ├── register/
│   │   └── page.tsx
│   ├── login/
│   │   └── page.tsx
│   ├── dashboard/
│   │   └── page.tsx
│   ├── profile/
│   │   └── page.tsx
│   ├── badges/
│   │   └── page.tsx
│   ├── lessons/
│   │   ├── [lessonId]/
│   │   │   ├── page.tsx
│   │   │   └── questions/
│   │   │       └── [questionId]/
│   │   │           └── page.tsx
│   ├── admin/
│   │   ├── page.tsx
│   │   ├── lessons/
│   │   │   ├── page.tsx
│   │   │   └── [lessonId]/
│   │   │       └── edit/
│   │   │           └── page.tsx
│   │   ├── questions/
│   │   │   ├── page.tsx
│   │   │   └── [questionId]/
│   │   │       └── edit/
│   │   │           └── page.tsx
│   │   ├── badges/
│   │   │   ├── page.tsx
│   │   │   └── [badgeId]/
│   │   │       └── edit/
│   │   │           └── page.tsx
│   │   ├── users/
│   │   │   ├── page.tsx
│   │   │   └── [userId]/
│   │   │       └── page.tsx
│   │   ├── logs/
│   │   │   └── page.tsx
│   │   └── import-export/
│   │       └── page.tsx
│   └── api/
│       ├── auth/
│       │   ├── register/
│       │   │   └── route.ts
│       │   ├── login/
│       │   │   └── route.ts
│       │   └── logout/
│       │       └── route.ts
│       ├── user/
│       │   └── route.ts
│       ├── lessons/
│       │   ├── route.ts
│       │   └── [lessonId]/
│       │       └── route.ts
│       ├── questions/
│       │   └── [questionId]/
│       │       └── route.ts
│       ├── answers/
│       │   └── route.ts
│       ├── badges/
│       │   └── route.ts
│       └── admin/
│           ├── lessons/
│           │   └── route.ts
│           ├── questions/
│           │   └── route.ts
│           ├── badges/
│           │   └── route.ts
│           ├── users/
│           │   └── route.ts
│           ├── logs/
│           │   └── route.ts
│           └── import-export/
│               └── route.ts
├── components/
│   ├── LessonList.tsx
│   ├── LessonDetail.tsx
│   ├── QuestionForm.tsx
│   ├── ProgressBar.tsx
│   ├── BadgeList.tsx
│   ├── ProfileCard.tsx
│   ├── AdminLessonEditor.tsx
│   ├── AdminQuestionEditor.tsx
│   ├── AdminBadgeEditor.tsx
│   ├── AdminUserList.tsx
│   ├── AdminLogViewer.tsx
│   ├── ImportExportPanel.tsx
│   └── ...
├── lib/
│   ├── auth.ts
│   ├── db.ts
│   ├── badge.ts
│   ├── progress.ts
│   ├── logger.ts
│   ├── importExport.ts
│   └── ...
├── types/
│   └── index.ts
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
├── public/
│   └── ...
├── styles/
│   ├── globals.css
│   ├── theme.css
│   └── ...
├── locales/
│   └── ja.json
│   └── en.json
├── __tests__/
│   └── ...
├── docs/
│   └── api.md
│   └── erd.png
│   └── wireframes/
│       └── ...
├── .env
├── package.json
├── tsconfig.json
├── next.config.js
└── README.md
```

---

## 11. 運用・拡張性要件

-   テストデータ投入・リセットスクリプト
-   CI/CD パイプライン（GitHub Actions 等）
-   API バージョニング
-   問題・バッジ・ユーザー等の一括インポート/エクスポート
-   ログ・監査データの長期保存・分析

---

## 12. 今後の議論・設計ポイント

-   会計学習の「どこ」を重視するか（資格？実務？ケーススタディ？）
-   AI や自動化の活用範囲
-   コミュニティ・協働学習の深さ
-   法令・プライバシー対応のレベル
-   運用負荷を下げるための管理機能拡充

---

**本ドキュメントは、体験型会計学習アプリの全機能・運用・拡張性を網羅した詳細設計書です。
ご要望に応じて、API 仕様書・画面設計・ER 図・ワイヤーフレーム等も個別に作成可能です。
追加で必要な項目や、さらに深掘りしたい観点があればご指示ください。**

## 体験型会計学習アプリ　画面仕様・API 仕様・ER 図設計ドキュメント

---

### 1. 画面設計（主要ページワイヤーフレーム構成）

#### 1-1. トップページ（/）

-   サービス紹介
-   新規登録・ログインボタン
-   特徴・利用メリット紹介セクション
-   よくある質問・サポートリンク

#### 1-2. ダッシュボード（/dashboard）

-   レッスン一覧（タイトル、進捗バー、難易度、未着手/途中/完了ステータス）
-   バッジ獲得状況（バッジアイコン＋獲得日）
-   全体進捗グラフ（円グラフ・棒グラフ）
-   週間ランキング（ユーザー名＋スコア）

#### 1-3. レッスン詳細（/lessons/[lessonId]）

-   レッスン概要・目標・問題数
-   進捗バー
-   レッスン開始・再受講ボタン
-   関連バッジ表示

#### 1-4. 問題ページ（/lessons/[lessonId]/questions/[questionId]）

-   問題文・選択肢（単一/複数/ドラッグ&ドロップ/記述式）
-   ヒントボタン
-   回答送信ボタン
-   フィードバック領域（正誤・詳細解説・関連用語ポップアップ）

#### 1-5. バッジ一覧（/badges）

-   獲得済み・未獲得バッジ一覧
-   バッジ詳細（条件・説明・獲得日）

#### 1-6. プロフィール（/profile）

-   ユーザー名・メール・アイコン
-   学習目的・所属
-   進捗履歴・バッジ履歴

#### 1-7. 管理ページ（/admin）

-   レッスン・問題・バッジ・ユーザー・ログ管理タブ
-   一括インポート/エクスポート
-   操作ログ閲覧

#### 1-8. コミュニティ（/community）

-   Q&A 掲示板
-   ディスカッションスレッド

#### 1-9. サポート・ヘルプ（/help）

-   FAQ
-   お問い合わせフォーム

---

### 2. API 仕様（主要エンドポイント例）

| メソッド | エンドポイント                | 概要             | リクエスト例・パラメータ      | レスポンス例（抜粋）                |
| -------- | ----------------------------- | ---------------- | ----------------------------- | ----------------------------------- |
| POST     | /api/auth/register            | 新規登録         | { email, password, name }     | { user: {...}, token: ... }         |
| POST     | /api/auth/login               | ログイン         | { email, password }           | { user: {...}, token: ... }         |
| GET      | /api/user                     | ユーザー情報取得 | Authorization: Bearer token   | { user: {...} }                     |
| PATCH    | /api/user                     | ユーザー情報更新 | { name?, profileImage?, ... } | { user: {...} }                     |
| GET      | /api/lessons                  | レッスン一覧取得 | ?sort=progress&order=asc      | [ { lesson: {...}, progress } ]     |
| GET      | /api/lessons/[lessonId]       | レッスン詳細取得 |                               | { lesson: {...}, questions: [...] } |
| GET      | /api/questions/[questionId]   | 問題詳細取得     |                               | { question: {...} }                 |
| POST     | /api/answers                  | 回答送信・判定   | { questionId, userAnswer }    | { isCorrect, feedback, ... }        |
| GET      | /api/badges                   | バッジ一覧取得   |                               | [ { badge: {...}, earnedAt } ]      |
| POST     | /api/admin/lessons            | レッスン新規作成 | { title, description, ... }   | { lesson: {...} }                   |
| PATCH    | /api/admin/lessons/[lessonId] | レッスン編集     | { title?, description?, ... } | { lesson: {...} }                   |
| DELETE   | /api/admin/lessons/[lessonId] | レッスン削除     |                               | { success: true }                   |
| ...      | ...                           | ...              | ...                           | ...                                 |

---

### 3. ER 図（エンティティ定義）

-   **User**
    -   id (PK), name, email, passwordHash, profileImage, purpose, group, createdAt, updatedAt
-   **Lesson**
    -   id (PK), title, description, level, order, category
-   **Question**
    -   id (PK), lessonId (FK), type, content, choices, correctAnswer, explanation, hint, image
-   **Answer**
    -   id (PK), userId (FK), questionId (FK), userAnswer, isCorrect, answeredAt
-   **Badge**
    -   id (PK), name, description, condition, iconUrl
-   **UserBadge**
    -   userId (FK), badgeId (FK), earnedAt
-   **Progress**
    -   userId (FK), lessonId (FK), status, correctCount, totalCount, lastAnsweredAt
-   **Log**
    -   id (PK), userId (FK), action, detail, createdAt

（詳細なリレーションは Prisma スキーマで厳密に設計）

---

### 4. 追加設計・運用要件

-   **多言語対応**：`locales/`ディレクトリで ja/en リソース管理
-   **アクセシビリティ**：全画面でキーボード操作・色覚対応
-   **セキュリティ**：認証・認可、パスワードハッシュ化、API 保護
-   **監査ログ・不正検知**：全操作ログ保存、管理者通知
-   **一括インポート/エクスポート**：管理画面から CSV/Excel 対応
-   **CI/CD・テスト**：`__tests__/`・`docs/`・GitHub Actions 等
-   **データ削除・エクスポート**：ユーザーによるアカウント削除・データ出力

---

### 5. サンプル画面遷移フロー

1. **トップページ** → [新規登録/ログイン]
2. **ダッシュボード** → [レッスン選択]
3. **レッスン詳細** → [問題ページへ]
4. **問題ページ** → [回答 → フィードバック → 次の問題]
5. **レッスン完了** → [バッジ獲得/進捗更新]
6. **バッジ一覧/プロフィール/コミュニティ/サポート** へ遷移可能
7. **管理者**は管理ページから全データ管理

---

### 6. サンプル API レスポンス例

```json
// レッスン一覧取得
[
  {
    "lesson": {
      "id": "l1",
      "title": "仕訳の基礎",
      "description": "会計の基本となる仕訳を学びます。",
      "level": 1,
      "order": 1
    },
    "progress": {
      "status": "IN_PROGRESS",
      "correctCount": 3,
      "totalCount": 5,
      "lastAnsweredAt": "2025-06-17T12:00:00Z"
    }
  },
  ...
]
```

---

### 7. 画面・API・データモデルの一貫性

-   画面設計・API 設計・ER 図は全て同じ用語・構造で統一
-   英語/日本語の用語も一貫し、ドキュメント・コード・UI に反映

---

**このドキュメントは、体験型会計学習アプリの設計・実装・運用に必要な全要素を網羅しています。
ご要望に応じて、各画面の詳細ワイヤーフレーム、API 仕様書、Prisma スキーマ、テスト設計書なども追加作成可能です。
さらに深い粒度や特定ユースケースの設計が必要な場合はご指示ください。**
