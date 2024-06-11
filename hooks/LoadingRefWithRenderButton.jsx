"use client";
import { useRef } from 'react';
import useReRenderer from './useReRenderer';

function LoadingRefWithRenderButton({ onClick, children }) {
  const isLoadingRef = useRef(false);
  const reRender = useReRenderer();

  return (
    <button
      type="button"
      disabled={isLoadingRef.current}
      onClick={async () => {
        if (isLoadingRef.current) {
          return;
        }
        isLoadingRef.current = true;
        reRender();
        await onClick();
        isLoadingRef.current = false;
        reRender();
      }}
    >
      {children}
    </button>
  );
}

export default LoadingRefWithRenderButton;