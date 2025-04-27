
export const ValidateInputFields = (signUpDetails: any) => {

    for (const key in signUpDetails) {
        if (!signUpDetails[key]) {
          return key; // Return the first missing field
        }
      }
      return null; // Return null if all fields are filled
}

export const generateRandomId = () => {
  const timestamp = new Date().getTime();
  const randomId = 'id-' + timestamp + '-' + Math.floor(Math.random() * 1000000);
  return randomId;
}


export const getCurrentTimeAmPm = () => {
  const currentTime = new Date();
  let hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${ampm}`;
  return formattedTime;
}