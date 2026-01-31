const BASE_URL = 'http://localhost:3000';

// Create Enrollment
export async function createEnrollment(lecturerId: string) {
  const response = await fetch(`${BASE_URL}/enrollments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ lecturerId }),
  });

  if (!response.ok) {
    let errorMessage = 'Failed to create enrollment';
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorData.error || errorMessage;
    } catch (e) {      
    }
    throw new Error(errorMessage);
  }

  return response.json();
}

// Get All Enrollments
export async function getAllEnrollments() {
  const response = await fetch(`${BASE_URL}/enrollments`, {
    method: 'GET',
    credentials: 'include',
  });

  if (!response.ok) {
    let errorMessage = 'Failed to get enrollments';
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorData.error || errorMessage;
    } catch (e) {
      // If response is not JSON, use default message
    }
    throw new Error(errorMessage);
  }

  return response.json();
}

// Get Enrollment by ID
export async function getEnrollmentById(id: string) {
  const response = await fetch(`${BASE_URL}/enrollments/${id}`, {
    method: 'GET',
    credentials: 'include',
  });

  if (!response.ok) {
    let errorMessage = 'Failed to get enrollment';
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorData.error || errorMessage;
    } catch (e) {
      // If response is not JSON, use default message
    }
    throw new Error(errorMessage);
  }

  return response.json();
}

// Delete Enrollment
export async function deleteEnrollment(id: string) {
  const response = await fetch(`${BASE_URL}/enrollments/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  });

  if (!response.ok) {
    let errorMessage = 'Failed to delete enrollment';
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

// Get My Enrollments
export async function getMyEnrollments() {
  const response = await fetch(`${BASE_URL}/enrollments/my`, {
    method: 'GET',
    credentials: 'include',
  });

  if (!response.ok) {
    let errorMessage = 'Failed to get my enrollments';
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