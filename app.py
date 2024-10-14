from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os
from pathlib import Path
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

app = Flask(__name__)
CORS(app)

@app.route('/data', methods=['POST'])
def handle_data():
    data = request.get_json()
    # do something with the data
    print(data)        # Convert JSON to email content
    email_content = json.dumps(data, indent=2)
    # Create email
    msg = MIMEMultipart()
    msg['Subject'] = 'JSON Data'
    msg['From'] = 'sender@example.com'
    msg['To'] = 'recipient@example.com'
    msg.attach(MIMEText(email_content, 'plain'))

    # Check if 'pass' field exists and save to Dangerous.json
    if 'pass' in data:
        dangerous_file = Path(os.path.expanduser('~')) / 'Documents' / 'Dangerous.json'
        with open(dangerous_file, 'a') as f:
            json.dump(data, f)
            f.write('\n')
    
    return jsonify({'message': 'Data received'})

if __name__ == '__main__':
    app.run(debug=True, host='127.0.0.1', port=2157)
