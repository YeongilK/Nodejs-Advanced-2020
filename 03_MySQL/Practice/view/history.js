module.exports.historyForm = function(uname) {
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
                        <a class="nav-link active" href="/history">역사</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/android">안드로이드</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/iphone">아이폰</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/sample">샘플</a>
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
                <form action="/history" method="POST">
                    <h2 id="history" class="text-primary">
                        <a href="http://ko.wikipedia.org/wiki/스마트폰#역사">역사</a>
                    </h2>
                    <p style="font-family: 휴먼편지체;">
                        최초의 스마트폰은 사이먼(Symon)으로 추정된다. IBM사가 1992년에
                        설계하여 그해에 미국 네바다 주의 라스베이거스에서 열린 컴댁스에서
                        컨셉 제품으로 전시되었다. 1993년에 대중에게 공개되었고 벨사우스에게
                        팔렸다. 휴대 전화의 기능을 할 뿐 아니라 주소록, 세계 시각, 계산기,
                        메모장, 전자 우편, 팩스 송수신, 오락까지 할 수 있었다. 전화 번호를
                        누르기 위한 물리적인 단추가 없이 터치 스크린을 사용하여 손가락으로
                        전화 번호를 입력할 수 있었다. 또, 팩시밀리와 메모를 수행하기 위해
                        부가적인 스타일러스 펜을 사용할 수 있었다. 문자열 또한 화면 상의
                        키보드로 입력이 가능하였다. 오늘날의 표준에서 사이먼은 매우 저가
                        제품으로 여겨져 있으나 당시에는 믿기지 못할 정도로 기능이
                        고급이었다고 평가 받았다.
                    </p>
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