import sys
from pdf2pptx import Converter  # Or any other library like "pdf2ppt"

def pdf_to_ppt(pdf_path, pptx_path):
    # Convert PDF to PPTX
    cv = Converter(pdf_path)
    cv.convert(pptx_path)
    cv.close()

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python pdf_to_ppt.py <input_pdf> <output_pptx>")
        sys.exit(1)

    input_pdf = sys.argv[1]
    output_pptx = sys.argv[2]

    # Convert PDF to PPT
    pdf_to_ppt(input_pdf, output_pptx)
