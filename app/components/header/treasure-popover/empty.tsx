import React from 'react'

import { Link } from '@remix-run/react'
import { Button } from '~/components/ui/button'

interface EmptyProps {
  onGo?: () => void
}

const Empty: React.FC<EmptyProps> = ({ onGo }) => {
  return (
    <div className="flex flex-col items-center justify-between text-center">
      <img src="/images/system-error.png" className="mt-2 h-32 w-32" alt="Treasure Empty" />
      <p className="mt-2 text-xs text-[#FFFFFFB2]">
        There is no treasure to unlock. Go get the treasure from the reward of task.
      </p>
      <Link
        to="/task/subtask"
        prefetch="viewport"
        className="w-full"
        onClick={() => {
          onGo?.()
        }}
      >
        <Button catEars className="mt-6 w-full">
          <span className="text-sm">Go</span>
        </Button>
      </Link>
    </div>
  )
}

export default Empty
