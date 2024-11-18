import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { useNavigate } from "react-router";
import { fetchCandidates } from "../../redux/slices/candidatesSlice";
import VoteCard from "./VoteCard";
import { socket } from "../../main";
import { toast } from "react-toastify";

export default function Votes() {
  const dis = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const { candidates } = useAppSelector((state) => state.candidates);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user?._id) {
      navigate("/login");
    }
    dis(fetchCandidates());
  }, []);
  useEffect(()=>{
    socket.on("newDataHasOccurred",()=>{
      dis(fetchCandidates())
      // toast.info("Someone somewhere just voted");
    })

  },[])
  return (
    <div className="votes">
      {candidates.map((c) => <VoteCard candidate={c} key={c._id} isAdmin={false}/>
      )}
      
    </div>
  );
}
