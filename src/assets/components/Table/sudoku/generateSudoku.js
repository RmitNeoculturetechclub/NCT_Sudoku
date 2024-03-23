function generateSudoku(level) {
    // Generate an "easy" Sudoku puzzle
    let difficult;
    switch(level) {
        case "easy":
            // code block
            difficult = "medium";
            break;
        case "medium":
            // code block
            difficult = "hard";
            break;
        case "hard":
            // code block
            difficult = "very-hard";
            break;  
        default:
          // code block
          console.log("error");
      }
    var puzzle = sudoku.generate(difficult);

    // Convert the puzzle string into a 2D array
    var puzzleArray = board_string_to_grid(puzzle);
    var puzzleSolve = solveSudoku(puzzle)
    // Log the generated puzzle array to the console
    const board = {value: {board: puzzleArray}, answer: {solution: puzzleSolve}};
    return board;

}

function solveSudoku(puzzle) {
    // Get the puzzle from the webpage

    // Solve the Sudoku puzzle
    var solution = sudoku.solve(puzzle);
    var puzzleArray = board_string_to_grid(solution);
    return puzzleArray;
}

function board_string_to_grid(board_string) {
    var rows = [];
    var cur_row = [];
    for (var i = 0; i < board_string.length; i++) {
        cur_row.push(board_string[i]);
        if (i % 9 == 8) {
            rows.push(cur_row);
            cur_row = [];
        }
    }
    return rows;
}

export {generateSudoku};