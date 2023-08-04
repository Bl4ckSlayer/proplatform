import React from "react";
import ReactApexChart from "react-apexcharts";

type Props = {};

const Overview = (props: Props) => {
  // Mock data for assignments, quizzes, and video modules progress
  const assignmentsSubmitted = 5;
  const quizzesSubmitted = 8;
  const videoModulesCompleted = 12;

  // Data for the donut chart
  const chartOptions = {
    labels: ["Assignments", "Quizzes", "Video Modules"],
    colors: ["#48BB78", "#4299E1", "#F6AD55"],
    legend: {
      position: "bottom",
    },
    dataLabels: {
      enabled: true,
    },
    plotOptions: {
      pie: {
        donut: {
          size: "70%",
        },
      },
    },
  };

  const chartData = [
    assignmentsSubmitted,
    quizzesSubmitted,
    videoModulesCompleted,
  ];
  const lineChartData = {
    series: [
      {
        name: "Video Modules Completed",
        data: [2, 5, 6, 9, 11, videoModulesCompleted],
      },
    ],
    options: {
      chart: {
        type: "line",
      },
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      },
    },
  };

  // Data for the bar chart (marks obtained in recent quizzes)
  const barChartData = {
    series: [
      {
        name: "Marks Obtained",
        data: [85, 92, 78, 88, 95],
      },
    ],
    options: {
      chart: {
        type: "bar",
      },
      xaxis: {
        categories: ["Quiz 1", "Quiz 2", "Quiz 3", "Quiz 4", "Quiz 5"],
      },
    },
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Student Dashboard</h1>
      <div className="flex gap-6">
        <div className="bg-white p-4 shadow rounded-lg w-1/2">
          <h2 className="text-lg font-semibold mb-2">Progress Overview</h2>
          <ReactApexChart
            options={chartOptions}
            series={chartData}
            type="donut"
            width="100%"
          />
        </div>
        <div className="grid gap-4">
          <div className="bg-white p-4 shadow rounded-lg">
            <h2 className="text-lg font-semibold mb-2">
              Assignments Submitted
            </h2>
            <p>{assignmentsSubmitted} assignments submitted</p>
          </div>
          <div className="bg-white p-4 shadow rounded-lg">
            <h2 className="text-lg font-semibold mb-2">Quizzes Submitted</h2>
            <p>{quizzesSubmitted} quizzes submitted</p>
          </div>
          <div className="bg-white p-4 shadow rounded-lg">
            <h2 className="text-lg font-semibold mb-2">
              Video Modules Completed
            </h2>
            <p>{videoModulesCompleted} video modules completed</p>
          </div>
        </div>
      </div>{" "}
      <div className="container mx-auto p-4 flex flex-col">
        <h1 className="text-2xl font-semibold mb-4">Student Dashboard</h1>
        <div className="grid gap-4">
          {/* ...existing components... */}
          <div className="bg-white p-4 shadow rounded-lg">
            <h2 className="text-lg font-semibold mb-2">Video Modules Trend</h2>
            <div className="h-48">
              <ReactApexChart
                options={lineChartData.options}
                series={lineChartData.series}
                type="line"
              />
            </div>
          </div>
          <div className="bg-white p-4 shadow rounded-lg">
            <h2 className="text-lg font-semibold mb-2">Recent Quiz Marks</h2>
            <div className="h-48">
              <ReactApexChart
                options={barChartData.options}
                series={barChartData.series}
                type="bar"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
