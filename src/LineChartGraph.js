import React, { useState, useEffect } from 'react';
import { View,Text } from 'react-native';
import { Dimensions } from 'react-native';
import { LineChart, } from 'react-native-chart-kit';
const screenWidth = Dimensions.get("window").width;
import axios from 'axios';

export default function LineChartGraph({ Year }) {
  const [details, setDetails] = useState({
    "0": [1, 0],
    "1": [2, 6],
    "2": [3, 3],
    "3": [4, 4],
    "4": [5,4],
    "5": [6, 8],
  });
 

  useEffect(() => {
    fetchData();
  },[]);
  const fetchData = async () => {
    try {
      const response = await axios.get("https://2z1cnnk0-5000.asse.devtunnels.ms/ds/getline/1");
      setDetails(response.data.data);
      console.log('Data received from backend');
      console.log(response.data.data)
      console.log(details)
    } catch (error) {
      console.error('Error fetching data from the backend:', error);
    }
  };
  
  // const fetchData = ()=>{
  //   const requestData = {
  //       module_year_id : Year,
  //     };
  //     const config = {
  //       method: 'PUT',
  //       url: 'https://2z1cnnk0-5000.asse.devtunnels.ms/marksheet/upload',
  //       headers: {
  //         Accept: 'application/json',
  //         'Content-Type': 'application/json'
  //       },
  //       data: JSON.stringify(requestData)
  //     };
  //     axios(config)
  //     .then((response) => response.json())
  //     .then((responseJson) => {
  //       console.log(responseJson.statusCode );
  //       if (responseJson.statusCode === 200) {
  //         console.log('uploaded successfully', response);
  //         setDetails(response.data);
  //       } else {   
  //       console.error("failed");
  //       }
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  //  }
  // const inputData = {
  //   "bar01": {
  //     "0": [1, 0],
  //     "1": [2, 6],
  //     "2": [3, 3],
  //     "3": [4, 4],
  //     "4": [5,4],
  //     "5": [6, 8],
  //   }
  // };

  const labels = Object.keys(details);
  const dataset1 = Object.values(details).map((item) => item[0]);
  const dataset2 = Object.values(details).map((item) => item[1]);

  const data = {
    labels: labels,
    datasets: [
      {
        data: dataset1,
        color: (opacity = 8) => `rgba(222, 65, 44, ${opacity})`,
        strokeWidth: 2,
        label: 'Data Set 1'
      },
      {
        data: dataset2,
        color: (opacity = 1) => `rgba(34, 65, 244, ${opacity})`,
        strokeWidth: 2,
        label: 'Data Set 2'
      },
    ],
  };

  return (
    <View>
            <Text style={{ textAlign: 'center', fontSize: 16,  paddingVertical: 10 }}>2 -  Marks</Text>
      <LineChart
        data={data}
        width={screenWidth}
        height={320}
        chartConfig={{
          // backgroundColor: 'pink',
          // backgroundGradientFrom: 'pink',
          // backgroundGradientTo: 'blue',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 268
          }
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16
        }}
      />
    </View>
  )
}
