from flask import Flask
from flask import request
import torre.skill_differences as skills

app = Flask(__name__)

@app.route('/skillDifferences', methods=['POST'])
def skill_differences():
    if request.method == 'POST':
        input_data = request.json

        valid, err_msg = skills.validate_input(input_data)

        if not valid:
            return err_msg, 400
        
        return skills.get_skill_differences(input_data)
        
