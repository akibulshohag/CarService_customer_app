import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useRef } from "react";
import {
  Dimensions,
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

  // const find_dimesions = (width: any, height: any) => {
  //   const deviceHeight = Dimensions.get("window").height;
  //   const deviceWidth = Dimensions.get("window").width;
  //   console.log(" view width:" + width + "  " + "view height:" + height);
  //   console.log(
  //     "device width:" + deviceWidth + "  " + " device height:" + deviceHeight
  //   );
  // };

  const scroll = useRef();
  const goToTop = () => {
    scroll.current.scrollTo({ x: 0, y: 0, animated: true });
  };

  // console.log(".........scroll", scroll);

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
              width: deviceWidth / 1.2,
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              Terms and Conditions
            </Text>
          </View>
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        // onContentSizeChange={(width, height) => {
        //   find_dimesions(width, height);
        // }}
        // onScrollToTop={() => scroll}
        ref={scroll}
      >
        <View style={{ paddingHorizontal: 20, paddingVertical: 15 }}>
          <Text style={{ fontSize: 22, fontWeight: "bold", color: "#000" }}>
            Company Policies
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: "#000",
              textAlign: "justify",
              lineHeight: 25,
            }}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit esse
            odio nihil et modi ipsam reprehenderit fugiat asperiores nam,
            perferendis cumque nesciunt, nostrum at sunt dolores, accusamus
            corporis ad ut dolore soluta voluptate error. Sint hic ipsum,
            tempore pariatur assumenda soluta! Repudiandae modi voluptate,
            accusamus ullam nulla porro labore fugit quas ratione tenetur,
            consequuntur facere, eos ut. Veritatis assumenda ipsa doloremque quo
            rerum, saepe amet non? Laudantium autem aliquid nostrum tempora qui
            adipisci eos id, inventore consequuntur possimus excepturi
            perferendis laboriosam cum doloremque non assumenda voluptatem
            voluptates harum ducimus? Recusandae, enim quia eligendi corrupti
            cumque molestias placeat debitis eius perferendiss.
          </Text>
        </View>
        <View style={{ paddingHorizontal: 20, paddingVertical: 15 }}>
          <Text style={{ fontSize: 22, fontWeight: "bold", color: "#000" }}>
            Terms Of Use
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: "#000",
              textAlign: "justify",
              lineHeight: 25,
            }}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit esse
            odio nihil et modi ipsam reprehenderit fugiat asperiores nam,
            perferendis cumque nesciunt, nostrum at sunt dolores, accusamus
            corporis ad ut dolore soluta voluptate error. Sint hic ipsum,
            tempore pariatur assumenda soluta! Repudiandae modi voluptate,
            accusamus ullam nulla porro labore fugit quas ratione tenetur,
            consequuntur facere, eos ut. Veritatis assumenda ipsa doloremque quo
            rerum, saepe amet non? Laudantium autem aliquid nostrum tempora qui
            adipisci eos id, inventore consequuntur possimus excepturi
            perferendis laboriosam cum doloremque non assumenda voluptatem
            voluptates harum ducimus? Recusandae, enim quia eligendi corrupti
            cumque molestias placeat debitis eius perferendis.
          </Text>
        </View>

        <TouchableOpacity
          style={{ paddingVertical: 15, paddingHorizontal: 20 }}
          onPress={() => goToTop()}
        >
          <Text style={{ fontSize: 18, fontWeight: "600" }}>Go To Top</Text>
        </TouchableOpacity>
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
});
