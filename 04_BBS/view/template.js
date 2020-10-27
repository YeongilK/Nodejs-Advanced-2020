module.exports = {
    header:     function(uname, page) {
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
        <script type="text/javascript" src="/ckeditor/ckeditor.js"></script>
        <script type="text/javascript" src="/chart/Chart.bundle.min.js"></script>
    </head>
    <body>
    <nav class="navbar navbar-expand-sm bg-dark navbar-dark fixed-top">
        <img src="/img/hoseo.png" alt="logo" style="height: 40px; margin-right: 40px;">
        <ul class="navbar-nav mr-auto">
            <li class="nav-item">
                <a class="nav-link" href="/" style="margin-right: 50px;">
                    <i class="fas fa-home fa-2x"></i>&nbsp;Home
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="/user/list" style="margin-right: 50px">
                    <i class="fas fa-user-edit fa-2x"></i>&nbsp;개인정보수정
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="/bbs/list/${page}" style="margin-right: 50px">
                    <i class="fas fa-list-ul fa-2x"></i>&nbsp;게시글목록
                </a>
            </il>
            <li class="nav-item">
                <a class="nav-link" href="/logout">
                    <i class="fas fa-sign-out-alt fa-2x"></i>&nbsp;로그아웃
                </a>
            </il>
        </ul>
        <ul class="navbar-text mr-5">${uname}님 안녕하세요.</ul>
        <nav class="navbar navbar-light mr-4">
            <form class="form-inline" action="/bbs/search" method="post">
                <input class="form-control mr-sm-2" type="search" placeholder="제목 검색" name="keyword">
                <button class="btn btn-outline-light" type="submit"><i class="fas fa-search"></i></button>
            </form>
        </nav>
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
    },
    uploadScript:   function() {
        return `

    <script>
        $(".custom-file-input").on("change", function() {
            var fileName = $(this).val().split("\\\\").pop();
            $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
        });
        let ckeditor_config = {
            width: "100%",
            height: "400",
            enterMode : CKEDITOR.ENTER_BR,
            shiftEnterMode : CKEDITOR.ENTER_P,
            filebrowserUploadUrl: '/bbs/uploadImage'
        };
        CKEDITOR.replace('content', ckeditor_config);
    </script>
        `;
    },
    viewChart:      function(labels, data) {
        return `
        <script>
        var ctx = document.getElementById('myChart').getContext('2d');
        var labels = JSON.parse('${labels}');
        var data = JSON.parse('${data}');
        var myChart = new Chart(ctx, {
            type: 'horizontalBar',
            data: {
                labels: labels,
                datasets: [{
                    label: '게시판 조회수',
                    data: data,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.8)',
                        'rgba(54, 162, 235, 0.8)',
                        'rgba(255, 206, 86, 0.8)',
                        'rgba(75, 192, 192, 0.8)',
                        'rgba(153, 102, 255, 0.8)',
                        'rgba(255, 99, 132, 0.8)',
                        'rgba(54, 162, 235, 0.8)',
                        'rgba(255, 206, 86, 0.8)',
                        'rgba(75, 192, 192, 0.8)',
                        'rgba(153, 102, 255, 0.8)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    xAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
        </script>
        `;
    }
}

