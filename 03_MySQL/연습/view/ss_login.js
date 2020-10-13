module.exports.loginForm = function() {
    return `
    <!DOCTYPE html>
    <html lang="ko">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
        <title>사용자 관리</title>
    </head>
    <style>
    .carousel-inner img {
        width: 100%;
        height: 100%;
    }
    </style>
    <body>
    <div class="container">
        <div id="demo" class="mt-3 carousel slide" data-ride="carousel">
            <ul class="carousel-indicators">
                <li data-target="#demo" data-slide-to="0" class="active"></li>
                <li data-target="#demo" data-slide-to="1"></li>
                <li data-target="#demo" data-slide-to="2"></li>
                <li data-target="#demo" data-slide-to="3"></li>
            </ul>
            
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <img src="/note20.jpg" alt="Note20" style="width: 100%; height: 700px;">
                    <div class="carousel-caption">
                        <h3>Galaxy Note 20</h3>
                        <p>made by Samsung</p>
                    </div>   
                </div>
                <div class="carousel-item">
                    <img src="/zflip.jpg" alt="zflip" style="width: 100%; height: 700px;">
                    <div class="carousel-caption">
                        <h3>Galaxy Z Flip</h3>
                        <p>made by Samsung</p>
                    </div>   
                </div>
                <div class="carousel-item">
                    <img src="/zfold2.jpg" alt="zfold2" style="width: 100%; height: 700px;">
                    <div class="carousel-caption">
                        <h3>Galaxy Z Fold 2</h3>
                        <p>made by Samsung</p>
                    </div>   
                </div>
                <div class="carousel-item">
                    <img src="/iphone12.jpg" alt="iphone12" style="width: 100%; height: 700px;">
                    <div class="carousel-caption">
                        <h3>Iphone 12</h3>
                        <p>made by Apple</p>
                    </div>   
                </div>
            </div>

            <a class="carousel-control-prev" href="#demo" data-slide="prev">
                <span class="carousel-control-prev-icon"></span>
            </a>
            <a class="carousel-control-next" href="#demo" data-slide="next">
                <span class="carousel-control-next-icon"></span>
            </a>
        </div>

        <div class="mt-5 row">
            <div class="col-3"></div>
            <div class="col-6">
                <form action="/login" method="POST">
                    <div class="form-group">
                        <label for="uid">사용자ID:</label>
                        <input type="text" class="form-control" id="uid" name="uid" placeholder="Enter User ID">
                    </div>
                    <div class="form-group">
                        <label for="pwd">Password:</label>
                        <input type="password" class="form-control" id="pwd" placeholder="Enter password" name="pwd">
                    </div>
                    <input type="submit" class="mr-3 mb-5 btn btn-primary" value="확인">
                    <input type="reset" class="mb-5 btn btn-secondary" value="취소">
                </form>
            </div>
            <div class="col-3"></div>
        </div>
    </div>
    </body>
    </html>
    `;
} 