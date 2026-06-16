import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ScrollView,
  StatusBar,
  Image,
  Alert,
} from "react-native";
import { router } from "expo-router";
import {
  existsEmail,
  sendPasswordResetCode,
  verifyPasswordResetCode,
  resetPassword,
} from "../src/api/authApi";

export default function FindPasswordScreen() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordCheck, setNewPasswordCheck] = useState("");
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    if (timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const formatTimer = (seconds: number) => {
    const min = String(Math.floor(seconds / 60)).padStart(2, "0");
    const sec = String(seconds % 60).padStart(2, "0");
    return `${min}:${sec}`;
  };

  const handleEmailChange = (text: string) => {
    setEmail(text);
    setTimer(0);
  };

  const handleSendCode = async () => {
    if (!email) {
      Alert.alert("알림", "이메일을 입력해주세요.");
      return;
    }

    try {
      const exists = await existsEmail(email);

      if (!exists) {
        Alert.alert("가입 정보 없음", "가입되지 않은 이메일입니다.", [
          {
            text: "회원가입",
            onPress: () => router.push("/signup"),
          },
          {
            text: "확인",
            style: "cancel",
          },
        ]);
        return;
      }

      const result = await sendPasswordResetCode(email);
      setTimer(300);

      Alert.alert("성공", result || "인증번호가 발송되었습니다.");
    } catch (error: any) {
      Alert.alert(
        "발송 실패",
        error.response?.data || "인증번호 발송에 실패했습니다."
      );
    }
  };

  const handleVerifyCode = async () => {
    if (!email || !code) {
      Alert.alert("알림", "이메일과 인증번호를 입력해주세요.");
      return;
    }

    if (timer <= 0) {
      Alert.alert("알림", "인증 시간이 만료되었습니다. 인증번호를 다시 발송해주세요.");
      return;
    }

    try {
      const result = await verifyPasswordResetCode(email, code);
      setTimer(0);
      Alert.alert("성공", result || "인증번호가 확인되었습니다.");
    } catch (error: any) {
      Alert.alert(
        "인증 실패",
        error.response?.data || "인증번호를 확인해주세요."
      );
    }
  };

  const handleResetPassword = async () => {
    if (!email || !newPassword || !newPasswordCheck) {
      Alert.alert("알림", "필수 정보를 모두 입력해주세요.");
      return;
    }

    if (newPassword !== newPasswordCheck) {
      Alert.alert("오류", "비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const result = await resetPassword({
        email,
        newPassword,
      });

      Alert.alert("성공", result || "비밀번호가 변경되었습니다.", [
        {
          text: "확인",
          onPress: () => router.replace("/"),
        },
      ]);
    } catch (error: any) {
      Alert.alert(
        "변경 실패",
        error.response?.data || "비밀번호 변경에 실패했습니다."
      );
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />

      <Image
        source={require("../assets/images/signup-hero.png")}
        style={styles.backgroundImage}
        resizeMode="cover"
      />

      <View style={styles.overlay} />

      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.logoArea}>
          <Text style={styles.logo}>비밀번호 찾기</Text>
          <Text style={styles.logoSub}>
            이메일 인증 후 새 비밀번호를 설정해주세요
          </Text>
        </View>

        <Text style={styles.label}>이메일</Text>
        <View style={styles.row}>
          <View style={[styles.inputWrap, styles.rowInput]}>
            <Text style={styles.inputIcon}>✉</Text>
            <TextInput
              style={styles.input}
              placeholder="이메일 주소"
              placeholderTextColor="#B0A090"
              value={email}
              onChangeText={handleEmailChange}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <Pressable style={styles.smallButton} onPress={handleSendCode}>
            <Text style={styles.smallButtonText}>발송</Text>
          </Pressable>
        </View>

        <Text style={styles.label}>인증번호</Text>
        <View style={styles.row}>
          <View style={[styles.inputWrap, styles.rowInput]}>
            <Text style={styles.inputIcon}>#</Text>
            <TextInput
              style={styles.input}
              placeholder="인증번호 입력"
              placeholderTextColor="#B0A090"
              value={code}
              onChangeText={setCode}
              keyboardType="number-pad"
            />
          </View>

          <Pressable style={styles.smallButton} onPress={handleVerifyCode}>
            <Text style={styles.smallButtonText}>확인</Text>
          </Pressable>
        </View>

        {timer > 0 && (
          <Text style={styles.timerText}>
            인증번호 남은 시간 {formatTimer(timer)}
          </Text>
        )}

        <Text style={styles.label}>새 비밀번호</Text>
        <View style={styles.inputWrap}>
          <Text style={styles.inputIcon}>🔒</Text>
          <TextInput
            style={styles.input}
            placeholder="새 비밀번호"
            placeholderTextColor="#B0A090"
            secureTextEntry
            value={newPassword}
            onChangeText={setNewPassword}
          />
        </View>

        <Text style={styles.label}>새 비밀번호 확인</Text>
        <View style={styles.inputWrap}>
          <Text style={styles.inputIcon}>🔒</Text>
          <TextInput
            style={styles.input}
            placeholder="새 비밀번호 확인"
            placeholderTextColor="#B0A090"
            secureTextEntry
            value={newPasswordCheck}
            onChangeText={setNewPasswordCheck}
          />
        </View>

        <Pressable style={styles.resetButton} onPress={handleResetPassword}>
          <Text style={styles.resetButtonText}>비밀번호 변경</Text>
        </Pressable>

        <Pressable onPress={() => router.back()}>
          <Text style={styles.backText}>로그인으로 돌아가기</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAF6EE",
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    width: "100%",
    height: 520,
    opacity: 0.78,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(250, 246, 238, 0.28)",
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 440,
    paddingBottom: 40,
  },
  logoArea: {
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    fontSize: 34,
    fontWeight: "900",
    color: "#1B3A6B",
    letterSpacing: -1,
  },
  logoSub: {
    fontSize: 14,
    color: "#8B7355",
    fontWeight: "700",
    marginTop: 6,
  },
  label: {
    fontSize: 13,
    fontWeight: "800",
    color: "#5C4A35",
    marginBottom: 8,
    marginTop: 4,
  },
  row: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  rowInput: {
    flex: 1,
    marginBottom: 0,
  },
  inputWrap: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#DDD4C0",
    paddingHorizontal: 14,
    height: 50,
    marginBottom: 10,
  },
  inputIcon: {
    fontSize: 16,
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: "#1A1208",
  },
  smallButton: {
    width: 76,
    height: 50,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: "#1B3A6B",
    alignItems: "center",
    justifyContent: "center",
  },
  smallButtonText: {
    color: "#1B3A6B",
    fontSize: 14,
    fontWeight: "800",
  },
  timerText: {
    fontSize: 12,
    color: "#D35400",
    fontWeight: "700",
    marginBottom: 10,
    marginLeft: 4,
  },
  resetButton: {
    height: 50,
    backgroundColor: "#1B3A6B",
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
  resetButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
  },
  backText: {
    textAlign: "center",
    marginTop: 18,
    color: "#1B3A6B",
    fontSize: 13,
    fontWeight: "800",
  },
});