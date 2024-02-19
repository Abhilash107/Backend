import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app= express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials:true
}))


app.use(express.json({limit: "20kb"}))

app.use(express.urlencoded({extended: true,limit: "20kb"}))

app.use(express.static("public"))

app.use(cookieParser())


export { app }

//Express.js is a minimalist web application framework for Node.js, designed to build web applications and APIs. It provides a robust set of features for web and mobile applications, simplifying the process of creating server-side applications in JavaScript.

// Cookies are small pieces of data sent by a server to a client (usually a web browser) and then sent back by the client with subsequent requests to the same server. They are primarily used to maintain stateful information between HTTP requests and are commonly used for session management, user authentication, and tracking.

//Middleware in Express.js refers to functions that have access to the request object (req), the response object (res), and the next middleware function in the application's request-response cycle. 

// app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true })): This middleware is enabling CORS (Cross-Origin Resource Sharing) for your Express.js application. It allows cross-origin requests from the origin specified in the environment variable CORS_ORIGIN. The credentials: true option indicates that the server allows credentials (such as cookies, authorization headers, or TLS client certificates) to be sent with cross-origin requests.

// app.use(express.json({ limit: "20kb" })): This middleware parses incoming requests with JSON payloads. It limits the size of the JSON payload to 20 kilobytes to prevent abuse or denial-of-service attacks.

// app.use(express.urlencoded({ extended: true, limit: "20kb" })): This middleware parses incoming requests with URL-encoded payloads. It allows for extended parsing options (extended: true) and limits the size of the payload to 20 kilobytes.

// app.use(express.static("public")): This middleware serves static files from the specified directory (public). It allows you to serve static assets such as HTML, CSS, JavaScript, images, etc., directly to clients without requiring additional routing.

// app.use(cookieParser()): This middleware parses cookies attached to incoming requests and populates req.cookies with an object keyed by the cookie names. It allows you to access cookies sent by clients in subsequent middleware or route handlers.


//Routing in web development refers to the process of defining how an application responds to client requests to different endpoints (URLs).Routing is a fundamental concept in building web applications and APIs, allowing developers to create logical navigation paths and organize application logic effectively.
