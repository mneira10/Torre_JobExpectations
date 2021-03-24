import requests
import json
from utils.validate_input import validate_required_field_existence
from torre.constants import API_URL, URL, SEARCH_URL

GENOME_USERNAME_FIELD = 'genome_username'
LOCATION_FIELD = 'location'
ROLE_FIELD = 'role'
SALARY_RANGE_FIELD = 'salaryRange'
MIN_SALARY_RANGE_FIELD = 'min'
MAX_SALARY_RANGE_FIELD = 'max'
PERIODICITY_SALARY_RANGE_FIELD = 'periodicity'
REQUIRED_FIELDS = [
    GENOME_USERNAME_FIELD,
    LOCATION_FIELD,
    ROLE_FIELD,
    SALARY_RANGE_FIELD
]
SALARY_RANGE_REQUIRED_FIELDS = [
    MIN_SALARY_RANGE_FIELD,
    MAX_SALARY_RANGE_FIELD,
    PERIODICITY_SALARY_RANGE_FIELD
]


def validate_input(data):
    '''
        Required format:
        {
            "genome_username" : <username>,
            "location" : <location>,
            "role": <role>,
            "salaryRange" : {
                "min" : <min>,
                "max" : <max>,
                "periodicity" : <periodicity>
            }
        }
    '''

    first_order_fields_are_valid, err_msg = validate_required_field_existence(
        REQUIRED_FIELDS, data)

    if not first_order_fields_are_valid:
        return first_order_fields_are_valid, err_msg

    return validate_required_field_existence(SALARY_RANGE_REQUIRED_FIELDS, data[SALARY_RANGE_FIELD])


def get_user_skills(username):
    url = API_URL + 'bios/' + username

    r = requests.get(url=url)
    data = r.json()

    if 'person' not in data:
        # user not found
        return None

    return list(map(lambda x: x['name'], data['strengths']))


def get_industry_skills(role,
                        location,
                        minSalaryRange,
                        maxSalaryRange,
                        salaryRangePeriodicity):

    url = SEARCH_URL + 'opportunities/_search?&lang=en&aggregate=true'
    body = {
        'and': [
            {
                'compensationrange': {
                    'minAmount': minSalaryRange,
                    'maxAmount': maxSalaryRange,
                    'currency': "USD$",
                    'periodicity': salaryRangePeriodicity
                }
            }
        ]
    }

    if role != "":
        body['and'].append({
            "skill/role": {
                'text': role,
                'experience': "potential-to-develop",
            }
        })

    if location != '':
        body['and'].append({
            'location': {
                'term': location,
            }
        })

    r = requests.post(url, json=body)
    data = r.json()

    required_industry_skills = {
        "total": data['total'],
        "skills": data['aggregators']['skill']
    }
    return required_industry_skills


def get_difference_industry_user_skills(user_skills, industry_skills):

    skills_to_be_learned = []
    learned_skills = []
    for skill_object in industry_skills['skills']:
        if skill_object['value'] not in user_skills:
            skills_to_be_learned.append(skill_object)
        else:
            learned_skills.append(skill_object)
    return skills_to_be_learned, learned_skills


def get_skill_differences(data):

    user_skills = get_user_skills(data[GENOME_USERNAME_FIELD])

    if user_skills is None:
        return {"usernameFound": False}

    required_industry_skills = get_industry_skills(
        data[ROLE_FIELD],
        data[LOCATION_FIELD],
        data[SALARY_RANGE_FIELD][MIN_SALARY_RANGE_FIELD],
        data[SALARY_RANGE_FIELD][MAX_SALARY_RANGE_FIELD],
        data[SALARY_RANGE_FIELD][PERIODICITY_SALARY_RANGE_FIELD]
    )

    skills_to_be_learned, learned_skills = get_difference_industry_user_skills(
        user_skills, required_industry_skills
    )

    return {
        'usernameFound': True,
        'user_skills': user_skills,
        'required_industry_skills': skills_to_be_learned,
        'skills_to_learn': skills_to_be_learned,
        'learned_skills': learned_skills

    }
