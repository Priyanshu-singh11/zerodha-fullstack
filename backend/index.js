require("dotenv").config();

const express     = require("express");
const cors        = require("cors");
const helmet      = require("helmet");
const compression = require("compression");
const cookieParser = require("cookie-parser");
const hpp         = require("hpp");

const connectDB               = require("./config/db");
const authRoutes              = require("./routes/authRoutes");
const dashboardRoutes         = require("./routes/dashboardRoutes");
const { verifyEmailConnection } = require("./services/emailService");

const app = express();

const isProduction = process.env.NODE_ENV === "production";


connectDB();
verifyEmailConnection();


app.use(compression());
app.use(hpp());
app.use(
  helmet({
    frameguard:    { action: "deny" },
    hidePoweredBy: true,
  })
);


app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));


app.use(cookieParser());


const allowedOrigins = isProduction
  ? [process.env.CLIENT_URL]   
  : [
      process.env.CLIENT_URL,
      process.env.REACT_APP_DASHBOARD_URL,
    ];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`CORS blocked for origin: ${origin}`));
      }
    },
    credentials: true, 
  })
);


app.use("/api/auth",      authRoutes);
app.use("/api/dashboard", dashboardRoutes);


app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server Running",
  });
});


app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});


app.use((err, req, res, next) => {
  console.error("Unhandled error:", err.message);
  res.status(500).json({
    success: false,
    message: isProduction
      ? "Internal server error"
      : err.message, 
  });
});


const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} [${process.env.NODE_ENV || "development"}]`);
});