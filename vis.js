// 获取 canvas 元素
const ctx = document.getElementById('myChart').getContext('2d');
const lineCtx = document.getElementById('line_myChart').getContext('2d');

// 定义图表数据
const data = {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], // x轴
    datasets: [{
        label: 'Y ',
        data: [4, 2, 2, 1, 2, 3, 2], // y轴数据
        backgroundColor: [
            'rgba(75, 192, 192, 0.6)', // 每根柱的颜色
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)',
            'rgba(255, 159, 64, 0.6)',
            'rgba(255, 99, 132, 0.6)'
        ],
        borderColor: [
            'rgba(75, 192, 192, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255, 99, 132, 1)'
        ],
        borderWidth: 1 // 边框宽度
    }]
};

// 定义图表配置
const config = {
    type: 'bar', // 图表类型为柱状图
    data: data, // 图表数据
    options: {
        scales: {
            y: {
                beginAtZero: true // Y轴从0开始
            }
        }
    }
};

const lineConfig = {
    type: 'line',
    data: data,
    options:{
        scales:{
            y:{
                beginAtZero:true
            }
        }
    }
}




const myChart = new Chart(ctx, config);
const line_myChart = new Chart(lineCtx,lineConfig)
