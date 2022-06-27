import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import * as SecureStore from "expo-secure-store";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from "react-native";
import { showMessage } from "react-native-flash-message";
import { TouchableOpacity } from "react-native-gesture-handler";
// import { SafeAreaView } from "react-native-safe-area-context";
//services
import RegisterService from "../services/RegisterService";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

export default function LoginScreen() {
  const navigation = useNavigation<any>();
  const scheme = useColorScheme();

  const [email, setemail] = useState("");
  const [passWord, setpassWord] = useState("");
  const [loading, setloading] = useState(false);
  const [isOtpLogin, setIsOtpLogin] = useState(false);
  const [isSubmitForOtp, setIsSubmitForOtp] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [hidePass, setHidePass] = useState(true);
  const [profile, setprofile] = useState({});

  //get token for notification about

  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  async function registerForPushNotificationsAsync() {
    let token;
    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    return token;
  }

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );
    console.log("........toke....", expoPushToken);

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  const loginWithPass = async () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

    setloading(true);
    const data = {
      email: email.trim(),
      password: passWord,
      device_token: expoPushToken,
    };

    console.log("...........data", data);

    if (passWord.length >= 8 && reg.test(email)) {
      try {
        let res = await RegisterService.loginWithPassword(data);
        console.log(".........", res);

        if (res?.status === true) {
          showMessage({
            message: `${res.message}`,
            type: "success",
          });
          setloading(false);
          // setIsOtpLogin(false);
          // setIsSubmitForOtp(false);
          setemail("");
          setpassWord("");
          setOtpCode("");
          setprofile(res?.data?.user);
          SecureStore.setItemAsync("token", res?.data?.access_token);
          navigation.navigate("TabNav");
        } else {
          showMessage({
            message: `${res.errors.login}`,
            type: "warning",
          });
          setloading(false);
        }
      } catch (error: any) {
        showMessage({
          message: `${error}`,
          type: "warning",
        });
        setloading(false);
      }
    } else {
      showMessage({
        message: `Enter Valid Email & password`,
        type: "warning",
      });
      setloading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={`black`} />
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.headerContainer}>
          <Image style={styles.img} source={require("../assets/car/car.png")} />
          <Text style={{ fontSize: 20, color: "#fff" }}>Car Rental</Text>
        </View>
        <View style={{ alignItems: "center", paddingVertical: 20 }}>
          <Text
            style={{
              fontSize: 22,
              color: `${scheme === "dark" ? "#fff" : "#000"}`,
              fontWeight: "bold",
            }}
          >
            Login
          </Text>
        </View>

        <View>
          <View style={{ alignItems: "center" }}>
            {isSubmitForOtp ? (
              <View style={{ elevation: 5 }}>
                <View style={styles.input1}>
                  <TextInput
                    // style={styles.input}

                    onChangeText={setOtpCode}
                    value={otpCode}
                    placeholder={"Enter OTP"}
                  />
                </View>
              </View>
            ) : (
              <View style={styles.input1}>
                <TextInput
                  style={{ width: deviceWidth / 1.5 }}
                  onChangeText={setemail}
                  value={email}
                  placeholder={isOtpLogin ? "Phone" : "Mail / Phone"}
                />
              </View>
            )}

            {isOtpLogin ? null : (
              <View style={styles.input1}>
                <TextInput
                  style={{ width: deviceWidth / 1.5 }}
                  onChangeText={setpassWord}
                  value={passWord}
                  placeholder="Password"
                  secureTextEntry={hidePass ? true : false}
                />
                <FontAwesome
                  style={{ width: 20, paddingVertical: 8 }}
                  name={hidePass ? "eye-slash" : "eye"}
                  size={18}
                  color="grey"
                  onPress={() => setHidePass(!hidePass)}
                />
              </View>
            )}
          </View>
          {isOtpLogin ? (
            <View style={{ alignItems: "center", margin: 12 }}>
              <TouchableOpacity
                style={styles.loginBtn}
                // onPress={() =>
                //   isSubmitForOtp ? submitOtp() : submitPhoneForOtp()
                // }
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
              paddingHorizontal: 40,
            }}
          >
            {isOtpLogin ? (
              <TouchableOpacity
                style={{ alignItems: "center", paddingVertical: 5 }}
                onPress={() => setIsOtpLogin(false)}
              >
                <Text
                  style={[
                    styles.title,
                    { color: `${scheme === "dark" ? "#fff" : "#000"}` },
                  ]}
                >
                  Login with Password
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={{ alignItems: "center", paddingVertical: 5 }}
                onPress={() => setIsOtpLogin(true)}
              >
                <Text
                  style={[
                    styles.title,
                    { color: `${scheme === "dark" ? "#fff" : "#000"}` },
                  ]}
                >
                  Login with OTP
                </Text>
              </TouchableOpacity>
            )}
            {isOtpLogin && isSubmitForOtp ? null : (
              <TouchableOpacity
                style={{ alignItems: "center", paddingVertical: 5 }}
              >
                <Text style={[styles.title, { color: `red` }]}>
                  Forgot Password?
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </SafeAreaView>
      <View style={styles.signUpSection}>
        <Text
          style={[
            styles.title,
            { color: `${scheme === "dark" ? "#fff" : "#000"}`, paddingTop: 10 },
          ]}
        >
          Don't have an account?{" "}
          <Text
            style={{
              color: `${scheme === "dark" ? "#004C3F" : "#004C3F"}`,
              fontWeight: "bold",
              fontSize: 15,
            }}
            onPress={() => navigation.navigate("SignupScreen")}
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
    position: "relative",
  },
  img: {
    width: deviceWidth / 4.5,
    height: deviceWidth / 4.5,
    marginBottom: 10,
    borderWidth: 0.5,
    // borderColor: "#FF9411",
    alignItems: "center",
  },
  headerContainer: {
    backgroundColor: "#004C3F",
    width: deviceWidth,
    alignItems: "center",
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    paddingVertical: 40,
  },
  title: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "bold",
  },
  input: {
    height: 50,
    width: deviceWidth / 1.2,
    margin: 12,
    // borderBottomWidth: 1,
    padding: 10,
    // borderBottomColor: "#1234",
    // borderRadius:5,
    backgroundColor: "#fff",
  },
  loginBtn: {
    backgroundColor: `#004C3F`,
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
  input1: {
    height: 55,
    width: deviceWidth / 1.2,
    margin: 12,
    padding: 10,
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    elevation: 5,
    borderRadius: 5,
  },
});
