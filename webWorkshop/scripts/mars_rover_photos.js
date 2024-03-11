//url example = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=d7ZqnSj7Wboa6yTxphgCbwnUzMdFcfR6U0t2ZvMe"

//Document elements:
var body = document.body;

var mars_photo = document.querySelector("#mars-rover-photo-container");
var curiosity_figure = document.querySelector("#curiosity_photo_figure");

var sol_selector_input = document.querySelector("#sol_selector_input");
var mars_sol_select_btn = document.querySelector("#mars_sol_select_btn");

var mars_radio = document.querySelectorAll('input[type="radio"][name="camera_options"]');

//selected_camera inital value
var selected_camera = "FHAZ"

/* Functions: */
async function get_photos(url) {
    return fetch(url)
        .then(response => {
            // Check if the request was successful (status code 200)
            if (!response.ok) {
                throw new Error("Network could not produce a response");
            }
            // If successful, parse the JSON response
            return response.json();
        })
        .then(data => {
            // Check if the response data is valid
            if (typeof data === 'object' && data !== null) {
                return data;
            } else {
                throw new Error("Invalid JSON response");
            }
        })
        .catch(error => {
            console.error("Error fetching photos:", error);
            throw error; // Re-throw the error to propagate it further
        });
}

async function display_photos(sol) {
 
    var curiosity_url = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=${sol}&api_key=d7ZqnSj7Wboa6yTxphgCbwnUzMdFcfR6U0t2ZvMe`;
    //Try to display data from API call, catch error if it fails

    mars_radio.forEach(function(element){

        if (element.checked){

            selected_camera = element.value;
        }
    })

    try {

        var photo_data = await get_photos(curiosity_url);
        
        for (let object of photo_data.photos){

            if (object.camera.name == selected_camera){
                create_photo(object.img_src);
            }

        }

    } catch (error) {

        console.error("Error displaying photos:", error);
    }
}


async function create_photo(img_src){

    var photo = document.createElement("img");
    photo.src = img_src;
    photo.className = "mars_photo"

    curiosity_figure.appendChild(photo);
}

//Intial page load code
display_photos(sol_selector_input.value);


/* Event listeners */
mars_sol_select_btn.addEventListener("click", function(event){
    event.preventDefault();

    while(curiosity_figure.firstChild){
        curiosity_figure.removeChild(curiosity_figure.firstChild);
    }
    display_photos(sol_selector_input.value)
});



    
mars_radio.forEach(function(radioButton) {
    radioButton.addEventListener("change", function() {
        
        while(curiosity_figure.firstChild){
            curiosity_figure.removeChild(curiosity_figure.firstChild);
        }
        display_photos(sol_selector_input.value)
    });
});
