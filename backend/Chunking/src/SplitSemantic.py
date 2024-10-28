##This is the only file that writes to CSV in csv_output, the rest write to a file in output

import os
from langchain_experimental.text_splitter import SemanticChunker
from langchain_community.embeddings import SentenceTransformerEmbeddings
import pandas as pd
##from langchain_ollama import OllamaEmbeddings
   
embeddings = SentenceTransformerEmbeddings(model_name="all-MiniLM-L6-v2") #Change model here

def create_chunks(infile, metadata):
    with open(infile, 'r') as f:
        text = f.read()
    
    text_splitter = SemanticChunker(embeddings, breakpoint_threshold_type="percentile") #Change breakpoint type here
    
    ##text_splitter = SemanticChunker(OllamaEmbeddings(model="nomic-embed-text"), breakpoint_threshold_type="interquartile")
    
    docs = text_splitter.create_documents([text])
    data = []
    count = 0
    for doc in docs:
        id = count + 1
        vectorDoc = embeddings.embed_query(doc.page_content)
        data.append([id, doc.page_content, metadata, vectorDoc])
        count += 1
    return data
        
def create_csv(data):
    df = pd.DataFrame(data, columns=["id", "content", "metadata", "embedding"])
    outfile = os.path.join('data', 'csv_output', 'embeddings.csv')
    df.to_csv(outfile, index=False)

inputfile = os.path.join('data', 'files', 'mlcc10.md')  #Change the file name here

metadata = {
    "name": "mlcc10.pdf", 
    "section": "Master and Local Control Center Procedures",
    "url": "https://www.iso-ne.com/static-assets/documents/rules_proceds/operating/mast_satllte/mlcc10.pdf",
    "content_type": "pdf",
}

data = create_chunks(inputfile, metadata)
create_csv(data)