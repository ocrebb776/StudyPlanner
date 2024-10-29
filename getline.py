import os

def count_lines_in_text_files(directory):
    total_lines = 0
    total_characters = 0
    # Define text-based file extensions to check for
    text_file_extensions = {'.txt', '.md', '.csv', '.log', '.json', '.xml', '.py', '.html', '.css', '.js',".php"}

    # Walk through all files in the directory
    for root, _, files in os.walk(directory):
        for file in files:
            # Only process files with a text-based extension
            if any(file.endswith(ext) for ext in text_file_extensions):
                file_path = os.path.join(root, file)
                try:
                    with open(file_path, 'r', encoding='utf-8') as f:
                        line_count = 0
                        char_count = 0
                        for line in f:
                            line_count += 1
                            char_count += len(line)
                        total_lines += line_count
                        total_characters += char_count
                        print(f"{file}: {line_count} lines, {char_count} characters")
                except Exception as e:
                    print(f"Could not read {file_path}: {e}")

    print(f"Total number of lines in all text-based files: {total_lines}")
    print(f"Total number of characters in all text-based files: {total_characters}")
    return total_lines

# Usage
directory_path = "C:/xampp/htdocs/StudyPlanner"
count_lines_in_text_files(directory_path)
