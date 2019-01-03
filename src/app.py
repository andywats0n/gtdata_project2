# Externally Visible Server
# If you run the server you will notice that the server is only accessible from your own computer, not from any other in the network. This is the default because in debugging mode a user of the application can execute arbitrary Python code on your computer.

# If you have the debugger disabled or trust the users on your network, you can make the server publicly available simply by adding --host=0.0.0.0 to the command line:

# flask run --host=0.0.0.0
# This tells your operating system to listen on all public IPs.

from flask import Flask, render_template
from logic import payload

app = Flask(__name__)

@app.route('/home', methods=['GET'])
def home():
    return render_template('index.html', payload=payload)

if __name__ == "__main__":
    app.run(debug=True)
