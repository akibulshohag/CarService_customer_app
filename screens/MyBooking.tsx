import { AntDesign } from "@expo/vector-icons";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";
import BookingService from "../services/BookingService";

//components
import MyBooking from "../components/MyBooking";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

export default function HomeScreen() {
  const navigation = useNavigation<any>();
  const scheme = useColorScheme();
  const isFocused = useIsFocused();
  const [customerId, setcustomerId] = useState("");
  const [open, setOpen] = useState("123456789asdfgh");
  const [bookingList, setbookingList] = useState([]);

  useEffect(() => {
    SecureStore.getItemAsync("customerId").then((res) => {
      if (res) {
        setcustomerId(res);
      }
    });
  }, [isFocused]);
  useEffect(() => {
    BookingService.bookingList(customerId).then((res) => {
      console.log("...............dd", res?.data);
      setbookingList(res?.data);
    });
  }, [customerId, isFocused]);

  const renderItem = ({ item, index }: any) => {
    return (
      <View
        key={index}
        style={{
          marginBottom: 10,
          // elevation: 5,
        }}
      >
        <MyBooking bookingList={item} />
      </View>
    );
  };

  const loadMoreItem = () => {};
  return (
    <View style={styles.container}>
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
            My Booking
          </Text>
        </View>
      </View>

      {/* <View
        style={{
          paddingHorizontal: 15,
          paddingVertical: 5,
          marginBottom: 50,
        }}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          {Array.apply(null, { length: 10 }).map((item: any, index: number) => (
            <View
              key={index}
              style={{
                paddingVertical: 5,
                paddingHorizontal: 5,
              }}
            >
              <AvailableCar />
            </View>
          ))}
        </ScrollView>
      </View> */}
      {bookingList?.length > 0 ? (
        <FlatList
          data={bookingList}
          contentContainerStyle={styles.CardContainer}
          renderItem={renderItem}
          // keyExtractor={(item) => item.id}
          // ListFooterComponent={renderLoader}
          onEndReached={loadMoreItem}
          onEndReachedThreshold={0}
        />
      ) : (
        <View style={{ alignItems: "center", marginTop: deviceHeight / 2.5 }}>
          <Text style={{ fontSize: 16, color: "red" }}>No booking yet</Text>
        </View>
      )}
    </View>
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
    // alignItems: "center",
  },
  CardContainer: {
    // paddingHorizontal: 5,
    paddingVertical: 10,
    alignItems: "center",
    // backgroundColor: "red",
  },
});
