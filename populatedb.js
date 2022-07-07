#! /usr/bin/env node

console.log(
  "This script populates some test items and categories to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/local_library?retryWrites=true"
);

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require("async");
const Item = require("./models/item");
const Category = require("./models/category");

var mongoose = require("mongoose");
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

let items = [];
let categories = [];

function categoryCreate(name, description, callback) {
  const categoryDetail = { name, description };
  const category = new Category(categoryDetail);

  category.save(function (err) {
    if (err) {
      callback(err, null);
      return;
    }

    console.log(`New Category: ${category}`);
    categories.push(category);
    callback(null, category);
  });
}

function itemCreate(
  name,
  description,
  category,
  price,
  numberInStock,
  callback
) {
  const itemDetail = { name, description, price, numberInStock };
  if (category) itemDetail.category = category;

  const item = new Item(itemDetail);

  item.save(function (err) {
    if (err) {
      callback(err, null);
      return;
    }

    console.log(`New Item: ${item}`);
    items.push(item);
    callback(null, item);
  });
}

function createCategories(callback) {
  async.series(
    [
      function (callback) {
        categoryCreate(
          "Action",
          "An action game is a video game genre that emphasizes physical challenges, including hand–eye coordination and reaction-time. The genre includes a large variety of sub-genres, such as fighting games, beat 'em ups, shooter games, and platform games. Multiplayer online battle arena and some real-time strategy games are also considered action games.",
          callback
        );
      },
      function (callback) {
        categoryCreate(
          "Adventure",
          "Adventure genre includes stories that are exciting and sometimes risky. The term, adventure, has been derived from the French term, aventure, which means fate or destiny of a person. It has been in use in English since the Middle Ages. In literature, the term adventure is used in combination with a story. An adventure story is a type of story having a hero who goes through various adventures or expeditions including escape, dangerous events, problems, and solutions, journey to unknown lands and participation in battles or skirmishes, etc.",
          callback
        );
      },
      function (callback) {
        categoryCreate(
          "Strategy",
          "A strategy game or strategic game is a game (e.g. a board game) in which the players' uncoerced, and often autonomous, decision-making skills have a high significance in determining the outcome. Almost all strategy games require internal decision tree-style thinking, and typically very high situational awareness.",
          callback
        );
      },
    ],
    callback
  );
}

function createItems(callback) {
  async.series(
    [
      function (callback) {
        itemCreate(
          "Red Dead Redemption 2",
          `America, 1899.

          Arthur Morgan and the Van der Linde gang are outlaws on the run. With federal agents and the best bounty hunters in the nation massing on their heels, the gang must rob, steal and fight their way across the rugged heartland of America in order to survive. As deepening internal divisions threaten to tear the gang apart, Arthur must make a choice between his own ideals and loyalty to the gang who raised him.`,
          categories[0],
          59.9,
          7,
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Sekiro™: Shadows Die Twice",
          `Carve your own clever path to vengeance in the critically acclaimed adventure from developer FromSoftware, creators of the Dark Souls series.

          In Sekiro™: Shadows Die Twice you are the 'one-armed wolf', a disgraced and disfigured warrior rescued from the brink of death. Bound to protect a young lord who is the descendant of an ancient bloodline, you become the target of many vicious enemies, including the dangerous Ashina clan. When the young lord is captured, nothing will stop you on a perilous quest to regain your honor, not even death itself.
          
          Explore late 1500s Sengoku Japan, a brutal period of constant life and death conflict, as you come face to face with larger than life foes in a dark and twisted world. Unleash an arsenal of deadly prosthetic tools and powerful ninja abilities while you blend stealth, vertical traversal, and visceral head to head combat in a bloody confrontation.
          
          Take Revenge. Restore Your Honor. Kill Ingeniously.`,
          categories[0],
          49.9,
          4,
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Risk of Rain 2",
          `SURVIVE AN ALIEN PLANET
          Over a dozen handcrafted locales await, each packed with challenging monsters and enormous bosses that oppose your continued existence. Fight your way to the final boss and escape or continue your run indefinitely to see just how long you can survive. A unique scaling system means both you and your foes limitlessly increase in power over the course of a game.`,
          categories[0],
          19.9,
          15,
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Raft",
          `By yourself or with friends, your mission is to survive an epic oceanic adventure across
          a perilous sea! Gather debris to survive, expand your raft and set sail towards forgotten and dangerous islands!
          
          
          Trapped on a small raft with nothing but a hook made of old plastic, players awake on a vast,
          blue ocean totally alone and with no land in sight! With a dry throat and an empty stomach,
          survival will not be easy!
          
          Raft throws you and your friends into an epic adventure out on the big open sea, with the
          objective to stay alive, gather resources and build yourself a floating home worthy of
          survival.
          
          Resources are tough to come by at sea: Players will have to make sure to catch whatever debris floats by using their trusty hook and when possible, scavenge the reefs beneath the waves and the islands above.
          However, thirst and hunger is not the only danger in the ocean… watch out for the man-
          eating shark determined to end your voyage!
          
          Find the last parts of civilization still above water. Overcome the challenges therein, uncover the story of its previous inhabitants and find your way to the next destination!`,
          categories[1],
          19.9,
          12,
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Terraria",
          `Dig, Fight, Explore, Build: The very world is at your fingertips as you fight for survival, fortune, and glory. Will you delve deep into cavernous expanses in search of treasure and raw materials with which to craft ever-evolving gear, machinery, and aesthetics? Perhaps you will choose instead to seek out ever-greater foes to test your mettle in combat? Maybe you will decide to construct your own city to house the host of mysterious allies you may encounter along your travels?

          In the World of Terraria, the choice is yours!
          
          Blending elements of classic action games with the freedom of sandbox-style creativity, Terraria is a unique gaming experience where both the journey and the destination are completely in the player’s control. The Terraria adventure is truly as unique as the players themselves!
          
          Are you up for the monumental task of exploring, creating, and defending a world of your own? `,
          categories[1],
          9.9,
          30,
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Sid Meier's Civilization VI",
          `Civilization VI offers new ways to engage with your world: cities now physically expand across the map, active research in technology and culture unlocks new potential, and competing leaders will pursue their own agendas based on their historical traits as you race for one of five ways to achieve victory in the game.`,
          categories[2],
          39.9,
          18,
          callback
        );
      },
      function (callback) {
        itemCreate(
          "WARHAMMER II",
          `Total War: WARHAMMER II is a strategy game of titanic proportions. Choose from four unique, varied factions and wage war your way – mounting a campaign of conquest to save or destroy a vast and vivid fantasy world.

          This is a game of two halves – one a turn-based open-world campaign, and the other intense, tactical real-time battles across the fantastical landscapes of the New World.
          
          Play how you choose – delve into a deep engrossing campaign, experience unlimited replayability and challenge the world in multiplayer with a custom army of your favourite units. Total War: WARHAMMER II offers hundreds of hours of gameplay and no two games are the same. `,
          categories[2],
          49.9,
          4,
          callback
        );
      },
    ],
    callback
  );
}

async.series(
  [createCategories, createItems],
  // Optional callback
  function (err, results) {
    if (err) {
      console.log("FINAL ERR: " + err);
    }

    // All done, disconnect from database
    mongoose.connection.close();
  }
);
