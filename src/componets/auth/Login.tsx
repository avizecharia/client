import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { fetchLogin, fetchRegister } from "../../redux/slices/userSlice";
import { useNavigate } from "react-router";

export default function login() {
  const dis = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user?._id) return;
    return navigate("/votes");
  }, [user]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div>
      <input
        type="text"
        placeholder="User Name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="text"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={() => dis(fetchLogin({ username, password }))}>
        Login
      </button>
    </div>
  );
}
