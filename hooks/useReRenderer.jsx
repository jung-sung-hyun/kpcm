"use client";
import { useState, useCallback } from 'react';

function useReRenderer() {
  const [, setState] = useState({});
  return useCallback(() => setState({}), []);
}

export default useReRenderer;