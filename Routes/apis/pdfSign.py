import sys
import fitz  # PyMuPDF
import json
import os

def sign_pdf(pdf_path, pages_data_path, output_path):
    try:
        # Load the pages data from JSON
        with open(pages_data_path, 'r') as f:
            pages_data = json.load(f)
        
        signature_path = pages_data['signaturePath']
        pages = pages_data['pages']
        
        # Open the PDF and insert signatures
        doc = fitz.open(pdf_path)
        
        for page_info in pages:
            page_number = page_info['page']
            x = page_info['x']
            y = page_info['y']
            width = page_info['width']
            height = page_info['height']
            
            rect = fitz.Rect(x, y, x + width, y + height)
            if 0 <= page_number < len(doc):
                doc[page_number].insert_image(rect, filename=signature_path)
            else:
                print(f"⚠️ Invalid page number: {page_number}")
        
        doc.save(output_path)
        doc.close()
        
        print("✅ PDF signed successfully")
        return True
    except Exception as e:
        print(f"❌ Error during PDF signing: {str(e)}")
        return False

if __name__ == "__main__":
    if len(sys.argv) != 4:
        print("Usage: python pdfSign.py <pdf_path> <pages_data.json> <output_pdf>")
        sys.exit(1)
    
    pdf_path = sys.argv[1]
    pages_data_path = sys.argv[2]
    output_path = sys.argv[3]
    
    if not os.path.exists(pdf_path):
        print("❌ PDF file not found")
        sys.exit(1)
    
    if not os.path.exists(pages_data_path):
        print("❌ Pages data JSON file not found")
        sys.exit(1)
    
    if not sign_pdf(pdf_path, pages_data_path, output_path):
        sys.exit(1)
