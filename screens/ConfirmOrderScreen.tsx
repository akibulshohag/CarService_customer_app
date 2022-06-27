import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
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

export default function UpdateProfile() {
  const navigation = useNavigation<any>();
  const scheme = useColorScheme();
  const [loading, setloading] = useState(false);

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
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              Confirmation
            </Text>
          </View>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ paddingHorizontal: 20, marginTop: 10 }}>
          <Text style={{ fontSize: 16, fontWeight: "bold", color: "#004C3F" }}>
            Please Review Your Request and Confirm{" "}
          </Text>
        </View>
        <View style={{ paddingVertical: 15, alignItems: "center" }}>
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
                  source={require("../assets/car/car5.png")}
                ></Image>

                <View style={{ marginLeft: 15 }}>
                  <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                    Mercedes
                  </Text>
                  <Text style={{ color: "#1239" }}>BenzW 147</Text>
                </View>
              </View>
              <Text
                style={{ fontSize: 18, fontWeight: "bold", color: "#004C3F" }}
              >
                TK 1000{" "}
                <Text style={{ fontSize: 16, color: "#1239" }}>| Day</Text>
              </Text>
            </View>
          </View>
          <View style={styles.card}>
            <View style={{ marginBottom: 10 }}>
              <Text
                style={{ fontSize: 16, fontWeight: "bold", color: "#1239" }}
              >
                Name
              </Text>
              <Text style={{ fontSize: 16, color: "#000" }}>
                Cristiano Ronaldo
              </Text>
              <View
                style={{
                  borderBottomWidth: 1,
                  paddingVertical: 2,
                  borderBottomColor: "#1239",
                }}
              ></View>
            </View>
            <View style={{ marginBottom: 10 }}>
              <Text
                style={{ fontSize: 16, fontWeight: "bold", color: "#1239" }}
              >
                Email
              </Text>
              <Text style={{ fontSize: 16, color: "#000" }}>
                akib021@gmail.com
              </Text>
              <View
                style={{
                  borderBottomWidth: 1,
                  paddingVertical: 2,
                  borderBottomColor: "#1239",
                }}
              ></View>
            </View>
            <View style={{ marginBottom: 10 }}>
              <Text
                style={{ fontSize: 16, fontWeight: "bold", color: "#1239" }}
              >
                Phone Number
              </Text>
              <Text style={{ fontSize: 16, color: "#000" }}>01867473587</Text>
              <View
                style={{
                  borderBottomWidth: 1,
                  paddingVertical: 2,
                  borderBottomColor: "#1239",
                }}
              ></View>
            </View>
            <View style={{}}>
              <Text
                style={{ fontSize: 16, fontWeight: "bold", color: "#1239" }}
              >
                NID No:
              </Text>
              <Text style={{ fontSize: 16, color: "#000" }}>
                2437***********
              </Text>
            </View>
          </View>
          <View style={styles.card}>
            <View style={{ marginBottom: 10, paddingVertical: 5 }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ fontSize: 16, color: "#1239" }}>
                  Pick Up and Return
                </Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <AntDesign name="edit" size={20} color="#004C3F" />
                  <Text
                    style={{ fontSize: 16, color: "#004C3F", marginLeft: 5 }}
                  >
                    Change
                  </Text>
                </View>
              </View>
              <Text style={{ fontSize: 16 }}>
                Washington Manchester - Same Location
              </Text>
              <View
                style={{
                  borderBottomWidth: 0.5,
                  borderBottomColor: "#1239",
                  marginTop: 5,
                }}
              ></View>
            </View>
            <View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ fontSize: 16, color: "#1239" }}>
                  Pick Up and Return
                </Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <AntDesign name="edit" size={20} color="#004C3F" />
                  <Text
                    style={{ fontSize: 16, color: "#004C3F", marginLeft: 5 }}
                  >
                    Change
                  </Text>
                </View>
              </View>
              <Text style={{ fontSize: 16 }}>
                Washington Manchester - Same Location
              </Text>
              <View
                style={{
                  borderBottomWidth: 0.5,
                  borderBottomColor: "#1239",
                  marginTop: 5,
                }}
              ></View>
            </View>
          </View>
          <View style={styles.card}>
            <View
              style={{
                borderBottomWidth: 0.5,
                borderBottomColor: "#1239",
                paddingVertical: 5,
              }}
            >
              <Text
                style={{ fontSize: 18, fontWeight: "600", marginBottom: 5 }}
              >
                Rental Fees
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ fontSize: 16, color: "#1239" }}>
                  One Day rent
                </Text>
                <Text style={{ fontSize: 16, color: "#1239" }}>Tk 200</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ fontSize: 16, color: "#1239" }}>
                  Three Day rent
                </Text>
                <Text style={{ fontSize: 16, color: "#1239" }}>Tk 600</Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 10,
              }}
            >
              <Text
                style={{ fontSize: 18, color: "#004C3F", fontWeight: "600" }}
              >
                Total Feee
              </Text>
              <Text
                style={{ fontSize: 18, color: "#004C3F", fontWeight: "600" }}
              >
                Tk 800
              </Text>
            </View>
          </View>
          <View style={styles.card}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ fontSize: 18, color: "#000", fontWeight: "600" }}>
                payment Method
              </Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <AntDesign name="edit" size={20} color="#004C3F" />
                <Text style={{ fontSize: 16, color: "#004C3F", marginLeft: 5 }}>
                  Change
                </Text>
              </View>
            </View>
            <View style={{ paddingVertical: 5 }}>
              <Image
                style={styles.img1}
                source={require("../assets/car/PayPal.png")}
              ></Image>
            </View>
          </View>
          <TouchableOpacity
            // onPress={() => `${console.log("......ffffffffff")}`}
            style={styles.loginBtn}
          >
            {loading ? (
              <ActivityIndicator size={"small"} color="#fff" />
            ) : (
              <Text style={{ fontSize: 18, color: "#fff" }}>Confirm Book</Text>
            )}
          </TouchableOpacity>
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
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  img: {
    width: 90,
    height: 80,
    resizeMode: "contain",
    borderWidth: 0.01,
  },
  img1: {
    width: 80,
    height: 70,
    resizeMode: "contain",
    borderWidth: 0.01,
  },
  loginBtn: {
    backgroundColor: `#004C3F`,
    padding: 10,
    width: deviceWidth / 1.1,
    borderRadius: 5,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
