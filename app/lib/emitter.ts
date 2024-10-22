import mitt from 'mitt'

type Events = {
  openProfileDialog: boolean
  openMaintenance: boolean
  refetchTaskList: boolean
}

export const emitter = mitt<Events>()
