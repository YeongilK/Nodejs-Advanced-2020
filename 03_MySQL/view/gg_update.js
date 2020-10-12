module.exports.updateForm = function(result) {
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
        <title>Update Song Page</title>
    </head>
    <body>
    <div class="container">
        <h2>갱신</h2>
        <hr>
        <form action="/update" method="POST">
            <input type="hidden" name="ggid" value="${result.ggid}">
            <table>
                <tr>
                    <td><label for="name">이름</label></td>
                    <td><input type="text" name="name" id="name" value="${result.name}"></td>
                </tr>
                <tr>
                    <td><label for="debut">데뷔일자</label></td>
                    <td><input type="text" name="debut" id="debut" value="${result.debut}"></td>
                </tr>
                <tr>
                    <td colspan="2"><input type="submit" value="수정"></td>
                </tr>
            </table>
        </form>
    </div>
    </body>
    </html>
    `;
} 