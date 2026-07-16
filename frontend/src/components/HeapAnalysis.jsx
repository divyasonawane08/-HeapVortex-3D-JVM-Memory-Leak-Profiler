import {
  FaBug,
  FaMemory,
  FaCube,
  FaCheckCircle
} from "react-icons/fa";

import "./HeapAnalysis.css";

export default function HeapAnalysis({ analysis }) {

  if (!analysis) {
    return (
      <div className="analysis-empty">
        <h3>No Heap Analysis Available</h3>
        <p>Generate a Heap Dump and click Analyze Heap.</p>
      </div>
    );
  }

  return (
    <div className="analysis-grid">

      <div className="analysis-card">
        <FaBug className="analysis-icon red" />
        <h3>Suspected Leak</h3>
        <h2>{analysis.suspectedClass}</h2>
      </div>

      <div className="analysis-card">
        <FaMemory className="analysis-icon green" />
        <h3>Retained Heap</h3>
        <h2>{analysis.retainedHeapMB} MB</h2>
      </div>

      <div className="analysis-card">
        <FaCube className="analysis-icon blue" />
        <h3>Object Count</h3>
        <h2>{analysis.objectCount}</h2>
      </div>

      <div className="analysis-card">
        <FaCheckCircle className="analysis-icon yellow" />
        <h3>Status</h3>
        <h2>Leak Detected</h2>
      </div>

    </div>
  );
}