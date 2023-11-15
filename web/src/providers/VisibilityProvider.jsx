import React, { createContext, useContext, useEffect, useState } from "react";
import { useNuiEvent } from "../hooks/useNuiEvent";
import { fetchNui } from "../utils/fetchNui";
import { isEnvBrowser } from "../utils/misc";

import { selectedData, setConfig } from "../components/Store";

const VisibilityCtx = createContext(null);

const VisibilityProvider = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const { reset, openingBox, setOpeningBox, setSelectedBox } = selectedData();

  const { config } = setConfig();

  const handleClose = (data) => {
    reset();

    if (data.isVisible) {
      if (config.UseableItems && data.crateKey !== null) {
        setSelectedBox(data.crateKey); // lets set our data first
        setOpeningBox(true); // then say we are opening a box
        setVisible(data.isVisible); // then set the visibility
        console.log('yes')
      } else {
        setVisible(data.isVisible);
      }
    } else {
      setVisible(data.isVisible);
    }
  };

  useNuiEvent("setVisible", handleClose);

  useEffect(() => {
    if (!visible) return;

    const keyHandler = (e) => {
      if (["Backspace", "Escape"].includes(e.code)) {
        if (!isEnvBrowser()) {
          if (openingBox === false) {
            reset();
            fetchNui("hideFrame");
          }
        } else {
          setVisible(!visible);
        }
      }
    };

    window.addEventListener("keydown", keyHandler);

    return () => window.removeEventListener("keydown", keyHandler);
  }, [visible, openingBox, reset]);

  return (
    <VisibilityCtx.Provider
      value={{
        visible,
        setVisible,
      }}
    >
      <div style={{ display: visible ? "block" : "none", height: "100%", transition: "display 0s" }}>
        {children}
      </div>
    </VisibilityCtx.Provider>
  );
};

const useVisibility = () => useContext(VisibilityCtx);

export { VisibilityProvider, useVisibility };
