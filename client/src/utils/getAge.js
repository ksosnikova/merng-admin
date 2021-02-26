export const getAge = (birthday) => {
  var year = Number(birthday.substr(6, 4));
  var month = Number(birthday.substr(3, 2)) - 1;
  var day = Number(birthday.substr(0, 2));
  var today = new Date();
  var age = today.getFullYear() - year;
  if (today.getMonth() < month || (today.getMonth() == month && today.getDate() < day)) {
    age--;
  }
  return age;
}
