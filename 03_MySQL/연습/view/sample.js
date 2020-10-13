module.exports.sampleForm = function(uname) {
    return `
<!DOCTYPE html>
<html lang="ko">
<head>
    <title>컴퓨터 기술 소개</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css"
    integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/" 
    crossorigin="anonymous">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
</head>
<body style="background-color: aliceblue;">
    <nav class="navbar navbar-expand-sm bg-dark navbar-dark fixed-top">
        <img src="/hoseo.png" alt="logo" style="height: 40px; margin-right: 40px;">
        <ul class="navbar-nav mr-auto">
            <li class="nav-item">
                <a class="nav-link" href="/" style="margin-right: 30px;">홈</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="/logout" style="margin-right: 30px;">로그아웃</a>
            </li>
        </ul>
        <div class="navbar-text fixed-right" id="weather">
            ${uname}님 안녕하세요.&nbsp;&nbsp;&nbsp;&nbsp;
            날씨: <i class="far fa-sun fa-lg"></i> / 온도: 22&deg;
        </div>
    </nav><br>
    
    <div class="container" style="margin-top: 90px;">
        <div class="row">
            <div class="col-2">
                <ul class="navbar-nav flex-column nav-pills">
                    <li class="nav-item">
                        <a class="nav-link" href="/history">역사</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/android">안드로이드</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/iphone">아이폰</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link active" href="/sample">샘플</a>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navdropdown" data-toggle="dropdown">2020년 출시</a>
                        <div class="dropdown-menu">
                            <a class="dropdown-item" href="/note20">갤럭시 노트 20</a>
                            <a class="dropdown-item" href="/zfold2">갤럭시 Z Fold 2</a>
                            <a class="dropdown-item" href="/zflip">갤럭시 Z Flip</a>
                            <a class="dropdown-item" href="/iphone12">아이폰 12</a>
                        </div>
                    </li>
                </ul>
            </div>

            <div class="col-10">
                <form action="/sample" method="POST">
                    <h2 id="sample" class="text-primary">샘플</h2>
                    <table class="table table-bordered"  style="text-align: center;">
                        <thead><tr><th>스마트폰샘플</th></tr></thead>
                        <tbody><tr><td><img src="/smartphone.jpg"></td></tr></tbody>
                    </table>
                </form>
                <br>
                <nav class="navbar navbar-expand-sm bg-secondary navbar-dark justify-content-center fixed-bottom">
                    <span class="navbar-text">Copyright ⓒ 2020 Hoseo institute of Big Data</span>
                </nav>
            </div>
        </div>
    </div>
</body>
</html>
    `;
}