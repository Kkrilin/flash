const requiredFiled = ["gender", "aadhar_number", "age", "address"];

export const emptyProfileField = (profile = {}) => {
  const field = [];

  for (const key in profile) {
    if (requiredFiled.includes(key) && !profile[key]) {
      field.push(key);
    }
  }
  return field;
};

export const activityArray = [
  {
    name: "swimming",
    unit: "m",
  },
  {
    name: "cycling",
    unit: "km",
  },
  {
    name: "running",
    unit: "km",
  },
  {
    name: "trekking",
    unit: "km",
  },
  {
    name: "walking",
    unit: "m",
  },
];
