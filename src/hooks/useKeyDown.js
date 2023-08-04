import { useEffect, useRef } from "react";

export const useKeyDown = (keyId,callback) =>{
    const ref = useRef(null);
    useEffect(() => {
      const handleKeyDown = (event) => {
        if (event.key === keyId) {
          if(callback) callback (ref.current)
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }, []);
    return ref
}

