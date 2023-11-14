import React, { createContext, useContext, useEffect, useState } from "react";
import { useNuiEvent } from "../hooks/useNuiEvent";
import { fetchNui } from "../utils/fetchNui";
import { isEnvBrowser } from "../utils/misc";

import { selectedData } from "../components/Store";

const VisibilityCtx = createContext<VisibilityProviderValue | null>(null);

interface VisibilityProviderValue {
  setVisible: (visible: boolean) => void;
  visible: boolean;
}

export const VisibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const { reset } = selectedData();

  const handleClose = (isVisible: boolean) => {
    reset();
    setVisible(isVisible);
  };

  useNuiEvent<boolean>("setVisible", handleClose);

  useEffect(() => {
    if (!visible) return;

    const keyHandler = (e: KeyboardEvent) => {
      if (["Backspace", "Escape"].includes(e.code)) {
        if (!isEnvBrowser()) {
          reset();
          fetchNui("hideFrame")
        } else {
          setVisible(!visible);
        }
      }
    };

    window.addEventListener("keydown", keyHandler);

    return () => window.removeEventListener("keydown", keyHandler);
  }, [visible]);

  return (
    <VisibilityCtx.Provider
      value={{
        visible,
        setVisible,
      }}
    >
    <div style={{ display: visible ? 'block' : 'none', height: '100%', transition: 'display 0s' }}>
      {children}
    </div>
    </VisibilityCtx.Provider>
  );
};

export const useVisibility = () => useContext<VisibilityProviderValue>(VisibilityCtx as React.Context<VisibilityProviderValue>);
