import React from "react";
import timelineStatus from "../../config/timelineConfig";
import "./index.less";

const TimelineItem = ({ data }) => {
  const setTag = (tag) => {
    const status = timelineStatus;
    let color = "";
    status.forEach((status) => {
      if (tag === status.text) color = status.color;
    });
    return color;
  };

  return (
    <div className="timeline-item">
      <div className="timeline-item-content">
        <span className="tag" style={{ background: setTag(data.tag) }}>
          {data.tag}
        </span>
        <time>{data.timeCreated}</time>
        <p>{data.comment}</p>
        <span>By: {data.modifiedBy}</span>
        {data.url && (
          <a href={data.url} target="_blank" rel="noopener noreferrer">
            {data.note}
          </a>
        )}
        <span className="circle" />
      </div>
    </div>
  );
};

export default TimelineItem;
