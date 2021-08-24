import { BASE_URL } from "../utils/constants";
import ajax from "./ajax";

// login
export const reqLogin = (username, password) => ajax(BASE_URL + "/login", { username, password }, "POST");

// ------------------Job--------------------------

// add new job
export const reqAddJob = (title) => ajax(BASE_URL + "/job/job", { title }, "POST");

// get the job list
export const reqJobList = () => ajax(BASE_URL + "/job/joblist");

// get the candidate list with specified job
export const reqJobCandidateList = (parentId) => ajax(BASE_URL + "/job/candidatelist", { parentId }, "POST");

// update the job information
export const reqUpdateJob = (id, title) => ajax(BASE_URL + "/job/update", { id, title }, "POST");

// ------------------Candidate--------------------------

// get the candidate list with specified job
export const reqCandidate = (_id) => ajax(BASE_URL + `/candidate/candidate?term=${_id}`);

// get the candidate list with specified job
export const reqCandidateList = () => ajax(BASE_URL + "/candidate/candidatelist");

// scan the whole mailbox
export const reqFetchResume = () => ajax(BASE_URL + "/candidate/fetchresume");

// add new candidate
export const reqAddCandidate = (candidate, fileName) => ajax(BASE_URL + "/candidate/addCandidate", { candidate, fileName }, "POST");

// update the candidate information
export const reqUpdateCandidate = (candidate, fileName) => ajax(BASE_URL + "/candidate/candidate/update", { candidate, fileName }, "POST");

// get the candidate timeline
export const reqTimeline = (id) => ajax(BASE_URL + `/candidate/timeline?term=${id}`);

// Add the new timeline event
export const reqAddTimeline = (event) => ajax(BASE_URL + "/candidate/timelineupdate", event, "POST");

export const reqSearchCandidates = (searchType, searchInput) =>
  ajax(BASE_URL + '/candidate/search', { searchType, searchInput });

export const reqSearch = (query, conditions) => ajax(BASE_URL + "/search", { query, conditions }, "POST");

// Upload the candidate's resume
export const reqUpload = (id, file_name) => ajax(BASE_URL + "/candidate/upload", { id, file_name }, "POST");

// mark a candidate as read
export const reqUpdateIsRead = (id) => ajax(BASE_URL + "/candidate/candidate/updateIsRead", { id }, "POST");

// // Upload the candidate's resume
// export const reqDownload = (id) => ajax(BASE_URL + `/download/${id}`);
