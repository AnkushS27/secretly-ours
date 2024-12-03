# **Secretly Ours** 🎭

## **Overview** 📝
Secretly Ours is an anonymous secret-sharing platform where users can securely share secrets. The platform implements a robust Role-Based Access Control (RBAC) system to ensure proper authentication and authorization. It offers role-specific functionalities for Admins, Moderators, and Users to manage secrets efficiently.

---

## **Features** 🌟

### **Core Features**
1. **Authentication and Authorization** 🔒:
   - Secure login and registration using **NextAuth** with credentials-based authentication.
   - JWT tokens are used for session management, ensuring secure and scalable authentication.
   - Role-based access control with three primary roles:
     - **Admin**: Access to manage users and secrets via the dashboard, with permissions to edit or delete any secret directly from the home page.
     - **Moderator**: Permissions to edit or delete any secret directly from the home page. No dashboard access.
     - **User**: Ability to share, edit, or delete their own secrets. Forbidden actions (e.g., deleting someone else’s secret) trigger a toast error.

2. **Anonymous Secret Sharing** ✨:
   - Users can post secrets without revealing their identity.
   - Secrets are displayed on the public feed.

3. **Admin Dashboard** 🛠️:
   - Admin-exclusive access to manage users and secrets. This can be accessed by admin only.

4. **Toast Notifications** 🔔:
   - Instant feedback using `react-hot-toast` (e.g., success messages, forbidden errors).

---

## **Technologies Used** 🛠️

- **Frontend**: Next.js, React, TypeScript, TailwindCSS
- **Backend**: Next.js API routes
- **Database**: MongoDB (via Mongoose)
- **Authentication**: NextAuth for session management
- **Notifications**: `react-hot-toast` for real-time toast messages

---

## **Setup and Installation** ⚙️

### **Prerequisites**
- Node.js `(v18 or higher)`
- MongoDB

### **Steps to Run the Project**
1. Clone the repository:
   ```bash
   git clone https://github.com/AnkushS27/secretly-ours.git
2. Install dependencies:
   ```bash
   pnpm install
3. Create a .env.local file in the root directory with the following keys:
    ```bash
    NEXT_PUBLIC_MONGODB_URI=your_mongodb_connection_string
    NEXTAUTH_SECRET=your_nextauth_secret
    NEXTAUTH_URL=your_application_url
4. Start the development server:
    ```bash
    pnpm run dev

## **RBAC Implementation** 🛠️

- **Authentication**
    - Implemented with NextAuth, providing secure and seamless session management.
- **Authorization**
    - Middleware restricts access based on roles:
        - Admin: Can manage users and secrets via the dashboard and directly edit or delete secrets from the home page.
        - Moderator: Can edit or delete any secret directly from the home page. No access to the dashboard.
        - User: Can create, edit, or delete their own secrets. Unauthorized actions (e.g., deleting another user's secret) result in a forbidden error, displayed via toast notifications.

- **Database Models:**
    - User: Stores user information, including roles.
    - Secret: Stores anonymously posted secrets.

---

## **Deployment 🚀**
The platform is deployed on Vercel.
Access it here: https://secretly-ours.vercel.app/

**Note: If '/unveil-secret' route not working even after logging in. Try to write the url in the browser url itself.**

---

## **Testing 🧪**
1. Register multiple users with roles (Admin, Moderator, User).

2. Log in as a **User**:
   - Share secrets anonymously.
   - Edit or delete your own secrets from the home page or the "unveil-secret" page.
   - Try deleting someone else’s secret to test forbidden error handling.
3. Log in as a **Moderator**:
Edit or delete any secret directly from the home page.

4. Log in as an **Admin**:
Manage users and secrets via the dashboard.
Edit or delete any secret directly from the home page.

---
