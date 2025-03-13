import { useState, useRef } from 'react';

const DragDrop = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [progress, setProgress] = useState(0);
  const progressInterval = useRef(null);

  const preventDefaults = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    preventDefaults(e);
    setIsDragging(false);
    const files = e.dataTransfer.files;
    handleFiles(files);
  };

  const handleFiles = (files) => {
    let currentProgress = 0;
    progressInterval.current = setInterval(() => {
      currentProgress += 5;
      setProgress(currentProgress);

      if (currentProgress >= 100) {
        clearInterval(progressInterval.current);
        setTimeout(() => setProgress(0), 1000);
      }
    }, 100);
  };

  return (
    <section id="add-content">
      <div
        className={`drag-drop-area ${isDragging ? 'dragover' : ''}`}
        onDragEnter={(e) => { preventDefaults(e); setIsDragging(true); }}
        onDragOver={(e) => { preventDefaults(e); setIsDragging(true); }}
        onDragLeave={(e) => { preventDefaults(e); setIsDragging(false); }}
        onDrop={handleDrop}
      >
        <h3>Add New Content</h3>
        <p>Drag and drop files here or click to upload</p>
      </div>
      <div className="progress-bar">
        <div className="progress" style={{ width: `${progress}%` }}></div>
      </div>
    </section>
  );
};

export default DragDrop;
