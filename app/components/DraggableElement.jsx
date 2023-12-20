import React, { useRef, useEffect } from 'react';
import '../styles/app.css'; // Import your CSS file with styles

const DraggableElement = ({ children, startPosition }) => {
  const elementRef = useRef(null);

  useEffect(() => {
    if (elementRef.current && startPosition) {
      elementRef.current.style.transform = `translate(${startPosition.x}px, ${startPosition.y}px)`;
    }
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

    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      elementRef.current.style.top = elementRef.current.offsetTop - pos2 + 'px';
      elementRef.current.style.left = elementRef.current.offsetLeft - pos1 + 'px';
    }

    function closeDragElement() {
      document.onmouseup = null;
      document.onmousemove = null;
    }
  };

  return (
    <div
      ref={elementRef}
      className="draggable-element"
      onMouseDown={dragMouseDown}
    >
      {children}
    </div>
  );
};

export default DraggableElement;
