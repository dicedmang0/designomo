import React, { useRef, useEffect } from 'react';
import '../styles/app.css'; // Import your CSS file with styles

const DraggableElement = ({ children, startPosition,onClick }) => {
  const elementRef = useRef(null);
  let isDragged = false;

  useEffect(() => {
    if (elementRef.current && startPosition) {
      elementRef.current.style.transform = `translate(${startPosition.x}px, ${startPosition.y}px)`;
    }
    return () => {
      document.onmouseup = null;
      document.onmousemove = null;
    };
  }, [startPosition]);

  const dragMouseDown = (e) => {
    e = e || window.event;
    e.preventDefault();
    let pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0;

    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
    isDragged = false;
    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      elementRef.current.style.top = elementRef.current.offsetTop - pos2 + 'px';
      elementRef.current.style.left = elementRef.current.offsetLeft - pos1 + 'px';
      isDragged = true;
    }

    function closeDragElement() {
      // Detach the event listeners
      document.onmouseup = null;
      document.onmousemove = null;
    }

    // Attach event listeners
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  };
  const handleClick = (e) => {
    if (isDragged) {
      e.preventDefault();
    } else {
      onClick?.(e);
    }
  };

  return (
    <div
      ref={elementRef}
      className="draggable-element"
      onMouseDown={dragMouseDown}
      onClick={handleClick}
    >
      {children}
    </div>
  );
};

export default DraggableElement;
