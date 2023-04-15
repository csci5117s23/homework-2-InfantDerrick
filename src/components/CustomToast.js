import React, { useState } from 'react';
import Toast from 'react-bootstrap/Toast';

export default function CustomToast({title, tag, body}) {
  const [showA, setShowA] = useState(true);
  const toggleShowA = () => setShowA(!showA);

  return (
        <Toast show={showA} onClose={toggleShowA}>
          <Toast.Header>
            <img
              src="/carpe-diem-logo.png"
              className="rounded me-2"
              style={{width: '20px'}}
              alt=""
            />
            <strong className="me-auto">{title}</strong>
            <small>{tag}</small>
          </Toast.Header>
          <Toast.Body>{body}</Toast.Body>
        </Toast>
  );
}
