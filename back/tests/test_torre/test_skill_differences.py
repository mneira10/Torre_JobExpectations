from torre.skill_differences import validate_input, get_user_skills, get_industry_skills, get_difference_industry_user_skills


MOCK_CORRECT_INPUT = {
    "genome_username": "asdas",
    "location": "someLoc",
    "role": "someRole",
    "salaryRange": {
        "min": "",
        "max": 234234,
        "periodicity": "somePeriodicity"
    }
}


def test_validate_input_returns_true_on_correct_input():

    valid_input, _ = validate_input(MOCK_CORRECT_INPUT)

    assert valid_input


def test_validate_input_returns_false_on_missing_keys():

    for key in MOCK_CORRECT_INPUT.keys():
        incorrect_input = MOCK_CORRECT_INPUT.copy()

        del incorrect_input[key]

        valid_input, _ = validate_input(incorrect_input)

        assert not valid_input


def test_get_difference_industry_user_skills_calculates_correct_differences():

    num_user_skills = 10
    num_industry_required_skills = 20
    moq_skill_base_name = 'someSkill'

    moq_user_skills = [moq_skill_base_name +
                       str(i) for i in range(num_user_skills)]

    moq_total_companies_requiring_skill = 2
    moq_industry_required_skills = {
        'total': moq_total_companies_requiring_skill,
        'skills': [{
            'total': moq_total_companies_requiring_skill,
            'value': moq_skill_base_name + str(i)
        } for i in range(num_industry_required_skills)]
    }

    skills_to_be_learned, learned_skills = get_difference_industry_user_skills(
        moq_user_skills, moq_industry_required_skills)

    assert len(skills_to_be_learned) == num_industry_required_skills - \
        num_user_skills
    assert len(learned_skills) == num_user_skills
