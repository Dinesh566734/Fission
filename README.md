# 🎉 Mini Event Platform (MERN Stack)

A full-stack web application built using the **MERN stack** that allows users to create events, view upcoming events, and RSVP while strictly enforcing event capacity and preventing duplicate or concurrent overbooking.

This project was developed as part of a **Full-Stack Developer Intern technical screening assignment**.

---

## 🚀 Live Demo

- 🔗 **Frontend:** (add Vercel / Netlify link here)
- 🔗 **Backend:** (add Render / Railway link here)

---

## 🛠 Tech Stack

### Frontend
- React.js  
- React Router  
- Axios  

### Backend
- Node.js  
- Express.js  
- MongoDB (Atlas)  
- Mongoose  

### Authentication
- JWT (JSON Web Tokens)  
- bcrypt.js  

### Deployment
- Frontend: Vercel / Netlify  
- Backend: Render / Railway  
- Database: MongoDB Atlas  

---

## ✨ Features

### 🔐 Authentication
- User Registration & Login  
- Password hashing with bcrypt  
- JWT-based stateless authentication  
- Protected routes for authenticated users only  

---

### 📅 Event Management
Authenticated users can:
- Create events with:
  - Title
  - Description
  - Date & Time
  - Location
  - Capacity
- View all upcoming events  
- Only modify or delete events they created  

---

### 🎟 RSVP System (Core Business Logic)
- Users can RSVP to events  
- Users can leave events  
- Strict capacity enforcement  
- No duplicate RSVPs  
- Concurrency-safe (prevents overbooking)  
- UX prevents invalid actions (disabled buttons)  

---

### 📱 Responsive UI
- Works across Desktop, Tablet, and Mobile  
- Clean and minimal UI  
- User-friendly status indicators  

---

## 🧠 RSVP Capacity & Concurrency Handling (Important)

The RSVP system is implemented using **atomic MongoDB operations** to prevent race conditions and overbooking.

### 🛡 Strategy Used
- MongoDB `findOneAndUpdate`
- `$expr` to check capacity at the database level
- `$addToSet` to prevent duplicate RSVPs
- Single atomic query ensures concurrency safety

### 🔐 Code Snippet
```js
await Event.findOneAndUpdate(
  {
    _id: eventId,
    attendees: { $ne: userId },
    $expr: { $lt: [{ $size: "$attendees" }, "$capacity"] }
  },
  { $addToSet: { attendees: userId } },
  { new: true }
);
