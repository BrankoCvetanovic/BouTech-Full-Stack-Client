import Categories from "../components/Categories";
import { TV } from "../util/categories";
import axios, { AxiosError } from "axios";
import {
  useLoaderData,
  json,
  LoaderFunctionArgs,
  useSearchParams,
  useNavigation,
} from "react-router-dom";
import ItemsContainer from "../components/ItemsContainer";
import { Slider } from "@mui/material";
import { useState } from "react";
import Sort from "../components/Sort";
import { loadedData } from "../util/types";

export default function TVPage() {
  const data = useLoaderData() as loadedData;

  const [value, setValue] = useState<number[]>([898, 3000]);

  const [searchParams, setSearchParams] = useSearchParams();

  const navigation = useNavigation();

  const handleChange = (_event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };
  const handleChangeCommited = () => {
    const paramValue = `${value[0]}-${value[1]}`;
    if (!searchParams.toString()) {
      setSearchParams(`?${new URLSearchParams({ price: paramValue })}`);
    } else if (searchParams.has("price")) {
      const regex = /(?<=price=)[^&\s]+/;

      setSearchParams(`?${searchParams.toString().replace(regex, paramValue)}`);
    } else {
      setSearchParams(
        `?${searchParams.toString()}&${new URLSearchParams({
          price: paramValue,
        })}`
      );
    }
  };
  return (
    <div className="page">
      <div className="title">TVs</div>
      <Categories categories={TV} />
      <div className="bar">
        <div className="slider">
          <div>Price:</div>
          <Slider
            getAriaLabel={() => "Price range"}
            valueLabelDisplay="auto"
            min={898}
            max={3000}
            onChange={handleChange}
            onChangeCommitted={handleChangeCommited}
            value={value}
            size="small"
            color="warning"
            disableSwap
          />
        </div>
        <div className="sort">
          <Sort
            key={searchParams.toString()}
            sortingValues={[
              { name: "Newest", value: "createdAt" },
              { name: "Lowest Price", value: "price" },
              { name: "Highest Price", value: "-price" },
            ]}
          />
        </div>
      </div>
      <ItemsContainer navigation={navigation.state} items={data.items} />
    </div>
  );
}
export const loader = async ({ request }: LoaderFunctionArgs) => {
  const sortBy = new URL(request.url).searchParams.toString();

  let searchUrl = "https://boutech-server-cfe11ab86bbd.herokuapp.com/tvs";
  if (sortBy) {
    searchUrl = `https://boutech-server-cfe11ab86bbd.herokuapp.com/tvs?${sortBy}`;
  }
  try {
    const response = await axios.get(searchUrl);
    return response.data;
  } catch (err) {
    const errors = err as Error | AxiosError;
    throw json({ message: errors.message }, { status: 500 });
  }
};
