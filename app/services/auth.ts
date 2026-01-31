const BASE_URL = 'http://localhost:3000';

// Student Registration
export async function registerStudent(data: {
  name: string;
  studentNumber: string;
  major: string;
  password: string;
  image: string;
}) {
  const response = await fetch(`${BASE_URL}/auth/student/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    let errorMessage = 'Student registration failed';
    try {
      const errorData = await response.json();
      if (Array.isArray(errorData.message)) {
        errorMessage = errorData.message[0] || errorMessage;
      } else {
        errorMessage = errorData.message || errorData.error || errorMessage;
      }
    } catch (e) {
      // If response is not JSON, use default message
    }
    throw new Error(errorMessage);
  }

  return response.json();
}

// Student Login
export async function loginStudent(data: {
  studentNumber: string;
  password: string;
}) {
  const response = await fetch(`${BASE_URL}/auth/student/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    let errorMessage = 'Student login failed';
    try {
      const errorData = await response.json();
      if (Array.isArray(errorData.message)) {
        errorMessage = errorData.message[0] || errorMessage;
      } else {
        errorMessage = errorData.message || errorData.error || errorMessage;
      }
    } catch (e) {
      // If response is not JSON, use default message
    }
    throw new Error(errorMessage);
  }

  return response.json();
}

// Lecturer Registration
export async function registerLecturer(data: {
  name: string;
  nuptk: string;
  interests: string[];
  password: string;
  image: string;
}) {
  const response = await fetch(`${BASE_URL}/auth/lecturer/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    let errorMessage = 'Lecturer registration failed';
    try {
      const errorData = await response.json();
      if (Array.isArray(errorData.message)) {
        errorMessage = errorData.message[0] || errorMessage;
      } else {
        errorMessage = errorData.message || errorData.error || errorMessage;
      }
    } catch (e) {
      // If response is not JSON, use default message
    }
    throw new Error(errorMessage);
  }

  return response.json();
}

// Lecturer Login
export async function loginLecturer(data: {
  nuptk: string;
  password: string;
}) {
  const response = await fetch(`${BASE_URL}/auth/lecturer/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    let errorMessage = 'Lecturer login failed';
    try {
      const errorData = await response.json();
      if (Array.isArray(errorData.message)) {
        errorMessage = errorData.message[0] || errorMessage;
      } else {
        errorMessage = errorData.message || errorData.error || errorMessage;
      }
    } catch (e) {
      // If response is not JSON, use default message
    }
    throw new Error(errorMessage);
  }

  return response.json();
}

// Get Student Profile
export async function getStudentProfile() {
  const response = await fetch(`${BASE_URL}/auth/student/me`, {
    method: 'GET',
    credentials: 'include',
  });

  if (!response.ok) {
    let errorMessage = 'Failed to get student profile';
    try {
      const errorData = await response.json();
      if (Array.isArray(errorData.message)) {
        errorMessage = errorData.message[0] || errorMessage;
      } else {
        errorMessage = errorData.message || errorData.error || errorMessage;
      }
    } catch (e) {
      // If response is not JSON, use default message
    }
    throw new Error(errorMessage);
  }

  return response.json();
}

// Get Lecturer Profile
export async function getLecturerProfile() {
  const response = await fetch(`${BASE_URL}/auth/lecturer/me`, {
    method: 'GET',
    credentials: 'include',
  });

  if (!response.ok) {
    let errorMessage = 'Failed to get lecturer profile';
    try {
      const errorData = await response.json();
      if (Array.isArray(errorData.message)) {
        errorMessage = errorData.message[0] || errorMessage;
      } else {
        errorMessage = errorData.message || errorData.error || errorMessage;
      }
    } catch (e) {
      // If response is not JSON, use default message
    }
    throw new Error(errorMessage);
  }

  return response.json();
}

// Logout
export async function logout() {
  const response = await fetch(`${BASE_URL}/auth/logout`, {
    method: 'POST',
    credentials: 'include',
  });

  if (!response.ok) {
    let errorMessage = 'Logout failed';
    try {
      const errorData = await response.json();
      if (Array.isArray(errorData.message)) {
        errorMessage = errorData.message[0] || errorMessage;
      } else {
        errorMessage = errorData.message || errorData.error || errorMessage;
      }
    } catch (e) {
      // If response is not JSON, use default message
    }
    throw new Error(errorMessage);
  }

  return response.json();
}