## react/spaによるアプリ（構築中）です。

特徴<br/>
・バックエンドはlaravelのAPI（別リポジトリ）です。<br/>
・ディレクトリ構造をatomicdesignやらdddもどきやら色々変えたり試しています<br/>
・CSSは全体でまとめています<br/>
・Typescriptも導入<br/>


## react-routerでurl直うちすると白紙になる問題
head内に<base href="/">を記述し、サーバーを「再起動」すればすおk
