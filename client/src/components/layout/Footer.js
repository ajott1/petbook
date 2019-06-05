import React from "react";

export default () => {
  return (
    <div>
      <footer className="custom-footer-color text-center mt-5 p-4">
        <span className="text-white">
          Copyright &copy; {new Date().getFullYear()} PetBook
        </span>
      </footer>
    </div>
  );
};
