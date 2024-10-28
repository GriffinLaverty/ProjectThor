from langchain.text_splitter import RecursiveCharacterTextSplitter
import os

def process_file(data_folder):
    
    with open(data_folder, 'r') as f:
        text = f.read()

    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size = 1000,
        chunk_overlap=200,
        length_function = len,
        is_separator_regex = False
    )

    docs = text_splitter.split_text(text)

    output_path = os.path.join('data', 'output', 'RecursiveOutput.txt')

    with open(output_path, 'w') as w:
        count = 1
        for doc in docs:
            w.write("Chunk " + str(count) + "\n")
            w.write(doc + "\n\n")
            count += 1

    print(f"Output written to {output_path}")

data_folder = os.path.join('data', 'files', 'mlcc10.txt')  # Change the file name here
process_file(data_folder)