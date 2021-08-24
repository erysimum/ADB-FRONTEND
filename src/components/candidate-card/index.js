import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import {
  DetailButton,
  BackgroundSquare,
  Card,
  Content,
  SkillListItem,
  Icon,
  JobTitle,
  CandidateName,
} from "./indexCSS.js";

import "../../assets/css/icofont.min.css";
import { Badge, Empty } from "antd";

function CandidateCard({ color1, color2, candidate }) {
  const { _id, job_title, first_name, skill, score } = candidate;
  const [skillSet] = useState(skill);

  return (
    <div>
      <Card color1={color1} color2={color2}>
        <BackgroundSquare />
        <Content>
          <Icon className="devicon-github-plain-wordmark" color1={color1} color2={color2} />
          <CandidateName>{first_name}</CandidateName>
          <JobTitle>{job_title}</JobTitle>
          {skillSet.length ? (
            skillSet.slice(0, 6).map((item) => (
              <SkillListItem key={item}>
                <i className="icofont-check" />
                <span>{item}</span>
              </SkillListItem>
            ))
          ) : (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No Skill Set" style={{ color: "white" }} />
          )}
        </Content>
        <Link to={{ pathname: `/search/detail/?id=${_id}` }} target="_blank">
          {score ? (
            <DetailButton>
              <Badge count={`${Math.round(score * 10)}% Match`} style={{ marginTop: -10, marginRight: -40 }}>
                Details
              </Badge>
            </DetailButton>
          ) : (
            <DetailButton>Details</DetailButton>
          )}
        </Link>
      </Card>
    </div>
  );
}

export default withRouter(CandidateCard);
