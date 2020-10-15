const template = require('./template');

module.exports.mainForm = function(uname, rows) {
    let tableRow = '';
    for (let row of rows) {
        tableRow += `<tr>
                        <td>${row.bid}</td>
                        <td>${row.title}</td>
                        <td>${row.uid}</td>
                        <td>${row.modTime}</td>
                        <td>${row.viewCount}</td>
                        <td>
                            <a href="/bbs/update/${row.bid}">수정</a>
                            <a href="/bbs/delete/${row.bid}">삭제</a>
                        </td>
                    </tr>`;
    }
    return `
    ${template.header(uname)}
    <div class="container-fluid" style="margin-top: 90px;">
        <div class="row">
            <div class="col-1"></div>
            <div class="col-7"><h3>게시글 목록</h3></div>
            <div class="col-4"></div>
        </div>
    </div>
    <div class="container" style="margin-top: 50px;">
        <div class="row">
            <table class="table table-hover">
                <tr class="table-secondary" style="font-size: larger;">
                    <th>번호</th>
                    <th>제목</th>
                    <th>글쓴이</th>
                    <th>날짜</th>
                    <th>조회수</th>
                </tr>
                ${tableRow}
            </table>
        </div>
    </div>

    ${template.footer()}
    `;
}

