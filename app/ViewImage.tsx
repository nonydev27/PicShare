import { Image, View } from "react-native";

export default function ViewImage() {
  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <Image
        source={{
          uri: "https://static.vecteezy.com/system/resources/previews/006/998/434/non_2x/photo-camera-icons-photo-camera-icon-design-illustration-photo-camera-simple-sign-photo-camera-logo-vector.jpg",
        }}
        style={{ width: "100%", height: "100%" }}
        resizeMode="contain"
      />
    </View>
  );
}