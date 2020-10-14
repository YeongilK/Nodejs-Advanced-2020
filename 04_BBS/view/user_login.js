const template = require('./template');

module.exports.loginForm = function() {
    return `
    ${template.header()}
    <div class="container" style="margin-top: 90px;">
        <div class="row">
            <div class="col-3"></div>
            <div class="col-6">
                <h2 class="mt-3">로그인</h2>
                <hr>
                <form action="/login" method="POST">
                    <table>
                        <tr>
                            <td><label for="uid">사용자 ID</label></td>
                            <td><input type="text" name="uid" id="uid"></td>
                        </tr>
                        <tr>
                            <td><label for="pwd">패스워드</label></td>
                            <td><input type="password" name="pwd" id="pwd"></td>
                        </tr>
                        <tr>
                            <td colspan="2" style="text-align: center">
                                <button class="btn btn-primary" style="margin-top: 15px" onclick="location.href='/'">로그인</button>
                                <button class="btn btn-secondary" style="margin-top: 15px" onclick="location.href='/user/register'">회원가입</button>
                            </td>
                        </tr>
                    </table>
                </form>
            </div>
            <div class="col-3"></div>
        </div>
    </div>
    ${template.footer()}
    `;
} 