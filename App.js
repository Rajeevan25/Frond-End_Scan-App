import React, { useState } from 'react'
import { StyleSheet, Text, View , Image ,Button, ImageBackground ,ScrollView ,Modal ,TouchableOpacity ,TextInput,  Alert } from 'react-native';
import Login from './src/Login';
import Graph from './src/Graph';
import Page from './src/Page';
import Form1 from './src/Form1';
import Profile from './src/Profile';
import Edit from './src/edit';
import MTable from './src/MTable';
import Table from './src/Table';
import CameraS from './src/camera';
import BarChartGraph from './src/BarChart';
import LineChartGraph from './src/LineChartGraph';
import PieChartGraph from './src/PieChart';
import BoxPlotGraph from './src/BoxPlotGraph';
import VisualData from './src/VisualData';
import StackedBarChartGraph from './src/StackedBarChartGraph';
export default function App() { 
  return (
    <View style={styles.container}>
      <Login/>
    </View>   
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
});
