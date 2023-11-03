import React  from 'react';
import { View, StyleSheet, ScrollView,TouchableOpacity,Text } from 'react-native';
import { Dimensions } from "react-native";
const screenWidth = Dimensions.get("window").width;
import PieChartGraph from './PieChart';
import BarChartGraph from './BarChart';
import StackedBarChartGraph from './StackedBarChartGraph';
import LineChartGraph from './LineChartGraph';
import Form2 from './Form2';
import FrontPage from './FrontPage';
import Table from './Table';
import MTable from './MTable';
import { useState } from 'react';
import Login from './Login';


export default function Graph({yearId}) {

  const [action, setAction] = useState(false);
  const [finish, setFinish] = useState(false);
  const [editTable, setEditTable] = useState(false);

  if (action) {
    return <Form2 />;
  } ;
  if (finish) {
    return <Login/>;
  } 
  if (editTable) {
    return <MTable  Year={yearId}/>;
  } 


  return (
    <ScrollView>
       <View style={styles.container}>
        <View>
        <Text style={{ textAlign: 'center', fontSize: 24, fontWeight: 'bold', paddingVertical: 10 }}>Insights from Marks Analysis</Text>
        </View>
            {/* <View style={styles.chartContainer}>
                   <StackedBarChartGraph Year={yearId} />
            </View> */}
            {/* <View style={styles.chartContainer}>
                   <LineChartGraph  Year={yearId}/>
            </View> */}
            <View style={styles.chartContainer}>
                   <PieChartGraph Year={yearId}/>
            </View>
            <View style={styles.chartContainer}>
                   <BarChartGraph Year={yearId}/>
            </View>
            
            {/* <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button1} onPress={() => setAction(true)}  >
                  <Text style={styles.buttonText} >Add another paper</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button1} onPress={() => setEditTable(true)}  >
                  <Text style={styles.buttonText} > Check the Table</Text>
              </TouchableOpacity>
            </View> */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button1} onPress={() => setFinish(true)}  >
                  <Text style={styles.buttonText} >Back</Text>
              </TouchableOpacity>
            </View>
       </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    width:screenWidth,
    flexWrap:' wrap' ,
    display:'flex',
    flex:1,
    paddingTop:50,
    flexDirection:'column',

   
  },
  chartContainer: {
    width:screenWidth,
    marginVertical:10,
  },
  button1: {
    backgroundColor: 'blueviolet',
    borderRadius: 5,
    padding: 10,
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom:10,
  },
  buttonText: {
    color: 'white',
  },
});
