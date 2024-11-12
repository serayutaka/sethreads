import React, { useState, useEffect } from "react";
import ThreadBodyEditor from "../textEditor/ThreadBodyEditor";
import ThreadTitleEditor from "../textEditor/ThreadTitleEditor";
import CourseDropdown from "./courseDropdown/CourseDropdown";
import PostThreadBtn from "../button/createThread/postThreadBtn";
import FilesCard from "../card/filesCard/FilesCard";

function formatFileSize(bytes) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const size = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + size[i];
}

const CreateThread = ({ registeredCourses, ta_course, studentId }) => {
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [showComponents, setShowComponents] = useState({
    title: false,
    dropdown: false,
    threadTitle: false,
    threadBody: false,
    button: false,
  });
  const [selectedFiles, setSelectedFiles] = useState([]);

  const isValid = title && body && selectedCourseId;

  useEffect(() => {
    const delays = {
      title: 0,
      dropdown: 25,
      threadTitle: 50,
      threadBody: 75,
      button: 100,
    };

    Object.entries(delays).forEach(([component, delay]) => {
      setTimeout(() => {
        setShowComponents((prev) => ({
          ...prev,
          [component]: true,
        }));
      }, delay);
    });
  }, []);

  function handleFileSelect(event) {
    const files = Array.from(event.target.files);
    setSelectedFiles((prev) => [...prev, ...files]);
  }

  return (
    <main className="flex overflow-y-auto w-full">
      <div className="flex flex-col min-h-full h-max gap-8 px-16 py-8 mx-auto w-[60rem] bg-neutral-800">
        <h1
          className={`mb-4 text-center text-gray-50 font-bold text-2xl transform transition-all duration-500 ease-out ${
            showComponents.title
              ? "translate-x-0 opacity-100"
              : "translate-x-full opacity-0"
          }`}
        >
          Create Thread
        </h1>

        <div
          className={`transform transition-all duration-500 ease-out ${
            showComponents.dropdown
              ? "translate-x-0 opacity-100"
              : "translate-x-full opacity-0"
          }`}
        >
          <CourseDropdown
            registeredCourses={
              ta_course ? [...registeredCourses, ta_course] : registeredCourses
            }
            setSelectedCourseId={setSelectedCourseId}
            selectedCourseId={selectedCourseId}
          />
        </div>

        <div
          className={`transform transition-all duration-500 ease-out ${
            showComponents.threadTitle
              ? "translate-x-0 opacity-100"
              : "translate-x-full opacity-0"
          }`}
        >
          <ThreadTitleEditor onChange={setTitle} />
        </div>

        <div
          className={`transform transition-all duration-500 ease-out ${
            showComponents.threadBody
              ? "translate-x-0 opacity-100"
              : "translate-x-full opacity-0"
          }`}
        >
          <ThreadBodyEditor
            onChange={setBody}
            handleFileSelect={handleFileSelect}
          />
        </div>

        {(selectedFiles.length > 0) && (
            <FilesCard
                files={selectedFiles}
                onDelete={(file) =>
                    setSelectedFiles((prev) =>
                    prev.filter((f) => f.original_filename !== file.original_filename)
                    )
                }
            />
        )}

        <div
          className={`transform transition-all duration-500 ease-out ${
            showComponents.button
              ? "translate-x-0 opacity-100"
              : "translate-x-full opacity-0"
          }`}
        >
          <PostThreadBtn
            title={title}
            body={body}
            createdBy={studentId}
            courseId={selectedCourseId}
            isValid={isValid}
            className="ml-auto"
          />
        </div>
      </div>
    </main>
  );
};

export default CreateThread;
