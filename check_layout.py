import os

directory = '/Users/emmawailes/Documents/PROJECT/ECE/check-your-eligibility-prototype/FSM/Private_beta/v7'
layout_line = '{% extends "layouts/FSM/v7/layout-dfe-schoolnav.html" %}'

def count_files_without_layout(directory, layout_line):
    count = 0
    for filename in os.listdir(directory):
        if filename.endswith('.html'):  # Assuming the files are HTML templates
            with open(os.path.join(directory, filename), 'r') as file:
                content = file.read()
                if layout_line not in content:
                    count += 1
    return count

if __name__ == "__main__":
    count = count_files_without_layout(directory, layout_line)
    print(f"Number of files that do not use the layout '{layout_line}': {count}")
