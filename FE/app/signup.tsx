import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  StatusBar,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import { router } from "expo-router";
import {
  existsEmail,
  sendSignupCode,
  verifySignupCode,
  signup,
} from "../src/api/authApi";
import CustomSelect from "../components/CustomSelect";
import BirthDatePicker from "../components/BirthDatePicker";

const NATIONALITY_OPTIONS = [
  { label: "대한민국", value: "KOREA" },
  { label: "미국", value: "USA" },
  { label: "일본", value: "JAPAN" },
  { label: "중국", value: "CHINA" },
  { label: "대만", value: "TAIWAN" },
  { label: "베트남", value: "VIETNAM" },
  { label: "태국", value: "THAILAND" },
  { label: "프랑스", value: "FRANCE" },
  { label: "기타", value: "OTHER" },
];

const LANGUAGE_OPTIONS = [
  { label: "한국어", value: "KOREAN" },
  { label: "영어", value: "ENGLISH" },
  { label: "일본어", value: "JAPANESE" },
  { label: "중국어", value: "CHINESE" },
  { label: "베트남어", value: "VIETNAMESE" },
  { label: "태국어", value: "THAI" },
  { label: "프랑스어", value: "FRENCH" },
];

export default function Signup() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [nickname, setNickname] = useState("");
  const [nationality, setNationality] = useState("");
  const [language, setLanguage] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");

  const [emailChecked, setEmailChecked] = useState(false);
  const [emailAvailable, setEmailAvailable] = useState(false);
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
    setEmailChecked(false);
    setEmailAvailable(false);
    setTimer(0);
  };

  const handleSendCode = async () => {
    if (!email) {
      Alert.alert("알림", "이메일을 입력해주세요.");
      return;
    }

    try {
      const exists = await existsEmail(email);

      if (exists) {
        setEmailChecked(true);
        setEmailAvailable(false);

        Alert.alert("알림", "이미 가입된 이메일입니다.", [
          {
            text: "로그인하기",
            onPress: () => router.push("/"),
          },
          {
            text: "확인",
            style: "cancel",
          },
        ]);
        return;
      }

      setEmailChecked(true);
      setEmailAvailable(true);

      const result = await sendSignupCode(email);
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
      const result = await verifySignupCode(email, code);
      setTimer(0);
      Alert.alert("성공", result || "인증번호가 확인되었습니다.");
    } catch (error: any) {
      Alert.alert(
        "인증 실패",
        error.response?.data || "인증번호를 확인해주세요."
      );
    }
  };

  const handleSignup = async () => {
    if (
      !email ||
      !code ||
      !nickname ||
      !nationality ||
      !language ||
      !birthDate ||
      !password ||
      !passwordCheck
    ) {
      Alert.alert("알림", "모든 항목을 입력해주세요.");
      return;
    }

    if (password !== passwordCheck) {
      Alert.alert("오류", "비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const result = await signup({
        email,
        password,
        nickname,
        nationality,
        language,
        birthDate,
      });

      Alert.alert("성공", result || "회원가입이 완료되었습니다.", [
        {
          text: "확인",
          onPress: () => router.replace("/"),
        },
      ]);
    } catch (error: any) {
      Alert.alert(
        "회원가입 실패",
        error.response?.data || "회원가입에 실패했습니다."
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
          <Text style={styles.logo}>회원가입</Text>
          <Text style={styles.logoSub}>CoursePick과 여행을 시작해보세요</Text>
        </View>

        <View style={styles.emailRow}>
          <View style={[styles.inputWrap, styles.emailInput]}>
            <Text style={styles.inputIcon}>✉</Text>
            <TextInput
              style={styles.input}
              placeholder="이메일 주소"
              placeholderTextColor="#B0A090"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={handleEmailChange}
            />
          </View>

          <Pressable style={styles.codeButton} onPress={handleSendCode}>
            <Text style={styles.codeButtonText}>인증</Text>
          </Pressable>
        </View>

        {emailChecked && emailAvailable && (
          <Text style={styles.successText}>사용 가능한 이메일입니다.</Text>
        )}

        <View style={styles.codeRow}>
          <View style={[styles.inputWrap, styles.codeInput]}>
            <Text style={styles.inputIcon}>#</Text>
            <TextInput
              style={styles.input}
              placeholder="인증번호 입력"
              placeholderTextColor="#B0A090"
              keyboardType="number-pad"
              value={code}
              onChangeText={setCode}
            />
          </View>

          <Pressable style={styles.codeButton} onPress={handleVerifyCode}>
            <Text style={styles.codeButtonText}>확인</Text>
          </Pressable>
        </View>

        {timer > 0 && (
          <Text style={styles.timerText}>인증번호 남은 시간 {formatTimer(timer)}</Text>
        )}

        <View style={styles.inputWrap}>
          <Text style={styles.inputIcon}>👤</Text>
          <TextInput
            style={styles.input}
            placeholder="닉네임"
            placeholderTextColor="#B0A090"
            value={nickname}
            onChangeText={setNickname}
          />
        </View>

        <CustomSelect
          icon="🌍"
          placeholder="국적 선택"
          options={NATIONALITY_OPTIONS}
          value={nationality}
          onChange={setNationality}
        />

        <CustomSelect
          icon="🗣️"
          placeholder="사용 언어 선택"
          options={LANGUAGE_OPTIONS}
          value={language}
          onChange={setLanguage}
        />

        <BirthDatePicker value={birthDate} onChange={setBirthDate} />

        <View style={styles.inputWrap}>
          <Text style={styles.inputIcon}>🔒</Text>
          <TextInput
            style={styles.input}
            placeholder="비밀번호"
            placeholderTextColor="#B0A090"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <View style={styles.inputWrap}>
          <Text style={styles.inputIcon}>🔒</Text>
          <TextInput
            style={styles.input}
            placeholder="비밀번호 확인"
            placeholderTextColor="#B0A090"
            secureTextEntry
            value={passwordCheck}
            onChangeText={setPasswordCheck}
          />
        </View>

        <Pressable style={styles.signupButton} onPress={handleSignup}>
          <Text style={styles.signupButtonText}>가입하기</Text>
        </Pressable>

        <View style={styles.linkRow}>
          <Text style={styles.linkText}>이미 계정이 있나요?</Text>
          <Pressable onPress={() => router.push("/")}>
            <Text style={styles.linkPrimary}>로그인</Text>
          </Pressable>
        </View>
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
    paddingTop: 450,
    paddingBottom: 40,
  },
  logoArea: {
    alignItems: "center",
    marginBottom: 18,
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
  emailRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 6,
  },
  codeRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 6,
  },
  emailInput: {
    flex: 1,
    marginBottom: 0,
  },
  codeInput: {
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
  codeButton: {
    width: 76,
    height: 50,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: "#1B3A6B",
    alignItems: "center",
    justifyContent: "center",
  },
  codeButtonText: {
    color: "#1B3A6B",
    fontSize: 14,
    fontWeight: "800",
  },
  successText: {
    fontSize: 12,
    color: "#1B8A5A",
    fontWeight: "700",
    marginBottom: 10,
    marginLeft: 4,
  },
  timerText: {
    fontSize: 12,
    color: "#D35400",
    fontWeight: "700",
    marginBottom: 10,
    marginLeft: 4,
  },
  signupButton: {
    height: 50,
    backgroundColor: "#1B3A6B",
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
  },
  signupButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
  },
  linkRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    marginTop: 16,
  },
  linkText: {
    fontSize: 13,
    color: "#6E5B44",
    fontWeight: "600",
  },
  linkPrimary: {
    fontSize: 13,
    color: "#1B3A6B",
    fontWeight: "800",
  },
});