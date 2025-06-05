import sys
import PyPDF2

sys.stdout.reconfigure(encoding='utf-8')  # Set encoding to UTF-8

def encrypt_pdf(input_pdf_path, output_pdf_path, password):
    try:
        with open(input_pdf_path, "rb") as pdf_file:
            reader = PyPDF2.PdfReader(pdf_file)
            writer = PyPDF2.PdfWriter()

            for page in reader.pages:
                writer.add_page(page)

            writer.encrypt(password)

            with open(output_pdf_path, "wb") as output_file:
                writer.write(output_file)

        print(f"✅ PDF successfully encrypted! Saved at: {output_pdf_path}")  # Unicode works now
    except Exception as e:
        print(f"❌ Error encrypting PDF: {str(e)}")  # Unicode works now

if __name__ == "__main__":
    import sys
    if len(sys.argv) != 4:
        print("Usage: python pdfLock.py <input_pdf> <output_pdf> <password>")
        sys.exit(1)

    input_pdf = sys.argv[1]
    output_pdf = sys.argv[2]
    password = sys.argv[3]

    encrypt_pdf(input_pdf, output_pdf, password)
