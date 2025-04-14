const fs = require('fs');

class UniqueInt {
  /**
   * Process a file containing integers and output unique values in sorted order
   * @param {string} inputFilePath - Path to the input file
   * @param {string} outputFilePath - Path to the output file
   */
  static processFile(inputFilePath, outputFilePath) {
    console.time('Runtime');
    const initialMemory = process.memoryUsage().heapUsed;
    
    try {
      // Create a boolean array to track seen integers
      // Size is 2047 (from -1023 to 1023)
      const seen = new Array(2047).fill(false);
      
      // Read the file line by line
      const fileContent = fs.readFileSync(inputFilePath, 'utf8');
      const lines = fileContent.split('\n');
      
      for (const line of lines) {
        const trimmedLine = line.trim();
        
        // Skip empty lines
        if (trimmedLine === '') continue;
        
        // Check if the line contains exactly one integer
        const parts = trimmedLine.split(/\s+/).filter(part => part !== '');
        if (parts.length !== 1) continue;
        
        // Try to parse the value as an integer
        const value = parseInt(parts[0], 10);
        
        // Skip if not an integer or out of range
        if (isNaN(value) || value < -1023 || value > 1023 || value !== Number(parts[0])) {
          continue;
        }
        
        // Mark this integer as seen (adjust index to account for negative values)
        seen[value + 1023] = true;
      }
      
      // Write unique integers to output file
      let output = '';
      for (let i = 0; i < seen.length; i++) {
        if (seen[i]) {
          // Convert back to original value
          const originalValue = i - 1023;
          output += originalValue + '\n';
        }
      }
      
      // Write to the output file
      fs.writeFileSync(outputFilePath, output);
      
      const finalMemory = process.memoryUsage().heapUsed;
      console.timeEnd('Runtime');
      console.log(`Memory used: ${(finalMemory - initialMemory) / 1024} KB`);
      
    } catch (error) {
      console.error('Error processing file:', error);
    }
  }
}

// This code will run if the file is executed directly
if (require.main === module) {
  // Get command line arguments
  const args = process.argv.slice(2);
  
  if (args.length >= 1) {
    // Use command line arguments for input and output files
    const inputFile = "../sample_input_for_students/" + args[0];
    const outputFile = "../sample_results/" + args[0] + "_results.text";
    console.log(`Processing ${inputFile} to ${outputFile}`);
    UniqueInt.processFile(inputFile, outputFile);
  } else {
    // Default files if no arguments provided
    console.log('No file paths provided. Using default paths.');
    console.log('Usage: node UniqueInt.js <inputFile> <outputFile>');
    
    // Example with default files
    const defaultInputFile = '../sample_input_for_students/small_sample_input_02.txt';
    const defaultOutputFile = '../sample_results/small_sample_input_02.txt_results.txt';
  
    console.log(`Processing ${defaultInputFile} to ${defaultOutputFile}`);
    UniqueInt.processFile(defaultInputFile, defaultOutputFile);
  }
}

module.exports = UniqueInt;