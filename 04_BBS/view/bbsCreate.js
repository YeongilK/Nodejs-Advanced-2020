const template = require('./template');

module.exports.createBbsForm = function(uname, page) {
    return `
    ${template.header(uname, page)}
    <div class="container-fluid" style="margin-top: 90px;">
        <div class="row">
            <div class="col-2"></div>
            <div class="col-7"><h3>게시글 쓰기</h3></div>
            <div class="col-3"></div>
        </div>
    </div>
    <div class="container" style="margin-top: 30px;">
        <form action="/bbs/create" method="post">
            <div class="form-group">
                <input type="text" class="form-control" id="title" name="title" placeholder="제목을 입력해주세요."><br>
                <textarea class="ckeditor" rows="10" cols="40" id="content" name="content"></textarea><br>
            </div>
            <input class="mr-3 btn btn-primary" type="submit" value="확인">
            <input class="btn btn-secondary" type="reset" value="취소">
        </form>
    </div>
    ${template.uploadScript()}
    ${template.footer()}
    `;
}

