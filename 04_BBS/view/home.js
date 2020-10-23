const template = require('./template');

module.exports.mainForm = function(uname, page) {
    return `
    ${template.header(uname, page)}
    <div class="container" style="margin-top: 90px;">
    <div class="jumbotron text-center">
        <h2>사이트를 방문해주셔서 감사합니다</h2><br>
        <p>자유롭게 구경하시고 행복한 하루 되세요</p>
    </div>
        <div class="row">
            <div class="col-1"></div>
            <div class="col-10">
                <form action="/" method="post">
                    <div class="container mt-3">
                        <div id="demo" class="carousel slide" data-ride="carousel">
                            <ul class="carousel-indicators">
                                <li data-target="#demo" data-slide-to="0" class="active"></li>
                                <li data-target="#demo" data-slide-to="1"></li>
                                <li data-target="#demo" data-slide-to="2"></li>
                                <li data-target="#demo" data-slide-to="3"></li>
                            </ul>
                            <div class="carousel-inner">
                                <div class="carousel-item active">
                                    <img src="/img/rooney.jpg" alt="Rooney" width="1100" height="500">
                                </div>
                                <div class="carousel-item">
                                    <img src="/img/torres.jpg" alt="Fernando Torres" width="1100" height="500">
                                </div>
                                <div class="carousel-item">
                                    <img src="/img/messi.jpg" alt="Lionel Messi" width="1100" height="500">
                                </div>
                                <div class="carousel-item">
                                    <img src="/img/son.jpg" alt="Heung-Min Son" width="1100" height="500">
                                </div>
                            </div>
                            <a class="carousel-control-prev" href="#demo" data-slide="prev">
                                <span class="carousel-control-prev-icon"></span>
                            </a>
                            <a class="carousel-control-next" href="#demo" data-slide="next">
                                <span class="carousel-control-next-icon"></span>
                            </a>
                        </div>    
                    </div>
                </form>
            </div>
            <div class="col-1"></div>

        </div>
    </div>
    ${template.footer()}
    `;
}