import {
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Linking,
  SafeAreaView,
  ScrollView,
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
  const [loading, setloading] = useState(false);
  const [fullName, setfullName] = useState("");
  const [email, setemail] = useState("");
  const [message, setmessage] = useState("");

  const phoneCall = () => {
    Linking.openURL(`tel: 01867473587`);
  };

  const mailTo = () => {
    Linking.openURL("mailto:support@example.com");
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
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>Support</Text>
          </View>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ paddingHorizontal: 20, paddingVertical: 15 }}>
          <Text style={{ fontSize: 20, fontWeight: "600", color: "#004C3F" }}>
            We are happy to hear from you!
          </Text>
          <Text style={{ fontSize: 18, color: "#1239" }}>
            Let us know your queries and feedbacks
          </Text>
        </View>
        <View style={{ paddingHorizontal: 20 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-evenly",
              paddingVertical: 5,
            }}
          >
            <TouchableOpacity
              onPress={() => phoneCall()}
              style={styles.loginBtn}
            >
              {loading ? (
                <ActivityIndicator size={"small"} color="#fff" />
              ) : (
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Ionicons name="call" size={20} color="#fff" />
                  <Text style={{ fontSize: 18, color: "#fff", marginLeft: 10 }}>
                    Call Now
                  </Text>
                </View>
              )}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => mailTo()} style={styles.loginBtn1}>
              {loading ? (
                <ActivityIndicator size={"small"} color="#fff" />
              ) : (
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <MaterialCommunityIcons
                    name="email"
                    size={20}
                    color="#004C3F"
                  />
                  <Text
                    style={{
                      fontSize: 20,
                      color: "#004C3F",
                      marginLeft: 10,
                      fontWeight: "600",
                    }}
                  >
                    Mail Us
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
          <View
            style={{
              borderBottomWidth: 0.5,
              borderBottomColor: "#1239",
              paddingVertical: 10,
            }}
          ></View>
        </View>
        <View style={{ paddingHorizontal: 20, paddingVertical: 15 }}>
          <Text style={{ color: "#1239", fontSize: 20, fontWeight: "600" }}>
            Or Send your Message
          </Text>
          <View style={{ paddingVertical: 15, alignItems: "center" }}>
            <View style={styles.input1}>
              <TextInput
                style={{ width: deviceWidth / 1.5 }}
                onChangeText={setfullName}
                value={fullName}
                placeholder={"Full Name"}
              />
            </View>
            <View style={styles.input1}>
              <TextInput
                style={{ width: deviceWidth / 1.5 }}
                onChangeText={setemail}
                value={email}
                placeholder={"Email"}
              />
            </View>
            <View style={styles.messageBox}>
              <TextInput
                style={{ width: deviceWidth / 1.5 }}
                onChangeText={setmessage}
                value={message}
                placeholder={"Message"}
                multiline
                numberOfLines={4}
              />
            </View>
            <TouchableOpacity activeOpacity={0.5} style={styles.loginBtn}>
              {loading ? (
                <ActivityIndicator size={"small"} color="#fff" />
              ) : (
                <Text style={{ fontSize: 16, color: "#fff" }}>Submit</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
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
  card: {
    width: deviceWidth / 1.1,
    elevation: 5,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  loginBtn: {
    backgroundColor: `#004C3F`,
    width: deviceWidth / 2.8,
    borderRadius: 5,
    alignItems: "center",
    paddingVertical: 15,
  },
  loginBtn1: {
    width: deviceWidth / 2.8,
    borderRadius: 5,
    alignItems: "center",
    paddingVertical: 13,
    borderWidth: 1,
    borderColor: "#004C3F",
  },
  input1: {
    height: 50,
    width: deviceWidth / 1.1,
    padding: 10,
    backgroundColor: "#fff",
    elevation: 5,
    borderRadius: 5,
    marginBottom: 20,
  },
  messageBox: {
    height: 100,
    width: deviceWidth / 1.1,
    padding: 10,
    backgroundColor: "#fff",
    elevation: 5,
    borderRadius: 5,
    marginBottom: 20,
  },
});
