import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import "../CustomPagination/CustomPagination.scss";
import { LocaleStrings } from "../../../constants/locale-strings";

const CustomPagination = ({ count, page, onChange }) => {
  const { customPagination } = LocaleStrings;
  const handlePrev = () => {
    if (page > 1) onChange(null, page - 1);
  };

  const handleNext = () => {
    if (page < count) onChange(null, page + 1);
  };

  return (
    <div className="custom-pagination-wrapper">
      <div
        className={`custom-pagination-wrapper-previous ${
          page === 1 ? "cursor-not-allowed" : "cursor-pointer"
        }`}
        onClick={handlePrev}
      >
        <ArrowBackIcon
          className={`arrow-icon ${
            page === 1 ? "grey-icon" : "blue-text-icon"
          }`}
        />
        <span
          className={`text-montserrat-12-bold-16-line ${
            page === 1 ? "grey-text" : "blue-text-icon"
          }`}
        >
          {customPagination.previous}
        </span>
      </div>

      <div className="custom-pagination-wrapper-numbers">
        {[...Array(count)].map((_, index) => (
          <div
            key={index}
            onClick={() => onChange(null, index + 1)}
            className={
              page === index + 1 ? "active-numbers" : "inactive-numbers"
            }
          >
            {index + 1}
          </div>
        ))}
      </div>

      <div
        className={`custom-pagination-wrapper-next ${
          page === count ? "cursor-not-allowed" : "cursor-pointer"
        }`}
        onClick={handleNext}
      >
        <span
          className={`text-montserrat-12-bold-16-line ${
            page === count ? "grey-text" : "blue-text-icon"
          }`}
        >
          {customPagination.next}
        </span>
        <ArrowForwardIcon
          className={`arrow-icon ${
            page === count ? "grey-icon" : "blue-text-icon"
          }`}
        />
      </div>
    </div>
  );
};

export default CustomPagination;
