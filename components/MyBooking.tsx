import { Ionicons } from "@expo/vector-icons";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";
import { showMessage } from "react-native-flash-message";
import { TouchableOpacity } from "react-native-gesture-handler";

import BookingService from "../services/BookingService";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

export default function TabOneScreen({ bookingList }: any) {
  const navigation = useNavigation<any>();
  const scheme = useColorScheme();
  const isFocused = useIsFocused();

  const [loading, setloading] = useState(false);
  const [renderme, setrenderme] = useState(true);
  const [customerId, setcustomerId] = useState("");

  useEffect(() => {
    SecureStore.getItemAsync("customerId").then((res) => {
      if (res) {
        setcustomerId(res);
      }
    });
  }, [isFocused]);

  const Delete = async () => {
    const data = {
      booking_id: bookingList?.bookingId,
    };

    try {
      let res = await BookingService.bookingDelete(data);
      // console.log("............res", res);

      if (res) {
        BookingService.bookingList(customerId).then((res) => {
          console.log("........res", res);
        });
        showMessage({
          message: `Deleted`,
          type: "success",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // console.log("........", bookingList);

    bookingList;
  }, [isFocused]);

  // console.log(".............", bookingList);

  return (
    <>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("BookingDetails", {
            bookingDetails: bookingList,
          })
        }
        style={styles.card}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View style={{ width: deviceWidth / 1.9 }}>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              {bookingList?.carName}{" "}
              {/* <Text style={{ fontSize: 16, color: "#1239" }}>SUV</Text> */}
            </Text>
            {/* <Text style={{ fontSize: 18, color: "#1239" }}>
              Corolla Axios 2015
            </Text> */}

            <View
              style={{ display: "flex", flexDirection: "row", marginTop: 10 }}
            >
              <Ionicons name="location-sharp" size={20} color={"#004C3F"} />
              <Text style={{ fontSize: 16, color: "#000", marginLeft: 5 }}>
                {bookingList?.formArea}, {bookingList?.toArea}
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 10,
                width: 200,
              }}
            >
              <View>
                <Text style={{ color: "#1239" }}>Trip Date</Text>
                <Text style={{ fontSize: 15 }}>{bookingList?.pickUpDate}</Text>
              </View>
              <View>
                <Text style={{ color: "#1239" }}>Pick Up Time</Text>
                <Text style={{ fontSize: 15 }}>{bookingList?.pickUpTime}</Text>
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
            {bookingList?.avatar ? (
              <Image
                style={styles.img}
                source={{ uri: `${bookingList?.avatar}` }}
              ></Image>
            ) : (
              <Image
                style={styles.img}
                source={require("../assets/car/car5.png")}
              ></Image>
            )}
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
              Booking Status:{" "}
              <Text style={{ color: "red" }}>{bookingList?.bookingStatus}</Text>
            </Text>
            <Text style={{ fontSize: 20, color: "#004C3F" }}>
              TK {bookingList?.rent}
            </Text>
          </View>
          {bookingList?.bookingSchedule?.length > 0 ? (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("BookingDetails", {
                  bookingDetails: bookingList,
                })
              }
              style={styles.loginBtn}
            >
              <Text style={{ color: "#004C3F", fontSize: 16 }}>Schedule</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </TouchableOpacity>
    </>
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
