// app/index.tsx
import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ScrollView,
  StatusBar,
  Image,
} from "react-native";
import { router } from "expo-router";

export default function Index() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <Image
            source={require("../assets/images/login-hero.png")}
            style={styles.heroImage}
            resizeMode="cover"
          />
        </View>

        <View style={styles.form}>
          <View style={styles.logoArea}>
            <Text style={styles.logo}>CoursePick</Text>
            <Text style={styles.logoSub}>나만의 한국 여행 코스</Text>
          </View>

          <View style={styles.inputWrap}>
            <Text style={styles.inputIcon}>✉</Text>
            <TextInput
              style={styles.input}
              placeholder="이메일 주소"
              placeholderTextColor="#B0A090"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>

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

          <Pressable style={styles.loginButton}>
            <Text style={styles.loginButtonText}>로그인</Text>
          </Pressable>

          <View style={styles.linkRow}>
            <Pressable onPress={() => router.push("/signup")}>
              <Text style={styles.linkPrimary}>회원가입</Text>
            </Pressable>

            <Text style={styles.divider}>|</Text>

            <Pressable onPress={() => router.push("/find-password")}>
              <Text style={styles.linkSecondary}>비밀번호 찾기</Text>
            </Pressable>
          </View>

          <View style={styles.socialRow}>
            <Pressable style={styles.kakaoBtn}>
              <Text style={styles.kakaoBtnText}>카카오로 시작</Text>
            </Pressable>

            <Pressable style={styles.googleBtn}>
              <Text style={styles.googleBtnText}>Google로 시작</Text>
            </Pressable>
          </View>
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

  hero: {
    height: 420,
    backgroundColor: "#FAF6EE",
    justifyContent: "flex-end",
  },

  heroImage: {
    width: "100%",
    height: "100%",
  },

  form: {
    paddingHorizontal: 24,
    paddingBottom: 40,
    backgroundColor: "#FAF6EE",
  },

  logoArea: {
    alignItems: "center",
    marginTop: 4,
    marginBottom: 24,
  },

  logo: {
    fontSize: 26,
    fontWeight: "800",
    color: "#1B3A6B",
    letterSpacing: -0.5,
  },

  logoSub: {
    fontSize: 12,
    color: "#C0392B",
    fontWeight: "600",
    letterSpacing: 1,
    marginTop: 3,
  },

  inputWrap: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#DDD4C0",
    paddingHorizontal: 14,
    height: 50,
    marginBottom: 12,
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

  loginButton: {
    height: 50,
    backgroundColor: "#1B3A6B",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
    marginBottom: 4,
  },

  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
    letterSpacing: 0.5,
  },

  linkRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 14,
    marginTop: 14,
  },

  linkPrimary: {
    fontSize: 13,
    color: "#1B3A6B",
    fontWeight: "600",
  },

  linkSecondary: {
    fontSize: 13,
    color: "#8B7355",
    fontWeight: "500",
  },

  divider: {
    fontSize: 12,
    color: "#C0B8A8",
  },

  socialRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 22,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#E8E0D0",
  },

  kakaoBtn: {
    flex: 1,
    height: 46,
    backgroundColor: "#FEE500",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#F0D800",
    alignItems: "center",
    justifyContent: "center",
  },

  kakaoBtnText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#3C1E1E",
  },

  googleBtn: {
    flex: 1,
    height: 46,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#DDD4C0",
    alignItems: "center",
    justifyContent: "center",
  },

  googleBtnText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#5C4A35",
  },
});