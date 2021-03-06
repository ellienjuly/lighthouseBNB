const properties = require('./json/properties.json');
const users = require('./json/users.json');
const { Pool } = require('pg')

/// Users
const pool = new Pool({
  user: 'vagrant',
  password: 123,
  host: 'localhost',
  database: 'lightbnb'
});

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  console.log(email);
  return pool
  .query(`SELECT * FROM users WHERE users.email = $1`, [email])
  .then(result => { 
    console.log(result.rows);
    return result.rows[0] 
  })
  .catch(err => {
    console.log(err);
  })
  // let user;
  // for (const userId in users) {
  //   user = users[userId];
  //   if (user.email.toLowerCase() === email.toLowerCase()) {
  //     break;
  //   } else {
  //     user = null;
  //   }
  // }
  // return Promise.resolve(user);
}
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  return pool
  .query(`SELECT * FROM users WHERE users.id = $1`, [id])
  .then(result => {
    result.rows;
  })
  .catch(err => {
    console.log(err);
  })
  // return Promise.resolve(users[id]);
}
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser = function(user) {
  return pool
  .query('INSERT INTO users(name, email, password) VALUES($1, $2, $3)', [user.name, user.email, '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'])
  .then(result =>  result.rows )
  .catch(err => {
    console.log(err);
  })
  // const userId = Object.keys(users).length + 1;
  // user.id = userId;
  // users[userId] = user;
  // return Promise.resolve(user);
}
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  return pool
  .query (`
    SELECT *
    FROM properties
    JOIN users ON users.id = owner_id
    JOIN reservations ON reservations.property_id = properties.id
    WHERE reservations.guest_id = $1
    LIMIT $2`
    ,[guest_id, limit]
  )
  .then(result => result.rows)
  .catch(err => console.log(err))
  // return getAllProperties(null, 2);
}
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function(options, limit = 10) {

  const queryParams = [];
  // 2
  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id
  `;

  // 3
  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += `WHERE city LIKE $${queryParams.length} `;
  }

  if (options.minimum_price_per_night && options.maximum_price_per_night) {
    queryParams.push(parseInt(options.minimum_price_per_night) * 100, parseInt(options.maximum_price_per_night) * 100);
    queryString += `WHERE cost_per_night > $${queryParams.length - 1} AND cost_per_night < $${queryParams.length} `;
  }

  if (options.minimum_rating) {
    queryParams.push(parseInt(options.minimum_rating))
    queryString += `WHERE property_reviews.rating >= $${queryParams.length}`;
  }

  if (options.owner_id) {
    queryParams.push(parseInt(options.owner_id));
    queryString += `WHERE properties.owner_id = $${queryParams.length}`;
  }

  console.log('what is inside of options??', options);

  // 4
  queryParams.push(limit);
  queryString += `
  GROUP BY properties.id
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;

  // 5
  console.log('querystring here!: ',queryString, 'params here!!: ',queryParams);

  // 6
  return pool.query(queryString, queryParams).then((res) => res.rows);

  // return pool
  // .query(`
  //   SELECT * FROM properties LIMIT $1
  //   `
  //   , [limit])
  // .then((result) => result.rows)
  // .catch((err) => {
  //   console.log(err.message);
  // });

  // const limitedProperties = {};
  // for (let i = 1; i <= limit; i++) {
  //   limitedProperties[i] = properties[i];
  // }
  // return Promise.resolve(limitedProperties);
}
exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  const propertyId = Object.keys(properties).length + 1;
  property.id = propertyId;
  properties[propertyId] = property;
  return Promise.resolve(property);
}
exports.addProperty = addProperty;