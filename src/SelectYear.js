import React, { useState,useEffect } from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet, ScrollView, } from 'react-native';
import axios from 'axios';
import Graph from './Graph';
import CameraS from './camera';
import Upload from './Upload';
export default function SelectYear(Mid) {
  const [data, setData] = useState([{}]);
  const [check, setCheck] = useState(false);
  
  const [yid,setYid] = useState();
  const OpenInformation = (id) =>{
    setYid(id);
    setCheck(true);
}
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
  
    fetch('https://2z1cnnk0-5000.asse.devtunnels.ms/moduleYear/getmoduleYears', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        module_id: Mid['Mid'],
      })
    })
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson.statusCode );
      if (responseJson.statusCode === 200) {
        console.log('Get successfully');
        setData(responseJson.moduleYears);
      } else {   
      console.error("failed to get data");
      }
    })
    .catch((error) => {
      console.error(error);
    });

  };
  const ModuleBox = ({ title, Mid, year}) => {
    return (

      <View style={styles.moduleBox}>
        <View style={styles.moduleBoxT}>
          <Text>
            <Text style={styles.text}>Module Year ID : </Text>
            <Text>{title}</Text>
          </Text>
          <Text>
            <Text style={styles.text}>Module ID : </Text>
            <Text>{Mid}</Text>
          </Text>
          <Text>
            <Text style={styles.text}>Year : </Text>

            <Text>{year}</Text>
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              
              OpenInformation(title);
            }}
          >
            <Text style={styles.buttonText}>Check</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  if (check) {
    return <Upload name={Mid} year={yid} />;;
}

  return (
    <ScrollView >
    
    <View style={styles.container}>
    <Text style={{ textAlign: 'center', fontSize: 34, fontWeight: 'bold', paddingVertical: 10 }}>Modules Year</Text>
      <View style={styles.moduleContainer}>
        {data.map((item) => (
          <View key={item.title}>
            <ModuleBox title={item.module_year_id} Mid={item.module_id} year={item.year}  />
          </View>
        ))}
      </View>
      {/* <View style={styles.buttonColumn}>

            <View style={styles.buttonContainer}>
              <TouchableOpacity style={{backgroundColor: 'gray',borderRadius: 5,padding: 10,} } onPress={() => setAction(true)} >
                  <Text style={styles.buttonText}>Add new year</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity style={{backgroundColor: 'brown',borderRadius: 5,padding: 10,} } onPress={() => setFinish(true)} >
                  <Text style={styles.buttonText}>Back</Text>
              </TouchableOpacity>
            </View>
      </View> */}
    </View>
    </ScrollView>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding:40,
    gap:10,
  },
  moduleContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    flex: 1,
  },
  moduleBox: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 20,
    margin: 20,
    width: 300,
    height: 200,
    gap:20,
  },
  moduleBoxT: {
    gap:20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  text: {
    fontWeight: 'bold',
    fontSize:16,
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
