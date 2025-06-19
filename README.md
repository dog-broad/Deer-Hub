# DEER Hub – Employee Engagement Portal

**DEER Hub** is a modern web portal for employee engagement, leave requests, document uploads, and more. It is designed to be easy to use, secure, and mobile-friendly.

---

## 📁 Project Structure & File Descriptions

### Main Entry

- **index.html**  
  The homepage. Shows a welcome message, news ticker, feature cards (Leave Request, Login/Register, Document Upload for managers), and info about the platform.

---

### Components

- **components/navbar.html**  
  The navigation bar. Appears at the top of every page. Contains links to Home, Leave Request, Upload (for managers), and Login. Shows user info when logged in.

- **components/footer.html**  
  The footer. Appears at the bottom of every page. Contains About info, Quick Links, and Contact details.

---

### Pages

- **pages/leave.html**  
  The Leave Request page. Employees fill out a form to request time off, select leave type, dates, and upload documents if needed.

- **pages/upload.html**  
  The Document Upload page. Only managers can access. Allows uploading documents with a title and description. Shows upload progress and success message.

- **pages/signup.html**  
  The Signup/Register page. New users can create an account by entering their name, email, role (employee or manager), and password.

- **pages/login.html**  
  The Login page. Existing users can log in with their email and password. Includes a link to the signup page.

---

### JavaScript

- **js/auth.js**  
  Handles user authentication (signup and login).  
  - Hashes passwords before saving.
  - Stores user info in localStorage.
  - Manages session in sessionStorage.
  - Shows messages for errors and success.

- **js/leave.js**  
  Handles the leave request form.  
  - Checks if user is logged in.
  - Validates form fields.
  - Calculates leave duration.
  - Saves leave request data to localStorage.
  - Shows success or error messages.

- **js/upload.js**  
  Handles the document upload form.  
  - Only allows access for managers.
  - Simulates file upload with a progress bar.
  - Shows success message after upload.

- **js/toast.js**  
  Manages toast notifications (pop-up messages) for success, error, info, and warnings.  
  - Used by other scripts to show feedback to users.

- **js/main.js**  
  Loads the navbar and footer on every page.  
  - Updates navigation links based on user session (shows/hides manager links, user dropdown, etc.).
  - Handles logout.

- **js/ticker.js**  
  Displays the news ticker on the homepage.  
  - Loads announcements from `data/announcements.json`.
  - Scrolls messages horizontally.
  - Pauses on hover.

---

### Data

- **data/announcements.json**  
  Stores news and announcements for the ticker.  
  - Each item has a message and a date.

---

### Styles

- **css/styles.css**  
  Custom styles for the whole site.  
  - Uses glassmorphism effects for a modern look.
  - Styles for navbar, footer, cards, forms, buttons, progress bars, toasts, and more.
  - Responsive and mobile-friendly.

---

## 📝 How It Works

1. **Navigation**: Navbar and footer are loaded on every page for consistency.
2. **Authentication**: Users can sign up and log in. Session is managed in the browser.
3. **Leave Requests**: Employees fill out a form to request leave. Data is validated and saved locally.
4. **Document Upload**: Managers can upload documents for the team. Upload progress and success are shown.
5. **News Ticker**: Latest announcements are shown at the top of the homepage.
6. **Feedback**: Toast messages inform users about actions (success, error, etc.).
7. **Role-Based Access**: Some features (like upload) are only for managers.

---

## 💡 Notes

- All data is stored in the browser (localStorage/sessionStorage). No backend/server is required for demo.
- The site uses Bootstrap for layout and responsiveness.
- The code is modular and easy to extend.
