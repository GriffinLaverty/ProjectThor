import os
from langchain.text_splitter import CharacterTextSplitter

def process_file(data_folder):
    with open(data_folder, 'r') as f:
        text = f.read()

    text_splitter = CharacterTextSplitter(
    separator = "\n",
    chunk_size = 450,
    chunk_overlap  = 20
    )
    
    docs = text_splitter.create_documents([text])

    output_path = os.path.join('data', 'output', 'FixedOutput.txt')

    with open(output_path, 'w') as w:
        count = 1
        for doc in docs:
            w.write("Chunk " + str(count) + "\n")
            w.write(doc.page_content + "\n\n")
            count += 1

    print(f"Output written to {output_path}")

data_folder = os.path.join('data', 'files', 'mlcc10.txt')  # Change the file name here
process_file(data_folder)