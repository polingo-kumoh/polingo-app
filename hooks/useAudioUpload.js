// src/hooks/useImageUpload.js
import { useMutation } from "react-query";
import axios from "axios";

const getMimeType = (uri) => {
  const extension = uri.split(".").pop();
  switch (extension) {
    case "mp3":
      return "audio/mp3";
    case "flac":
      return "audio/flac";
    case "wav":
      return "audio/wav";
    case "webm":
      return "audio/webm";
    default:
      return `audio/${extension}`;
  }
};

const audioUpload = async ({ token, uri, default_language }) => {
  const mimeType = getMimeType(uri);
  const url = `${process.env.EXPO_PUBLIC_API_URL}/api/translate/voice?source-type=${default_language}`;
  const formData = new FormData();
  formData.append("voice", {
    uri: uri,
    type: mimeType,
    name: "recorded_audio." + mimeType.split("/")[1],
  });

  const headers = {
    "Content-Type": "multipart/form-data",
    Authorization: `Bearer ${token}`,
  };

  const response = await axios.post(url, formData, { headers });
  return response.data;
};

export const useAudioUpload = () => {
  return useMutation(audioUpload);
};
