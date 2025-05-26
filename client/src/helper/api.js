import config from "./config";

const { serverBaseUrl } = config;

export const requestConfig = {
  headers: {
    "Content-Type": "application/json",
  },
};

// auth
export const userSignUpUrl = `${serverBaseUrl}/auth/signup`;
export const userSignInUrl = `${serverBaseUrl}/auth/signin`;

// user
export const userBaseUrl = `${serverBaseUrl}/api/users`;

// activity
export const activityBaseUrl = `${serverBaseUrl}/api/activities`;

// dashBoadrActivty

export const dashboardActivityUrl = `${serverBaseUrl}/api/activities/dashboard`;
