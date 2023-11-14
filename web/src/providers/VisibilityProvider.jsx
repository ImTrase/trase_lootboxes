import React, { createContext, useContext, useEffect, useState } from "react";
import { useNuiEvent } from "../hooks/useNuiEvent";
import { fetchNui } from "../utils/fetchNui";
import { isEnvBrowser } from "../utils/misc";

import { selectedData } from "../components/Store";

const VisibilityCtx = createContext(null);

const VisibilityProvider = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const { reset, openingBox } = selectedData();

  const handleClose = (isVisible) => {
    reset();
    setVisible(isVisible);
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
