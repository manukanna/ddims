
export const ValidateInputFields = (signUpDetails: any) => {

    for (const key in signUpDetails) {
        if (!signUpDetails[key]) {
          return key; // Return the first missing field
        }
      }
      return null; // Return null if all fields are filled
    

}