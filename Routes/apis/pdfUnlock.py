import sys
import PyPDF2

sys.stdout.reconfigure(encoding='utf-8')  # Set encoding to UTF-8

def unlock_pdf(input_pdf_path, output_pdf_path, password):
    try:
        with open(input_pdf_path, "rb") as pdf_file:
            reader = PyPDF2.PdfReader(pdf_file)

            if reader.is_encrypted:
                if not reader.decrypt(password):
                    print("❌ Error: Incorrect password.")
                    return
                
            writer = PyPDF2.PdfWriter()

            for page in reader.pages:
                writer.add_page(page)

            with open(output_pdf_path, "wb") as output_file:
                writer.write(output_file)

        print(f"✅ PDF successfully unlocked! Saved at: {output_pdf_path}")  # Unicode works now
    except Exception as e:
        print(f"❌ Error unlocking PDF: {str(e)}")  # Unicode works now

if __name__ == "__main__":
    if len(sys.argv) != 4:
        print("Usage: python pdfUnlock.py <input_pdf> <output_pdf> <password>")
        sys.exit(1)

    input_pdf = sys.argv[1]
    output_pdf = sys.argv[2]
    password = sys.argv[3]

    unlock_pdf(input_pdf, output_pdf, password)
