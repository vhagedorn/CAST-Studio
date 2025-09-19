interface UserActionPayload {
  action_type: string;
  element_id: string;
  timestamp: string;
}

interface LogResponse {
  message: string;
  action_id: number;
}

export const logUserAction = async (
  elementId: string,
  actionType: string
): Promise<LogResponse> => {
  try {
    const response = await fetch('/api/log-action/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        action_type: actionType,
        element_id: elementId,
        timestamp: new Date().toISOString()
      } as UserActionPayload),
    });

    if (!response.ok) {
      throw new Error('Failed to log user action');
    }

    return await response.json();
  } catch (error) {
    console.error('Error logging user action:', error);
    throw error;
  }
};