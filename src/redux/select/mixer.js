export function activeEntityIdSelector(state, props) {
  return props.route.params && props.route.params.entityId
}
