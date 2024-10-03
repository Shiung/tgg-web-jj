import { useState } from 'react'
import AlertDialog from '~/components/alert-dialog'
import { Button } from '~/components/ui/button'

const AlertDialogDemo: React.FC = () => {
  const [warningAlertOpen, setWarningAlertOpen] = useState(false)
  const [successAlertOpen, setSuccessAlertOpen] = useState(false)

  return (
    <>
      <h1 className="mt-4 text-xl font-bold">Alert Dialog</h1>
      <div className="mt-2 flex space-x-2">
        <Button type="button" className="flex-1" onClick={() => setWarningAlertOpen(true)}>
          Warning
        </Button>
        <Button type="button" className="flex-1" onClick={() => setSuccessAlertOpen(true)}>
          Success
        </Button>
        <AlertDialog
          isOpen={warningAlertOpen}
          onClose={() => setWarningAlertOpen(false)}
          title="Notice"
          message="Are you sure you want to disconnect this address ?"
          onRightButtonClick={() => setWarningAlertOpen(false)}
          onLeftButtonClick={() => setWarningAlertOpen(false)}
        />
        <AlertDialog
          variant="success"
          isOpen={successAlertOpen}
          onClose={() => setSuccessAlertOpen(false)}
          title="Notice"
          message={
            <div className="space-y-2">
              <p className="text-base font-ultra text-white">Submitted Successfully</p>
              <p>
                It may takes some time to process your withdrawal. You can go to History to check
                the status.
              </p>
            </div>
          }
          leftButtonText="Check Status"
          rightButtonText="Ok"
          onRightButtonClick={() => {
            console.log('Go to check status')
            setSuccessAlertOpen(false)
          }}
          onLeftButtonClick={() => setSuccessAlertOpen(false)}
        />
      </div>
    </>
  )
}

export default AlertDialogDemo
