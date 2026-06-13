import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { router } from "expo-router";
import { useState } from "react";

export default function FindPasswordScreen() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordCheck, setNewPasswordCheck] = useState("");

  const handleResetPassword = () => {
    if (newPassword !== newPasswordCheck) {
      Alert.alert("오류", "비밀번호가 일치하지 않습니다.");
      return;
    }

    Alert.alert("비밀번호 변경", "비밀번호 변경 API 연결 예정");
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>비밀번호 찾기</Text>
      <Text style={styles.subtitle}>
        이메일 인증 후 새 비밀번호를 설정해주세요.
      </Text>

      <Text style={styles.label}>이메일</Text>
      <View style={styles.row}>
        <TextInput
          style={[styles.input, { flex: 1 }]}
          placeholder="example@email.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Pressable
          style={styles.smallButton}
          onPress={() => Alert.alert("인증", "인증번호 발송 API 연결 예정")}
        >
          <Text style={styles.smallButtonText}>발송</Text>
        </Pressable>
      </View>

      <Text style={styles.label}>인증번호</Text>
      <View style={styles.row}>
        <TextInput
          style={[styles.input, { flex: 1 }]}
          placeholder="인증번호 입력"
          value={code}
          onChangeText={setCode}
        />

        <Pressable
          style={styles.smallButton}
          onPress={() => Alert.alert("인증", "인증번호 확인 API 연결 예정")}
        >
          <Text style={styles.smallButtonText}>확인</Text>
        </Pressable>
      </View>

      <Text style={styles.label}>새 비밀번호</Text>
      <TextInput
        style={styles.input}
        placeholder="새 비밀번호"
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
      />

      <Text style={styles.label}>새 비밀번호 확인</Text>
      <TextInput
        style={styles.input}
        placeholder="새 비밀번호 확인"
        secureTextEntry
        value={newPasswordCheck}
        onChangeText={setNewPasswordCheck}
      />

      <Pressable style={styles.resetButton} onPress={handleResetPassword}>
        <Text style={styles.resetButtonText}>비밀번호 변경</Text>
      </Pressable>

      <Pressable onPress={() => router.back()}>
        <Text style={styles.backText}>← 로그인으로 돌아가기</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  content: {
    padding: 24,
    paddingTop: 80,
    paddingBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#2563EB",
  },
  subtitle: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 8,
    marginBottom: 30,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
    marginTop: 16,
    color: "#374151",
  },
  input: {
    height: 52,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    paddingHorizontal: 16,
    fontSize: 16,
  },
  row: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  smallButton: {
    width: 80,
    height: 52,
    backgroundColor: "#2563EB",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  smallButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  resetButton: {
    marginTop: 32,
    height: 56,
    backgroundColor: "#2563EB",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  resetButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  backText: {
    textAlign: "center",
    marginTop: 20,
    color: "#2563EB",
    fontWeight: "600",
  },
});