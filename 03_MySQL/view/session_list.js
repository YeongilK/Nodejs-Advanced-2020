module.exports.mainForm = function(uname, rows) {
    let tableRow = '';
    for (let row of rows) {
        tableRow += `<tr>
                        <td>${row.uid}</td>
                        <td>${row.uname}</td>
                        <td>${row.regDate}</td>
                        <td>
                            <a href="#">수정</a>
                            <a href="#">삭제</a>
                        </td>
                    </tr>`;
    }
    return `
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    <title>사용자 관리</title>
</head>
<body>
<div class="container">
    <h2 class="mt-3">사용자 조회</h2>
    <p>${uname}님 환영합니다.&nbsp;&nbsp;&nbsp;<a href="/logout">로그아웃</a></p>
    <hr>
    <table class="table table-striped">
        <tr style="font-size: larger;">
            <th>uid</th>
            <th>이름</th>
            <th>등록일시</th>
            <th>액션</th>
        </tr>
        ${tableRow}
    </table>
    <input type='button' class='btn btn-secondary' value='로그인' onClick="location.href='/login'" style="float: right">
</div>
</body>
</html>
    `;
}