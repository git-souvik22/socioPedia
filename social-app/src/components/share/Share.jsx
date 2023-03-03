import "./share.css";
import PermMediaIcon from '@mui/icons-material/PermMedia';
import LabelIcon from '@mui/icons-material/Label';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import CloseIcon from '@mui/icons-material/Close';
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";


export default function Share() {

    const {user} = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const desc = useRef();
    const [file, setFile] = useState(null);

    const submitHandler = async (e) =>{
        e.preventDefault();
        const newPost = {
            userId: user._id,
            desc: desc.current.value
        }

        if(file){
            const data = new FormData();
            const fileName = Date.now() + file.name;
            data.append("name", fileName);
            data.append("file", file);
            newPost.img = fileName;
            try{
                await axios.post("/upload", data);
            }catch(err){
                console.log(err);
            }
        }

        try{
            await axios.post("/posts", newPost);
            window.location.reload();
        }catch(err){
            console.log(err);
        }
    };

  return (
    <div className="share">
        <div className="shareWrapper">
            <div className="shareTop">
                <img src={user.profilePicture ? PF+user.profilePicture : PF+"noAvatar.jpg"} alt="" className="shareProfileImg"/>
                <input 
                placeholder={"What's on your mind, " + user.username + " ?"}
                className="shareInput"
                ref={desc}
                />
            </div>
            <hr className="shareHr" />
            {file && (
                <div className="shareImgContainer">
                    <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
                    <CloseIcon className="shareCancel" onClick={()=> setFile(null)}/>
                </div>
            )}
            <form className="shareBottom" onSubmit={submitHandler}>
                <div className="shareOptions">
                    <label htmlFor="file" className="shareOption">
                        <PermMediaIcon htmlColor="tomato" className="shareIcon"/>
                        <span className="shareOptionText">Photo/Video</span>
                        <input 
                        type="file" 
                        id="file" 
                        accept=".png,.jpeg,.jpg" 
                        style={{display: "none"}} 
                        onChange={(e)=> setFile(e.target.files[0])}
                        />
                    </label>
                    <div className="shareOption">
                        <LabelIcon htmlColor="blue" className="shareIcon"/>
                        <span className="shareOptionText">Tag</span>
                    </div>
                    <div className="shareOption">
                        <LocationOnIcon htmlColor="green" className="shareIcon"/>
                        <span className="shareOptionText">Location</span>
                    </div>
                    <div className="shareOption">
                        <AddReactionIcon htmlColor="goldenrod" className="shareIcon"/>
                        <span className="shareOptionText">Feelings</span>
                    </div>

                </div>
                       <button className="shareButton" type="submit">Share</button>
            </form>
        </div>
    </div>
  )
}
