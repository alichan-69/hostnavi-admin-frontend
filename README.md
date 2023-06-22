# hostnavi-admin-frontend

<img src="./readme/Logo.png">

`hostnavi-admin-frontend`は、空き家の貸し出し管理システムのサンプルアプリケーション`HostNavi`のフロントエンドのリポジトリです。<br>
`HostNavi` のフロントエンドのアーキテクチャ・使用されている技術の詳細な情報・開発方法を掲載しています。
<br>

# 画面機能一覧

| 画面                     | 機能                                                             |
| ------------------------ | ---------------------------------------------------------------- |
| サインイン画面           | ユーザー登録を行う画面                                           |
| ログイン画面             | ユーザーがログインを行う画面                                     |
| マイアカウント画面       | 自分のユーザー情報が確認できる画面                               |
| 今日の予約一覧画面       | 今日の予約一覧がテーブルで閲覧できる画面                         |
| 予約詳細画面             | 予約の詳細が閲覧できる画面                                       |
| 予約一覧画面             | 全ての予約一覧がテーブルで閲覧できる画面                         |
| 最新のメッセージ一覧画面 | 全てのチャットの最新のメッセージの一覧がテーブルで閲覧できる画面 |
| チャット画面             | 予約者とのチャットができる画面                                   |
| カレンダー画面           | 予約の一覧がカレンダーで閲覧できる画面                           |
| レビュー一覧画面         | 全てのレビュー一覧がテーブルで閲覧できる画面                     |
| レビュー詳細画面         | レビューの詳細が閲覧できる画面                                   |
| 収入グラフ画面           | 収入がグラフで閲覧できる画面                                     |
| ビュー数グラフ画面       | 宿泊施設の閲覧数がグラフで閲覧できる画面                         |
| 宿泊施設一覧画面         | 宿泊施設の一覧がテーブルで閲覧できる画面                         |
| 宿泊施設追加画面         | 宿泊施設を追加できる画面                                         |
| 宿泊施設編集画面         | 宿泊施設を編集できる画面                                         |

# src 配下のディレクトリ構成

```lua
├── assets -- 画像や動画等の資産を格納
│   ├── logo -- サイズ違いのロゴ等、纏められる資産を格納するディレクトリ
│   │   └── Logo.png
│   └── XXX.png
├── components
│   ├── Parts -- 一つのタグのみで構成されるコンポーネントを格納するディレクトリ
│   │   ├── Button -- 同系統のコンポーネントを格納するディレクトリ
│   │   │   ├── DefaultButton.tsx -- デフォルトとなるコンポーネント。コンポーネント名とファイル名は同一にし、先頭にDefaultをつける。
│   │   │   ├── DangerButton.tsx
│   │   │   └── index.ts -- エントリーポイント。Partsより二階層以上潜った場所にコンポーネントファイルを格納する場合、作成する。
│   │   └──DefaultImage.tsx
│   ├── Templates -- 二つ以上のタグで構成されるコンポーネントを格納するディレクトリ。配下の構成はPartsと同じ。
│   │   ├── InputGroup
│   │   │   ├── TextFieldInputGroup.tsx
│   │   │   ├── SelectInputGroup.tsx
│   │   │   └── index.ts
│   │   └── DefaultHeader.tsx
│   ├── Views -- ロジック内部でAPI通信が行われるコンポーネントを格納するディレクトリ。配下の構成はPartsと同じ。
│   │   ├── Table
│   │   │   ├── InnTable.tsx
│   │   │   ├── MessageTable.tsx
│   │   │   └── index.ts
│   │   ├── Chat
│   │   │   ├── ReservationChat.tsx
│   │   │   ├── ReservationChat.module.scss -- tailwindで対応できなかったスタイルを設定するファイル
│   │   │   └── index.ts
│   │   └── DeleteDialog.tsx
│   ├── Providers -- プロバイダーを格納するディレクトリ。
│   │   ├── LoadingProvider.tsx
│   │   └── index.tsx -- 全てのProvidersディレクトリ内部のプロバイダーでchildrenを囲むコンポーネント。
│   └── types -- コンポーネントで統一して使用するtypeを格納するディレクトリ。
│       └── index.d.ts --  エントリーポイント。
├── const -- 定数を格納するディレクトリ。
│   └── user.ts -- 同一系統の定数を纏めたファイル。
├── enum -- enumを格納するディレクトリ。
│   └── inn.ts -- 同一系統のenumを纏めたファイル。
├── hooks -- react-hooksを関数内部で使用する関数をhooksとして定義し、各ファイルに格納するディレクトリ。
│   └── api.ts -- 同一系統のhooksを纏めたファイル。
├── pages -- ページを格納するディレクトリ
│   ├──user -- ページを格納するディレクトリ。URLの一部になる。
│   |   ├── [id].tsx -- 動的にURLに文字を割り振ってページを表示するためのファイル
│   |   └── myAccount.tsx -- ページを表示するためのファイル
│   ├── _app.tsx -- ページ間の共通レイアウト、処理等を実装するファイル
│   └──  _document.tsx -- bodyタグ外のhtmlの記載を行うファイル
├── styles -- 統一して設定するスタイルを格納するディレクトリ
│   ├── global.scss -- 統一して設定するスタイルの設定ファイル
│   └── index.ts -- スタイル設定の際に使用する関数を格納するディレクトリ
├── type -- 型を格納するディレクトリ
│   └── requestParam -- 同一系統の型を格納するディレクトリ
│       ├── innInn.d.ts -- 同一系統の型を纏めたファイル
│       └── userUser.d.ts
└── utils -- 関数内部でreact-hooksを使用しない関数を格納するディレクトリ
    ├── api -- 同一系統の関数を格納するディレクトリ
    │   ├── common.ts -- 同一系統の関数を格納するファイル
    │   └── userUser.ts
    └── validation.ts


```

# 採用技術一覧

メインで使用している技術と、その選定理由を記載しています。<br>

| 技術            | 選定理由                                                                                                                                                                           |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| TypeScript4.4   | 現在フロントエンドは TypeScript で開発することが主流になっており、保守・運用の面から見ても TypeScript で開発すべきだと感じたため。                                                 |
| Nextjs12        | ディレクトリ構成が分かりやすく、他開発者が参加した際にも Next の公式サイトを見ただけである程度のディレクトリ構成を把握してもらえるから。ルーティングの手間を減らせるから。         |
| React Hook Form | React のバリデーション実装用ライブラリとして多く採用されており、知見が大量にあったため。また、各フォームの値の一括管理、各フォームのバリデーションエラーの一括管理等が行えるため。 |
| yup             | React Hook Form がデフォルトで受け入れているバリデーションスキーマ定義用のライブラリのため。バリデーション用関数を自分で作成する手間が減らせるため。                               |
| Material UI5.0  | 一般的に使用されている UI ライブラリのため。                                                                                                                                       |
| STOMP.js        | WebSocket 通信を Stomp プロトコルで行いたかったため。                                                                                                                              |
| SockJS-client   | WebSocket 通信を行いたかったため。                                                                                                                                                 |
| axios           | HTTP 通信用のクライアントライブラリとして、一般的に使用されているライブラリのため。                                                                                                |
| Tailwindcss     | CSS を書く手間が減らせるため。                                                                                                                                                     |
| Eslint          | 型チェック等を厳しく行いたかったため。                                                                                                                                             |
| Husky           | コミット前にリンターやフォーマッターを必ず通したかったため。                                                                                                                       |
| Prettier        | 一般的に使用されているフォーマッターであるため。                                                                                                                                   |
| Sass            | CSS を書く手間が減らせるため。                                                                                                                                                     |
| Stylelint       | CSS にもリンターを入れたかったため。                                                                                                                                               |

# 開発ガイドライン

コンポーネントの分割ルール、型付のルール、状態管理のルール、ライブラリの使用方法等の開発の際に必要となる情報を記載しています。<br>

## コンポーネント分割ルール

コンポーネントは以下の基準で分割するか判断し、ディレクトリに格納。

1. コンポーネントを分割するかの判断基準を基に、コンポーネントを分割<br>

以下に該当するコンポーネントを分割できそうであれば、分割する。<br>

- コンポーネント で二つ以上のタグを使用し、コンポーネントを二回以上使用
- コンポーネント で一つのタグのみ使用するが統一したい CSS や統一して設定したい props がある
- コンポーネントは一度しか使用されないが、使用されるタグや紐づくロジック が膨大で見通しが悪い

2. コンポーネント格納ルールををもとに、ディレクトリに格納

コンポーネントを作成した際は components ディレクトリにコンポーネントを格納。<br>

更に components ディレクトリの中で下の様にコンポーネントを分類して格納。

```lua
└── components
    ├── Parts -- 一つのタグのみで構成されるコンポーネントを格納するディレクトリ
    ├── Templates -- 二つ以上のタグで構成されるコンポーネントを格納するディレクトリ
    └──  Views -- ロジック内部でAPI通信が行われるコンポーネントを格納するディレクトリ
```

## 状態管理のルール

状態管理は以下のルールで行う様にします。

- データの受け渡しの流れをはっきりさせたいため、基本 Provider での状態管理は行わない様にする。認証時に使用するユーザー ID 等、多くのコンポーネントへ関連性なく依存することが予想される状態の場合、Provider を使用する様にする。
- コンポーネント間での状態共有をしたい時には、props での受け渡しを基本とし、トップレベルのコンポーネントのみで状態を取得し、順に子コンポーネントに状態を渡していく様にする。これにより、無駄な API 通信を行わない様にする。

## 型付のルール

`@tsconfig/next-strictest`の型チェックのルールを採用しています。<br>
型付は以下のルールで行う様にします。

- `any` 型は基本使用しないようにする
- `@ts-ignore`、`eslint-disable`は使用しない様にする、やむを得ない場合無視したルール名や無視した理由をコメント内に記載。
- 型チェックは コミット 前に `husky` で行うようにしているので、引っかかった場合は修正してコミットする。

## 環境変数の追加方法

環境変数は以下の様に追加しています。

- 開発環境、本番環境どちらの環境でも使用する環境変数は`.env.local`に記載。

- 開発環境のみで使用する環境変数は`.env.development`に記載<br>

- 本番環境のみで使用する環境変数は`.env.production`に記載<br>

- クライアント上(ブラウザのコンソール、画面等)に表示したい環境変数には`NEXT_PUBLIC_`を環境変数名の頭につける

## React Hook Form によるフォームへのバリデーション実施方法

フォームでのバリデーション処理は以下の様に実装しています。<br>

```tsx
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  NAME_IDENTIFIER_JAPANESE,
  NAME_IDENTIFIER_ENGLISH,
  GUEST_NUMBER_IDENTIFIER_JAPANESE,
  GUEST_NUMBER_IDENTIFIER_ENGLISH,
} from "../../../const/inn";
import { yupString, yupNumber } from "../../../utils/validation";

// 1. 管理するフォームで扱う値の一覧の名前と型を格納する。
type IFormInput = {
  name: string;
  guestNumber: number;
};

// 2. 各フォームの値に適用させるバリデーションのスキーマを格納する。基本的なスキーマを組むyupは関数としてutils/validation配下に格納されている。
const SCHEMA = yup.object().shape({
  name: yupString(INN_ADDRESS_IDENTIFIER_JAPANESE, 64),
  guestNumber: yupNumber(GUEST_NUMBER_IDENTIFIER_JAPANESE, 99, "人"),
});

export const Form = () => {
  // 3. IFormInputとSCHEMA、他設定を格納したオブジェクトをuseFormに渡してフォーム内の値を一括管理できる関数を受け取る
  const {
    control,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(SCHEMA),
    criteriaMode: "all",
    shouldFocusError: true,
    defaultValues: {
      name: "",
      guestNumber: 0,
    },
  });

  // 4. フォームがサブミットされた時に実行される関数。data内部に入力されたフォーム内の値が格納される。
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {};

  return (
    {/* 5. formタグのonSubmitにhandleSubmit(onSubmit)を渡すことで、サブミット時にonSubmitが実行され引数に入力されたdataが入ってくる */}
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      {/* 6. Controllerコンポーネントのrender関数内に自作コンポーネントを格納し、ref、value、onChangeを渡すことでreact-hook-formで入力を管理することができる */}
      <Controller
        control={control}
        name={INN_NAME_IDENTIFIER_ENGLISH}
        render={({ field: { ref, value, onChange } }) => (
          <TextFieldInputGroup
            inputRef={ref}
            name={INN_NAME_IDENTIFIER_ENGLISH}
            label={INN_NAME_IDENTIFIER_JAPANESE}
            value={value}
            errors={errors[INN_NAME_IDENTIFIER_ENGLISH]}
            onChange={onChange}
          />
        )}
      />
      <Controller
        control={control}
        name={GUEST_NUMBER_IDENTIFIER_ENGLISH}
        render={({ field: { ref, value, onChange } }) => (
          <TextFieldInputGroup
            inputRef={ref}
            name={ABLE_TO_STAY_GUEST_NUMBER_IDENTIFIER_ENGLISH}
            label={ABLE_TO_STAY_GUEST_NUMBER_IDENTIFIER_JAPANESE}
            value={value}
            errors={errors[ABLE_TO_STAY_GUEST_NUMBER_IDENTIFIER_ENGLISH]}
            onChange={onChange}
          />
        )}
      />
      <DefaultButton label="登録" type="submit" />
    </form>
  );
};

export default Form;
```

## WebSocket 通信方法

WebSocket 通信でのデータの送信、取得は以下の様に実装しています。<br>

```tsx
import { useEffect, useState } from "react";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import type { CompatClient } from "@stomp/stompjs";

const Chat = function render() {
  // 1. STOMPプロトコルでの通信をページ内のどこからでも行える様、クライアントオブジェクトをstateに格納する
  const [stompClient, setStompClient] = useState<CompatClient>();

  // 2. stompClientを初期化する
  useEffect(() => {
    // 3. SockJSで作成したWebSocket通信用のオブジェクトをStompでラップすることでSTOMPプロトコルでの通信を行える様にする
    const stompClientInitial = Stomp.over(
      new SockJS("http://localhost:8080/hostnavi-websocket")
    );
    // 4. デバックモードをオフにすることで、コンソールへの出力をなくすためにdebugに何も返さない関数を格納
    stompClientInitial.debug = () => {
      return;
    };

    // 5.作成したSTOMPクライアントオブジェクトを使用して、WebSocketでの通信を開始
    stompClientInitial.connect({}, function () {
      // 6. /messagesを監視して、messageが返ってきたらその後の処理を行う
      stompClientInitial.subscribe(`/messages`, async (message) => {
        // 7. messageが帰ってきた時に行う処理を記載
      });
    });

    // 8. 作成したstompClientをstateに格納
    setStompClient(stompClientInitial);
  }, [reservation, initialMessages]);

  // 9. 以下関数を実行して、メッセージをサーバーに送信する
  const sendMessage = (message: string) => {
    const messageParam = {
      event: "send",
      message,
    };

    // 10. メッセージをサーバー側に送信する処理
    stompClient.send("/hostnavi-websocket", {}, JSON.stringify(messageParam));
  };
};
```

## tailwind 使用方法

各コンポーネントの className でコンポーネントに適用させるスタイルを定義しています。<br>
しかし、子コンポーネントをラップする親コンポーネントで再度スタイルを定義する際に、tailwind でスタイルを定義すると、スタイルのかぶりが発生する可能性があるため、以下 classOverride 関数でその対策をしています。

```ts
import clsx, { ClassValue } from "clsx";
import { overrideTailwindClasses } from "tailwind-override";

/** tailwindcssで後から設定したクラスを上書きする処理 */
export const classOverride = (...classNames: ClassValue[]) => {
  return overrideTailwindClasses(clsx(...classNames.reverse()));
};
```

使用方法は以下です。

```tsx
import { classOverride } from "../../../utils/classoverride";

const DefaultButton = function render({
  label,
  className,
}: DefaultButtonProps) {
  return (
    <LoadingButton
      // 親コンポーネントでパディングに関するスタイルの指定がclassNameに入ってきた場合、そちらが上書きされる
      className={classOverride(className, "p-4")}
    >
      <span>{label}</span>
    </LoadingButton>
  );
};

export default DangerButton;
```
