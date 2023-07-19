import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    database: {
      name: process.env.TYPEORM_DATABASE,
      port: process.env.TYPEORM_PORT,
    },
    apikey: process.env.API_KEY,
    jwtSecret: process.env.JWT_SECRET
  };
});
