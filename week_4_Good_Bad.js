import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

async function drawVis() {
  // Define dataset manually for the heatmap
  const dataset = [
    { League: "Bundesliga", Year: 2016, ShotDistance: 18.6 },
    { League: "Bundesliga", Year: 2017, ShotDistance: 17.8 },
    { League: "Bundesliga", Year: 2018, ShotDistance: 17.7 },
    { League: "Bundesliga", Year: 2019, ShotDistance: 17.8 },
    { League: "Bundesliga", Year: 2020, ShotDistance: 17.2 },
    { League: "Bundesliga", Year: 2021, ShotDistance: 17.3 },
    { League: "Bundesliga", Year: 2022, ShotDistance: 17.3 },
    { League: "Bundesliga", Year: 2023, ShotDistance: 16.4 },
    { League: "Bundesliga", Year: 2024, ShotDistance: 16.5 },
    { League: "La Liga", Year: 2016, ShotDistance: 18.0 },
    { League: "La Liga", Year: 2017, ShotDistance: 17.7 },
    { League: "La Liga", Year: 2018, ShotDistance: 17.9 },
    { League: "La Liga", Year: 2019, ShotDistance: 17.8 },
    { League: "La Liga", Year: 2020, ShotDistance: 17.3 },
    { League: "La Liga", Year: 2021, ShotDistance: 17.6 },
    { League: "La Liga", Year: 2022, ShotDistance: 17.1 },
    { League: "La Liga", Year: 2023, ShotDistance: 17.0 },
    { League: "La Liga", Year: 2024, ShotDistance: 16.9 },
    { League: "Ligue 1", Year: 2016, ShotDistance: 18.8 },
    { League: "Ligue 1", Year: 2017, ShotDistance: 18.5 },
    { League: "Ligue 1", Year: 2018, ShotDistance: 18.4 },
    { League: "Ligue 1", Year: 2019, ShotDistance: 18.8 },
    { League: "Ligue 1", Year: 2020, ShotDistance: 18.5 },
    { League: "Ligue 1", Year: 2021, ShotDistance: 18.3 },
    { League: "Ligue 1", Year: 2022, ShotDistance: 17.8 },
    { League: "Ligue 1", Year: 2023, ShotDistance: 16.5 },
    { League: "Ligue 1", Year: 2024, ShotDistance: 16.5 },
    { League: "Premier League", Year: 2016, ShotDistance: 18.2 },
    { League: "Premier League", Year: 2017, ShotDistance: 18.0 },
    { League: "Premier League", Year: 2018, ShotDistance: 17.8 },
    { League: "Premier League", Year: 2019, ShotDistance: 17.7 },
    { League: "Premier League", Year: 2020, ShotDistance: 17.4 },
    { League: "Premier League", Year: 2021, ShotDistance: 16.8 },
    { League: "Premier League", Year: 2022, ShotDistance: 17.0 },
    { League: "Premier League", Year: 2023, ShotDistance: 15.9 },
    { League: "Premier League", Year: 2024, ShotDistance: 16.2 },
    { League: "Serie A", Year: 2016, ShotDistance: 19.0 },
    { League: "Serie A", Year: 2017, ShotDistance: 18.9 },
    { League: "Serie A", Year: 2018, ShotDistance: 18.0 },
    { League: "Serie A", Year: 2019, ShotDistance: 18.3 },
    { League: "Serie A", Year: 2020, ShotDistance: 18.2 },
    { League: "Serie A", Year: 2021, ShotDistance: 17.9 },
    { League: "Serie A", Year: 2022, ShotDistance: 16.9 },
    { League: "Serie A", Year: 2023, ShotDistance: 16.8 },
    { League: "Serie A", Year: 2024, ShotDistance: 17.0 },
  ];

  const leagues = [...new Set(dataset.map((d) => d.League))];
  const years = [...new Set(dataset.map((d) => d.Year))];

  const margin = { top: 50, right: 50, bottom: 50, left: 100 };
  const width = 800 - margin.left - margin.right;
  const height = 500 - margin.top - margin.bottom;

  const svg = d3
    .select("#visContainer")
    .append("svg")
    .attr("width", width + margin.left + margin.right + 100)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  const xScale = d3.scaleBand().domain(years).range([0, width]).padding(0.05);
  const yScale = d3.scaleBand().domain(leagues).range([0, height]).padding(0.05);

  const colorScale = d3
    .scaleSequential()
    .interpolator(d3.interpolateYlGnBu)
    .domain([16.5, 19]);

  svg
    .selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("x", (d) => xScale(d.Year))
    .attr("y", (d) => yScale(d.League))
    .attr("width", xScale.bandwidth())
    .attr("height", yScale.bandwidth())
    .style("fill", (d) => colorScale(d.ShotDistance));


    svg
    .selectAll("text.label")
    .data(dataset)
    .enter()
    .append("text")
    .attr("x", (d) => xScale(d.Year) + xScale.bandwidth() / 2)
    .attr("y", (d) => yScale(d.League) + yScale.bandwidth() / 2)
    .attr("dy", ".35em")
    .attr("text-anchor", "middle")
    .style("fill", (d) => (d.ShotDistance > 18 ? "white" : "black"))
    //.style("fill", "black")
    .style("font-size", "10px")
    .text((d) => d.ShotDistance);

  svg
    .append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(xScale).tickSize(0))
    .select(".domain")
    .remove();

  svg.append("g").call(d3.axisLeft(yScale).tickSize(0)).select(".domain").remove();

  svg
    .append("text")
    .attr("x", width / 2)
    .attr("y", -margin.top / 2)
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .style("text-decoration", "underline")
    .text("Average Shot Distance Across Europe's Top 5 Leagues");


    // Add color legend
  const legendHeight = 300;
  const legendWidth = 15;

  const legend = svg
    .append("g")
    .attr("transform", `translate(${width + 5}, 0)`);

  const legendScale = d3.scaleLinear().domain(colorScale.domain()).range([legendHeight, 0]);

  const legendAxis = d3.axisRight(legendScale).ticks(5);

  const legendGradient = svg
    .append("defs")
    .append("linearGradient")
    .attr("id", "legend-gradient")
    .attr("x1", "0%")
    .attr("y1", "100%")
    .attr("x2", "0%")
    .attr("y2", "0%");

  legendGradient
    .append("stop")
    .attr("offset", "0%")
    .attr("stop-color", colorScale(d3.extent(dataset, (d) => d.ShotDistance)[0]));

  legendGradient
    .append("stop")
    .attr("offset", "100%")
    .attr("stop-color", colorScale(d3.extent(dataset, (d) => d.ShotDistance)[1]));

  legend
    .append("rect")
    .attr("width", legendWidth)
    .attr("height", legendHeight)
    .style("fill", "url(#legend-gradient)");

  legend
    .append("g")
    .attr("transform", `translate(${legendWidth+ 5}, 0)`)
    .call(legendAxis);

  // Add label for ShotDistance
  svg
    .append("text")
    .attr("x", width + 60)
    .attr("y", -10)
    .attr("text-anchor", "middle")
    .style("font-size", "12px")
    .style("font-weight", "bold")
    .text("Shot Distance")

    

}

drawVis();


// New function to draw Global Sales by Genre and Platform
async function drawSalesChart() {
    const salesData = await d3.csv("./datasets/fake_videogames_sales.csv", d3.autoType);
  
    // Aggregate data by Genre and Platform
    const nestedData = d3.rollups(
      salesData,
      v => d3.sum(v, d => parseFloat(d.Global_Sales)),
      d => d.Genre,
      d => d.Platform
    );
  
    // Transform the nested data into a flat structure for easier use
    const transformedData = [];
    nestedData.forEach(([genre, platforms]) => {
      platforms.forEach(([platform, sales]) => {
        transformedData.push({ Genre: genre, Platform: platform, GlobalSales: sales });
      });
    });
  
    const genres = [...new Set(transformedData.map(d => d.Genre))];
    const platforms = [...new Set(transformedData.map(d => d.Platform))];
  
    const salesMargin = { top: 50, right: 50, bottom: 100, left: 100 };
    const salesWidth = 800 - salesMargin.left - salesMargin.right;
    const salesHeight = 500 - salesMargin.top - salesMargin.bottom;
  
    const salesSvg = d3
      .select("#visContainer")
      .append("svg")
      .attr("width", salesWidth + salesMargin.left + salesMargin.right)
      .attr("height", salesHeight + salesMargin.top + salesMargin.bottom)
      .append("g")
      .attr("transform", `translate(${salesMargin.left}, ${salesMargin.top})`);
  
    const salesXScale = d3.scaleBand().domain(platforms).range([0, salesWidth]).padding(0.1);
    const salesYScale = d3.scaleLinear().domain([0, d3.max(transformedData, d => d.GlobalSales)]).range([salesHeight, 0]);
    const salesColorScale = d3.scaleOrdinal(d3.schemeCategory10).domain(genres);
  
    salesSvg
      .selectAll("rect")
      .data(transformedData)
      .enter()
      .append("rect")
      .attr("x", d => salesXScale(d.Platform))
      .attr("y", d => salesYScale(d.GlobalSales))
      .attr("width", salesXScale.bandwidth())
      .attr("height", d => salesHeight - salesYScale(d.GlobalSales))
      .attr("fill", d => salesColorScale(d.Genre))
      .attr("stroke", "black")
      .attr("stroke-width", 0.5);
  
    salesSvg
      .append("g")
      .attr("transform", `translate(0, ${salesHeight})`)
      .call(d3.axisBottom(salesXScale))
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-0.8em")
      .attr("dy", "0.15em")
      .attr("transform", "rotate(-45)");
  
    salesSvg.append("g").call(d3.axisLeft(salesYScale));
  
    salesSvg
      .append("text")
      .attr("x", salesWidth / 2)
      .attr("y", -salesMargin.top / 2)
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .style("text-decoration", "underline")
      .text("Global Sales by Genre and Platform");
  }
  
  drawSalesChart();


  
  // JavaScript 函数，用于绘制 Xbox 和 PlayStation 平台的各区域销售数据，调整了条形间距
async function drawRegionSalesChart() {
    // 从 CSV 文件中加载销售数据
    const salesData = await d3.csv("./datasets/fake_videogames_sales.csv", d3.autoType);
  
    // 仅筛选 Xbox 和 PlayStation 平台的数据
    const filteredData = salesData.filter(d => d.Platform === "XOne" || d.Platform === "360" || d.Platform === "PS3" || d.Platform === "PS4");
  
    // 打印所有可用平台
    console.log("Available Platforms:", [...new Set(salesData.map(d => d.Platform))]);
  
    // 按平台和区域汇总数据
    const nestedData = d3.rollups(
      filteredData,
      v => ({
        NA_Sales: d3.sum(v, d => parseFloat(d.NA_Sales)),
        EU_Sales: d3.sum(v, d => parseFloat(d.EU_Sales)),
        JP_Sales: d3.sum(v, d => parseFloat(d.JP_Sales)),
        Other_Sales: d3.sum(v, d => parseFloat(d.Other_Sales))
      }),
      d => (d.Platform === "PS3" || d.Platform === "PS4") ? "PS" : "Xbox" // 将 PS3 和 PS4 归为 PS，XOne 和 360 归为 Xbox
    );
  
    // 将嵌套数据转换为完整的平坦结构，确保所有平台都有数据
    const platformsData = ["PS", "Xbox"];
    const transformedData = platformsData.flatMap(platform => {
      const sales = nestedData.find(d => d[0] === platform)?.[1] || { NA_Sales: 0, EU_Sales: 0, JP_Sales: 0, Other_Sales: 0 };
      return [
        { Platform: platform, Region: "NA_Sales", Sales: sales.NA_Sales },
        { Platform: platform, Region: "EU_Sales", Sales: sales.EU_Sales },
        { Platform: platform, Region: "JP_Sales", Sales: sales.JP_Sales },
        { Platform: platform, Region: "Other_Sales", Sales: sales.Other_Sales }
      ];
    });
  
    // 定义要在可视化中展示的平台和区域
    const platforms = ["PS", "Xbox"];
    const regions = [...new Set(transformedData.map(d => d.Region))];
  
    // 定义 SVG 容器的边距、宽度和高度
    const regionMargin = { top: 50, right: 200, bottom: 100, left: 100 };
    const regionWidth = 800 - regionMargin.left - regionMargin.right;
    const regionHeight = 500 - regionMargin.top - regionMargin.bottom;
  
    // 创建 SVG 容器
    const regionSvg = d3
      .select("#visContainer")
      .append("svg")
      .attr("width", regionWidth + regionMargin.left + regionMargin.right)
      .attr("height", regionHeight + regionMargin.top + regionMargin.bottom)
      .append("g")
      .attr("transform", `translate(${regionMargin.left}, ${regionMargin.top})`);
  
    // 定义 X 轴和 Y 轴的比例尺
    const regionXScale = d3.scaleBand().domain(platforms).range([0, regionWidth]).padding(0.5);
    const regionYScale = d3.scaleLinear().domain([0, d3.max(transformedData, d => d.Sales)]).range([regionHeight, 0]);
    const regionColorScale = d3.scaleOrdinal().domain(regions).range(["#a6a6a6", "#89b7ff", "#7fd38c", "#ffe680"]);
  
    // 调整条形宽度以增加间距并使其更粗
    const barWidth = regionXScale.bandwidth() / regions.length;
  
    // 创建条形组并添加表示销售数据的矩形
    regionSvg
      .selectAll("g.bar-group")
      .data(transformedData)
      .enter()
      .append("g")
      .attr("class", "bar-group")
      .attr("transform", d => `translate(${regionXScale(d.Platform)}, 0)`)
      .append("rect")
      .attr("y", d => regionYScale(d.Sales))
      .attr("width", barWidth)
      .attr("height", d => regionHeight - regionYScale(d.Sales))
      .attr("x", d => barWidth * regions.indexOf(d.Region))
      .attr("fill", d => regionColorScale(d.Region));
  
    // 添加 X 轴，显示平台名称
    regionSvg
      .append("g")
      .attr("transform", `translate(0, ${regionHeight})`)
      .call(d3.axisBottom(regionXScale))
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-0.8em")
      .attr("dy", "0.15em")
      .attr("transform", "rotate(-45)");
  
    // 添加 Y 轴
    regionSvg.append("g").call(d3.axisLeft(regionYScale));
  
    // 为图表添加标题
    regionSvg
      .append("text")
      .attr("x", regionWidth / 2)
      .attr("y", -regionMargin.top / 2)
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .style("text-decoration", "underline")
      .text("Sales Data by Region for Xbox and PlayStation Platforms");
  
    // 为各区域添加图例
    const legend = regionSvg
      .append("g")
      .attr("transform", `translate(${regionWidth + 20}, 0)`);
  
    // 为每个区域创建图例条目
    regions.forEach((region, i) => {
      legend
        .append("rect")
        .attr("x", 0)
        .attr("y", i * 20)
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", regionColorScale(region));
  
      legend
        .append("text")
        .attr("x", 25)
        .attr("y", i * 20 + 9)
        .attr("dy", "0.35em")
        .text(region);
    });
  }
  
  // 执行函数以绘制图表
  drawRegionSalesChart();


  
  
  
  
  