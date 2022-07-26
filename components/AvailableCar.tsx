import {
  AntDesign,
  Entypo,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
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

export default function TabOneScreen({ carList }: any) {
  const navigation = useNavigation<any>();
  const scheme = useColorScheme();

  const [loading, setloading] = useState(false);

  // console.log("...........ddd", carList?.form_district_id);
  // console.log("............", carList);

  return (
    <>
      {/* {carList?.length > 0 &&
        carList?.map((item: any, index: number) => ( */}
      <TouchableOpacity
        // key={index}
        onPress={() =>
          navigation.navigate("CarDetails", {
            carName: carList?.name,
            carSeat: carList?.seat,
            fromDistrict: carList?.form_district,
            fromUpazila: carList?.form_upazila,
            fromArea: carList?.form_area,
            toDistrict: carList?.to_district,
            toUpazila: carList?.to_upazila,
            toArea: carList?.to_area,
            photo: carList?.picture,
            carRent: carList?.rent,
            vendorId: carList?.vendor_id,
            carId: carList?.car_id,
            fromDistrictId: carList?.form_district_id,
            fromUpazilaId: carList?.form_upazila_id,
            fromAreaId: carList?.form_area_id,
            toDistrictId: carList?.to_district_id,
            toUpazilaId: carList?.to_upazila_id,
            toAreaId: carList?.to_area_id,

            modelNumber: carList?.model_number,
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
              {carList?.name}{" "}
              <Text style={{ fontSize: 16, color: "#1239" }}></Text>
            </Text>
            {/* <Text style={{ fontSize: 18, color: "#1239" }}>
              Corolla Axios 2015
            </Text> */}
            <Text
              style={{ fontSize: 18, fontWeight: "bold", color: "#004C3F" }}
            >
              TK {carList?.rent}
              {"  "}
              {/* <Text style={{ fontSize: 16, color: "#1239" }}>| Day</Text> */}
            </Text>
            <View style={{ display: "flex", flexDirection: "row" }}>
              <Ionicons name="location-sharp" size={20} color={"#1239"} />
              <Text style={{ fontSize: 16, color: "#1239", marginLeft: 5 }}>
                {carList?.form_area}, {carList?.form_upazila}
              </Text>
            </View>
            <View
              style={{ display: "flex", flexDirection: "row", marginTop: 5 }}
            >
              <Ionicons name="location-sharp" size={20} color={"#1239"} />
              <Text style={{ fontSize: 16, color: "#1239", marginLeft: 5 }}>
                To: {carList?.to_area}, {carList?.to_upazila}
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 18, color: "#1239", marginLeft: 5 }}>
                5.0
              </Text>
              <Entypo
                style={{ marginLeft: 5 }}
                name="star"
                size={15}
                color={"#f5f507"}
              />
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
            {carList?.picture == 0 ? (
              <Image
                style={styles.img}
                source={require("../assets/car/car5.png")}
              ></Image>
            ) : (
              <Image
                style={styles.img}
                source={{ uri: `${carList?.picture}` }}
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
          <View style={{ display: "flex", flexDirection: "row" }}>
            <MaterialCommunityIcons name="seat" size={24} color={"#004C3F"} />
            <Text style={{ fontSize: 16, color: "#1239", marginLeft: 5 }}>
              {carList?.seat} Seats
            </Text>
          </View>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <FontAwesome5 name="gas-pump" size={20} color={"#004C3F"} />
            <Text style={{ fontSize: 16, color: "#1239", marginLeft: 5 }}>
              Petrol
            </Text>
          </View>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <AntDesign name="barschart" size={20} color={"#004C3F"} />
            <Text style={{ fontSize: 16, color: "#1239", marginLeft: 5 }}>
              Auto
            </Text>
          </View>
          <TouchableOpacity
            style={styles.loginBtn}
            onPress={() =>
              navigation.navigate("Booked", {
                vendorId: carList?.vendor_id,
                carId: carList?.car_id,
                fromDistrictId: carList?.form_district_id,
                fromUpazilaId: carList?.form_upazila_id,
                fromAreaId: carList?.form_area_id,
                toDistrictId: carList?.to_district_id,
                toUpazilaId: carList?.to_upazila_id,
                toAreaId: carList?.to_area_id,
                carRent: carList?.rent,
              })
            }
          >
            {loading ? (
              <ActivityIndicator size={"small"} color="#fff" />
            ) : (
              <Text style={{ fontSize: 16, color: "#fff" }}>BOOK</Text>
            )}
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
      {/* ))} */}
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
    backgroundColor: `#004C3F`,
    padding: 10,
    borderRadius: 5,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: deviceWidth / 4,
  },
});
