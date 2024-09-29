import { useEffect, useRef } from 'react'
import QRCodeStyling, { CornerDotType, CornerSquareType, DotType } from 'qr-code-styling'

interface QRCodeProps {
  /** QR code 中编码的内容（如网址） */
  value: string

  /** QR code 的尺寸，默认为 300 */
  size?: number

  /** QR code 中央的 logo 图片 URL，可选 */
  logoImage?: string

  /** logo 图片的大小比例，默認 0.4 不建議超過 0.5 */
  logoSize?: number

  /** QR code 的背景颜色，默认为白色 (#ffffff) */
  backgroundColor?: string

  /** QR code 中点的颜色，默认为黑色 (#000000) */
  dotColor?: string

  /** QR code 的样式，支持库定义的 'dots' 或 'square' 等样式 */
  qrStyle?: DotType

  /** QR code 角的样式，支持库定义的方块角样式 */
  cornerSquareStyle?: CornerSquareType

  /** QR code 角点的样式，支持库定义的角点样式 */
  cornerDotStyle?: CornerDotType
}

const QRCode: React.FC<QRCodeProps> = ({
  value,
  size = 300,
  logoImage,
  logoSize = 0.4,
  backgroundColor = '#ffffff',
  dotColor = '#000000',
  qrStyle = 'classy',
  cornerSquareStyle = 'square',
  cornerDotStyle = 'square',
}) => {
  const qrCodeRef = useRef<HTMLDivElement>(null)
  const qrCodeInstance = useRef<QRCodeStyling>()

  useEffect(() => {
    const qrCodeElement = qrCodeRef.current // 将 ref 复制到局部变量中

    const loadQRCodeStyling = async () => {
      const { default: QRCodeStyling } = await import('qr-code-styling')

      const qrCodeOptions = {
        width: size,
        height: size,
        data: value,
        dotsOptions: { color: dotColor, type: qrStyle },
        cornersSquareOptions: { type: cornerSquareStyle },
        cornersDotOptions: { type: cornerDotStyle },
        backgroundOptions: { color: backgroundColor },
        image: logoImage,
        imageOptions: { crossOrigin: 'anonymous', margin: 2, imageSize: 0.4 },
      }

      if (!qrCodeInstance.current) {
        // 初始化 QR code 实例
        qrCodeInstance.current = new QRCodeStyling(qrCodeOptions)
      } else {
        // 更新 QR code 实例
        qrCodeInstance.current.update(qrCodeOptions)
      }

      if (qrCodeElement) {
        qrCodeElement.innerHTML = '' // 清除旧的 QR code
        qrCodeInstance.current.append(qrCodeElement) // 将新的 QR code 挂载到 DOM 上
      }
    }

    loadQRCodeStyling()

    return () => {
      if (qrCodeElement) {
        qrCodeElement.innerHTML = '' // 清除 QR code
      }
    }
  }, [
    value,
    size,
    logoImage,
    backgroundColor,
    dotColor,
    qrStyle,
    cornerSquareStyle,
    cornerDotStyle,
    logoSize,
  ])

  return <div ref={qrCodeRef}></div>
}

export default QRCode
