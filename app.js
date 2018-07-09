//variables 
var topics = ['my hero academia', 'dragonball z', 'trigun','one punch man','ranma 1/2'],
newImage,
newButton;

//Create function that creates new buttons for topics in the array
function buttonCreator(subject){
    
    newButton = $('<button>').text(topics[x]);
    $('#buttonContainers').append(newButton);
    }

for(x in topics){
    buttonCreator(topics[x]);
}; 

// Create function that creates new buttons for inputs
$('form button').on('click', function(){
    event.preventDefault();
    var userInput = $('input').val();
    newButton = $('<button>').text(userInput);

    $('#buttonContainers').append(newButton); 
    topics.push(userInput);
    $('input').val('');
}); 

//Create function on button click that pings the Giphy api and appends to the page
$(document).on('click','#buttonContainers button', function(){
    clear();
    var pressed = $(this).text();
    var url = 'https://api.giphy.com/v1/gifs/search?api_key=Lrs7zen4xAiiHhb6yY2pVbEs77o9wGd3&q='+ pressed +'&limit=25&offset=0&rating=PG&lang=en';

    $.ajax({
        url: url
    }).then(function call (res){
        for(x=0;x<10;x++){
            newImg = $('<img>').attr('src',res.data[x].images.fixed_height_still.url).attr('id', 'gif');
            newButton = $('<button>').attr('data-motion',res.data[x].images.downsized.url).attr('data-still',res.data[x].images.downsized_still.url).attr('data-toggle','off');
            newButton.append(newImg);
            $('#gifContainer').append(newButton);
        }
    });
});

// Code that plays the gif when the images are pressed 
$(document).on('click', '#gifContainer button', function(){
    var button = $(this);
    var toggle = button.data('toggle');
    
    console.log(toggle);
    if(toggle == 'off'){
        var pressed = $(this).data('motion');
        var still = $('#gif').data('still');
        console.log(still);
        newImage = $('<img>').attr('src',pressed).attr('data-still',still);
        button.removeData('toggle');
        button.attr('data-toggle','on').html(newImage);
    }
    else if(toggle =='on'){
        button.removeData('toggle');
        var still = $(this).data('still');
        newImage = $('<img>').attr('src',still).attr('id','gif');
        console.log(newImage);
        button.attr('data-toggle','off').html(newImage);
    }
});

// Clears the gif container so buttons replace instead of append 
// Keeps the number of gifs to 10 in the gif container 
function clear(){
    $('button #gif').remove();
    $('#gifContainer button').remove();
};