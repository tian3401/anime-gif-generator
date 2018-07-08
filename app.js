//variables 
var topics = ['my hero academia', 'dragonball z', 'trigun','one punch man','ranma 1/2'],
newImage,
newButton;

//Create function that creates new buttons for topics in the array
function buttonCreator(subject){
    
    var newButton = $('<button>').text(topics[x]);
    $('#buttonContainers').append(newButton);
    }

 
for(x in topics){
    buttonCreator(topics[x]);
}; 


// Create function that creates new buttons for inputs

$('form button').on('click', function(){
    event.preventDefault();
    var userInput = $('input').val();
    var newButton = $('<button>').text(userInput);

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
    }).then(function(res){
        for(x=0;x<10;x++){
            newImg = $('<img>').attr('src',res.data[x].images.downsized_still.url).attr('id', 'gif');
            newButton = $('<button>').attr('data-motion',res.data[x].images.downsized.url).attr('data-toggle','off');
            console.log(res.data);
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
    if(toggle === 'off'){
        
        var pressed = $(this).data('motion');
        console.log('if statement runs');
        newImage = $('<img>').attr('src',pressed);
        button.attr('data-toggle','on').html(newImage);
    }
    if(toggle==='on'){
        console.log('runs else statement');
    }
    

    


});


// Clears the gif container so buttons replace instead of append 
// Keeps the number of gifs to 10 in the gif container 
function clear(){
    $('button #gif').remove();
    $('#gifContainer button').remove();
};