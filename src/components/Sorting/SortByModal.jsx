import React, { useState } from "react";
import "./SortByModal.css";
import { LocaleStrings } from "../../constants/locale-strings";

const SortByModal = ({ label, selected, options, onChange }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="sort-by-container" data-testid="sort-by-modal">
      <button
        className="text-montserrat-16-bold sort-by-toggle "
        onClick={() => setOpen(!open)}
        data-testid="sort-by-toggle"
      >
        <span>{LocaleStrings.sortByText}</span>
        <img
          src="/assets/svg/Sorting.svg"
          alt="Sort arrow"
          className="sort-arrow-icon"
        />
      </button>

      {open && (
        <div className="sort-by-dropdown" data-testid="sort-by-dropdown">
          <div
            className="text-montserrat-14-regular sort-by-header"
            data-testid="sort-by-label"
          >
            <span>{label}</span>
            <img
              src={
                selected.direction === "asc"
                  ? "/assets/svg/Chevron-Up.svg"
                  : "/assets/svg/Chevron-Down.svg"
              }
              alt="Sort arrow"
              className="sort-arrow-icon"
            />
          </div>

          {options.map((option) => {
            const isSelected =
              option.field === selected.field &&
              option.direction === selected.direction;

            return (
              <button
                key={`${option.field}_${option.direction}`}
                data-testid={`sort-by-option-${option.direction}`}
                className={`${
                  isSelected
                    ? "text-montserrat-14-bold"
                    : "text-montserrat-14-regular"
                } sort-by-option`}
                onClick={() => {
                  onChange(option);
                  setOpen(false);
                }}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SortByModal;
