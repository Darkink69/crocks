// import React from 'react';

const ProgressBar = () => {
  return (
    <div className="pt-4">
      <div className="bg-[#2B2A2A] h-[30px] rounded-full p-2">
        <div className="flex flex-row gap-2">
          <div className="bg-gradient-to-b from-[#FFD343] to-[#E04F1F] rounded-full w-[93%] h-[16px]"></div>
          <div className="h-[16px] w-[7%]">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.1794 8.46124C16.1265 8.35985 16.0469 8.27489 15.9492 8.21561C15.8514 8.15632 15.7393 8.12498 15.625 8.12499H11.5625V1.87499C11.5624 1.74213 11.5199 1.61276 11.4413 1.50565C11.3627 1.39855 11.252 1.31928 11.1253 1.27937C10.9985 1.23945 10.8624 1.24095 10.7366 1.28366C10.6108 1.32636 10.5019 1.40805 10.4256 1.51687L3.86311 10.8919C3.79764 10.9855 3.75909 11.0953 3.75166 11.2094C3.74423 11.3234 3.7682 11.4373 3.82098 11.5386C3.87375 11.64 3.9533 11.7249 4.05097 11.7842C4.14865 11.8435 4.26072 11.8749 4.37499 11.875H8.43749V18.125C8.43759 18.2579 8.48004 18.3872 8.55866 18.4943C8.63728 18.6014 8.74798 18.6807 8.87471 18.7206C9.00143 18.7605 9.13758 18.759 9.26339 18.7163C9.3892 18.6736 9.49813 18.5919 9.57436 18.4831L16.1369 9.10812C16.2024 9.01449 16.241 8.90467 16.2485 8.79062C16.256 8.67657 16.2321 8.56264 16.1794 8.46124Z"
                fill="url(#paint0_linear_42_235)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_42_235"
                  x1="10.0001"
                  y1="1.25049"
                  x2="10.0001"
                  y2="18.7495"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#FFD343" />
                  <stop offset="1" stopColor="#E04F1F" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>
      <span className="pl-2 font-maven-pro text-white text-sm">100/100</span>
    </div>
  );
};

export default ProgressBar;
