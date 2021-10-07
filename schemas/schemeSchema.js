const yup = require('yup')

const errMsg = 'invalid scheme_name'

const schemeSchema = yup.object().shape({
  scheme_name: yup
  .string()
  .trim()
  .typeError(errMsg)
  .required(errMsg)
  .strict()
})

module.exports = schemeSchema
