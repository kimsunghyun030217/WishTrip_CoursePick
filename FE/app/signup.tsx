import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Dimensions,
  ScrollView,
  StatusBar,
  Platform,
} from "react-native";
import { router } from "expo-router";
import Svg, {
  Defs,
  LinearGradient,
  Stop,
  Rect,
  Circle,
  Polygon,
  Path,
  Ellipse,
  G,
} from "react-native-svg";
import { useState } from "react";

const { width } = Dimensions.get("window");

function HanokIllustration() {
  return (
    // viewBox를 375 기준으로 잡고 너비를 화면 전체에 꽉 차게 맵핑합니다.
    <Svg width={width} height={320} viewBox="0 0 375 320" preserveAspectRatio="xMidYMid slice">
      <Defs>
        {/* 밤하늘 노을 그라데이션 */}
        <LinearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0%" stopColor="#0B132B" />
          <Stop offset="55%" stopColor="#1C2541" />
          <Stop offset="85%" stopColor="#5BC0BE" stopOpacity={0.3} />
          <Stop offset="100%" stopColor="#FAF6EE" />
        </LinearGradient>
        {/* 광화문 대리석 석축 질감 */}
        <LinearGradient id="stoneGrad" x1="0" y1="0" x2="1" y2="0">
          <Stop offset="0%" stopColor="#8A95A5" />
          <Stop offset="50%" stopColor="#CFD8DC" />
          <Stop offset="100%" stopColor="#717D8C" />
        </LinearGradient>
        {/* 하단 한지 배경과 완벽히 녹아드는 그라데이션 */}
        <LinearGradient id="fadeout" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0%" stopColor="#FAF6EE" stopOpacity="0" />
          <Stop offset="100%" stopColor="#FAF6EE" stopOpacity="1" />
        </LinearGradient>
      </Defs>

      {/* 배경: 하늘 */}
      <Rect width="375" height="320" fill="url(#skyGrad)" />

      {/* 은은한 보름달과 별무리 (위치 조정) */}
      <Circle cx="320" cy="75" r="24" fill="#F4D03F" opacity={0.15} />
      <Circle cx="320" cy="75" r="16" fill="#FFFDE7" />
      <Circle cx="40" cy="80" r="1" fill="#FFFFFF" opacity={0.6} />
      <Circle cx="100" cy="55" r="1.2" fill="#FFFFFF" opacity={0.8} />
      <Circle cx="200" cy="65" r="1" fill="#FFFFFF" opacity={0.5} />

      {/* ── 광화문 성벽 (가운데 정렬 및 크기 밸런스 조정) ── */}
      <Rect x="25" y="160" width="325" height="95" fill="url(#stoneGrad)" rx={4} />
      {/* 홍예문 (중앙 성문 위치 교정) */}
      <Path d="M142,255 L142,205 A45,45 0 0,1 233,205 L233,255 Z" fill="#111625" />
      
      {/* ── 광화문 문루 (2층 지붕) ── */}
      {/* 1층 처마 기와 */}
      <Polygon points="15,165 187.5,130 360,165 348,175 27,175" fill="#1C2541" />
      {/* 1층 붉은 기둥 및 회랑 */}
      <Rect x="55" y="143" width="265" height="22" fill="#7B1E1A" /> 
      
      {/* 2층 지붕 (곡선 실루엣 강화) */}
      <Path d="M35,143 Q187.5,95 340,143 L325,154 L50,154 Z" fill="#0B132B" />
      {/* 단청 초록 라인 */}
      <Rect x="60" y="140" width="255" height="3" fill="#117A65" />

      {/* 바닥 광장 기단 */}
      <Rect x="0" y="255" width="375" height="65" fill="#CFD8DC" />
      <Rect x="0" y="255" width="375" height="2" fill="#90A4AE" />

      {/* ── 인물 배치 교정: 성문을 가리지 않도록 양옆 밸런스 분산 ── */}
      
      {/* 왼쪽 여인 (위치: X축 95로 이동하여 좌측 배치 안정화) */}
      <G translate="95, 225">
        <Path d="M0,0 Q-35,28 -45,75 L15,75 Q5,28 -5,0 Z" fill="#922B21" /> {/* 치마 */}
        <Path d="M-12,-25 Q0,-30 10,-23 L8,5 Q0,10 -10,5 Z" fill="#FAFAFA" /> {/* 저고리 */}
        <Path d="M-5,-25 L0,-20 L5,-25" fill="none" stroke="#B7950B" strokeWidth={1.2} />
        <Path d="M-12,-23 Q-25,-15 -28,3" fill="none" stroke="#FAFAFA" strokeWidth={9} strokeLinecap="round" /> {/* 소매 */}
        <Circle cx="0" cy="-38" r="12" fill="#1A1105" /> {/* 머리 */}
        <Rect x="-18" y="-40" width="36" height="1.8" fill="#D4AC0D" /> {/* 비녀 */}
        <Circle cx="-18" cy="-40" r="2" fill="#D4AC0D" />
        <Ellipse cx="0" cy="-34" rx="9" ry="11" fill="#FADBD8" /> {/* 얼굴 */}
      </G>

      {/* 오른쪽 선비 (위치: X축 280으로 이동하여 우측 배치 안정화) */}
      <G translate="280, 225">
        <Path d="M0,0 Q25,28 35,75 L-25,75 Q-15,28 -5,0 Z" fill="#1A5276" /> {/* 도포 */}
        <Rect x="-11" y="12" width="22" height="4" fill="#D4AC0D" /> {/* 허리띠 */}
        <Path d="M10,-20 Q28,-5 33,22" fill="none" stroke="#1A5276" strokeWidth={11} strokeLinecap="round" /> {/* 소매 */}
        <Ellipse cx="0" cy="-34" rx="10" ry="12" fill="#FADBD8" /> {/* 얼굴 */}
        <Ellipse cx="0" cy="-48" rx="22" ry="5" fill="#11161B" /> {/* 갓 챙 */}
        <Rect x="-8" y="-62" width="16" height="15" rx="1" fill="#11161B" /> {/* 갓 모자 */}
      </G>

      {/* 흩날리는 꽃잎 효과 */}
      <Circle cx="60" cy="270" r="2" fill="#FADBD8" opacity={0.6} />
      <Circle cx="310" cy="290" r="2.5" fill="#FADBD8" opacity={0.4} />
      <Circle cx="180" cy="265" r="1.5" fill="#FADBD8" opacity={0.7} />

      {/* 하단 페이드 아웃 효과 강화 */}
      <Rect x="0" y="240" width="375" height="80" fill="url(#fadeout)" />
    </Svg>
  );
}

export default function Index() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      {/* 아이폰 15 Pro 상단 텍스트 컬러 매칭 */}
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      
      <ScrollView 
        bounces={false} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        <View style={styles.hero}>
          <HanokIllustration />
        </View>

        <View style={styles.form}>
          <View style={styles.logoArea}>
            <Text style={styles.logo}>CoursePick</Text>
            <Text style={styles.logoSub}>나만의 대한민국 여행 코스</Text>
          </View>

          <View style={styles.inputWrap}>
            <Text style={styles.inputIcon}>✉</Text>
            <TextInput
              style={styles.input}
              placeholder="이메일 주소"
              placeholderTextColor="#A19588"
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
              placeholderTextColor="#A19588"
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
              <Text style={styles.kakaoBtnText}>카카오 로그인</Text>
            </Pressable>
            <Pressable style={styles.googleBtn}>
              <Text style={styles.googleBtnText}>Google 로그인</Text>
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
  scrollContainer: {
    flexGrow: 1,
    // Dynamic Island 및 하단 홈 바 안전 여백 확보
    paddingBottom: Platform.OS === "ios" ? 40 : 20,
  },
  hero: {
    height: 320,
    overflow: "hidden",
  },
  form: {
    paddingHorizontal: 28,
    backgroundColor: "#FAF6EE",
  },
  logoArea: {
    alignItems: "center",
    marginTop: 0,
    marginBottom: 28,
  },
  logo: {
    fontSize: 32,
    fontWeight: "900",
    color: "#0B132B",
    letterSpacing: -1,
  },
  logoSub: {
    fontSize: 12,
    color: "#922B21",
    fontWeight: "800",
    letterSpacing: 3,
    marginTop: 6,
  },
  inputWrap: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#EAE2D5",
    paddingHorizontal: 16,
    height: 56,
    marginBottom: 14,
    // 부드러운 섀도우 처리
    shadowColor: "#5C554A",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  inputIcon: {
    fontSize: 16,
    marginRight: 12,
    color: "#566573",
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#1C2833",
  },
  loginButton: {
    height: 56,
    backgroundColor: "#0B132B",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
    shadowColor: "#0B132B",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  linkRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 18,
    marginTop: 20,
  },
  linkPrimary: {
    fontSize: 14,
    color: "#0B132B",
    fontWeight: "600",
  },
  linkSecondary: {
    fontSize: 14,
    color: "#6E5B44",
    fontWeight: "500",
  },
  divider: {
    fontSize: 12,
    color: "#DCD3C5",
  },
  socialRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 28,
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: "#EBE3D5",
  },
  kakaoBtn: {
    flex: 1,
    height: 52,
    backgroundColor: "#FEE500",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  kakaoBtnText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#191919",
  },
  googleBtn: {
    flex: 1,
    height: 52,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#EAE2D5",
    alignItems: "center",
    justifyContent: "center",
  },
  googleBtnText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#4A4A4A",
  },
});