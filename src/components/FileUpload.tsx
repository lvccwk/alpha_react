import React, { useState } from 'react';
import { fetchFile } from '../api/fetchAll';
function FileUpload() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileInput = (e: any) => {
    setSelectedFile(e.target.files[0]);
    console.log(e.target.files[0])
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // TODO: Handle file upload
    if (!selectedFile) {
      console.error('No file selected');
      return;
    }
    try {
      console.log(selectedFile);
      await fetchFile(selectedFile);
      console.log('File uploaded successfully');
    } catch (error) {
      console.log(error);
    }

  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileInput} />
      <br></br>
      <button type="submit">UPLOAD</button>
    </form>
  );
}

export default FileUpload;
