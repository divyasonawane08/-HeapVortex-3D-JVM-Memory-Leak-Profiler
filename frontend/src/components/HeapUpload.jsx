import { useState } from "react";
import api from "../services/graphApi";
function HeapUpload() {

    const [file, setFile] = useState(null);

    const upload = async () => {

        const formData = new FormData();

        formData.append("file", file);

        const response = await api.post("/api/heapdump", formData);

        alert(response.data);

    };

    return (

        <div>

            <h2>Upload Heap Dump</h2>

            <input
                type="file"
                accept=".hprof"
                onChange={(e) => setFile(e.target.files[0])}
            />

            <button onClick={upload}>
                Upload
            </button>

        </div>

    );

}

export default HeapUpload;