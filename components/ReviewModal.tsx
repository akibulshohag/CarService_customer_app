import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { Rating } from "react-native-ratings";

import Modal from "react-native-modal";

const deviceWidth = Dimensions.get("window").width;

export default function ModalScreen({ setModalOpen, ModalOpen }: any) {
  const navigation = useNavigation<any>();
  const [count, setcount] = useState("");

  const ratingCompleted = (rating: any) => {
    //   setcount(count);
    console.log("Rating is--: " + rating);
  };

  return (
    <View style={styles.container}>
      <Modal isVisible={ModalOpen} style={{ alignItems: "center" }}>
        <View style={styles.modal}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 20,
              paddingVertical: 10,
            }}
          >
            <Image
              style={styles.img}
              source={require("../assets/car/carraod.jpg")}
            ></Image>

            <View
              style={{
                marginLeft: 10,
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                Cristiano Ronaldo
              </Text>
              <Text style={{ color: "#1239" }}>akib021@gmail.com</Text>
            </View>
          </View>
          <View style={{ paddingHorizontal: 20, paddingVertical: 5 }}>
            <View
              style={{
                borderBottomWidth: 0.5,
                borderBottomColor: "#1239",
              }}
            ></View>
          </View>

          <Rating
            ratingCount={5}
            onFinishRating={(ra: number) => ratingCompleted(ra)}
            style={{ paddingVertical: 10 }}
          />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modal: {
    width: deviceWidth / 1.1,
    backgroundColor: "#fff",
    borderRadius: 2,
  },
  img: {
    width: 40,
    height: 40,
    resizeMode: "contain",
    borderWidth: 0.01,
    borderRadius: 100,
  },
  loginBtn: {
    backgroundColor: `#004C3F`,
    padding: 15,
    width: deviceWidth / 2.2,
    alignItems: "center",
    justifyContent: "center",
    borderBottomLeftRadius: 5,
  },
  loginBtn1: {
    backgroundColor: `#004C3F`,
    padding: 15,
    width: deviceWidth / 2.2,
    alignItems: "center",
    justifyContent: "center",
    borderBottomRightRadius: 5,
  },
  border: {
    borderLeftWidth: 1.5,
  },
});
function ratingCompleted(rating: any) {
  throw new Error("Function not implemented.");
}
