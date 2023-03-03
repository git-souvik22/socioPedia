import "./sidebar.css";
import {RssFeed}  from "@mui/icons-material";
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import GroupsIcon from '@mui/icons-material/Groups';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ForumIcon from '@mui/icons-material/Forum';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import EventIcon from '@mui/icons-material/Event';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { Users } from "../../dummyData";
import CloseFriend from "../closeFriend/CloseFriend";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">

          <li className="sidebarListItem">
            <RssFeed className="sidebarIcon"/>
            <span className="sidebarListItemText">Feed</span>
          </li>
          
          <li className="sidebarListItem">
            <ForumIcon className="sidebarIcon"/>
            <span className="sidebarListItemText">Chats</span>
          </li>

          <li className="sidebarListItem">
            <PlayCircleFilledIcon className="sidebarIcon"/>
            <span className="sidebarListItemText">Videos</span>
          </li>

          <li className="sidebarListItem">
            <GroupsIcon className="sidebarIcon"/>
            <span className="sidebarListItemText">Groups</span>
          </li>

          <li className="sidebarListItem">
            <PeopleAltIcon className="sidebarIcon"/>
            <span className="sidebarListItemText">Friends</span>
          </li>

          <li className="sidebarListItem">
            <BookmarksIcon className="sidebarIcon"/>
            <span className="sidebarListItemText">Saved</span>
          </li>

          <li className="sidebarListItem">
            <EventIcon className="sidebarIcon"/>
            <span className="sidebarListItemText">Events</span>
          </li>

          <li className="sidebarListItem">
            <HelpOutlineIcon className="sidebarIcon"/>
            <span className="sidebarListItemText">Help Center</span>
          </li>

        </ul>

        <button className="sidebarButton">Show More</button>
        <hr className="sidebarHr"/>
        <ul className="sidebarFriendList">
          {
            Users.map(u => (
              <CloseFriend key={u.id} user={u}/>
            ))
          }
        </ul>
      </div>
    </div>
  )
}
