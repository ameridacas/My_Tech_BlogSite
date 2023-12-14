module.exports = {
    currentDate: (date) => {
      return date.toLocaleDateString();
    },
    currentNumber: (number) => {
      return parseInt(number).toLocaleString();
    },
  };
