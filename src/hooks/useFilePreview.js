
import { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";

export default function useFilePreview(fileId) {
  const [url, setUrl] = useState(null);

  useEffect(() => {
    if (!fileId) {
      setUrl(null);
      return;
    }

    const fileUrl = appwriteService.getFileView(fileId);

    setUrl(fileUrl);
  }, [fileId]);

  return url;
}

