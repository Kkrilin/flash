import config from "./config";

const { serverBaseUrl } = config;

export const requestConfig = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const userSignUpUrl = `${serverBaseUrl}/auth/signup`;
export const userSignInUrl = `${serverBaseUrl}/auth/signin`;
