import { SearchOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { Button, Card, Empty, message } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { reqSearch } from "../../api";
import CandidateCard from "../../components/candidate-card";
import SearchForm from "../../components/form/search-form";
import colorSets from "../../config/candidateCardConfig";
import { advancedSearch, emptyAdvancedSearch } from "../../redux/actions/candidate";

const SearchHome = () => {
  const [form, setForm] = useState();
  const [isSearching, setIsSearching] = useState(false);
  const { searchedCandidate } = useSelector((state) => state.candidate);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(emptyAdvancedSearch());
    }
  }, [])

  const onSearch = async () => {
    const values = await form.validateFields();
    const { text, ...conditions } = values;
    const isEmpty = Object.values(values).every(x => x === undefined);
    if (isEmpty) {
      message.error('Please put in some words!');
      return;
    }
    dispatch(advancedSearch(text, conditions));
    setIsSearching(true);
    form.resetFields();
  };

  const onClear = () => {
    form.resetFields();
    dispatch(emptyAdvancedSearch());
    setIsSearching(false);
  }

  const title = (
    <span>
      <SearchForm
        setForm={setForm}
      />
      <Button shape="round" icon={<SearchOutlined />} type="primary" onClick={onSearch}>
        Search
      </Button>
      <Button shape="round" icon={<CloseCircleOutlined />} type="primary" style={{ marginLeft: 10 }} onClick={onClear}>
        Clear
      </Button>
    </span>
  );

  return (
    <Card title={title}>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {
          isSearching ?
            searchedCandidate.length > 0 ?
              (
                searchedCandidate.slice(0, 200).map((candidate) => {
                  const color1 = colorSets[Math.floor(Math.random() * colorSets.length)][0];
                  const color2 = colorSets[Math.floor(Math.random() * colorSets.length)][1];
                  return <CandidateCard color1={color1} color2={color2} key={candidate._id} candidate={candidate} />;
                })
              ) : (
                <Empty description="No Candidate Found" style={{ margin: "auto auto" }} />
              )
            : (<> </>)
        }
      </div>
    </Card>
  );
}

export default SearchHome;