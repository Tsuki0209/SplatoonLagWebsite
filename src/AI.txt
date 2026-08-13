できます。2人でGitHubリポジトリを共有して静的ウェブサイトを作るなら、最初は難しいことを全部やらなくて大丈夫です。

まずはこれだけ覚えてください。

```text
git pull        ← 作業前に最新を取る
ファイルを直す
git add         ← 変更をステージに載せる
git commit      ← 変更を記録する
git pull        ← push前にもう一度最新を取る
git push        ← GitHubに送る
```

これだけでかなり回せます。  
ただし、2人で同じファイルを同時に触ると衝突しやすいので、慣れてきたら「ブランチ + Pull Request」にするのがおすすめです。

---

# 1. GitとGitHubのざっくりイメージ

## Gitとは

あなたのパソコンの中で、ファイルの変更履歴を記録する仕組みです。

例：

```text
index.html を修正した
style.css を追加した
メニューを直した
```

こういう変更を「コミット」として残します。

## GitHubとは

Gitのリポジトリをネット上で共有・保存する場所です。

イメージ：

```text
自分のPCのGitリポジトリ
        ↓ push
GitHubのリポジトリ
        ↓ pull
相方のPCのGitリポジトリ
```

---

# 2. 最初にやること

## 2-1. Gitをインストール

端末で以下を打って、バージョンが出ればOKです。

```bash
git --version
```

出てこない場合はGitをインストールします。

- Windowsなら Git for Windows
- Macなら Homebrew で入れたり、Xcode Command Line Tools を入れたりする

---

## 2-2. 自分の名前とメールを設定

最初に1回だけやります。

```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

例：

```bash
git config --global user.name "Taro Yamada"
git config --global user.email "taro@example.com"
```

これはコミット記録に表示されます。

---

## 2-3. GitHubでリポジトリを作る

どちらか1人がGitHubでリポジトリを作ります。

手順：

1. GitHubにログイン
2. 「New repository」
3. リポジトリ名を決める
4. Public または Private を選ぶ
5. Create repository

静的ウェブサイトなら、たとえば：

```text
my-site
team-site
portfolio-site
```

みたいな名前でOKです。

---

## 2-4. もう1人を共同作業者に追加

リポジトリを作った人が、もう1人を招待します。

GitHub上の手順：

```text
リポジトリ
  → Settings
  → Collaborators
  → Add people
```

相手をGitHubユーザー名かメールアドレスで招待します。

招待された側はメールかGitHub通知から承認します。

---

# 3. リポジトリを自分のPCに持ってくる

自分が作業するPCで、リポジトリをクローンします。

```bash
git clone https://github.com/ユーザー名/リポジトリ名.git
```

例：

```bash
git clone https://github.com/taro/my-site.git
```

その後、フォルダに移動します。

```bash
cd my-site
```

これで作業準備完了です。

---

# 4. まず一番シンプルな運用方法

2人とも最初はこれで大丈夫です。

## 作業の流れ

```bash
git pull origin main
```

最新を取得します。

ファイルを編集します。

例：

```text
index.html
css/style.css
images/logo.png
```

など。

変更を確認します。

```bash
git status
```

変更したファイルをステージに載せます。

```bash
git add .
```

`.` は「今いるフォルダ以下の全部」という意味です。

コミットします。

```bash
git commit -m "トップページを追加"
```

コミットメッセージは日本語でOKです。

例：

```bash
git commit -m "ヘッダーを追加"
git commit -m "CSSを整えた"
git commit -m "メニューのリンク修正"
```

push前にもう一度最新を取ります。

```bash
git pull origin main
```

問題がなければpushします。

```bash
git push origin main
```

これでGitHubに反映されます。

---

# 5. 2人での基本ルール

これを守ると事故りにくいです。

## ルール1：作業前に pull

```bash
git pull origin main
```

## ルール2：push前にも pull

```bash
git pull origin main
git push origin main
```

## ルール3：小さくコミットする

1回のコミットは小さめがおすすめです。

悪い例：

```text
全部直した
```

良い例：

```text
ヘッダーを追加
フッターの著作権表示を修正
スマホ表示のCSSを調整
```

## ルール4：同じファイルを同時に触らない

特に衝突しやすいのはこれです。

```text
index.html
css/style.css
```

2人が同時に `style.css` を編集すると、衝突しやすいです。

対策：

- AさんはHTML担当
- BさんはCSS担当
- 大きな変更は別ブランチにする
- 作業前に「今日はここ触るね」と連絡する

---

# 6. ちょっと安全な運用：ブランチ + Pull Request

2人でやるなら、本当はこちらがおすすめです。

## ブランチとは

作業用の枝を作ることです。

```text
main
 ├── feature/header
 ├── feature/about-page
 └── fix/menu
```

`main` は完成版・公開用の場所にして、作業は別ブランチで行います。

---

## 6-1. mainを最新にする

```bash
git switch main
git pull origin main
```

もし古いGitで `git switch` が使えない場合は、次を使ってください。

```bash
git checkout main
```

以降、`git switch` は `git checkout` に読み替えてOKです。

---

## 6-2. 作業用ブランチを作る

```bash
git switch -c feature/header
```

これは「`feature/header` というブランチを作って、そこに移動する」という意味です。

古いGitなら：

```bash
git checkout -b feature/header
```

---

## 6-3. 作業する

ファイルを編集します。

確認：

```bash
git status
```

ステージに載せる：

```bash
git add .
```

コミット：

```bash
git commit -m "ヘッダーを追加"
```

---

## 6-4. GitHubにブランチをpush

```bash
git push -u origin feature/header
```

初回は `-u` を付けると、以降少し楽になります。

---

## 6-5. GitHubでPull Requestを作る

pushすると、GitHub上にこういう表示が出ることがあります。

```text
Compare & pull request
```

それを押してPull Requestを作ります。

Pull Requestとは：

```text
このブランチの内容をmainに取り込んでもいい？
```

という提案です。

---

## 6-6. 相方が確認してマージする

相方がGitHub上で内容を確認して、問題なければ「Merge pull request」を押します。

これで `main` に反映されます。

---

## 6-7. ローカルのmainを最新にする

マージが終わったら、作業した人はローカルを最新にします。

```bash
git switch main
git pull origin main
```

不要になったブランチを消してもいいです。

```bash
git branch -d feature/header
```

---

# 7. ブランチ名のつけ方

おすすめはこれです。

```text
feature/作業内容
fix/修正内容
```

例：

```text
feature/top-page
feature/about
feature/contact
fix/menu
fix/css-layout
```

2人で合わせるなら、たとえば：

```text
feature/header
feature/footer
feature/gallery
```

など、わかりやすければOKです。

---

# 8. コンフリクトとは

コンフリクトは、Gitが「どっちの変更を採用すればいいかわからない」ときに起きます。

たとえば：

Aさん：

```html
<h1>私たちのサイト</h1>
```

Bさん：

```html
<h1>チームのサイト</h1>
```

同じ行を別々に直していると、Gitは自動で混ぜられません。

---

# 9. コンフリクトが起きたときの対処法

`git pull` したときにコンフリクトが起きると、ファイルの中にこんな表示が出ます。

```text
<<<<<<< HEAD
<h1>私たちのサイト</h1>
=======
<h1>チームのサイト</h1>
>>>>>>> origin/main
```

意味はこうです。

```text
<<<<<<< HEAD
自分の変更
=======
相手の変更
>>>>>>> origin/main
```

手動で直したい形に編集します。

例：

```html
<h1>チームのサイト</h1>
```

または：

```html
<h1>私たちのサイト</h1>
```

あるいは両方を混ぜて：

```html
<h1>私たちのチームサイト</h1>
```

Gitの目印を全部消して、最終的に正しいファイルにします。

その後：

```bash
git add index.html
git commit -m "コンフリクトを解消"
git push origin main
```

もし途中でわけがわからなくなったら、マージを中断できます。

```bash
git merge --abort
```

これは安全寄りのお助けコマンドです。

---

# 10. よく使うコマンド一覧

## 状態確認

```bash
git status
```

今どのブランチにいるか、何が変更されているかを見ます。

---

## 履歴を見る

```bash
git log --oneline
```

---

## 変更内容を見る

```bash
git diff
```

---

## 最新を取る

```bash
git pull origin main
```

---

## 変更をコミットする

```bash
git add .
git commit -m "メッセージ"
```

---

## pushする

```bash
git push origin main
```

---

## ブランチを作る

```bash
git switch -c feature/header
```

または：

```bash
git checkout -b feature/header
```

---

## mainに戻る

```bash
git switch main
```

または：

```bash
git checkout main
```

---

# 11. 静的ウェブサイト向けのアドバイス

静的サイトなら、だいたいこういう構成が多いです。

```text
my-site/
├── index.html
├── about.html
├── css/
│   └── style.css
├── js/
│   └── main.js
└── assets/
    └── images/
        └── logo.png
```

---

## 11-1. パスは相対パスが安全

GitHub Pagesで公開する場合、特にプロジェクトページではURLがこうなります。

```text
https://ユーザー名.github.io/リポジトリ名/
```

このとき、絶対パスを使うと画像やCSSが読めないことがあります。

あまりおすすめ：

```html
<link rel="stylesheet" href="/css/style.css">
<img src="/assets/images/logo.png">
```

おすすめ：

```html
<link rel="stylesheet" href="css/style.css">
<img src="assets/images/logo.png">
```

または：

```html
<link rel="stylesheet" href="./css/style.css">
<img src="./assets/images/logo.png">
```

静的サイトでは相対パスが安全です。

---

## 11-2. `.gitignore` を置くとよい

リポジトリのルートに `.gitignore` というファイルを作ると、Gitに管理しなくていいファイルを指定できます。

例：

```text
.DS_Store
Thumbs.db
node_modules/
.env
```

Macの `.DS_Store` や、Windowsの `Thumbs.db` は入れなくていいことが多いです。

もしNode.jsやビルドツールを使うなら、`node_modules/` も除外します。

---

## 11-3. 秘密情報を入れない

静的サイトでも、APIキーなどをHTMLやJSに直接書きたくなることがあります。

ただしGitHubにpushすると、Publicなら誰でも見えます。Privateでも、共同作業者には見えます。

```text
APIキー
パスワード
トークン
```

などは基本コミットしないほうがいいです。

---

# 12. GitHub Pagesで公開する場合

静的ウェブサイトをGitHub Pagesで公開するなら、以下を設定します。

GitHub上の手順：

```text
リポジトリ
  → Settings
  → Pages
```

Sourceを：

```text
Deploy from a branch
```

Branchを：

```text
main
```

フォルダを：

```text
/ (root)
```

にしてSaveします。

もしサイトファイルが `docs` フォルダに入っているなら：

```text
/docs
```

を選びます。

---

## 公開URLの例

ユーザーサイトの場合：

```text
https://ユーザー名.github.io/
```

プロジェクトページの場合：

```text
https://ユーザー名.github.io/リポジトリ名/
```

例：

```text
https://taro.github.io/my-site/
```

pushすると、少ししてから反映されます。

---

# 13. すでに手元にファイルがある場合

もしすでにローカルにウェブサイトファイルがある場合は、一番簡単なのはこれです。

## パターンA：GitHubのリポジトリを先に空で作る

GitHubで空のリポジトリを作ります。

ローカルで：

```bash
git init
git add .
git commit -m "最初のコミット"
git branch -M main
git remote add origin https://github.com/ユーザー名/リポジトリ名.git
git push -u origin main
```

---

## パターンB：GitHub側にREADMEなどがある場合

GitHub上でREADMEや `.gitignore` を作っていると、履歴が別々になって少し面倒です。

初心者向けには、この方法が簡単です。

1. GitHubのリポジトリを `git clone` する
2. クローンしたフォルダの中に、既存のウェブサイトファイルをコピーする
3. `git add .` してコミットしてpushする

```bash
git clone https://github.com/ユーザー名/リポジトリ名.git
cd リポジトリ名
```

ファイルをコピーしてから：

```bash
git add .
git commit -m "既存サイトを初期追加"
git push origin main
```

---

# 14. 2人でのおすすめ運用パターン

## まだGitに慣れていない場合

まずはこれでOK。

```text
1. git pull origin main
2. 作業
3. git add .
4. git commit -m "〜"
5. git pull origin main
6. git push origin main
```

ただし、同じファイルを同時に触らないようにする。

---

## 少し慣れてきたら

ブランチ + Pull Requestにします。

```text
1. mainをpull
2. ブランチ作成
3. 作業
4. commit
5. push
6. Pull Request作成
7. 相方が確認
8. マージ
9. mainをpull
```

静的サイトでも、ページ追加やデザイン変更はブランチにすると安全です。

---

# 15. よくあるエラーと対処

## `git push` が拒否される

よくあるメッセージ：

```text
! [rejected]        main -> main (fetch first)
```

意味：

```text
相手が先にpushしてるよ。先にpullして。
```

対処：

```bash
git pull origin main
```

コンフリクトを直してから：

```bash
git add .
git commit -m "マージを解消"
git push origin main
```

---

## `fatal: not a git repository`

今いるフォルダがGitリポジトリじゃないという意味です。

対処：

```bash
cd リポジトリ名
```

または、まだクローンしていないなら：

```bash
git clone https://github.com/ユーザー名/リポジトリ名.git
```

---

## `Authentication failed`

GitHubの認証がうまくいっていません。

最近はパスワードではなく、ブラウザ認証やアクセストークンを使います。

- GitHubのアカウントパスワードを直接入力する方式は古いです
- Personal Access Token を使う場合があります
- Windows/Macならブラウザでサインインする形が楽なことが多いです

---

# 16. 最低限のチェックリスト

作業開始時：

```bash
git status
git pull origin main
```

作業後：

```bash
git status
git add .
git commit -m "変更内容"
git pull origin main
git push origin main
```

迷ったら：

```bash
git status
```

---

# 17. 2人で決めたほうがいいこと

最低限、これだけ決めると楽です。

## 1. mainに直接pushしていい？

最初はOK。  
慣れたらPull Request運用にする。

## 2. ブランチ名はどうする？

例：

```text
feature/header
feature/footer
fix/menu
```

## 3. コミットメッセージの書き方

例：

```text
Add: ヘッダー追加
Fix: メニューのリンク修正
Update: トップページの文言変更
```

日本語でも全然OKです。

例：

```text
ヘッダーを追加
メニュー修正
CSS調整
```

大事なのは、後で見てわかることです。

---

# 18. とりあえず今日の目標

まずは2人でこれをやってください。

## 担当A

```bash
git clone https://github.com/ユーザー名/リポジトリ名.git
cd リポジトリ名
```

`index.html` を少し直す。

```bash
git add .
git commit -m "index.htmlを修正"
git pull origin main
git push origin main
```

## 担当B

```bash
git pull origin main
```

Aさんの変更が取れれば成功です。

次にBさんも何か修正してpushしてみる。

```bash
git add .
git commit -m "Bが修正"
git pull origin main
git push origin main
```

これができれば、2人での基本的な共同作業はできています。

---

# まとめ

2人の静的サイト制作なら、最初はこれで十分です。

```bash
git pull origin main
git add .
git commit -m "変更内容"
git pull origin main
git push origin main
```

そして、衝突を防ぐために次を守ってください。

```text
作業前にpull
push前にもpull
同じファイルを同時に触らない
小さくコミット
迷ったらgit status
```

もう少し安全にしたいなら、ブランチ + Pull Requestに移行します。

```bash
git switch -c feature/header
git add .
git commit -m "ヘッダー追加"
git push -u origin feature/header
```

GitHubでPull Requestを作ってマージします。

必要なら、次に「あなたたちの今の状況」に合わせて、最初のコマンド手順をそのまま作ります。  
たとえば、次のどれに近いか教えてください。

1. まだGitHubリポジトリを作っていない  
2. リポジトリはあるけど、ローカルにファイルがない  
3. ローカルにすでにサイトファイルがある  
4. GitHub Pagesで公開したい  
5. エラーが出て詰まっている