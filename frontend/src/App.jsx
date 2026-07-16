import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import HeapChart from "./components/HeapChart";
import MetricCard from "./components/MetricCard";
import Heap3D from "./components/Heap3D";
import {
  FaMicrochip,
  FaMemory,
  FaServer,
  FaLayerGroup,
  FaTasks,
  FaCheckCircle
} from "react-icons/fa";

export default function App() {
  const [metrics, setMetrics] = useState({
    cpuUsage:0, usedHeap:0, maxHeap:0,
    heapUsagePercent:0, threadCount:0, loadedClasses:0
  });
  const [chartData,setChartData]=useState([]);
  const [heapFile,setHeapFile]=useState("");
  const [analysis,setAnalysis]=useState(null);
  const [loading,setLoading]=useState(false);

  useEffect(()=>{
    const load=async()=>{
      try{
        const {data}=await axios.get("http://localhost:8080/api/jvm/list/metrics");
        setMetrics(data);
        setChartData(p=>{
          const n=[...p,{time:new Date().toLocaleTimeString(),heap:data.usedHeap}];
          return n.slice(-20);
        });
      }catch(e){console.error(e);}
    };
    load();
    const t=setInterval(load,3000);
    return ()=>clearInterval(t);
  },[]);

  const generateHeapDump=async()=>{
    try{
      setLoading(true);
      const {data}=await axios.get("http://localhost:8080/api/heapdump/generate");
      setHeapFile(data.file||data.heapDump||"");
      alert("Heap Dump Generated");
    }finally{setLoading(false);}
  };

  const analyzeHeap=async()=>{
    if(!heapFile){alert("Generate Heap Dump First");return;}
    try{
      setLoading(true);
      const {data}=await axios.get("http://localhost:8080/api/analyze",{params:{file:heapFile}});
      setAnalysis(data);
    }finally{setLoading(false);}
  };

  return (
    <div className="container">
      <h1 className="title">HeapVortex JVM Profiler</h1>

      <div className="cards">
        <MetricCard title="CPU Usage" value={Number(metrics.cpuUsage).toFixed(2)} unit="%" icon={<FaMicrochip/>} color="#2563eb"/>
        <MetricCard title="Used Heap" value={metrics.usedHeap} unit="MB" icon={<FaMemory/>} color="#16a34a"/>
        <MetricCard title="Max Heap" value={metrics.maxHeap} unit="MB" icon={<FaServer/>} color="#7c3aed"/>
        <MetricCard title="Heap Usage" value={Number(metrics.heapUsagePercent).toFixed(1)} unit="%" icon={<FaLayerGroup/>} color="#f59e0b"/>
        <MetricCard title="Threads" value={metrics.threadCount} unit="" icon={<FaTasks/>} color="#06b6d4"/>
        <MetricCard title="Status" value="Connected" unit="" icon={<FaCheckCircle/>} color="#22c55e"/>
      </div>
<div className="section">
    <h2>3D Heap Visualization</h2>

    <Heap3D metrics={metrics} />
</div>
      <div className="graph">
        <h2>Live Heap Usage</h2>
        <HeapChart data={chartData}/>
      </div>

      <div className="buttons">
        <button disabled={loading} onClick={generateHeapDump}>Generate Heap Dump</button>
        <button disabled={loading} onClick={analyzeHeap}>Analyze Heap</button>
      </div>

      <div className="section">
        <h2>Generated Heap Dump</h2>
        <p>{heapFile||"No Heap Dump Generated"}</p>
      </div>

      <div className="section">
        <h2>Heap Analysis</h2>
        {analysis ? (
          <table><tbody>
            <tr><td>Suspected Leak</td><td>{analysis.suspectedClass}</td></tr>
            <tr><td>Retained Heap</td><td>{analysis.retainedHeapMB} MB</td></tr>
            <tr><td>Object Count</td><td>{analysis.objectCount}</td></tr>
          </tbody></table>
        ) : <p>No Analysis Yet</p>}
      </div>
    </div>
  );
}
