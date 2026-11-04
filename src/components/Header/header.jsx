import React, { useState } from "react";
import { Box, TextField, InputAdornment } from "@mui/material";
import { LocaleStrings } from "../../constants/locale-strings";

const Header = ({ onSearch, isSearchBar = false }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const { search } = LocaleStrings;

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch(value); // fixed to use updated value
  };

  return (
    <Box boxShadow={0} m={0} data-testid="header-root">
      <Box
        boxShadow={0}
        m={0}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bgcolor="#fff"
        sx={{
          paddingLeft: "72px",
          paddingRight: "72px",
          py: 2,
        }}
        data-testid="header-bar"
      >
        <img
          src="/assets/svg/Logo.svg"
          alt="Logo"
          data-testid="logo"
          style={{ height: "40px", width: "auto" }}
        />

        {isSearchBar && (
          <div width="100%" data-testid="search-wrapper">
            <TextField
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder={search}
              variant="outlined"
              fullWidth
              inputProps={{
                "data-testid": "search-input",
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <img
                      src="assets/svg/Search.svg"
                      alt="Search"
                      width={16}
                      height={16}
                      data-testid="search-icon"
                    />
                  </InputAdornment>
                ),
                sx: {
                  height: "40px",
                  width: {
                    xs: "100px",
                    sm: "540px",
                  },
                  borderRadius: "25px",
                  backgroundColor: "#E9E9E9",
                  fontFamily: "Montserrat, helvetica",
                  fontSize: "14px",
                },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "25px",
                  backgroundColor: "#E9E9E9",
                },
              }}
            />
          </div>
        )}
      </Box>

      <hr
        data-testid="header-divider"
        style={{
          position: "absolute",
          marginTop: 0,
          width: "100%",
          height: "1px",
          backgroundColor: "#121212",
          opacity: "0.08",
          border: "none",
        }}
      />
    </Box>
  );
};

export default Header;
