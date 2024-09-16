export const getErrorTitle = (error: Error) => {
  console.error(error.message);
  let message = error.message;
  if (message.includes('Contract Call')) {
    message = message.split('Contract Call')[0]
  } else {
    message = message.split(new RegExp('\n'))[0];
  }
  return message;
}