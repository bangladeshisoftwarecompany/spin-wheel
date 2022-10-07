const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spin-btn");
const finalValue = document.getElementById("final-value");

//Object that stores values of minimum and maximum angle for a value
let myChart;
function makeSpin(
  labels = ["Purple", "0", "Red", "0", "Yellow", "0", "Blue", "0"]
) {
  const rotationValues = [
    {
      minDegree: 0,
      maxDegree: 45,
      value: labels[6],
    },
    {
      minDegree: 46,
      maxDegree: 90,
      value: labels[5],
    },
    {
      minDegree: 91,
      maxDegree: 135,
      value: labels[4],
    },
    {
      minDegree: 136,
      maxDegree: 180,
      value: labels[3],
    },
    {
      minDegree: 181,
      maxDegree: 225,
      value: labels[2],
    },
    {
      minDegree: 226,
      maxDegree: 270,
      value: labels[1],
    },
    {
      minDegree: 271,
      maxDegree: 315,
      value: labels[0],
    },
    {
      minDegree: 316,
      maxDegree: 360,
      value: labels[7],
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
  myChart = new Chart(wheel, {
    //Plugin for displaying text on pie chart
    plugins: [ChartDataLabels],
    //Chart Type Pie
    type: "pie",
    data: {
      //Labels(values which are to be displayed on chart)
      labels,
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

      animation: {
        duration: 0,
      },

      // animations: {
      //   tension: {
      //     duration: 9000,
      //     easing: "linear",
      //     from: 1,
      //     to: 1,
      //     loop: true,
      //   },
      // },

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
          font: {
            size: 18,
          },
        },
      },
    },
  });

  //display value based on the randomAngle
  const valueGenerator = (angleValue) => {
    for (let i of rotationValues) {
      //if the angleValue is between min and max then display it
      if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
        finalValue.style.background = pieColors[i.value - 1];
        finalValue.innerHTML =
          i.value === "0"
            ? `Opps! 0`
            : `Congratulations You've got: ${i.value}`;
        spinBtn.disabled = false;
        // setTimeout(() => {
        //   wheel.classList.add("alwaysSpin");
        // }, 4000);
        break;
      }
    }
  };

  //Spinner count
  let count = 0;
  //100 rotations for animation and last rotation for result
  let resultValue = 101;
  //Start spinning

  spinBtn.addEventListener("click", () => {
    spinBtn.disabled = true;
    //Empty final value
    wheel.classList.remove("alwaysSpin");
    finalValue.innerHTML = `<p>Wait...!</p>`;
    finalValue.style.background = `#00000080`;
    //Generate random degrees to stop at
    let randomDegree = Math.floor(Math.random() * (355 - 0 + 1) + 0);
    //Interval for rotation animation

    let rotationInterval = window.setInterval(() => {
      //Set rotation for piechart

      /* Initially to make the piechart rotate faster we set resultValue to 101 so it rotates 101 degrees at a time and this reduces by 1 with every count. Eventually on last rotation we rotate by 1 degree at a time. */
      myChart.options.rotation = myChart.options.rotation + resultValue;

      //Update chart with new value;
      myChart.update();
      //If rotation>360 reset it back to 0
      if (myChart.options.rotation >= 360) {
        count += 1;
        myChart.options.rotation = 0;
      } else if (count > 15 && myChart.options.rotation == randomDegree) {
        valueGenerator(randomDegree);
        clearInterval(rotationInterval);
        count = 0;
        resultValue = 101;
      }
    }, 9);
  });
}

window.addEventListener("DOMContentLoaded", function () {
  makeSpin();
});

const field_val_form = document.getElementById("field_val_form");

field_val_form.addEventListener("submit", (e) => {
  e.preventDefault();
  const wheel_input1 = document.getElementById("wheel_input1");
  const wheel_input3 = document.getElementById("wheel_input3");
  const wheel_input5 = document.getElementById("wheel_input5");
  const wheel_input7 = document.getElementById("wheel_input7");

  console.log("wheel_input1 ", wheel_input1.value);
  console.log("wheel_input3 ", wheel_input3.value);
  console.log("wheel_input5 ", wheel_input5.value);
  console.log("wheel_input7 ", wheel_input7.value);

  labels = [
    wheel_input1.value,
    "0",
    wheel_input3.value,
    "0",
    wheel_input5.value,
    "0",
    wheel_input7.value,
    "0",
  ];

  myChart.destroy();
  makeSpin(labels);
});
