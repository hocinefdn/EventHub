CREATE TABLE event (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    description VARCHAR(255) DEFAULT NULL,
    event_date TIMESTAMP DEFAULT NULL,
    max_participants INTEGER DEFAULT NULL,
    organizer_id BIGINT DEFAULT NULL,
    title VARCHAR(255) DEFAULT NULL
);


INSERT INTO event ( description, event_date, max_participants, organizer_id, title) VALUES
( 'Tech conference about Java and Spring Boot', '2026-05-10 09:00:00', 200, 101, 'Spring Boot Summit'),
( 'Networking event for developers in Paris', '2026-05-15 18:30:00', 100, 102, 'Dev Meetup Paris');