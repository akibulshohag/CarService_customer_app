import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";

//components

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

export default function UpdateProfile() {
  const navigation = useNavigation<any>();
  const scheme = useColorScheme();

  const [img, setimg] = useState("");
  const [fullName, setfullName] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [password, setpassword] = useState("");
  const [loading, setloading] = useState(false);

  const getFileInfo = async (fileURI: string) => {
    const fileInfo = await FileSystem.getInfoAsync(fileURI);
    return fileInfo;
  };

  const isLessThanTheMB = (fileSize: number, smallerThanSizeMB: number) => {
    const isOk = fileSize / 1024 / 1024 < smallerThanSizeMB;
    return isOk;
  };

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        quality: 1,
        base64: true,
      });

      if (result.cancelled) return;

      const { uri, type } = result;
      const fileInfo = await getFileInfo(result.uri);

      if (!fileInfo?.size) {
        alert("Can't select this file as the size is unknown.");
        return;
      }

      if (type === "image") {
        const isLt15MB = isLessThanTheMB(fileInfo.size, 3);
        if (!isLt15MB) {
          alert(`Image size must be smaller than 3MB!`);
          setimg("");
        } else {
          setimg(result.base64);
        }
      }

      // Save or process with the result.uri
    } catch (error) {
      console.info(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={`black`} />

      <View style={styles.headerContainer}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <AntDesign
            onPress={() => navigation.goBack()}
            name="left"
            size={30}
            color={"black"}
          ></AntDesign>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              width: deviceWidth / 1.3,
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "bold", marginLeft: 10 }}>
              Profile
            </Text>
          </View>
        </View>
      </View>
      <View style={{ alignItems: "center", paddingVertical: 20 }}>
        <View
          style={{
            alignItems: "center",
          }}
        >
          {img ? (
            <Image
              style={styles.img}
              source={{ uri: `data:image/jpg;base64,${img}` }}
            ></Image>
          ) : (
            <Image
              style={styles.img}
              source={require("../assets/car/carraod.jpg")}
            ></Image>
          )}

          <TouchableOpacity onPress={() => pickImage()}>
            <View style={styles.cam}>
              <FontAwesome name="camera" size={15} color="#fff" />
              <Text style={{ fontSize: 10, marginLeft: 5, color: "#fff" }}>
                Change
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ alignItems: "center" }}>
        <View style={{ paddingVertical: 5 }}>
          <Text style={{ fontSize: 16, color: "#1239", marginBottom: 5 }}>
            Full Name
          </Text>
          <View style={styles.input1}>
            <TextInput
              style={{ width: deviceWidth / 1.5 }}
              onChangeText={setfullName}
              value={fullName}
              placeholder={"Full Name"}
            />
          </View>
        </View>
        <View style={{ paddingVertical: 5 }}>
          <Text style={{ fontSize: 16, color: "#1239", marginBottom: 5 }}>
            Email
          </Text>
          <View style={styles.input1}>
            <TextInput
              style={{ width: deviceWidth / 1.5 }}
              onChangeText={setemail}
              value={email}
              placeholder={"Email"}
            />
          </View>
        </View>
        <View style={{ paddingVertical: 5 }}>
          <Text style={{ fontSize: 16, color: "#1239", marginBottom: 5 }}>
            Mobile Number
          </Text>
          <View style={styles.input1}>
            <TextInput
              style={{ width: deviceWidth / 1.5 }}
              onChangeText={setphone}
              value={phone}
              placeholder={"Mobile Number"}
            />
          </View>
        </View>
        <View style={{ paddingVertical: 5 }}>
          <Text style={{ fontSize: 16, color: "#1239", marginBottom: 5 }}>
            Password
          </Text>
          <View style={styles.input1}>
            <TextInput
              style={{ width: deviceWidth / 1.5 }}
              onChangeText={setpassword}
              value={password}
              placeholder={"Password"}
            />
          </View>
        </View>
        <View style={{ paddingVertical: 15 }}>
          <TouchableOpacity
            // onPress={() => signUp()}
            style={styles.loginBtn}
            // onPress={() => loginWithPass()}
          >
            {loading ? (
              <ActivityIndicator size={"small"} color="#fff" />
            ) : (
              <Text style={{ fontSize: 16, color: "#fff" }}>Update</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
  },
  headerContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomColor: "#004C3F",
    borderBottomWidth: 0.5,
    backgroundColor: "#fff",
  },

  img: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    borderWidth: 0.01,
    borderRadius: 100,
  },
  cam: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#004C3F",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 50,
    position: "absolute",
    bottom: -5,
    right: -40,
  },
  input1: {
    height: 45,
    width: deviceWidth / 1.2,
    // margin: 5,
    padding: 10,
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    elevation: 5,
    borderRadius: 5,
  },
  loginBtn: {
    backgroundColor: `#004C3F`,
    padding: 10,
    width: deviceWidth / 1.2,
    borderRadius: 5,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
