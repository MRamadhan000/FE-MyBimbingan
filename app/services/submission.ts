const BASE_URL = 'http://localhost:3000';

// Interfaces
export interface SubmissionAttachment {
  id: string;
  fileName: string;
  fileSize: string;
  mimeType: string;
}

export interface SubmissionFeedback {
  id: string;
  content: string;
  status: string;
  createdAt: string;
  lecturer?: {
    id: string;
    name: string;
    nuptk: string;
  };
}

export interface Submission {
  id: string;
  title: string;
  description: string;
  status: string;
  parentId: string | null;
  enrollment: {
    id: string;
    student: {
      id: string;
      name: string;
      studentNumber: string;
      major: string;
    };
    lecturer: {
      id: string;
      name: string;
      nuptk: string;
    };
    createdAt: string;
  };
  attachments: SubmissionAttachment[];
  feedbacks: SubmissionFeedback[];
  createdAt: string;
}

export interface CreateSubmissionData {
  title: string;
  description: string;
  enrollmentId: string;
  files?: FileList | File[];
}

export interface GetSubmissionsResponse {
  message: string;
  data: Submission[];
}

// Create Submission
export async function createSubmission(data: CreateSubmissionData) {
  const formData = new FormData();

  // Add text fields
  formData.append('title', data.title);
  formData.append('description', data.description);
  formData.append('enrollmentId', data.enrollmentId);

  // Add files if provided
  if (data.files) {
    Array.from(data.files).forEach((file) => {
      formData.append('files', file);
    });
  }

  const response = await fetch(`${BASE_URL}/submissions`, {
    method: 'POST',
    credentials: 'include',
    body: formData,
    // Don't set Content-Type header - let browser set it with boundary for multipart/form-data
  });

  if (!response.ok) {
    let errorMessage = 'Failed to create submission';
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

// Get Submissions by Enrollment ID
export async function getSubmissionsByEnrollment(enrollmentId: string): Promise<GetSubmissionsResponse> {
  const response = await fetch(`${BASE_URL}/submissions/enrollment/${enrollmentId}`, {
    method: 'GET',
    credentials: 'include',
  });

  if (!response.ok) {
    let errorMessage = 'Failed to get submissions';
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

// Get Submission by ID
export async function getSubmissionById(id: string) {
  const response = await fetch(`${BASE_URL}/submissions/${id}`, {
    method: 'GET',
    credentials: 'include',
  });

  if (!response.ok) {
    let errorMessage = 'Failed to get submission';
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

// Update Submission Status (for lecturers)
export async function updateSubmissionStatus(id: string, status: string) {
  const response = await fetch(`${BASE_URL}/submissions/${id}/status`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ status }),
  });

  if (!response.ok) {
    let errorMessage = 'Failed to update submission status';
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