// [Shohan] only Shohan edits sampleDate()
function sampleDate(daysFromToday) {
  let date = new Date();
  date.setDate(date.getDate() + daysFromToday);
  let month = date.getMonth() + 1; // months count from 0
  let day = date.getDate();
  if (month < 10) {
    month = '0' + month;
  }
  if (day < 10) {
    day = '0' + day;
  }
  return date.getFullYear() + '-' + month + '-' + day;
}

//  Hospital settings (single object, read with dot notation)
// [Shohan] only Shohan edits hospitalRules
let hospitalRules = {
  minutesPerPatient: 10, // used for the ESTIMATED waiting time in the queue tracker
  mediumWorkload: 3, // 3 or 4 appointments today  = Medium workload
  highWorkload: 5, // 5 or more appointments today = High workload
  expirySoonDays: 30, // a medicine that expires within 30 days is "expiring soon"
};

// Appointment times that can be booked (every 30 minutes)
// [OWNER: Shohan] only Shohan edits timeSlots
const timeSlots = [
  '09:00',
  '09:30',
  '10:00',
  '10:30',
  '11:00',
  '11:30',
  '12:00',
  '14:00',
  '14:30',
  '15:00',
  '15:30',
  '16:00',
  '16:30',
];

//  Users: everyone who can log in
// status: "Active"  = can log in
//         "Pending" = registered, waiting for the admin to approve (doctors, receptionists)
// doctorId / patientId connect the account to a record in the doctors / patients arrays.
// [OWNER: Alif] only Alif edits users
let users = [
  {
    id: 'U-001',
    name: 'Rifat Hasan',
    username: 'admin',
    password: 'admin1234',
    email: 'admin@evercare.demo',
    phone: '01711000001',
    role: 'Admin',
    status: 'Active',
  },

  {
    id: 'U-002',
    name: 'Dr. Arif Rahman',
    username: 'doctor',
    password: 'doctor123',
    email: 'arif@evercare.demo',
    phone: '01711000002',
    role: 'Doctor',
    status: 'Active',
    doctorId: 'D-101',
  },
  {
    id: 'U-003',
    name: 'Dr. Nusrat Jahan',
    username: 'nusrat',
    password: 'nusrat123',
    email: 'nusrat@evercare.demo',
    phone: '01711000003',
    role: 'Doctor',
    status: 'Active',
    doctorId: 'D-102',
  },
  {
    id: 'U-004',
    name: 'Dr. Imran Chowdhury',
    username: 'imran',
    password: 'imran1234',
    email: 'imran@evercare.demo',
    phone: '01711000004',
    role: 'Doctor',
    status: 'Pending',
    doctorId: 'D-106',
  },

  {
    id: 'U-005',
    name: 'Sumaiya Khan',
    username: 'reception',
    password: 'reception123',
    email: 'sumaiya@evercare.demo',
    phone: '01711000005',
    role: 'Receptionist',
    status: 'Active',
    employeeId: 'EMP-2001',
    shift: 'Morning',
  },

  {
    id: 'U-006',
    name: 'Farhan Kabir',
    username: 'patient',
    password: 'patient123',
    email: 'farhan@mail.com',
    phone: '01711000101',
    role: 'Patient',
    status: 'Active',
    patientId: 'P-1001',
  },
  {
    id: 'U-007',
    name: 'Sadia Islam',
    username: 'sadia',
    password: 'sadia1234',
    email: 'sadia@mail.com',
    phone: '01711000102',
    role: 'Patient',
    status: 'Active',
    patientId: 'P-1002',
  },
];

//  Departments
// [OWNER: Shohan] only Shohan edits departments
let departments = [
  { id: 'DEP-01', name: 'Cardiology' },
  { id: 'DEP-02', name: 'Pediatrics' },
  { id: 'DEP-03', name: 'Neurology' },
  { id: 'DEP-04', name: 'Dermatology' },
  { id: 'DEP-05', name: 'Orthopedics' },
  { id: 'DEP-06', name: 'General Medicine' },
];

//  Medicines in the hospital pharmacy (used by Admin)
// quantity = units in stock now, minStock = reorder level, expiry = "YYYY-MM-DD"
// [OWNER: Shohan] only Shohan edits medicines
let medicines = [
  {
    id: 'M-001',
    name: 'Paracetamol 500 mg',
    category: 'Pain relief',
    quantity: 240,
    minStock: 100,
    expiry: sampleDate(300),
  },
  {
    id: 'M-002',
    name: 'Amoxicillin 250 mg',
    category: 'Antibiotic',
    quantity: 40,
    minStock: 80,
    expiry: sampleDate(180),
  },
  {
    id: 'M-003',
    name: 'Cetirizine 10 mg',
    category: 'Antihistamine',
    quantity: 120,
    minStock: 50,
    expiry: sampleDate(20),
  },
  {
    id: 'M-004',
    name: 'Omeprazole 20 mg',
    category: 'Antacid',
    quantity: 90,
    minStock: 60,
    expiry: sampleDate(-15),
  },
  {
    id: 'M-005',
    name: 'Amlodipine 5 mg',
    category: 'Heart',
    quantity: 150,
    minStock: 60,
    expiry: sampleDate(400),
  },
  {
    id: 'M-006',
    name: 'Salbutamol Inhaler',
    category: 'Respiratory',
    quantity: 25,
    minStock: 30,
    expiry: sampleDate(25),
  },
  {
    id: 'M-007',
    name: 'ORS Sachet',
    category: 'Rehydration',
    quantity: 300,
    minStock: 100,
    expiry: sampleDate(200),
  },
  {
    id: 'M-008',
    name: 'Ibuprofen 400 mg',
    category: 'Pain relief',
    quantity: 10,
    minStock: 50,
    expiry: sampleDate(-60),
  },
];

//  Notifications (used by every role)
// userId says who the notification is for. read: false = unread.
// [OWNER: Shohan] only Shohan edits notifications
let notifications = [
  {
    id: 'N-001',
    userId: 'U-001',
    type: 'Stock',
    message: 'Ibuprofen 400 mg has expired and is low in stock.',
    date: sampleDate(0),
    read: false,
  },
  {
    id: 'N-002',
    userId: 'U-001',
    type: 'Account',
    message: 'Dr. Imran Chowdhury registered and is waiting for approval.',
    date: sampleDate(-1),
    read: false,
  },
  {
    id: 'N-003',
    userId: 'U-001',
    type: 'Appointment',
    message: 'Dr. Arif Rahman has a high workload today (5 appointments).',
    date: sampleDate(0),
    read: true,
  },

  {
    id: 'N-004',
    userId: 'U-002',
    type: 'Queue',
    message: 'Token 3 (Sadia Islam) is waiting in your queue.',
    date: sampleDate(0),
    read: false,
  },
  {
    id: 'N-005',
    userId: 'U-002',
    type: 'Appointment',
    message: 'A follow-up visit was booked for Farhan Kabir next week.',
    date: sampleDate(-1),
    read: true,
  },
  {
    id: 'N-006',
    userId: 'U-003',
    type: 'Queue',
    message: 'Token 2 (Mehedi Hasan) is waiting in your queue.',
    date: sampleDate(0),
    read: false,
  },

  {
    id: 'N-007',
    userId: 'U-005',
    type: 'Appointment',
    message: '3 patients have appointments today and have not checked in yet.',
    date: sampleDate(0),
    read: false,
  },
  {
    id: 'N-008',
    userId: 'U-005',
    type: 'Account',
    message: 'New patient registration form is ready for use.',
    date: sampleDate(-2),
    read: true,
  },

  {
    id: 'N-009',
    userId: 'U-006',
    type: 'Queue',
    message: 'Your token is 4. Please wait near Room 201.',
    date: sampleDate(0),
    read: false,
  },
  {
    id: 'N-010',
    userId: 'U-006',
    type: 'Appointment',
    message: 'Your follow-up appointment is booked for next week.',
    date: sampleDate(-1),
    read: true,
  },
  {
    id: 'N-011',
    userId: 'U-007',
    type: 'Appointment',
    message: 'Your neurology follow-up is in 3 days.',
    date: sampleDate(0),
    read: false,
  },
];

//  Activity history (used by Admin)
// [OWNER: Shohan] only Shohan edits activityLog
let activityLog = [
  {
    time: sampleDate(-3) + ' 09:12',
    user: 'admin',
    type: 'Doctor',
    message: 'Added doctor Dr. Mahbub Alam (D-105)',
  },
  {
    time: sampleDate(-2) + ' 11:40',
    user: 'reception',
    type: 'Patient',
    message: 'Registered patient Rubel Ahmed (P-1005)',
  },
  {
    time: sampleDate(-2) + ' 14:05',
    user: 'reception',
    type: 'Appointment',
    message: 'Booked appointment A-2010 for Sadia Islam',
  },
  {
    time: sampleDate(-1) + ' 16:22',
    user: 'admin',
    type: 'Medicine',
    message: 'Updated stock of Amoxicillin 250 mg',
  },
  {
    time: sampleDate(-1) + ' 08:55',
    user: 'doctor',
    type: 'Prescription',
    message: 'Prescription RX-001 was written for Farhan Kabir',
  },
  {
    time: sampleDate(0) + ' 08:30',
    user: 'imran',
    type: 'Account',
    message:
      'New doctor registration waiting for approval: Dr. Imran Chowdhury',
  },
];
