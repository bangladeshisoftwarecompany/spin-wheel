let myCharts;

function makeSpin(values) {
  const wheel = document.getElementById("wheel");
  wheel.innerHTML = "";
  const spinBtn = document.getElementById("spin-btn");
  const finalValue = document.getElementById("final-value");
  //Object that stores values of minimum and maximum angle for a value

  function RandomN(min = 4000, max = 5000) {
    return Math.ceil(Math.random() * (max - min) + min);
  }

  const val1 = RandomN(100, 200);
  const val3 = RandomN(300, 400);
  const val5 = RandomN(500, 600);
  const val7 = RandomN(700, 800);

  const rotationValues = [
    {
      minDegree: 0,
      maxDegree: 45,
      value: val7,
    },
    {
      minDegree: 46,
      maxDegree: 90,
      value: "0",
    },
    {
      minDegree: 91,
      maxDegree: 135,
      value: val5,
    },
    {
      minDegree: 136,
      maxDegree: 180,
      value: "0",
    },
    {
      minDegree: 181,
      maxDegree: 225,
      value: val3,
    },
    {
      minDegree: 226,
      maxDegree: 270,
      value: "0",
    },
    {
      minDegree: 271,
      maxDegree: 315,
      value: val1,
    },
    {
      minDegree: 316,
      maxDegree: 360,
      value: "0",
    },
  ];

  //Size of each piece
  const data = [16, 16, 16, 16, 16, 16, 16, 16];
  //background color for each piece
  var pieColors = [
    "#8d01f8",
    "#ca016f",
    "#fb3501",
    "#fc9e02",
    "#f1dc19",
    "#62c52f",
    "#0760ed",
    "#2c13f8",
  ];
  //Create chart

  myCharts = new Chart(wheel, {
    //Plugin for displaying text on pie chart
    plugins: [ChartDataLabels],
    //Chart Type Pie
    type: "pie",
    data: {
      //Labels(values which are to be displayed on chart)
      labels: [val1, "0.00", val3, "0.00", val5, "0.00", val7, "0.00"],
      //Settings for dataset/pie
      datasets: [
        {
          backgroundColor: pieColors,
          data: data,
        },
      ],
    },

    options: {
      //Responsive chart
      responsive: true,
      animation: { duration: 0 },
      plugins: {
        //hide tooltip and legend
        tooltip: false,
        legend: {
          display: false,
        },
        //display labels inside pie chart
        datalabels: {
          color: "#ffffff",
          formatter: (_, context) =>
            context.chart.data.labels[context.dataIndex],
          font: { size: 18 },
          display: "none",
        },
      },
    },
  });
  //display value based on the randomAngle
  const valueGenerator = (angleValue) => {
    for (let i of rotationValues) {
      //if the angleValue is between min and max then display it
      if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
        finalValue.innerHTML = `<p>Value: ${i.value}</p>`;
        spinBtn.disabled = false;
        break;
      }
    }
  };

  let total_RandomN = 0;

  spinBtn.addEventListener("click", function () {
    finalValue.innerHTML = `Wait...`;
    spinBtn.disabled = true;

    const random = RandomN();
    wheel.style.transform += `rotate(${random}deg)`;
    total_RandomN += random;
    setTimeout(() => {
      valueGenerator(total_RandomN % 360);
    }, 16500);
  });
}

window.addEventListener("DOMContentLoaded", function () {
  makeSpin({ val1: "10", val3: "20", val5: "30", val7: "40" });
});

const field_val_form = document.getElementById("field_val_form");

field_val_form.addEventListener("submit", (e) => {
  e.preventDefault();
  myCharts.destroy();
  makeSpin({ val1: "1000", val3: "2000", val5: "3000", val7: "4000" });
});
