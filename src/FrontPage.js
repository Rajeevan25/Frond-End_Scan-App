import React, { useState,useEffect } from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet, ScrollView, } from 'react-native';
import axios from 'axios';

import SelectYear from './SelectYear';
import Form1 from './Form1';
import Graph from './Graph';
import Page from './Page';

const FrontPage = ({username}) => {
  const [action, setAction] = useState(false);
  const [check, setCheck] = useState(false);
  
  const [name,setname] = useState();
  const [finish, setFinish] = useState(false);
  const OpenInformation = (id) =>{
      setname(id);
      setCheck(true);
  }

  const [data, setData] = useState([{}]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {

    
    fetch('https://2z1cnnk0-5000.asse.devtunnels.ms/module/getmodules', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_name: username,
      })
    })
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson.statusCode );
      if (responseJson.statusCode === 200) {
        console.log('Get successfully', responseJson.modules[0].module_years[0].module_year_id);

        setData(responseJson.modules);
      } else {   
      console.error("failed to get data");
      }
    })
    .catch((error) => {
      console.error(error);
    });

  };

  const ModuleBox = ({ title, content, number }) => {
    return (

      <View style={styles.moduleBox}>
        <View style={styles.moduleBoxT}>
          <Text>
            <Text style={styles.text}>Module Name : </Text>
            <Text>{title}</Text>
          </Text>
          <Text>
            <Text style={styles.text}>Module Code ID : </Text>
            <Text>{content}</Text>
          </Text>
          <Text>
            <Text style={styles.text}>Module ID : </Text>

            <Text>{number}</Text>
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              
              OpenInformation(number);
            }}
          >
            <Text style={styles.buttonText}>Check</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  
    if (action) {
        return <Form1 SelectYear Mid={name}/>;
    }
    if (check) {
      return <SelectYear Mid={name} />;;
  }
  if (finish) {
    return <Page/>;
  };

  return (
    <ScrollView >
    
    <View style={styles.container}>
    <Text style={{ textAlign: 'center', fontSize: 34, fontWeight: 'bold', paddingVertical: 10 }}>Modules</Text>
      <View style={styles.moduleContainer}>
        {data.map((item) => (
          <View key={item.title}>
            <ModuleBox title={item.module_name} content={item.module_code} number={item.module_id}  />
          </View>
        ))}
      </View>
      <View style={styles.buttonColumn}>

            <View style={styles.buttonContainer}>
              <TouchableOpacity style={{backgroundColor: 'gray',borderRadius: 5,padding: 10,} } onPress={() => setAction(true)} >
                  <Text style={styles.buttonText}>Add new module</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity style={{backgroundColor: 'brown',borderRadius: 5,padding: 10,} } onPress={() => setFinish(true)} >
                  <Text style={styles.buttonText}>Back</Text>
              </TouchableOpacity>
            </View>
      </View>
    </View>
    </ScrollView>
  );
};

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

export default FrontPage;
