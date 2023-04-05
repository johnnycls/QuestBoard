export const GENDERS = ["Any Gender", "Male", "Female", "Others"];
export const RATINGS = ["Any Rating", ">4.5", ">4", ">3.5", ">3", ">2.5"];

export function age(dateString) {
  birthday = new Date(dateString);
  var ageDifMs = Date.now() - birthday.getTime();
  var ageDate = new Date(ageDifMs); // miliseconds from epoch
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}
