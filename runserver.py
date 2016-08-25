""" run the server """
from portfolio import app
app.run(debug=True, port=3000, host='0.0.0.0')
