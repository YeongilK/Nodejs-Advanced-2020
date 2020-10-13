module.exports.loginForm = function() {
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
    <style>
    td { padding-bottom: 10px; }
    </style>
    <body>
    <div class="container">
        <h2 class="mt-3">로그인</h2>
        <hr>
        <form action="/login" method="POST">
            <table>
                <tr>
                    <td><label for="uid">사용자ID</label></td>
                    <td><input type="text" name="uid" id="uid"></td>
                </tr>
                <tr>
                    <td><label for="pwd">패스워드</label></td>
                    <td><input type="password" name="pwd" id="pwd"></td>
                </tr>
                <tr>
                    <td colspan="2" style="text-align: center"><input type="submit" value="로그인"></td>
                </tr>
            </table>
        </form>
    </div>
    </body>
    </html>
    `;
} 