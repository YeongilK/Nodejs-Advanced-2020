const template = require('./template');

module.exports.viewUserForm = function(result) {
    return `
    ${template.header(result.uname, 1)}
    <div class="container" style="margin-top: 90px;">
        <div class="row">
            <div class="col-2"></div>
            <div class="col-8">
                <h3>${result.uname} 님 회원정보 관리</h3>
                <hr>
                <form action="/user/view" method="POST">
                    <input type="hidden" name="uid" value="${result.uid}">
                    <table class="table table-bordered" style="text-align: center">
                        <tr>
                            <td colspan="2">
                                <img src="/upload/${result.photo}" alt="${result.photo}" class="mt-3 mb-3" style="height: 300px;">
                            </td>
                        </tr>
                        <tr>
                            <td style="font-weight: bolder;"><label for="uname">이름</label></td>
                            <td>${result.uname}</td>
                        </tr>
                        <tr>
                            <td style="font-weight: bolder;"><label for="tel">전화번호</label></td>
                            <td>${result.tel}</td>
                        </tr>
                        <tr>
                            <td style="font-weight: bolder;"><label for="email">이메일</label></td>
                            <td>${result.email}</td>
                        </tr>
                        <tr>
                            <td style="font-weight: bolder;"><label for="regDate">가입 일자</label></td>
                            <td>${result.regDate}</td>
                        </tr>
                    </table>
                </form>
            </div>
            <div class="col-2">
                <button class="btn btn-info" onclick="location.href='/user/list'">변경</button>
            </div>
        </div>
    </div>
    ${template.uploadScript()}
    ${template.footer()}
    `;
}