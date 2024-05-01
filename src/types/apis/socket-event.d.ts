declare namespace SocketEvent {
  export type Type =
    | 'join'
    | 'leave'
    | 'message'
    | 'connect'
    | 'disconnect'
    | 'connect_error'
    | 'socket_init'
    | 'socket_destruct'
    | 'socket_status';

  export type Payload = {
    uuid: string;
    data: Partial<User.User>;
  };
}
