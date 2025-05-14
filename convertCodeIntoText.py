"""
Code to Text Converter
This script reads all text-based files in a directory and combines them into a single text file
Useful for code review, documentation, or analysis purposes
"""

import os

# Output file path
pfile = "printout.txt"

# Initialize output file
with open(pfile, "w") as f:
    f.write(" ")

# Initialize counters
total_lines = 0
total_characters = 0

# Define text-based file extensions to process
# These are common file types that contain readable text/code
text_file_extensions = {
    '.txt', '.md', '.csv', '.log', '.json', '.xml',
    '.py', '.html', '.css', '.js', ".php"
}

# Set the root directory to scan
directory = "C:/xampp/htdocs/StudyPlanner"

# Walk through all files in the directory and its subdirectories
for root, _, files in os.walk(directory):
    for file in files:
        # Check if file has a text-based extension
        if any(file.endswith(ext) for ext in text_file_extensions):
            # Construct full file path
            file_path = os.path.join(root, file)
            
            # Get relative path for output
            pr = file_path.replace("C:/xampp/htdocs/StudyPlanner\\", "")
            
            try:
                # Read source file
                with open(file_path, 'r', encoding='utf-8') as f:
                    # Append to output file with file separator
                    with open(pfile, "a") as f1:
                        # Add file header with separator
                        f1.write("\n\n\n---------\n" + pr + "\n---------\n\n\n")
                        # Add file contents
                        f1.write(f.read())
            except Exception as e:
                # Silently skip files that can't be read
                print("")




