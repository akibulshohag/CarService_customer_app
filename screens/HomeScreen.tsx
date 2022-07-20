import { AntDesign } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

//components
import CarCard from "../components/CarCard";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

export default function HomeScreen() {
  const navigation = useNavigation<any>();
  const scheme = useColorScheme();

  const [city, setcity] = useState("Inside City");
  const [showDate, setshowDate] = useState(false);
  const [date, setDate] = useState("");
  const [loading, setloading] = useState(false);
  const [datee, setDatee] = useState(new Date());
  const [open, setOpen] = useState(false);

  const onChange = (event: any, selectedDate: any) => {
    setshowDate(false);

    const currentDate = selectedDate || date;
    setDate(currentDate);
  };
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={`black`} />
      <SafeAreaView>
        <ScrollView>
          <View>
            <Image
              style={styles.img}
              source={require("../assets/car/carraod.jpg")}
            />
            <View style={styles.imgContainer}>
              <Text
                style={{
                  color: `${scheme === "dark" ? "#fff" : "#fff"}`,
                  fontSize: 22,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Own a car without actually buying it. So book now
              </Text>
            </View>
            <View
              style={{
                alignItems: "center",
                margin: 12,
                position: "absolute",
                bottom: -40,
                left: "20%",
              }}
            >
              <TouchableOpacity
                style={styles.loginBtn}
                onPress={() => navigation.navigate("SearchCar")}
              >
                {loading ? (
                  <ActivityIndicator size={"small"} color="#fff" />
                ) : (
                  <Text style={[styles.title, { fontSize: 18 }]}>Find Car</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ marginTop: 50, paddingHorizontal: 20 }}>
            <Text
              style={{
                fontSize: 22,
                fontWeight: "bold",
                color: `${scheme === "dark" ? "#fff" : "#000"}`,
              }}
            >
              Hot Deals
            </Text>
          </View>
          <View style={{ paddingHorizontal: 15 }}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {Array.apply(null, { length: 10 }).map(
                (item: any, index: number) => (
                  <View
                    key={index}
                    style={{ paddingVertical: 10, paddingHorizontal: 5 }}
                  >
                    <CarCard />
                  </View>
                )
              )}
            </ScrollView>
          </View>

          <View
            style={{
              alignItems: "center",
              margin: 12,
            }}
          >
            <TouchableOpacity
              activeOpacity={0.3}
              style={styles.loginBtn1}
              onPress={() => navigation.navigate("AvailableCar")}
            >
              <View>
                <Text
                  style={[styles.title, { fontSize: 18, fontWeight: "bold" }]}
                >
                  Available Car
                </Text>
                <Text style={[styles.title, { fontSize: 16 }]}>
                  Long Term And Short Term
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: "#fff",
                  padding: 8,
                  borderRadius: 10,
                }}
              >
                <AntDesign name="right" size={30} />
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: 5, paddingHorizontal: 20 }}>
            <Text
              style={{
                fontSize: 22,
                fontWeight: "bold",
                color: `${scheme === "dark" ? "#fff" : "#000"}`,
              }}
            >
              Latest Offers
            </Text>
          </View>
          <View style={{ paddingHorizontal: 15 }}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {Array.apply(null, { length: 10 }).map(
                (item: any, index: number) => (
                  <View
                    key={index}
                    style={{ paddingVertical: 10, paddingHorizontal: 5 }}
                  >
                    <CarCard />
                  </View>
                )
              )}
            </ScrollView>
          </View>

          {showDate ? (
            <DateTimePicker
              testID="dateTimePicker"
              value={new Date()}
              mode="date"
              display="default"
              onChange={onChange}
            />
          ) : null}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
  },
  img: {
    width: deviceWidth,
    height: deviceWidth / 1.4,
    borderWidth: 0.5,
    resizeMode: "contain",
    // position: "relative",
  },
  imgContainer: {
    position: "absolute",
    top: 5,
    paddingHorizontal: 20,
    resizeMode: "center",
  },

  picker: {
    width: deviceWidth / 1.1,
    height: 50,
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: "#fff",
    borderRadius: 5,
  },
  loginBtn: {
    backgroundColor: `#004C3F`,
    padding: 15,
    borderRadius: 5,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: deviceWidth / 1.7,
  },
  loginBtn1: {
    backgroundColor: `#004C3F`,
    padding: 10,
    borderRadius: 5,
    width: deviceWidth / 1.1,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 16,
    color: "#fff",
    // fontWeight: "bold",
  },
});
