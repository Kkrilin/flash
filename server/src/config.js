import 'dotenv/config';

const config = {
  serverPort: process.env.SERVER_PORT,
  serverUrl: process.env.SERVER_URL,
  db: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB,
    dialect: 'postgres',
    dbUrl: process.env.DB_URL,
  },
  secretKey: process.env.SECRET_KEY,
  jwtExpiration: process.env.JWT_EXPIRATION,
  clientUrl: process.env.CLIENT_URL,
};

export default config;
