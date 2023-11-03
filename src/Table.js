import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet,TableContainer,TouchableOpacity } from "react-native";
import { Dimensions } from "react-native";
const screenWidth = Dimensions.get("window").width;
import Graph from "./Graph";

const Table = () => {

  const data = [
    {"id": 101, "caMark":  30, "ExamMarks": 55},
    {"id": 102, "caMark":  35, "ExamMarks": 49},
    {"id": 103, "caMark":  40, "ExamMarks": 53},
    {"id": 104, "caMark":  20, "ExamMarks": 52},
    {"id": 105, "caMark":  34, "ExamMarks": 47},
    {"id": 106, "caMark":  37, "ExamMarks": 33},
    {"id": 107, "caMark":  28, "ExamMarks": 45},
    {"id": 108, "caMark":  30, "ExamMarks": 58},
  ];
  const [finish, setFinish] = useState(false);
  if (finish) {
    return <Graph/>;
  }
  return (
    <ScrollView>
      <View style={styles.tableContainer}>
        <View style={styles.tableHeader}>
          <Text style={styles.columnHeader}>ID</Text>
          <Text style={styles.columnHeader}>CA Marks</Text>
          <Text style={styles.columnHeader}>Exam Marks</Text>
        </View>
        {data.map((item) => (
          <View key={item.id} style={styles.tableRow}>
            <Text style={styles.column}>{item.id}</Text>
            <Text style={styles.column}>{item.caMark}</Text>
            <Text style={styles.column}>{item.ExamMarks}</Text>
          </View>
        ))}
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button1} onPress={() => setFinish(true)}  >
            <Text style={styles.buttonText} >Back</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
    tableContainer: {
        width:screenWidth,
        flexWrap:' wrap' ,
        display:'flex',
        flex:1,
        paddingTop:100,
        flexDirection:'column',
    },
    tableHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 10,
      
    },
    columnHeader: {
      fontWeight: "bold",
      flex: 1,
      textAlign: "center",
    },
    tableRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 5,
    },
    column: {
      flex: 1,
      textAlign: "center",
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
export default Table;
