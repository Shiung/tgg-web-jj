import { useEffect, useState, useMemo, useCallback } from 'react'
import {
  useInitData,
  useLaunchParams,
  useBackButton,
  useMainButton,
  useViewport,
  useThemeParams,
  useHapticFeedback,
  type ImpactHapticFeedbackStyle,
  type NotificationHapticFeedbackType,
} from '@telegram-apps/sdk-react'
import { TonConnectButton } from '@tonconnect/ui-react'
import JsonCode from '~/components/json-code'
import { Button } from '~/components/ui/button'
import useStore from '~/stores/useStore'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getUserRows(user: any) {
  return [
    { title: 'id', value: user.id.toString() },
    { title: 'username', value: user.username },
    { title: 'photo_url', value: user.photoUrl },
    { title: 'last_name', value: user.lastName },
    { title: 'first_name', value: user.firstName },
    { title: 'is_bot', value: user.isBot },
    { title: 'is_premium', value: user.isPremium },
    { title: 'language_code', value: user.languageCode },
    { title: 'allows_to_write_to_pm', value: user.allowsWriteToPm },
    { title: 'added_to_attachment_menu', value: user.addedToAttachmentMenu },
  ]
}

// 所有的 haptic feedback 配置
const hapticEffects = [
  {
    type: 'impact',
    styles: ['heavy', 'light', 'medium', 'rigid', 'soft'] as ImpactHapticFeedbackStyle[],
  },
  {
    type: 'notification',
    styles: ['error', 'success', 'warning'] as NotificationHapticFeedbackType[],
  },
  { type: 'selection', styles: ['changed'] },
]

export default function TelegramSdk() {
  const inTelegram = useStore(state => state.inTelegram)

  const initDataRaw = useLaunchParams().initDataRaw
  const initData = useInitData()

  // BackButton initializes synchronously. So, bb will be
  // the BackButton instance.
  const backButton = useBackButton()
  // const mainButton = useMainButton()
  // Viewport is being initialized asynchronously, so signal may return undefined.
  // After some time it will receive a valid value.
  const viewport = useViewport()

  // const themeParams = useThemeParams()
  const hapticFeedback = useHapticFeedback()

  const [isBackButtonVisible, setBackButtonVisible] = useState(true)

  const initDataRows = useMemo(() => {
    if (!initData || !initDataRaw) {
      return
    }
    console.log('tg data', initData, initDataRaw)

    const {
      hash,
      queryId,
      chatType,
      chatInstance,
      authDate,
      startParam,
      canSendAfter,
      canSendAfterDate,
    } = initData
    return [
      { title: 'raw', value: initDataRaw },
      { title: 'auth_date', value: authDate.toLocaleString() },
      { title: 'auth_date (raw)', value: authDate.getTime() / 1000 },
      { title: 'hash', value: hash },
      { title: 'can_send_after', value: canSendAfterDate?.toISOString() },
      { title: 'can_send_after (raw)', value: canSendAfter },
      { title: 'query_id', value: queryId },
      { title: 'start_param', value: startParam },
      { title: 'chat_type', value: chatType },
      { title: 'chat_instance', value: chatInstance },
    ]
  }, [initData, initDataRaw])

  const userRows = useMemo(() => {
    return initData && initData.user ? getUserRows(initData.user) : undefined
  }, [initData])

  const receiverRows = useMemo(() => {
    return initData && initData.receiver ? getUserRows(initData.receiver) : undefined
  }, [initData])

  const chatRows = useMemo(() => {
    if (!initData?.chat) {
      return
    }
    const { id, title, type, username, photoUrl } = initData.chat

    return [
      { title: 'id', value: id.toString() },
      { title: 'title', value: title },
      { title: 'type', value: type },
      { title: 'username', value: username },
      { title: 'photo_url', value: photoUrl },
    ]
  }, [initData])

  // 使用 useCallback 优化事件处理函数
  const triggerImpact = useCallback(
    (style: ImpactHapticFeedbackStyle) => {
      hapticFeedback.impactOccurred(style)
    },
    [hapticFeedback]
  )

  const triggerNotification = useCallback(
    (type: NotificationHapticFeedbackType) => {
      hapticFeedback.notificationOccurred(type)
    },
    [hapticFeedback]
  )

  const triggerSelection = useCallback(() => {
    hapticFeedback.selectionChanged()
  }, [hapticFeedback])

  useEffect(() => {
    console.log('tg data viewport', viewport)
  }, [viewport])

  useEffect(() => {
    if (isBackButtonVisible) {
      backButton.show()
    } else {
      backButton.hide()
    }
  }, [isBackButtonVisible, backButton])

  return (
    <div className="container relative flex min-h-screen flex-col items-start justify-between rounded-lg border-4 border-dashed border-[#FFF200] px-0 pb-safe text-primary">
      <h1 className="mb-4 text-2xl font-bold">Telegram SDK Full Demo</h1>
      <h4 className="mb-4 text-xl font-bold">In Telegram: {`${inTelegram}`}</h4>
      <h4 className="mb-4 text-xl font-bold">raw data</h4>
      <JsonCode data={initDataRaw} />
      <h4 className="mb-4 text-xl font-bold">init data</h4>
      <JsonCode data={initData} />
      <h4 className="mb-4 text-xl font-bold">user data</h4>
      {userRows && <JsonCode data={userRows} />}
      <h4 className="mb-4 text-xl font-bold">receive data</h4>
      {userRows && <JsonCode data={receiverRows} />}
      <h4 className="mb-4 text-xl font-bold">chat data</h4>
      {userRows && <JsonCode data={chatRows} />}
      <div className="absolute right-0 top-0 bg-[#FFF200] p-1 text-black">
        viewport {`${viewport?.width} x ${viewport?.height}`}
      </div>
      <h4 className="mb-4 text-xl font-bold">viewport info</h4>
      <ul>
        <li>Height: {viewport?.height}</li>
        <li>Width: {viewport?.width}</li>
        <li>Is Expanded: {viewport?.isExpanded ? 'Yes' : 'No'}</li>
      </ul>
      <h4 className="mb-4 text-xl font-bold">Ton Connect Button: </h4>
      {/* TonConnect Button */}
      <TonConnectButton className="mb-4" />
      {/* Main Button */}
      {/* Back Button */}
      <Button className="mb-4" onClick={() => setBackButtonVisible(prev => !prev)}>
        {`${isBackButtonVisible ? 'Hide ' : 'Show '}Back Button`}
      </Button>
      {/* Settings Button */}
      <h4 className="mb-4 text-xl font-bold">SettingsButton </h4>
      {/* Haptic */}
      <h4 className="mb-4 text-xl font-bold">Haptic: </h4>
      <div className="space-y-4">
        {hapticEffects.map((effect, index) => (
          <div key={index}>
            <h2 className="mb-2 text-xl font-semibold capitalize">{effect.type}:</h2>
            {effect.styles.map((style, idx) => (
              // eslint-disable-next-line jsx-a11y/anchor-is-valid
              <a
                key={idx}
                href="javascript:void(0);"
                onClick={() => {
                  if (effect.type === 'impact') {
                    triggerImpact(style as ImpactHapticFeedbackStyle)
                  } else if (effect.type === 'notification') {
                    triggerNotification(style as NotificationHapticFeedbackType)
                  } else if (effect.type === 'selection') {
                    triggerSelection()
                  }
                }}
                className="mb-2 mr-2 inline-block capitalize text-blue-500 hover:text-blue-700"
              >
                {style}
              </a>
            ))}
          </div>
        ))}
      </div>
      <h4 className="mb-4 text-xl font-bold">Links </h4>
      <h4 className="mb-4 text-xl font-bold">Swipe Behavior </h4>
      <h4 className="mb-4 text-xl font-bold">Popup </h4>
      <h4 className="mb-4 text-xl font-bold">QRScanner </h4>
      <h4 className="mb-4 text-xl font-bold">Open Links </h4>
      <h4 className="mb-4 text-xl font-bold">Closing Behavior: </h4>
    </div>
  )
}
