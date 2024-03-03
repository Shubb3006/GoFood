import React, { useEffect,createContext, useContext, useReducer } from "react";

const cardStatecontext = createContext();
const cardDispatchcontext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      const newStateAdd = [
        ...state,
        {
          id: action.id,
          name: action.name,
          qty: action.qty,
          size: action.size,
          price: action.price,
          img: action.img,
        },
      ];
      localStorage.setItem("cartItems", JSON.stringify(newStateAdd)); // Save cart data to localStorage
      return newStateAdd;

    case "REMOVE":
      let newArr = [...state];
      newArr.splice(action.index, 1);
      return newArr;
    case "DROP":
      let empArray=[];
      return empArray;

    case "UPDATE":
      return state.map((item) => {
        // console.log(item.size);
        // console.log(action.size);
        if (item.id === action.id && item.size === action.size) {
          const updatedQty = parseInt(action.qty);
          const itemQty = parseInt(item.qty);
          return {
            ...item,
            qty: updatedQty + itemQty,
            price: action.price + item.price,
          };
        }
        return item;
      });
  }
};
export default function ContextReducer({ children }) {
  const [state, dispatch] = useReducer(reducer, [], () => {
    const storedCartItems = localStorage.getItem("cartItems");
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(state)); // Save cart data to localStorage on every state change
  }, [state]);

  return (
    <div>
      <cardDispatchcontext.Provider value={dispatch}>
        <cardStatecontext.Provider value={state}>
          {children}
        </cardStatecontext.Provider>
      </cardDispatchcontext.Provider>
    </div>
  );
}

export const useCart = () => useContext(cardStatecontext);
export const useDispatch = () => useContext(cardDispatchcontext);
