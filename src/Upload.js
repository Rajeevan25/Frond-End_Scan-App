
import { StyleSheet, Text, View , Image ,Button, ImageBackground ,ScrollView ,Modal ,TouchableOpacity,Dimensions  } from 'react-native';
import {useState , useRef} from 'react';
import * as ImagePicker  from "expo-image-picker"
import axios from 'axios';
import React from 'react'
import ImageViewer from './ImageViewer';
import Edit from './edit';
import VisualData from './VisualData';
export default function Upload({name,year}) {
    const [selectedImage, setSelectedImage] = useState(null);
    const [img, setImg] = useState(null);
    const Img1 = require('../assets/2.jpeg'); 
    const [ dataScan,setDataScan]= useState();
    const [check, setCheck] = useState(false);
    const handleImageUpload = async () => {
        if (img) {
            console.log(img)
            console.log("NAME", img.name)
            const formData = new FormData();
    
            let imageBlob = await fetch(img.uri)
            imageBlob = await imageBlob.blob()
            let image_ext = img.uri.split('.').pop()
            const image_as_file = new File(
              [imageBlob], 'image1.jpg', { lastModified: new Date().getTime(), type: imageBlob.type });
            console.log('image1.' + image_ext)
            // formData.append('image',image.base64);
            formData.append('image', image_as_file, 'imag1.' + image_ext)
            const { data } = await axios.post(`https://2z1cnnk0-5000.asse.devtunnels.ms/marksheet/upload/${year}`, formData, {
              headers: {
                Accept: "application/json",
                "Content-Type": "multipart/form-data",
              },
            });
            console.log(data);
            setDataScan(data);
            setCheck(true);
           
        }    
      };
      if (check) {
        return < VisualData yearId={year} sampleData={dataScan} />;;
      }

    const pickImageAsync = async() =>{
        let result = await ImagePicker.launchImageLibraryAsync({
                     allowsEditing: true,
                     quality: 1,
                     aspect: [16, 9],
                     
         });
        
         if (!result.canceled) {
                     setSelectedImage(result.assets[0].uri);
                     setImg(result.assets[0]);
                     
                     //console.log(result);
         } else {
                     alert('You did not select any image.');
   }
   }
  return (
    <View style={styles.containerM}>

    <View style={styles.containerM}>
    {selectedImage ? (
      <View style={styles.imageContainer}>
            <ImageViewer 
                placeholderImageSource={Img1} 
                selectedImage={selectedImage}
            />
            
    </View>):(
    <View style={styles.imageContainer}>
            <Image
                    source={Img1 }
            />                    
    </View>          
    )}
   <View style={{gap:30,alignItems:'center',justifyContent: 'center',flexDirection: 'row',}}>
        <View style={styles.button}>
                <Button title='Select'  onPress={pickImageAsync} color={'black'}/>
        </View>
        <View style={styles.button}>
               <Button title='Scan'  color={'black'} onPress={handleImageUpload}/>
        </View> 
        <View style={styles.button}>
                <Button title='Close'  color={'black'} onPress={() => setisModal2Visible(false)}/>
        </View>                   
   </View>
</View>
    </View>
  )
}
const { width, height } = Dimensions.get('window');
const screenHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding : 30,
    gap:10,
  },
  containerC: {
    height:5*screenHeight /10,
    alignItems: 'center',
    justifyContent: 'center',
    gap:10,
  },
  containerM:{
    flexDirection: 'column',
    flex: 1,
    alignItems: 'center',
  },
  controlsContainer:
  {
    //flex: 1,
    height:"15%",
    width :'100%' ,
    flexDirection:'row',
    justifyContent: 'space-evenly',
    backgroundColor: 'gray',
    alignItems: 'center',
    position:"absolute",
    bottom: 0,
    left:0,
    right:0,
    paddingBottom : 50,
   
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: 'gray',
    borderRadius: 5,
    padding: 10,
  },
  takePictureButton:{
 
    backgroundColor: 'white',
    width : 70,
    height: 70,
    borderRadius: 35,
    marginVertical:10
  },
  text: {
    flex: 1,
    fontSize : 22,
    color : 'white',
    justifyContent: 'center',  
    alignItems: 'center',
  },
  head: {
    fontSize : 42,
    color : 'yellow',
    fontWeight : 'bold',
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
  imageContainer: {
    alignItems :'center',
    top:70
  },
  imageContain: {
    alignItems :'center',
    width:width,
    height:height/4,
  },
  camera: {
    width:'100%',height:"85%",
    //paddingTop:73,
    
  
  },
});
