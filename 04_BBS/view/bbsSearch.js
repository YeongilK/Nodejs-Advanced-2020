const template = require('./template');
const ut = require('../util');

module.exports.searchListForm = function(uname, keyword, rows) {
    let tableRow = '';
    for (let row of rows) {
        let modTime = ut.getDisplayTime(row.modTime);
        let title = (row.replyCount == 0) ? row.title :
            `${row.title}<span class="text-danger">[${row.replyCount}]</span>`;
        tableRow += `<tr class="d-flex">
                        <td class="col-1" style="text-align: center">${row.bid}</td>
                        <td class="col-6"><a href="/bbs/view/${row.bid}"><b>${title}</b></a></td>
                        <td class="col-2" style="text-align: center">${row.uname}</td>
                        <td class="col-2" style="text-align: center">${modTime}</td>
                        <td class="col-1" style="text-align: center">${row.viewCount}</td>
                    </tr>`;
    }
    return `
    ${template.header(uname)}
    <div class="container-fluid" style="margin-top: 90px;">
        <div class="row">
            <div class="col-2"></div>
            <div class="col-7"><h3><strong>"${keyword.substring(1,keyword.length-1)}"</strong>의 검색 결과</h3></div>
            <div class="col-3"></div>
        </div>
    </div>
    <div class="container" style="margin-top: 30px;">
        <div class="row mb-3">
            <div class="col-2"></div>
            <div class="col-8"></div>
            <div class="col-2">
                <a href="/bbs/create">
                    <i class="fas fa-edit fa-2x"></i>&nbsp;글쓰기
                </a>
            </div>
        </div>
        <form action="/bbs/list" method="post">
            <table class="table table-condensed table-hover">
                <tr class="table-secondary d-flex" style="font-size: larger; text-align: center">
                    <th class="col-1">번호</th>
                    <th class="col-6">제목</th>
                    <th class="col-2">글쓴이</th>
                    <th class="col-2">날짜</th>
                    <th class="col-1">조회수</th>
                </tr>
                ${tableRow}
            </table>
        </form>
    </div>

    ${template.footer()}
    `;
}

