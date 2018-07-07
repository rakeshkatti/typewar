const buffer = (state = [], action) => {
    switch (action.type) {
      case "CHARACTER_TYPED":
        return [...state, {
            id: action.id,
            text: action.text
        }];
      default:
        return state;
    }
  };
  
  export default buffer;