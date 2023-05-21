const devConfig = {
  jwt: {
    secret: 'devJwtSecret',
    expiresIn: 8 * 60 * 60, // 8 Hours
    refreshExpiresIn: 60 * 60 * 24 * 5, // 5 Days
  },
};

export default devConfig;
