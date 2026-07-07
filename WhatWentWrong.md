# Debug Report: What Went Wrong?

Here is a summary of the issues encountered, what was causing them, and how they have been corrected.

---

## 1. `net::ERR_CONNECTION_REFUSED` (Backend Server Crash)

### What you did:
In `backend/routes/properties.js`, you modified the route `/api/properties/:id` as follows:
```javascript
fastify.get('/api/properties/:userId', { schema: getUserPropertySchema }, getPropertyById);
```

### What went wrong:
* **ReferenceError:** The schema `getUserPropertySchema` was **never imported** at the top of `properties.js`. This threw a runtime ReferenceError:
  ```text
  ReferenceError: getUserPropertySchema is not defined
  ```
* **Process Crash:** Because the error happened during route registration, the Fastify server crashed and entered a crash loop. This is why you saw `ERR_CONNECTION_REFUSED` in the frontend (since the server was offline).

### How we fixed it:
* Created a dedicated schema module `GetUserProperties.schema.js` and imported it.
* Restored the `/api/properties/:id` route so that looking up individual properties by their ID does not break.
* Registered a new route `GET /api/properties/user/:userId` using the correct schemas and controllers.

---

## 2. Incorrect Route Endpoint & Parameters in Frontend

### What you did:
In `frontend/src/pages/UsersProperty.jsx`, you modified the fetch call as follows:
```javascript
const { userId } = useParams();
const response = await fetch(`${API_BASE_URL}/user/properties/${userId}`);
```

### What went wrong:
1. **Undefined `userId`:** The route path in your React app's routing configuration is `/users-property` (it does **not** define a parameter like `/users-property/:userId`). As a result, `useParams()` was empty, and `userId` was `undefined`.
2. **Missing Import:** `useParams` was not imported from `react-router-dom` in `UsersProperty.jsx`, which would cause a React runtime error.
3. **Endpoint Mismatch:** The URL path `/user/properties/:userId` was requested, but the backend did not register that endpoint.

### How we fixed it:
* Retrieved `userId` from `localStorage.getItem('userId')` since it is already saved in local storage when the user logs in.
* Corrected the API endpoint URL to fetch from `${API_BASE_URL}/api/properties/user/${userId}`.
* Added error logging to the `catch (err)` block so that network/parsing errors are visible in the console.

---

## 3. Stored Procedure Mismatch (Previous Issue)

### What you did:
Created the `PropertyListing` table with `userId INT NOT NULL`, but the stored procedure `sp_PublishProperty` did not handle the `userId` parameter.

### What went wrong:
* Whenever the backend executed `sp_PublishProperty`, it did not pass a user ID, violating the `NOT NULL` constraint of the table and resulting in a `500 (Internal Server Error)`.

### How we fixed it:
* Altered the stored procedure to accept `@userId` and insert it into the `userId` column.
* Updated backend schemas, controllers, and the frontend to pass the user ID.
