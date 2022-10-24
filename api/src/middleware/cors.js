const config = process.env;

const CORS_WHITELIST = [
    process.env.CORS_WHITELIST
  ];
  
  let corsOptions = {
    origin: (origin, callback) => {
      if (!origin || CORS_WHITELIST.indexOf(origin) !== -1) {
        return callback(null, true);
      }
      return callback(new Error("Prohibited by CORS"));
    },
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    preflightContinue: true,
    optionsSuccessStatus: 200,
  };

module.exports = CORS_WHITELIST;