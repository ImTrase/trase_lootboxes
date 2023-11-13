import React, { createContext, useContext, useEffect, useState } from "react";
import { useNuiEvent } from "../hooks/useNuiEvent";
import { fetchNui } from "../utils/fetchNui";
import { isEnvBrowser } from "../utils/misc";

const VisibilityCtx = createContext<OpenVisibilityValue | null>(null);

interface OpenVisibilityValue {
  openCrate: (visible: boolean) => void;
  visible: boolean;
}

export const OpenVisibility: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [visible, openCrate] = useState(false);

  useNuiEvent<boolean>("openCrate", openCrate);

  useEffect(() => {
    if (!visible) return;

    const keyHandler = (e: KeyboardEvent) => {
      if (["Backspace", "Escape"].includes(e.code)) {
        if (!isEnvBrowser()) fetchNui("hideFrame");
        else openCrate(!visible);
      }
    };

    window.addEventListener("keydown", keyHandler);

    return () => window.removeEventListener("keydown", keyHandler);
  }, [visible]);

  return (
    <VisibilityCtx.Provider
      value={{
        visible,
        openCrate,
      }}
    >
    <div style={{ display: visible ? 'block' : 'none', height: '100%', transition: 'display 0s' }}>
      {children}
    </div>
    </VisibilityCtx.Provider>
  );
};

export const useVisibility = () => useContext<OpenVisibilityValue>(VisibilityCtx as React.Context<OpenVisibilityValue>);
