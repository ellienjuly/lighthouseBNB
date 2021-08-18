SELECT properties.city as city, count(reservations) as total_reservations
FROM properties
JOIN users ON users.id = owner_id
JOIN reservations ON properties.id = property_id
GROUP BY properties.city
ORDER BY total_reservations DESC;