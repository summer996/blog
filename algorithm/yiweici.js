var isAnagram = function (s, t) {
  let slen = s.length;
  let tlen = t.length;
  if (slen !== tlen) return false;

  let obj = {};
  for (let i = 0; i < slen; i++) {
    if (!obj[s[i]]) {
      obj[s[i]] = 1;
    } else {
      obj[s[i]]++;
    }
    if (!obj[j[i]]) {
      obj[j[i]] = -1;
    } else {
      obj[j[i]]--;
    }
  }
  for (let item in obj) {
    if (obj[item] !== 0) return false;
  }
  return true;
};
