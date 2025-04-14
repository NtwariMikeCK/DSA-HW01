const fs = require('fs');

class UniqueInt {
  /**
   * Process an input file to find unique integers and write them to an output file
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
  
  /**
   * Read the next valid integer from a file
   * Note: This is an alternative implementation that reads one line at a time
   * @param {object} inputFileStream - File stream object
   * @returns {number|null} The next valid integer or null if none is found
   */
  static readNextItemFromFile(inputFileStream) {
    try {
      // This is a placeholder for the file stream reading logic
      // In a real implementation, you would read the next line from the stream
      const line = inputFileStream.readline();
      
      if (!line) return null;
      
      const trimmedLine = line.trim();
      
      // Skip empty lines
      if (trimmedLine === '') return this.readNextItemFromFile(inputFileStream);
      
      // Check if the line contains exactly one integer
      const parts = trimmedLine.split(/\s+/).filter(part => part !== '');
      if (parts.length !== 1) return this.readNextItemFromFile(inputFileStream);
      
      // Try to parse the value as an integer
      const value = parseInt(parts[0], 10);
      
      // Skip if not an integer or out of range
      if (isNaN(value) || value < -1023 || value > 1023 || value !== Number(parts[0])) {
        return this.readNextItemFromFile(inputFileStream);
      }
      
      return value;
    } catch (error) {
      console.error('Error reading from file stream:', error);
      return null;
    }
  }
}

// Example usage
// UniqueInt.processFile('sample_input_02.txt', 'sample_results/sample_input_02.txt_results.txt');

module.exports = UniqueInt;