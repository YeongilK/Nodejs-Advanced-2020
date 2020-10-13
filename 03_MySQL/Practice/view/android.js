module.exports.androidForm = function(uname) {
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
                        <a class="nav-link active" href="/android">안드로이드</a>
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
                <form action="/android" method="POST">
                    <h2 id="android" class="text-primary">
                        <a href="http://ko.wikipedia.org/wiki/안드로이드_(운영_체제)">안드로이드</a>
                    </h2>
                    <p style="font-family: 휴먼편지체;">
                        안드로이드(영어:Android)는 휴대 전화를 비롯한 휴대용 장치를 위한
                        운영 체제와 미들웨어, 사용자 인터페이스 그리고 표준 응용
                        프로그램(웹 브라우저, 이메일 클라이언트, 단문 메시지 서비스(MMS) 등)을
                        포함하고 있는 소프트웨어 스택이자 모바일 운영 체제이다.
                        안드로이드는 개발자들이 자바와 코틀린 언어로 응용 프로그램을
                        작성할 수 있게 하였으며, 컴파일된 바이트 코드를 구동할 수 있는
                        런타임 라이브러리를 제공한다. 또한 안드로이드 소프트웨어 개발 키트를
                        통해 응용 프로그램을 개발하는 데 필요한 각종 도구와 응용 프로그램
                        인터페이스(API)를 제공한다. 안드로이드는 리눅스 커널 위에서 동작하며,
                        자바와 코틀린으로 앱을 만들어 동작한다. 또한 다양한 안드로이드 시스템
                        구성 요소에서 사용되는 C/C++ 라이브러리들을 포함하고 있다.
                        안드로이드는 기존의 자바 가상 머신과는 다른 가상 머신인 안드로이드
                        런타임을 통해 자바와 코틀린으로 작성된 응용 프로그램을 별도의
                        프로세스에서 실행하는 구조로 되어 있다. 2005년에 안드로이드 사를 
                        구글에서 인수한 후 2007년 11월에 안드로이드 플랫폼을 휴대용 장치 
                        운영 체제로서 무료 공개한다고 발표한 후 48개의 하드웨어, 소프트웨어,
                        통신 회사가 모여 만든 오픈 핸드셋 얼라이언스(Open Handset Aliance, OHA)
                        에서 공개 표준을 위해 개발하고 있다. 구글은 안드로이드의 모든 소스 코드를
                        오픈 소스 라이선스인 아파치 v2 라이선스로 배포하고 있어 기업이나 사용자는
                        각자 안드로이드 프로그램을 독자적으로 개발을 해서 탑재할 수 있다.
                        또한 등록한 개발자들이 소비자에게 응용 프로그램을 판매할 수 있는 구글
                        플레이를 제공하고 있으며, 이와 별도로 각 제조사 혹은 통신사별 응용
                        프로그램 마켓이 함께 운영되고 있다.
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