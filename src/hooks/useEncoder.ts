import { useCallback } from 'react';

const useEncoder = () => {
  /**
   * Encodes a string from utf8 to b64
   */
  const encode = useCallback(
    (str: string) => window.btoa(encodeURIComponent(str)),
    []
  )
  return { encode }
}

export default useEncoder