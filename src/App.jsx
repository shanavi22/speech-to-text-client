import { useState } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  const [transcript, setTranscript] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select an audio file first.");
    setLoading(true);
    const formData = new FormData();
    formData.append("audio", file);

    try {
      const res = await axios.post(
        "http://localhost:5000/transcribe",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setTranscript(res.data.text);
    } catch (err) {
      console.error(err);
      alert("Upload failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-blue-200 px-4">
      <div className="bg-white shadow-2xl rounded-xl p-8 w-full max-w-lg text-center border border-gray-200">
        <h1 className="text-3xl font-bold text-blue-700 mb-6">
          🎙️ Speech-to-Text
        </h1>

        <input
          type="file"
          accept="audio/*"
          onChange={handleFileChange}
          className="mb-4 w-full file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-100 file:text-blue-700
            hover:file:bg-blue-200"
        />

        <button
          onClick={handleUpload}
          disabled={loading}
          className={`w-full py-2 px-4 font-semibold rounded-lg text-white transition ${
            loading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Transcribing..." : "Upload & Transcribe"}
        </button>

        {transcript && (
          <div className="mt-6 bg-gray-100 p-4 rounded-lg text-left max-h-60 overflow-auto">
            <h2 className="text-lg font-semibold mb-2 text-blue-600">
              📝 Transcript:
            </h2>
            <p className="text-gray-800 whitespace-pre-wrap">{transcript}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
