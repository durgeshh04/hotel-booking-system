export const signupService = async (data) => {
  try {
    return data;
  } catch (error) {
    console.error("error occurred", error.message);
  }
};

export const loginService = async (data) => {
  try {
    console.log(data);
    return "login successfull";
  } catch (error) {
    console.error(error);
  }
};
