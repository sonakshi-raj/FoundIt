# 🧭 FoundIt

**FoundIt** is a full-stack web application that helps users post, manage, and retrieve lost or found items. Built using **Next.js**, **TypeScript**, **MongoDB**, and **Tailwind CSS**, it provides an intuitive UI with real-time updates and interactive features like responses and claims.

---

## 🚀 Features

- 🔐 **User Authentication** (Register, Login, Logout)
- 📷 **Post Items** as *Lost* or *Found* with optional images
- 🗂 **Dashboard for My Posts**
  - View, delete, and track posts
  - Respond to other users
- 💬 **View Responses**
  - Popup view for responses
  - Mark as *Genuine* or *Not Genuine*
- ✅ **Claim Validation**
  - Accept or reject user claims based on answers
- 🌐 **Responsive UI**

---

## 🛠️ Tech Stack

### Frontend
- Next.js 14
- React
- TypeScript
- Tailwind CSS

### Backend
- Next.js API Routes
- MongoDB

---
## ⚙️ Getting Started

Follow these steps to run the project locally:

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/foundit.git
cd foundit
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Set Up Environment Variables

Create a file named .env.local in the root directory and add the following:

```bash
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

Replace your_mongodb_connection_string and your_jwt_secret_key with your actual values.

### 4. Run the Development Server

```bash
npm run dev
# or
yarn dev
```

The app will be available at http://localhost:3000.

---

## 🧪 User Flow

- Users can **register** or **login**.
- Logged-in users can **post items** as _Lost_ or _Found_.
- Other users can:
  - **Respond** to Found posts.
  - **Submit a claim** to Lost items.
- Posters can:
  - **View responses** in a modal popup.
  - **Accept** or **reject** claims made by others.

---

## 👩‍💻 Author

- **Sonakshi Raj**
- **Simran Tanger**
- **Ripudaman Bansal**
