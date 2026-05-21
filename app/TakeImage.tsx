import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useRouter } from "expo-router";
import * as Sharing from 'expo-sharing';
import { useRef, useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function TakeIimage() {
  const [facing, setFacing] = useState<'back' | 'front'>('back');
  const [permission, requestPermission] = useCameraPermissions();
  
  // reference to hold the Camera instance
  const cameraRef = useRef<CameraView>(null);
  const route = useRouter();

  if (!permission) {
    return <View style={styles.container} />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  async function takePicture() {
    if (cameraRef.current) {
      try {
        const options = { quality: 0.8, skipProcessing: false };
        const photo = await cameraRef.current.takePictureAsync(options);
              
      if (!photo || !photo.uri) {
        alert("Could not capture image data.");
        return;
      }

      console.log("Photo taken successfully:", photo.uri);        

        const isSharingAvailable = await Sharing.isAvailableAsync();
        // alert("Photo captured!"); no more alerting, instead let's share 

        if(isSharingAvailable){
          await Sharing.shareAsync(photo.uri);
        }else{
          alert("Sharing is not allowed on this platform!");
        }
      } catch (error) {
        console.error("Failed to take picture:", error);
      }
    }
  }

  return (
    <View style={styles.container}>
      {/* Connected the cameraRef to the CameraView component */}
      <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
        
        {/* Top Control Bar */}
        <View style={styles.btnfxn}>
          <TouchableOpacity style={styles.btnX} activeOpacity={0.7} onPress={() => route.push("/WelcomeScreen")}>
            <Entypo name="cross" size={28} color="white" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.btnT} activeOpacity={0.7} onPress={toggleCameraFacing}>
            <FontAwesome name="refresh" size={24} color="white" /> {/* Swapped to a refresh icon for flipping */}
          </TouchableOpacity>
        </View>

        {/* Bottom Control Bar */}
        <View style={styles.bottomContainer}>
          {/* 5. The Shutter Button */}
          <TouchableOpacity 
            style={styles.shutterButton} 
            onPress={takePicture}
            activeOpacity={0.7}
          >
            <View style={styles.innerShutter} />
          </TouchableOpacity>
        </View>

      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    flex: 1,
  },
  camera: {
    flex: 1, 
  },
  btnfxn: {
    position: "absolute",
    top: 60, 
    left: 0,
    right: 0,
    flexDirection: "row",  
    justifyContent: "space-between", 
    paddingHorizontal: 24,  
    zIndex: 10,
  },
  btnX: {
    backgroundColor: "rgba(0,0,0,0.5)",
    width: 50,                
    height: 50,               
    borderRadius: 25,         
    justifyContent: "center", 
    alignItems: "center",     
  },
  btnT: {
    backgroundColor: "rgba(0,0,0,0.5)",
    width: 50,                
    height: 50,               
    borderRadius: 25,         
    justifyContent: "center", 
    alignItems: "center",     
  },
  bottomContainer: {
    position: "absolute",
    bottom: 40, 
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shutterButton: {
    width: 84,
    height: 84,
    borderRadius: 42,
    borderWidth: 4,
    borderColor: "white",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  innerShutter: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: "white",
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
    color: '#fff',
  },
});