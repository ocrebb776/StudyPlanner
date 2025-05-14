"""
Line Counter Utility
This script counts the total number of lines and characters in text-based files
within a directory and its subdirectories. Useful for code metrics and analysis.
"""

import os

def count_lines_in_text_files(directory):
    """
    Count lines and characters in text-based files in a directory tree
    
    Args:
        directory (str): Root directory path to start scanning
        
    Returns:
        int: Total number of lines across all text files
        
    Prints:
        - Per-file line and character counts
        - Total line and character counts across all files
    """
    # Initialize counters
    total_lines = 0
    total_characters = 0
    
    # Define text-based file extensions to process
    # These are common file types that contain readable text/code
    text_file_extensions = {
        '.txt', '.md', '.csv', '.log', '.json', '.xml',
        '.py', '.html', '.css', '.js', ".php"
    }

    # Walk through all files in the directory and its subdirectories
    for root, _, files in os.walk(directory):
        for file in files:
            # Only process files with a text-based extension
            if any(file.endswith(ext) for ext in text_file_extensions):
                file_path = os.path.join(root, file)
                try:
                    # Read and process each file
                    with open(file_path, 'r', encoding='utf-8') as f:
                        line_count = 0
                        char_count = 0
                        
                        # Count lines and characters
                        for line in f:
                            line_count += 1
                            char_count += len(line)
                            
                        # Update totals
                        total_lines += line_count
                        total_characters += char_count
                        
                        # Print file statistics
                        print(f"{file}: {line_count} lines, {char_count} characters")
                except Exception as e:
                    # Report files that couldn't be read
                    print(f"Could not read {file_path}: {e}")

    # Print total statistics
    print(f"Total number of lines in all text-based files: {total_lines}")
    print(f"Total number of characters in all text-based files: {total_characters}")
    return total_lines

# Script entry point
directory_path = "/Applications/XAMPP/xamppfiles/htdocs/webstudyplanner"
count_lines_in_text_files(directory_path)

