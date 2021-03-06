module.exports.insertForm = function() {
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
        <title>Insert Song Page</title>
    </head>
    <body>
    <div class="container">
        <h2>노래 추가</h2>
        <hr>
        <form action="/insert" method="POST">
            <table>
                <tr>
                    <td><label for="title">노래 제목</label></td>
                    <td><input type="text" name="title" id="title"></td>
                </tr>
                <tr>
                    <td><label for="lyrics">가사</label></td>
                    <td><input type="text" name="lyrics" id="lyrics"></td>
                </tr>
                <tr>
                    <td colspan="2"><input type="submit" value="확인"></td>
                </tr>
            </table>
            <input type='button' class='btn btn-secondary' value='첫 화면' onClick="location.href='/'" style="float: right">
        </form>
    </div>
    </body>
    </html>
    `;
} 