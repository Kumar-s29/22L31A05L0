# HTTP URL Shortener Microservice

## Design Document

### Architectural & Code Design Choices

**Architecture:**

- Microservice architecture using Node.js and Express for RESTful API endpoints.
- Separation of concerns: routes, controllers, middleware, and utility modules.

**Key Decisions:**

- Stateless service with in-memory data store for URLs and statistics (for demo; can be replaced with persistent DB for production).
- Custom logging middleware posts logs to a centralized log API, ensuring observability and traceability.
- Shortcodes are generated to be globally unique and optionally user-defined, with validation.
- Default validity for short URLs is 30 minutes, configurable per request.

**Data Modeling:**

- URL Store:
  - `shortcode`: string (unique identifier)
  - `url`: string (original long URL)
  - `expiry`: ISO timestamp
  - `createdAt`: ISO timestamp
  - `clicks`: array of click objects (timestamp, referrer, geo/IP)
- Click Statistics:
  - Tracks each access to a short URL for analytics.

**Technology Selections & Justifications:**

- **Node.js & Express:** Fast, scalable, and widely used for microservices and REST APIs.
- **Axios:** Used for HTTP requests to the log API, providing reliability and simplicity.
- **Custom Logging Middleware:** Required for compliance and robust monitoring.
- **In-memory Store:** Chosen for simplicity in evaluation; can be swapped for Redis, MongoDB, or SQL for scalability.

**Assumptions:**

- All API users are pre-authorized; no authentication required.
- In-memory store is sufficient for evaluation; persistent storage is recommended for production.
- Logging API is always available and accepts logs in the specified format.
- Shortcodes must be alphanumeric and at least 4 characters.

**Scalability & Maintainability:**

- Modular codebase allows easy extension (e.g., swap in a database, add authentication).
- Logging and error handling are centralized for easier debugging and monitoring.
- RESTful endpoints are clearly defined and documented.


**Outputs:**

<img width="1725" height="870" alt="Screenshot 2025-09-04 114009" src="https://github.com/user-attachments/assets/f38ba997-5120-4ac2-a2cd-b3847bac1d09" />
<img width="1738" height="864" alt="Screenshot 2025-09-04 114035" src="https://github.com/user-attachments/assets/c840a3ce-3429-42e8-b788-c31bbc18ebc3" />




---

