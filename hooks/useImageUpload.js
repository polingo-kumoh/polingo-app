// src/hooks/useImageUpload.js
import { useMutation } from "react-query";
import axios from "axios";

function getMimeType(uri) {
  const extension = uri.split(".").pop().toLowerCase();
  const mimeTypeMap = {
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
    gif: "image/gif",
  };
  return mimeTypeMap[extension] || "application/octet-stream";
}

const imageUpload = async ({
  token,
  uri,
  name = "upload.jpg",
  default_language,
}) => {
  const type = getMimeType(uri);
  const url = `${process.env.EXPO_PUBLIC_API_URL}/api/translate/image?source-type=${default_language}`;
  const formData = new FormData();
  formData.append("image", {
    uri: uri,
    type: type,
    name: name,
  });

  const headers = {
    "Content-Type": "multipart/form-data",
    Authorization: `Bearer ${token}`,
  };

  const response = await axios.post(url, formData, { headers });
  return response.data;
};

export const useImageUpload = () => {
  return useMutation(imageUpload);
};
