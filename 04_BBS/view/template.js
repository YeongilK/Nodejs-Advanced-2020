module.exports = {
    header:     function(uname) {
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
        <ul class="navbar-nav mr-auto">
            <li class="nav-item">
                <a class="nav-link" href="/" style="margin-right: 50px;"><i class="fas fa-home fa-2x"></i></a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="/user/list" style="margin-right: 50px"><i class="fas fa-user-edit fa-2x"></i></a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="/bbs/create"><i class="far fa-edit fa-2x"></i></a>
            </li>
        </ul>
        <ul class="navbar-text mr-5">${uname}님 안녕하세요.</ul>
        <ul class="navbar-nav fixed-right">
            <li>
                <input class="form-control mr-5" type="text" placeholder="제목 검색">
            </li>
            <li>
                <button class="btn btn-secondary" type="submit"><i class="fas fa-search"></i></button>
            </li>
            <li>
                <a class="nav-link ml-5" href="/logout" style="margin-right: 30px;"><i class="fas fa-sign-out-alt fa-2x"></i></a>
            </li>
        </ul>
    </nav>
        `;
    },
    footer:     function() {
        return `
    <nav class="navbar navbar-expand-sm bg-dark navbar-dark justify-content-center fixed-bottom">
        <span class="navbar-text">Copyright ⓒ 2020 Hoseo institute of Big Data</span>
    </nav>
    </body>
    </html>
        `;
    }
}