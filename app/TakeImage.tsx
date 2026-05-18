// 1. FIXED: Imported useState from 'react'
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ViewImage() {
  const [facing, setFacing] = useState<'back' | 'front'>('back');
  const [permission, requestPermission] = useCameraPermissions();

  // Camera permissions are still loading
  if (!permission) {
    return <View style={styles.container} />;
  }

  // Camera permissions are not granted yet
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

  return (
    <View style={styles.container}>
      {/* 2. FIXED: CameraView is now the primary view filling the screen */}
      <CameraView style={styles.camera} facing={facing}>
        
        {/* 3. FIXED: Top overlay row containing your styled action buttons */}
        <View style={styles.btnfxn}>
          <TouchableOpacity style={styles.btnX} activeOpacity={0.7}>
            <Entypo name="cross" size={28} color="white" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.btnT} activeOpacity={0.7}>
            <FontAwesome name="trash-o" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Bottom overlay row containing your camera control trigger */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.text}>Flip Camera</Text>
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
    top: 60, // Safely pushes icons below phone notch hardware
    left: 0,
    right: 0,
    flexDirection: "row",  
    justifyContent: "space-between", // Pushes one button left, one button right
    paddingHorizontal: 24,  
    zIndex: 10,
  },
  btnX: {
    backgroundColor: "red",
    width: 50,                
    height: 50,               
    borderRadius: 25,         
    justifyContent: "center", 
    alignItems: "center",     
  },
  btnT: {
    backgroundColor: "green",
    width: 50,                
    height: 50,               
    borderRadius: 25,         
    justifyContent: "center", 
    alignItems: "center",     
  },
  buttonContainer: {
    position: "absolute",
    bottom: 40, // Places the flip button cleanly at the bottom edge of screen
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 20,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
    color: '#fff',
  },
});