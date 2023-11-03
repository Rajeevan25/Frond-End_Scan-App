import React, { useState } from 'react';
import { View, FlatList, TextInput, Button, StyleSheet,Text,TouchableOpacity } from 'react-native';
import Page from './Page';
import axios from 'axios';
import Graph from './Graph';

const Edit = ({yearId,data}) => {
    const data3 = {
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
  };
  // const [data2, setData2] = useState(['2', '2', '', '', '', '', '', '', '', '']);
  // const [data1, setData1] = useState(['Index No', 'Module Name', 'Total Marks','Question 1','Question 2','Question 3','Question 4','Question 5','Question 6','Question 7']); 
  const [editedData, setEditedData] = useState(Object.values(data)); 

  const [finish, setFinish] = useState(false);
  if (finish) {
            return <Graph yearId={yearId} />;
   };
  //  const data3 = {
  //   'DATE': 65,
  //   ORG: 93,
  //   PERSON: 62,
  //   GPE: 18,
  //   PRODUCT: 18,
  //   FAC: 4,
  //   CARDINAL: 50,
  //   ORDINAL: 15,
  //   NORP: 10,
  //   MONEY: 3,
  //   PERCENT: 2,
  //   TIME: 5,
  //   LOC: 5,
  //   QUANTITY: 2,
  // };

  const keysArray = Object.keys(data);
  const valuesArray = Object.values(data);


  const handleEdit = (index, text) => {
    const newData = [...editedData];
    newData[index] = text;
    setEditedData(newData);
  };

  const handleSendToBackend = async () => {
    fetch('https://2z1cnnk0-5000.as/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        data : editedData,
        module_year_id : yearId
      })
    })
    .then((response) => response.json())
    .then((responseJson) => {
      if (responseJson.statusCode === 200) {
        console.log('post successfully');
        setFinish(true);
      } else {   
      console.error("failed to fetch data");
      }
    })
    .catch((error) => {
      console.error(error);
    });
  };

    
  const renderItem = ({ item, index }) => (
    <View style={styles.row}>
            <Text style={styles.title}>{keysArray[index]}</Text>
            <TextInput
                    style={styles.input}
                    value={item}
                    onChangeText={(text) => handleEdit(index, text)}
            />
    </View>
  );

  return (
    <View style={styles.container}>
        <View style={{justifyContent:'center',alignItems:'center'}}>
                <Text style={{fontSize: 26, fontWeight: 'bold',}}>
                    Details from scanned Paper
                </Text>
        </View>
        <View>
            <FlatList
                
                data={valuesArray}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
            />

        </View>
        
    
    <View style={styles.buttonColumn}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={{backgroundColor: 'brown',borderRadius: 5,padding: 10,} } onPress={() => setFinish(true)} >
                <Text style={styles.buttonText} onPress={handleSendToBackend}>Submit</Text>
            </TouchableOpacity>
          </View>
    </View>
             
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingTop: 50,
    gap:10
  },

  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'center',
    marginBottom: 10,
  },
  title: {
    fontWeight: 'bold',
    marginRight: 5,
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonColumn: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap:60,
  },
  button: {
    backgroundColor: 'blueviolet',
    borderRadius: 5,
    padding: 10,
  },


  buttonText: {
    color: 'white',
  },
});
export default Edit;