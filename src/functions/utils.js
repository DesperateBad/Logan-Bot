module.exports = (client) => {
  
  client.getNumbersBetween = (x, y) => {
    let numbers = [];
    for (let i = x; i < y; i++) {
      numbers.push(i);
    }
    numbers.push(y);
    
    return numbers;
  };
  
  client.getCleanCurrentDate = () => {
    const d = new Date();
    let day = d.getDate();
    let month = d.getMonth() + 1;
    let year = d.getFullYear();
    let n = `${day}/${month}/${year}`;
    return n;
  };
  
  client.getCleanDate = (date) => {
    let returned = date.split(' ');
    return `${returned[1]} ${returned[2]} ${returned[3]}`;
  };
    
};