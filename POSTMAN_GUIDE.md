# Postman Testing Guide

## Setup
1. Start MongoDB: `mongod`
2. Run the app: `npm run dev`
3. Base URL: `http://localhost:3000`

## API Endpoints

### 1. Register User
- **Method**: POST
- **URL**: `http://localhost:3000/api/auth/register`
- **Headers**: `Content-Type: application/json`
- **Body** (raw JSON):
```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}
```
- **Response**: Returns `token` and `userId`

### 2. Login
- **Method**: POST
- **URL**: `http://localhost:3000/api/auth/login`
- **Headers**: `Content-Type: application/json`
- **Body** (raw JSON):
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```
- **Response**: Returns `token` and `userId`

### 3. Create Loan
- **Method**: POST
- **URL**: `http://localhost:3000/api/loans`
- **Headers**: 
  - `Content-Type: application/json`
  - `Authorization: Bearer YOUR_TOKEN_HERE`
- **Body** (raw JSON):
```json
{
  "amount": 50000,
  "interestRate": 5.5,
  "termMonths": 36,
  "purpose": "Home renovation"
}
```

### 4. Get All Loans
- **Method**: GET
- **URL**: `http://localhost:3000/api/loans`
- **Headers**: `Authorization: Bearer YOUR_TOKEN_HERE`

### 5. Get Single Loan
- **Method**: GET
- **URL**: `http://localhost:3000/api/loans/:id`
- **Headers**: `Authorization: Bearer YOUR_TOKEN_HERE`

### 6. Update Loan
- **Method**: PUT
- **URL**: `http://localhost:3000/api/loans/:id`
- **Headers**: 
  - `Content-Type: application/json`
  - `Authorization: Bearer YOUR_TOKEN_HERE`
- **Body** (raw JSON):
```json
{
  "amount": 60000,
  "interestRate": 6.0,
  "termMonths": 48,
  "purpose": "Home renovation and repairs",
  "status": "approved"
}
```

### 7. Delete Loan
- **Method**: DELETE
- **URL**: `http://localhost:3000/api/loans/:id`
- **Headers**: `Authorization: Bearer YOUR_TOKEN_HERE`

## Testing Flow
1. Register a new user
2. Copy the token from response
3. Use token in Authorization header for all loan endpoints
4. Create, read, update, and delete loans

## Notes
- Replace `YOUR_TOKEN_HERE` with actual token from login/register
- Replace `:id` with actual loan ID from responses
