import { Image, StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={styles.container}
    >
      <Image source={{uri: "https://static.vecteezy.com/system/resources/previews/006/998/434/non_2x/photo-camera-icons-photo-camera-icon-design-illustration-photo-camera-simple-sign-photo-camera-logo-vector.jpg"}} style={styles.image} />
      <Text style={styles.title}>PicShare</Text>
      <Text style={styles.description}>Pick a photo, share it!</Text>
      <Text  style={styles.buttonPrimary} onPress={() => {alert("Button clicked!")}}>Select a Photo</Text>
      <Text style={styles.buttonSec}>More info</Text>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: "#4ECDC4",
    flex: 1,
    justifyContent: "center",
    alignItems: "center", 
  },

  image: {
    width: 200,
    height: 200,
    marginBottom: 20, 
    borderRadius: 100,
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 10,
  },

  description: {
    fontSize: 18,
    marginBottom: 20,
  },
  buttonSec: {
    backgroundColor: "#1A535C", padding: 10, borderRadius: 5, marginTop: 10, color: "#ffffff", width: "30%", textAlign: "center"
  },  
  buttonPrimary: {
    backgroundColor: "#ffffff", padding: 10, borderRadius: 5, marginTop: 10, color: "#1A535C", width: "30%", textAlign: "center"
  },  
  
});
