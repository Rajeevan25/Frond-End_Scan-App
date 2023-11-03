import React, { useState,useEffect } from 'react';
import { View,Text,Button } from 'react-native';
import { Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const screenWidth = Dimensions.get('window').width;

export default function BarChartGraph({Year}) {
  const [dataM,setDataM]=useState({
    "A": [20, 25],
    "A+": [10, 15],
    "A-": [20, 25],
    "B": [30, 35],
    "B+": [12, 13],
    "B-": [40, 45],

});

  useEffect(() => {
    fetchData();
  },[]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`https://2z1cnnk0-5000.asse.devtunnels.ms/ds/getbar/${Year}`);
      setDataM(response.data.data);
      console.log('Data received from backend');
      console.log(response.data.data)
      console.log(dataM)
    } catch (error) {
      console.error('Error fetching data from the backend:', error);
    }
  };
   const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      // title: {
      //   display: true,
      //   text: 'Final Marks vs Moderate Marks',
      //   fontWeight:'bold',
      //   fontSize:65,
      // },
    },
  };
  // const inputData = {
  //     "A": [20, 25],
  //     "A+": [10, 15],
  //     "A-": [20, 25],
  //     "B": [30, 35],
  //     "B+": [12, 13],
  //     "B-": [40, 45],
  
  // };

  const labels = Object.keys(dataM);
  const dataset1 = Object.values(dataM).map((item) => item[0]);
  const dataset2 = Object.values(dataM).map((item) => item[1]);
  

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Final Marks',
        data: dataset1,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Moderate Marks',
        data: dataset2,
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  return (
    <View>
      
      <Text style={{ textAlign: 'center', fontSize: 16, paddingVertical: 10 }}>  Final Marks vs Moderate Marks</Text>

      <Bar options={options} data={data} />;

      {/* <Button style={{height:100}} onPress={fetchData}>
        <Text style={{fontSize:100, height:100 }}>Click me</Text>
      </Button> */}

    </View>
  );
}
