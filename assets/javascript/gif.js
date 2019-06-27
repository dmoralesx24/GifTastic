// global variables/Array
var animalArr = ["dog","cat","bird","rabbit","fish","lion","tiger","frog","chicken","goat","turtle","ferret","whale","shark","chinchilla","hamster","rhino","giraffe"];

// animal buttons made from array 
function animalButtons() {
    $("#animal-buttons").empty();

    for (var i = 0; i < animalArr.length; i++) {
       var buttons = $("<button>");
       buttons.addClass("animal-btn");
       buttons.attr("data-animal", animalArr[i]);
       buttons.text(animalArr[i]);
       $("#animal-buttons").append(buttons);
       
    }
 };

    // functionality for buttons 
    function displayAnimals () {
     var animal = $(this).attr("data-animal");
     var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            animal + "&api_key=5gPpep2jU5FqpDjRzNjjWH1dreFPJMxC&limit=10";
         // api call  
            $.ajax({
                url: queryURL,
                method: "GET"
            })
                .then(function(response) {

                var results = response.data;
                for (var x = 0; x < results.length; x++){
                    var animalDiv = $("<div>");
                    var p = $("<p>").text("Rating: " + results[x].rating);
                    var animalImg = $("<img>");
                    animalImg.addClass("gif")
                    animalImg.attr("src", results[x].images.fixed_height.url);

                    animalDiv.append(p);
                    animalDiv.append(animalImg);

                    $("#animals").prepend(animalDiv);

                }
    
             });
    };
    $("#add-animals").on("click", function(event){
        event.preventDefault();
        
        var newAnimals = $("#animal-input").val().trim();
        animalArr.push(newAnimals);
    
        animalButtons();
    
    });
  
    $(".gif").on("click", function(){
        var state = $(this).attr("data-state");

        if (state === "still"){
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still"); 
        } else {
            $(this).attr("src", $(this).attr("data-animate"));
           $(this).attr("data-state", "animate");
        }
    }) 
  
    $(document).on("click", ".animal-btn", displayAnimals);

    animalButtons();




