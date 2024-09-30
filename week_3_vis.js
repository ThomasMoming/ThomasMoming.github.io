async function render() {

    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight - 200; 
    
    // load data
    const data = await d3.csv("Data_Videogames/videogames_wide.csv");
    console.log(data);

    data.forEach(d => {
        console.log({
            Platform: d.Platform,
            NA_Sales: d.NA_Sales,
            EU_Sales: d.EU_Sales,
            JP_Sales: d.JP_Sales,
            Other_Sales: d.Other_Sales
        });
    });

    
    // 预处理数据，确保销售数据为有效数值，并打印出来
    data.forEach(d => {
        d.NA_Sales = isNaN(+d.NA_Sales) ? 0 : +d.NA_Sales;
        d.EU_Sales = isNaN(+d.EU_Sales) ? 0 : +d.EU_Sales;
        d.JP_Sales = isNaN(+d.JP_Sales) ? 0 : +d.JP_Sales;
        d.Other_Sales = isNaN(+d.Other_Sales) ? 0 : +d.Other_Sales;

        console.log(`Platform: ${d.Platform}, NA_Sales: ${d.NA_Sales}, EU_Sales: ${d.EU_Sales}, JP_Sales: ${d.JP_Sales}, Other_Sales: ${d.Other_Sales}`);
    });

  
    // create a bar chart
    const vlSpec = vl
      .markBar()
      .data(data)
      .encode(
        vl.y().fieldN("Platform").title("Platform"),  
        vl.x().fieldQ("Global_Sales").aggregate("sum").title("Total Global Sales (in millions)"),  
        vl.color().fieldN("Genre").title("Genre") 
        .scale({
            range: [
              "#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd",
              "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf", "#9edae5"
            ]
          })
      )
      .width(1500)  
      .height(800)  
      .toSpec();

    // create a line chart for sales trends over time
    const vlLineSpec = vl
    .markLine()
    .data(data)
    .encode(
      vl.x().fieldT("Year").title("Year"),  
      vl.y().fieldQ("Global_Sales").aggregate("sum").title("Total Global Sales (in millions)"),  
      vl.color().fieldN("Platform").title("Platform")
      .legend({ symbolLimit: 100 })  
      .scale({
        range: [
            "#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd",
              "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf", "#9edae5", 
              "#aec7e8", "#ffbb78", "#98df8a", "#ff9896", "#c5b0d5",
              "#c49c94", "#f7b6d2", "#c7c7c7", "#dbdb8d", "#9edae5", "#17becf"
        ]
      })
    )
    .width(1500)  
    .height(600)
    .toSpec();

    // create a stacked bar chart for regional sales by platform
    const vlStackedBarSpec = vl
    .markBar()
    .data(data)
    .transform(
      vl.fold(['NA_Sales', 'EU_Sales', 'JP_Sales', 'Other_Sales']).as('Region', 'Sales')
    )
    .encode(
      vl.y().fieldN('Platform').title('Platform'),
      vl.x().fieldQ('Sales').aggregate('sum').title('Total Sales (in millions)'),
      vl.color().fieldN('Region').title('Region')
        .scale({
          range: ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728"]
        })
    )
    .width(1500)
    .height(600)
    .toSpec();
    

  
    // Render the bar chart
    vegaEmbed("#view", vlSpec).then((result) => {
      const view = result.view;
      view.run();
    });
  
    // Render the line chart
    vegaEmbed("#view_line", vlLineSpec).then((result) => {
        const view = result.view;
        view.run();
      });

    // Render the stacked bar chart
    vegaEmbed("#view_stacked", vlStackedBarSpec).then((result) => {
        const view = result.view;
        view.run();
      });
}

render();
