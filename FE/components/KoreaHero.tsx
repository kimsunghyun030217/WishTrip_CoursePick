export function KoreaHero() {
  const photos = [
    {
      url: "https://images.unsplash.com/photo-1599033769063-fcd3ef816810?w=400&h=300&fit=crop&auto=format",
      alt: "경복궁",
      label: "경복궁",
    },
    {
      url: "https://images.unsplash.com/photo-1616627052149-22c4f8a6316e?w=400&h=300&fit=crop&auto=format",
      alt: "비빔밥",
      label: "비빔밥",
    },
    {
      url: "https://images.unsplash.com/photo-1535189043414-47a3c49a0bed?w=400&h=300&fit=crop&auto=format",
      alt: "북촌 한옥마을",
      label: "한옥마을",
    },
    {
      url: "https://images.unsplash.com/photo-1649427449743-65a49b7eb395?w=400&h=300&fit=crop&auto=format",
      alt: "벚꽃",
      label: "벚꽃길",
    },
    {
      url: "https://images.unsplash.com/photo-1679054142703-6e6d2fa5934f?w=400&h=300&fit=crop&auto=format",
      alt: "제주도",
      label: "제주도",
    },
    {
      url: "https://images.unsplash.com/photo-1692525080138-f9d2208a0b30?w=400&h=300&fit=crop&auto=format",
      alt: "한국 음식",
      label: "한식",
    },
  ];

  return (
    <div className="relative w-full overflow-hidden" style={{ height: 280 }}>
      <div className="absolute inset-0 grid grid-cols-3 grid-rows-2 gap-0.5">
        {photos.map((photo, i) => (
          <div key={i} className="relative overflow-hidden bg-stone-200">
            <img
              src={photo.url}
              alt={photo.alt}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute bottom-1 left-1.5">
              <span
                className="text-white/90 tracking-wide"
                style={{ fontSize: 9, fontWeight: 600, textShadow: "0 1px 3px rgba(0,0,0,0.8)" }}
              >
                {photo.label}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.08) 40%, rgba(250,246,238,0.85) 80%, rgba(250,246,238,1) 100%)",
        }}
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center pb-6">
        <div className="flex items-center gap-2 mb-2">
          <div style={{ width: 28, height: 1, background: "rgba(255,255,255,0.7)" }} />
          <KoreanOrnament />
          <div style={{ width: 28, height: 1, background: "rgba(255,255,255,0.7)" }} />
        </div>

        <h1
          className="text-white tracking-tight"
          style={{
            fontSize: 36,
            fontWeight: 900,
            textShadow: "0 2px 12px rgba(0,0,0,0.5)",
            letterSpacing: "-0.02em",
          }}
        >
          CoursePick
        </h1>

        <div
          className="mt-1.5 px-4 py-1 rounded-full"
          style={{ background: "rgba(185,28,28,0.85)" }}
        >
          <p
            className="text-white tracking-widest"
            style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em" }}
          >
            나만의 대한민국 여행 코스
          </p>
        </div>
      </div>
    </div>
  );
}

function KoreanOrnament() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="3" fill="rgba(255,255,255,0.9)" />
      <circle cx="10" cy="10" r="6" stroke="rgba(255,255,255,0.6)" strokeWidth="1" fill="none" />
      <line x1="10" y1="2" x2="10" y2="18" stroke="rgba(255,255,255,0.5)" strokeWidth="0.8" />
      <line x1="2" y1="10" x2="18" y2="10" stroke="rgba(255,255,255,0.5)" strokeWidth="0.8" />
    </svg>
  );
}