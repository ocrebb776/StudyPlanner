import os

pfile = "printout.txt"
with open(pfile,"w") as f:
    f.write(" ")
total_lines = 0
total_characters = 0
# Define text-based file extensions to check for
text_file_extensions = {'.txt', '.md', '.csv', '.log', '.json', '.xml', '.py', '.html', '.css', '.js',".php"}
# Usage
directory = "C:/xampp/htdocs/StudyPlanner"
# Walk through all files in the directory
for root, _, files in os.walk(directory):
    for file in files:
        if any(file.endswith(ext) for ext in text_file_extensions):
            file_path = os.path.join(root, file)
            pr = file_path.replace("C:/xampp/htdocs/StudyPlanner\\","")
            try:
                with open(file_path, 'r', encoding='utf-8') as f:
                    with open(pfile,"a") as f1:
                        f1.write("\n\n\n---------\n"+pr+"\n---------\n\n\n")
                        f1.write(f.read())
            except Exception as e:
                print("")




