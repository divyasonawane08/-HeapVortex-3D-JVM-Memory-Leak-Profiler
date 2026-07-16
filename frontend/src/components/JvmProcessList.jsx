import { useEffect, useState } from "react";
import axios from "axios";

export default function JvmProcessList() {

    const [processes, setProcesses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");

    useEffect(() => {
        loadProcesses();
    }, []);

    async function loadProcesses() {
        try {

            const response = await axios.get(
                "http://localhost:8080/api/jvms"
            );

            setProcesses(response.data);

        } catch (e) {

            console.error(e);

            setMessage("Unable to load JVM processes.");

        } finally {

            setLoading(false);

        }
    }

    async function connectToJvm(pid) {

        try {

            const response = await axios.post(
                "http://localhost:8080/api/jmx/connect",
                null,
                {
                    params: {
                        pid: pid
                    }
                }
            );

            setMessage(response.data);

        } catch (e) {

            console.error(e);

            if (e.response) {
                setMessage(e.response.data);
            } else {
                setMessage("Connection failed.");
            }
        }
    }

    if (loading) {
        return <h3>Loading JVM Processes...</h3>;
    }

    return (
        <div style={{ padding: 20 }}>

            <h2>Running JVM Processes</h2>

            {message && (
                <div
                    style={{
                        background: "#dff0d8",
                        padding: 10,
                        marginBottom: 20
                    }}
                >
                    {message}
                </div>
            )}

            <table
                border="1"
                cellPadding="10"
                style={{
                    width: "100%",
                    borderCollapse: "collapse"
                }}
            >
                <thead>
                    <tr>
                        <th>PID</th>
                        <th>Process Name</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>

                    {processes.map((process) => (

                        <tr key={process.pid}>

                            <td>{process.pid}</td>

                            <td>{process.displayName}</td>

                            <td>

                                <button
                                    onClick={() =>
                                        connectToJvm(process.pid)
                                    }
                                >
                                    Connect
                                </button>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );
}