import { useEffect,useState } from "react";
import api from "../services/Api";
export default function Dashboard(){

    const[data,setData]=useState({});

    useEffect(()=>{

        api.get("/api/jvm")
        .then(res=>setData(res.data));

    },[]);

    return(

        <div>

            <h1>HeapVortex Dashboard</h1>

            <h3>Heap Used : {data.heapUsed}</h3>

            <h3>Heap Max : {data.heapMax}</h3>

            <h3>Threads : {data.threadCount}</h3>

            <h3>Non Heap : {data.nonHeapUsed}</h3>

        </div>

    );

}