const template = require('./template');

module.exports.registerForm = function() {
    return `
    <!DOCTYPE html>
    <html lang="ko">
    <head>
        <title>My BBS</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="/bootstrap/css/bootstrap.min.css">
        <link rel="stylesheet" href="/fontawesome/css/all.min.css">
        <script src="/jquery/jquery.min.js"></script>
        <script src="/popper/popper.min.js"></script>
        <script src="/bootstrap/js/bootstrap.min.js"></script>
    </head>
    <body>
    <nav class="navbar navbar-expand-sm bg-dark navbar-dark fixed-top">
        <img src="/img/hoseo.png" alt="logo" style="height: 40px; margin-right: 40px;">
        <ul class="navbar-nav mr-auto"></ul>
        <div class="navbar-nav fixed-right">
            <a class="nav-link mr-5" href="/login">
                <i class="fas fa-sign-in-alt fa-2x"></i>
            </a>
        </div>
    </nav>
    <div class="container" style="margin-top: 90px;">
        <div class="row">
            <div class="col-2"></div>
            <div class="col-8">
                <form action="/user/register" method="post">
                    <h3>회원가입</h3>
                    <p>정보를 입력하세요</p>
                    <div class="col-12"><hr></div>
                    <table class="table table-borderless">
                        <tr>
                            <td><label for="uid">사용자 ID</label></td>
                            <td><input type="text" name="uid" id="uid"></td>
                        </tr>
                        <tr>
                            <td><label for="pwd">패스워드</label></td>
                            <td><input type="password" name="pwd" id="pwd"></td>
                        </tr>
                        <tr>
                            <td><label for="pwd2">패스워드 확인</label></td>
                            <td><input type="password" name="pwd2" id="pwd2"></td>
                        </tr>
                        <tr>
                            <td>이름</td>
                            <td><input type="text" name="uname" id="uname"></td>
                        </tr>
                        <tr>
                            <td>Tel</td>
                            <td>
                                <input type="tel" name="tel" id="tel" placeholder="010-1234-5678" pattern="[0-9]{2, 3}-[0-9]{3, 4}-[0-9]{3, 4}">
                            </td>
                        </tr>
                        <tr>
                            <td>email</td>
                            <td><input type="email" name="email" id="email" placeholder="hsuser@hoseo.com"></td>
                        </tr>
                        <tr>
                            <td colspan="2" style="text-align: center;">
                                <input class="mr-1 mb-5 btn btn-primary" type="submit" value="확인">
                                <input class="mb-5 btn btn-secondary" type="reset" value="취소">
                            </td>
                        </tr>
                    </table>
                </form>
            </div>
            <div class="col-2"></div>
        </div>
    </div>
    ${template.footer()}
    `;
}