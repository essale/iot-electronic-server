import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Rx';
import {WebsocketService} from './websocket.service';
import {ToastComponent} from '../shared/toast/toast.component';


const CHAT_URL = 'ws://localhost:4200/ws';

export interface Message {
    type: string,
    message: any
}

export type WsUser = {
    ws: WebSocket;
};

@Injectable()
export class ChatService {
    public messages: Subject<Message>;
    users: any;

    constructor(wsService: WebsocketService, public toast: ToastComponent) {

        this.messages = <Subject<Message>>wsService
            .connect(CHAT_URL)
            .map((response: MessageEvent): Message => {
                const data = JSON.parse(response.data);
                this.users = data.message;
                switch (data.type) {
                    case 'message': {
                        this.toast.open(data.message, 'primary');
                        break;
                    }
                    case 'sig': {
                        this.toast.open('sig', 'primary');
                        break;
                    }
                    case 'ping': {
                        this.toast.open('ping', 'primary');
                        break;
                    }
                    default: {
                        break;
                    }
                }
                return {
                    type: data.type,
                    message: data.message
                };
            });
    }


}