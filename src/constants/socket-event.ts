export const SocketEventName = {
  join: 'join',
  join_status: 'join_status',

  leave: 'leave',
  leave_status: 'leave_status',

  message: 'message',

  connect: 'connect',
  disconnect: 'disconnect',
  connect_error: 'connect_error',

  socket_init: 'socket_init',
  socket_destruct: 'socket_destruct',
  socket_status: 'socket_status',
} as const

export const socket = {
  event: {
    type: SocketEventName,
    // payload: something...
  },
}
