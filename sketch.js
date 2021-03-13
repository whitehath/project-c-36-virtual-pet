var dog, database, foodS, foodStock;
var dog_img, dog_img1;
var food, fedTime, lastFed, feed, addFood;
var nam

function preload(){
  dog_img = loadImage('Dog.png');
  dog_img1 = loadImage('happy dog.png')
}

function setup(){
  createCanvas(1000, 500);

  food = new Food();

  dog = createSprite(750, 300, 10, 10);
  dog.addImage(dog_img);
  dog.scale = 0.2;

  database = firebase.database();
  foodStock = database.ref('Food');
  foodStock.on("value", readStock);

  feed = createButton("Feed The Dog");
  feed.position(1000, 75);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(900, 75);
  addFood.mousePressed(addFoods);

  nam = prompt("WHAT IS YOUR DOG NAME");
}

function draw(){
  background(46, 139, 87);

  fedTime = database.ref('FeedTime');
  fedTime.on("value", function(data){
    lastFed = data.val();
  });
  push();
  textSize(20)
  fill("black")
    text("Feed " + nam + " some milk!",600,100);
  textSize(20);
  fill ("black");
  if(lastFed >= 12){
    text("Last Fed: "+ lastFed % 12 + " PM", 350, 45);
  }
  
  else if(lastFed==0){
    text("Last Fed: 12 AM", 350, 45);
  }
  
  else{
    text("Last Fed: "+ lastFed + " AM", 350, 45);
  }

  food.display();
  pop();
  drawSprites();
}

function readStock(data){
  foodS = data.val();
  food.updateFoodStock(foodS);
}

function feedDog(){
  dog.addImage(dog_img1);

  food.updateFoodStock(food.getFoodStock() - 1);
  database.ref('/').update({
    Food: food.getFoodStock(),
    FeedTime: hour()
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food: foodS
  })
}