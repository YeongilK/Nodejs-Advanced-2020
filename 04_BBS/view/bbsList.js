const template = require('./template');
const ut = require('../util');

module.exports.bbsListForm = function(uname, rows, pages, firstPage, lastPage, totalPage) {
    let tableRow = '';
    for (let row of rows) {
        let modTime = ut.getDisplayTime(row.modTime);
        let title = (row.replyCount == 0) ? row.title : `${row.title}<span class="text-danger">[${row.replyCount}]</span>`;
        tableRow += `<tr class="d-flex">
                        <td class="col-1" style="text-align: center">${row.bid}</td>
                        <td class="col-6"><a href="/bbs/view/${row.bid}"><b>${title}</b></a></td>
                        <td class="col-2" style="text-align: center">${row.uname}</td>
                        <td class="col-2" style="text-align: center">${modTime}</td>
                        <td class="col-1" style="text-align: center">${row.viewCount}</td>
                    </tr>`;
    }
    
    // Pagination
    let prevPage, nextPage;
    let prevTen = Math.floor(pages/10) * 10;
    let nextTen = Math.ceil(pages/10) * 10 + 1;

    if (pages > 10) 
        prevPage = `/bbs/list/${prevTen}`; 
    else 
        prevPage = '#';

    if (totalPage > lastPage)
        nextPage = `/bbs/list/${nextTen}`;
    else
        nextPage = '#';

    let pagination = `<li class="page-item"><a class="page-link" href="${prevPage}">&lt;</a></li>`;
    for (let page = firstPage; page <= lastPage; page++) {
        if (page === pages)
            pagination += `<li class="page-item active"><a class="page-link" href="#">${page}</a></li>`;
        else {
            pagination += `<li class="page-item"><a class="page-link" href="/bbs/list/${page}">${page}</a></li>`;
        }
    }
    pagination += `<li class="page-item"><a class="page-link" href="${nextPage}">&gt;</a></li>`;

    return `
    ${template.header(uname, pages)}
    <div class="container-fluid" style="margin-top: 90px;">
        <div class="row">
            <div class="col-2"></div>
            <div class="col-7"><h3>게시글 목록</h3></div>
            <div class="col-3"></div>
        </div>
    </div>
    <div class="container" style="margin-top: 30px; margin-bottom: 90px">
        <div class="row mb-3">
            <div class="col-2"></div>
            <div class="col-8"></div>
            <div class="col-2">
                <a href="/bbs/create">
                    <i class="fas fa-edit fa-2x"></i>&nbsp;글쓰기
                </a>
            </div>
        </div>
        <table class="table table-hover">
            <tr class="table-secondary d-flex" style="font-size: larger; text-align: center">
                <th class="col-1">번호</th>
                <th class="col-6">제목</th>
                <th class="col-2">글쓴이</th>
                <th class="col-2">날짜</th>
                <th class="col-1">조회수</th>
            </tr>
            ${tableRow}
        </table>
        <ul class="pagination justify-content-center" style="margin:20px 0">
            ${pagination}
        </ul>
    </div>

    ${template.footer()}
    `;
}

