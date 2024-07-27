import React, { useState, useContext } from "react";
import UserContext from "../../UserContext/UserContext";
import "./DocumentUpload.css"; // Make sure to create this CSS file for styling
import TextField from "@mui/material/TextField";
import { appBarClasses } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const DocumentUpload = () => {
  const [personName, setPersonName] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [documentName, setDocumentName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const { files } = useContext(UserContext);
  const { setFiles } = useContext(UserContext);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setSelectedFiles(selectedFiles);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const fileData = selectedFiles.map((file) => ({
      file,
      url: URL.createObjectURL(file),
      personName: personName,
      documentName: documentName,
      expiryDate: expiryDate,
    }));
    setFiles((prevFiles) => [...prevFiles, ...fileData]);
    // Clear form fields
    setPersonName("");
    setDocumentName("");
    setExpiryDate("");
    setSelectedFiles([]);


    axios.post("http://localhost:5000/api/upload", { fileData, personName, documentName, expiryDate })
      .then(result => console.log(result))
      .catch(err => console.log(err));
       navigate('/');
       setUser(true);
  };

  const openDocument = (url) => {
    window.open(url, "_blank");
  };

  const deleteDocument = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  return (
    <section className="document-wrapper">
      <div className="innerWidth flexColStart paddings document-container">
        <h1 className="primaryText">Upload Your Documents</h1>
        <span className="secondaryText">
          Upload your important documents here and stay ahead by preventing last
          moment hassles and track their expiry dates
        </span>
        <div className="document-main">
          <div className="document-left">
            <form className="paddings document-details" onSubmit={handleSubmit}>
              <span className="form-item">
                <label htmlFor="">User Name/ Car Model </label>
                <TextField
                  className="input"
                  id="outlined-basic"
                  variant="outlined"
                  value={personName}
                  onChange={(e) => setPersonName(e.target.value)}
                />
              </span>
              <span className="form-item">
                <label htmlFor="">Document Name </label>
                <TextField
                  className="input"
                  id="outlined-basic"
                  variant="outlined"
                  value={documentName}
                  onChange={(e) => setDocumentName(e.target.value)}
                />
              </span>
              <span className="form-item">
                <label htmlFor="">Expiry Date</label>
                <TextField
                  className="input  "
                  id="outlined-basic"
                  variant="outlined"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  type="date"
                />
              </span>
              <input
                className="input-file"
                type="file"
                onChange={handleFileChange}
                multiple
                required
              />
              <button className="button" type="submit">
                Upload
              </button>
            </form>
          </div>
          <div className="document-right">
            {files.length === 0 ? (
              <>
                <img src="./emptyDocuments.avif" alt="" width={500} />
              </>
            ) : (
              <div className="document-grid">
                {files.map((fileData, index) => (
                  <div key={index} className="document-item">
                    <img
                      src="documentThumbnail.png" // Replace with your placeholder image
                      alt="Document Thumbnail"
                      style={{
                        cursor: "pointer",
                        width: "100px",
                        height: "100px",
                      }}
                      onClick={() => openDocument(fileData.url)}
                    />
                    <p>{fileData.personName}</p>
                    <p>{fileData.documentName}</p>
                    <p>{fileData.expiryDate}</p>
                    <button
                      className="delete-button"
                      onClick={() => deleteDocument(index)}
                    >
                      Delete <i className="fa-solid fa-trash"></i>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DocumentUpload;


// // const formData = new FormData();
// selectedFiles.forEach((file) => {
//   formData.append("file", file);
// });
// formData.append("personName", personName);
// formData.append("documentName", documentName);
// formData.append("expiryDate", expiryDate);

// try {
//   const result = await axios.post("http://localhost:5000/api/upload", formData, {
//     headers: {
//       "Content-Type": "multipart/form-data",
//     },
//   });
//   console.log(result);