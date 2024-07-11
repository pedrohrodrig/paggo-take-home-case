export const getErrorMessage = (response: any) => {
  if (response.message) {
    if (Array.isArray(response.message))
      return response.message.map(formatErrorMessage);
    return [formatErrorMessage(response.message)];
  }
  return ["Unknown error occured"];
};

const formatErrorMessage = (message: string) => {
  return message.charAt(0).toUpperCase() + message.slice(1);
};
