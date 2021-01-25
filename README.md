## \:new: Topics
- **Sprite画像は変更しない方針になりました(影響範囲が広く毎回表示崩れ問題が指摘されるため)**

# Overview

`$npm run start` コマンドを打つだけで、自動でブラウザが立ち上がり、ファイル編集するとリロードされ、(同一IP内にある)複数デバイスでリアルタイムに表示確認できる環境を構築する手順を記します。

---

## \:smile: （設定済みの人) 起動方法

|用途| コマンド | css圧縮 | js圧縮 |　画像圧縮
--|--|--|--|--
| 開発時 | `$npm run start` (or dev) | ☓| ☓| ☓
| リリース時 (staging up用ファイル生成) | `$npm run build` (or release)  | ○| ○| ☓
| リリース用に画像を圧縮  (staging up用画像ファイル生成)| `$npm run image-min`  ※dist内の画像を圧縮します。| ☓| ☓|○



### :white_check_mark: コーディングを始める前に 

title | link
--|--
テンプレート一覧 | [マークアップ / レイアウト / デザイン テンプレート]( http://pokemon-card-dev.kakus.in/template.html)
デザインについて | [画像サイズの作成について](https://github.com/kakusin/pokemon-card/wiki/%E7%94%BB%E5%83%8F%E3%82%B5%E3%82%A4%E3%82%BA%E3%81%AE%E4%BD%9C%E6%88%90%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6)
jsについて | [全体に与える初期化処理](https://github.com/kakusin/pokemon-card/wiki/%5Bjs%5D-%E5%85%A8%E4%BD%93%E3%81%AB%E5%BD%B1%E9%9F%BF%E3%82%92%E4%B8%8E%E3%81%88%E3%82%8B%E6%8C%99%E5%8B%95)
cssについて |  [PCとSPで表示を切り替える方法](https://github.com/kakusin/pokemon-card/wiki/%5Bcss%5D-PC%E3%81%A8SP%E3%81%A7%E8%A1%A8%E7%A4%BA%E3%82%92%E5%88%87%E3%82%8A%E6%9B%BF%E3%81%88%E3%82%8B)


### :evergreen_tree: 別のリポジトリで管理されているページ


|title| path | repository |
--|--|--
| EX(500円デッキ) | | https://github.com/kakusin/pokemon-card-ex |
| GXスタートデッキ タイプ診断 | | https://github.com/kakusin/pokemon-card-gx-shindan |
| 20周年記念ページ | /20th |https://github.com/kakusin/poke-card20th |
| sm9 | /ex/sm9 |https://github.com/kakusin/pokemon-card-ex-sm9 |
| sm8b | /ex/sm8b |https://github.com/kakusin/pokemon-card-ex |



---

## \:cloud: 確認サーバー一覧

| 社内確認環境(heteml)　| | http://pokemon-card-dev.kakus.in/ |
--|--|:--
| Basic | user | pokemoncarduser |
|       | pass | uUBDhp7hc |
| FTP   | host | ftp-kakusin-g.heteml.net |
|       | user | kakusin-g_pokeca-dev |
|       | pass | kakus1nkakus1n |

|develop環境(ip制限あり) |  | http://develop.pokemon-card.com/ |
--|--|:--
| SFTP | host | 54.65.51.218 |
| | user | kksn |
| | pass | bWzP4QmM |
| | dir | /var/www2/html/develop.pokemon-card.com/htdocs |

| staging環境(ip制限あり) |  | http://staging.pokemon-card.com/ |
--|--|:--
| SFTP | host | 54.65.51.218 |
| | user | kksn |
| | pass | bWzP4QmM |
| | dir | /var/www2/html/staging.pokemon-card.com/htdocs |

---

# \:beginner: プロジェクトを初めて設定するには？

下記が必要です

- [nodeとbowerのインストールと設定](#nodeとbowerのインストールと設定)
- [mampのインストールと設定](#mampのインストールと設定)
- [gulpfileの設定](#gulpfileの設定)


## nodeとbowerのインストールと設定

**インストールには、`nodebrew(mac)` などの、nodeバージョン管理システムを利用を強く推奨します**

### node バージョン
下記versionを利用してください。

- v8.7.0


### bowerインストール

```
$npm install bower -g
```

### プロジェクトに依存関係のあるモジュールをインストールします
```
$bower install //bower コンポネントをインストール
$npm install // npm モジュールをインストール
```

## mampのインストールと設定

[mamp](https://www.mamp.info/en/)のインストールと設定 (httpd.confの編集)

`Application/MAMP/conf/apache/httpd.conf`

### .htmlでもphpが動くようにする

135 行目辺りの下記に、
```
[befor] 
AddType application/x-httpd-php .php .phtml
↓.htmlを追加

[after] 
AddType application/x-httpd-php .php .phtml .html
includeが動くようにする
```

460行目辺りの下記行のコメントアウトを外す
```
[befor]
#AddType text/html .shtml
#AddOutputFilter INCLUDES .shtml

[after]
AddType text/html .shtml
AddOutputFilter INCLUDES .shtml
```
htaccessを許可
```
[before]
AllowOverride None  
[after]
AllowOverride All
```
例)/Applications/MAMP/conf/apache/httpd.conf に追記する
```
Listen 8007
<virtualhost *:8007>
    DocumentRoot "distディレクトリ/までのパス/をいれてね/dist"
</virtualhost>
```

## gulpfileの設定

/gulpfile.js 22行目辺りに上記MAMPで設定したListen番号を入れる。 これでbrowser-syncでphpのポートをプロキシできるようになる。

```
var PROXY_URL = "http://localhost:8007/";
```

## 起動

```
$ npm run start
```

`これでブラウザが立ち上がればOK`


## デプロイ

リリース時は下記コマンドを打つ。これにより dist/images dist/css dist/js 内がクリーンされ、distからminifyされたファイルが生成される。

```
$npm run build
```

画像を公開するには、buildコマンド後に圧縮をする。これにより `dist内の画像が圧縮される`
```
$npm run image-min
```

---
# \:eyes: その他

