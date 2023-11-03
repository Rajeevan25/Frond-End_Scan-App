import React, { useState,useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Table, Row } from 'react-native-table-component';
import Graph from './Graph';
import axios from 'axios';

const MTable = ({Mname , Year}) => {
  const [dataTable, setDataTable] = useState([
    ['200001', '32', '53'],
    ['200002', '29', '56'],
    ['200003', '40', '39'],
    ['200004', '35', '50'],
    ['200005', '24', '43']
  ]);
  const [editIndex, setEditIndex] = useState(-1);
  const [editedValue, setEditedValue] = useState('');
  const [finish, setFinish] = useState(false);

  // useEffect(() => {
  //   fetchData();
  // }, []);

  const fetchData = async () => {   
    fetch('https://2z1cnnk0-5000.asse.devtunnels.ms/module/getMARKS', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: Mname,
        YEAR : Year,
      })
    })
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson.statusCode );
      if (responseJson.statusCode === 200) {
        console.log('Get successfully', responseJson);
        setDataTable(response.data);   // rename the name which save in backend
      } else {   
      console.error("failed to get data");
      }
    })
    .catch((error) => {
      console.error(error);
    });

  };

  const handleSendToBackend = async () => {
    fetch('https://2z1cnnk0-5000.asse.devtunnels.ms/module/getMARKS', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        key1: dataTable,
      })
    })
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson.statusCode );
      if (responseJson.statusCode === 200) {
        console.log('Save successfully', responseJson);
        setFinish(true);   
      } else {   
      console.error("failed to get data");
      }
    })
    .catch((error) => {
      console.error(error);
    });
  };

 
  const handleEdit = (rowIndex, columnIndex) => {
    setEditIndex(rowIndex * HeadTable.length + columnIndex);
  };

  const handleSave = () => {
    const rowIndex = Math.floor(editIndex / HeadTable.length);
    const columnIndex = editIndex % HeadTable.length;
    const updatedTable = dataTable.map((row, index) =>
      index === rowIndex ? row.map((cell, cellIndex) => (cellIndex === columnIndex ? editedValue : cell)) : row
    );
    setDataTable(updatedTable);
    setEditIndex(-1);
    setEditedValue('');
    handleSendToBackend();
  };


//"id": 101, "caMark":  30, "ExamMarks": 55
  const HeadTable = ['ID', 'CA', 'WE'];
  if (finish) {
    return <Graph/>;
  };

  return (
    <View style={styles.container}>
      <View>
        <Table borderStyle={{ borderWidth: 1, borderColor: '#ffa1d2' }}>
          <Row data={HeadTable} style={styles.HeadStyle} textStyle={styles.HeadText} />
          {dataTable.map((rowData, rowIndex) => (
            <Row
              key={rowIndex}
              data={rowData.map((cellData, cellIndex) => {
                if (rowIndex * HeadTable.length + cellIndex === editIndex) {
                  return (
                    <TextInput
                      style={styles.input}
                      value={editedValue}
                      onChangeText={(text) => setEditedValue(text)}
                      onBlur={handleSave}
                      autoFocus
                      // keyboardType="numeric"
                    />
                  );
                }
                return (
                  <TouchableOpacity key={cellIndex} onPress={() => handleEdit(rowIndex, cellIndex)}>
                    <Text style={styles.TableText}>{cellData}</Text>
                  </TouchableOpacity>
                );
              })}
              style={styles.row}
            />
          ))}
        </Table>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button1} onPress={() => setFinish(true)}>
          {/* onPress={() => handleSendToBackend()} */}
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 55,
    backgroundColor: '#ffffff',
    gap: 10,
  },
  HeadStyle: {
    height: 50,
    alignContent: 'center',
    backgroundColor: '#ffe0f0',
  },
  HeadText: {
    margin: 6,
    fontWeight: 'bold',
  },
  TableText: {
    margin: 6,
  },
  row: {
    flexDirection: 'row',
    backgroundColor: '#FFF1C1',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 6,
  },
  button1: {
    backgroundColor: 'blueviolet',
    borderRadius: 5,
    padding: 10,
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
  },
  buttonText: {
    color: 'white',
  },
});

export default MTable;
