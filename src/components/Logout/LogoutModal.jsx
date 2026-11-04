import React from "react";
import { Dialog, DialogTitle, DialogActions, IconButton } from "@mui/material";
import RoundedButton from "../Button/RoundedButton";
import { LocaleStrings } from "../../constants/locale-strings";
import "./LogoutModal.scss";

const { logoutModal } = LocaleStrings;
const BUTTON_HEIGHT = 48;
const BUTTON_WIDTH = 208;

const LogoutModal = ({ open, onClose, onLogout }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        className: "logout-modal",
      }}
    >
      <IconButton onClick={onClose} className="close-button" aria-label="close">
        <img
          src="/assets/svg/Modal_Cross_Icon.svg.svg"
          alt="Close"
          className="closeIcon"
        />
      </IconButton>

      <DialogTitle className="modal-title">
        <div className={`text-lora-24-bold`}>{logoutModal.title}</div>
      </DialogTitle>

      <DialogActions className="modal-actions">
        <RoundedButton
          text={logoutModal.primaryButtonText}
          variant="primary-large"
          onClick={onLogout}
          height={BUTTON_HEIGHT}
          width={BUTTON_WIDTH}
          testId="left-button"
        />
        <RoundedButton
          text={logoutModal.secondaryButtonText}
          variant="secondary-large"
          onClick={onClose}
          height={BUTTON_HEIGHT}
          width={BUTTON_WIDTH}
          testId="right-button"
        />
      </DialogActions>
    </Dialog>
  );
};

export default LogoutModal;
