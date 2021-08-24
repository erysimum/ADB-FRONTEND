import React from "react";
import TimelineItem from "../timeline_item";
import { Empty } from "antd";
import "./index.less";

const Timeline = ({ timelineData }) => {
  return timelineData?.length > 0 ? (
    <div className="timeline-container">
      {timelineData.map((data, idx) => (
        <TimelineItem data={data} key={idx} />
      ))}
    </div>
  ) : (
    <Empty description={"No Timeline Event "} />
  );
};

export default Timeline;
