// 数据
const labels = ['Mo', 'Tu', 'Wed', 'Thu', 'Fri', 'Saty', 'Sun'];
const data = [4, 2, 2, 1, 2, 3, 2];

// 定义图表参数
const barWidth = 40;
const barGap = 20;
const chartHeight = 300;
const chartWidth = 800;
const maxValue = Math.max(...data);
const barChart = document.getElementById('barChart');
const lineChart = document.getElementById('lineChart');

// 添加X轴和Y轴的比例尺
const addAxes = (svg, chartHeight, chartWidth, maxValue) => {
    // 添加 Y 轴
    for (let i = 0; i <= maxValue; i++) {
        const y = chartHeight - (i / maxValue) * chartHeight + 20; // 顶部留出间距
        const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        label.setAttribute('x', 30);
        label.setAttribute('y', y + 5);
        label.setAttribute('text-anchor', 'end');
        label.textContent = i;
        svg.appendChild(label);

        // 添加水平线（辅助线）
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', 40);
        line.setAttribute('y1', y);
        line.setAttribute('x2', chartWidth);
        line.setAttribute('y2', y);
        line.setAttribute('stroke', '#ccc');
        svg.appendChild(line);
    }

    // 添加 X 轴
    const xAxis = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    xAxis.setAttribute('x1', 40);
    xAxis.setAttribute('y1', chartHeight + 20);
    xAxis.setAttribute('x2', chartWidth);
    xAxis.setAttribute('y2', chartHeight + 20);
    xAxis.setAttribute('stroke', 'black');
    svg.appendChild(xAxis);
};

// 生成柱状图
data.forEach((value, index) => {
  const height = (value / maxValue) * chartHeight;
  const x = index * (barWidth + barGap) + 50;
  const y = chartHeight - height + 20; // 顶部间距

  // 添加柱状矩形
  const bar = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  bar.setAttribute('x', x);
  bar.setAttribute('y', y);
  bar.setAttribute('width', barWidth);
  bar.setAttribute('height', height);
  bar.setAttribute('fill', 'rgba(75, 192, 192, 0.6)');
  barChart.appendChild(bar);

  // 添加X轴标签
  const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  label.setAttribute('x', x + barWidth / 2);
  label.setAttribute('y', chartHeight + 40); // 让标签有足够的间距
  label.setAttribute('text-anchor', 'middle'); 
  label.textContent = labels[index];
  barChart.appendChild(label);
});

// 添加柱状图的坐标轴
addAxes(barChart, chartHeight, chartWidth, maxValue);

// 生成折线图的点
const points = data.map((value, index) => {
  const x = index * (barWidth + barGap) + 50 + barWidth / 2;
  const y = chartHeight - (value / maxValue) * chartHeight + 20; // 顶部间距
  return `${x},${y}`;
}).join(' ');

// 生成折线
const line = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
line.setAttribute('points', points);
line.setAttribute('stroke', 'rgba(75, 192, 192, 1)');
line.setAttribute('fill', 'none');
line.setAttribute('stroke-width', '2');
lineChart.appendChild(line);

// 生成折线图上的点
data.forEach((value, index) => {
  const x = index * (barWidth + barGap) + 50 + barWidth / 2;
  const y = chartHeight - (value / maxValue) * chartHeight + 20; // 顶部间距

  const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  dot.setAttribute('cx', x);
  dot.setAttribute('cy', y);
  dot.setAttribute('r', 5);
  dot.setAttribute('fill', 'rgba(75, 192, 192, 1)');
  lineChart.appendChild(dot);

  // 添加鼠标悬停显示 y 轴对应信息
  dot.addEventListener('mouseenter', (event) => {
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = `Value: ${value}`;
    tooltip.style.position = 'absolute';
    tooltip.style.left = `${event.pageX + 10}px`;
    tooltip.style.top = `${event.pageY - 20}px`;
    tooltip.style.padding = '5px';
    tooltip.style.background = '#333';
    tooltip.style.color = '#fff';
    tooltip.style.borderRadius = '4px';
    tooltip.style.pointerEvents = 'none';
    document.body.appendChild(tooltip);

    dot.addEventListener('mouseleave', () => {
      document.body.removeChild(tooltip);
    });
  });

  // 添加X轴标签
  const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  label.setAttribute('x', x);
  label.setAttribute('y', chartHeight + 40); // 让标签有足够的间距
  label.setAttribute('text-anchor', 'middle');
  label.textContent = labels[index];
  lineChart.appendChild(label);
});

// 添加折线图的坐标轴
addAxes(lineChart, chartHeight, chartWidth, maxValue);
