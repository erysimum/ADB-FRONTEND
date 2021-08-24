import { BellFilled } from '@ant-design/icons';
import { Badge, Dropdown, Menu } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from "react-router-dom";
import menuList from "../../config/menuConfig";
import "./index.less";
import { updateIsRead } from '../../redux/actions/candidate';

const Header = () => {
  const [numberUnread, setNumberUnread] = useState(0);
  const location = useLocation();
  const { candidateList } = useSelector((state) => state.candidate);
  const unReadResume = candidateList.filter((candidate) => !candidate.isRead);
  const dispatch = useDispatch();

  const checkIsRead = () => {
    let a = 0;
    for (var att in candidateList) {
      if (candidateList[att].isRead === false) {
        a += 1;
      }
    }
    // console.log(a);
    setNumberUnread(a);
  }

  useEffect(() => {
    checkIsRead();
  }, [candidateList]);

  const menu = (
    <Menu>
      {unReadResume.map((candidate, idx) => {
        if (!candidate.isRead) {
          return (
            <Menu.Item key={idx}>
              <Link to={`/search/detail/?id=${candidate._id}`} onClick={async () => {
                dispatch(updateIsRead(candidate._id));
              }} style={{ fontWeight: "bold" }}>
                {candidate.email}
              </Link>
            </Menu.Item>
          );
        }
      })}
    </Menu>
  );

  const getTitle = () => {
    const path = location.pathname;
    let title;

    // looping the menu array list to match the pathname and its key
    menuList.forEach((item) => {
      if (item.key === path) {
        title = item.title;
      } else if (item.children) {
        // if the pathname appears in the children item
        const child_Item = item.children.find((c_item) => c_item.key === path);

        if (child_Item) {
          title = child_Item.title;
        }
      }
    });
    return title;
  };

  return (
    <div className="header">
      <div className="header-top">
        <span>Welcome</span>
        {/* <LinkButton onClick={this.logout}>Logout</LinkButton> */}
      </div>
      <div className="header-bottom">
        <div className="header-bottom-left">{getTitle()}</div>
        <div className="header-bottom-right">
          <Dropdown overlay={menu} trigger={['click']} getPopupContainer={(trigger) => trigger.parentNode}>
            <Badge count={numberUnread} >
              {/* <a className="ant-dropdown-link" onClick={e => e.preventDefault()}> */}
              <span className="bell-icon">
                <BellFilled style={{ fontSize: '27px' }} />
              </span>
              {/* </a> */}
            </Badge>
          </Dropdown>
          {/* <span style={{ marginLeft: '20px' }}>{currentTime}</span> */}
          {/* <img src={dayPictureUrl} alt="weather" />
          <span>{weather}</span> */}
        </div>
      </div>
    </div>
  );
}

export default Header;
