const schemeSchema = require('../../schemas/schemeSchema')
const stepSchema = require('../../schemas/stepSchema')
const Schemes = require('./scheme-model')

const checkSchemeId = async (req, res, next) => {
  try {
  await Schemes.findById(req.params.scheme_id)
  next()
  } catch (err) {
    next({ status: 404, message: `scheme with scheme_id ${req.params.scheme_id} not found`})
  }
  
}

/*
  If `scheme_name` is missing, empty string or not a string:

  status 400
  {
    "message": "invalid scheme_name"
  }
*/
const validateScheme = async (req, res, next) => {
  try {
    const validated = await schemeSchema.validate(req.body)
    req.body = validated
    next()
  } catch (err) {
    next({ status: 400, message: err.message })
  }
  
}

/*
  If `instructions` is missing, empty string or not a string, or
  if `step_number` is not a number or is smaller than one:

  status 400
  {
    "message": "invalid step"
  }
*/
const validateStep = async (req, res, next) => {
  try {
    const validated = await stepSchema.validate(req.body)
    req.body = validated
    next()
  } catch (err) {
    next({ status: 400, message: err.message })
  }
}

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
}
