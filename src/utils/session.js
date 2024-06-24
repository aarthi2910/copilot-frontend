// session.js

let sessionData = {};

export const setSessionData = (data) => {
    sessionData = data;
};

export const getSessionData = () => {
    return sessionData;
};
