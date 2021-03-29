'use strict';

const buttons = document.getElementById('buttons');
const modalwidow = document.getElementById('modalwindow');
const scoreLabel = document.querySelector('#modalwindow > p');

//問題、まるばつ、解説を配列に格納
let qa = [
  {q: '物件の契約を決める際、複数の仲介業者で相見積もりを取った方が良い。', a: 1,
  c: '物件の相場を知る為に必ず、複数の仲介業者で相見積もりをとりましょう。'},
  {q: '契約書に「書類作成費」と記載があった、必要な費用なので支払った。', a: 2,
  c: '仲介業者が取っていい手数料は原則、仲介手数料のみです。支払う義務はありません。'},
  {q: '見積書に「害虫駆除費』と記載があったが、特に必要はないと思い契約書の内容から外してもらった。', a: 1,
  c: '実態としては、何も実施していない業者が多く、必要のない費用です。'},
  {q: '入居者が支払う、仲介手数料は家賃の一か月分と決まっている。', a: 2,
  c: '仲介手数料は入居者と家主と合わせて家賃の1ヶ月分までです。原則、入居者は家賃の0.5ヶ月分支払えば良いです。'},
  {q: '火災保険は仲介業者が指定した保険に加入する義務がある。', a: 2,
  c: '強制的に指定された火災保険に加入する義務はありません。自由に安い保険に加入する権利があります。'},
];

//重複のないシャッフルした配列[qa]を格納
let shuffleChoice = shuffle(qa);

//繰り返し同じ問題が出ない様にシャッフル
function shuffle(arr) {
  for (let i = arr.length -1;  i > 0;  i--){
    const j  = Math.floor(Math.random() * (i + 1));
    [arr[j], arr[i]]  = [arr[i], arr[j]]; 
  }
  return arr;
} 

//問題:q
let qa_q = [ shuffleChoice [0].q,shuffleChoice [1].q,shuffleChoice [2].q,shuffleChoice [3].q,shuffleChoice [4].q];
//まるばつ:a
let qa_a = [ shuffleChoice [0].a,shuffleChoice [1].a,shuffleChoice [2].a, shuffleChoice [3].a,shuffleChoice [4].a];
//解説:c
let qa_c = [ shuffleChoice [0].c,shuffleChoice [1].c,shuffleChoice [2].c,shuffleChoice [3].c,shuffleChoice [4].c];

let count = 0;
let score = 0;

//最初の問題表示
  quiz();

  function quiz() {
    let question = document.getElementById('question');
    question.innerHTML = "<h3>第 " + (count + 1) + " 問</h3>" + qa_q[count];
  };

  //クリック時の答え判定 
  function hantei(btnNo) {
      if (qa_a[count] == btnNo) {//正解であれば
      document.getElementById("question_A").innerHTML ="<p>第 " + (count + 1) + " 問</p>" + "<p>正解！</p>" + '<img src ="img/quiz_correct.png">' + '<br>'  + qa_c[count];//正誤関係なく、解説を表示
      score++;
    } else {//間違っていたら
      document.getElementById("question_A").innerHTML ="<p>第 " + (count + 1) + " 問</p>" + "<p>不正解</p>" + '<img src ="img/quiz_Incorrect.png">' +  '<br>' + qa_c[count] ;//正誤関係なく、解説を表示
    }

  //次の問題表示
  count++;
  if (count < qa.length ) {
    quiz();
  } else {
    buttons.remove();//まるばつのボタン表示を消す
    //結果のボタンを表示
    document.getElementById("result").innerHTML =  '<input type="button" id="button" value="結果をみる" ></input>' ;
    const result= document.getElementById('button');

    result.addEventListener('click', () => {//結果判定のボタンを押すと、モーダルウィンドウが表示される
      modalwidow.classList.remove('hidden');//hiddenクラスを外す
      scoreLabel .textContent =`正解率は${score} / ${qa.length}です。`;
    });
  }
}