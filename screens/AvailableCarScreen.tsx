import { AntDesign } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import {
  Dimensions,
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";

//components
import AvailableCar from "../components/AvailableCar";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

export default function HomeScreen(props: any) {
  const navigation = useNavigation<any>();
  const scheme = useColorScheme();
  const route = useRoute();
  const { carList }: any = route.params;

  const renderItem = ({ item, index }: any) => {
    return (
      <View
        key={index}
        style={{
          marginBottom: 10,
          // elevation: 5,
        }}
      >
        <AvailableCar carList={item} />
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
            Available Cars
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
      <FlatList
        data={carList}
        contentContainerStyle={styles.CardContainer}
        renderItem={renderItem}
        // keyExtractor={(item) => item.id}
        // ListFooterComponent={renderLoader}
        onEndReached={loadMoreItem}
        onEndReachedThreshold={0}
      />
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
  },
  CardContainer: {
    // paddingHorizontal: 5,
    paddingVertical: 10,
    alignItems: "center",
    // backgroundColor: "red",
  },
});
