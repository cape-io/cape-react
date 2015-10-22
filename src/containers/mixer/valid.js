import memoize from 'lru-memoize';
import {createValidator, isRequired, maxLength, isEmail} from 'utils/validation';

const surveyValidation = createValidator({
  fisrtName: [isRequired, maxLength(10)],
  email: [isRequired, isEmail],
  occupation: maxLength(20), // single rules don't have to be in an array
});
export default memoize(10)(surveyValidation);
