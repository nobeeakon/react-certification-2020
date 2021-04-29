import { useRef, useEffect } from 'react';

// used mainly to prevent updates after unmount
const useIsMountedRef = () => {
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;

    return () => {
      isMountedRef.current = false;
    };
  }, []);

  return isMountedRef;
};

export default useIsMountedRef;
