import { useNavigation } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import React, { useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { showMessage } from "react-native-flash-message";
import Modal from "react-native-modal";

const deviceWidth = Dimensions.get("window").width;

export default function ModalScreen({ setModalOpen, ModalOpen }: any) {
  const navigation = useNavigation<any>();

  const [Token, setToken] = useState("");

  const logOut = async () => {
    let token = await SecureStore.deleteItemAsync("token");
    setToken("");

    if (token == null) {
      showMessage({
        message: `Log Out Successfully`,
        type: "success",
      });
      setModalOpen(false);
      navigation.navigate("LoginScreen");
    }
  };

  return (
    <View style={styles.container}>
      <Modal isVisible={ModalOpen} style={{ alignItems: "center" }}>
        <View style={styles.modal}>
          <View style={{ alignItems: "center", paddingVertical: 20 }}>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              Are You Sure You Want To Logout?
            </Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity
              activeOpacity={0.3}
              onPress={() => setModalOpen(false)}
              style={styles.loginBtn}
            >
              <Text style={{ fontSize: 16, color: "#fff" }}>Cancel</Text>
            </TouchableOpacity>
            <View style={styles.border}></View>
            <TouchableOpacity
              activeOpacity={0.3}
              onPress={() => logOut()}
              style={styles.loginBtn1}
            >
              <Text style={{ fontSize: 16, color: "#fff" }}>Logout</Text>
            </TouchableOpacity>
          </View>
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
    borderRadius: 5,
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
