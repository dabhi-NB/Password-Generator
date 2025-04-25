import { useState, useCallback, useEffect, useRef } from 'react'


function App() {
  const [length, setlength] = useState(8)
  const [number, setnumber] = useState(false)
  const [char, setchar] = useState(false)
  const [pass, setpass] = useState("")

  const passGenerator = useCallback(() => {
    let p = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (number) str += "0123456789"
    if (char) str += "!@#$%^&*()_+~`-={}[]|:;,./?<>"

    for (let i = 1; i <= length; i++) {
      let c = Math.floor(Math.random() * str.length + 1)
      p += str.charAt(c)
    }
    setpass(p)
  }, [length, number, char, setpass])

  useEffect(() => {
    passGenerator()
  }, [length, number, char, setpass])

  const passref = useRef(null)

const copypass = useCallback(()=>{
  passref.current?.select()
 // passref.current?.setSelectionRange(0,2)
  window.navigator.clipboard.writeText(pass)

},[pass])
  return (
    <>
      <h1>Password Generator</h1>
      <div>
        <input type='text' value={pass} placeholder='Password' readOnly className='itext' ref={passref}></input>
        <button onClick={copypass }>Copy</button>
      </div>
      <div ><input type='range' min={4} max={100} value={length} className='rtype' onChange={(e) => { setlength(e.target.value) }} />
        <label  >length: {length}</label></div>
        <br />
      <div ><input type='checkbox' defaultChecked={number} id='numberid' onChange={() => { setnumber((prev) => !prev) }} />
        <label  >Numbers</label></div>
        <br />
      <div  ><input type='checkbox' defaultChecked={char} id='charid' onChange={() => { setchar((prev) => !prev) }} />
        <label  >Charactors</label></div>
    </>
  )
}

export default App
