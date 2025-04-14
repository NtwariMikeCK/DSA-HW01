# UniqueInt

A Node.js utility that processes files containing integers and outputs unique values in sorted order.

## Description

UniqueInt is a lightweight, memory-efficient utility designed to read a file containing integers (one per line), identify unique values within a defined range (-1023 to 1023), and output them in sorted order to a new file.

Key features:
- Memory-efficient implementation using a boolean array
- Handles invalid input formats gracefully
- Performance metrics (runtime and memory usage)
- Support for command-line arguments

## Installation

Clone this repository and ensure you have Node.js installed.

```bash
git clone https://github.com/yourusername/uniqueint.git
cd uniqueint
```

## Usage

### Command Line

Run the utility with an input file:

```bash
node UniqueInt.js <inputFileName>
```

The program will:
1. Look for the input file in the `../sample_input_for_students/` directory
2. Generate the output in the `../sample_results/` directory with the naming pattern `<inputFileName>_results.text`

### As a Module

You can also use UniqueInt in your own projects:

```javascript
const UniqueInt = require('./UniqueInt');

// Process a file
UniqueInt.processFile('path/to/input/file.txt', 'path/to/output/file.txt');
```

## Input File Format

The input file should contain integers, one per line. For example:

```
42
-15
1000
42
-15
```

The utility will:
- Skip empty lines
- Skip lines with multiple values
- Skip non-integer values
- Skip integers outside the range -1023 to 1023

## Output Format

The output file will contain all unique integers from the input file, one per line, in ascending order:

```
-15
42
1000
```

## Constraints

- Valid integers must be within the range of -1023 to 1023 (inclusive)
- The implementation is optimized for memory efficiency using a boolean array
- Performance metrics (runtime and memory usage) are displayed in the console

## Project Structure

```
├── UniqueInt.js        # Main implementation file
├── package.json        # Project metadata
├── README.md           # This file
├── sample_input_for_students/   # Directory for input files
└── sample_results/     # Directory for output files
```

## Performance

The utility is designed to be memory-efficient by using a boolean array to track seen integers. This results in:
- Constant memory usage regardless of input file size
- Linear time complexity relative to the input file size
- Minimal memory footprint

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
