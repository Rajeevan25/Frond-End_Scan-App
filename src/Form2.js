import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet ,TouchableOpacity,ScrollView} from 'react-native';
import Graph from './Graph';
import axios from 'axios';


const Form2 = () => {
  const [finish, setFinish] = useState(false);

  const [indexNumber, setIndexNumber] = useState('');
  const [moduleName, setModuleName] = useState('');
  const [marks, setMarks] = useState();
  const [q1, setQ1] = useState();
  const [q2, setQ2] = useState();
  const [q3, setQ3] = useState();
  const [q4, setQ4] = useState();
  const [q5, setQ5] = useState();
  const [q6, setQ6] = useState();
  const [q7, setQ7] = useState();
   
  const handleFormSubmit = async () => {
    setFinish(true);
    if ( indexNumber && moduleName && marks && q1 && q2 && q3 && q4 && q5 && q6 && q7 )  {
      const data = {
        moduleName: moduleName,
          id: indexNumber,
          TotalMark:marks,
          Q1 : q1,
          Q2 : q2,
          Q3 : q3,
          Q4 : q4,
          Q5 : q5,
          Q6 : q6,
          Q7 : q7,
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
  }
  
  if(finish){
    return <Graph/>
  }

  return (
    <ScrollView>

    <View style={styles.container}>
      <Text style={styles.label}>Exam Paper Information Form</Text>

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
        <Text style={styles.inputLabel}>Index Number:</Text>
        <TextInput
          style={styles.input}
          placeholder=""
          onChangeText={(text) => setIndexNumber(text)}
          value={indexNumber}
          keyboardType="numeric"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Marks:</Text>
        <TextInput
          style={styles.input}
          placeholder=""
          onChangeText={(text) => setMarks(text)}
          value={marks}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Question1 Marks:</Text>
        <TextInput
          style={styles.input}
          placeholder=""
          onChangeText={(text) => setQ1(text)}
          value={q1}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Question2 Marks:</Text>
        <TextInput
          style={styles.input}
          placeholder=""
          onChangeText={(text) => setQ2(text)}
          value={q2}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Question3 Marks:</Text>
        <TextInput
          style={styles.input}
          placeholder=""
          onChangeText={(text) => setQ3(text)}
          value={q3}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Question4 Marks:</Text>
        <TextInput
          style={styles.input}
          placeholder=""
          onChangeText={(text) => setQ4(text)}
          value={q4}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Question5 Marks:</Text>
        <TextInput
          style={styles.input}
          placeholder=""
          onChangeText={(text) => setQ5(text)}
          value={q5}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Question6 Marks:</Text>
        <TextInput
          style={styles.input}
          placeholder=""
          onChangeText={(text) => setQ6(text)}
          value={q6}
        />
      </View><View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Question7 Marks:</Text>
        <TextInput
          style={styles.input}
          placeholder=""
          onChangeText={(text) => setQ7(text)}
          value={q7}
        />
      </View>


     
      <View>
        <TouchableOpacity style={styles.button1} onPress={handleFormSubmit}  >
            <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
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
    paddingTop: 50,
    padding:10
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
  button1: {
    backgroundColor: 'gray',
    borderRadius: 5,
    padding: 10,
  },

  buttonText: {
    color: 'white',
  },
});

export default Form2;
