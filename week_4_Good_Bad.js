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
    .style("text-decoration", "underline");


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
    .text("Shot Distance");
}

drawVis();
