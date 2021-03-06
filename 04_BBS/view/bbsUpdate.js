const template = require('./template');

module.exports.updateBbsForm = function(uname, result, page) {
    return `
    ${template.header(uname, page)}
    <div class="container-fluid" style="margin-top: 90px;">
        <div class="row">
            <div class="col-2"></div>
            <div class="col-7"><h3>게시글 수정</h3></div>
            <div class="col-3"></div>
        </div>
    </div>
    <div class="container" style="margin-top: 30px;">
        <form action="/bbs/update" method="post">
            <div class="form-group">
                <input type="hidden" name="bid" value="${result.bid}">
                <input type="text" class="form-control" id="title" name="title" value="${result.title}"><br>
                <textarea class="ckeditor" rows="10" id="content" name="content">${result.content}</textarea>
            </div>
            <input class="mr-3 btn btn-primary" type="submit" value="등록">
            <input class="btn btn-secondary" type="reset" value="취소">
        </form>
    </div>
    ${template.uploadScript()}
    ${template.footer()}
    `;
}

