const template = require('./template');

module.exports.updateUserForm = function(result) {
    return `
    ${template.header(result.uname)}
    <div class="container" style="margin-top: 90px;">
        <div class="row">
            <div class="col-2"></div>
            <div class="col-8">
                <h3>${result.uname} 님 개인정보 관리</h3>
                <hr>
                <form action="/user/update" method="POST">
                    <input type="hidden" name="uid" value="${result.uid}">
                    <table class="table table-borderless">
                        <tr>
                            <td><label for="pwd">패스워드 변경</label></td>
                            <td><input type="password" name="pwd" id="pwd"></td>
                        </tr>
                        <tr>
                            <td><label for="pwd2">패스워드 확인</label></td>
                            <td><input type="password" name="pwd2" id="pwd2"></td>
                        </tr>
                        <tr>
                            <td><label for="tel">Tel</label></td>
                            <td>
                                <input type="tel" name="tel" id="tel" value="${result.tel}" pattern="[0-1]{3}-[0-9]{4}-[0-9]{4}" placeholder="010-1234-5678">
                            </td>
                        </tr>
                        <tr>
                            <td><label for="email">Email</label></td>
                            <td><input type="email" name="email" id="email" value="${result.email}" placeholder="uid@hoseo.net"></td>
                        </tr>
                        <tr>
                            <td colspan="2" style="text-align: center;">
                                <input class="mr-1 mb-5 btn btn-primary" type="submit" value="변경">
                            </td>
                        </tr>
                    </table>
                </form>
            </div>
            <div class="col-2"></div>

            <div class="col-3"></div>
			<div class="col-7"></div>
			<div class="col-2">
				<button class="btn btn-danger" onclick="location.href='/user/delete'">
					회원 탈퇴
				</button>
			</div>
        </div>
    </div>
    ${template.footer()}
    `;
}

