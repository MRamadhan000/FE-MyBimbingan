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
    throw new Error('Failed to create enrollment');
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
    throw new Error('Failed to get enrollments');
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
    throw new Error('Failed to get enrollment');
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
    throw new Error('Failed to delete enrollment');
  }

  return response.json();
}