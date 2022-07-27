import {
  AntDesign,
  Entypo,
  FontAwesome,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Linking,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import StepIndicator from "react-native-step-indicator";

//components
import ReviewModal from "../components/ReviewModal";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

export default function HomeScreen(props: any) {
  const navigation = useNavigation<any>();
  const scheme = useColorScheme();
  const route = useRoute();
  const { bookingDetails }: any = route.params;

  // console.log("...........details", bookingDetails);

  const [loading, setloading] = useState(false);
  const [ModalOpen, setModalOpen] = useState(false);

  const phoneCall = () => {
    Linking.openURL(`tel: ${bookingDetails?.bookingSchedule[0]?.driverPhone}`);
    // console.log("............clicked");
  };

  let labels = ["Pending", "Cancel", "Approved"];

  const customStyles = {
    stepIndicatorSize: 25,
    currentStepIndicatorSize: 30,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 2,
    stepStrokeCurrentColor: "#ec1d25",
    stepStrokeWidth: 2,
    stepStrokeFinishedColor: "#ec1d25",
    stepStrokeUnFinishedColor: "#aaaaaa",
    separatorFinishedColor: "#ec1d25",
    separatorUnFinishedColor: "#aaaaaa",
    stepIndicatorFinishedColor: "#ec1d25",
    stepIndicatorUnFinishedColor: "#ffffff",
    stepIndicatorCurrentColor: "#ffffff",
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: "#ec1d25",
    stepIndicatorLabelFinishedColor: "#ffffff",
    stepIndicatorLabelUnFinishedColor: "#aaaaaa",
    labelColor: "#999999",
    labelSize: 14,
    currentStepLabelColor: "#ec1d25",
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={`black`} />

      <View style={styles.headerContainer}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <AntDesign
            onPress={() => navigation.goBack()}
            name="left"
            size={25}
            color={"black"}
          ></AntDesign>
          <Text style={{ fontSize: 18, fontWeight: "bold", marginLeft: 10 }}>
            Booking Details
          </Text>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ paddingVertical: 10, alignItems: "center" }}>
          <View style={styles.card}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View style={{}}>
                {bookingDetails?.avatar ? (
                  <Image
                    style={styles.firstImage}
                    source={{ uri: `${bookingDetails?.avatar}` }}
                  ></Image>
                ) : (
                  <Image
                    style={styles.firstImage}
                    source={require("../assets/car/car5.png")}
                  ></Image>
                )}
              </View>
              {/* <View>
                <View
                  style={{
                    borderWidth: 0.5,
                    borderRadius: 10,
                    borderColor: "#1239",
                  }}
                >
                  <Image
                    style={styles.img1}
                    source={require("../assets/car/car4.png")}
                  ></Image>
                </View>
                <View style={styles.imgContainer}>
                  <Image
                    style={styles.img1}
                    source={require("../assets/car/car4.png")}
                  ></Image>
                </View>
                <View style={styles.imgContainer}>
                  <Image
                    style={styles.img1}
                    source={require("../assets/car/car5.png")}
                  ></Image>
                </View>
              </View> */}
            </View>
          </View>
        </View>
        <View style={{ paddingVertical: 10, alignItems: "center" }}>
          <View style={styles.card}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                borderBottomWidth: 0.5,
                paddingVertical: 5,
              }}
            >
              <View style={{ marginBottom: 10 }}>
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                  {bookingDetails?.carName}
                </Text>
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                  Tk {bookingDetails?.rent}
                </Text>
                {/* <Text style={{ fontSize: 14, color: "#1239" }}>Benz A 120</Text> */}
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ fontSize: 18, color: "#1239" }}>5.0</Text>
                  <Entypo
                    style={{ marginLeft: 5 }}
                    name="star"
                    size={15}
                    color={"#fa6e02"}
                  />
                </View>
                <Text style={{ fontSize: 16, color: "#1239" }}>
                  From: {bookingDetails?.formArea},{" "}
                  {bookingDetails?.formUpazila}, {bookingDetails?.formDistrict}
                </Text>
                <Text style={{ fontSize: 16, color: "#1239" }}>
                  To: {bookingDetails?.toArea}, {bookingDetails?.toUpazila},{" "}
                  {bookingDetails?.toDistrict}{" "}
                </Text>
                <Text style={{ fontSize: 17, color: "#000" }}>
                  Pick Up Address: {bookingDetails?.pickUpAddress}
                </Text>

                <TouchableOpacity onPress={() => setModalOpen(true)}>
                  <Text
                    style={{ fontSize: 17, color: "#004C3F", marginTop: 5 }}
                  >
                    Drop Your Review
                  </Text>
                </TouchableOpacity>
                <View style={{ marginTop: 10 }}>
                  <Text
                    style={{
                      color: "#000",
                      marginBottom: 5,
                      fontSize: 18,
                      fontWeight: "600",
                    }}
                  >
                    Booking Status
                  </Text>
                  <View style={{ width: 300 }}>
                    <StepIndicator
                      stepCount={3}
                      customStyles={customStyles}
                      currentPosition={
                        bookingDetails?.bookingStatus == "Pending"
                          ? 0
                          : bookingDetails?.bookingStatus == "Reject"
                          ? 1
                          : 2
                      }
                      labels={labels}
                    />
                  </View>
                </View>
              </View>
              {/* <View>
                <Text
                  style={{ fontSize: 18, color: "#004C3F", fontWeight: "bold" }}
                >
                  Tk
                </Text>
                <Text style={{ fontSize: 16, color: "#1239" }}>Per Day</Text>
              </View> */}
            </View>
            {bookingDetails?.bookingSchedule?.length > 0 ? (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingVertical: 15,
                  borderBottomWidth: 0.5,
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
                    <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                      <Text style={{ color: "#004C3F", fontSize: 18 }}>
                        Driver-
                      </Text>
                      {bookingDetails?.bookingSchedule[0]?.driverName}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity onPress={() => phoneCall()}>
                  <FontAwesome name="phone-square" size={40} color="#004C3F" />
                </TouchableOpacity>
              </View>
            ) : null}
            {bookingDetails?.bookingSchedule?.length > 0 ? (
              <View style={{ paddingVertical: 10, borderBottomWidth: 0.5 }}>
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                  Booking Schedule
                </Text>
                {bookingDetails?.bookingSchedule?.map(
                  (item: any, index: number) => (
                    <View key={index}>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: "600",
                          color: "#1239",
                        }}
                      >
                        Trip:{" "}
                        <Text
                          style={{
                            fontSize: 16,
                            fontWeight: "bold",
                            color: "#004C3F",
                          }}
                        >
                          {item?.trip}
                        </Text>
                      </Text>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                          paddingVertical: 5,
                        }}
                      >
                        <View style={{}}>
                          <Text style={{ fontSize: 16, color: "#1239" }}>
                            Date
                          </Text>
                          <Text style={{ fontSize: 16, color: "#004C3F" }}>
                            {item?.date}
                          </Text>
                        </View>
                        <View style={{}}>
                          <Text style={{ fontSize: 16, color: "#1239" }}>
                            Pick Time
                          </Text>
                          <Text style={{ fontSize: 16, color: "#004C3F" }}>
                            {item?.pickTime}
                          </Text>
                        </View>
                        <View style={{}}>
                          <Text style={{ fontSize: 16, color: "#1239" }}>
                            Drop Time
                          </Text>
                          <Text style={{ fontSize: 16, color: "#004C3F" }}>
                            {item?.dropTime}
                          </Text>
                        </View>
                      </View>
                    </View>
                  )
                )}
              </View>
            ) : null}
            <View style={{ paddingVertical: 10 }}>
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                Car Specification
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-around",
                  paddingVertical: 5,
                  // borderBottomWidth: 0.5,
                }}
              >
                <View style={{ alignItems: "center" }}>
                  <MaterialCommunityIcons
                    name="seat"
                    size={25}
                    color="#004C3F"
                  />
                  <Text>{bookingDetails?.carSeat} Seats</Text>
                </View>
                <View style={{ alignItems: "center" }}>
                  <FontAwesome5 name="gas-pump" size={20} color={"#004C3F"} />
                  <Text>Petrol</Text>
                </View>
                <View style={{ alignItems: "center" }}>
                  <AntDesign name="barschart" size={20} color={"#004C3F"} />
                  <Text>Auto</Text>
                </View>
                {/* <View style={{ alignItems: "center" }}>
                    <MaterialCommunityIcons
                      name="seat"
                      size={25}
                      color="#004C3F"
                    />
                    <Text>5 Seats</Text>
                  </View> */}
              </View>
            </View>
            {/* <View style={{ paddingVertical: 0 }}>
                <Text style={{ fontSize: 22, fontWeight: "bold" }}>
                  Car Description
                </Text>
                <Text style={{ fontSize: 16 }}>
                  ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                </Text>
              </View> */}
          </View>
          <View style={{ alignItems: "center", marginTop: 10 }}>
            <TouchableOpacity style={styles.loginBtn}>
              {loading ? (
                <ActivityIndicator size={"small"} color="#fff" />
              ) : (
                <Text style={{ fontSize: 18, color: "#fff" }}>Book Now</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      {ModalOpen ? (
        <ReviewModal setModalOpen={setModalOpen} ModalOpen={ModalOpen} />
      ) : null}
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
    width: deviceWidth / 1.1 + 10,
    elevation: 5,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
  },
  imgContainer: {
    borderWidth: 0.5,
    borderRadius: 10,
    marginTop: 5,
    borderColor: "#1239",
  },
  firstImage: {
    width: deviceWidth / 1.1 - 10,
    height: 180,
    resizeMode: "contain",
    borderWidth: 0.01,
  },
  img1: {
    width: 85,
    height: 75,
    resizeMode: "contain",
    borderWidth: 0.01,
    borderRadius: 10,
  },
  img: {
    width: 60,
    height: 60,
    resizeMode: "contain",
    borderWidth: 0.01,
    borderRadius: 100,
  },
  loginBtn: {
    backgroundColor: `#004C3F`,
    padding: 10,
    width: deviceWidth / 1.1 + 10,
    borderRadius: 5,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
