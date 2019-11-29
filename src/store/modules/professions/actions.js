export function loadProfessionsSuccess(professions) {
  return {
    type: '@professions/LOAD_SUCCESS',
    payload: { professions },
  };
}

export function loadProfessionsRequest() {
  return {
    type: '@professions/LOAD_REQUEST',
  };
}

export function loadProfessionsFailure() {
  return {
    type: '@professions/LOAD_FAILURE',
  };
}
