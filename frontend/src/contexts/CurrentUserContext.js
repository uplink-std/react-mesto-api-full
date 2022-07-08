import React from 'react';
import defaultAvatarImage from "../images/student.jpg";

const initialUser = {
  "_id": null,
  "name": "",
  "about": "",
  "avatar": defaultAvatarImage,
  "cohort": "",
  "email": ""
};

const CurrentUserContext = React.createContext(initialUser);

export { CurrentUserContext, initialUser };