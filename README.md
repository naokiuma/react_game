## 積みゲーの情報をシェアしし、より積みゲーを増やす後押しをするサービス
◼️ サービス特徴<br/>
・ゲームのプレイ感想メモをのこせる。<br/>
・関連ゲームを探せる（他の人のおすすめゲーム、同じカテゴリのゲーム）<br/>
・トピックごとに自分だけの履歴を残すことができる<br/>
・トピックごとにタイトル、画像、本文、プレイ状態、カテゴリを設定できる。<br/>

◼️ 技術的特徴<br/>
・サービス登録にはメアドを利用。（ツイッターを使いたかったが最近 api 厳しくなりそうなので中止）<br>
・バックエンドは laravel の API（別リポジトリ）<br/>
・ディレクトリ構造は atomicdesign やら ddd もどきやら色々変えたり試しています<br/>
・CSS は全体で SASS でまとめてる(css in js も検討)<br/>
・React<br/>
・Typescript<br/>

## ユースケース図
(caccoで制作)

![usecaseイメージ](git_images/usecase.png)

(仮)アーキテクチャ<br/>
<br/>

◼️ ドメイン層<br/>
オブジェクトや関数の interface として設定<br/>
インフラ層の interface としても設定<br/>
※type を指定する。<br/>
<br/>

◼️ リポジトリ層(仮)<br/>
CRUD 機能自体を持つわけではなく接続先の管理がされている。<br>
使い所が見つからないので、一旦保留<br>

◼ インフラ層<br/>
DB との通信を伴う実際の関数。<br/>

<br/> 
◼️ユースケース層<br/> 
フォームからうけとった値をインフラに渡す<br/> 
各種関数<br/> 
<br/> 
◼️プレゼンテーション層<br/> 
フロント側のビュー<br/> 
<br/><br/><br/>

参考：https://www.gixo.jp/blog/16133/<br/>

## テストのスクリプト

yarn run test

## ルーティング

MainRoute
