import Email from './Email'
import Dates from './Dates'
import Text from './Text'

export default function(fieldType) {
  switch (fieldType) {
    case 'email':
      return Email;
    case 'date':
    case 'dateTime':
      return Dates;
    case 'email':
      return Email
    default:
      return Text;
  }
}
