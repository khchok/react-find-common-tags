import { Grid } from "@mui/material";
import { useState, useMemo } from "react";
import sampleData from "../../data/data.json";
import classes from "./ListPair.module.css";

const ListPair = () => {
  const [selected, setSelected] = useState([]);

  const data = sampleData.recipients;

  const result = useMemo(() => {
    let resultArr = [];
    for (let i = 0; i < data.length; i++) {
      const outerElement = data[i];

      // filter current element array into a new array
      let newArr = data.filter((item) => item.id !== outerElement.id);

      for (let j = 0; j < newArr.length; j++) {
        const innerElement = newArr[j];
        // check intersection tags
        let intersection = outerElement.tags.filter((value) =>
          innerElement.tags.includes(value)
        );
        if (intersection.length >= 2) {
          let existingItemInResult = resultArr.filter(
            (x) =>
              x.indexOf(outerElement.name) >= 0 &&
              x.indexOf(innerElement.name) >= 0
          );
          if (existingItemInResult.length === 0) {
            resultArr.push(`${outerElement.name},${innerElement.name}`);
          }
          // exit for loop
          j = newArr.length;
        }
      }
    }
    return resultArr;
  }, [data]);

  const onNameHoverHandler = (e) => {
    setSelected(e.target.dataset.name.split(","));
    e.target.classList.add(classes.selected);
  };

  const onNameLeaveHandler = (e) => {
    e.target.classList.remove(classes.selected);
  };
  return (
    <>
      <Grid container spacing={2}>
        {data.map((item) => {
          return (
            <Grid
              key={item.id}
              item
              xs={12}
              sm={6}
              md={4}
              className={selected.includes(item.name) ? classes.selected : ""}
            >
              <code>
                {item.id}
                <br />
                {item.name}
                <br />
                {item.tags.join(",")}
              </code>
            </Grid>
          );
        })}
      </Grid>
      <hr />
      <div>
        {result.map((item, index) => {
          return (
            <span
              className=""
              data-name={item}
              onMouseOver={onNameHoverHandler}
              onMouseLeave={onNameLeaveHandler}
              key={item}
            >
              {item}
              {index === result.length - 1 ? "" : "|"}
            </span>
          );
        })}
      </div>
    </>
  );
};

export default ListPair;
