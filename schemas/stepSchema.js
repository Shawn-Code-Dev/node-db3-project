const yup = require('yup')

const errMsg = 'invalid step'

const stepSchema = yup.object().shape({
  instructions: yup
  .string()
  .trim()
  .typeError(errMsg)
  .required(errMsg),
  step_number: yup
  .number()
  .typeError(errMsg)
  .min(1, errMsg)
})

module.exports = stepSchema