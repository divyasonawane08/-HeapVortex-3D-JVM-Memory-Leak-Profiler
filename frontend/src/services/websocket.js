import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

let client = null;

export function connectWebSocket(onMessage) {

    client = new Client({

        webSocketFactory: () => new SockJS("http://localhost:8080/ws"),

        reconnectDelay: 5000,

        onConnect: () => {

            console.log("Connected to WebSocket");

            client.subscribe("/topic/metrics", (message) => {

                const metrics = JSON.parse(message.body);

                onMessage(metrics);

            });

        },

        onStompError: (frame) => {

            console.error(frame);

        },

        onWebSocketError: (error) => {

            console.error(error);

        }

    });

    client.activate();

}

export function disconnectWebSocket() {

    if(client){

        client.deactivate();

    }

}