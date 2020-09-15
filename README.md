# wasm-idx-2test

 Version: 0.9.2

 Author  : Kouji Nakashima / kuc-arc-f.com

 date    : 2020/09/13

 update : 2020/09/15

***

Rust WebAssembly / react + webpack, speed test sample



***
### setup

cargo generate --git https://github.com/rustwasm/wasm-pack-template

wasm-pack build

npm init wasm-app www

npm install

***
### テスト、速度比較

* DOM表示の、wasm , javascript 比較

* wasmによる、web画面表示の高速化を目標に。描画処理の作成、
 JS比較を、行いました。

* 結果としては、今回の構成では。JS速度が予想より高速の為、 wasm処理を高速化できませんでした。

***
### 比較方法

* wasmの呼出しは、JSから行い、IndexedDBからのJS配列を、wasmに渡す

* wasm側で、JS配列を Rust Vec<構造体>に、デコードし、HTMLタグを生成に
  DOM追加し。開始、終了時間から。実行時間を計算する

* JS側も上記同様な処理をJS実装 / 計測し、wasm実行速度と比較する。
***
### 計測結果
単位 = msec (1/1000 sec)

レコード: 1000件

* JS: 11 msec

* wasm: 16 msec
***
レコード: 10,000件

* JS: 104 msec

* wasm: 138 msec

***
### 考察
計測日 : 2020/09/15

* 上記の結果から、今回の構成( HTML描画部分のみ比較 ) で、JSが高速で、wasmはやや遅い。

* 理由としては、wasm側は、データ受信後に、Rust配列にデコード処理時間　が有るため、
  JS側の、そのまま配列ループ処理実行より、wasm は全体的に時間が長くなる傾向でした。

* 描画速度も、JSは速く。上記件数ですと、wasmと大差はなく。結果的にJSの処理速度が。高速

* 計測ツールの開発手法、データ作成方法で。誤差は出ると思いますが。
 現行( テスト時点 ) のRust性能ですと、JSの高速化の面で wasmに移植しても。高速化は難しいと、想定しました。アップデートで性能改善されると良いのですが。

***
### 補足

測定URL:

* js

http://localhost:8080/#/speed_test_js

* wasm

http://localhost:8080/#/speed_test_test

***
### sample


***
### more

***

