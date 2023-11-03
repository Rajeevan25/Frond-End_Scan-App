import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet,ScrollView, CheckBox } from 'react-native';
import FrontPage from './FrontPage';
import axios from 'axios';
import * as DocumentPicker from "expo-document-picker";


const Form1 = (Mid) => {
  const [finish, setFinish] = useState(false);
  const [numberOfStudents, setNumberOfStudents] = useState();
  const [moduleName, setModuleName] = useState('');
  const [id, setId] = useState('');
  const [maxNumQ, setMaxNumQ] = useState();
  const [maxMarkQ, setMaxMarkQ] = useState();


  const handleFormSubmit = async () => {
    setFinish(true);
    if ( numberOfStudents && moduleName && id && maxMarkQ && maxNumQ)  {
      const data = {
        numberOfStudents: numberOfStudents,
        moduleName: moduleName,
        id: id,
        maxMarkQues:maxMarkQ,
        maxNumQues : maxNumQ,
      };
      const config = {
        method: 'POST',
        url: 'https://2z1cnnk0-5000.asse.devtunnels.ms/',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        data: JSON.stringify(data)
      };
      axios(config)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson.statusCode );
        if (responseJson.statusCode === 200) {
          console.log('Get successfully', response);
          setFinish(true);
        } else {   
        console.error("failed to get data");
        }
      })
      .catch((error) => {
        console.error(error);
      });
    }

  };



  const pickSomething = async () => {
    try {
        const docRes = await DocumentPicker.getDocumentAsync({
          type: "text/csv",
    });
    const assets = docRes.assets;
    if (!assets) 
               return;
    if (isSelected === false){
      setSelection(!isSelected);
    }
    
    const file = assets[0];
    console.log(file);

    const formData = new FormData();
    let imageBlob = await fetch(file.uri)
    imageBlob = await imageBlob.blob()
    let image_ext = file.uri.split('.').pop()
    const image_as_file = new File(
      [imageBlob], 'csv1' + image_ext, { lastModified: new Date().getTime(), type: imageBlob.type });

    // formData.append('image',image.base64);
    formData.append('file', image_as_file, 'ca.csv')
    const { data } = await axios.put('https://2z1cnnk0-5000.asse.devtunnels.ms/ca/uploadcsv/1', formData, {
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
        });
    console.log(data);

    // const assets = docRes.assets;
    // if (!assets) 
    //            return;
    // if (isSelected === false){
    //   setSelection(!isSelected);
    // }
    
    // const file = assets[0];
    // console.log(file);
    // const csvFile = {
    //   name: file.name.split(".")[0],
    //   uri: file.uri,
    //   type: file.mimeType,
    //   size: file.size,
    // };
    // console.log(csvFile)
    // formData.append("csvFile", file );
    // console.log(formData.csvFile)
    // fetch('https://2z1cnnk0-5000.asse.devtunnels.ms/ca/uploadcsv/1', {
    //       method: 'PUT',
    //       headers: {
    //         Accept: 'application/json',
    //         'Content-Type': 'multipart/form-data',
    //       },
    //       body: {
    //         file: formData
    //       }
    // })
    // .then((response) => response.json())
    // .then((data) => {
    //       console.log(data);
    // })
    // .catch((error) => {
    //       console.error("Error while fetching data: ", error);
    // });
    } catch (error) {
        console.log("Error while selecting file: ", error);
    }
    
  };
  
  if(finish){
    return <FrontPage/>;
  }
  const [isSelected, setSelection] = useState(false);
  const onCheckChange = () => {   
    pickSomething();   
  };
  return (
    <ScrollView>

    <View style={styles.container}>
      <Text style={styles.label}>Module Information Form</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Module Name:</Text>
        <TextInput
          style={styles.input}
          placeholder=""
          onChangeText={(text) => {setModuleName(text) }}
          value={moduleName}
        />
      </View>
      
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Module ID:</Text>
        <TextInput
          style={styles.input}
          placeholder=""
          onChangeText={(text) => setId(text)}
          value={id}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Number of Students:</Text>
        <TextInput
          style={styles.input}
          placeholder=""
          onChangeText={(text) => setNumberOfStudents(text)}
          value={numberOfStudents}
          keyboardType="numeric"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Maximum number  of eligible questions:</Text>
        <TextInput
          style={styles.input}
          placeholder=""
          onChangeText={(text) => setMaxNumQ(text)}
          value={maxNumQ}
          keyboardType="numeric"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Maximum marks for a question:</Text>
        <TextInput
          style={styles.input}
          placeholder=""
          onChangeText={(text) => setMaxMarkQ(text)}
          value={maxMarkQ}
          keyboardType="numeric"
        />
      </View>
      <View style={styles.inputCont}>
          <Text style={styles.inputLabel}>Picked a csv file for CA marks : </Text>
          <CheckBox
        value={isSelected}
        onValueChange={onCheckChange}
        style={styles.checkbox}
      />
              
      </View>
       

      <Button title="Submit" onPress={handleFormSubmit} />
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    display:'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
    paddingLeft:10,
    paddingRight:10,
  },
  label: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  inputCont: {
    width: '100%',
    marginBottom: 20,
    flexDirection:'row'
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
  },
  checkbox: {
    alignSelf: 'center',
  },
});

export default Form1;


