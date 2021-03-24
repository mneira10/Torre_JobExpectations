
def validate_required_field_existence(required_fields, data_dict):

    for field in required_fields:
        if (field not in data_dict) or (data_dict[field] is None):
            return False, '''The field "{}" is missing, null or empty'''.format(field)
            
    return True, None