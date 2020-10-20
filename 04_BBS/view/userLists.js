const template = require('./template');

module.exports.userListForm = function(uname, rows) {
    let tableRow = '';
    for (let row of rows) {
        tableRow += `<tr>
                        <td>${row.uid}</td>
                        <td>${row.uname}</td>
                        <td>${row.tel ? row.tel : ' '}</td>
                        <td>${row.email ? row.email : ' '}</td>
                        <td>${row.regDate}</td>
                        <td>
                            <a href="/user/delete/${row.uid}">삭제</a>
                        </td>
                    </tr>`;
    }
    return `
    ${template.header(uname)}
    <div class="container" style="margin-top: 90px;">
        <div class="row">
            <div class="col-1"></div>
            <div class="col-10">
                <form action="/user/list" method="post">
                    <h3>사용자 관리</h3>
                    <div class="col-12"><hr></div>
                    <table class="table table-condensed table-hover text-center">
                        <tr class="table-secondary" style="font-size: larger;">
                            <th>사용자 ID</th>
                            <th>이름</th>
                            <th>Tel</th>
                            <th>Email</th>
                            <th>등록일자</th>
                            <th>액션</th>
                        </tr>
                        ${tableRow}
                    </table>
                </form>
            </div>
            <div class="col-1"></div>
        </div>
    </div>
    ${template.footer()}
    `;
}

