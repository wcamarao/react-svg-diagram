import uuidv4 from 'uuid/v4'

const CREATE_SHAPE = 'CREATE_SHAPE'
const UPDATE_SHAPE = 'UPDATE_SHAPE'
const UPDATE_SELECTION = 'UPDATE_SELECTION'

const initialState = {
  className: '',
  selection: null,
  shapes: [],
}

export const createShape = attributes => ({
  type: CREATE_SHAPE,
  shape: {
    ...attributes,
    id: uuidv4(),
  },
})

export const updateShape = (id, attributes) => ({
  type: UPDATE_SHAPE,
  id,
  attributes,
})

export const updateSelection = (className, selection) => ({
  type: UPDATE_SELECTION,
  className,
  selection,
})

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_SHAPE:
      return {
        ...state,
        shapes: state.shapes.concat(action.shape),
      }
    case UPDATE_SHAPE:
      const shapes = state.shapes.slice()
      const i = shapes.findIndex(s => s.id === action.id)
      shapes[i] = {
        ...shapes[i],
        ...action.attributes,
      }
      return {
        ...state,
        shapes,
      }
    case UPDATE_SELECTION:
      return {
        ...state,
        className: action.className,
        selection: action.selection,
      }
    default:
      return state
  }
}
