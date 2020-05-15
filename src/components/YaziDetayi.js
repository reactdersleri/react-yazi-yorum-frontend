import React, { useState, useEffect } from "react";
import axios from "axios";
import YaziYorumlari from "./YaziYorumlari";

const YaziDetayi = (props) => {
  const { id } = props.match.params;
  const [yaziDetayi, setYaziDetayi] = useState({});
  const [yorumlar, setYorumlar] = useState([]);

  const handleCommentSubmit = (event, yorum) => {
    event.preventDefault();
    axios
      .post(
        `https://react-yazi-yorum.herokuapp.com/posts/${id}/comments`,
        yorum
      )
      .then((response) => {
        setYorumlar([...yorumlar, response.data]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    axios
      .all([
        axios.get(`https://react-yazi-yorum.herokuapp.com/posts/${id}`),
        axios.get(
          `https://react-yazi-yorum.herokuapp.com/posts/${id}/comments`
        ),
      ])
      .then((responses) => {
        setYaziDetayi(responses[0].data);
        setYorumlar(responses[1].data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <React.Fragment>
      <h2 className="ui header">{yaziDetayi.title}</h2>
      <p>{yaziDetayi.created_at}</p>
      <p>{yaziDetayi.content}</p>
      <YaziYorumlari yorumlar={yorumlar} handleSubmit={handleCommentSubmit} />
    </React.Fragment>
  );
};

export default YaziDetayi;
