# Food App Backend

This is the backend service for the Food App project.  
It works as a proxy server to fetch restaurant data from Swiggy's public API based on the user's location (latitude and longitude).  
Using this backend helps avoid CORS issues and keeps API calls secure.

## Frontend Link
You can try the frontend here:  
[Food App Frontend](https://food-app-by-daulat.netlify.app/)

## Features
- Express.js server with CORS enabled
- Accepts latitude and longitude as query parameters
- Fetches restaurant data from Swiggy's API
- Handles errors and blocked responses
- Supports environment-based port configuration

## Technologies Used
- Node.js  
- Express.js  
- CORS  
- node-fetch  

## API Endpoint

### GET `/api/restaurants`
Fetch a list of restaurants based on location.

**Query Parameters:**
| Parameter | Type   | Required | Description |
|-----------|--------|----------|-------------|
| lat       | number | Yes      | Latitude of the location |
| lng       | number | Yes      | Longitude of the location |

**Example:**
```bash
GET /api/restaurants?lat=28.6139&lng=77.2090