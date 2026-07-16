import axios from "axios";

function AnalyzeButton() {

    const analyzeHeap = async () => {

        try {

            const response = await axios.get(
                "http://localhost:8080/api/analyze",
                {
                    params: {
                        file: "heap-dumps/heapdump_1784014146728.hprof"
                    }
                }
            );

            console.log(response.data);

        } catch (error) {

            console.error(error);

        }

    };

    return (
        <button onClick={analyzeHeap}>
            Analyze Heap
        </button>
    );

}

export default AnalyzeButton;