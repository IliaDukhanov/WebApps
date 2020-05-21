import React, { useState } from 'react';

function App() {
  const [name, setName] = useState('')
  const [width, setWidth] = useState('')
  const [height, setHeight] = useState('')
  const [colour, setColour] = useState('')
  const [image, setImage] = useState('')
  const [img, setImg] = useState('')
  const [imgWidth, setImgWidth] = useState('')
  const [imgHeight, setImgHeight] = useState('')

  /// Функция получения всех параметров
  function startSearch(event) { 
    event.preventDefault()
    if (name.trim()) {

      let animanlsJSON = {
        name: name, 
        colour: colour,
        grouping: document.getElementsByName("grouping")[0].checked ?
                  document.getElementsByName("grouping")[0].value :
                  document.getElementsByName("grouping")[1].checked ?
                  document.getElementsByName("grouping")[1].value : "",
        width: width, 
        height: height,
      };

      fetch('/api/findimg', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(animanlsJSON)
        })
        .then(response => {
          if(!response.ok) {
            throw new Error(response.statusText)
          }
          return response;
        })
            .then(response => response.json())
            .then(result => {
              console.log(result)
              if (result.error !== "Image not found")
              {
                setWidth(result.width)
                setHeight(result.height)
                setColour(result.animal.colour)
                setImage(result.animal.image)
                if(result.animal.grouping === "single")
                  document.getElementsByName("grouping")[0].checked = true;
                else
                document.getElementsByName("grouping")[1].checked = true;
              }
              else
              setImage('Nothing in DB')
            });
    }
  }

  /// Функция получения картинки
  function sendReq(event) {
    event.preventDefault()
    if (name.trim()) {

      let animanlsJSON = {
        name: name, 
        colour: colour,
        grouping: document.getElementsByName("grouping")[0].checked ?
                  document.getElementsByName("grouping")[0].value :
                  document.getElementsByName("grouping")[1].checked ?
                  document.getElementsByName("grouping")[1].value : "",
      };

      fetch('/api/img', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(animanlsJSON)
        })
        .then(response => {
          if(!response.ok) {
            throw new Error(response.statusText)
          }
          return response;
        })
            .then(response => response.json())
            .then(result => {
              console.log(result)
              if (result.image != null)
              {
                setImgWidth(width)
                setImgHeight(height)
                setImg('../images/'+ result.image)
              }
              else
              setImage('Image not found')
            });
    }
  }

  function reset() {
    setName('')
    setColour('')
    document.getElementsByName("grouping")[0].checked = false;
    document.getElementsByName("grouping")[1].checked = false;
    setWidth('')
    setHeight('')
    setImage('')
    setImg('')
    setImgWidth('')
    setImgHeight('')
  }

  return (
    <div className="wrapper">
      <label>
          Animal Name: 
          <input 
            style={{marginLeft: 4}} 
            value={name} 
            onChange={event => setName(event.target.value)} 
          /><p></p>
          
          Colour*:
          <input 
            style={{marginLeft: 15}}
            value={colour} 
            onChange={event => setColour(event.target.value)}             
          ></input><p></p>  

          Single*<input name="grouping" type="radio" value="single"></input>
          Multiple*<input name="grouping" type="radio" value="multiple"></input><br /><br /> 

          Width*:
          <input 
            style={{marginLeft: 11}}
            value={width} 
            onChange={event => setWidth(event.target.value)} 
          ></input><p></p>

          Height*:
          <input 
            style={{marginLeft: 6}}
            value={height} 
            onChange={event => setHeight(event.target.value)} 
          ></input><p></p>

          Image*:
          <input 
            style={{marginLeft: 10}}
            value={image} 
            onChange={event => setImage(event.target.value)}             
          ></input><p></p> 

          <input 
            type="submit" 
            value="Show Image" 
            onClick={sendReq}
          />

          <input 
            style={{marginLeft: 20}}
            type="submit" 
            value="Find on server" 
            onClick={startSearch}
          /><p></p>

          <input
            type="submit" 
            value="Reset" 
            onClick={reset}
          /> <p></p>

        <img 
          src={img}
          width={imgWidth}
          height={imgHeight} 
          onChange={event => setImg(event.target.value)}
        />
      </label>
    </div>
  ); 
}

export default App;
