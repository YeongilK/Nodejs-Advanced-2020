const template = require('./template');
const ut = require('../util');

module.exports.viewBbsForm = function(result) {
    let content = result.content.replace(/\n/g, '<br>');
    return `
    ${template.header(result.uname)}
    <div class="container" style="margin-top: 100px; margin-bottom: 90px;">
        <div class="row">
            <div class="col-1"></div>
            <div class="col-7">
                <a href="/bbs/update/${result.bid}/uid/${result.uid}"><i class="mr-3 fas fa-edit fa-2x"></i></a>
                <a href="/bbs/delete/${result.bid}/uid/${result.uid}"><i class="fas fa-trash-alt fa-2x"></i></a>
            </div>
            <div class="col-4"></div>

            <div class="col-1"></div>
            <div class="mt-3 col-7">
                <h3><b>${result.title}</b></h3><br>
                <h6>글번호: ${result.bid} | 조회: ${result.viewCount}</h6>
                <h6>${result.modTime}<h6>
            </div>
            <div class="col-3"></div>
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
            <div class="col-1"></div><br><br><br><br>

            <div class="col-1"></div>
            <div class="col-10">
                <form action="/bbs/reply" method="post">
                    <div class="form-group">
                        <input type="hidden" name="bid" value="${result.bid}">
                        <label for="reply"><h5>댓글</h5></label>
                        <textarea class="mb-3 form-control" id="reply" name="reply" rows="4" cols="80"></textarea>
                        <input class="mr-3 btn btn-primary" type="submit" value="등록">
                        <input class="btn btn-secondary" type="reset" value="취소">
                    </div>
                </form>
            </div>
            <div class="col-1"></div>
        </div>
    </div>
    ${template.footer()}
    `;
}