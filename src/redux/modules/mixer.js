import mapValues from 'lodash/mapValues'
import update from 'react/lib/update'

export function getContentInfo(state, props) {
  const { params } = props
  const { entity } = state
  const { groupId, typeId, entityId } = params
  const contentType = `${groupId}/${typeId}`
  const defaultForm = {
    fields: [],
    id: contentType,
    loading: true,
  }
  const form = entity.forms[contentType] || defaultForm
  form.entityId = entityId
  // Grab the values for the form.
  const contententity = entity[contentType] || {}
  // Need to stringify object values...
  const initialValues = contententity[entityId] || { loading: true }
  // console.log(id)
  // state.db.contentTypes.find()
  return {
    form,
    initialValues,
  }
}

// Calling everything a field is kinda crazy.
function getValue(entity, field, value) {
  if (field.type === 'url' && entity.url[value]) {
    return entity[value]
  }
  if (field.type === 'collection') {
    return value.map(val =>
      assembleFieldInfo(entity, field.field, val)
    )
  }
  return value
}

// @field object describing content type
// @value object of the form value
export function assembleFieldInfo(entity, field, value) {
  mapValues(value, (val, id) => {
    const fieldInfo = field[id]
    return {
      ...fieldInfo,
      value: getValue(entity, fieldInfo, val),
    }
  })
}

export const COLLECTION_SORT = 'COLLECTION_SORT'
export function moveCard(dragIndex, hoverIndex) {
  return {
    type: COLLECTION_SORT,
    payload: {
      dragIndex,
      hoverIndex,
    },
  }
}

export const COLLECTION_SAVE = 'COLLECTION_SAVE'
export function saveCards() {
  console.log('save')
  return {
    type: COLLECTION_SAVE,
  }
}

const cards = [
  {
    id: 10,
    text: 'Write a cool JS library',
  },
  {
    id: 2,
    text: 'Make it generic enough',
  }, {
    id: 3,
    text: 'Write README',
  }, {
    id: 4,
    text: 'Create some examples',
  }, {
    id: 5,
    text: 'Spam in Twitter and IRC to promote it (note that this element is taller than the others)',
  }, {
    id: 6,
    text: '???',
  }, {
    id: 7,
    text: 'PROFIT',
  },
]
const initialState = { cards }

function handleSort(state, payload) {
  const { cards } = state
  const { dragIndex, hoverIndex } = payload
  const dragCard = cards[dragIndex]
  // console.log({dragIndex, hoverIndex, dragCard})
  return update(state, {
    cards: {
      $splice: [
        [ dragIndex, 1 ],
        [ hoverIndex, 0, dragCard ],
      ],
    },
  })
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case COLLECTION_SORT:
      return handleSort(state, action.payload)
    default:
      return state
  }
}
