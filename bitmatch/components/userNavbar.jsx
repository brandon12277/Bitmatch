// BottomNavbar.js
import React from 'react';

const BottomNavbar = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gray  py-4  ">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center">
          <a href="/Profile" className="text-gray-800 hover:text-gray-600"><i class="fa-solid fa-user"></i></a>
          <a href="/communities" className="text-gray-800 hover:text-gray-600"><i class="fa-solid fa-users-viewfinder"></i></a>
          <a href="/" className="text-gray-800 hover:text-gray-600"> BitMatch </a>
          <a href="/matches" className="text-gray-800 hover:text-gray-600"><i class="fa-solid fa-heart"></i></a>
        </div>
      </div>
    </nav>
  );
};

export default BottomNavbar;
