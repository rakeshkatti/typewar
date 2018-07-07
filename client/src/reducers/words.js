const words = (state = [], action) => {
    switch (action.type) {
        case "START_GAME": return [...action.payload]
    //   case "ADD_CHARACTER":
    //     return [...state, {
    //         id: action.id,
    //         text: action.text
    //     }];
      default:
        return state;
    }
  };
  
  export default words;