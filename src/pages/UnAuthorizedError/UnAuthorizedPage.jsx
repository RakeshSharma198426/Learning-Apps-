import { useEffect } from "react";
import { Box } from "@mui/material";
import { useMsal } from "@azure/msal-react";
import { useNavigate } from "react-router-dom";
import "./UnAuthorizedPage.scss";
import Header from "../../components/Header/header";
import RoundedButton from "../../components/Button/RoundedButton";
import { LocaleStrings } from "../../constants/locale-strings";

const UnAuthorizedPage = () => {
  const navigate = useNavigate();
  const { instance } = useMsal();
  const { roleBaseErrorScreen } = LocaleStrings;
  useEffect(() => {
    const hasError = sessionStorage.getItem("authError");
    if (!hasError) {
      navigate("/", { replace: true });
    }
  }, []);
  const handleLogout = () => {
    instance.logoutRedirect({ postLogoutRedirectUri: "/" });
    sessionStorage.clear();
  };
  return (
    <>
      <Header />
      <div className="unauthorized-page-wrapper">
        <div className="unauthorized-page-content">
          <Box
            component="img"
            src="/assets/svg/Circle_Cross_Icon.svg"
            alt="Error"
          />
          <div className="text-montserrat-24-bold unauthorized-page-content-title">
            {roleBaseErrorScreen.title}
          </div>
          <div className="unauthorized-page-content-helper-text text-montserrat-16-medium">
            {roleBaseErrorScreen.helperText1}
            <span className="text-montserrat-16-semi-bold emphasized-text">
              {" "}
              {roleBaseErrorScreen.helperText2}
            </span>
            {roleBaseErrorScreen.helperText3}
          </div>
          <RoundedButton
            text={roleBaseErrorScreen.loginAgainButtonText}
            variant="primary-large"
            onClick={handleLogout}
            height={48}
            width={171}
          />
        </div>
      </div>
    </>
  );
};
export default UnAuthorizedPage;
