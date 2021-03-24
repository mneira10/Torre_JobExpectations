from utils.validate_input import validate_required_field_existence


def test_validate_input_returns_false_on_any_missing_key():
    n_required_fields = 10
    moq_base_field_name = 'someFieldName'
    moq_value_field_name = 'someValue'
    moq_required_fields = [moq_base_field_name +
                           str(i) for i in range(n_required_fields)]

    for moq_req_field in moq_required_fields:
        moq_data = {x: moq_value_field_name +
                    str(i) for i, x in enumerate(moq_required_fields)}

        del moq_data[moq_req_field]

        valid_input, _ = validate_required_field_existence(
            moq_required_fields, moq_data)

        assert not valid_input


def test_validate_input_returns_true_with_correct_format():
    n_required_fields = 10
    moq_base_field_name = 'someFieldName'
    moq_value_field_name = 'someValue'
    moq_required_fields = [moq_base_field_name +
                           str(i) for i in range(n_required_fields)]

    moq_data = {x: moq_value_field_name +
                str(i) for i, x in enumerate(moq_required_fields)}

    valid_input, _ = validate_required_field_existence(
        moq_required_fields, moq_data)

    assert valid_input
