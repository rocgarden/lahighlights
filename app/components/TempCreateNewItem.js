"use client";
import { useDropzone } from "react-dropzone";
import { redirect } from "next/dist/server/api-utils";
import { useCallback, useEffect, useRef, useState } from "react";

const MAX_FILE_SIZE = 1024 * 5000; //5mb

const DropZoneUploader = (props) => {
  const [selected, setSelected] = useState();
  const formRef = useRef(null);
  //TODO => add session auth

  const [files, setFiles] = useState([]);
  const [rejected, setRejected] = useState([]);
  const [errorStatus, setErrorStatus] = useState(null);

  //TODO- add categories

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    if (acceptedFiles?.length) {
      setFiles((previousFiles) => [
        ...acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
            mediaType: file.type.split("/")[0],
          })
        ),
      ]);
    }

    if (rejectedFiles?.length) {
      setRejected((prev) => [...prev, ...rejectedFiles]);
    }
  }, []);

  const removeRejected = (name) => {
    setRejected((prev) => prev.filter(({ file }) => file.name !== name));
  };

  const removeFile = (name) => {
    setFiles((prev) => prev.filter((file) => file.name !== name));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/*": [".jpeg", ".jpg", ".png"],
      "video/*": [".mp4", ".mov", ".webm"],
    },
    maxSize: MAX_FILE_SIZE,
    maxFiles: 1,
    onDrop,
  });

  useEffect(() => {
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  async function action(data) {
    const file = files[0];
    if (!file) return;

    //validate file type & size before calling s3
    if (!file.type.startsWith("image") && !file.type.startsWith("video")) {
      setErrorStatus("Unsupportd file type.");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setErrorStatus("File is too large. Max size is 5MB.");
      return;
    }

    try {
      //Step1: request signed url from backend
      const res = await fetch("api/upload", {
        method: "POST",
        body: JSON.stringify({
          filename: file.name,
          filename: file.type,
        }),
        headers: { "Content-Type": "application/json" },
      });

      const { uploadUrl, fileUrl } = await res.json();
      console.log("🖼️ File will be accessible at:", fileUrl); // ✅ this is the S3 file URL

      //Step 2: upload file directly to S3
      const uploadRes = await fetch(uploadUrl, {
        method: "PUT",
        headers: {
          "Content-Type": file.type,
        },
        body: file,
      });

      if (!uploadRes.ok) {
        const text = await uploadRes.text();
        console.log("upload failed:: ", uploadRes.status, text);
        return;
      }

        // // Step 3: Save post entry to DB
        //     const result = await addEntry(data, category, creator, {
        //       fileUrl,
        //       mediaType: file.type.startsWith('video') ? 'video' : 'image'
        //     });

        //     if (result?.error) {
        //       setErrorStatus(result.error);
        //       throw new Error();
        //     } else {
        //       formRef.current?.reset();
        //       setFiles([]);
        //       setRejected([]);
        //       setErrorStatus(null);
        //     }
    } catch (err) {
      console.log(err);
      setErrorStatus("Something went wrong while uploading.");
    }
  }
  return (
    <form ref={formRef} action={action}>
      <div {...getRootProps()} className="dropzone">
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the file here ...</p>
        ) : (
          <p>Drag & drop an image or video here, or click to select a file</p>
        )}
      </div>

      {files?.length > 0 && (
        <div className="mt-6 grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {files?.map((file) =>
            file.mediaType === "video" ? (
              <div key={file.name}>
                <video src={file.preview} controls width="250" />
                <button type="button" onClick={() => removeFile(file.name)}>
                  Remove Video
                </button>
              </div>
            ) : (
              <div key={file.name}>
                <img src={file.preview} alt={file.name} width="250" />
                <button type="button" onClick={() => removeFile(file.name)}>
                  Remove Image
                </button>
              </div>
            )
          )}
        </div>
      )}

      {rejected.length > 0 && (
        <div className="rejected-files">
          <h4>Rejected Files</h4>
          <ul>
            {rejected.map(({ file, errors }) => (
              <li key={file.name}>
                {file.name} - {file.size} bytes
                <ul>
                  {errors?.map((e) => (
                    <li key={e.code}>{e.message}</li>
                  ))}
                </ul>
                <button type="button" onClick={() => removeRejected(file.name)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {errorStatus && (
        <div className="error-message">
          <p style={{ color: "red" }}>{errorStatus}</p>
        </div>
      )}

      {/* Example input fields */}
      <input type="text" name="name" placeholder="Name" required />
      <textarea name="content" placeholder="Content..." required />

      {/* Simulated category selector */}
      <select onChange={(e) => setSelected({ name: e.target.value })}>
        <option value="">Select Category</option>
        <option value="art">Art</option>
        <option value="tech">Tech</option>
        <option value="travel">Travel</option>
      </select>

      <button type="submit">Submit</button>
    </form>
  );
};

export default DropZoneUploader;
