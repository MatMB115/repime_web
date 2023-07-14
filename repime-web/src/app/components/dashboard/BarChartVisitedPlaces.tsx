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
import { dashboard_chart_qtd_visitas } from "@prisma/client";

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
    data: dashboard_chart_qtd_visitas;
}

const BarChart: React.FC<BarChartProps> = ({
  data
}) => {
  const [chartData, setChartData] = useState<ChartData>({
    labels: [],
    datasets: [],
  });

  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    setChartData({
        labels: ['Quantidade de acessos das vagas'],
        datasets: [
            {
                label: 'Kitnet',
                data: [Number(data.qtd_visitas_kitnet)],
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgb(53, 162, 235, 0.4)',
              }, 
              {
                label: 'República',
                data: [Number(data.qtd_visitas_republica)],
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: '#00a699'
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
                text: 'Quantidade de acessos das vagas de Kitnets e Repúblicas'
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