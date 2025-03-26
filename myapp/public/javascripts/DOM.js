document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("addHobby").onclick = function() {
        let hobbies = document.getElementById('hobbiesarray');
        let newHobby = document.createElement('input');
        newHobby.type = 'text';
        newHobby.name = 'hobbies';
        newHobby.placeholder = 'Enter hobby';
        hobbies.appendChild(newHobby);
}});