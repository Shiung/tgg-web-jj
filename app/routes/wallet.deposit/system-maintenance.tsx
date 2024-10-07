import { Button } from '~/components/ui/button'

const SystemMaintenance: React.FC = () => {
  return (
    <div className="flex aspect-square flex-col items-stretch justify-center space-y-2 p-4">
      <img
        src="/images/system-maintenance.png"
        alt="system maintenance"
        className="h-auto w-[128px] self-center object-contain"
      />
      <div className="space-y-1 text-center">
        <p className="text-base font-ultra text-white">System Maintenance</p>
        <p className="text-xs font-normal text-white/70">
          KOKON is temporarily unavailable due to system maintenance. We will be restoring regular
          service as soon as possible. We apologize for any inconvenience.
        </p>
      </div>
      <Button catEars>Contact Support</Button>
    </div>
  )
}

export default SystemMaintenance
