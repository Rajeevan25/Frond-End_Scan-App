import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image ,Modal} from 'react-native';
import { Ionicons, MaterialIcons,Entypo } from '@expo/vector-icons';
import Login from './Login';
const Navb = ({ name }) => {
  const [currentColor, setCurrentColor] = useState('#000000');
  const [activeMenu, setActiveMenu] = useState(false);

  const [isModal1Visible,setisModal1Visible] =useState(false);
  const [isClicked, setIsClicked] = useState({
    notification: false,
    userProfile: false,
  });
 
  const handleActiveMenu = () => setActiveMenu(!activeMenu);



  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleActiveMenu} style={styles.button}>
        <Ionicons name="menu-outline" size={24} color={currentColor} />
      </TouchableOpacity>

      <View style={styles.content}>
        <TouchableOpacity  style={styles.button}>
          <Ionicons name="notifications-outline" size={24} color={currentColor} />
        </TouchableOpacity>
        <View style={styles.profileButton}>

          <Image source={require('../assets/ava.png')} style={styles.avatar} />
          <Text style={styles.text}>
            Hi, <Text style={styles.boldText}>{name}</Text>
          </Text>
        </View>
        <TouchableOpacity onPress={() => setisModal1Visible(true)} style={styles.profileButton}>
        <Entypo name="log-out" size={24} color="black" />
        </TouchableOpacity>
      </View>

      
      <Modal visible= {isModal1Visible} onRequestClose={() => setisModal1Visible(false) } animationType='fade'>
          <View style={styles.containerM}>
                   <Login/>
                </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  containerM: {
    flex:1,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  content: {
    flexDirection: 'row',
  },
  button: {
    padding: 10,
  },
  profileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    gap:5,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  text: {
    color: '#808080',
    fontSize: 14,
  },
  boldText: {
    fontWeight: 'bold',
  },
});

export default Navb;
