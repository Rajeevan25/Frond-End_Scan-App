import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , Image ,Button, ImageBackground ,ScrollView ,Modal ,TouchableOpacity,Dimensions  } from 'react-native';
import {useState , useRef} from 'react';
import * as ImagePicker  from "expo-image-picker"
import * as MediaLibrary from 'expo-media-library'
import axios from 'axios';
import { Camera ,CameraType } from 'expo-camera';


import FrontPage from './FrontPage';
import Navb from './Navb';
import Button1 from './Button1';
import ImageViewer from './ImageViewer';
import Edit from './edit';

const Img1 = require('../assets/2.jpeg'); 
const Img2 = require('../assets/Im.jpg'); 
const screenHeight = Dimensions.get("window").height;


export default function Page({ uname }) {
  const [isModal1Visible,setisModal1Visible] =useState(false);
  const [isModal2Visible,setisModal2Visible] =useState(false);
  const [isModal3Visible,setisModal3Visible] =useState(false);
  const [isModal4Visible,setisModal4Visible] =useState(false);

  const [finish, setFinish] = useState(false);
  const [check, setCheck] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [image, setImage] = useState(null);
  const [img, setImg] = useState(null);
  const [details, setDetails] = useState('');

  const [flash ,setFlash] = useState(Camera.Constants.FlashMode.off)
  const [type ,setType] = useState(Camera.Constants.Type.back) 
  const cameraRef = useRef(null);
  const [permission , requestPermission] = Camera.useCameraPermissions();
  const [permissionResponse, requestPermissionMedia] = MediaLibrary.usePermissions();


  if (finish) {
    return <FrontPage username={uname}/>;
  };
  if (check) {
    return <Edit data={details}/>;
  };
  
  








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
  const takePicture = async () => {
    if (cameraRef) {
      try {  
        const data = await cameraRef.current.takePictureAsync();
        console.log(data);
        setImage(data.uri);
      } catch (error) {
        console.log(error);
      }
    }
  };
  const savePicture = async () => {
    if (image) {
      try {
         // const asset = await MediaLibrary.createAssetAsync(image);
        MediaLibrary.saveToLibraryAsync(image);
        alert('wait for some minutes......! 🎉');
        console.log(image.uri);
        setImage(null);
        console.log('wait for some minutes......');
      } catch (error) {
        console.log(error);
      }
    }
  };

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
        const { data } = await axios.post('https://2z1cnnk0-5000.asse.devtunnels.ms/marksheet/upload', formData, {
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
        });
        console.log(data);
    }    
  };
 
  const ScanImage = async (img) => {
        const requestData = {
          name: img,
        };
        const config = {
          method: 'POST',
          url: 'https://2z1cnnk0-5000.asse.devtunnels.ms/',
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
            console.log('Image uploaded successfully', response);
            setDetails(response.data) ;
            setCheck(true);
          } else {   
          console.error("SignUp failed");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    
  };

  
  if(! permission || !permission.granted){
    return <View style={styles.container} >
      <Text>
        No permission
      </Text>
      <Button title={"Get permission"} onPress={()=> requestPermission()}></Button>
    </View>
  }
//   if(! permissionResponse || !permissionResponse.granted){
//    return <View style={styles.container}>
//      <Text>
//       No permission
//    </Text>
//       <Button title={"Get Media permission"} onPress={()=> requestPermissionMedia()}></Button>
//    </View>
//  }
  
 
  return (
    <ScrollView>

    <View >
            <View style={{paddingTop:30}}>
                  <Navb name={uname}/>
                  
            </View>
            <View style={{justifyContent:'center',alignItems:'center',paddingBottom:30}}>
              <Text style={{fontWeight:'bold',fontSize:45}}>
                    ISR Scan
              </Text>
            </View>
            <View style={styles.imageContain}>
                                    <ImageViewer 
                                        placeholderImageSource={Img2} 
                                    />
                                    
                            </View>
           <View style={styles.containerC}>
                           
                      <View style={styles.button}>
                                      <Button title='Choose the Photo'  onPress={() => setisModal2Visible(true)} color={'lightblue'}/>
                      </View>
                      <View style={styles.button}>
                                      <Button title='Open the camera' onPress={() => setisModal3Visible(true)} color={'lightblue'}/>
                      </View>
                      <View style={styles.button} >
                                      <Button title='Front Page' onPress={() => setFinish(true)}  color={'lightblue'}/>
                      </View >

           </View>

      <Modal style={styles.containerM} visible= {isModal2Visible} onRequestClose={() => setisModal2Visible(false) }>
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
                           <View style={{gap:30,alignItems:'center',justifyContent: 'center',height:3*height/4,flexDirection: 'row',}}>
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
      </Modal>

      <Modal visible= {isModal3Visible} onRequestClose={() => setisModal3Visible(false) } animationType='fade'>             
        <View style={styles.containerM}>     
                  {!image ? (
                    <Camera
                                      style={styles.camera}
                                      type={type}
                                      ref={cameraRef}
                                      flashMode={flash}               />
                  ) : (
                                    <Image source={{ uri: image }} style={styles.camera} />
                  )}
                  <View style={styles.controlsContainer}>
                    {image ? (
                      <View
                        style={styles.controlsContainer}
                      >
                        <Button1
                                        title="Re-take"
                                        onPress={() => setImage(null)}
                                        icon="retweet"
                        />
                        <Button1 title="Digitalize" onPress={savePicture} icon="check" />
                      </View>
                    ) : (
                
                <View style={styles.controlsContainer}> 

                        <Button1
                            title=""
                            icon="flash"
                            onPress={() =>{
                                              setFlash(
                                                flash === Camera.Constants.FlashMode.off
                                                ? Camera.Constants.FlashMode.on
                                                : Camera.Constants.FlashMode.off
                                                      );
                                          }
                                    }
                          
                            color={flash === Camera.Constants.FlashMode.off ? 'white' : 'yellow'}
                          />
                        <Button1  onPress={takePicture} icon="camera" />     
                        <Button1
                              title=""
                              icon="retweet"
                              onPress={() => {
                                                setType(
                                                  type === CameraType.back ? CameraType.front : CameraType.back
                                                );
                              }}
                        />          
                      </View>
                    )}
                  </View>
                  <Button title='Back'  color={'blue'} onPress={() => setisModal3Visible(false) }/>
        </View>
                            
      </Modal>

      <StatusBar style="auto" />
    </View>
    </ScrollView>
    
  );
}
const { width, height } = Dimensions.get('window');
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
    top:70,
    width:width,
    height:height/2,
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
