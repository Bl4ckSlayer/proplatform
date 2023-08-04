import React from "react";
import ReactApexChart from "react-apexcharts";

type Props = {};

const Overview = (props: Props) => {
  // Mock data for the charts
  const totalStudentsData = {
    series: [56, 43, 32, 65],
    options: {
      chart: {
        type: "bar",
        toolbar: {
          show: false,
        },
      },
      xaxis: {
        categories: ["Batch A", "Batch B", "Batch C", "Batch D"],
      },
      legend: {
        position: "bottom",
      },
    },
  };

  const totalAssignmentsData = {
    series: [30, 25, 28, 33],
    options: {
      chart: {
        type: "bar",
        toolbar: {
          show: false,
        },
      },
      xaxis: {
        categories: ["Batch A", "Batch B", "Batch C", "Batch D"],
      },
      legend: {
        position: "bottom",
      },
    },
  };

  const totalQuizzesData = {
    series: [20, 15, 18, 23],
    options: {
      chart: {
        type: "bar",
        toolbar: {
          show: false,
        },
      },
      xaxis: {
        categories: ["Batch A", "Batch B", "Batch C", "Batch D"],
      },
      legend: {
        position: "bottom",
      },
    },
  };

  const submissionChartData = {
    series: [
      {
        name: "Assignments",
        data: [10, 15, 12, 8, 20, 18],
      },
      {
        name: "Quizzes",
        data: [8, 12, 10, 6, 15, 13],
      },
    ],
    options: {
      chart: {
        type: "line",
        toolbar: {
          show: false,
        },
      },
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      },
      legend: {
        position: "bottom",
      },
    },
  };

  const totalWatchedTimeData = {
    series: [120, 90, 110, 80],
    options: {
      chart: {
        type: "bar",
        toolbar: {
          show: false,
        },
      },
      xaxis: {
        categories: ["Batch A", "Batch B", "Batch C", "Batch D"],
      },
      legend: {
        position: "bottom",
      },
    },
  };
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Teacher Dashboard</h1>
      <div className=" gap-6 grid grid-cols-2 ">
        <div className="bg-white p-4 shadow rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Total Students</h2>
          <div className="h-48">
            <ReactApexChart
              options={totalStudentsData.options}
              series={totalStudentsData.series}
              type="bar"
            />
          </div>
        </div>
        <div className="bg-white p-4 shadow rounded-lg">
          <h2 className="text-lg font-semibold mb-2">
            Total Assignment Submissions
          </h2>
          <div className="h-48">
            <ReactApexChart
              options={totalAssignmentsData.options}
              series={totalAssignmentsData.series}
              type="bar"
            />
          </div>
        </div>
        <div className="bg-white p-4 shadow rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Total Quiz Submissions</h2>
          <div className="h-48">
            <ReactApexChart
              options={totalQuizzesData.options}
              series={totalQuizzesData.series}
              type="bar"
            />
          </div>
        </div>
        <div className="bg-white p-4 shadow rounded-lg">
          <h2 className="text-lg font-semibold mb-2">
            Assignment and Quiz Submissions Over Time
          </h2>
          <div className="h-48">
            <ReactApexChart
              options={submissionChartData.options}
              series={submissionChartData.series}
              type="line"
            />
          </div>
        </div>
        <div className="bg-white p-4 shadow rounded-lg">
          <h2 className="text-lg font-semibold mb-2">
            Total Watched Time of Videos by Batch
          </h2>
          <div className="h-48">
            <ReactApexChart
              options={totalWatchedTimeData.options}
              series={totalWatchedTimeData.series}
              type="bar"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
