import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog'
import { Button } from '~/components/ui/button'

const StopSharingDialog: React.FC = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="p-4">
          <Button catEars variant="danger" className="w-full">
            Stop Sharing
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader className="">
          <DialogTitle className="">Stop Sharing</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col space-y-2 p-3 pb-0 text-sm text-white/70">
          <div className="flex items-center justify-between rounded-xl bg-[#1C1C1C] p-3 font-ultra">
            <div>Remaining</div>
            <div className="text-2xl text-primary">500</div>
          </div>
          <div className="text-sm">
            <div>The unused budget will be refunded.</div>
            <div>Are you sure to terminate sending red envelope?</div>
          </div>
        </div>
        <DialogFooter className="flex flex-row space-x-2 p-3">
          <Button className="flex-1" variant="gray" catEars>
            Cancel
          </Button>
          <Button className="flex-1" catEars>
            Ok
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default StopSharingDialog
