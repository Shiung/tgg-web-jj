import mitt from 'mitt'

type Events = {
  openProfileDialog: boolean
  openMaintenance: boolean
}

export const emitter = mitt<Events>()
