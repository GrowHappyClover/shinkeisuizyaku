/* 表示するポイント */
let html_point1 = document.getElementById("player1-point");
let html_point2 = document.getElementById("player2-point");
let player1Point = 0;
let player2Point = 0;
let player = 1;
let html_player1turn = document.getElementById("player1-turn");
let html_player2turn = document.getElementById("player2-turn");
let remaining = 26;



/* カードをシャッフルさせる */
let cards = [];
for (i = 0; i < 26; i++) {
    while (true) {
        let tempNumber = Math.floor(Math.random() * 26 + 1);      /* tempNumber一時的な箱 * 0を含めないため+1 バグ？*/
        if (!cards.includes(tempNumber)) {      /* 今までに出てない番号だったら */
            cards.push(tempNumber);             /* tempNumberをcardsに加える */
            break;
        }
    }
}



/* 【デバッグ】シャッフルしたカードを確認 */
for (i = 0; i < 26; i++) {
    console.log(cards[i])
}



/* 「スタート」クリックしたらカードを並べる */
let html_start = document.getElementById("start");
let html_cards = document.getElementsByClassName("card");
let html_card = Array.prototype.slice.call(html_cards);             /* cardsを配列にする(for文で使えるようにするため)*/
html_start.addEventListener("click", function () {
    html_player1turn.classList.add("player1-turn");
    html_start.classList.add("restart");                            /*  やり直しボタン。後々作る予定 */
    for (i = 0; i < html_card.length; i++) {
        html_card[i].className = "anime";                           /* カード出現（animeクラスに変更） */
        /* console.log(html_card[i])                                デバッグ*/
    }
});



/* それぞれのカードに数値を割り当てる。 */
for (i = 0; i < html_card.length; i++) {
    html_card[i].value = cards[i]
}
/* 【注意事項】
html_card[i].valueはカードの値（表にしたときの値）
html_card[i]は左上から〇番目のカード */


/* 【デバッグ】 全部見える */
/* for (i = 0; i < html_card.length; i++) {
    html_card[i].src = "img/" + html_card[i].value + ".png";
} */

/* 終了判定と勝敗の判定 */
function finish() {
    if (remaining <= 0) {
        if (player1Point > player2Point) {
            open("one-win.html", "_blank");
        }
        else if (player2Point > player1Point) {
            open("two-win.html", "_blank");
        }
        else {
            open("draw.html", "_blank");
        }
    }
}


let firstCard = 0;                                                      /* １枚目のカードの値 */
let touchCardNumber = 0;
for (i = 0; i < html_card.length; i++) {
    let a = i;
    html_card[i].addEventListener("click", function () {

        switch (player) {
            case 1:
                if (firstCard == 0) {
                    /* １枚目クリック */
                    html_card[a].src = "img/" + html_card[a].value + ".png";    /* カードを表にする（カードの〇番目をカードの持つ数値のカードimgと入れ変える。） */
                    firstCard = html_card[a].value;                             /* １枚目のカードの数値を記録する */
                    touchCardNumber = a;
                    /* console.log("タッチナンバー" + touchCardNumber);
                    console.log("タッチナンバー" + firstCard); */
                    console.log(player);
                }
                else {                                                                                        /* ２枚目クリック */
                    if (firstCard + 13 == html_card[a].value || firstCard - 13 == html_card[a].value) {       /* カードが一致したとき */
                        player1Point += 1;
                        html_point1.innerHTML = player1Point + "ポイント";
                        html_card[a].src = "img/" + html_card[a].value + ".png";                              /* ２枚目表にする */
                        setTimeout(function () {                                                              /* ２秒後カードをなくす */
                            html_card[a].remove();
                            html_card[touchCardNumber].remove()
                            remaining -= 2;
                            finish();
                        }, 700);
                        firstCard = 0;                                                                        /* 初期化 */
                        /* console.log("タッチナンバー" + touchCardNumber);                                     デバッグ
                        console.log("タッチナンバー" + firstCard); */

                    }
                    else {                                                                                    /* カードが違う場合 */
                        html_card[a].src = "img/" + html_card[a].value + ".png";                              /* ２枚目表にする */
                        setTimeout(function () {                                                              /* １秒後カードを裏返しにする */
                            html_card[touchCardNumber].src = "img/card-reverse.png";                          /* １枚目 */
                            html_card[a].src = "img/card-reverse.png";                                        /* ２枚目 */
                            firstCard = 0;
                            html_player1turn.classList.remove("player1-turn");
                            html_player2turn.classList.add("player2-turn");                                                                     /* 初期化 */
                        }, 700);
                        /* console.log("タッチナンバー" + touchCardNumber);                                     デバッグ
                        console.log("タッチナンバー" + firstCard); */
                        player = 2;
                    }
                }
                break;
            case 2:
                /* １枚目にクリックしたカードの位置情報 */
                /* スコープ対策 いらないかも？*/
                if (firstCard == 0) {                                           /* １枚目クリック */
                    html_card[a].src = "img/" + html_card[a].value + ".png";    /* カードを表にする（カードの〇番目をカードの持つ数値のカードimgと入れ変える。） */
                    firstCard = html_card[a].value;                             /* １枚目のカードの数値を記録する */
                    touchCardNumber = a;
                    /* console.log("タッチナンバー" + touchCardNumber);
                    console.log("タッチナンバー" + firstCard); */
                    console.log(player);
                }
                else {                                                                                        /* ２枚目クリック */
                    if (firstCard + 13 == html_card[a].value || firstCard - 13 == html_card[a].value) {       /* カードが一致したとき */
                        player2Point += 1;
                        html_point2.innerHTML = player2Point + "ポイント";
                        html_card[a].src = "img/" + html_card[a].value + ".png";                              /* ２枚目表にする */
                        setTimeout(function () {                                                              /* ２秒後カードをなくす */
                            html_card[a].remove();
                            html_card[touchCardNumber].remove()
                            remaining -= 2;
                            finish();
                        }, 700);
                        firstCard = 0;                                                                        /* 初期化 */
                        /* console.log("タッチナンバー" + touchCardNumber);                                     デバッグ
                        console.log("タッチナンバー" + firstCard); */

                    }
                    else {                                                                                    /* カードが違う場合 */
                        html_card[a].src = "img/" + html_card[a].value + ".png";                              /* ２枚目表にする */
                        setTimeout(function () {                                                              /* １秒後カードを裏返しにする */
                            html_card[touchCardNumber].src = "img/card-reverse.png";                          /* １枚目 */
                            html_card[a].src = "img/card-reverse.png";                                        /* ２枚目 */
                            firstCard = 0;
                            html_player2turn.classList.remove("player2-turn");
                            html_player1turn.classList.add("player1-turn");
                        }, 700);

                        player = 1;
                        console.log("タッチナンバー" + touchCardNumber);
                        console.log("タッチナンバー" + firstCard);
                    }
                }
                break;
        }
    })
}
