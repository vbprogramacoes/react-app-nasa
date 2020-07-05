import * as React from 'react';
import { useState, useEffect } from 'react';
import './index.css';

export function VideoApod(props){
	return (
		<iframe className="app-nasa-apod-video" src={props.url}>
		</iframe>
	);
}

export function ImageApod(props){
	if(!props.hd){
		return (
			<div className="app-nasa-apod-image-background" 
				style={{background:`url(${props.url})`}}></div>
		);
	}else {
		return (
			<div className="app-nasa-apod-image-background" 
				style={{background:`url(${props.urlHD})`}}></div>
		);
	}
}
export default function NasaApod(props){
	const [now, setNow] = useState('');
	useEffect(()=>{
		let now = new Date();
		let day = valueModify(now.getDate());
		let month = valueModify(now.getMonth() + 1);
		setNow(`${now.getFullYear()}-${month}-${day}`);
	});

	const [hd, setHD] = useState(true);
	useEffect(()=>{
		imageRequition();
	}, [hd]);

	const [date, setDate] = useState('');
	useEffect(()=>{
		imageRequition();
	}, [date]);
	const [type, setType] = useState('');
	const [url, setUrl] = useState('');
	const [urlHD, setURLHD] = useState('');

	function valueModify(value){

		if(value < 10){
			value = '0'+value;
		}
		return value;
	}

	function onChangeRadio(bool){
		setHD(bool);
	}
	function onChangeDate(e){
		setDate(e.target.value);
	}
	function imageRequition(){
		fetch(
		`https://api.nasa.gov/planetary/apod?api_key=${props.api_key}&date=${date}&hd=${hd}`,
			{ headers: {'Content-Type': 'application/json'}}
		).then((res)=>{
			if(res.status == 200){
				var result = res.json();
				result.then((data)=>{
					if(data.media_type == 'image'){
						setType(data.media_type);
						setUrl(data.url);
						setURLHD(data.hdurl);
					}else if(data.media_type == 'video'){
						setType(data.media_type);
						setUrl(data.url);
						setURLHD('');
					}
					
				});
			}else {
				alert('Data tem que ser inferior a data atual');
			}
			
		});
	}
	return(
		<section className="App-nasa-apod">
          <div className="App-nasa-apod-fields">
	          <input 
	          	type="date" 
	          	value={date} 
	          	onChange={(e)=>onChangeDate(e)}
	          	max={now}
	          	/>
	          <div className="App-nasa-apod-fields-hd">
	          	Imagem em hd?
	          	<div className="App-nasa-apod-fields-hd-buttons">
		          <label>
		          	<input type="radio" name="hd" checked={hd} onChange={()=>onChangeRadio(true)}/>
		          	Sim
		          </label>
		          <label>
		          	<input type="radio" name="hd" checked={!hd} onChange={()=>onChangeRadio(false)}/> Não
		          </label>
		         </div>
	          </div>
          </div>
          <div className="App-nasa-apod-image">
          	{type == 'video' && <VideoApod url={url} />}
      		{type == 'image' && <ImageApod hd={hd} url={url} urlHD={urlHD} />}
          </div>
        </section>
	);
}