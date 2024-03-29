import { AntDesign } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
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
import { showMessage } from "react-native-flash-message";
// import SelectList from "react-native-dropdown-select-list";
import SearchService from "../services/SearchService";

//components

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

export default function UpdateProfile() {
  const navigation = useNavigation<any>();
  const scheme = useColorScheme();
  const [getNotification, setgetNotification] = useState(false);

  const [carName, setcarName] = useState<any>([]);
  const [carSeat, setcarSeat] = useState([]);
  const [minimumRent, setminimumRent] = useState("");
  const [maximumRent, setmaximumRent] = useState("");
  const [loading, setloading] = useState(false);
  const [fromdistrict, setfromdistrict] = useState<any>([]);
  const [fromupazila, setfromupazila] = useState<any>([]);
  const [fromArea, setfromArea] = useState<any>([]);
  const [toDistrict, settoDistrict] = useState<any>([]);
  const [toUpazila, settoUpazila] = useState<any>([]);
  const [toArea, settoArea] = useState<any>([]);
  const [seat, setseat] = useState<any>("");

  //selected state
  const [selectedFromDistrict, setselectedFromDistrict] = useState("");
  const [selectedFromupazila, setselectedFromupazila] = useState("");
  const [selectedFromArea, setselectedFromArea] = useState("");
  const [selectedToDistrict, setselectedToDistrict] = useState("");
  const [selectedToupazila, setselectedToUpazila] = useState("");
  const [selectedToArea, setselectedToArea] = useState("");
  const [selectedCarName, setselectedCarName] = useState("");
  const [selectedCarSeat, setselectedCarSeat] = useState("");

  // console.log(".......", selectedFromDistrict);

  useEffect(() => {
    SearchService.getCarList1().then((res) => {
      setcarName(res?.data);
    });
  }, []);

  useEffect(() => {
    SearchService.getLocation1().then((res) => {
      setfromdistrict(res?.data);
      // let newArray = res?.data?.map((item: any) => {
      //   return { key: item?.districtId, value: item?.districtName };
      // });

      settoDistrict(res?.data);
    });
  }, []);
  useEffect(() => {
    SearchService.getCarSeat1().then((res) => {
      setcarSeat(res?.data);
    });
  }, []);

  const getFromupazila = async (id: any) => {
    setselectedFromupazila("");
    setselectedFromArea("");
    let index = fromdistrict.findIndex((e: any) => e.districtId == id);
    setfromupazila(fromdistrict[index]?.upazila);
  };

  // const extra = async () => {

  //   let index = fromdistrict.findIndex(
  //     (e: any) => e.districtId == selectedFromDistrict
  //   );
  //   let newArray = fromdistrict[index]?.upazila;
  //   let array = newArray?.map((item: any) => {
  //     return { key: item?.upazilaId, value: item?.upazilaName };
  //   });
  //   setfromupazila(array);
  // };

  const getFromArea = async (id: any) => {
    setselectedFromArea("");
    let index = fromupazila.findIndex((e: any) => e.upazilaId == id);
    setfromArea(fromupazila[index]?.area);
  };

  const getToupazila = async (id: any) => {
    setselectedToUpazila("");
    setselectedToArea("");
    let index = toDistrict.findIndex((e: any) => e.districtId == id);
    settoUpazila(toDistrict[index]?.upazila);
  };

  const getToArea = async (id: any) => {
    setselectedToArea("");
    let index = toUpazila.findIndex((e: any) => e.upazilaId == id);
    settoArea(toUpazila[index]?.area);
  };
  const getSeat = async (id: any) => {
    setcarSeat([]);
    let index = carName.findIndex((e: any) => e.id == id);
    setselectedCarSeat(carName[index]?.carSeatId);
    setseat(carName[index]?.carSeatNumber);
  };

  const carSearch = async () => {
    setloading(true);
    const data = {
      search_car_id: selectedCarName,
      search_car_seat_id: selectedCarSeat ? selectedCarSeat : "",
      search_rent_form: minimumRent,
      search_rent_to: maximumRent,
      search_form_district: selectedFromDistrict,
      search_form_upazila: selectedFromupazila,
      search_form_area: selectedFromArea,
      search_to_district: selectedToDistrict,
      search_to_upazila: selectedToupazila,
      search_to_area: selectedToArea,
    };

    // console.log(".........data", data);

    try {
      let res = await SearchService.carFilter1(data);
      // console.log(".......res", res);
      if (res?.data.length > 0) {
        navigation.navigate("AvailableCar", { carList: res?.data });
        setloading(false);
      } else {
        showMessage({
          message: `No Car found`,
          type: "warning",
        });
        setloading(false);
      }
    } catch (error) {
      console.log(error);
      setloading(false);
    }
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
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>Search</Text>
          </View>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ alignItems: "center", paddingVertical: 10 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            You Can Search Car By Any Field
          </Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <View>
            <Text>Car Name</Text>
            <View style={styles.picker1}>
              <Picker
                selectedValue={selectedCarName}
                mode="dropdown"
                onValueChange={(itemValue, itemIndex) => {
                  setselectedCarName(itemValue);
                  getSeat(itemValue);
                }}
              >
                <Picker.Item label="Select Any" value={""} />

                {carName?.map((item: any, index: number) => (
                  <Picker.Item
                    key={index}
                    label={item?.name}
                    value={item?.id}
                  />
                ))}
              </Picker>
            </View>
          </View>
          {/* <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View>
              <Text>From District</Text>
              <SelectList
                onSelect={() => extra()}
                setSelected={setselectedFromDistrict}
                data={name}
                arrowicon={
                  <FontAwesome name="chevron-down" size={12} color={"black"} />
                }
                search={true}
                // inputStyles={styles.picker}
                boxStyles={styles.picker2} //override default styles
              />
            </View>
            <View style={{ marginLeft: 10 }}>
              <Text>From District</Text>
              <SelectList
                onSelect={() => selectedFromupazila}
                setSelected={setselectedFromupazila}
                data={fromupazila}
                arrowicon={
                  <FontAwesome name="chevron-down" size={12} color={"black"} />
                }
                search={true}
                // inputStyles={styles.picker}
                boxStyles={styles.picker2} //override default styles
              />
            </View>
          </View> */}
          <View>
            <Text>Car Seat</Text>
            <View style={styles.picker1}>
              <Picker
                selectedValue={selectedCarSeat}
                mode="dropdown"
                onValueChange={(itemValue, itemIndex) => {
                  setselectedCarSeat(itemValue);
                  // getFromupazila(itemValue);
                }}
              >
                <Picker.Item
                  label={selectedCarSeat ? `${seat}` : "Select any"}
                  value={""}
                />

                {carSeat?.map((item: any, index: number) => (
                  <Picker.Item
                    key={index}
                    label={`${item?.carSeatNumber}`}
                    value={`${item?.id}`}
                  />
                ))}
              </Picker>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
            }}
          >
            <View style={{}}>
              <Text style={{ fontSize: 14, marginBottom: 5 }}>
                Minimum Rent(Tk)
              </Text>
              <TextInput
                style={styles.input1}
                onChangeText={setminimumRent}
                value={minimumRent}
                placeholder={"From Rent"}
              />
            </View>
            <View style={{ marginLeft: 10 }}>
              <Text style={{ fontSize: 14, marginBottom: 5 }}>
                Maximum Rent(Tk)
              </Text>
              <TextInput
                style={styles.input1}
                onChangeText={setmaximumRent}
                value={maximumRent}
                placeholder={"To Rent"}
              />
            </View>
          </View>
          <View style={{ flexDirection: "row" }}>
            <View>
              <Text>From District</Text>
              <View style={styles.picker}>
                <Picker
                  selectedValue={selectedFromDistrict}
                  mode="dropdown"
                  onValueChange={(itemValue, itemIndex) => {
                    setselectedFromDistrict(itemValue);
                    getFromupazila(itemValue);
                  }}
                >
                  <Picker.Item label="Select Any" value={""} />

                  {fromdistrict?.map((item: any, index: number) => (
                    <Picker.Item
                      key={index}
                      label={item?.districtName}
                      value={item?.districtId}
                    />
                  ))}
                </Picker>
              </View>
            </View>
            <View style={{ marginLeft: 10 }}>
              <Text>To District</Text>
              <View style={styles.picker}>
                <Picker
                  selectedValue={selectedToDistrict}
                  mode="dropdown"
                  onValueChange={(itemValue, itemIndex) => {
                    setselectedToDistrict(itemValue);
                    getToupazila(itemValue);
                  }}
                >
                  <Picker.Item label="Select Any" value={""} />

                  {toDistrict?.map((item: any, index: number) => (
                    <Picker.Item
                      key={index}
                      label={item?.districtName}
                      value={item?.districtId}
                    />
                  ))}
                </Picker>
              </View>
            </View>
          </View>
          <View style={{ flexDirection: "row" }}>
            <View>
              <Text>From Upazila</Text>
              <View style={styles.picker}>
                <Picker
                  selectedValue={selectedFromupazila}
                  mode="dropdown"
                  onValueChange={(itemValue, itemIndex) => {
                    setselectedFromupazila(itemValue);
                    getFromArea(itemValue);
                  }}
                >
                  <Picker.Item label="Select Any" value={""} />

                  {fromupazila?.map((item: any, index: number) => (
                    <Picker.Item
                      key={index}
                      label={item?.upazilaName}
                      value={item?.upazilaId}
                    />
                  ))}
                </Picker>
              </View>
            </View>
            <View style={{ marginLeft: 10 }}>
              <Text>To Upazila</Text>
              <View style={styles.picker}>
                <Picker
                  selectedValue={selectedToupazila}
                  mode="dropdown"
                  onValueChange={(itemValue, itemIndex) => {
                    setselectedToUpazila(itemValue);
                    getToArea(itemValue);
                  }}
                >
                  <Picker.Item label="Select Any" value={""} />

                  {toUpazila?.map((item: any, index: number) => (
                    <Picker.Item
                      key={index}
                      label={item?.upazilaName}
                      value={item?.upazilaId}
                    />
                  ))}
                </Picker>
              </View>
            </View>
          </View>
          <View style={{ flexDirection: "row" }}>
            <View>
              <Text>From Area</Text>
              <View style={styles.picker}>
                <Picker
                  selectedValue={selectedFromArea}
                  mode="dropdown"
                  onValueChange={(itemValue, itemIndex) => {
                    setselectedFromArea(itemValue);
                  }}
                >
                  <Picker.Item label="Select Any" value={""} />

                  {fromArea?.map((item: any, index: number) => (
                    <Picker.Item
                      key={index}
                      label={item?.name}
                      value={item?.id}
                    />
                  ))}
                </Picker>
              </View>
            </View>
            <View style={{ marginLeft: 10 }}>
              <Text>To Area</Text>
              <View style={styles.picker}>
                <Picker
                  selectedValue={selectedToArea}
                  mode="dropdown"
                  onValueChange={(itemValue, itemIndex) => {
                    setselectedToArea(itemValue);
                  }}
                >
                  <Picker.Item label="Select Any" value={""} />

                  {toArea?.map((item: any, index: number) => (
                    <Picker.Item
                      key={index}
                      label={item?.name}
                      value={item?.id}
                    />
                  ))}
                </Picker>
              </View>
            </View>
          </View>
          <View style={{ alignItems: "center", marginTop: 10 }}>
            <TouchableOpacity
              onPress={() => carSearch()}
              style={styles.loginBtn}
            >
              {loading ? (
                <ActivityIndicator size={"small"} color="#fff" />
              ) : (
                <Text style={{ fontSize: 16, color: "#fff" }}>Find Car</Text>
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
  input: {
    height: 40,
    width: deviceWidth / 1.1,
    padding: 10,
    backgroundColor: "#fff",
    elevation: 5,
    borderRadius: 5,
    marginBottom: 10,
  },
  input1: {
    height: 40,
    width: deviceWidth / 2.3,
    padding: 10,
    backgroundColor: "#fff",
    elevation: 5,
    borderRadius: 5,
    marginBottom: 10,
  },
  picker: {
    height: 45,
    width: deviceWidth / 2.3,
    backgroundColor: "#fff",
    elevation: 5,
    borderRadius: 5,
    marginBottom: 10,
    justifyContent: "center",
  },
  picker2: {
    height: 45,
    width: deviceWidth / 2.3,
    backgroundColor: "#fff",
    elevation: 5,
    borderRadius: 5,
    marginBottom: 10,
    borderWidth: 0,
    alignItems: "center",
    // justifyContent: "center",
  },
  picker1: {
    height: 45,
    width: deviceWidth / 1.1,
    backgroundColor: "#fff",
    elevation: 5,
    borderRadius: 5,
    marginBottom: 10,
    justifyContent: "center",
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
