export default function AboutPortrait() {
  return (
    <div
      aria-label="Portrait of Ohshin"
      className="h-full w-full bg-steel bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "linear-gradient(180deg, rgba(0,0,0,0.06), rgba(0,0,0,0.12)), url('/profile.png')",
      }}
    />
  );
}
