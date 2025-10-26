import axios from 'axios';

/**
 * Normalized representation of an API error that can safely be
 * exposed to UI components or logged for debugging.
 */
export function toApiError(error) {
  if (axios.isAxiosError(error)) {
    const responseData = error.response?.data;

    return {
      message: responseData?.message ?? error.message,
      status: error.response?.status ?? null,
      data: responseData ?? null,
      isNetworkError: !error.response,
    };
  }

  return {
    message: error instanceof Error ? error.message : 'Unexpected error',
    status: null,
    data: null,
    isNetworkError: false,
  };
}
