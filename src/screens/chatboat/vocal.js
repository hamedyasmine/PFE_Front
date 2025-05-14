import { ReactMic } from 'react-mic';

function VoiceRecorder() {
  const [record, setRecord] = useState(false);

  const startRecording = () => setRecord(true);
  const stopRecording = () => setRecord(false);

  const onStop = (recordedBlob) => {
    console.log('Recorded Blob:', recordedBlob);
    // Envoyer le fichier audio à ton backend
  };

  return (
    <div>
      <ReactMic
        record={record}
        className="sound-wave"
        onStop={onStop}
        mimeType="audio/webm"
      />
      <button onClick={startRecording}>Start</button>
      <button onClick={stopRecording}>Stop</button>
    </div>
  );
}
