import { Button } from '~/components/ui/button'

const SystemMaintenance = () => {
  return (
    <div className="m-4 flex flex-col items-center justify-center space-y-2 pt-10">
      <img className="h-32 w-32" src="/images/system-maintenance.png" alt="maintenance" />
      <div className="flex flex-col space-y-1 px-3 text-center">
        <div className="text-base font-ultra">System Maintenance</div>
        <div className="text-xs text-[#FFFFFFB2]">
          KOKON is temporarily unavailable due to system maintenance. We will be restoring regular
          service as soon as possible. We apologize for any inconvenience
        </div>
      </div>
      <Button catEars className="w-full text-sm font-ultra">
        Contact Support
      </Button>
    </div>
  )
}

export default SystemMaintenance
