import React from "react";
import Button from "../components/Button";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, refresh } from "../redux/counterSlice";

const CounterRedux = () => {
  const dispatch = useDispatch();
  const counts = useSelector((state) => state.counterStore?.count ?? "Null");
  console.log("counts", counts);
  return (
    <div>
      <h1 className="font-bold text-center text-4xl m-2 p-2 bg-purple-400">
        Welcome to Counter Redux App
      </h1>
      <h2 className="font-bold text-center text-2xl bg-green-300 w-[200px] p-2 mt-7 mb-10 rounded-md mx-auto">
        Count: {counts}
      </h2>
      <div className="flex justify-center text-center">
        <Button children="Increment" onClick={() => dispatch(increment())} />
        <Button
          children="Decrement"
          disabled={counts === 0}
          onClick={() => dispatch(decrement())}
        />
        <Button children="Refresh" onClick={() => dispatch(refresh())} />
      </div>
    </div>
  );
};

export default CounterRedux;
