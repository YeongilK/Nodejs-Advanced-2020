const template = require('./template');
const ut = require('../util');

module.exports.viewBbsForm = function(uname, result, rows, page) {
    let content = result.content.replace(/\n/g, '<br>');
    let reply = '';

    for (row of rows) {
        if (row.isMine === 1)
            reply += `
            <div class="mb-3">
                <br><strong>${row.uname}</strong><span class="badge badge-danger">작성자</span><br>`;
        else 
            reply += `
            <div class="mb-3">
                <br><strong>${row.uname}</strong><br>`;

        reply +=  `
                ${row.content.replace(/\n/g, '<br>')}<br>
                ${row.regTime}<br>
            </div>`;
    }

    return `
    ${template.header(uname, page)}
    <div class="container" style="margin-top: 100px; margin-bottom: 90px;">
        <div class="row">
            <div class="col-1"></div>
            <div class="col-7">
                <a href="/bbs/update/${result.bid}/uid/${result.uid}"><i class="mr-3 fas fa-edit fa-2x"></i></a>
                <a href="/bbs/delete/${result.bid}/uid/${result.uid}"><i class="fas fa-trash-alt fa-2x"></i></a>
            </div>
            <div class="col-4"></div>

            <div class="col-1"></div>
            <div class="mt-3 col-8">
                <h3><b>${result.title}</b></h3><br>
                <h6>작성자: ${result.uname}<h6>
                <h6>글번호: ${result.bid} | 조회: ${result.viewCount}</h6>
                <h6>${result.modTime}<h6>
            </div>
            <div class="col-2"></div>
            <div class="col-1"></div>

            <div class="col-1"></div>
            <div class="col-10"><hr></div>
            <div class="col-1"></div>

            <div class="col-1"></div>
            <div class="col-10">
                <p>${content}</p>
            </div>
            <div class="col-1"></div>
            
            <div class="col-1"></div>
            <div class="col-10"><hr></div>
            <div class="col-1"></div><br><br><br>

            <div class="col-1"></div>
            <div class="col-10">
                <form action="/bbs/reply" method="post">
                    <div class="form-group">
                        <input type="hidden" name="bid" value="${result.bid}">
                        <input type="hidden" name="uid" value="${result.uid}">
                        <label for="reply"><h5><strong>댓글</strong></h5></label>
                        ${reply}
                        <textarea class="mb-3 form-control" id="reply" name="content" rows="4" cols="80"></textarea>
                        <input class="mr-3 btn btn-primary" type="submit" value="등록">
                        <input class="btn btn-secondary" type="reset" value="취소">
                    </div>
                </form>
                <div align="right">
                    <button class="mr-3 btn btn-secondary" onclick="location.href='/bbs/list/1'">목록으로</button>
                </div>
            </div>
            <div class="col-1"></div>
        </div>
    </div>
    ${template.footer()}
    `;
}