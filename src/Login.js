import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet,Image } from 'react-native';
import axios from 'axios';
import Page from './Page';

const Login = () => {
  const [action, setAction] = useState("Login");
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [check, setCheck] = useState(false);
  

  useEffect(() => {
    setName('');
    setPassword('');
  }, [loggedIn, action]);

  const handleSignUp = async () => {
    setName('');
    setPassword('');
    setAction("Sign Up");
    if((name.length > 4) && (password.length > 4) && (email.length > 4)){
      handleSubmitSignUp();
    }
   
  };

  const handleLogin = async () => {
    setAction("Login");
    handleSubmitLogin();
  };


  const handleSubmitLogin = async () => {

    fetch('https://2z1cnnk0-5000.asse.devtunnels.ms/auth/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_name: name,
        password: password
      })
    })
    .then((response) => 
    response.json())
    .then((responseJson) => {
      console.log(responseJson.statusCode );
      if (responseJson.statusCode === 200) {
        setUsername(name);
        setLoggedIn(true);
      } else {   
      console.error("Login failed");
      }
    })
    .catch((error) => {
      console.error(error);
    });
    
  };
 

  const handleSubmitSignUp = async () => {
    const requestData = {
      user_name: name,
      password : password
    };
    
    const config = {
      method: 'PUT',
      url: 'https://2z1cnnk0-5000.asse.devtunnels.ms/auth/users',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      data: JSON.stringify(requestData)
    };
    axios(config)
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson.statusCode );
      if (responseJson.statusCode === 200) {
        setUsername(name);
        setLoggedIn(true);
      } else {   
      alert("SignUp failed");
      }
    })
    .catch((error) => {
      console.error(error);
    });
    
  };

  const handleSubmit = async () => {
      if(name == 'admin' && password == '12345'){
        setUsername(name);
        setLoggedIn(true);
      }
        
  
  };
  if (loggedIn) {
    return <Page uname={username}/>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text}>{action}</Text>
        <View style={styles.underline}></View>
      </View>
      <View style={styles.inputs}>
        {action === "Login" ? <View></View> :
          <View style={styles.input}>
            <Image
                 style={styles.icon}
                 source={require('../assets/download.png')}
            />
            <TextInput style={styles.inputText} placeholder='Email id' onChangeText={(text) => setEmail(text)} />
          </View>}

        <View style={styles.input}>
           <Image
                 style={styles.icon}
                 source={require('../assets/download.jpeg')}
            />
            <TextInput style={styles.inputText} placeholder='Username' onChangeText={(text) => setName(text)} />
        </View>

        <View style={styles.input}>
          <Image
                 style={styles.icon}
                 source={require('../assets/download1.jpeg')}
            />
          <TextInput style={styles.inputText} placeholder='Password' onChangeText={(text) => setPassword(text)} secureTextEntry={true} />
        </View>
      </View>
      {action === "Sign Up" ? <View></View> :
      <Text style={styles.forgetPassword}>Forgot Password --- 
              <TouchableOpacity >
                <Text style={{ color: 'red' }}>Click Here</Text>
              </TouchableOpacity></Text>
      }
      <View style={styles.submitContainer}>
        <TouchableOpacity style={action === "Login" ? [styles.submit, styles.gray] : styles.submit} onPress={handleSignUp}>
          <Text style={{ color: 'white' }}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity style={action === "Sign Up" ? [styles.submit, styles.gray] : styles.submit} onPress={handleLogin}>
          <Text style={{ color: 'white' }}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    width: 'auto',
    height:'100%',
  
  },
  header: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 9,
    width: '100%',
    marginTop: 30,
  },
  text: {
    color: '#3c009d',
    fontSize: 48,
    fontWeight: '700',
  },
  underline: {
    width: 131,
    height: 6,
    backgroundColor: '#3c009d',
    borderRadius: 9,
  },
  inputText: {
    fontSize :18,
    height:50,
    alignItems: 'center',
    width: 300,
  },
  inputs: {
    marginTop: 55,
    flexDirection: 'column',
    gap: 25,
    alignItems: 'center',
  },
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
    width: 480,
    height: 80,
    backgroundColor: '#eaeaea',
    borderWidth: 6,
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 50,
 
  },
  forgetPassword: {
    alignItems: 'center',
    justifyContent: 'center',
    color: '#797979',
    fontSize: 18,
  },
  submitContainer: {
    flexDirection: 'row',
    gap: 30,
    margin: 60,
  },
  submit: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 220,
    height: 59,
    backgroundColor: '#4c00b4',
    borderRadius: 50,
    fontSize: 19,
  },
  gray: {
    color: '#676767',
    backgroundColor: 'gray',
  },
});

export default Login;
