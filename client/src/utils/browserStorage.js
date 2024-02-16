export const loadData = () => {
  try {
    const serializedState = localStorage.getItem('user');

    if (!serializedState) {
      return undefined;
    }
    const user = JSON.parse(serializedState);
    return user;
  } catch (error) {
    return undefined;
  }
};

export const saveData = (state) => {
  try {
    const serializedState = JSON.stringify(state.user);
    localStorage.setItem('user', serializedState);
  } catch (error) {
    console.log(error);
  }
};
