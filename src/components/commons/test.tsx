import React from 'react';

import { useState,useRef } from "react"

export const Test = () => {
	const testRef = useRef(new Date())
	const [text, setText] = useState('')

	console.log('描画')
  const [receptionDate, setReceptionDate] = useState(new Date())

  const handleSubmit = () => {
    const body = JSON.stringify( testRef.current )
	console.log(body)
    // fetch("/api/patient/registration", { method: "POST", body })
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* <button type="button" onClick={() => setReceptionDate(new Date())}>受付時刻を更新</button> */}
      <button type="button" onClick={() => testRef.current = new Date()}>受付時刻を更新</button>
      <input onChange={(e) => setText(e.target.value)} />
      <button type="submit">患者登録</button>
    </form>
  )
}