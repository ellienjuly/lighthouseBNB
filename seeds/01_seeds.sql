-- users database
INSERT INTO users (id, name, email, password) VALUES (1, 'Alan Moore', 'alan@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO users (id, name, email, password) VALUES (2, 'Eva Stanley', 'sebastianguerra@ymail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO users (id, name, email, password) VALUES (3, 'Louisa Meyer', 'jacksonrose@hotmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');


-- properties database
INSERT INTO properties (id, owner_id, title, description, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, thumbnail_photo_url, cover_photo_url, country, street, city, province, post_code, activity) VALUES (1, 1, 'Speed lamp', 'description', 930, 5, 7, 7, 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg', 'Canada', '651 Nami Road', 'Bohbatev', 'Alberta', 83680, true);

INSERT INTO properties (id, owner_id, title, description, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, thumbnail_photo_url, cover_photo_url, country, street, city, province, post_code, activity) VALUES (2, 2, 'Blank corner', 'description', 1000, 2, 5, 5, 'https://images.pexels.com/photos/2080018/pexels-photo-2080018.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2080018/pexels-photo-2080018.jpeg', 'Canada', '1650 Hejto Center', 'Genwezuj', 'Newfoundland And Labrador', 32487, true);

INSERT INTO properties (id, owner_id, title, description, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, thumbnail_photo_url, cover_photo_url, country, street, city, province, post_code, activity) VALUES (3, 3, 'Habit mix', 'description', 82640, 0, 5, 6, 'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg', 'Canada', '513 Powov Grove', 'Jaebvap', 'Ontario', 38051, true);


-- reservations database
INSERT INTO reservations (id, start_date, end_date, property_id) VALUES (1, '2018-09-11', '2018-09-26', 1);

INSERT INTO reservations (id, start_date, end_date, property_id) VALUES (2,  '2021-10-01' , '2021-10-14', 2);

INSERT INTO reservations (id, start_date, end_date, property_id) VALUES (3, '2014-10-21', '2014-10-21', 3);


-- property_reviews database
INSERT INTO property_reviews (id, reservation_id, message, rating) VALUES (1, 1,'message', 3);

INSERT INTO property_reviews (id, reservation_id, message, rating) VALUES (2, 2, 'message', 5);

INSERT INTO property_reviews (id, reservation_id, message, rating) VALUES (3, 3, 'message', 2);