import mitt from 'mitt'

type Events = {
  openProfileDialog: boolean
}

export const emitter = mitt<Events>()
