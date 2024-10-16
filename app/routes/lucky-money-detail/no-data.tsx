export default function NoData() {
  return (
    <div className="flex w-full flex-1 flex-col items-stretch justify-center space-y-2">
      <img className="w-32 self-center" src="/images/system-no-data.png" alt="No data" />
      <p className="self-center text-xs font-semibold text-white/70">No data available</p>
    </div>
  )
}
