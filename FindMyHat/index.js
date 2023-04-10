// import the required npm packages for the game to function

const prompt = require('prompt-sync')({ sigint: true });

const clear = require('clear-screen');

//Global Variables
const hat = '^';
const hole = 'O';
const fieldChar = '░';
const pathCharacter = '*';

/*
const row = 10;
const col = 10;
*/

// Create field


function generateField(height, width, holePercent) {

    const map = new Array(height).fill(0).map(() => new Array(width));     // Generate 10 by 10 Array field

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {

            const probability = Math.random();               // generates a random number

            // assign the field and holes on the field. The number of holes generated should be lesser than the fields generated
            map[y][x] = probability > holePercent ? fieldChar : hole; //? operator used to compare
        }
    }
    return map;
}
function printField(field) {
    clear();
    field.forEach(row => console.log(row.join('')));
}
function isOutOfBounds(position, height, width) {
    return (
        position[0] < 0 ||

        position[0] >= height ||

        position[1] < 0 ||

        position[1] >= width
    );
}
function playGame() {

    //Set constants
    const height = 10;
    const width = 10;
    const percentage = 0.2;
    const field = generateField(height, width, percentage);


    let playerPosition = [0, 0];
    let hatPosition = [Math.floor(Math.random() * height), Math.floor(Math.random() * width)];
    while (hatPosition[0] === 0 && hatPosition[1] === 0) {
        hatPosition = [Math.floor(Math.random() * height), Math.floor(Math.random() * width)];
    }
    field[playerPosition[0]][playerPosition[1]] = pathCharacter;

    field[hatPosition[0]][hatPosition[1]] = hat;

    let playing = true;

    while (playing) {
        printField(field);
        const direction = prompt('Which direction? (up/down/left/right)').toLowerCase();
        const nextPosition = getNextPos(direction, playerPosition);
        if (isOutOfBounds(nextPosition, height, width)) {
            console.log('Out of bounds! - Game End!');
            playing = false;
            break;
        }
        const nextTile = field[nextPosition[0]][nextPosition[1]];
        if (nextTile === hole) {
            console.log('Sorry, you fell into a hole - Game End!.');
            playing = false;
            break;
        } else if (nextTile === hat) {
            console.log('Congratulations, you found your hat!');
            playing = false;
            break;
        }
        field[nextPosition[0]][nextPosition[1]] = pathCharacter;
        playerPosition = nextPosition;
    }

    //<---function playGame ends here--->
}
function getNextPos(direction, position) {
    switch (direction.toLowerCase()) {
        case 'u':
        case 'up':

            return [position[0] - 1, position[1]];
        case 'r':
        case 'right':

            return [position[0], position[1] + 1];
        case 'd':
        case 'down':

            return [position[0] + 1, position[1]];
        case 'l':
        case 'left':

            return [position[0], position[1] - 1];

        default:
            console.log('Enter U, D, L or R.');
            prompt('Which way? (up/down/left/right)').toLowerCase();
            return position;
    }
}
playGame();