/* const configs = {
  client: "pg",
  connection: {
    host: "localhost",
    user: "postgres",
    password: "653255",
    database: "provihack",
  },
};
 */
const configs = {
  client: "pg",
  connection: {
    host: "ec2-54-164-40-66.compute-1.amazonaws.com",
    user: "aobcsporhbsdqr",
    password:
      "ba8198375f7da174b031ad746898bdb759d9c3027c4edabf22fab2730213da29",
    database: "d89amta8ks05ik",
  },
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
};

module.exports = configs;
