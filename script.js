// Animate On Scroll (AOS)を初期化
AOS.init({
    duration: 800, // アニメーションの時間（ミリ秒）
    once: true,    // アニメーションを1回のみ実行
});

// 指定されたIDの要素までスムーズにスクロールする関数
function scrollToId(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "center" });
}

// ページの読み込みが完了してからスクリプトを実行
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('inquiryForm');
    const submitButton = document.getElementById('submitButton');
    
    // フォームの送信イベントを処理
    form.addEventListener('submit', function (event) {
        // デフォルトのフォーム送信をキャンセル
        event.preventDefault();
        
        // ボタンを無効化し、送信中のメッセージを表示
        submitButton.disabled = true;
        submitButton.textContent = '送信中...';

        // フォームデータを収集
        const formData = new FormData(form);
        const dataObject = {};
        formData.forEach((value, key) => {
            dataObject[key] = value;
        });

        // サーバーに送信するデータペイロードを作成
        const payload = {
            landingPageID: dataObject.landingPageID,
            companyName: dataObject.universityName, // フォームの項目名に合わせて変更
            departmentName: dataObject.departmentName,
            fullName: dataObject.fullName,
            email: dataObject.email,
            phoneNumber: dataObject.phoneNumber,
            message: dataObject.message || "",
            // スプレッドシートの列に合わせるための空のフィールド
            inquiryType: "教育機関問い合わせ", 
            detailType: "",
            furigana: "",
            secret: '8qZ$p#vT2@nK*wG7hB5!sF8aU' // Code.gsで設定した秘密のキー
        };

        // ★★★重要★★★: ご自身のGoogle Apps ScriptのURLに置き換えてください
        const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbySbuZ7SkFpV9mhpiD6QdvH5GQ2AVEitF__UVKn9r5xJunN1f_pe07yqknce21EhCsg/exec";
        // Fetch APIを使用してデータを送信
        fetch(SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors', // Google Apps Scriptへの送信に必要
            body: JSON.stringify(payload)
        })
        .then(() => {
            // データ送信成功後、ローカルのthankyou.htmlに移動
            window.top.location.href = 'thankyou.html';
        })
        .catch(error => {
            // エラーが発生した場合
            console.error('Error:', error);
            alert('送信に失敗しました。時間をおいて再度お試しください。');
            
            // ボタンを再度有効化
            submitButton.disabled = false;
            submitButton.textContent = '送信する';
        });
    });
});
