import React, { useState,useEffect } from 'react';
import { View, StyleSheet ,Text} from 'react-native';
import { Dimensions } from "react-native";
const screenWidth = Dimensions.get("window").width;
import { PieChart } from 'react-native-chart-kit';
import axios from 'axios';

export default function PieChartGraph({Year}) {
  
  const [details,setDetails]=useState({
    'DATE': 65,
    ORG: 93,
    PERSON: 62,
    GPE: 18,
    PRODUCT: 18,
    FAC: 4,
    CARDINAL: 50,
    ORDINAL: 15,
    NORP: 10,
    MONEY: 3,
    PERCENT: 2,
    TIME: 5,
    LOC: 5,
    QUANTITY: 2,
  });

  useEffect(() => {
    fetchData();
  },[]);
  const fetchData = async () => {
    try {
      const response = await axios.get(`https://2z1cnnk0-5000.asse.devtunnels.ms/ds/getpie/${Year}`);
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
  //       method: 'GET',
  //       url: "https://2z1cnnk0-5000.asse.devtunnels.ms/ds/getpie/1",
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
  //         setDetails(responseJson);
  //       } else {   
  //       console.error("failed");
  //       }
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  //  }
      
      const dataEntries = Object.entries(details);
      const chartData = dataEntries.map(([label, value]) => ({
        name: label,
        population: value,
        color: `#${Math.floor(Math.random() * 16747215).toString(16)}`, 
      }));

  return (
    <View >
      <Text style={{ textAlign: 'center', fontSize: 16, paddingVertical: 10 }}>  Number of Students for each questions </Text>
      <PieChart
        data={chartData}
        width={screenWidth}
        height={220}
        chartConfig={{
          backgroundColor: 'white',
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        }}
        accessor="population"
        backgroundColor="purple"
        absolute
      />
    </View>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     width:screenWidth,

//   }
// });
