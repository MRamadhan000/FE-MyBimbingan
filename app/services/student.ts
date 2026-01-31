const BASE_URL = 'http://localhost:3000';

// Interfaces
export interface Student {
  id: string;
  name: string;
  studentNumber: string;
  major: string;
}

export interface LecturerSummary {
  id: string;
  name: string;
}

export interface StudentStatistics {
  totalEnrollments: number;
  totalSubmissions: number;
  submissionsByStatus: {
    pending: number;
    revision: number;
    approved: number;
  };
  totalFeedbacks: number;
  lecturers: LecturerSummary[];
}

export interface StudentStatisticsResponse {
  message: string;
  data: {
    student: Student;
    statistics: StudentStatistics;
  };
}

// Get My Statistics
export async function getMyStatistics(): Promise<StudentStatisticsResponse> {
  const response = await fetch(`${BASE_URL}/students/me/statistics`, {
    method: 'GET',
    credentials: 'include',
  });

  if (!response.ok) {
    let errorMessage = 'Failed to get student statistics';
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