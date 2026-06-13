import { useState } from "react";
import { KoreaHero } from "../components/KoreaHero";

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("로그인:", { email, password });
  };

  return (
    <div className="min-h-screen bg-[#FAF6EE] flex flex-col">
      <KoreaHero />

      <div className="flex-1 px-6 pb-10 -mt-1">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 h-px bg-[#E8DDD0]" />
          <DanCheonPattern />
          <div className="flex-1 h-px bg-[#E8DDD0]" />
        </div>

        <form onSubmit={handleLogin} className="space-y-3.5">
          <div className="flex items-center gap-3 bg-white rounded-2xl border border-[#E8DDD0] px-4 h-14 shadow-sm">
            <MailIcon />
            <input
              type="email"
              placeholder="이메일 주소"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 text-[#2C3E50] bg-transparent outline-none placeholder:text-[#B0A090]"
              style={{ fontSize: 15 }}
            />
          </div>

          <div className="flex items-center gap-3 bg-white rounded-2xl border border-[#E8DDD0] px-4 h-14 shadow-sm">
            <LockIcon />
            <input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="flex-1 text-[#2C3E50] bg-transparent outline-none placeholder:text-[#B0A090]"
              style={{ fontSize: 15 }}
            />
          </div>

          <button
            type="submit"
            className="w-full h-14 rounded-2xl mt-1 shadow-md transition-all active:scale-[0.98]"
            style={{
              background: "linear-gradient(135deg, #B91C1C 0%, #991B1B 100%)",
              color: "white",
              fontSize: 16,
              fontWeight: 700,
              letterSpacing: "0.03em",
            }}
          >
            로그인
          </button>
        </form>

        <div className="flex items-center justify-center gap-4 mt-5">
          <button className="text-[#B91C1C] hover:underline" style={{ fontSize: 14, fontWeight: 700 }}>
            회원가입
          </button>
          <span className="text-[#DCD3C5]" style={{ fontSize: 12 }}>|</span>
          <button className="text-[#9A8C80] hover:underline" style={{ fontSize: 13 }}>
            비밀번호 찾기
          </button>
        </div>

        <div className="flex items-center gap-3 mt-6">
          <div className="flex-1 h-px bg-[#E8DDD0]" />
          <span className="text-[#B0A090]" style={{ fontSize: 11 }}>또는 간편 로그인</span>
          <div className="flex-1 h-px bg-[#E8DDD0]" />
        </div>

        <div className="flex gap-3 mt-4">
          <button
            className="flex-1 h-[52px] rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
            style={{ background: "#FEE500" }}
          >
            <KakaoIcon />
            <span style={{ fontSize: 14, fontWeight: 700, color: "#191919" }}>카카오</span>
          </button>

          <button className="flex-1 h-[52px] bg-white border border-[#E8DDD0] rounded-2xl flex items-center justify-center gap-2 hover:bg-stone-50 transition-all active:scale-[0.98]">
            <GoogleIcon />
            <span style={{ fontSize: 14, fontWeight: 600, color: "#4A4A4A" }}>Google</span>
          </button>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mt-6">
          {["🏯 경복궁", "🌸 벚꽃", "🍜 비빔밥", "🏝 제주도", "🏡 한옥마을"].map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full border border-[#E8DDD0] bg-white text-[#9A8C80]"
              style={{ fontSize: 11 }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function DanCheonPattern() {
  return (
    <svg width="24" height="16" viewBox="0 0 24 16" fill="none">
      <rect x="0" y="6" width="6" height="4" rx="1" fill="#B91C1C" opacity="0.6" />
      <rect x="7" y="4" width="4" height="8" rx="1" fill="#1E40AF" opacity="0.6" />
      <rect x="13" y="4" width="4" height="8" rx="1" fill="#15803D" opacity="0.6" />
      <rect x="18" y="6" width="6" height="4" rx="1" fill="#B45309" opacity="0.6" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <rect x="1" y="3.5" width="16" height="11" rx="2" stroke="#B0A090" strokeWidth="1.5" fill="none" />
      <path d="M1 6l8 5 8-5" stroke="#B0A090" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <rect x="3" y="8" width="12" height="9" rx="2" stroke="#B0A090" strokeWidth="1.5" fill="none" />
      <path d="M5.5 8V6a3.5 3.5 0 0 1 7 0v2" stroke="#B0A090" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="9" cy="12.5" r="1" fill="#B0A090" />
    </svg>
  );
}

function KakaoIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="#191919">
      <path d="M9 1.5C4.86 1.5 1.5 4.14 1.5 7.38c0 2.1 1.38 3.93 3.45 4.98L4.2 15l3.6-2.37A8.84 8.84 0 0 0 9 12.75c4.14 0 7.5-2.64 7.5-5.88C16.5 3.63 13.14 1.5 9 1.5z" />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M16.51 9.18c0-.6-.05-1.17-.15-1.73H9v3.27h4.23a3.63 3.63 0 0 1-1.57 2.38v1.97h2.54c1.49-1.37 2.31-3.39 2.31-5.9z" fill="#4285F4" />
      <path d="M9 17c2.13 0 3.92-.71 5.22-1.91l-2.54-1.97c-.7.47-1.6.75-2.68.75-2.06 0-3.8-1.39-4.42-3.26H2v2.03A8 8 0 0 0 9 17z" fill="#34A853" />
      <path d="M4.58 10.61A4.8 4.8 0 0 1 4.33 9c0-.56.1-1.1.25-1.61V5.36H2A8 8 0 0 0 1 9c0 1.29.31 2.51.86 3.59l2.72-1.98z" fill="#FBBC05" />
      <path d="M9 3.96c1.16 0 2.2.4 3.02 1.18l2.26-2.26A8 8 0 0 0 9 1 8 8 0 0 0 2 5.36l2.72 2.03C5.2 5.35 6.94 3.96 9 3.96z" fill="#EA4335" />
    </svg>
  );
}