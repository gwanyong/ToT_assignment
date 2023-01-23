import { ReactNode, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

export interface PortalProps {
  children: ReactNode;
}
export const Portal = ({ children }: PortalProps) => {
  const ref = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    ref.current = document.querySelector('#__portal');
    setMounted(true);
  }, []);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return mounted ? createPortal(children, ref?.current) : null;
};
