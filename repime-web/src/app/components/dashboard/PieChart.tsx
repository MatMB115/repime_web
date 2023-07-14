'use client';

import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { dashboard_pie_chart_kitnet_republica } from "@prisma/client";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface ChartData {
  labels: string[];
  datasets: {
    data: number[];
    backgroundColor: string[];
  }[];
}

interface PieChartProps {
  data: dashboard_pie_chart_kitnet_republica;
}

const PieChart: React.FC<PieChartProps> = ({
  data
}) => {
  const [chartData, setChartData] = useState<ChartData>({
    labels: [],
    datasets: [],
  });

  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    setChartData({
      labels: ['Kitnet', 'República'],
      datasets: [
        {
          data: [
            Number(data.total_kitnets),
            Number(data.total_republicas),
          ],
          backgroundColor: [
            'rgb(53, 162, 235)',
            '#00a699',
          ]
        }
      ]
    });

    setChartOptions({
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Quantidade de Kitnets e Repúblicas cadastradas'
        }
      },
      maintainAspectRatio: false,
      responsive: true
    });
  }, [data]);

  return (
    <>
      <div className='w-3/4 md:col-span-2 relative lg:h-[70vh] h-[50vh] m-auto p-4 border rounded-lg bg-white'>
        <Pie data={chartData} options={chartOptions} />
      </div>
    </>
  );
};

export default PieChart;