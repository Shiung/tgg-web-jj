export default function AppLoading() {
  return (
    <div className="absolute inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-[#333333]/50 backdrop-blur">
      <img
        width={128}
        height={128}
        src="/images/loading.png"
        alt="loading"
        className="animate-spin"
      />
      <span className="mt-10 text-2xl font-extrabold">Loading</span>
    </div>
  )
}
