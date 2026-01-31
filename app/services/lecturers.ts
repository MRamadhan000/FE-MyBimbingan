const BASE_URL = 'http://localhost:3000';

// Get All Lecturers
export async function getAllLecturers() {
  const response = await fetch(`${BASE_URL}/lecturers`, {
    method: 'GET',
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Failed to get lecturers');
  }

  return response.json();
}

// Get Lecturer by ID
export async function getLecturerById(id: string) {
  const response = await fetch(`${BASE_URL}/lecturers/${id}`, {
    method: 'GET',
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Failed to get lecturer');
  }

  return response.json();
}