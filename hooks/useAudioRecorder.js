import { useState } from "react";
import { Audio } from "expo-av";

const useAudioRecorder = () => {
  const [recording, setRecording] = useState();
  const [recordUri, setRecordUri] = useState(null);
  const [isRecording, setIsRecording] = useState(false);

  const startRecording = async () => {
    try {
      console.log("Requesting permissions..");
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      const { recording } = await Audio.Recording.createAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      setRecording(recording);
      setIsRecording(true);
    } catch (err) {
      console.error("Failed to start recording", err);
      setIsRecording(false);
    }
  };

  const stopRecording = async () => {
    if (recording) {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      setRecordUri(uri);
    }
    setRecording(null);
    setIsRecording(false);
  };

  return {
    startRecording,
    stopRecording,
    recordUri,
    isRecording,
  };
};

export default useAudioRecorder;
