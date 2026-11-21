# Evercare Medical Center — Hospital Management System

A **frontend-only** Web Technologies course project built with HTML5, CSS3 and plain JavaScript.
It follows the structure and coding style of the faculty's *Library Management System* demo.

> **Important:** this is a frontend course project. All data lives in JavaScript arrays inside the
> browser (`js/data.js`). There is no backend and no database. See [Current limitations](#11-current-limitations).

---

## 1. Project overview

Evercare Medical Center is a small hospital system with four kinds of users who share one login page
and each get their own dashboard:

| Role | What they do |
|------|--------------|
| **Admin** | Watches hospital statistics, doctor workload and medicine stock; manages doctors, patients and appointments |
| **Doctor** | Runs the patient queue, writes prescriptions, reads patient histories, schedules follow-ups |
| **Receptionist** | Registers patients, books appointments, checks patients in and gives queue tokens |
| **Patient** | Finds doctors, books appointments, tracks the queue and reads their own health record |

## 2. Project objectives

- Build a multi-page website with **HTML, CSS and JavaScript only**.
- Store records as **arrays of objects** and process them with **loops, conditions and functions**.
- Update the page with the **DOM** (`getElementById`, `innerHTML`, `style.display`, `createElement`, `appendChild`).
- Validate forms and give clear error messages.
- Share one data model between several pages and roles.

## 3. Technologies used

- HTML5 (forms, tables, fieldsets, semantic tags)
- CSS3 (one stylesheet, Flexbox, Grid, a simple media query)
- JavaScript (ES6 `let` / `const`, ordinary `function`s, `for` / `for…of` / `while`, `if` / `switch`, arrays, objects, `Date`)

No frameworks, no libraries, no `localStorage`, no `fetch`, no arrow functions, no `map` / `filter` / `reduce`.

## 4. The four user roles

Admin, Doctor, Receptionist, Patient (see table above). Public registration creates Patient, Doctor
or Receptionist accounts. **Admins cannot be created publicly.** New Doctor and Receptionist accounts
start as *Pending* and an Admin approves them (Admin → Manage Doctors → *Accounts waiting for approval*).

## 5. Common features (all four dashboards)

1. **Login / Logout** — one login page; the role stored in the account decides the dashboard.
2. **Role-based dashboard access** — each dashboard checks the role with plain `if` conditions and shows "Access denied" for the wrong role.
3. **Profile** — view the account, edit name, email and phone (validated).
4. **Search and filter** — every list has a search box (`onkeyup`) and/or filters (`onchange`).
5. **Notifications** — list, mark one as read, mark all as read. Actions such as check-in or booking create notifications for the people involved.
6. **Dashboard statistics** — all numbers are counted from the arrays with loops (nothing is hard-coded).

## 6. Three unique features per role

### Admin
1. **Hospital Statistics Report** — totals, today's appointments, waiting patients, pending/completed/cancelled counts, department-wise patient counts and CSS bar charts.
2. **Doctor Workload Monitor** — today's / completed / pending appointments per doctor, classified **Low / Medium / High** (limits in `hospitalRules` in `data.js`).
3. **Medicine Stock and Expiry Monitor** — total, low-stock, expired and expiring-soon counts, with an add / edit / delete form.

### Doctor
1. **Smart Patient Queue** — token, patient, time, status, *currently serving*, *next patient*, waiting count; buttons *Call Next*, *Mark Completed*, *Skip*, and *Call* per row.
2. **Digital Prescription Builder** — validated form (patient, diagnosis, medicine, dosage, frequency, duration, instructions, tests, follow-up date), table and prescription preview. The doctor types everything; the system gives no medical advice.
3. **Patient Medical Timeline** — appointments, diagnoses, prescriptions, lab reports and follow-ups for the selected patient, oldest first.

### Receptionist
1. **Quick Patient Registration** — auto-generated Patient ID, full validation, duplicate-phone check, updated patient list.
2. **Appointment and Slot Manager** — department → doctor → date → time slot; booked slots are disabled; the same doctor cannot be booked twice at the same date and time; edit and cancel.
3. **Patient Check-in and Token Generator** — search an appointment, verify it is *Pending* and *today*, create the next token for that doctor, show the token slip, current token and queue status.

### Receptionist — added in update 2
4. **Dynamic Slot Booking and Emergency Rescheduling** (menu: *Emergency Rescheduling*) — when a doctor suddenly becomes unavailable (Emergency OT Duty, On-Call Emergency, Medical Emergency, Other), the receptionist records the date and time range. The page lists the affected Pending / Checked-in appointments and **Reschedule All Appointments** moves each one to the doctor's next free slot (never inside an unavailable period, never on a day the doctor does not work, never double-booking the doctor or the patient, within the next 14 days). A summary shows the original and new time, and a notification status for each patient. Appointments that cannot be moved are listed clearly and stay unchanged. The Receptionist dashboard also has a new teal / mint theme (all its styles are scoped with `.rx-theme` in `css/style.css`, so the other dashboards are unchanged).

### Patient
1. **Smart Doctor Finder** — doctor cards; search by name; filter by specialization and department; *View details*; *Book appointment*.
2. **Live Queue Tracker** — own token, currently serving token, patients ahead, **estimated** waiting time (patients ahead × `minutesPerPatient`), doctor and status.
3. **Personal Health Record** — own medical history, prescriptions, lab reports, previous appointments and follow-up dates only.

## 7. Folder structure

```
evercare-medical-center/
├── index.html          Home page (public doctor search)
├── login.html          One login page for all roles
├── register.html       Registration (Patient / Doctor / Receptionist)
├── admin.html          Admin dashboard
├── doctor.html         Doctor dashboard
├── receptionist.html   Receptionist dashboard
├── patient.html        Patient dashboard
├── css/
│   └── style.css       The only stylesheet
├── js/
│   ├── data.js         Sample data (arrays of objects) + settings
│   ├── common.js       Shared helper functions
│   ├── home.js         Home page
│   ├── login.js        Login
│   ├── register.js     Registration
│   ├── admin.js        Admin
│   ├── doctor.js       Doctor
│   ├── receptionist.js Receptionist
│   └── patient.js      Patient
└── README.md
```

Every page loads scripts in the same order, like the demo: `data.js` → `common.js` → the page's own script.

### How the data is linked (`js/data.js`)

```
users ──(doctorId / patientId)──► doctors / patients
appointments ──(patientId, doctorId)──► patients, doctors
queue ──(appointmentId, patientId, doctorId)──► appointments
prescriptions, medicalRecords ──(patientId, doctorId)──► patients, doctors
```

Sample dates are generated from today's date (`sampleDate(0)`, `sampleDate(-30)`…), so there are
always appointments *today* and medicines that are *expired* or *expiring soon*, whenever you open it.

## 8. How to run

1. Unzip the project.
2. Open `index.html` in a browser **or** open the folder in VS Code and use *Live Server*.
3. Click **Login**, press **Use** next to a demo account, then **Login**.

No installation, no server and no internet connection are needed.

## 9. How login works (and how it differs from the demo)

1. `login.js` finds the account in the `users` array (by username **or** email), checks the password,
   checks `status` (`Pending` accounts are refused) and sets the form `action` with a `switch` on the role.
2. The form uses `method="get"`, so the browser opens e.g. `doctor.html?username=nusrat`.
3. `getLoggedInUser(role)` in `common.js` reads the text after `username=` with `indexOf` / `slice`,
   finds the account, and checks that the role matches the page.

The demo project hard-codes one user per dashboard. This project reads the username from the address instead,
so that two doctors or two patients each see *their own* data. It uses only string methods, loops and
conditions that the demo already uses. If a dashboard is opened directly (no `?username=`), the first
active user of that role is shown so the page can still be demonstrated.

## 10. Sample login credentials (all fictional)

| Role | Username | Password | Notes |
|------|----------|----------|-------|
| Admin | `admin` | `admin1234` | |
| Doctor | `doctor` | `doctor123` | Dr. Arif Rahman (Cardiology) — has the busiest queue |
| Doctor | `nusrat` | `nusrat123` | Dr. Nusrat Jahan (Pediatrics) |
| Receptionist | `reception` | `reception123` | |
| Patient | `patient` | `patient123` | Farhan Kabir — token 4 in Dr. Arif's queue |
| Patient | `sadia` | `sadia1234` | Sadia Islam |
| Doctor (pending) | `imran` | `imran1234` | Login is **refused** until an Admin approves the account |

You can also log in with the e-mail addresses in `data.js` (for example `farhan@mail.com`).

## 11. Current limitations

- **Not secure.** Passwords are in `data.js` and are checked in the browser; the username in the address bar can be typed by anyone. This is for demonstration only and **must not** be used for a real hospital. A real system needs server-side authentication, hashed passwords and sessions.
- **No persistence.** Data is kept in arrays in memory. Reloading a page, or moving from one HTML page to another, resets the data to the values in `data.js`. This also means a check-in made on the Receptionist page is **not** visible on the Doctor page after you navigate; within one page, all changes are consistent (queue ↔ appointments ↔ notifications).
- **Shared data is shared in code, not live between pages.** All roles read the same arrays defined in `data.js`, but each page loads its own copy.
- **No HTML escaping.** Text typed into forms is written with `innerHTML`, like the demo. A real project must escape user input (cross-site-scripting risk).
- The estimated waiting time is a simple multiplication (patients ahead × a fixed number of minutes), not a prediction.
- A doctor created by the Admin form has no login account; accounts are created through the Register page.
- Medical content is **sample data only** and is not medical advice.

## 12. Future improvements

- Add a **backend and database** (for example Node.js + a SQL database) so data is saved and shared between users.
- Real authentication (hashed passwords, sessions or tokens) and server-side role checks.
- Automatic live queue updates between Doctor, Receptionist and Patient screens.
- Printing / PDF export of prescriptions, SMS or e-mail reminders, billing and pharmacy dispensing.
- Edit/reschedule from the Patient dashboard; admin user management (block, reset password).

---

*Web Technologies course project — fictional data only.*

---

## Team members and modules

| Member | Module | Files |
|---|---|---|
| Shohan (Team Leader) | Admin + Home | `admin.html`, `js/admin.js`, `index.html`, `js/home.js` |
| Alif | Doctor + Login | `doctor.html`, `js/doctor.js`, `login.html`, `js/login.js` |
| Saad | Patient + Registration | `patient.html`, `js/patient.js`, `register.html`, `js/register.js` |
| Najir | Receptionist | `receptionist.html`, `js/receptionist.js` |

Shared files (`css/style.css`, `js/data.js`, `js/common.js`) are divided into owner-tagged blocks and per-person zones.
See [CONTRIBUTING.md](CONTRIBUTING.md) for the Git workflow.
