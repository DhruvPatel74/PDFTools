import sys
from pdf2docx import Converter
import fitz  # PyMuPDF

def extract_images_from_pdf(pdf_path, output_folder):
    pdf_document = fitz.open(pdf_path)
    for page_num in range(len(pdf_document)):
        page = pdf_document.load_page(page_num)
        image_list = page.get_images(full=True)
        for img_index, img in enumerate(image_list):
            xref = img[0]
            base_image = pdf_document.extract_image(xref)
            image_bytes = base_image["image"]
            image_ext = base_image["ext"]
            image_filename = f"{output_folder}/page_{page_num + 1}_img_{img_index + 1}.{image_ext}"
            with open(image_filename, "wb") as image_file:
                image_file.write(image_bytes)

def pdf_to_word(pdf_path, docx_path):
    # Convert PDF to Word
    cv = Converter(pdf_path)
    cv.convert(docx_path, start=0, end=None)
    cv.close()

if __name__ == "__main__":
    if len(sys.argv) != 4:
        print("Usage: python pdf_to_word.py <input_pdf> <output_docx> <output_image_folder>")
        sys.exit(1)

    input_pdf = sys.argv[1]
    output_docx = sys.argv[2]
    output_image_folder = sys.argv[3]

    # Extract images from PDF
    extract_images_from_pdf(input_pdf, output_image_folder)

    # Convert PDF to Word
    pdf_to_word(input_pdf, output_docx)