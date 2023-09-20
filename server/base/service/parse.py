import email

def parse_email(email_content: str):
    # Create an EmailMessage object from the email content
    msg = email.message_from_string(email_content)

    # Extract the email body
    email_body = ""
    if msg.is_multipart():
        for part in msg.walk():
            content_type = part.get_content_type()
            content_disposition = str(part.get("Content-Disposition"))

            # Extract text/plain content
            if "attachment" not in content_disposition and "text/plain" in content_type:
                email_body = part.get_payload(decode=True)

    # You can access other parts of the email, such as attachments, if needed

    # Return the parsed email data as a dictionary
    return msg
