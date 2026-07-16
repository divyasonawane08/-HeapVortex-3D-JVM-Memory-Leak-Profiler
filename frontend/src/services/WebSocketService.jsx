export const connect=(callback)=>{


const socket=
new WebSocket(
"ws://localhost:*/ws/metrics"
);



socket.onmessage=(event)=>{

callback(
JSON.parse(event.data)
);

};


};