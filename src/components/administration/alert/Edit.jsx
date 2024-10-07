import React, { useState, useRef } from "react";

const Edit = ({ inputTACourse, handleInputTACourse, isEditCourses, toggleEditCourses, handleSetTA }) => {
    const [isEditTA, setIsEditTA] = useState(false);

    const inputTARef = useRef(null);

    function toggleEditTA() {
        setIsEditTA(true);
        inputTARef.current.disabled = false;
        inputTARef.current.focus();
    }


    return (
        <div className="flex flex-col justify-evenly items-end">
            <div className="flex w-full justify-evenly items-center">
                <p className="text-white text-lg">TA Course ID :</p>
                <input type="text" ref={inputTARef} className={`w-1/2 bg-eerie-black ${ isEditTA ? "text-white" : "text-neutral-700" } rounded-lg p-2 border ${ isEditTA ? "border-software-orange": "border-neutral-700" } outline-none focus:border-software-orange focus:text-white focus:bg-steadfast transition duration-300`} placeholder="N/A" disabled={isEditTA ? false : true} value={inputTACourse} onChange={handleInputTACourse} />       
                <button className="bg-software-orange hover:bg-software-orange-hover text-white font-bold py-2 px-2 rounded-lg" onClick={ isEditTA ? handleSetTA : toggleEditTA }>{ isEditTA ? "Set TA" : "Edit TA" }</button>
            </div>
            <div className="flex w-full justify-center items-center">
                <button className="bg-software-orange hover:bg-software-orange-hover text-white font-bold py-2 px-2 rounded-lg" onClick={ toggleEditCourses }>{ isEditCourses ? "View Mode" : "Edit Courses"}</button>            
            </div>
        </div>
    );
}

export default Edit;