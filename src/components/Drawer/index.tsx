import React from 'react';
import { ReactNode, useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import styled from 'styled-components';
import { __Inset } from '../../styles/GlobalStyles';

import { Portal } from '../Portal';

interface StyledProps {
  direction?: 'left' | 'right' | 'bottom' | 'top' | string;
  width?: string;
  zIndex?: number;
}
interface Props extends StyledProps {
  direction: 'left' | 'right' | 'bottom' | 'top' | string;
  visible: boolean;
  onToggle: () => void;
  children: ReactNode;
}

const directionValue = {
  left: 'slideLeftIn',
  right: 'slideRightIn',
  bottom: 'slideBottomIn',
  top: 'slideTopIn',
};
const styledDirectionValue = {
  left: {
    left: 0,
    top: 0,
    justifyContent: 'flex-start',
    flexDirection: 'column',
  },
  right: {
    right: 0,
    top: 0,
    justifyContent: 'flex-end',
    flexDirection: 'column',
  },
  bottom: {
    width: '100%',
    bottom: 0,
    justifyContent: 'flex-end',
    flexDirection: 'column',
  },
  top: {
    width: '100%',
    top: 0,
    justifyContent: 'flex-start',
    flexDirection: 'column',
  },
};
const Drawer = (props: Props) => {
  const {
    visible,
    onToggle,
    direction,
    children,
    width = 'auto',
    zIndex = 100,
  } = props;
  const modalRef = useRef(null);

  useEffect(() => {
    if (visible) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [visible, modalRef.current]);

  return (
    <Portal>
      <__DrawerWrapper>
        <CSSTransition
          in={visible}
          classNames="fade"
          unmountOnExit
          timeout={500}
        >
          <__Back onClick={() => onToggle()} zIndex={zIndex} />
        </CSSTransition>

        <CSSTransition
          in={visible}
          classNames={directionValue[direction]}
          unmountOnExit
          timeout={500}
        >
          <__DrawerModal direction={direction} width={width} zIndex={zIndex}>
            {children}
          </__DrawerModal>
        </CSSTransition>
      </__DrawerWrapper>
    </Portal>
  );
};

const __Back = styled.div<StyledProps>`
  width: 100%;
  flex: 1;
  background: rgba(0, 0, 0, 0.4);
  position: fixed;
  z-index: ${(props) => props.zIndex};
  ${__Inset};
`;
const __DrawerModal = styled.div<StyledProps>`
  width: ${(props) => props.width};
  max-width: 750px;
  position: fixed;
  ${(props) => styledDirectionValue[props?.direction as string]};
  z-index: ${(props) => props.zIndex};
  display: flex;
`;
const __DrawerWrapper = styled.div`
  .slideRightIn-enter {
    transform: translateX(750px);
    opacity: 1;
  }
  .slideRightIn-enter-active {
    transform: translateX(0);
    transition: ease-in 400ms;
    opacity: 1;
  }
  .slideRightIn-exit {
    opacity: 1;
  }
  .slideRightIn-exit-active {
    transform: translateX(750px);
    transition: ease-out 400ms;
    opacity: 1;
  }
  .slideLeftIn-enter {
    transform: translateX(-750px);
    opacity: 1;
  }
  .slideLeftIn-enter-active {
    transform: translateX(0);
    transition: ease-in 400ms;
    opacity: 1;
  }
  .slideLeftIn-exit {
    opacity: 1;
  }
  .slideLeftIn-exit-active {
    transform: translateX(-750px);
    transition: ease-out 400ms;
    opacity: 1;
  }

  .slideBottomIn-enter {
    transform: translateY(2000px);
    opacity: 1;
  }
  .slideBottomIn-enter-active {
    transform: translateY(0);
    transition: ease-in 400ms;
    opacity: 1;
  }
  .slideBottomIn-exit {
    opacity: 1;
  }
  .slideBottomIn-exit-active {
    transform: translateY(2000px);
    transition: ease-out 400ms;
    opacity: 1;
  }

  .slideTopIn-enter {
    transform: translateY(-1000px);
    opacity: 1;
  }
  .slideTopIn-enter-active {
    transform: translateY(0);
    transition: ease-in 400ms;
    opacity: 1;
  }
  .slideTopIn-exit {
    opacity: 1;
  }
  .slideTopIn-exit-active {
    transform: translateY(-1000px);
    transition: ease-out 400ms;
    opacity: 1;
  }
  .fade-enter {
    opacity: 1;
  }
  .fade-enter-active {
    opacity: 1;
    transition: opacity 400ms ease-in;
  }
  .fade-exit {
    opacity: 1;
  }
  .fade-exit-active {
    opacity: 1;
    transition: opacity 400ms ease-in;
  }
`;
export default Drawer;
