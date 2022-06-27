import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

export default function TabOneScreen() {
  const navigation = useNavigation<any>();
  const scheme = useColorScheme();

  const [loading, setloading] = useState(false);

  return (
    <TouchableOpacity style={styles.card}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View style={{ width: deviceWidth / 1.9 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            Mercedes <Text style={{ fontSize: 16, color: "#1239" }}>SUV</Text>
          </Text>
          <Text style={{ fontSize: 18, color: "#1239" }}>
            Corolla Axios 2015
          </Text>

          <View style={{ display: "flex", flexDirection: "row" }}>
            <Ionicons name="location-sharp" size={20} color={"#004C3F"} />
            <Text style={{ fontSize: 16, color: "#000", marginLeft: 5 }}>
              Dhaka, Bangladesh, India
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 5,
              width: 240,
            }}
          >
            <View>
              <Text style={{ color: "#1239" }}>Start Trip</Text>
              <Text style={{ fontSize: 15 }}>12 April, 4:00PM</Text>
            </View>
            <View>
              <Text style={{ color: "#1239" }}>End Trip</Text>
              <Text style={{ fontSize: 15 }}>14 April, 5:00PM</Text>
            </View>
          </View>
        </View>

        <View
          style={{
            alignItems: "center",
            width: deviceWidth / 3,
            height: deviceHeight / 5.5,
            // position: "absolute",
            // backgroundColor: "red",
          }}
        >
          <Image
            style={styles.img}
            source={require("../assets/car/car4.png")}
          ></Image>
        </View>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View>
          <Text style={{ fontSize: 16, color: "#1239" }}>
            Paid Via Credit Card
          </Text>
          <Text style={{ fontSize: 20, color: "#004C3F" }}>TK 800</Text>
        </View>

        <TouchableOpacity
          style={styles.loginBtn}
          // onPress={() => loginWithPass()}
        >
          {loading ? (
            <ActivityIndicator size={"small"} color="#fff" />
          ) : (
            <Text
              style={{ fontSize: 20, color: "#004C3F", fontWeight: "bold" }}
            >
              View
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  img: {
    width: "100%",
    height: 100,
    resizeMode: "contain",
    borderWidth: 0.01,
  },
  card: {
    width: deviceWidth / 1.1,
    // height: 210,
    elevation: 5,
    backgroundColor: "#fff",
    padding: 10,
  },
  loginBtn: {
    backgroundColor: `#fff`,
    padding: 7,
    borderRadius: 5,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: deviceWidth / 4,
    elevation: 5,
  },
});
