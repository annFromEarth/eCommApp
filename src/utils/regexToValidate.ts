export const emailRegExpRFC = /^[\w-\.]+@([\w-]+\.)+[\w-]{1,}$/;

export const nameRegExp = /^[a-z ,.'-]+$/i;

export const passwordRegExp =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const postcodeRegEx = /^[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}$/;

export const streetRegEx = /^[#.0-9a-zA-Z\s,-]+$/;

export const cityRegEx = /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/;

export const numbersOnly = /^[0-9]*$/;
