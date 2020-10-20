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
                <label for="title">제목: </label>
                <input type="text" class="form-control" id="title" name="title"><br>
                <label for="content">내용: </label>
                <textarea class="form-control" rows="10" id="content" name="content"></textarea>
            </div>
            <input class="mr-3 btn btn-primary" type="submit" value="확인">
            <input class="btn btn-secondary" type="reset" value="취소">
        </form>
    </div>
    ${template.footer()}
    `;
}

