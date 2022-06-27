import {
  AntDesign,
  Entypo,
  FontAwesome,
  MaterialIcons,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Dimensions,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import LogOutModal from "../components/LogOutModal";

//components

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

export default function HomeScreen(props: any) {
  const navigation = useNavigation<any>();
  const scheme = useColorScheme();

  const [ModalOpen, setModalOpen] = useState(false);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={`black`} />

      <View style={styles.headerContainer}>
        <View
          style={{
            alignItems: "center",
          }}
        >
          {/* <AntDesign
            onPress={() => navigation.navigate("HomeScreen")}
            name="left"
            size={25}
            color={"black"}
          ></AntDesign> */}
          <Text style={{ fontSize: 20, fontWeight: "bold", marginLeft: 10 }}>
            Profile
          </Text>
        </View>
      </View>
      <View style={{ alignItems: "center", paddingVertical: 20 }}>
        <View style={styles.card}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image
                style={styles.img}
                source={require("../assets/car/carraod.jpg")}
              ></Image>

              <View style={{ marginLeft: 10 }}>
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                  Cristiano Ronaldo
                </Text>
                <Text style={{ color: "#1239" }}>
                  Cristiagggnoldo@gmail.com
                </Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => setModalOpen(true)}
              style={{ flexDirection: "row", alignItems: "center" }}
            >
              <AntDesign name="logout" size={20} color="red" />
              <Text
                style={{
                  fontSize: 16,
                  marginLeft: 5,
                  color: "#004C3F",
                  fontWeight: "bold",
                }}
              >
                Logout
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.card1}>
          <TouchableOpacity
            activeOpacity={0.3}
            onPress={() => navigation.navigate("MyBookingScreen")}
            style={styles.profileSection}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View
                style={{
                  width: 35,
                  alignItems: "center",
                }}
              >
                <FontAwesome name="car" size={25} color="#1239" />
              </View>

              <Text style={styles.title}>My Booking</Text>
            </View>
            <Entypo name="chevron-right" size={25} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.3}
            onPress={() => navigation.navigate("UpdateProfile")}
            style={styles.profileSection}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View
                style={{
                  width: 35,
                  alignItems: "center",
                }}
              >
                <FontAwesome name="user" size={25} color="#1239" />
              </View>
              <Text style={styles.title}>My Profile</Text>
            </View>
            <Entypo name="chevron-right" size={25} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.3}
            onPress={() => navigation.navigate("Notification")}
            style={styles.profileSection}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View
                style={{
                  width: 35,
                  alignItems: "center",
                }}
              >
                <FontAwesome name="bell" size={25} color="#1239" />
              </View>
              <Text style={styles.title}>Notification</Text>
            </View>
            <Entypo name="chevron-right" size={25} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("Support")}
            style={styles.profileSection}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View
                style={{
                  width: 35,
                  alignItems: "center",
                }}
              >
                <MaterialIcons name="support-agent" size={25} color="#1239" />
              </View>
              <Text style={styles.title}>Support</Text>
            </View>
            <Entypo name="chevron-right" size={25} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => navigation.navigate("TermAndCondition")}
            style={styles.profileSection}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View
                style={{
                  width: 35,
                  alignItems: "center",
                }}
              >
                <FontAwesome name="file-text" size={25} color="#1239" />
              </View>
              <Text style={styles.title}>Terms & Condition</Text>
            </View>
            <Entypo name="chevron-right" size={25} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("PushNotification")}
            style={styles.profileSection1}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View
                style={{
                  width: 35,
                  alignItems: "center",
                }}
              >
                <AntDesign name="questioncircle" size={25} color="#1239" />
              </View>
              <Text style={styles.title}>FAQs</Text>
            </View>
            <Entypo name="chevron-right" size={25} color="#000" />
          </TouchableOpacity>
        </View>
      </View>
      {ModalOpen ? (
        <LogOutModal setModalOpen={setModalOpen} ModalOpen={ModalOpen} />
      ) : null}
    </View>
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
    // height: 190,
    elevation: 5,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
  },
  card1: {
    width: deviceWidth / 1.1,
    // height: 190,
    elevation: 5,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  img: {
    width: 60,
    height: 60,
    resizeMode: "contain",
    borderWidth: 0.01,
    borderRadius: 100,
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 5,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#1239",
  },
  profileSection1: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 5,
    paddingVertical: 15,
  },
  title: {
    fontSize: 18,
    marginLeft: 15,
    color: "#000",
  },
});
