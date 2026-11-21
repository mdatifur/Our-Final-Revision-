function showSection(sectionId) {
  for (let i = 0; i < sections.length; i++) {
    let section = document.getElementById(sections[i]);
    let navButton = document.getElementById('nav-' + sections[i]);

    if (sections[i] === sectionId) {
      section.style.display = 'block';
      navButton.className = 'active';
    } else {
      section.style.display = 'none';
      navButton.className = '';
    }
  }
}

function showError(fieldId, message) {
  document.getElementById(fieldId + 'Error').innerHTML = message;

  // Radio-button groups have no single element with this id, so check first
  let field = document.getElementById(fieldId);
  if (field != null) {
    field.style.border = '2px solid red';
  }
}

function clearError(fieldId) {
  document.getElementById(fieldId + 'Error').innerHTML = '';

  let field = document.getElementById(fieldId);
  if (field != null) {
    field.style.border = ''; // "" gives the border back to the CSS file
  }
}

// Clears the errors of many fields at once; fieldIds is an array
function clearErrors(fieldIds) {
  for (let i = 0; i < fieldIds.length; i++) {
    clearError(fieldIds[i]);
  }
}

function showMessage(boxId, text, type) {
  let box = document.getElementById(boxId);
  box.innerHTML = text;
  box.className = 'message ' + type;
  box.style.display = 'block';
}

function hideMessage(boxId) {
  document.getElementById(boxId).style.display = 'none';
}

function containsText(text, keyword) {
  return String(text).toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
}

// Finds the position (index) of the object whose id matches, or -1
function findIndexById(list, id) {
  for (let i = 0; i < list.length; i++) {
    if (list[i].id === id) {
      return i;
    }
  }
  return -1;
}

// Returns the object whose id matches, or null when there is none
function findById(list, id) {
  let index = findIndexById(list, id);
  if (index === -1) {
    return null;
  }
  return list[index];
}

// Returns a NEW array without the element at "index".
// slice() copies part of an array and concat() joins two arrays.
function removeAt(list, index) {
  return list.slice(0, index).concat(list.slice(index + 1));
}

// Makes the next id, e.g. nextId("P", patients) gives "P-1007"
// and nextId("A", appointments) gives "A-2018".
// It looks for the biggest number already used and adds 1.
function nextId(prefix, list) {
  let biggest = 0;
  let digits = 3;
  for (let i = 0; i < list.length; i++) {
    let numberText = list[i].id.slice(prefix.length + 1); // "P-1006" -> "1006"
    digits = numberText.length;
    if (Number(numberText) > biggest) {
      biggest = Number(numberText);
    }
  }

  // Add zeros at the front until the number has enough digits: 8 -> "008"
  let newNumber = String(biggest + 1);
  while (newNumber.length < digits) {
    newNumber = '0' + newNumber;
  }
  return prefix + '-' + newNumber;
}

// Sorts a list of objects by their "date" property (simple bubble sort).
// newestFirst = true puts the latest date first, false puts the oldest first.
// Dates are "YYYY-MM-DD" texts, so comparing the texts also compares the dates.
function sortByDate(list, newestFirst) {
  for (let i = 0; i < list.length - 1; i++) {
    for (let j = 0; j < list.length - 1 - i; j++) {
      let swap;
      if (newestFirst) {
        swap = list[j].date < list[j + 1].date;
      } else {
        swap = list[j].date > list[j + 1].date;
      }
      if (swap) {
        let temp = list[j];
        list[j] = list[j + 1];
        list[j + 1] = temp;
      }
    }
  }
  return list;
}

// Short names for ids: patientName("P-1001") gives "Farhan Kabir"
function patientName(patientId) {
  let patient = findById(patients, patientId);
  if (patient === null) {
    return 'Unknown patient';
  }
  return patient.name;
}

function doctorName(doctorId) {
  let doctor = findById(doctors, doctorId);
  if (doctor === null) {
    return 'Unknown doctor';
  }
  return doctor.name;
}

// A badge colour for each appointment status (switch, like the demo)
function appointmentColor(status) {
  switch (status) {
    case 'Completed':
      return 'green';
    case 'Cancelled':
      return 'red';
    case 'Checked-in':
      return 'blue';
    case 'In Consultation':
      return 'teal';
    default:
      return 'orange'; // Pending
  }
}

/* ---------------------------------------------------------------------
   10. ACTIVITY LOG AND NOTIFICATIONS
   [OWNER: Shohan]
   --------------------------------------------------------------------- */

// Writes one entry into the activity log (the Admin reads it)
function addLog(type, message) {
  activityLog.push({
    time: nowString(),
    user: currentUser.username,
    type: type,
    message: message,
  });
}

// Makes a new notification for the user with this id
function addNotification(userId, type, message) {
  if (userId === '') {
    return; // some patients and doctors have no login account
  }
  notifications.push({
    id: nextId('N', notifications),
    userId: userId,
    type: type,
    message: message,
    date: todayString(),
    read: false,
  });
}

// Finds the account of a patient or doctor record (or "" when it has none)
function accountOfPatient(patientId) {
  let patient = findById(patients, patientId);
  if (patient === null) {
    return '';
  }
  return patient.userId;
}

function accountOfDoctor(doctorId) {
  let doctor = findById(doctors, doctorId);
  if (doctor === null) {
    return '';
  }
  return doctor.userId;
}

// Shows the notifications of the logged-in user, newest at the bottom
// (needs  <div id="notificationList">  and  <span id="notificationCount">)
function renderNotifications() {
  let list = document.getElementById('notificationList');
  let shown = 0;
  let unread = 0;
  list.innerHTML = '';

  for (let i = notifications.length - 1; i >= 0; i--) {
    let note = notifications[i];
    if (note.userId === currentUser.id) {
      let item = document.createElement('div');
      item.className = note.read ? 'log-item' : 'log-item unread';
      let button = '';
      if (note.read === false) {
        button =
          " <button type='button' class='btn btn-small btn-secondary' onclick='markRead(" +
          i +
          ")'>Mark as read</button>";
        unread++;
      }
      item.innerHTML =
        "<span class='log-time'>" +
        note.date +
        '</span><br>' +
        "<span class='badge blue'>" +
        note.type +
        '</span> ' +
        note.message +
        button;
      list.appendChild(item);
      shown++;
    }
  }

  if (shown === 0) {
    list.innerHTML = "<p class='empty-row'>You have no notifications.</p>";
  }
  document.getElementById('notificationCount').innerHTML =
    unread + ' unread of ' + shown;
}

function markRead(index) {
  notifications[index].read = true;
  renderNotifications();
}

function markAllRead() {
  for (const note of notifications) {
    if (note.userId === currentUser.id) {
      note.read = true;
    }
  }
  renderNotifications();
}

// <<< SHOHAN END <<<

// >>> SAAD START (Validation helpers, Profile) >>>

/* ---------------------------------------------------------------------
   4. SMALL VALIDATION HELPERS
   Each returns true or false, so they can be used inside if ( ... )
   --------------------------------------------------------------------- */

// true when the user typed nothing (or only spaces)
function isEmpty(value) {
  return value.trim() === '';
}

// A simple e-mail check: something@something.something
function isValidEmail(email) {
  let atPosition = email.indexOf('@');
  let dotPosition = email.indexOf('.', atPosition);

  if (atPosition < 1) {
    return false; // no @, or @ is the first character
  }
  if (dotPosition < atPosition + 2) {
    return false; // no dot after the @
  }
  if (dotPosition === email.length - 1) {
    return false; // the dot is the last character
  }
  return true;
}

// true when every character of text is a digit 0-9
function isDigitsOnly(text) {
  if (text.length === 0) {
    return false;
  }
  let digits = '0123456789';
  for (let i = 0; i < text.length; i++) {
    if (digits.indexOf(text[i]) === -1) {
      return false;
    }
  }
  return true;
}

// A phone number here is 11 digits and starts with 01 (e.g. 01711000001)
function isValidPhone(phone) {
  return (
    isDigitsOnly(phone) && phone.length === 11 && phone.slice(0, 2) === '01'
  );
}

// Returns the value of the ticked radio button in a group, or "" if none
function getRadioValue(groupName) {
  let radios = document.getElementsByName(groupName);
  for (let i = 0; i < radios.length; i++) {
    if (radios[i].checked) {
      return radios[i].value;
    }
  }
  return '';
}

// Returns an array with the values of all ticked checkboxes in a group
function getCheckedValues(groupName) {
  let boxes = document.getElementsByName(groupName);
  let selected = [];
  for (let i = 0; i < boxes.length; i++) {
    if (boxes[i].checked) {
      selected.push(boxes[i].value);
    }
  }
  return selected;
}

/* ---------------------------------------------------------------------
   11. PROFILE (same form ids on every dashboard)
   profileName, profileEmail, profilePhone are editable;
   profileUsername and profileRole are read only.
   --------------------------------------------------------------------- */
function renderProfile() {
  document.getElementById('profileName').value = currentUser.name;
  document.getElementById('profileEmail').value = currentUser.email;
  document.getElementById('profilePhone').value = currentUser.phone;
  document.getElementById('profileUsername').value = currentUser.username;
  document.getElementById('profileRole').value = currentUser.role;

  // Extra details that depend on the role
  let details =
    '<strong>Account id:</strong> ' +
    currentUser.id +
    ' &middot; <strong>Status:</strong> ' +
    currentUser.status;
  if (currentUser.role === 'Doctor') {
    let doctor = findById(doctors, currentUser.doctorId);
    details +=
      '<br><strong>Specialization:</strong> ' +
      doctor.specialization +
      ' &middot; <strong>Department:</strong> ' +
      doctor.department +
      ' &middot; <strong>Room:</strong> ' +
      doctor.room;
  } else if (currentUser.role === 'Patient') {
    let patient = findById(patients, currentUser.patientId);
    details +=
      '<br><strong>Patient id:</strong> ' +
      patient.id +
      ' &middot; <strong>Blood group:</strong> ' +
      patient.bloodGroup +
      ' &middot; <strong>Date of birth:</strong> ' +
      patient.dob;
  } else if (currentUser.role === 'Receptionist') {
    details +=
      '<br><strong>Employee id:</strong> ' +
      currentUser.employeeId +
      ' &middot; <strong>Shift:</strong> ' +
      currentUser.shift;
  }
  document.getElementById('profileDetails').innerHTML = details;
}

function saveProfile() {
  let name = document.getElementById('profileName').value.trim();
  let email = document.getElementById('profileEmail').value.trim();
  let phone = document.getElementById('profilePhone').value.trim();
  let isValid = true;

  clearErrors(['profileName', 'profileEmail', 'profilePhone']);

  if (name.length < 3) {
    showError('profileName', 'Name must be at least 3 characters.');
    isValid = false;
  }
  if (isValidEmail(email) === false) {
    showError('profileEmail', 'Please enter a valid email address.');
    isValid = false;
  }
  if (isValidPhone(phone) === false) {
    showError('profilePhone', 'Phone must be 11 digits and start with 01.');
    isValid = false;
  }
  if (isValid === false) {
    return false;
  }

  // Update the account, then the doctor / patient record that belongs to it
  currentUser.name = name;
  currentUser.email = email;
  currentUser.phone = phone;

  if (currentUser.role === 'Doctor') {
    let doctor = findById(doctors, currentUser.doctorId);
    doctor.name = name;
  } else if (currentUser.role === 'Patient') {
    let patient = findById(patients, currentUser.patientId);
    patient.name = name;
    patient.email = email;
    patient.phone = phone;
  }

  document.getElementById('welcomeName').innerHTML = name;
  addLog(
    'Account',
    currentUser.role + ' ' + currentUser.username + ' updated the profile',
  );
  renderProfile();
  showMessage('profileMessage', 'Your profile was saved.', 'success');
  return false; // stay on the page
}

/* ---------------------------------------------------------------------
   SAAD: add your NEW Patient / Register functions below this line
   --------------------------------------------------------------------- */

// <<< SAAD END <<<
