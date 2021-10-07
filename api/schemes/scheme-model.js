const db = require('../../data/db-config')

function find() { 
    return db('schemes as sc')
      .leftJoin(
        'steps as st',
        'sc.scheme_id',
        'st.scheme_id'
      )
      .select(
        'sc.scheme_id',
        'sc.scheme_name'
      )
      .count('st.step_id as number_of_steps')
      .groupBy('sc.scheme_id')
      .orderBy('sc.scheme_id')
}

async function findById(scheme_id) {
  const rows = await db('schemes as sc')
    .leftJoin('steps as st', 'sc.scheme_id', 'st.scheme_id')
    .select('sc.scheme_id','sc.scheme_name', 'st.step_id', 'st.step_number', 'instructions')
    .where('sc.scheme_id', scheme_id)
    .orderBy('st.step_number')
  
  const result = {
    scheme_id: parseInt(scheme_id),
    scheme_name: rows[0].scheme_name,
    steps: rows.map(step => {
      return {
        step_id: step.step_id,
        step_number: step.step_number,
        instructions: step.instructions
      }
    })
  }
  if (!rows[0].step_id) { result.steps = [] }
  return result
}

async function findSteps(scheme_id) {
  const rows = await db('schemes as sc')
    .leftJoin('steps as st', 'sc.scheme_id', 'st.scheme_id')
    .select('sc.scheme_id','sc.scheme_name', 'st.step_id', 'st.step_number', 'instructions')
    .where('sc.scheme_id', scheme_id)
    .orderBy('st.step_number')
  
  let result = rows.map(step => {
      return {
        step_id: step.step_id,
        step_number: step.step_number,
        instructions: step.instructions,
        scheme_name: step.scheme_name
      }
    })
  if (!rows[0].step_id) { result = [] }
  return result
}

async function add(scheme) { // EXERCISE D
  /*
    1D- This function creates a new scheme and resolves to _the newly created scheme_.
  */
 const [id] = await db('schemes').insert(scheme)
 return findById(id)
}

function addStep(scheme_id, step) { // EXERCISE E
  /*
    1E- This function adds a step to the scheme with the given `scheme_id`
    and resolves to _all the steps_ belonging to the given `scheme_id`,
    including the newly created one.
  */
}

module.exports = {
  find,
  findById,
  findSteps,
  add,
  addStep,
}
