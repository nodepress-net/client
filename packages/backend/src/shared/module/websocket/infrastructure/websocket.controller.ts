import {
	OnGatewayConnection,
	OnGatewayDisconnect,
	OnGatewayInit,
	WebSocketGateway,
	WebSocketServer,
} from '@nestjs/websockets';
import { SERVER } from '@server/constant/server.const';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(SERVER.OPTIONS_WEBSOCKET)
export class WebsocketController
	implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
	@WebSocketServer() server: Server;

	afterInit(server?: Server) {
		console.log('Websocket server initialized');
		server;
	}

	handleConnection(client: Socket) {
		client;
		client.emit('connection', 'Successfully connected to the server');
	}

	handleDisconnect(client: Socket) {
		client;
	}

	joinRoom(client: Socket, room: string) {
		client.join(this.nameRoom(room));
	}

	leaveRoom(client: Socket, room: string) {
		client.leave(this.nameRoom(room));
	}

	sendToAll(event: string, msg: unknown) {
		this.server.emit(event, msg);
	}

	sendToRoom(event: string, room: string, msg: unknown) {
		this.server.to(this.nameRoom(room)).emit(event, msg);
	}

	private nameRoom(room: string) {
		return `room_${room}`;
	}
}
