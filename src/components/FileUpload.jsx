import React, { useState } from 'react';
import FileSize from "./FileSize";
const FileUpload = () => {
    const [fileSize, setFileSize] = useState(0);
  
    const handleFileDrop = (event) => {
      event.preventDefault();
      const file = event.dataTransfer.files[0];
      if (file) {
        setFileSize(file.size);
      }
    };
  
    const handleDragOver = (event) => {
      event.preventDefault();
    };
  
    return (
      <div
        onDrop={handleFileDrop}
        onDragOver={handleDragOver}
      >
        <FileSize fileSize={fileSize} />
      </div>
    );
  };
  export default FileUpload