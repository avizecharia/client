import React, { useEffect } from "react";
import { useAppSelector } from "../../redux/store";
import { useNavigate } from "react-router";
import VoteCard from "./VoteCard";
import { ColumnChart } from "@opd/g2plot-react";

export default function Statistics() {
  const { user } = useAppSelector((state) => state.user);
  const { candidates } = useAppSelector((state) => state.candidates);
  const navigate = useNavigate();
  useEffect(() => {
    if (user?._id && !user.isAdmin) {
      navigate("/votes");
    }
    if (!user?._id) {
      navigate("/login");
    }
  }, []);
  const config = {
    xField: "name",
    yField: "votes",
    smooth: true,
    meta: {
      value: {
        max: 15,
      },
    },
  };

  return (
    <div>
      {/* {candidates.map((c) => (
        <VoteCard candidate={c} key={c._id} isAdmin={true} />
      ))} */}
      <ColumnChart
        {...config}
        height={400} 
        data={candidates?.map((c) => ({ name: c.name, votes: c.votes }))}
      />
    </div>
  );
}
