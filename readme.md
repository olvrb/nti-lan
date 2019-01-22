# nti-lan

## Usage

* `git clone https://github.com/olvrb/typescript-express-boilerplate`
* `cd typescript-express-boilerplate`
* `mv src/Config.example.ts src/Config.ts`
* `yarn -D`
* `yarn dev`


## API Endpoints

### **POST** `/api/v1/bookings/book` auth

Create a booking. Redirects to /user/bookings if success.

#### Parameters

- `seat`: The set ID for seatsio to reserve.

#### Example Request 

**Content-Type:** `application/json`

```json
{
    "seat": "A-1-3"
}
```

### **POST** `/api/v1/bookings/paid` auth admin

Mark a booking as paid. Redirects to /admin/bookings if success.

#### Parameters

- `booking`: The booking ID.

- `reason`: Reason for marking the booking as paid, e.g: Swish transaction Id.

#### Example Request

**Content-Type:** `application/json`

```json
{
    "booking": "uid",
    "reason": "123456789"
}
```


### **POST** /api/v1/bookings/remove auth

Remove a booking. Redirects to /user/bookings if success.

#### Parameters
- `booking`: The booking ID.

#### Example Request

**Content-Type:** `application/json`

```json
{
    "booking": "uid"
}
```