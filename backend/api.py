import flask
from flask import request, json, Response, jsonify
from flask_cors import CORS

app = flask.Flask(__name__)
CORS(app)
app.config["DEBUG"] = True

physicians = [
	{'id': 1, 'first_name': 'Julius', 'last_name': 'Hibbert','email': 'hibbert@notablehealth.com'},
	{'id': 2, 'first_name': 'Algernop', 'last_name': 'Krieger', 'email': 'krieger@notablehealth.com'},
	{'id': 3, 'first_name': 'Nick', 'last_name': 'Riviera', 'email': 'Riviera@notablehealth.com'},
]

patients = [
	{'id': 1, 'name': 'Sterling Archer'},
	{'id': 2, 'name': 'Cyril Figis'},
	{'id': 3, 'name': 'Ray Gilette'},
	{'id': 4, 'name': 'Lana Kane'},
	{'id': 5, 'name': 'Pam Poovey'},
	{'id': 6, 'name': 'Henry Estes'},
	{'id': 7, 'name': 'Leigh Hamer'},
	{'id': 8, 'name': 'Karson Rojas'},
	{'id': 9, 'name': 'Karishma Joyner'},
	{'id': 10, 'name': 'Sheila Trevino'},
]

appointments = [
	{'id': 1, 'physician_id': 1, 'patient_id': 1, 'time': '8:00AM' , 'kind': 'New Patient'},
	{'id': 2, 'physician_id': 1, 'patient_id': 2, 'time': '9:00AM' , 'kind': 'Follow-up'},
	{'id': 3, 'physician_id': 2, 'patient_id': 3, 'time': '9:00AM' , 'kind': 'New Patient'},
	{'id': 4, 'physician_id': 1, 'patient_id': 4, 'time': '10:00AM' , 'kind': 'New Patient'},
	{'id': 5, 'physician_id': 3, 'patient_id': 5, 'time': '8:00AM' , 'kind': 'Follow-up'},
	{'id': 6, 'physician_id': 2, 'patient_id': 6, 'time': '10:00AM' , 'kind': 'Follow-up'},
	{'id': 7, 'physician_id': 2, 'patient_id': 7, 'time': '11:00AM' , 'kind': 'Follow-up'},
	{'id': 8, 'physician_id': 3, 'patient_id': 8, 'time': '9:00AM' , 'kind': 'Follow-up'},
	{'id': 9, 'physician_id': 1, 'patient_id': 9, 'time': '11:00AM' , 'kind': 'New Patient'},
	{'id': 10, 'physician_id': 1, 'patient_id': 10, 'time': '12:00PM' , 'kind': 'New Patient'},
]

def get_physician(physician_id):
	for physician in physicians:
		if physician['id'] == physician_id:
			return physician

def find_patient(patient_id):
	for patient in patients:
		if patient['id'] == patient_id:
			return patient['name']

@app.route('/physicians', methods=['GET'])
def get_physicians():
	return jsonify({'results': physicians})

@app.route('/appointments', methods = ['GET'])
def get_appointments():
	physician = get_physician(int(request.args.get('physician_id')))
	results = list(filter(lambda appointment: appointment['physician_id'] == int(request.args.get('physician_id')), appointments))
	for appointment in results:
		appointment['patient_name'] = find_patient(appointment['patient_id'])
	return jsonify({'results': results, 'physician': physician})

app.run()