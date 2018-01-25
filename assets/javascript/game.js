// Monthly Costs/Income Object and Variables

// function Month(income,rentCost,foodCost,utilCost,healthCost){
//     this.income= income;
//     this.rentCost = rentCost;
//     this.foodCost = foodCost;
//     this.utilCost = utilCost;
//     this.healthCost = healthCost
//   };

var  income = {
        clicks: 0,
        price: 0,
        min: 500,
        max: 2500
      },
    rentCost = {
        clicks: 0,
        price: 0,
        min: 300,
        max: 800
      },
    foodCost = {
        clicks: 0,
        price: 0,
        min: 20,
        max: 100
      },
    utilCost = {
        clicks: 0,
        price: 0,
        min: 60,
        max: 300
      },
    healthCost = {
        clicks: 0,
        price: 0,
        min: 150,
        max: 1200
      };

var month = {};

// Score Counter Variables
var spentMoney = 0;
var goodMonths = 0;
var badMonths = 0;
var savings = 0;
var debt = 0;
var netWorth = 0;

var isBroke = false;
var isPaid = false;


$(document).ready(function() {

  // Start A New Month
  $("#new-month-button").click(function() {
    newMonth(month);
    $("#income").text(month.income.price);
    $("#expenses").text(spentMoney);
  });

  //Cost Button Actions
  $("#rent-button").click(function() {
    if(month.rentCost.clicks < 1){
      spentMoney = spentMoney + month.rentCost.price;
      month.rentCost.clicks += 1;
      $("#game-message").text("The rent is too damn high!");
      $("#expenses").text(spentMoney);
  } else {
      month.rentCost.clicks += 1;
      $("#game-message").text("You already paid rent this month...lucky you.");
    }
  });

  $("#food-button").click(function() {
    if(month.foodCost.clicks < 4){
      spentMoney = spentMoney + month.foodCost.price;
      month.foodCost.clicks += 1;
      $("#game-message").text("Gotta eat something I guess");
      $("#expenses").text(spentMoney);
  } else {
      month.foodCost.clicks += 1;
      $("#game-message").text("You already successfully fed yourself this month. Congrats.");
    }
  });

  $("#utilities-button").click(function() {
    if(month.utilCost.clicks < 1){
      spentMoney = spentMoney + month.utilCost.price;
      month.utilCost.clicks += 1;
      $("#game-message").text("You kept the lights on!");
      $("#expenses").text(spentMoney);
  } else {
      month.utilCost.clicks += 1;
      $("#game-message").text("You already paid your utilities this month ya dummy.");
    }
  });

  // $("#health-cost-button").click(function() {
  //   var healthIssues = randomNumber(0,2);
  //
  //   if(healthIssues = 0){
  //       month.healthCost.clicks +=1;
  //       $("#game-message").text("You got lucky this month with a clean bill of health!");
  //   } else if(healthIssues = 1) {
  //     spentMoney = spentMoney + month.healthCost.price;
  //     month.healthCost.clicks += 1;
  //     $("#game-message").text("Everybody gets sick sometimes.");
  //     $("#expenses").text(spentMoney);
  // } else {
  //     month.rentCost.clicks += 1;
  //     $("#game-message").text("Super unlucky - you broke your leg.");
  //   };
  // });

});


// function(s) to generate the income/cost values and assign them to the variables

function randomNumber(min,max){
  return Math.abs(Math.floor(Math.random()*(min-max+1)))+min;
};

function setCost(obj){
  obj.price = randomNumber(obj.min,obj.max);
  return obj;
};

function setAllCosts(){
  setCost(income);
  setCost(rentCost);
  setCost(foodCost);
  setCost(utilCost);
  setCost(healthCost);
};


function newMonth(obj){
    spentMoney = 0;

    setAllCosts();
    obj.income = income;
    obj.rentCost = rentCost;
    obj.foodCost = foodCost;
    obj.utilCost = utilCost;
    obj.healthCost = healthCost;

    obj.income.clicks = 0;
    obj.rentCost.clicks = 0;
    obj.foodCost.clicks = 0;
    obj.utilCost.clicks = 0;
    obj.healthCost.clicks = 0;

    return obj;
};

// function newMonth(){
//   var month = new Month(income.price,rentCost.price,foodCost.price,utilCost.price,healthCost.price);
//   return month;
// }


// Game Logic
// If you've paid all your bills and your expenses aren't more than your income, you win. Anything leftover is savings.
// If you have outspent your income, you still have to pay all your bills. The excess is added to debt and the month counts as a "debt month".
var game = {
  areYouBroke: function(){
    if(spentMoney > month.income.price){
      isBroke = true;
      return isBroke;
    }
    else {
      isBroke = false;
      return isBroke;
    }
  },
  areYouPaid: function(){
    if(month.rentCost.clicks >= 1 && month.foodCost.clicks >= 4 && month.utilCost.clicks >= 1 && month.healthCost.clicks >=1){
      isPaid = true;
      return isPaid
    } else {
      isPaid = false;
      return isPaid
    }
  },
  updateBalance: function(){
    if(isBroke && isPaid){
      debt = debt + (spentMoney - month.income.price);
      badMonths += 1;
      return debt;
    } else if (!isBroke && isPaid){
      savings = savings + (month.income.price - spentMoney);
      goodMonths +=1;
      return savings;
    };
  },
  updateNetWorth: function(){
    netWorth = savings - debt;
    return netWorth;
  },

  updateText: function(){
    $("#savings-months").text(goodMonths);
    $("#debt-months").text(badMonths);
    $("#savings-total").text(savings);
    $("#debt-total").text(debt);
    $("#net-balance").text(netWorth);
  },
  endMonth: function(){
    if(isPaid){
      game.updateBalance();
      game.updateNetWorth();
      game.updateText();
    };
  },
  rentButton: function(){

  },
  foodButton: function(){

  },
  utilitiesButton: function(){

  },
  healthCostButton: function(){

  }
};



function init(){
  setAllCosts();
  newMonth(month);
  $("#income").text(month.income.price);
};

init();