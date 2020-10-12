module.exports.mainForm = function(rows) {
    let tableRow = '';
    for (let row of rows) {
        tableRow += `<tr>
                        <td>${row.sid}</td>
                        <td>${row.title}</td>
                        <td>${row.name ? row.name : ' '}</td>
                        <td>${row.lyrics}</td>
                        <td>
                            <a href="/update/${row.sid}">수정</a>
                            <a href="/delete/${row.sid}">삭제</a>
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
    <title>Song Page</title>
</head>
<body>
<div class="container">
    <h2>노래 조회</h2>
    <hr>
    <table class="table table-striped">
        <tr style="font-size: larger;">
            <th>sid</th>
            <th>제목</th>
            <th>가수</th>
            <th>가사</th>
            <th>액션</th>
        </tr>
        ${tableRow}
    </table>
    <input type='button' class='btn btn-secondary' value='+ 추가' onClick="location.href='/insert'" style="float: right">
</div>
</body>
</html>
    `;
} 