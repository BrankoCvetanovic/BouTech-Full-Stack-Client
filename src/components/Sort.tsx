import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useState, FC } from "react";
import { useSearchParams } from "react-router-dom";

interface SortData {
  name: string;
  value: string;
}

const Sort: FC<{ sortingValues: SortData[] }> = ({ sortingValues }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialValue = searchParams.get("sort") ? searchParams.get("sort") : "";

  const [sortValue, setSortValue] = useState(initialValue);

  const handleChange = (event: SelectChangeEvent) => {
    const value = event.target.value;
    setSortValue(value);
    if (!searchParams.toString()) {
      setSearchParams(`?${new URLSearchParams({ sort: value })}`);
    } else if (searchParams.has("sort")) {
      const regex = /(?<=sort=)[^&\s]+/;

      setSearchParams(`?${searchParams.toString().replace(regex, value)}`);
    } else {
      setSearchParams(
        `?${searchParams.toString()}&${new URLSearchParams({
          sort: value,
        })}`
      );
    }
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel sx={{ m: -0.5 }}>Sort</InputLabel>
        <Select
          sx={{ fontSize: "0.7rem" }}
          value={sortValue!}
          label="Sort"
          onChange={handleChange}
        >
          {sortingValues
            ? sortingValues.map((value) => (
                <MenuItem
                  sx={{ fontSize: "0.7rem" }}
                  key={value.name}
                  value={value.value}
                >
                  {value.name}
                </MenuItem>
              ))
            : null}
        </Select>
      </FormControl>
    </Box>
  );
};

export default Sort;
