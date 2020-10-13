module.exports.zfold2Form = function(uname) {
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
                        <a class="nav-link" href="/sample">샘플</a>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navdropdown" data-toggle="dropdown">2020년 출시</a>
                        <div class="dropdown-menu">
                            <a class="dropdown-item" href="/note20">갤럭시 노트 20</a>
                            <a class="dropdown-item active" href="/zfold2">갤럭시 Z Fold 2</a>
                            <a class="dropdown-item" href="/zflip">갤럭시 Z Flip</a>
                            <a class="dropdown-item" href="/iphone12">아이폰 12</a>
                        </div>
                    </li>
                </ul>
            </div>

            <div class="col-10">
                <form action="/zfold2" method="POST">
                    <img src="/zfold2.jpg" alt="갤럭시zfold2" class="img-thumbnail" style="width: 700px; height: 500px;">
                    <table class="table table-bordered" style="margin-bottom: 90px;">
                        <thead>
                            <tr class="d-flex">
                                <th class="col-3">제품명</th>
                                <th class="col-3">제조사</th>
                                <th class="col-6">제품 특징</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="d-flex">
                                <td class="col-3">갤럭시 Z Fold 2</td>
                                <td class="col-3">Samsung</td>
                                <td class="col-6">
                                    <ul>
                                        <li>일반 스마트폰 사이즈 커버 디스플레이</li>
                                        <li>더욱 시원해진 풀 스크린 디스플레이</li>
                                        <li>3+1+1 = 5개의 카메라</li>
                                        <li>부드럽고 빠른 120Hz 어댑티브 디스플레이</li>
                                        <li>25W 초급속 충전을 지원하는 4,500mAh 배터리</li>
                                        <li>옆면: 왼쪽면과 오른쪽이 다른 특별한 디자인</li>
                                        <li>윗면/아랫면: 틈새를 더욱 줄인 모습</li>
                                        <li>뒷면: 심플하게 하지만 고급스럽게</li>
                                    </ul>
                                </td>
                            </tr>
                        </tbody>
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