module.exports.iphoneForm = function(uname) {
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
                        <a class="nav-link active" href="/iphone">아이폰</a>
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
                <form action="/iphone" method="POST">
                    <h2 id="iphone" class="text-primary">
                        <a href="http://ko.wikipedia.org/wiki/아이폰">아이폰</a>
                    </h2>
                    <p style="font-family: 휴먼편지체;">
                        아이폰(영어:iphone)은 2007년 1월 9일, 애플이 발표한 휴대 전화
                        시리즈이다. 미국 샌프란시스코에서 열린 맥월드 2007에서 애플의
                        창업자 중 한명인 스티브 잡스가 발표했다. 그 뒤로 애플은 해마다
                        새로운 아이폰 모델과 iOS 업데이트를 출시해왔다. 2018년 11월 1일
                        기준으로, 2,200,000,000(22억)대 이상의 아이폰이 판매되었다.
                        아이폰의 사용자 인터페이스는 가상 키보드를 갖춘 멀티 터치 화면으로
                        구성된다. 아이폰은 셀룰러 망이나 와이파이에 연결되며, 통화,
                        웹 브라우징, 사진 촬영, 음악 재생, 이메일과 텍스트 메시지 송수신을
                        할 수 있다. 아이폰 런칭 이후 더 많은 기능들이 추가되었는데,
                        여기에는 더 큰 화면 크기, 동영상 촬영, 방수 기능, 앱 스토어를
                        경유한 서드파티 모바일 앱의 설치 기능, 접근성 지원이 포함된다.
                        2017년까지 아이폰은 전면 패널에 사용자를 홈 스크린으로 복귀시키는
                        하나의 버튼을 갖춘 레이아웃을 사용하였다. 2017년 이후로,
                        더 값비싼 아이폰 모델들은 제스처 인식에 의해 앱 전환 활성화가
                        가능한, 베젤리스에 가까운 전면 화면 디자인으로 전환하였다. 
                        1세대 아이폰은 모바일 전화 산업 면에서 "혁명적인"(revolutionary),
                        "게임 체인저"(game changer)라는 용어로 기술되었으며 차기 모델들 또한
                        찬사를 받았다. 아이폰은 스마트폰과 슬레이트 폼 팩터를 보급하는데 주된
                        기여를 하였으며 스마트폰 앱과 앱 경제를 위한 커다란 시장을 창출하였다.
                        2017년 1월 기준으로, 애플의 앱 스토어에는 아이폰을 대상으로 2,200,000개
                        이상의 애플리케이션이 포함되었다.<br>
                        아이폰은 구글의 안드로이드와 함께 세계 최대의 2대 스마트폰 플랫폼
                        가운데 하나이다.
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