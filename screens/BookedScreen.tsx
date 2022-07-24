import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { useNavigation, useRoute } from "@react-navigation/native";
import moment from "moment";
import React, { useState } from "react";
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

//components

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

export default function UpdateProfile() {
  const navigation = useNavigation<any>();
  const scheme = useColorScheme();
  const route = useRoute();
  const { carName }: any = route.params;
  const [getNotification, setgetNotification] = useState(false);
  const [name, setname] = useState("");
  const [carSeat, setcarSeat] = useState([]);
  const [loading, setloading] = useState(false);
  const [date, setDate] = useState("");
  const [showDate, setshowDate] = useState(false);
  const [showTime, setshowTime] = useState(false);
  const [time, settime] = useState("");
  const [isActive, setisActive] = useState(false);

  console.log("..........", carName);

  //selected state
  const [selectedDistrict, setselectedDistrict] = useState("");
  const [selectedToDistrict, setselectedToDistrict] = useState("");

  const onChange = (event: any, selectedDate: any) => {
    setshowDate(false);

    const currentDate = selectedDate || date;
    setDate(currentDate);
  };
  const onChangeTime = (event: any, selectedDate: any) => {
    setshowTime(false);

    const currentDate = selectedDate || time;
    settime(currentDate);
  };

  var d = new Date().getTime();
  // var n = d.getUTCHours();

  console.log("...........fff", moment(time).format(" HH mm A"));

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
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>Booking</Text>
          </View>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ alignItems: "center", paddingVertical: 10 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            Add New Booking
          </Text>
        </View>
        <View style={{ paddingHorizontal: 20 }}>
          <View>
            <Text>Customer</Text>
            <View style={styles.picker}>
              <Picker
                selectedValue={selectedDistrict}
                mode="dropdown"
                onValueChange={(itemValue, itemIndex) => {
                  setselectedDistrict(itemValue);
                }}
              >
                <Picker.Item label="Select Customer" value={""} />

                {/* {carSeat?.map((item: any, index) => ( */}
                <Picker.Item
                  //   key={index}
                  label={`Dhaka`}
                  value={`Dhaka`}
                />
                {/* ))} */}
              </Picker>
            </View>
          </View>
          <View style={{}}>
            <Text style={{ fontSize: 14, marginBottom: 5 }}>Pick Up Phone</Text>
            <TextInput
              style={styles.input}
              onChangeText={setname}
              value={name}
              placeholder={"Phone Number"}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <View style={{ marginTop: 0 }}>
              <Text style={{ color: "#000" }}>Pick Up Date</Text>
              <View>
                <TouchableOpacity
                  onPress={() => setshowDate(true)}
                  style={styles.picker1}
                >
                  <Text
                    style={{
                      color: "#000",
                      paddingVertical: 14,
                      marginLeft: 5,
                    }}
                  >
                    {date ? moment(date).format("ll") : "Select Date"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ marginLeft: 10 }}>
              <Text style={{ color: "#000" }}>Pick Up Time</Text>
              <View>
                <TouchableOpacity
                  onPress={() => setshowTime(true)}
                  style={styles.picker1}
                >
                  <Text
                    style={{
                      color: "#000",
                      paddingVertical: 14,
                      marginLeft: 5,
                    }}
                  >
                    {time ? moment(time).format("HH mm A") : "Select Time"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={{}}>
            <Text style={{ fontSize: 14, marginBottom: 5 }}>Address</Text>
            <TextInput
              style={styles.input1}
              onChangeText={setname}
              value={name}
              placeholder={"Enter Address"}
              numberOfLines={4}
            />
          </View>
          <View style={{}}>
            <Text style={{ fontSize: 14, marginBottom: 5 }}>Note</Text>
            <TextInput
              style={styles.input1}
              onChangeText={setname}
              value={name}
              placeholder={"Write Something"}
              numberOfLines={4}
            />
          </View>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {!isActive ? (
              <MaterialCommunityIcons
                onPress={() => setisActive(true)}
                name="checkbox-blank-outline"
                size={20}
              />
            ) : (
              <MaterialCommunityIcons
                onPress={() => setisActive(false)}
                name="checkbox-marked"
                size={20}
              />
            )}
            <Text style={{ fontSize: 16, marginLeft: 5 }}>Round Trip</Text>
          </View>

          <View style={{ alignItems: "center", marginTop: 10 }}>
            <TouchableOpacity style={styles.loginBtn}>
              {loading ? (
                <ActivityIndicator size={"small"} color="#fff" />
              ) : (
                <Text style={{ fontSize: 16, color: "#fff" }}>New Booking</Text>
              )}
            </TouchableOpacity>
          </View>
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
        {showTime ? (
          <DateTimePicker
            testID="dateTimePicker"
            value={new Date()}
            mode="time"
            is24Hour={true}
            display="default"
            onChange={onChangeTime}
          />
        ) : null}
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
    height: 80,
    width: deviceWidth / 1.1,
    padding: 10,
    backgroundColor: "#fff",
    elevation: 5,
    borderRadius: 5,
    marginBottom: 10,
  },
  picker: {
    height: 45,
    width: deviceWidth / 1.1,
    backgroundColor: "#fff",
    elevation: 5,
    borderRadius: 5,
    marginBottom: 10,
    justifyContent: "center",
  },
  picker1: {
    height: 45,
    width: deviceWidth / 2.3,
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
