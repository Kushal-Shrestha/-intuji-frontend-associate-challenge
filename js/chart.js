const chart = {
  canvas: document.getElementById("analyticsChart"),
  ctx: null,
  data: {
    labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    datasets: [
      {
        label: "Label1",
        data: [13000, 11000, 15000, 8000, 12000, 20000, 15000],
        color: "rgba(99, 102, 241, 1)",
        fillColor: "rgba(99, 102, 241, 0.2)",
        pointColor: "rgba(99, 102, 241, 1)",
      },
      {
        label: "Label1",
        data: [5000, 7000, 9000, 10000, 5000, 7000, 9000],
        color: "rgba(255, 159, 64, 1)",
        fillColor: "rgba(255, 159, 64, 0.2)",
        pointColor: "rgba(255, 159, 64, 1)",
      },
    ],
  },
  options: {
    padding: { top: 20, right: 20, bottom: 30, left: 50 },
    yAxisMax: 25000,
    yAxisStep: 5000,
    pointRadius: 4,
    lineWidth: 2,
    tension: 0.4,
    tooltip: {
      enabled: true,
      padding: 10,
      backgroundColor: "rgba(255, 255, 255, 0.9)",
      borderColor: "#e2e8f0",
      textColor: "#1e293b",
      borderWidth: 1,
      radius: 4,
    },
    responsive: true,
    maintainAspectRatio: false,
  },
  tooltip: {
    visible: false,
    x: 0,
    y: 0,
    datasetIndex: 0,
    dataIndex: 0,
  },
  animation: {
    duration: 1000,
    progress: 0,
    startTime: 0,
  },
  state: {
    hoverPoint: null,
    width: 0,
    height: 0,
    pixelRatio: 1,
  },
  init: function () {
    this.ctx = this.canvas.getContext("2d");
    this.setCanvasDimensions();
    this.setupEventListeners();
    this.animate();
  },
  setCanvasDimensions: function () {
    // Handle high DPI screens
    this.state.pixelRatio = window.devicePixelRatio || 1;
    const rect = this.canvas.getBoundingClientRect();
    this.state.width = rect.width;
    this.state.height = rect.height;

    this.canvas.width = this.state.width * this.state.pixelRatio;
    this.canvas.height = this.state.height * this.state.pixelRatio;
    this.canvas.style.width = this.state.width + "px";
    this.canvas.style.height = this.state.height + "px";

    this.ctx.scale(this.state.pixelRatio, this.state.pixelRatio);
  },
  setupEventListeners: function () {
    // Handle mousemove for tooltips
    this.canvas.addEventListener("mousemove", (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const x =
        ((e.clientX - rect.left) * (this.canvas.width / rect.width)) /
        this.state.pixelRatio;
      const y =
        ((e.clientY - rect.top) * (this.canvas.height / rect.height)) /
        this.state.pixelRatio;

      // Check if mouse is over a point
      this.handleTooltip(x, y);
    });

    // Handle mouseout
    this.canvas.addEventListener("mouseout", () => {
      this.tooltip.visible = false;
      this.state.hoverPoint = null;
      this.draw();
    });

    // Handle window resize
    window.addEventListener("resize", () => {
      this.setCanvasDimensions();
      this.draw();
    });

    // Handle timeframe change
    document
      .getElementById("timeframeSelect")
      .addEventListener("change", (e) => {
        this.updateData(e.target.value);
      });
  },
  updateData: function (timeframe) {
    let dataset1, dataset2;

    // Simulate different data for different timeframes
    if (timeframe === "Monthly") {
      dataset1 = [14000, 12000, 16000, 9000, 13000, 22000, 16000];
      dataset2 = [6000, 8000, 10000, 11000, 6000, 8000, 10000];
    } else if (timeframe === "Yearly") {
      dataset1 = [16000, 14000, 18000, 11000, 15000, 24000, 18000];
      dataset2 = [7000, 9000, 11000, 12000, 7000, 9000, 11000];
    } else {
      // Weekly (default)
      dataset1 = [13000, 11000, 15000, 8000, 12000, 20000, 15000];
      dataset2 = [5000, 7000, 9000, 10000, 5000, 7000, 9000];
    }

    // Reset animation
    this.animation.progress = 0;
    this.animation.startTime = performance.now();

    // Store old data for animation
    const oldData1 = [...this.data.datasets[0].data];
    const oldData2 = [...this.data.datasets[1].data];

    // Set new target data
    this.data.datasets[0].targetData = dataset1;
    this.data.datasets[1].targetData = dataset2;

    // Animate to new data
    const animate = (timestamp) => {
      // Calculate animation progress
      if (this.animation.startTime === 0) this.animation.startTime = timestamp;
      const elapsed = timestamp - this.animation.startTime;
      this.animation.progress = Math.min(elapsed / this.animation.duration, 1);

      // Update data based on animation progress
      for (let i = 0; i < dataset1.length; i++) {
        this.data.datasets[0].data[i] =
          oldData1[i] + (dataset1[i] - oldData1[i]) * this.animation.progress;
        this.data.datasets[1].data[i] =
          oldData2[i] + (dataset2[i] - oldData2[i]) * this.animation.progress;
      }

      this.draw();

      if (this.animation.progress < 1) {
        requestAnimationFrame(animate);
      } else {
        this.data.datasets[0].data = dataset1;
        this.data.datasets[1].data = dataset2;
      }
    };

    requestAnimationFrame(animate);
  },
  animate: function () {
    this.animation.startTime = performance.now();

    // Store initial empty data for animation start
    const targetData1 = [...this.data.datasets[0].data];
    const targetData2 = [...this.data.datasets[1].data];

    // Set initial data to zero for animation
    this.data.datasets[0].data = targetData1.map(() => 0);
    this.data.datasets[1].data = targetData2.map(() => 0);

    // Animate function
    const animate = (timestamp) => {
      // Calculate animation progress
      if (this.animation.startTime === 0) this.animation.startTime = timestamp;
      const elapsed = timestamp - this.animation.startTime;
      this.animation.progress = Math.min(elapsed / this.animation.duration, 1);

      // Update data based on animation progress
      for (let i = 0; i < targetData1.length; i++) {
        this.data.datasets[0].data[i] =
          targetData1[i] * this.animation.progress;
        this.data.datasets[1].data[i] =
          targetData2[i] * this.animation.progress;
      }

      this.draw();

      if (this.animation.progress < 1) {
        requestAnimationFrame(animate);
      } else {
        // Animation complete, set final data
        this.data.datasets[0].data = targetData1;
        this.data.datasets[1].data = targetData2;
      }
    };

    requestAnimationFrame(animate);
  },
  draw: function () {
    const { ctx, data, options, state } = this;
    const { width, height } = state;
    const { padding } = options;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Calculate chart area
    const chartArea = {
      left: padding.left,
      top: padding.top,
      right: width - padding.right,
      bottom: height - padding.bottom,
      width: width - padding.left - padding.right,
      height: height - padding.top - padding.bottom,
    };

    // Draw y-axis grid and labels
    this.drawYAxis(chartArea);

    // Draw x-axis labels
    this.drawXAxis(chartArea);

    // Draw datasets
    data.datasets.forEach((dataset, datasetIndex) => {
      this.drawDataset(dataset, datasetIndex, chartArea);
    });

    // Draw tooltip if visible
    if (this.tooltip.visible) {
      this.drawTooltip();
    }
  },
  drawYAxis: function (chartArea) {
    const { ctx, options } = this;
    const { yAxisMax, yAxisStep } = options;

    ctx.beginPath();
    ctx.strokeStyle = "rgba(226, 232, 240, 0.5)";
    ctx.lineWidth = 1;
    ctx.font = '12px "Plus Jakarta Sans"';
    ctx.fillStyle = "#94a3b8";
    ctx.textAlign = "right";

    // Draw horizontal grid lines and y-axis labels
    for (let value = 0; value <= yAxisMax; value += yAxisStep) {
      const y = chartArea.bottom - (value / yAxisMax) * chartArea.height;

      // Grid line
      ctx.moveTo(chartArea.left, y);
      ctx.lineTo(chartArea.right, y);

      // Y-axis label
      let label;
      if (value === 0) {
        label = "0k";
      } else {
        label = value / 1000 + "k";
      }

      ctx.fillText(label, chartArea.left - 10, y + 4);
    }

    ctx.stroke();
  },
  drawXAxis: function (chartArea) {
    const { ctx, data } = this;
    const { labels } = data;
    const stepWidth = chartArea.width / (labels.length - 1);

    ctx.font = '12px "Plus Jakarta Sans"';
    ctx.fillStyle = "#94a3b8";
    ctx.textAlign = "center";

    // Draw x-axis labels
    labels.forEach((label, index) => {
      const x = chartArea.left + stepWidth * index;
      ctx.fillText(label, x, chartArea.bottom + 20);
    });
  },
  drawDataset: function (dataset, datasetIndex, chartArea) {
    const { ctx, data, options } = this;
    const { tension, pointRadius, lineWidth } = options;
    const { labels } = data;
    const stepWidth = chartArea.width / (labels.length - 1);

    const points = dataset.data.map((value, index) => {
      return {
        x: chartArea.left + stepWidth * index,
        y: chartArea.bottom - (value / options.yAxisMax) * chartArea.height,
        value: value,
      };
    });

    // Draw area fill
    ctx.beginPath();
    this.drawCurve(points, tension, true);
    ctx.lineTo(points[points.length - 1].x, chartArea.bottom);
    ctx.lineTo(points[0].x, chartArea.bottom);
    ctx.closePath();

    // Create gradient fill
    const gradient = ctx.createLinearGradient(
      0,
      chartArea.top,
      0,
      chartArea.bottom
    );
    gradient.addColorStop(0, dataset.fillColor);
    gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
    ctx.fillStyle = gradient;
    ctx.fill();

    // Draw line
    ctx.beginPath();
    this.drawCurve(points, tension, false);
    ctx.strokeStyle = dataset.color;
    ctx.lineWidth = lineWidth;
    ctx.stroke();

    // Draw points
    points.forEach((point, index) => {
      ctx.beginPath();
      ctx.arc(point.x, point.y, pointRadius, 0, Math.PI * 2);
      ctx.fillStyle = "white";
      ctx.fill();
      ctx.strokeStyle = dataset.pointColor;
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw highlighted point
      if (
        this.state.hoverPoint &&
        this.state.hoverPoint.datasetIndex === datasetIndex &&
        this.state.hoverPoint.dataIndex === index
      ) {
        ctx.beginPath();
        ctx.arc(point.x, point.y, pointRadius + 2, 0, Math.PI * 2);
        ctx.strokeStyle = dataset.pointColor;
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    });
  },
  drawCurve: function (points, tension, isPath) {
    const { ctx } = this;

    if (isPath) {
      ctx.moveTo(points[0].x, points[0].y);
    }

    // If tension is 0, draw straight lines
    if (tension === 0) {
      for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
      }
      return;
    }

    // Draw curved line using bezier curves
    for (let i = 0; i < points.length - 1; i++) {
      const current = points[i];
      const next = points[i + 1];

      const controlPointX1 =
        i === 0 ? current.x : current.x + (next.x - current.x) * tension;
      const controlPointY1 = current.y;
      const controlPointX2 = next.x - (next.x - current.x) * tension;
      const controlPointY2 = next.y;

      ctx.bezierCurveTo(
        controlPointX1,
        controlPointY1,
        controlPointX2,
        controlPointY2,
        next.x,
        next.y
      );
    }
  },
  handleTooltip: function (mouseX, mouseY) {
    const { data, options } = this;
    const { labels } = data;
    const chartArea = {
      left: options.padding.left,
      top: options.padding.top,
      right: this.state.width - options.padding.right,
      bottom: this.state.height - options.padding.bottom,
      width: this.state.width - options.padding.left - options.padding.right,
      height: this.state.height - options.padding.top - options.padding.bottom,
    };

    const stepWidth = chartArea.width / (labels.length - 1);
    let closestPoint = null;
    let closestDistance = Number.MAX_VALUE;

    // Find the closest point to the mouse
    data.datasets.forEach((dataset, datasetIndex) => {
      dataset.data.forEach((value, dataIndex) => {
        const x = chartArea.left + stepWidth * dataIndex;
        const y =
          chartArea.bottom - (value / options.yAxisMax) * chartArea.height;

        const distance = Math.sqrt(
          Math.pow(mouseX - x, 2) + Math.pow(mouseY - y, 2)
        );

        if (distance < closestDistance && distance < 20) {
          closestDistance = distance;
          closestPoint = {
            x: x,
            y: y,
            datasetIndex: datasetIndex,
            dataIndex: dataIndex,
            value: value,
            label: data.labels[dataIndex],
          };
        }
      });
    });

    if (closestPoint) {
      this.tooltip.visible = true;
      this.tooltip.x = closestPoint.x;
      this.tooltip.y = closestPoint.y;
      this.tooltip.datasetIndex = closestPoint.datasetIndex;
      this.tooltip.dataIndex = closestPoint.dataIndex;
      this.state.hoverPoint = {
        datasetIndex: closestPoint.datasetIndex,
        dataIndex: closestPoint.dataIndex,
      };
    } else {
      this.tooltip.visible = false;
      this.state.hoverPoint = null;
    }

    this.draw();
  },
  drawTooltip: function () {
    const { ctx, data, tooltip, options } = this;
    const dataset = data.datasets[tooltip.datasetIndex];
    const value = dataset.data[tooltip.dataIndex];
    const label = data.labels[tooltip.dataIndex];

    const tooltipText = `${dataset.label}: ${value.toLocaleString()}`;

    ctx.font = '12px "Plus Jakarta Sans"';
    const textWidth = ctx.measureText(tooltipText).width;
    const textHeight = 16;

    const tooltipPadding = options.tooltip.padding;
    const tooltipWidth = textWidth + tooltipPadding * 2;
    const tooltipHeight = textHeight + tooltipPadding * 2;

    let tooltipX = tooltip.x - tooltipWidth / 2;
    let tooltipY = tooltip.y - tooltipHeight - 10;

    if (tooltipX < 0) tooltipX = 0;
    if (tooltipX + tooltipWidth > this.state.width)
      tooltipX = this.state.width - tooltipWidth;
    if (tooltipY < 0) tooltipY = tooltip.y + 20; // Show below point if too high

    // Draw tooltip background
    ctx.beginPath();
    this.roundRect(
      ctx,
      tooltipX,
      tooltipY,
      tooltipWidth,
      tooltipHeight,
      options.tooltip.radius
    );
    ctx.fillStyle = options.tooltip.backgroundColor;
    ctx.fill();

    // Draw tooltip border
    ctx.strokeStyle = options.tooltip.borderColor;
    ctx.lineWidth = options.tooltip.borderWidth;
    ctx.stroke();

    // Draw tooltip text
    ctx.fillStyle = options.tooltip.textColor;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(
      tooltipText,
      tooltipX + tooltipWidth / 2,
      tooltipY + tooltipHeight / 2
    );
  },
  roundRect: function (ctx, x, y, width, height, radius) {
    if (width < 2 * radius) radius = width / 2;
    if (height < 2 * radius) radius = height / 2;

    ctx.moveTo(x + radius, y);
    ctx.arcTo(x + width, y, x + width, y + height, radius);
    ctx.arcTo(x + width, y + height, x, y + height, radius);
    ctx.arcTo(x, y + height, x, y, radius);
    ctx.arcTo(x, y, x + width, y, radius);
  },
};

chart.init();
