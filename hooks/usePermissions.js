import { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import { Audio } from "expo-av";
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
      const audioPerm = await Audio.requestPermissionsAsync(); //

      setPermissions({
        camera: cameraPerm.status === "granted",
        mediaLibrary: mediaPerm.status === "granted",
        microphone: audioPerm.status === "granted",
        status: "granted",
      });
    };

    requestPermissions();
  }, []);

  return permissions;
};

export default usePermissions;
