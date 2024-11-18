import React, { useEffect } from 'react'
import { ICandidate } from '../../types/candidates'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { fetchCandidates, fetchVote } from '../../redux/slices/candidatesSlice'
import { fetchGetUser } from '../../redux/slices/userSlice'
import { socket } from '../../main'

interface Props {
    candidate: ICandidate
    isAdmin:boolean
}

export default function VoteCard({candidate,isAdmin}:Props) {
  const {user} = useAppSelector((state) => state.user);
    const dis = useAppDispatch()
    const handelVote = async() => {
      await dis(fetchVote(candidate._id))
       dis(fetchCandidates())
       dis(fetchGetUser())
      socket.emit("newVote")
    }

  return (
    <div className='vote-card'>
        <img src={candidate.image} />
        <h5> {candidate.name}</h5>
        {isAdmin && <h6>{candidate.votes}</h6>}
        {!isAdmin && <button onClick={handelVote} disabled={user?.hasVoted}>vote</button>}
    </div>
  )
}
