module.exports.insertForm = function() {
    return `
    <!DOCTYPE html>
    <html lang="ko">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Song Page</title>
    </head>
    <body>
        <h2>노래 추가</h2>
        <hr>
        <form action="/insert" method="POST">
            <table>
                <tr>
                    <td><label for="uid">노래 제목</label></td>
                    <td><input type="text" name="title" id="title"></td>
                </tr>
                <tr>
                    <td><label for="pwd">가사</label></td>
                    <td><input type="text" name="lyrics" id="lyrics"></td>
                </tr>
                <tr>
                    <td colspan="2"><input type="submit" value="확인"></td>
                </tr>
            </table>
        </form>
    </body>
    </html>
    `;
}