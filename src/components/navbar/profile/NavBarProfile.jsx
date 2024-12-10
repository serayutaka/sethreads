import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const NavBarProfile = ({ name, year, resetState, studentId }) => {
  const [showButton, setShowButton] = useState(false);
  const imgRef = useRef(null);
  const buttonRef = useRef(null);
  const navigate = useNavigate();

  let yearBackground;
  switch (year) {
    case -2:
      yearBackground = "bg-teal-600";
      break;
    case -1:
      yearBackground = "bg-red-500";
      break;
    case 1:
      yearBackground = "bg-purple-500";
      break;
    case 2:
      yearBackground = "bg-blue-500";
      break;
    case 3:
      yearBackground = "bg-yellow-500";
      break;
    case 4:
      yearBackground = "bg-green-500";
      break;
    default:
      yearBackground = "bg-gray-500";
  }

  const handleClickOutside = (event) => {
    if (
      buttonRef &&
      imgRef.current &&
      !imgRef.current.contains(event.target) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target)
    ) {
      setShowButton(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative grid grid-cols-[auto,auto] gap-x-6 gap-y-1 mb-1 h-fit text-white text-right ml-10">
      <p>{name}</p>
      <img
        ref={imgRef}
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/da1e4bf63962c141c8657868b117ac6c66f46017effdd8b677ebbc75f8cd98fd?placeholderIfAbsent=true&apiKey=55e9f8a1f064422990695f1eab1a40f5"
        alt="User Avatar"
        className={`self-center col-start-2 row-start-1 row-end-3 object-contain shrink-0 aspect-square rounded-[100px] w-[2rem] hover:cursor-pointer`}
        onClick={() => setShowButton((prev) => !prev)}
      />
      {(year === -1 || year) && (
        <p
          className={`justify-self-end px-3 w-fit text-sm rounded-lg ${yearBackground}`}
        >
          {year <= -1 ? (year === -2 ? "ALUMNI" : "ADMIN") : `Year ${year}`}
        </p>
      )}
      {showButton && (
        <div className="absolute top-[85%] left-[75%] w-[6rem] z-10 bg-eerie-black p-2 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 animate-[fadeIn_0.10s_ease-in]" ref={buttonRef}>
          <button
            className=" px-2 py-2  w-full text-sm hover:bg-general-highlight text-nowrap rounded-md border border-steadfast"
            onClick={() => {
              navigate(`/profile/${studentId}`)
            }}
          >
            Profile
          </button>
          <button
            className=" px-2 py-2  w-full text-sm hover:bg-general-highlight text-nowrap rounded-md border border-steadfast"
            role="menuitem"
            onClick={() => {
              localStorage.clear();
              resetState();
              navigate("/login");
            }}
          >
            Log out
          </button>
        </div>
      )}
    </div>
  );
};

export default NavBarProfile;
