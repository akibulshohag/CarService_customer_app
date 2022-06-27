import { AntDesign, Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
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
              Notification
            </Text>
          </View>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {!getNotification ? (
          <View style={{ paddingVertical: 15, alignItems: "center" }}>
            {Array.apply(null, { length: 8 }).map(
              (item: any, index: number) => (
                <View key={index} style={styles.card}>
                  <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                    Success
                  </Text>
                  <Text style={{ fontSize: 16, width: deviceWidth / 1.3 }}>
                    New hot deals for you. Check it now and book your favorite
                    car with lowest price
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginTop: 5,
                    }}
                  >
                    <Entypo name="clock" size={15} color="#004C3F" />
                    <Text style={{ marginLeft: 5 }}>12-06-17</Text>
                  </View>
                </View>
              )
            )}
          </View>
        ) : (
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              paddingTop: deviceHeight / 3,
            }}
          >
            <Entypo name="bell" size={25} color={"#1239"} />
            <Text style={{ color: "#1239" }}>No Notification Yet</Text>
          </View>
        )}
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
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
});
