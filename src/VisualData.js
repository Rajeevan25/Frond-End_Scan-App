import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Table, Row } from 'react-native-table-component';
import axios from 'axios';
import Graph from './Graph';
const VisualData = ({ yearId, sampleData }) => {
  const handleSendToBackend = async () => {
    console.log(dataTable);
    fetch('https://2z1cnnk0-5000.asse.devtunnels.ms/marksheet/confirm', {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        data: dataTable,
        
      })
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.statusCode === 200) {
          console.log('post successfully');
          setFinish(true);
        } else {
          console.error('failed to fetch data');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const [dataTable, setDataTable] = useState(
    sampleData
      ? Object.entries(sampleData).map(([key, value]) => [key, value.toString()])
      : []
  );
  const [editIndex, setEditIndex] = useState(-1);
  const [editedValue, setEditedValue] = useState('');
  const [finish, setFinish] = useState(false);

  const handleEdit = (rowIndex) => {
    setEditIndex(rowIndex);
  };

  const handleSave = () => {
    const updatedTable = dataTable.map((row, index) =>
      index === editIndex ? [row[0], editedValue] : row
    );
    setDataTable(updatedTable);
    setEditIndex(-1);
    setEditedValue('');
  };

  if (finish) {
    return <Graph yearId={yearId} />;
  }

  return (
    <View style={styles.container}>
      <View>
        <Table borderStyle={{ borderWidth: 1, borderColor: '#ffa1d2' }}>
          <Row data={['Entity', 'Value']} style={styles.HeadStyle} textStyle={styles.HeadText} />
          {dataTable.map((rowData, rowIndex) => (
            <Row
              key={rowIndex}
              data={rowData.map((cellData, cellIndex) => {
                if (cellIndex === 1 && rowIndex === editIndex) {
                  return (
                    <TextInput
                      style={styles.input}
                      value={editedValue}
                      onChangeText={(text) => setEditedValue(text)}
                      onBlur={handleSave}
                      autoFocus
                    />
                  );
                }
                return (
                  <TouchableOpacity key={rowIndex} onPress={() => handleEdit(rowIndex)}>
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
        <TouchableOpacity style={styles.button1} onPress={() => handleSendToBackend()}>
          <Text style={styles.buttonText}>Submit</Text>
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

export default VisualData;
