const template = require('./template');

module.exports.viewBbsChartForm = function(uname, page, labels, data) {
    return `
    ${template.header(uname, page)}
    <div class="container-fluid" style="margin-top: 90px;">
        <div class="row">
            <div class="col-2"></div>
            <div class="col-7"><h3>조회수 TOP 10 게시글</h3></div>
            <div class="col-3"></div>
        </div>
    </div>
    <div class="container" style="margin-top: 30px;">
        <form action="/admin/viewChart" method="post">
            <canvas id="myChart" width="400" height="260" style="margin-bottom: 80px;"></canvas>
        </form>
    </div>
    <script>
        var ctx = document.getElementById('myChart').getContext('2d');
        var labels = JSON.parse(${labels});
        var data = JSON.parse(${data});
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
    ${template.uploadScript()}
    ${template.footer()}
    `;
}