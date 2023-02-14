import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
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

  return (
    <TouchableOpacity style={styles.card}>
      <View style={styles.stockout}>
        <Text style={styles.stockTitle}>30% OFF</Text>
      </View>
      <Text style={{ fontSize: 16, fontWeight: "bold", marginTop: 10 }}>
        BMW{"   "}
        <Text style={{ fontSize: 16, fontWeight: "bold", color: "#004C3F" }}>
          TK.50{" "}
          <Text style={{ fontSize: 16, fontWeight: "bold", color: "#000" }}>
            | Day
          </Text>
        </Text>
      </Text>
      <Text style={{ fontSize: 16, fontWeight: "bold", color: "#1239" }}>
        QR7 Sport
      </Text>
      <View style={{ display: "flex", flexDirection: "row" }}>
        <Ionicons name="location-sharp" size={20} color={"#1239"} />
        <Text style={{ fontSize: 16, color: "#1239", marginLeft: 5 }}>
          Dhaka
        </Text>
      </View>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginTop: 5,
        }}
      >
        <Image
          style={styles.img1}
          source={require("../assets/car/car.png")}
        ></Image>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  img1: {
    width: "100%",
    height: 100,
    // resizeMode: "contain",
    borderWidth: 0.01,
  },

  card: {
    width: deviceWidth / 2 - 20,
    // height: 205,
    elevation: 5,
    backgroundColor: "#fff",
    padding: 10,
  },
  stockout: {
    backgroundColor: "#004C3F",
    position: "absolute",
    top: 0,
    zIndex: 99,
    padding: 3,
    paddingHorizontal: 10,
  },
  stockTitle: {
    color: "#fff",
    fontSize: 10,
  },
});
