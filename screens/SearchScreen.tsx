import { AntDesign } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
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
  const [getNotification, setgetNotification] = useState(false);
  const [name, setname] = useState("");
  const [carSeat, setcarSeat] = useState([]);
  const [loading, setloading] = useState(false);

  //selected state
  const [selectedDistrict, setselectedDistrict] = useState("");
  const [selectedToDistrict, setselectedToDistrict] = useState("");

  const district = [
    {
      id: 1,
      fromDistrict: "Dhaka",
    },
    {
      id: 2,
      fromDistrict: "Tangail",
    },
    {
      id: 3,
      fromDistrict: "Ghatail",
      toDis: [
        {
          id: 1,
          toDistrict: "dhaka4",
        },
        {
          id: 2,
          toDistrict: "dhaka5",
        },
        {
          id: 3,
          toDistrict: "dhaka6",
        },
      ],
    },
    {
      id: 4,
      fromDistrict: "Sunotia",
    },
    {
      id: 5,
      fromDistrict: "Fulhara",
    },
    {
      id: 6,
      fromDistrict: "Fulhara1",
      toDis: [
        {
          id: 1,
          toDistrict: "dhaka1",
        },
        {
          id: 2,
          toDistrict: "dhaka2",
        },
        {
          id: 3,
          toDistrict: "dhaka3",
        },
      ],
    },
    {
      id: 7,
      fromDistrict: "Fulhara2",
    },
  ];

  const getToDistrict = (id: any) => {
    let index = district.findIndex((e) => e.id == id);
    // console.log(".........index", index);
    setcarSeat(district[index]?.toDis);
  };

  // console.log("............children", carSeat);

  //   console.log("............", selectedDistrict);

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
          <View style={{}}>
            <Text style={{ fontSize: 14, marginBottom: 5 }}>Car Name</Text>
            <TextInput
              style={styles.input}
              onChangeText={setname}
              value={name}
              placeholder={"Car Name"}
            />
          </View>
          <View style={{}}>
            <Text style={{ fontSize: 14, marginBottom: 5 }}>Car Brand</Text>
            <TextInput
              style={styles.input}
              onChangeText={setname}
              value={name}
              placeholder={"Car Brand"}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <View style={{}}>
              <Text style={{ fontSize: 14, marginBottom: 5 }}>Car Seat</Text>
              <TextInput
                style={styles.input1}
                onChangeText={setname}
                value={name}
                placeholder={"Car Seat"}
              />
            </View>
            <View style={{ marginLeft: 10 }}>
              <Text style={{ fontSize: 14, marginBottom: 5 }}>Car Rent</Text>
              <TextInput
                style={styles.input1}
                onChangeText={setname}
                value={name}
                placeholder={"Car Rent"}
              />
            </View>
          </View>
          <View style={{ flexDirection: "row" }}>
            <View>
              <Text>From District</Text>
              <View style={styles.picker}>
                <Picker
                  selectedValue={selectedDistrict}
                  mode="dropdown"
                  onValueChange={(itemValue, itemIndex) => {
                    setselectedDistrict(itemValue);
                    getToDistrict(itemValue);
                  }}
                >
                  <Picker.Item label="Select Any" value={""} />

                  {district?.map((item: any, index) => (
                    <Picker.Item
                      key={index}
                      label={`${item?.fromDistrict}`}
                      value={`${item?.id}`}
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
                  }}
                >
                  <Picker.Item label="Select Any" value={""} />

                  {carSeat?.map((item: any, index) => (
                    <Picker.Item
                      key={index}
                      label={`${item?.toDistrict}`}
                      value={`${item?.id}`}
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
                  selectedValue={selectedDistrict}
                  mode="dropdown"
                  onValueChange={(itemValue, itemIndex) => {
                    setselectedDistrict(itemValue);
                  }}
                >
                  <Picker.Item label="Select Any" value={""} />

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
            <View style={{ marginLeft: 10 }}>
              <Text>To Upazila</Text>
              <View style={styles.picker}>
                <Picker
                  selectedValue={selectedDistrict}
                  mode="dropdown"
                  onValueChange={(itemValue, itemIndex) => {
                    setselectedDistrict(itemValue);
                  }}
                >
                  <Picker.Item label="Select Any" value={""} />

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
          </View>
          <View style={{ flexDirection: "row" }}>
            <View>
              <Text>From Area</Text>
              <View style={styles.picker}>
                <Picker
                  selectedValue={selectedDistrict}
                  mode="dropdown"
                  onValueChange={(itemValue, itemIndex) => {
                    setselectedDistrict(itemValue);
                  }}
                >
                  <Picker.Item label="Select Any" value={""} />

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
            <View style={{ marginLeft: 10 }}>
              <Text>To Area</Text>
              <View style={styles.picker}>
                <Picker
                  selectedValue={selectedDistrict}
                  mode="dropdown"
                  onValueChange={(itemValue, itemIndex) => {
                    setselectedDistrict(itemValue);
                  }}
                >
                  <Picker.Item label="Select Any" value={""} />

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
          </View>
          <View style={{ alignItems: "center", marginTop: 10 }}>
            <TouchableOpacity style={styles.loginBtn}>
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
