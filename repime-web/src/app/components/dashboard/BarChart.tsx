'use client';

import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { dashboard_bar_chart_deleted_places } from "@prisma/client";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
  }[];
}

interface BarChartProps {
    data: dashboard_bar_chart_deleted_places;
}

const BarChart: React.FC<BarChartProps> = ({
  data
}) => {
  const [chartData, setChartData] = useState<ChartData>({
    labels: [],
    datasets: [],
  });

  console.log(data)

  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    setChartData({
        labels: ['Motivo da deleção das vagas'],
        datasets: [
            {
                label: 'Preenchida',
                data: [Number(data.count_preenchida)],
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgb(53, 162, 235, 0.4)',
              }, 
              {
                label: 'Denunciada',
                data: [Number(data.count_denunciada)],
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: '#FF5A5F'
              },
              {
                label: 'Outros',
                data: [Number(data.count_outros)],
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: '#FFA500'
              }
        ]
    })
    setChartOptions({
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Motivo das vagas serem deletadas'
            }
        },
        maintainAspectRatio: false,
        responsive: true
    })
  }, [data])

  return (
    <>
      <div className='w-full md:col-span-2 relative lg:h-[70vh] h-[50vh] m-auto p-4 border rounded-lg bg-white'>
        <Bar data={chartData} options={chartOptions} />
      </div>
    </>
  );
};

export default BarChart;