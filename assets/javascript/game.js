//initializations - create an object that includes the different attribute of every character

$( "document" ).ready(function(){

var char1Image = new Image (255,255);
char1Image.src = "assets/images/bobaFett.png";


var char2Image = new Image (255,255);
char2Image.src = "assets/images/chewbacca.png";

var char3Image = new Image (255,255);
char3Image.src = "assets/images/yoda.png";

var char4Image = new Image (255,255);
char4Image.src = "assets/images/cloneTrooper.png";

var charImages = [ char1Image, char2Image, char3Image, char4Image];


var characters = [ 
  { 
  	"Name": "bobaFett",
  	"HP" : 150,
  	"Power": 2
  },
  { 
  	"Name": "chewbacca",
  	"HP" : 140,
    "Power": 20
  },
  { 
  	"Name": "yoda",
    "HP" : 80, 
    "Power" : 5
  },
  { 
  	"Name": "cloneTrooper",
    "HP" : 50,
    "Power": 20
   }
];


startGame();


// when the document is ready
// append each character and its attr in its own div

function startGame(){


	$.each(characters, function(index,val) {
		var $newDiv = $("<div>");
		$newDiv.attr("class", "char");
		$newDiv.attr("name", characters[index].Name);
		$newDiv.attr("power", characters[index].Power);
		$newDiv.attr("hp", characters[index].HP);
		$newDiv.append(charImages[index]);
		$newDiv.append("<p>"+ "Current HP: " + $newDiv.attr("hp") + "</p>");
		$( "#pickACharacter" ).append( $newDiv );
	});

// the $ used in the variable "$newDiv" is just an identifier

	if ( $( "#enemiesAvailable" ).is(":empty") ) {
		$( "#yourCharHeading").text(" ");
	};


	$( "#pickACharacter" ).on( "click", ".char", function () {
		let char = $(this);
		if ( $( "#enemiesAvailable" ).is(":empty") ) {
			$( "#yourCharacter" ).append(char);
			$( "#enemiesAvailable" ).append($( "#pickACharacter" ));
			$( "#yourCharHeading").text("You chose ...");
			$( "#start").text(" ");	
		};	
	});

	selectAnEnemy();
	letsBattle();
}

// middle parameter in the event listener only listens to that child in the id
// it separates out all the children in that id

function selectAnEnemy() {

			$( "#enemiesAvailable" ).on( "click", ".char", function () {
				let enemy = $(this);
				if ( $( "#yourDefender" ).is(":empty") ) {
					$( "#yourDefender" ).append(enemy);
				};	
			});			
}

function letsBattle() {

			$( "#lightSaber" ).on( "click", function () {
				if ( $( "#enemiesAvailable" ).html().length !==0 &&
					 $( "#yourDefender" ).html().length !==0 ) {
					
					$( "#fightWords" ).html("FLIGHT FLIGHT FLIGHT");

					var myHP =  $( " #yourCharacter > .char" ).attr("hp");
					var myDamage = $( "#yourCharacter > .char" ).attr("power");


					var defendersHP = $( "#yourDefender > .char" ).attr("hp");
					var defendersDamage = $( "#yourDefender > .char" ).attr("power");


					myScore = myHP - defendersDamage;


					$( "#yourCharacter > .char" ).attr("hp", myScore);
					$( "#yourCharacter > .char > p" ).html(myScore);


					myDefenderScore = defendersHP - myDamage;	

					$( "#yourDefender > .char" ).attr("hp", myDefenderScore);
					$( " #yourDefender > .char > p" ).html(myDefenderScore);

					if (myScore <= 0 ){

  						$( "#pickACharacter,#yourCharacter,#enemiesAvailable,#yourDefender,h2").empty();
						$( "#fightWords" ).html("LOSE LOSE LOSE");


					} else if (myDefenderScore <= 0){
						$( "#fightWords" ).html("WIN WIN WIN");
						$( "#yourDefender" ).empty();
						$( "#fightWords" ).html("Pick a new battle");

						if ( $( "#enemiesAvailable > #pickACharacter" ).html().length ==0 ) {
							$( "#fightWords" ).html("YOU WIN");
							$( "#yourCharHeading" ).html(" ");	
							$( "#enemiesAvailableHeading" ).html(" ");
						}
					}

				}




			});			

}






});

