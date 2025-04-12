import { useEffect, useMemo, useState, useSyncExternalStore } from 'react';

function onWindowSizeChange(onChange: () => void) {
  window.addEventListener('resize', onChange);
  return () => window.removeEventListener('resize', onChange);
}

function getWindowWidthSnapshot() {
  return window.innerWidth;
}

function getWindowHeightSnapshot() {
  return window.innerHeight;
}

export function useWindowSize() {
  const windowWidth = useSyncExternalStore(
    onWindowSizeChange,
    getWindowWidthSnapshot,
  );

  const windowHeight = useSyncExternalStore(
    onWindowSizeChange,
    getWindowHeightSnapshot,
  );

  return { width: windowWidth, height: windowHeight };
}
