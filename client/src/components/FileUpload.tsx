import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import { useNavigate } from 'react-router';

const FileUpload: React.FC = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [data, setData] = useState<any[]>([]);
  const [errors, setErrors] = useState({
    file: '',
  });

  const readFileAsText = (file: File) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        resolve(event.target?.result);
      };
      reader.onerror = () => {
        reject(new Error('Error reading the file'));
      };
      reader.readAsText(file);
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;

    if (selectedFile && selectedFile.type !== 'text/csv') {
      setErrors({ file: 'Please upload a valid CSV file' });
      setFile(null);
      return;
    }

    setFile(selectedFile);
    setErrors({ file: '' });
  };

  const validateFile = (): boolean => {
    if (!file) {
      setErrors({ file: 'No file selected. Please upload a file' });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!validateFile()) return;
  
    try {
      const csvContent = await readFileAsText(file!);
      Papa.parse(csvContent, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          setData(results.data);
          setErrors({ file: '' });
        },
        error: (err) => {
          setErrors({ file: `Error parsing CSV: ${err.message}` });
        },
      });
    } catch (error) {
      setErrors({ file: error.message });
    }
  };

useEffect(() => {
  console.log(data.length)
})

  return (
    <div className="container mt-5">
      <h2 className="text-center">Upload CSV</h2>
      <form className="mt-4" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="csvFile" className="form-label">
            CSV File
          </label>
          <input
            type="file"
            className={`form-control ${errors.file ? 'is-invalid' : ''}`}
            id="csvFile"
            accept=".csv"
            onChange={handleFileChange}
          />
          {errors.file && <div className="invalid-feedback">{errors.file}</div>}
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Process File
        </button>
      </form>
      <button type="submit" className="btn btn-primary w-100" disabled={data.length == 0 ? true : false}   onClick={() => navigate("/training", { state: { parsedData: data } })}>
          Next
        </button>
      {data.length > 0 && (
        <div className="mt-4">
          <h4>Parsed Data</h4>
          <table className="table table-striped">
            <thead>
              <tr>
                {Object.keys(data[0]).map((key) => (
                  <th key={key}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={index}>
                  {Object.values(row).map((value, i) => (
                    <td key={i}>{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
