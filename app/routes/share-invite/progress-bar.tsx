import React from 'react'

interface ProgressBarProps {
  progress: number
  total: number
  label: string
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, total, label }) => {
  const percentage = (progress / total) * 100

  return (
    <div className="mb-2">
      <div className="mb-1 text-sm">{label}</div>
      <div className="relative h-6 overflow-hidden rounded-full border-2 border-black bg-black">
        <div
          className="absolute left-0 top-0 h-full rounded-full transition-all duration-300 ease-in-out"
          style={{
            width: `${percentage}%`,
            background: `
              linear-gradient(180deg, #92EE6D, #007E36),
              url('/images/share/progressBar.png')
            `,
            backgroundSize: 'cover, auto',
            backgroundPosition: 'center, center',
            backgroundRepeat: 'no-repeat, repeat',
            backgroundBlendMode: 'overlay, normal',
          }}
        ></div>
        <div className="absolute inset-0 flex items-center justify-center text-xs font-ultra text-white">
          ({progress}/{total})
        </div>
      </div>
    </div>
  )
}

export default ProgressBar
