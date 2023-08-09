/* Declaring global variables. */
var colors = new Object;
var GAME = new Object;
var timePassed;
var timer = document.getElementsByClassName("timer")[0];
var timerObj;

// EVENT LISTENERS
document.querySelector('table').addEventListener('click', pressCell);

document.getElementById("home").addEventListener('click', homeButton);

document.addEventListener('DOMContentLoaded', renewScoreSheet, false);

document.getElementById('fname').addEventListener("change", updateName);
///////////////////

// EVENT LISTENER FUNCTIONS
/**
 * It checks if the cell is a lamp, if it is, it turns it white and illuminates the cells around it. If
 * it's white or illuminated, it turns it into a lamp and turns the cells around it white.
 * @param e - the event object
 */
function pressCell(e){
    let cell = e.target;
    if(cell.matches(".lamp")){
        cell.classList.replace("lamp", "white"); 
        toggle_illuminate(colors['.r' + cell.dataset.j + 'c' + cell.dataset.i], 'illuminated', 'white');
    }
    else if(cell.matches(".white") || cell.matches(".illuminated")){        
        var arr_illuminate = [];
        var temp_cell;
        var temp_class; 
        var temp_ind;
        var not_illuminated_any = true;
        // up
        temp_ind = Number(cell.dataset.j) - 1;
        while (not_illuminated_any){
            temp_class = '.r' + temp_ind-- + 'c' + cell.dataset.i;
            temp_cell = document.querySelector(temp_class); 
            if(temp_cell != null){
                if(temp_cell.classList.contains("black")){
                    break;
                }else if(!temp_cell.classList.contains("lamp")){
                    arr_illuminate.push(temp_class);
                }else{
                    not_illuminated_any = false;
                    alert('Already illuminated from above!');
                    arr_illuminate = [];
                    break;
                };
            }else{
                break;
            }
        }
        
        // down
        temp_ind = Number(cell.dataset.j) + 1;
        while (not_illuminated_any){
            temp_class = '.r' + temp_ind++ + 'c' + cell.dataset.i;
            temp_cell = document.querySelector(temp_class);
            if(temp_cell != null){
                if(temp_cell.classList.contains("black")){
                    break;
                }else if(!temp_cell.classList.contains("lamp")){
                    arr_illuminate.push(temp_class);
                }else{
                    not_illuminated_any = false;
                    alert('Already illuminated from bottom!');
                    arr_illuminate = [];
                    break;
                };
            }else{
                break;
            }
        }
        
        // left
        temp_ind = Number(cell.dataset.i) - 1;
        while(not_illuminated_any){
            temp_class = '.r' + cell.dataset.j + 'c' + temp_ind--;
            temp_cell = document.querySelector(temp_class)
            if(temp_cell != null){
                if(temp_cell.classList.contains("black")){
                    break;
                }else if(!temp_cell.classList.contains("lamp")){
                    arr_illuminate.push(temp_class);
                }else{
                    not_illuminated_any = false;
                    alert('Already illuminated from left!');
                    arr_illuminate = [];
                    break;
                };
            }else{
                break;
            }
        }

        // right
        temp_ind = Number(cell.dataset.i) + 1;
        while(not_illuminated_any){
            temp_class = '.r' + cell.dataset.j + 'c' + temp_ind++;
            temp_cell = document.querySelector(temp_class);
            if(temp_cell != null){
                if(temp_cell.classList.contains("black")){
                    break;
                }else if(!temp_cell.classList.contains("lamp")){
                    arr_illuminate.push(temp_class);
                }else{
                    not_illuminated_any = false;
                    alert('Already illuminated from right!');
                    arr_illuminate = [];
                    break;
                };
            }else{
                break;
            }
        }

        if(not_illuminated_any){
            cell.classList.replace("white", "lamp");
            colors['.r' + cell.dataset.j + 'c' + cell.dataset.i] = arr_illuminate;
            toggle_illuminate(arr_illuminate, 'white', 'illuminated');
        }
    }

    if(isGameOver()){
        document.getElementsByTagName("table")[0].innerHTML = '';
        textAppearance();
        var scores = JSON.parse(localStorage.getItem("scores"));
        if(scores === null){
            scores = []
        }
        console.log(scores);
        scores.push({"name": GAME["name"], "level": GAME["level"], "score": timePassed});
        console.log(scores);
        window.localStorage.setItem("scores", JSON.stringify(scores));
        window.clearInterval(timerObj);
        timer.innerHTML = "00:00"
        renewScoreSheet();
    }
    processBlackCells();
}

/**
 * It clears the table, hides the div, and calls the textAppearance function.
 */
function homeButton(){
    document.getElementById('toHide').style.display = "none";
    document.getElementsByTagName("table")[0].innerHTML = '';
    
    window.clearInterval(timerObj);
    textAppearance();
}

/**
 * It takes the scores from local storage, and creates a table row for each score.
 * </code>
 * @returns the value of the last statement in the function.
 */
function renewScoreSheet(){
    var scores = JSON.parse(window.localStorage.getItem('scores'));
    if (scores === null){return}
    var row, cell, i=1;
    var rows = document.getElementById("score-sheet");
    rows.innerHTML = "";
    scores.forEach(score =>{
        row = document.createElement("tr");
        if(i++ % 2 == 0){
            row.className = "active-row";
        }
        
        //NAME
        cell = document.createElement("td");
        cell.appendChild(document.createTextNode(score['name']));
        row.appendChild(cell);
        //LEVEL
        cell = document.createElement("td");
        cell.appendChild(document.createTextNode(innerText = score['level']));
        row.appendChild(cell);
        //TIME
        cell = document.createElement("td");
        cell.appendChild(document.createTextNode(scoreToTime(parseInt(score['score']))));
        row.appendChild(cell);
        //SCORE
        cell = document.createElement("td");
        cell.appendChild(document.createTextNode(score['score']))
        row.appendChild(cell);

        rows.appendChild(row);
    })
}

/**
 * It gets the name from the input field, sets the GAME['user'] variable to that name, and then updates
 * the userName variable to the GAME['user'] variable.
 */
function updateName(){
    var userName = document.getElementsByClassName("user")[0];
    GAME['user'] = getName();
    userName.innerHTML = GAME['user'];
}
///////////////////////////

// OTHER FUNCTIONS
/**
 * It creates a table with the given level.
 * @param level - the level of the game ('easy', 'advanced', 'extreme')
 */
function tableCreate(level){
    GAME["level"] = level
    let user = getName();
    if(user == ''){
        alert('Write your name in order to continue!');
    }else{
        timePassed = 0;
        timerObj = window.setInterval(scoreUpdate, 1000);
        GAME["name"] = user;
        textAppearance();
        let current_level = levels[level];
        var table = document.getElementsByTagName("table")[0];
        table.innerHTML = "";
        var tblBody = document.createElement("tbody");
        for (var j = 0; j < levels[level].length; j++) {
          var row = document.createElement("tr");
          row.className = 'r' + (j+1);
          for (var i = 0; i < levels[level].length; i++) {
            var cell = document.createElement("td");
            var cell_val = current_level[j][i]; 
            cell.dataset.i = i+1;
            cell.dataset.j = j+1;
            cell.className = row.className + 'c' + (i+1);
            if(cell_val < 0){
                cell.classList.add('white');
                cell.dataset.illuminated_count = 0;
            }else{
                cell.classList.add('black');
                if(cell_val != 4){
                    var cellText = document.createTextNode(cell_val);
                    cell.appendChild(cellText);
                }
            }
            row.appendChild(cell);
          }
          tblBody.appendChild(row);
        }
        table.appendChild(tblBody);
    }
}

/**
 * The function getName() returns the value of the element with the id of fname
 * @returns The value of the element with the id of fname.
 */
function getName(){return document.getElementById('fname').value;}

/**
 * If the element with the id of 'toHide' is not displayed, display it. If it is displayed, hide it.
 * </code>
 */
function textAppearance(){
    var toHide = document.getElementById('toHide');
    var cuteTable = document.getElementsByClassName('styled-table')[0];
    if(toHide.style.display === "none"){
        toHide.style.display = "block";
        cuteTable.style.display = "block";
    }else{
        toHide.style.display = "none";
        cuteTable.style.display = "none"
    }
}

/**
 * If the number of bulbs around a cell is equal to the number in the cell, the cell turns green. If
 * the number of bulbs around a cell is less than or equal to the number in the cell, the cell turns
 * red. Otherwise, the cell turns white.
 */
function processBlackCells(){
    var cell;
    var allowed;
    var level =  levels[GAME['level']];
    for (var i=1;i<=level.length;i++){
        for(var j=1; j<=level.length; j++){
            if(level[i-1][j-1] >= 0 && level[i-1][j-1] < 4){
                cell = document.querySelector(".r" + i + "c" + j);
                allowed = parseInt(cell.innerText);
                if(allowed == countNeighbourBulb(i, j)){
                    cell.style.color = "green";
                }else if(allowed >= countNeighbourBulb(i, j)){
                    cell.style.color = "red";
                }else{
                    cell.style.color = "white";
                }
            }
        }
    }
}

/**
 * If the color of the cell is not green, return false. Otherwise, return true.
 * @returns a boolean value.
 */
function allGreen(){
    var level =  levels[GAME['level']];
    for (var i=1;i<=level.length;i++){
        for(var j=1; j<=level.length; j++){
            if(level[i-1][j-1] >= 0 && level[i-1][j-1] < 4 && document.querySelector(".r" + i + "c" + j).style.color != "green"){
                    return false;
            }
        }
    }
    return true;
}

/**
 * It counts the number of neighbours of a cell that are lit up.
 * @param r - row
 * @param c - column
 * @returns The number of neighbours that are bulbs.
 */
function countNeighbourBulb(r, c){
    var temp_cell;
    var count = 0;
    //up
    temp_cell = document.querySelector('.r' + (r-1) + 'c' + c); 
    if(temp_cell != null && temp_cell.classList.contains('lamp')){
        count++;
    }
    //down
    temp_cell = document.querySelector('.r' + (r+1) + 'c' + c); 
    if(temp_cell != null && temp_cell.classList.contains('lamp')){
        count++;
    }
    //left
    temp_cell = document.querySelector('.r' + r + 'c' + (c-1));
    if(temp_cell != null && temp_cell.classList.contains('lamp')){
        count++;
    }
    //right
    temp_cell = document.querySelector('.r' + r + 'c' + (c+1));
    if(temp_cell != null && temp_cell.classList.contains('lamp')){
        count++;
    }
    return count;
}

/**
 * It takes an array of cell ids, a class to replace, and a class to replace it with.
 * @param array - an array of strings that are the cell's id's
 * @param current - the class that is currently on the cell
 * @param replaced - the class to replace the current class with
 */
function toggle_illuminate(array, current, replaced){
    var cell;
    array.forEach(element => {
        cell = document.querySelector(element);
        if(current == 'illuminated'){
            if(Number(cell.dataset.illuminated_count) == 1){cell.classList.replace(current, replaced);}
            cell.dataset.illuminated_count = Number(cell.dataset.illuminated_count) - 1;
        }else if(current == 'white'){
            cell.classList.replace(current, replaced);
            cell.dataset.illuminated_count = Number(cell.dataset.illuminated_count) + 1;
        }
    });
}

/**
 * "If any of the cells are white, return false, otherwise return true if all the cells are green."
 * 
 * The function isGameOver() is called in the following function:
 * @returns The function isGameOver() is returning a boolean value.
 */
function isGameOver(){
    for (var j = 1; j <= levels[GAME["level"]].length; j++) {
        for (var i = 1; i <= levels[GAME["level"]].length; i++) {
            if (document.querySelector('.r' + (j) + 'c' + (i)).classList.contains('white')){
                return false;
            }
        }
    }
    return true && allGreen();
}

/**
 * Every second, add one to the timePassed variable, and update the timer element with the new time.
 */
function scoreUpdate(){
    timePassed += 1;
    timer.innerHTML = scoreToTime(timePassed);
}

/**
 * It takes a number of seconds and returns a string in the format of "MM:SS"
 * @param timePassed - The time passed in seconds.
 * @returns The time in minutes and seconds.
 */
function scoreToTime(timePassed){
    var minutes = "", seconds = "";
    if(Math.floor(timePassed / 60) < 10){
        minutes = "0";
    }
    if(Math.floor(timePassed % 60) < 10){
        seconds = "0";
    }
    minutes = minutes + Math.floor(timePassed / 60);
    seconds = seconds + Math.floor(timePassed % 60);

    return (minutes + ":" + seconds);
}
//////////////////