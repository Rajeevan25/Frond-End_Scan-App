import { StyleSheet, Text, View , Image ,Button, ImageBackground ,ScrollView ,Modal ,TouchableOpacity,Dimensions  } from 'react-native';
import {useState , useRef} from 'react';
import * as MediaLibrary from 'expo-media-library'
import axios from 'axios';
import { Camera ,CameraType } from 'expo-camera';

import Button1 from './Button1';



export default function CameraS(name,year) {
  const [image, setImage] = useState(null);
  const [img, setImg] = useState(null);
  const [flash ,setFlash] = useState(Camera.Constants.FlashMode.off)
  const [type ,setType] = useState(Camera.Constants.Type.back) 
  const cameraRef = useRef(null);
  const [permission , requestPermission] = Camera.useCameraPermissions();
  const [permissionResponse, requestPermissionMedia] = MediaLibrary.usePermissions();
  
  const [ data,setData]= useState();
  const [check, setCheck] = useState(false);
  if (check) {
    return <CameraS  yearId={year} data={data} />;;
  }
  const handleImageUpload = async () => {
    if (img) {
        console.log(img)
        console.log("NAME", img.name)
        // image.name = 'image1'
        // image.type = 'image/png'
        const formData = new FormData();

        let imageBlob = await fetch(img.uri)
        imageBlob = await imageBlob.blob()
        let image_ext = img.uri.split('.').pop()
        const image_as_file = new File(
          [imageBlob], 'image1.' + image_ext, { lastModified: new Date().getTime(), type: imageBlob.type });
        console.log('image1.' + image_ext)
        // formData.append('image',image.base64);
        formData.append('image', image_as_file, 'image1.' + image_ext)
      //   for (var pair of formData.entries()) {
      //     console.log(pair[0]+ ', ' + pair[1]); 
      // }
        
        // fetch('https://2z1cnnk0-5000.asse.devtunnels.ms/marksheet/uploadjson', {
        //   method: 'PUT',
        //   headers: {
        //     Accept: 'application/json',
        //     "Content-Type": "application/json",
        //   },
        //   body:JSON.stringify({
        //     image:image.base64,
        //   })
           
        // })

        // .then((response) => response.json())
        // .then((responseJson) => {
        //   console.log(responseJson.statusCode );
        //   if (responseJson.statusCode === 200) {
        //     console.log('Get successfully');   
        //     setData(responseJson.modules);
        //     setCheck(true);
        //   } else {   
        //   console.error("failed to get data");
        //   }
        // })
        // .catch((error) => {
        //   console.error(error);
        // });

      

        const { data } = await axios.post('https://2z1cnnk0-5000.asse.devtunnels.ms/marksheet/upload', formData, {
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
        });
        console.log(data);
    }    
  };

  // const savePicture = async () => {
  //   if (image) {
  //     try {
  //        // const asset = await MediaLibrary.createAssetAsync(image);
  //       MediaLibrary.saveToLibraryAsync(image);
  //       alert('wait for some minutes......! 🎉');
  //       console.log(image.uri);
  //       setImage(null);
  //       console.log('wait for some minutes......');
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // };
  const takePicture = async () => {
    if (cameraRef) {
      try {  
        const data = await cameraRef.current.takePictureAsync();
        console.log(data);
        setImage(data.uri);
        setImg(data)
      } catch (error) {
        console.log(error);
      }
    }
  };
  if(! permission || !permission.granted){
    return <View style={styles.container} >
      <Text>
        No permission
      </Text>
      <Button title={"Get permission"} onPress={()=> requestPermission()}></Button>
    </View>
  }
  //if(! permissionResponse || !permissionResponse.granted){
  //  return <View style={styles.container}>
  //    <Text>
  //     No permission
  //  </Text>
  //     <Button title={"Get Media permission"} onPress={()=> requestPermissionMedia()}></Button>
  //  </View>
 //}
  return (
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
                                        
                                        onPress={() => setImage(null)}
                                        icon="retweet"
                        />
                        <Button1  onPress={handleImageUpload} icon="check" />
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
                  <View>
                         <Button1   icon="back" />
                  </View>
                  
        </View>
    
  )
}
const screenHeight = Dimensions.get("window").height;
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

