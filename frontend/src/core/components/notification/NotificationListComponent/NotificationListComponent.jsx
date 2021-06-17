import React from 'react';
import { Card, Container } from 'react-bootstrap';

import './style.css';

export default function NotificationListComponent() {
  return (
    <Container>
      <Card className="notification-card mt-2">
        <Card.Header>
          <h5> All Notifications </h5>
        </Card.Header>
        <Card.Body className="notification-card-body">
          <div className="notifications-wrapper">
            <div className="notifications-item notification-read">
              <span>
                search for 'lorem ipsum' will uncover many web sites still in
                their infancy
              </span>
              <span className="float-right text-muted small">
                Jul 2, 4:00PM
              </span>
            </div>
            <hr className="notification-divider" />
            <div className="notifications-item notification-unread">
              <span>
                There are many variations of passages of Lorem Ipsum available
              </span>
              <span className="float-right text-muted small">
                Feb 12, 2:21 AM
              </span>
            </div>
            <hr className="notification-divider" />
            <div className="notifications-item notification-read">
              <span>
                Contrary to popular belief, Lorem Ipsum is not simply random
                text
              </span>
              <span className="float-right text-muted small">
                Jan 9, 8:20 PM
              </span>
            </div>
            <hr className="notification-divider" />
            <div className="notifications-item notification-unread">
              <span>
                more recently with desktop publishing software like Aldus
                PageMaker including versions of Lorem Ipsum.
              </span>
              <span className="float-right text-muted small">
                Jan 2, 5:10 AM
              </span>
            </div>
            <hr className="notification-divider" />
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}
