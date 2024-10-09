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

  
    // 平台总体销售额图表
    const platformSpec = vl
        .markBar()
        .data(data)
        .encode(
            vl.y().fieldN("Platform").title("Platform"),
            vl.x().fieldQ("Global_Sales").aggregate("sum").title("Total Global Sales (in millions)"),
            vl.color().fieldN("Platform").title("Platform")
        )
        .width(800)
        .height(600)
        .toSpec();

    
    // 游戏类型总体销售额图表
    const genreSpec = vl
        .markBar()
        .data(data)
        .encode(
            vl.y().fieldN("Genre").title("Genre"),
            vl.x().fieldQ("Global_Sales").aggregate("sum").title("Total Global Sales (in millions)"),
            vl.color().fieldN("Genre").title("Genre")
        )
        .width(800)
        .height(600)
        .toSpec();







    // 时间趋势图，全球销售额随时间的变化，面积图
    const vlLineSpec = vl
    .markArea()
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

        // 时间趋势图，气泡图
    const vlBubbleSpec = vl
    .markCircle()
    .data(data)
    .encode(
        vl.x().fieldT("Year").title("Year"),
        vl.y().fieldN("Platform").title("Platform"),
        vl.size().fieldQ("Global_Sales").aggregate("sum").title("Total Global Sales (in millions)"),
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














    // 创建分组柱状图展示不同区域的销售额
    const vlStackedBarSpec = vl
        .markBar()
        .data(data)
        .transform(
            vl.fold(['NA_Sales', 'EU_Sales', 'JP_Sales', 'Other_Sales']).as('Region', 'Sales')
        )
        .encode(
            vl.x().fieldN('Platform').title('Platform'),
            vl.y().fieldQ('Sales').aggregate('sum').title('Total Sales (in millions)'),
            vl.column().fieldN('Region').title('Region'),
            vl.color().fieldN('Region').title('Region')
                .scale({ range: ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728"] })
        )
        .width(400)
        .height(600)
        .toSpec();
    













    // Define portable platforms
    const portablePlatforms = ['DS', '3DS', 'PSP', 'PS Vita', 'GBA', 'GB', 'NG', 'PSP', 'PSV', 'Switch']
    const portableData = data.filter(d => portablePlatforms.includes(d.Platform));

    // Create a stacked bar chart for portable platform sales by region
    const vlPortableSpec = vl
        .markBar({ size: 10 }) // 使柱子细一点
        .data(portableData)
        .transform(
            vl.fold(['NA_Sales', 'EU_Sales', 'JP_Sales', 'Other_Sales']).as('Region', 'Sales')
        )
        .encode(
            vl.x().fieldN('Platform').title('Portable Platform'),
            vl.y().fieldQ('Sales').title('Total Sales (in millions)'),
            vl.color().fieldN('Region').title('Region')
                .scale({ range: ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728"] }),
            vl.xOffset().fieldN('Region') // 将每个区域的柱子并排显示
        )
        .width(800)
        .height(600)
        .toSpec();



        





  
    // 渲染平台总体销售额图表
    vegaEmbed("#view_platform", platformSpec).then((result) => {
      const view = result.view;
      view.run();
       });

    // 渲染游戏类型总体销售额图表
   vegaEmbed("#view_genre", genreSpec).then((result) => {
       const view = result.view;
        view.run();
       });



  
    // 渲染时间趋势面积图
    vegaEmbed("#view_area", vlLineSpec).then((result) => {
        const view = result.view;
        view.run();
      });
    // 渲染时间趋势气泡图
    vegaEmbed("#view_bubble", vlBubbleSpec).then((result) => {
      const view = result.view;
      view.run();
      });
    








    // Render the stacked bar chart
    vegaEmbed("#view_stacked", vlStackedBarSpec).then((result) => {
        const view = result.view;
        view.run();
      });


      // Render the portable platform visualization
    vegaEmbed("#view_portable", vlPortableSpec).then((result) => {
        const view = result.view;
        view.run();
    });
}

render();
