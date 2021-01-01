/* 表示するポイント */
let html_point = document.getElementById("point");
let point = 0;



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




/* クリックしたときの動作 */
let firstCard = 0;                                                      /* １枚目のカードの値 */
let touchCardNumber = 0;                                                /* １枚目にクリックしたカードの位置情報 */
for (i = 0; i < html_card.length; i++) {
    let a = i;                                                          /* スコープ対策 いらないかも？*/
    html_card[i].addEventListener("click", function () {
        if (firstCard == 0) {                                           /* １枚目クリック */
            html_card[a].src = "img/" + html_card[a].value + ".png";    /* カードを表にする（カードの〇番目をカードの持つ数値のカードimgと入れ変える。） */
            firstCard = html_card[a].value;                             /* １枚目のカードの数値を記録する */
            touchCardNumber = a;
            /* console.log("タッチナンバー" + touchCardNumber);
            console.log("タッチナンバー" + firstCard); */
        }
        else {                                                                                        /* ２枚目クリック */
            if (firstCard + 13 == html_card[a].value || firstCard - 13 == html_card[a].value) {       /* カードが一致したとき */
                point++;
                html_point.innerHTML = point + "ポイント";
                html_card[a].src = "img/" + html_card[a].value + ".png";                              /* ２枚目表にする */
                setTimeout(function () {                                                              /* ２秒後カードをなくす */
                    html_card[a].remove();
                    html_card[touchCardNumber].remove()
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
                    firstCard = 0;                                                                     /* 初期化 */
                }, 700);
                /* console.log("タッチナンバー" + touchCardNumber);                                     デバッグ
                console.log("タッチナンバー" + firstCard); */
            }
        }
    })
}


/* 問題点
１二次元配列使って[s,h,k,d][number]で表示したい
２シャッフルの方法 */