import React, { useState } from 'react';
import axios from 'axios';
import ProfileCard from './ProfileCard';
import ProfileAlert from './alert/ProfileAlert';

function ProfileDisplay({ studentInfo, handleOnUpdate }) {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [EditCourse, setEditCourse] = useState(false);
  const [isClose, setIsClose] = useState(false);
  
  if (studentInfo.length === 0) {
    return (
      <div className='w-full mt-14'>
        <h1 className='text-white text-center text-xl mx-auto'>No students found</h1>
      </div>
      )
  }

  function handleCardClick(student) {
    if (student.is_ta) {
      axios.get(`${process.env.REACT_APP_SERVER_DOMAIN_NAME}/api/student/get-courses?course_id=${student.ta_course_id}`, {
        headers: {
          "x-token": localStorage.getItem("token"),
        },
      }).then((res) => {
        setSelectedStudent({ ...student, courseTAInfo: res.data });
        setIsAlertOpen(true);
        setIsClose(false);
      })
    } else {
      setSelectedStudent(student);
      setIsAlertOpen(true);
      setIsClose(false);
    }
    setEditCourse(false);
  }

  function handleOnchangeStudent(data, mode) {
    if (mode === "TA") {
      if (data.ta_course_id === "null" || data.ta_course_id === null) {
        setSelectedStudent((prevStudent) => ({ ...prevStudent, is_ta: false }));
        handleOnUpdate();
      } else {
        setSelectedStudent((prevStudent) => ({ ...prevStudent, is_ta: true, courseTAInfo: data }));
        handleOnUpdate();
      }
    } else if (mode === "Course") {
      setSelectedStudent((prevStudent) => ({ ...prevStudent, registered: data.registered }));
      handleOnUpdate();
      setEditCourse(true);
    }
  }

  return (
    <div className='self-stretch grid grid-cols-[repeat(auto-fill,minmax(18rem,1fr))] mt-14 mx-6 justify-items-center gap-5 animate-[fadeIn_0.15s_ease-in]'>
      {studentInfo.map((student) => (
          <ProfileCard key={student.id} student={student} onclick={() => handleCardClick(student)} />
      ))}
      <ProfileAlert 
        isOpen={isAlertOpen}
        isClose={isClose}
        onClose={() => {
          setIsClose(true);
          setTimeout(() => {
            setIsAlertOpen(false)
          }, 150)
        }}
        setStudent={handleOnchangeStudent}
        EditCourse={EditCourse}
      >
        {selectedStudent && (selectedStudent)}
      </ProfileAlert>
    </div>
  )
}

export default ProfileDisplay