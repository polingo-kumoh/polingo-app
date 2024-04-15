import { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import { Camera } from "expo-camera";

const usePermissions = () => {
  const [permissions, setPermissions] = useState({
    camera: false,
    mediaLibrary: false,
    status: "idle", // 'idle', 'requesting', 'granted', 'denied'
  });

  useEffect(() => {
    const requestPermissions = async () => {
      setPermissions((prev) => ({ ...prev, status: "requesting" }));
      const cameraPerm = await Camera.requestCameraPermissionsAsync();
      const mediaPerm = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setPermissions({
        camera: cameraPerm.status === "granted",
        mediaLibrary: mediaPerm.status === "granted",
        status: "granted",
      });
    };

    requestPermissions();
  }, []);

  return permissions;
};

export default usePermissions;
