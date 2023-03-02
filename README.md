## ゲームのログを残し、よりエンジョイするサービス

◼️サービス特徴<br/>
・ゲームのプレイ感想メモをのこせる。<br/>
・関連ゲームを探せる（他の人のおすすめゲーム、同じカテゴリのゲーム）<br/>
・トピックごとに自分だけの履歴を残すことができる<br/>
・トピックごとにタイトル、画像、本文、プレイ状態、カテゴリを設定できる。<br/>

◼️技術的特徴<br/>
・サービス登録にはメアドを利用。（ツイッターを使いたかったが最近api厳しくなりそうなので中止）
・バックエンドはlaravelのAPI（別リポジトリ）<br/>
・ディレクトリ構造はatomicdesignやらdddもどきやら色々変えたり試しています<br/>
・CSSは全体でSASSでまとめてる(css in jsも検討)<br/>
・React<br/>
・Typescript<br/>

## ユースケース図
![usecaseイメージ](git_images/usecase.png)


(仮)アーキテクチャ<br/>
<br/> 
ドメイン層<br/> 
typeの指定。

<br/> 
他：インターフェイス<br/> 
インフラ層で使うクラスをここで作成する？<br/> 

//メモ
// GameRepogitory.SearchGame(keyword).then((data)=>{
//     setResult([data])
//     console.log('result')
//     console.log(data)
// })

<br/> 
インフラ層：infra(仮)<br/> 
現状は使っていない。
テストしやすいよう、ユースケースで使うドライバーのクラスをここで作る？

<br/> 
ユースケース層：usecase<br/> 
fooks、関数の記載<br/>

<br/> 
プレゼンテーション層：component<br/>
ビュー。最終ロジックもここに記載。<br/>






<br/><br/><br/>



参考：https://www.gixo.jp/blog/16133/<br/>

