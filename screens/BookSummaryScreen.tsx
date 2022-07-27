import { Entypo, Feather } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import {
  Dimensions,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";

//components

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

export default function BookSummary() {
  const navigation = useNavigation<any>();
  const scheme = useColorScheme();
  const route = useRoute();
  const { carName, fromArea, time, date, carRent, address }: any = route.params;

  // console.log("............", carName);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={`black`} />
      <View style={{ alignItems: "center", marginTop: 50 }}>
        <Feather
          name="check-circle"
          size={40}
          color="#004C3F"
          style={{ fontWeight: "bold" }}
        />
        <Text style={{ fontSize: 17, fontWeight: "bold", marginBottom: 5 }}>
          Booked Successfully
        </Text>
        <Text style={{ color: "#1239" }}>
          You've booked {carName} successfully
        </Text>
        <Text style={{ color: "#1239" }}>
          Go to my booking for more booking details
        </Text>
      </View>
      <View style={{ alignItems: "center", marginTop: 20 }}>
        <View style={styles.card}>
          <View style={styles.star}>
            <Entypo
              name="star"
              size={15}
              color="#004C3F"
              style={{ fontWeight: "bold" }}
            />
          </View>
          <View style={{ alignItems: "center", marginTop: 10 }}>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>Summary</Text>
          </View>
          <View style={{ paddingVertical: 10 }}>
            <Text style={{ fontSize: 14, color: "#1239" }}>Car</Text>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>{carName}</Text>
          </View>
          <View style={{ marginBottom: 5 }}>
            <Text style={{ fontSize: 14, color: "#1239" }}>
              Pick Up Address
            </Text>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              {address}, {fromArea}
            </Text>
          </View>
          <View style={{ marginBottom: 5 }}>
            <Text style={{ fontSize: 14, color: "#1239" }}>Trip Dates</Text>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              {date}, {time}
            </Text>
          </View>
          <View style={{ paddingHorizontal: 10 }}>
            <View style={styles.price}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  color: "#004C3F",
                  marginBottom: 5,
                }}
              >
                Rental Fees
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ fontSize: 16, color: "#1239" }}>Trip 1</Text>
                <Text style={{ fontSize: 16, color: "#004C3F" }}>
                  Tk {carRent}
                </Text>
              </View>
              {/* <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ fontSize: 16, color: "#1239" }}>
                  One Day Rent
                </Text>
                <Text style={{ fontSize: 16, color: "#004C3F" }}>Tk 2000</Text>
              </View> */}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 10,
                }}
              >
                <Text style={{ fontSize: 16, color: "#004C3F" }}>
                  Total Fees
                </Text>
                <Text style={{ fontSize: 16, color: "#004C3F" }}>
                  Tk {carRent}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={{ marginTop: 20 }}
          onPress={() => navigation.navigate("TabNav")}
        >
          <Text
            style={{
              fontSize: 18,
              color: "#004C3F",
              textDecorationLine: "underline",
            }}
          >
            Back To Home
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
  },
  card: {
    borderWidth: 0.5,
    borderColor: "#1239",
    width: deviceWidth / 1.1,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  star: {
    position: "absolute",
    top: -15,
    left: "40%",
    width: 80,
    height: 30,
    backgroundColor: "#F9F9F9",
    alignItems: "center",
    justifyContent: "center",
  },
  price: {
    backgroundColor: "#fff",
    marginTop: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  loginBtn: {
    backgroundColor: `#004C3F`,
    padding: 10,
    width: deviceWidth / 1.1,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
});
