import { useNavigation } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import { useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { showMessage } from "react-native-flash-message";
import { TouchableOpacity } from "react-native-gesture-handler";
// service
import LoginService from "../services/LoginService";
import config from "../utils/config";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

export default function TabTwoScreen() {
  const navigation = useNavigation<any>();

  const [email, setemail] = useState("");
  const [passWord, setpassWord] = useState("");
  const [loading, setloading] = useState(false);
  const [isOtpLogin, setIsOtpLogin] = useState(false);
  const [isSubmitForOtp, setIsSubmitForOtp] = useState(false);
  const [otpCode, setOtpCode] = useState("");

  // const loginSubmit = async ()=>{
  //   setloading(true)
  //   const data  ={
  //     email:email,
  //     password:passWord
  //   }
  //   if(data?.email && data?.password){
  //     LoginService.Login(data).then(res=>{
  //       if(res?.success){
  //         // SecureStore.setItemAsync('accessToken',res?.data?.token);

  //         SecureStore.setItemAsync('userId',res?.data?._id);
  //           showMessage({
  //               message: `${res.message}`,
  //               type: "success",
  //             });
  //             setloading(false)
  //             navigation.navigate('HomeScreen')
  //       }
  //   }).catch(err=>{
  //       showMessage({
  //           message: `${err.message}`,
  //           type: "danger",
  //         });
  //         setloading(false)
  //   })
  //   }else{
  //     showMessage({
  //       message: `Email & Password Required !`,
  //       type: "danger",
  //     });
  //     setloading(false)
  //   }

  // }

  const submitPhoneForOtp = async () => {
    setloading(true);
    const data = {
      phone: email,
    };

    try {
      let res = await LoginService.SubmitPhoneForOtp(data);
      if (res?.success) {
        showMessage({
          message: `${res.message}`,
          type: "success",
        });
        setIsSubmitForOtp(true);
        setloading(false);
      }
    } catch (error) {
      showMessage({
        message: `${error.message}`,
        type: "warning",
      });
      setloading(false);
    }
  };

  const submitOtp = async () => {
    const data = {
      phone: email,
      otp: otpCode,
    };

    try {
      let res = await LoginService.LoginWithOtp(data);
      if (res?.success) {
        showMessage({
          message: `${res.message}`,
          type: "success",
        });

        setloading(false);
        setIsOtpLogin(false);
        setIsSubmitForOtp(false);
        setemail("");
        setpassWord("");
        setOtpCode("");
        navigation.navigate("Home");
      }
    } catch (error) {
      showMessage({
        message: `${error.message}`,
        type: "warning",
      });
      setloading(false);
    }
  };

  const loginWithPass = async () => {
    setloading(true);
    const data = {
      value: email.trim(),
      password: passWord,
    };

    if (passWord.length >= 6) {
      try {
        let res = await LoginService.Login(data);

        if (res?.success) {
          showMessage({
            message: `${res.message}`,
            type: "success",
          });
          //  console.log('...............res',res?.data?.token);

          setloading(false);
          setIsOtpLogin(false);
          setIsSubmitForOtp(false);
          setemail("");
          setpassWord("");
          setOtpCode("");
          SecureStore.setItemAsync("token", res?.data?.token);
          navigation.navigate("Home");
        }
      } catch (error: any) {
        showMessage({
          message: `${error.message}`,
          type: "warning",
        });
        setloading(false);
      }
    } else {
      showMessage({
        message: `Password Should Be Minimum 6 Characters!`,
        type: "warning",
      });
      setloading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={`${config?.brandColor}`} />
      <SafeAreaView>
        <View
          style={{
            borderTopColor: "#fff",
            alignItems: "center",
            marginBottom: 50,
          }}
        >
          <Text style={[styles.title, { color: "#000", fontSize: 25 }]}>
            Welcome Back
          </Text>
          <Text style={[styles.title, { color: "#1239" }]}>
            Login to Your Account
          </Text>
        </View>

        <View>
          {isSubmitForOtp ? (
            <TextInput
              style={styles.input}
              onChangeText={setOtpCode}
              value={otpCode}
              placeholder={"Enter OTP"}
            />
          ) : (
            <TextInput
              style={styles.input}
              onChangeText={setemail}
              value={email}
              placeholder={isOtpLogin ? "Phone" : "Mail / Phone"}
            />
          )}

          {isOtpLogin ? null : (
            <TextInput
              style={styles.input}
              onChangeText={setpassWord}
              value={passWord}
              placeholder="Password"
              secureTextEntry={true}
            />
          )}
        </View>
        {isOtpLogin ? (
          <View style={{ alignItems: "center", margin: 12 }}>
            <TouchableOpacity
              style={styles.loginBtn}
              onPress={() =>
                isSubmitForOtp ? submitOtp() : submitPhoneForOtp()
              }
            >
              <Text style={[styles.title, { fontSize: 16 }]}>
                {isSubmitForOtp ? "Submit" : "Send"}
              </Text>
              {loading ? (
                <ActivityIndicator
                  style={{ marginLeft: 5 }}
                  size="small"
                  color="#FFF"
                />
              ) : null}
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{ alignItems: "center", margin: 12 }}>
            <TouchableOpacity
              style={styles.loginBtn}
              onPress={() => loginWithPass()}
            >
              {loading ? (
                <ActivityIndicator size={"small"} color="#fff" />
              ) : (
                <Text style={[styles.title, { fontSize: 16 }]}>Login</Text>
              )}
            </TouchableOpacity>
          </View>
        )}

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 10,
          }}
        >
          {isOtpLogin ? (
            <TouchableOpacity
              style={{ alignItems: "center", paddingVertical: 20 }}
              onPress={() => setIsOtpLogin(false)}
            >
              <Text style={[styles.title, { color: `${config?.brandColor}` }]}>
                Login with Password
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={{ alignItems: "center", paddingVertical: 20 }}
              onPress={() => setIsOtpLogin(true)}
            >
              <Text style={[styles.title, { color: `${config?.brandColor}` }]}>
                Login with OTP
              </Text>
            </TouchableOpacity>
          )}
          {isOtpLogin && isSubmitForOtp ? null : (
            <TouchableOpacity
              style={{ alignItems: "center", paddingVertical: 20 }}
            >
              <Text style={[styles.title, { color: `${config?.brandColor}` }]}>
                Forgot Password?
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>
      <View style={styles.signUpSection}>
        <Text style={[styles.title, { color: "#1239", paddingTop: 10 }]}>
          Don't have an account?{" "}
          <Text
            style={{ color: `${config?.brandColor}`, fontWeight: "bold" }}
            onPress={() => navigation.navigate("SignUpScreen")}
          >
            {" "}
            Sign Up
          </Text>
        </Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
    paddingTop: deviceHeight / 5,
    position: "relative",
  },
  title: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "bold",
  },
  input: {
    height: 40,
    width: deviceWidth / 1.2,
    margin: 12,
    borderBottomWidth: 1,
    padding: 10,
    borderBottomColor: "#1234",
    // borderRadius:5,
    backgroundColor: "#fff",
  },
  loginBtn: {
    backgroundColor: `${config?.brandColor}`,
    padding: 10,
    width: deviceWidth / 1.2,
    borderRadius: 5,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  signUpSection: {
    alignItems: "center",
    position: "absolute",
    bottom: 10,
    borderTopColor: "#1234",
    borderTopWidth: 1,
    width: deviceWidth,
  },
});

// swipedelete

import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { FlatList, useColorScheme } from "react-native";
import { Swipeable } from "react-native-gesture-handler";

//components
import AvailableCar from "../components/AvailableCar";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

export default function HomeScreen(props: any) {
  const navigation = useNavigation<any>();
  const scheme = useColorScheme();

  const [city, setcity] = useState("Inside City");
  const [showDate, setshowDate] = useState(false);
  const [date, setDate] = useState("");
  const [loading, setloading] = useState(false);
  const [datee, setDatee] = useState(new Date());
  const [open, setOpen] = useState("20ddddddddddd");

  const onChange = (event: any, selectedDate: any) => {
    setshowDate(false);

    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  const deleteItem = (index: number) => {
    const arr = [...open];
    arr.splice(index, 1);
    // console.log(".........index", index);
    // console.log("........", open);
  };
  const renderItem = ({ item, index }: any) => {
    const rightSwipe = (progress, dragX) => {
      const scale = dragX.interpolate({
        inputRange: [0, 100],
        outputRange: [0, 1],
      });
      return (
        <TouchableOpacity activeOpacity={0.5} onPress={() => deleteItem(index)}>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "red",
              width: 50,
              height: 190,
              marginLeft: 10,
            }}
          >
            {/* <Animated.Text
            style={{ transform: [{ scale: scale }], fontSize: 25 }}
          > */}
            <MaterialCommunityIcons name="delete" size={40} color={"#fff"} />
            {/* </Animated.Text> */}
          </View>
        </TouchableOpacity>
      );
    };

    return (
      <Swipeable renderRightActions={rightSwipe}>
        <View
          key={index}
          style={{
            marginBottom: 10,
            // elevation: 5,
          }}
        >
          <AvailableCar />
        </View>
      </Swipeable>
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
            onPress={() => navigation.navigate("HomeScreen")}
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
        data={open}
        contentContainerStyle={styles.CardContainer}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
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
