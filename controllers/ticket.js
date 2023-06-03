const Ticket = require("../models/ticket");
const User=require("../models/user")
const createTicket = async (req, res) => {
  try {
    let repetition = parseInt(req.body.repetition) || 2;
    const userId = req.query.userId;
    if (!userId) {
      return res.status(500).json({
        message: "User Id Is Mandatory!",
      });
    }
    const userCheck=await User.findAll({where:{userId:userId}});
    if(!userCheck.length){
      return res.json("User Doesn't Exist ")
    }
    rows = 3;
    columns = 9;
    var numberGroups = [];
    var fArr = [];
    while (repetition) {
      let min = 1,
        max = 9;
      let k = [];
      for (let i = 0; i < rows; i++) {
        k.push(Array(columns).fill(0));
      }
      // Step 1 :to generate a matrix of atleast one element in a column
      generate(numberGroups, k, columns, min, max);
      // Step 2 :Fill the Rows with exactly 5 elements
      fillUpRows(rows, numberGroups, k);
      // Step3 :Sort Column Wise only non 0 elements 
      sortColumns(k)
      repetition -= 1;
      fArr.push(k);
    }
    const data = await Ticket.create({
      userId: userId,
      data: fArr,
    });
    res.status(200).json(fArr);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getAllTicket = async (req, res) => {
  try {
    const userId = req.query.userId;
    if (!userId) {
      return res.status(402).json("User Id Is Mandatory !");
    }
    const userCheck=await User.findAll({where:{userId:userId}});
    if(userCheck.length){
      const userReturnedData = await Ticket.findAll({where:{userId:userId}});
      if (userReturnedData.length==0) {
        return res.json("No Records Found !!")
      }
      return res.status(200).json({
         userReturnedData,
         "TicketCountForPagination":userReturnedData.map((item) => item.data.length)
      });
    }
    return res.json("No user Found !")
  } catch (error) {
   res.json(error)
  }
};
module.exports = {
  createTicket,
  getAllTicket
};

function countRowElement(r, k) {
  return k[r].filter((element) => element !== 0).length;
}
function getRandomRow() {
  return getRandomNumber(0, 2);
}
function getRandomColumn() {
  return getRandomNumber(0, 8);
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generate(numberGroups, k, columns, min, max) {
  for (var c = 0; c < columns; c++) {
    let r = getRandomRow();
    let num = getRandomNumber(min, max);
    while (numberGroups.includes(num)) {
      var rework = getRandomNumber(min, max);
      num = rework;
    }
    var ck = countRowElement(r, k);
    if (ck == 5) break;
    numberGroups.push(num);
    k[r][c] = num;
    min = max + 1;
    max = max + 10;
    if (c == columns - 1) max = max + 1;
  }
  return true;
}

function fillUpRows(rows, numberGroups, k) {
  for (var r = 0; r < rows; r++) {
    while (countRowElement(r, k) < 5) {
      var randomColumn = getRandomColumn();
      var cmin = randomColumn * 10;
      var cmax = cmin + 9;
      if (randomColumn == 8) cmax += 1;
      var value = getRandomNumber(cmin, cmax);
      if (!numberGroups.includes(value) && k[r][randomColumn] == 0) {
        k[r][randomColumn] = value;
        numberGroups.push(value);
      }
    }
  }
  return true;
}



function sortColumns(arr) {
  for (let c = 0; c < arr[0].length; c++) {
    sortColumn(arr, c);
  }
}

function sortColumn(arr, column) {
  const columnElements = [];
  

  for (let r = 0; r < arr.length; r++) {
    if (arr[r][column] !== 0) {
      columnElements.push(arr[r][column]);
    }
  }
  
  columnElements.sort((a, b) => a - b);

  let nonZeroIndex = 0;
  for (let r = 0; r < arr.length; r++) {
    if (arr[r][column] !== 0) {
      arr[r][column] = columnElements[nonZeroIndex];
      nonZeroIndex++;
    }
  }
}


